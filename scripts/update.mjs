import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getItems, hasCredentials, normalizeItem, searchItems } from './amazon.mjs';
import {
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
  isAccessoryTitle,
} from './config.mjs';
import { buildName, describeProduct, isExcludedBrand, productKey } from './naming.mjs';
import { DATA_DIR, writePublic } from './render.mjs';

const DEFAULT_WARRANTY = '15 يوم إرجاع مجاني من أمازون';
const DEFAULT_SHIP = 'مجاني';
const IN_STOCK = new Set(['IN_STOCK', 'IN_STOCK_SCARCE', 'LEADTIME', 'PREORDER', 'AVAILABLE_DATE']);

// بيانات المواقع القديمة (الاير فراير / الميكروويف) بنستخدمها كبذرة للأقسام المناظرة
const LEGACY_SEEDS = [
  { category: 'airfryers', file: 'legacy-airfryers.json' },
  { category: 'microwaves', file: 'legacy-microwaves.json' },
];

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
    if (offer.name !== info.name) {
      offer.name = info.name;
      changed = true;
    }
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

async function findNewItems(category, offers, globalKnown, seen) {
  // الـ seen بيمنع رجوع منتج اتشال بـ prune في كل تشغيل
  const known = new Set([...globalKnown, ...seen]);
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
          // الـ Creators API بياخد الأسعار بأصغر وحدة نقد (سنتمات) مش بالجنيه
          minPrice: Math.round(minPrice * 100),
          maxPrice: Math.round(maxPrice * 100),
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
        if (isAccessoryTitle(category, api.title)) { stats.accessory++; continue; }
        if (!api.image) { stats.noImage++; continue; }
        if (!Number.isFinite(api.price) || api.price < minPrice || api.price > maxPrice) { stats.price++; continue; }
        if (api.condition && !/^(new|unknown)$/i.test(api.condition)) { stats.condition++; continue; }
        if (api.availability && !IN_STOCK.has(api.availability)) { stats.availability++; continue; }

        const info = describeProduct({ title: api.title, byLine: api.byLine }, category);
        const knownBrand = AUTO_ADD_BRANDS.includes(info.brand);
        const specCount = Object.keys(info.specs || {}).length;
        const brandOk = Boolean(info.brand) && !isExcludedBrand(info.brand);

        if (!brandOk) {
          // مفيش براند واضح (أو براند عام/لون) — الاسم المختصر هيبقى نوع الجهاز ومواصفاته
          stats.brand++;
          info.brand = 'غير محدد';
          info.name = buildName({ brand: info.brand, specs: info.specs, model: '', category, fallback: api.title });
        } else if (!knownBrand && specCount === 0) {
          // براند مش معروف ومفيش مواصفات — مقبول بس هيترتب في الآخر
          stats.weak++;
          info.name = buildName({ brand: info.brand, specs: info.specs, model: '', category, fallback: api.title });
        }

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

// بناء منتج من ASIN اتجمع بالبحث اليدوي + بيانات الـ API (نفس METHOD بتاع الموقع القديم)
function hydrateManual(category, asins, apiItems, known) {
  const maxPrice = category.maxPrice ?? 600000;
  const minPrice = category.minPrice ?? 150;
  const stats = {
    raw: 0, dup: 0, noApi: 0, noTitle: 0, include: 0, accessory: 0,
    noImage: 0, price: 0, condition: 0, availability: 0, brand: 0, weak: 0,
  };
  const found = [];

  for (const asin of asins) {
    stats.raw++;
    if (known.has(asin)) { stats.dup++; continue; }
    const raw = apiItems.get(asin);
    if (!raw) { stats.noApi++; continue; }
    const api = normalizeItem(raw);
    if (!api.asin || !api.title) { stats.noTitle++; continue; }
    if (!category.include.test(api.title)) { stats.include++; continue; }
    if (isAccessoryTitle(category, api.title)) { stats.accessory++; continue; }
    if (!api.image) { stats.noImage++; continue; }
    if (!Number.isFinite(api.price) || api.price < minPrice || api.price > maxPrice) { stats.price++; continue; }
    if (api.condition && !/^(new|unknown)$/i.test(api.condition)) { stats.condition++; continue; }
    if (api.availability && !IN_STOCK.has(api.availability)) { stats.availability++; continue; }

    const info = describeProduct({ title: api.title, byLine: api.byLine }, category);
    const knownBrand = AUTO_ADD_BRANDS.includes(info.brand);
    const specCount = Object.keys(info.specs || {}).length;
    const brandOk = Boolean(info.brand) && !isExcludedBrand(info.brand);

    if (!brandOk) {
      stats.brand++;
      info.brand = 'غير محدد';
      info.name = buildName({ brand: info.brand, specs: info.specs, model: '', category, fallback: api.title });
    } else if (!knownBrand && specCount === 0) {
      stats.weak++;
      info.name = buildName({ brand: info.brand, specs: info.specs, model: '', category, fallback: api.title });
    }

    known.add(asin);
    found.push({ api, info });
  }
  return { items: found, stats };
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

// تحويل صف من بيانات الموقع القديم لصيغة العروض الحالية
function legacyOffer(row, category) {
  const title = String(row?.title || '').replace(/\s+/g, ' ').trim();
  const asin = String(row?.asin || '').trim();
  const price = Number(row?.price);
  if (!/^[A-Z0-9]{10}$/i.test(asin) || !title || !/^https:\/\//.test(row?.img || '')) return null;
  if (!Number.isFinite(price)) return null;
  if (!category.include.test(title)) return null;
  if (isAccessoryTitle(category, title)) return null;

  const info = describeProduct({ title, byLine: '' }, category);
  return {
    asin,
    brand: info.brand || '',
    name: info.name || title,
    specs: info.specs || {},
    model: info.model || '',
    title,
    warranty: DEFAULT_WARRANTY,
    ship: DEFAULT_SHIP,
    price,
    img: row.img,
    url: productUrl(asin),
    active: row.active !== false,
    firstSeen: row.firstSeen || '2026-01-01',
    lastGood: row.lastGood || today(),
    source: 'legacy',
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

  const seenByCat = {};
  const manualSeen = {};
  for (const cat of CATEGORIES) {
    seenByCat[cat.id] = new Set(history[cat.id]._meta?.seenAsins || []);
    manualSeen[cat.id] = new Set(history[cat.id]._meta?.manualSeen || []);
  }

  const renderOnly = process.argv.includes('--render-only') || !hasCredentials();
  let totalChanges = 0;
  let totalAdded = 0;
  let legacyAdded = 0;

  // استيراد بيانات المواقع القديمة للقلايات والميكروويف
  for (const seed of LEGACY_SEEDS) {
    const cat = CATEGORIES.find((c) => c.id === seed.category);
    if (!cat) continue;
    const rows = await loadJson(join(DATA_DIR, seed.file), []);
    if (!Array.isArray(rows)) continue;
    const existing = new Set(data[cat.id].map((o) => o.asin));
    for (const row of rows) {
      const offer = legacyOffer(row, cat);
      if (!offer || existing.has(offer.asin)) continue;
      data[cat.id].push(offer);
      existing.add(offer.asin);
      seenByCat[cat.id].add(offer.asin);
      legacyAdded++;
    }
  }
  if (legacyAdded) console.log(`🌱 استوردت ${legacyAdded} منتج من بيانات المواقع القديمة`);

  const globalKnown = new Set();
  for (const cat of CATEGORIES) {
    data[cat.id].forEach((o) => globalKnown.add(o.asin));
  }

  // بذور البحث اليدوي: كل ASIN اتجمع من كل صفحات نتائج أمازون قبل ما نربط الـ API
  const manualAsins = {};
  const pendingManual = {};
  let manualTotal = 0;
  for (const cat of CATEGORIES) {
    const rows = await loadJson(join(DATA_DIR, `manual-${cat.id}.json`), []);
    manualAsins[cat.id] = Array.isArray(rows)
      ? [...new Set(rows.map((a) => String(a || '').trim()).filter((a) => /^[A-Z0-9]{10}$/i.test(a)))]
      : [];
    pendingManual[cat.id] = manualAsins[cat.id].filter(
      (a) => !globalKnown.has(a) && !manualSeen[cat.id].has(a),
    );
    manualTotal += manualAsins[cat.id].length;
  }
  if (manualTotal) {
    const pending = Object.values(pendingManual).reduce((a, v) => a + v.length, 0);
    console.log(`🌱 بذور بحث يدوي: ${manualTotal} ASIN · ${pending} لازم يتجربوا النهاردة`);
  }

  // كل الروابط لازم تشيل تاج الأفلييت، وأي شحن فاضي يتكتب "مجاني"
  // كمان بنشيل أي إكسسوار/منظف أو براند اتضاف بالغلط في نسخة قديمة
  const oldBadBrands = new Set(['نوفا', 'يونيفرسال']);
  for (const cat of CATEGORIES) {
    for (const offer of data[cat.id]) {
      if (offer.asin) offer.url = productUrl(offer.asin);

      // تجديد الأسماء القديمة الطويلة بالصيغة المختصرة الموحّدة
      const info = describeProduct({ title: offer.title || offer.name, byLine: '' }, cat);
      const shortName = buildName({ brand: info.brand, specs: info.specs || offer.specs || {}, model: '', category: cat, fallback: offer.title || offer.name });
      if (offer.name !== shortName) {
        offer.name = shortName;
        totalChanges++;
      }
      if (!offer.brand && info.brand) offer.brand = info.brand;

      if (offer.active !== false && !offer.ship) {
        offer.ship = DEFAULT_SHIP;
        totalChanges++;
      }
      const badBrand = oldBadBrands.has(String(offer.brand || '').trim());
      const isAccessory = isAccessoryTitle(cat, offer.title || offer.name);
      if (offer.active !== false && (badBrand || isAccessory)) {
        console.log(`  اتشال (مش جهاز أو إكسسوار): ${offer.name || offer.asin}`);
        offer.active = false;
        offer.reason = 'filtered';
        totalChanges++;
      }
    }
  }

  if (renderOnly) {
    console.log('⚠️ مفاتيح Creators API مش موجودة — هيتبنى الموقع بآخر بيانات محفوظة.');
  } else {
    const allAsins = CATEGORIES.flatMap((cat) => [
      ...data[cat.id].map((o) => o.asin).filter(Boolean),
      ...pendingManual[cat.id],
    ]);
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
        // العنوان الجديد من الـ API ممكن يطلع إكسسوار، فبنعيد الفحص هنا كمان
        if (offer.active !== false && isAccessoryTitle(cat, offer.title || offer.name)) {
          console.log(`  اتشال (بعد تحديث الـ API): ${offer.name || offer.asin}`);
          offer.active = false;
          offer.reason = 'filtered';
          totalChanges++;
        }
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
        let fresh = [];
        let stats = null;
        if (manualAsins[cat.id].length) {
          // نفس طريقة الموقع القديم: البحث اليدوي بيجمع الـ ASINs، والـ API بس بيجيب التفاصيل والأسعار
          const hydrated = hydrateManual(cat, pendingManual[cat.id], items, globalKnown);
          fresh = hydrated.items;
          stats = hydrated.stats;
        } else {
          const search = await findNewItems(cat, offers, globalKnown, seenByCat[cat.id]);
          fresh = search.items.slice(0, MAX_NEW_PER_CATEGORY);
          stats = search.stats;
        }
        for (const candidate of fresh) {
          const offer = makeOffer(candidate, cat, today());
          if (manualAsins[cat.id].length) offer.source = 'manual';
          recordPrice(hist, offer.asin, offer.price);
          offers.push(offer);
          globalKnown.add(offer.asin);
          seenByCat[cat.id].add(offer.asin);
          added++;
          totalAdded++;
        }
        const via = manualAsins[cat.id].length ? 'يدوي' : 'بحث API';
        console.log(`  ${cat.title}: ${offers.filter((o) => o.active !== false).length} نشط · ${added} جديد (${via})`);
        if (stats) {
          console.log(
            `    تشخيص: خام ${stats.raw} · مكرر ${stats.dup} · بدون بيانات API ${stats.noApi || 0}` +
            ` · مش مطابق ${stats.include} · إكسسوار ${stats.accessory}` +
            ` · بدون صورة ${stats.noImage} · سعر ${stats.price} · حالة ${stats.condition + stats.availability}` +
            ` · براند غير واضح ${stats.brand} · براند مش معروف ${stats.weak}` +
            (stats.family === undefined ? '' : ` · عيلة مكررة ${stats.family}`),
          );
        }
      } catch (err) {
        console.warn(`  ${cat.title}: فشل إضافة منتجات — ${err.message}`);
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
    for (const asin of manualAsins[cat.id]) manualSeen[cat.id].add(asin);
    history[cat.id]._meta = {
      lastRun: meta.updatedAt,
      activeCount: data[cat.id].filter((o) => o.active !== false).length,
      totalCount: data[cat.id].length,
      seenAsins: [...seenByCat[cat.id]].slice(-3000),
      manualSeen: [...manualSeen[cat.id]].slice(-12000),
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
