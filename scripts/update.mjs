import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getItems, hasCredentials, normalizeItem, searchItems } from './amazon.mjs';
import {
  ACCESSORY_RE,
  AUTO_ADD_BRANDS,
  CATEGORIES,
  HISTORY_LIMIT,
  MAX_NEW_PER_CATEGORY,
  MAX_STALE_DAYS,
  MAX_STORED_PER_CATEGORY,
  PARTNER_TAG,
  SEARCH_ITEM_COUNT,
  SEARCH_MAX_PRICE,
  SEARCH_PAGES,
} from './config.mjs';
import { describeProduct, isExcludedBrand, productKey } from './naming.mjs';
import { DATA_DIR, writePublic } from './render.mjs';

const DEFAULT_WARRANTY = '15 يوم إرجاع مجاني من أمازون';
const DEFAULT_SHIP = 'مجاني';
const IN_STOCK = new Set(['IN_STOCK', 'IN_STOCK_SCARCE', 'LEADTIME', 'PREORDER', 'AVAILABLE_DATE']);

const today = () => new Date().toISOString().slice(0, 10);

function daysBetween(a, b) {
  const start = Date.parse(a);
  const end = Date.parse(b);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return 0;
  return Math.abs(end - start) / 86400000;
}

async function loadJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function productUrl(asin) {
  return `https://www.amazon.eg/dp/${asin}?tag=${PARTNER_TAG}`;
}

function recordPrice(history, asin, price) {
  if (!Number.isFinite(price)) return false;
  const list = Array.isArray(history[asin]) ? history[asin] : [];
  const last = list[list.length - 1];
  if (last && Number(last.p) === price) return false;
  list.push({ t: new Date().toISOString(), p: price });
  history[asin] = list.slice(-HISTORY_LIMIT);
  return true;
}

// تطبيق بيانات الـ API على منتج موجود
function applyApiItem(offer, api, history, category) {
  const date = today();
  let changed = false;

  if (api.title) {
    const info = describeProduct({ title: api.title, byLine: api.byLine }, category);
    offer.title = api.title;
    if (!offer.brand) offer.brand = info.brand;
    if (!offer.model && info.model) offer.model = info.model;
    if (!offer.name) offer.name = info.name;
    if (!offer.specs) offer.specs = {};
    for (const [key, value] of Object.entries(info.specs || {})) {
      if (!offer.specs[key]) offer.specs[key] = value;
    }
  }

  if (api.image && api.image !== offer.img) {
    offer.img = api.image;
    changed = true;
  }

  const newCondition = api.condition ? String(api.condition).toLowerCase() : '';
  const usableCondition = !newCondition || newCondition === 'new' || newCondition === 'unknown';
  const min = category.minPrice ?? 150;
  const max = category.maxPrice ?? 600000;
  const hasPrice = Number.isFinite(api.price) && api.price >= min && api.price <= max;
  const inStock = usableCondition && hasPrice && (!api.availability || IN_STOCK.has(api.availability));

  if (inStock) {
    if (!offer.keepPrice && Number(offer.price) !== api.price) {
      offer.price = api.price;
      recordPrice(history, offer.asin, api.price);
      changed = true;
    }
    if (offer.active === false) {
      console.log(`  رجع متاح: ${offer.name || offer.asin}`);
      offer.active = true;
      changed = true;
    }
    offer.reason = null;
    offer.oosCount = 0;
    offer.missCount = 0;
    offer.lastGood = date;
    delete offer.outOfStockSince;
    return changed;
  }

  if (offer.keepListed) return changed;

  offer.oosCount = (offer.oosCount || 0) + 1;
  offer.outOfStockSince = offer.outOfStockSince || date;
  offer.lastSeenOut = date;

  const stale = offer.oosCount >= 2 || daysBetween(offer.outOfStockSince, date) >= MAX_STALE_DAYS;
  if (stale && offer.active !== false) {
    console.log(`  اتشال (خلص/مش متاح): ${offer.name || offer.asin} [${api.availability || 'no-price'}]`);
    offer.active = false;
    offer.reason = 'out-of-stock';
    changed = true;
  }
  return changed;
}

function scoreCandidate({ info }) {
  // الأفضل: براند معروف + مواصفات أكتر. بنستخدمها للترتيب مش للاستبعاد.
  const knownBrand = AUTO_ADD_BRANDS.includes(info.brand) ? 0 : 1;
  const specCount = Object.keys(info.specs || {}).length;
  return knownBrand * 10 - specCount;
}

async function findNewItems(category, offers, globalKnown) {
  const known = new Set(globalKnown);
  const families = new Set(
    offers.filter((o) => o.active !== false).map((o) => productKey(o)),
  );
  const found = new Map();
  const maxPrice = Math.min(category.maxPrice ?? SEARCH_MAX_PRICE, SEARCH_MAX_PRICE);
  const minPrice = category.minPrice ?? 150;
  const stats = {
    raw: 0, dup: 0, noTitle: 0, include: 0, accessory: 0, noImage: 0,
    price: 0, condition: 0, availability: 0, brand: 0, weak: 0, family: 0,
  };

  for (const keywords of category.queries) {
    for (const page of SEARCH_PAGES) {
      let items = [];
      try {
        items = await searchItems({
          keywords,
          itemPage: page,
          itemCount: SEARCH_ITEM_COUNT,
          minPrice,
          maxPrice,
        });
      } catch (err) {
        console.warn(`  بحث "${keywords}" صفحة ${page} فشل: ${err.message}`);
        continue;
      }

      for (const raw of items) {
        stats.raw++;
        const api = normalizeItem(raw);
        if (!api.asin || known.has(api.asin)) { stats.dup++; continue; }
        if (!api.title) { stats.noTitle++; continue; }
        if (!category.include.test(api.title)) { stats.include++; continue; }
        if (ACCESSORY_RE.test(api.title) || category.exclude?.test(api.title)) { stats.accessory++; continue; }
        if (!api.image) { stats.noImage++; continue; }
        if (!Number.isFinite(api.price) || api.price < minPrice || api.price > maxPrice) { stats.price++; continue; }
        if (api.condition && !/^(new|unknown)$/i.test(api.condition)) { stats.condition++; continue; }
        if (api.availability && !IN_STOCK.has(api.availability)) { stats.availability++; continue; }

        const info = describeProduct({ title: api.title, byLine: api.byLine }, category);
        if (!info.brand || isExcludedBrand(info.brand)) { stats.brand++; continue; }

        const knownBrand = AUTO_ADD_BRANDS.includes(info.brand);
        const specCount = Object.keys(info.specs || {}).length;
        // لازم على الأقل براند معروف أو مواصفة مستخرجة — عشان منضيفش عشوائيات
        if (!knownBrand && specCount === 0) { stats.weak++; continue; }

        const key = productKey({ ...info, name: info.name });
        if (families.has(key)) { stats.family++; continue; }

        families.add(key);
        known.add(api.asin);
        found.set(api.asin, { api, info });
      }
    }
  }

  const list = [...found.values()].sort((a, b) => scoreCandidate(a) - scoreCandidate(b));
  return { items: list, stats };
}

function makeOffer({ api, info }, category, date) {
  return {
    asin: api.asin,
    brand: info.brand,
    name: info.name,
    specs: info.specs || {},
    model: info.model || '',
    title: api.title,
    warranty: DEFAULT_WARRANTY,
    ship: DEFAULT_SHIP,
    price: api.price,
    img: api.image,
    url: productUrl(api.asin),
    active: true,
    firstSeen: date,
    lastGood: date,
    source: 'search',
    missCount: 0,
    oosCount: 0,
  };
}

function prune(offers) {
  if (offers.length <= MAX_STORED_PER_CATEGORY) return offers;
  const active = offers.filter((o) => o.active !== false);
  const inactive = offers
    .filter((o) => o.active === false)
    .sort((a, b) => String(b.lastGood || '').localeCompare(String(a.lastGood || '')));
  return [...active, ...inactive.slice(0, Math.max(0, MAX_STORED_PER_CATEGORY - active.length))];
}

async function main() {
  const data = {};
  const history = {};
  for (const cat of CATEGORIES) {
    data[cat.id] = (await loadJson(join(DATA_DIR, `${cat.id}.json`), [])) || [];
    if (!Array.isArray(data[cat.id])) data[cat.id] = [];
    history[cat.id] = (await loadJson(join(DATA_DIR, `${cat.id}-history.json`), {})) || {};
  }

  const renderOnly = process.argv.includes('--render-only') || !hasCredentials();
  let totalChanges = 0;
  let totalAdded = 0;

  const globalKnown = new Set();
  for (const cat of CATEGORIES) {
    data[cat.id].forEach((o) => globalKnown.add(o.asin));
  }

  // كل الروابط لازم تشيل تاج الأفلييت، وأي شحن فاضي يتكتب "مجاني"
  for (const cat of CATEGORIES) {
    for (const offer of data[cat.id]) {
      if (offer.asin) offer.url = productUrl(offer.asin);
      if (offer.active !== false && !offer.ship) {
        offer.ship = DEFAULT_SHIP;
        totalChanges++;
      }
    }
  }

  if (renderOnly) {
    console.log('⚠️ مفاتيح Creators API مش موجودة — هيتبنى الموقع بآخر بيانات محفوظة.');
  } else {
    const allAsins = CATEGORIES.flatMap((cat) => data[cat.id].map((o) => o.asin).filter(Boolean));
    console.log(`بنحدّث ${allAsins.length} منتج في ${CATEGORIES.length} قسم...`);

    const { items, errors } = await getItems(allAsins);
    console.log(`رد الـ API: ${items.size} منتج${errors.length ? ` · ${errors.length} تحذير` : ''}`);
    if (errors.length) {
      const unique = [...new Set(errors.map((e) => (e.message || e.code || 'error').slice(0, 200)))].slice(0, 5);
      console.log(`  تحذيرات: ${unique.join(' · ')}`);
    }

    for (const cat of CATEGORIES) {
      const offers = data[cat.id];
      const hist = history[cat.id];
      let added = 0;

      for (const offer of offers) {
        const item = items.get(offer.asin);
        if (!item) continue;
        if (applyApiItem(offer, normalizeItem(item), hist, cat)) totalChanges++;
      }

      // المنتجات اللي الـ API مرجّعش بياناتها
      if (items.size > 0) {
        for (const offer of offers) {
          if (items.has(offer.asin) || offer.keepListed) continue;
          offer.missCount = (offer.missCount || 0) + 1;
          if (offer.missCount >= 3 && offer.active !== false) {
            console.log(`  اتشال (مبقاش موجود): ${offer.name || offer.asin}`);
            offer.active = false;
            offer.reason = 'not-found';
            totalChanges++;
          }
        }
      }

      try {
        const { items: fresh, stats } = await findNewItems(cat, offers, globalKnown);
        for (const candidate of fresh.slice(0, MAX_NEW_PER_CATEGORY)) {
          const offer = makeOffer(candidate, cat, today());
          recordPrice(hist, offer.asin, offer.price);
          offers.push(offer);
          globalKnown.add(offer.asin);
          added++;
          totalAdded++;
        }
        console.log(`  ${cat.title}: ${offers.filter((o) => o.active !== false).length} نشط · ${added} جديد`);
        console.log(
          `    تشخيص: خام ${stats.raw} · مكرر ${stats.dup} · مش مطابق ${stats.include} · إكسسوار ${stats.accessory}` +
          ` · بدون صورة ${stats.noImage} · سعر ${stats.price} · حالة ${stats.condition + stats.availability}` +
          ` · براند ${stats.brand} · ضعيف ${stats.weak} · عيلة مكررة ${stats.family}`,
        );
      } catch (err) {
        console.warn(`  ${cat.title}: فشل البحث عن جديد — ${err.message}`);
      }
    }
  }

  const meta = {
    updatedAt: new Date().toISOString(),
    apiUsed: !renderOnly,
    categories: CATEGORIES.length,
    totalActive: CATEGORIES.reduce((sum, cat) => sum + data[cat.id].filter((o) => o.active !== false).length, 0),
  };

  for (const cat of CATEGORIES) {
    data[cat.id] = prune(data[cat.id]);
    history[cat.id]._meta = {
      lastRun: meta.updatedAt,
      activeCount: data[cat.id].filter((o) => o.active !== false).length,
      totalCount: data[cat.id].length,
    };
    await writeFile(join(DATA_DIR, `${cat.id}.json`), `${JSON.stringify(data[cat.id], null, 2)}\n`, 'utf8');
    await writeFile(join(DATA_DIR, `${cat.id}-history.json`), `${JSON.stringify(history[cat.id], null, 2)}\n`, 'utf8');
  }
  await writeFile(join(DATA_DIR, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

  const stats = await writePublic(data, meta);
  console.log(`✅ خلص: ${meta.totalActive} منتج نشط · ${totalAdded} جديد · ${totalChanges} تغيير`);
  console.log('   بالقسم:', stats);
}

main().catch((err) => {
  console.error('❌ فشل التحديث:', err);
  process.exit(1);
});
