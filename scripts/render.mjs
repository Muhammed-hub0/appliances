import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  CATEGORIES,
  CATEGORY_BY_ID,
  EXCLUDED_BRANDS,
  GROUPS,
  CATEGORY_COVERS,
  MARKETPLACE,
  MAX_PRICE,
  MIN_PRICE,
  PARTNER_TAG,
  isAccessoryTitle,
  typesOf,
  typeOf,
} from './config.mjs';
import { productKey } from './naming.mjs';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));
export const DATA_DIR = join(ROOT, 'data');
export const OUT_DIR = join(ROOT, 'public');
export const SITE_URL = (process.env.SITE_URL || 'https://muhammed-hub0.github.io/appliances/').replace(/\/$/, '');

const emptyDash = '—';

const esc = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatPrice = (value) =>
  Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatDate = (value) => {
  const date = value ? new Date(value) : new Date();
  try {
    return new Intl.DateTimeFormat('ar-EG', {
      dateStyle: 'long', timeStyle: 'short', timeZone: 'Africa/Cairo',
    }).format(date);
  } catch {
    return date.toISOString().slice(0, 16).replace('T', ' ');
  }
};

// الصفوف اللي هتظهر: نشِطة + سعر منطقي + صورة + مش براند مستثنى + من غير تكرار
export function visibleOffers(offers, category) {
  const min = category.minPrice ?? MIN_PRICE;
  const max = category.maxPrice ?? MAX_PRICE;
  const list = (offers || [])
    .filter((o) => o && o.active !== false)
    .filter((o) => !isAccessoryTitle(category, o.title || o.name))
    .filter((o) => !EXCLUDED_BRANDS.includes(String(o.brand || '').trim()))
    .filter((o) => Number.isFinite(Number(o.price)))
    .map((o) => ({ ...o, price: Number(o.price) }))
    .filter((o) => o.price >= min && o.price <= max)
    .filter((o) => typeof o.img === 'string' && /^https:\/\//.test(o.img))
    .sort((a, b) => a.price - b.price);

  const seen = new Set();
  const rows = [];
  for (const offer of list) {
    const key = productKey(offer);
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push(offer);
  }
  return rows;
}

function tracker() {
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=G-X7SD1FVX33"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-X7SD1FVX33');
</script>`;
}

function siteHeader(back = '') {
  return `<header class="top"><div class="wrap head">
  <div class="brand"><a href="${back}index.html"><img src="${back}assets/logo.jpg" alt="مشترياتك صح"></a><b>مشترياتك صح · دليل الأجهزة المنزلية</b></div>
  <div class="socials">
    <a class="social-pill" href="https://www.facebook.com/share/1d5zsrA3L8/" target="_blank" rel="noopener">صفحتنا</a>
    <a class="social-pill" href="https://www.facebook.com/share/g/1HzNFsMQCc/" target="_blank" rel="noopener">الجروب</a>
    <a class="social-pill" href="https://chat.whatsapp.com/Dujjs3WZxVZ5tlEBNnZN2W?s=cl&amp;p=a&amp;iam=2" target="_blank" rel="noopener">واتساب</a>
    <button id="themeToggleBtn" class="theme-btn" type="button" title="تغيير المظهر"><span id="themeIcon">🌙</span></button>
  </div>
</div></header>`;
}

function themeScript() {
  return `(function () {
  var btn = document.getElementById('themeToggleBtn');
  var icon = document.getElementById('themeIcon');
  try {
    if (localStorage.getItem('appliances-theme') === 'dark') {
      document.documentElement.dataset.theme = 'dark';
      if (icon) icon.textContent = '☀️';
    }
  } catch (e) {}
  if (!btn) return;
  btn.addEventListener('click', function () {
    var dark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = dark ? 'light' : 'dark';
    if (icon) icon.textContent = dark ? '🌙' : '☀️';
    try { localStorage.setItem('appliances-theme', dark ? 'light' : 'dark'); } catch (e) {}
  });
})();`;
}

function filterScript(category) {
  const numericKeys = '[]';
  return `(function () {
  var rows = Array.prototype.slice.call(document.querySelectorAll('#tbl tbody tr'));
  var specKeys = [];
  var numericKeys = ${numericKeys};
  var controls = [{ el: document.getElementById('fBrand'), attr: 'data-brand' }];
  specKeys.forEach(function (k) {
    controls.push({ el: document.getElementById('f_' + k), attr: 'data-spec-' + k });
  });
  var fMin = document.getElementById('fMin');
  var fMax = document.getElementById('fMax');
  var cnt = document.getElementById('cnt');
  var total = rows.length;

  function value(el) { return el ? el.value : ''; }
  function limit(el) {
    var n = parseFloat(el.value);
    return isNaN(n) ? null : n;
  }
  function isNumeric(attr) {
    return attr === 'data-price' || numericKeys.indexOf(attr.replace('data-spec-', '')) !== -1;
  }

  function matches(r, skipAttr) {
    for (var i = 0; i < controls.length; i++) {
      var c = controls[i];
      if (skipAttr === c.attr) continue;
      var v = value(c.el);
      if (v && r.getAttribute(c.attr) !== v) return false;
    }
    var p = parseFloat(r.getAttribute('data-price'));
    var mn = limit(fMin), mx = limit(fMax);
    if (mn !== null && p < mn) return false;
    if (mx !== null && p > mx) return false;
    return true;
  }

  function fill(c, skipAttr) {
    var sel = c.el;
    if (!sel) return;
    var current = value(sel);
    var set = {};
    rows.forEach(function (r) {
      if (!matches(r, skipAttr)) return;
      var v = r.getAttribute(c.attr);
      if (v) set[v] = 1;
    });
    var vals = Object.keys(set);
    vals.sort(isNumeric(c.attr)
      ? function (a, b) { return parseFloat(a) - parseFloat(b); }
      : function (a, b) { return a.localeCompare(b, 'ar'); });
    while (sel.options.length > 1) sel.remove(1);
    vals.forEach(function (v) {
      var o = document.createElement('option');
      o.value = v;
      o.textContent = v;
      sel.appendChild(o);
    });
    sel.value = (current && vals.indexOf(current) !== -1) ? current : '';
  }

  function refresh() {
    for (var pass = 0; pass < 3; pass++) {
      var before = controls.map(function (c) { return value(c.el); }).join('|');
      controls.forEach(function (c) { fill(c, c.attr); });
      if (controls.map(function (c) { return value(c.el); }).join('|') === before) break;
    }
  }

  function apply() {
    var shown = 0;
    rows.forEach(function (r) {
      var ok = matches(r, null);
      r.style.display = ok ? '' : 'none';
      r.className = ok && (shown % 2 === 1) ? 'alt' : '';
      if (ok) shown++;
    });
    if (cnt) cnt.textContent = shown + ' من ' + total + ' منتج';
  }

  function update() { refresh(); apply(); }

  controls.forEach(function (c) {
    if (!c.el) return;
    c.el.addEventListener('input', update);
    c.el.addEventListener('change', update);
  });
  [fMin, fMax].forEach(function (el) {
    el.addEventListener('input', update);
    el.addEventListener('change', update);
  });
  var reset = document.getElementById('fReset');
  if (reset) reset.addEventListener('click', function () {
    controls.forEach(function (c) { if (c.el) c.el.value = ''; });
    fMin.value = ''; fMax.value = '';
    update();
  });
  update();
})();`;
}

const BASE_CSS = `
:root{--bg:#f6f7f9;--surface:#ffffff;--surface-alt:#f0f3f7;--text:#1b1f24;--muted:#5d6670;--line:#e3e6ea;--a:#1c3d63;--b:#9a6f1e;--win:#0f7a4a;--accent:#b8892f;color-scheme:light}
:root[data-theme="dark"]{--bg:#0b1a2b;--surface:#11273f;--surface-alt:#183350;--text:#eceff2;--muted:#9aa4af;--line:#27415e;--a:#86b4e8;--b:#e0c080;--win:#4fd08f;--accent:#e0c080;color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:"Cairo","Segoe UI",Tahoma,Arial,sans-serif;line-height:1.65;transition:background-color .2s ease,color .2s ease}
a{color:var(--a);text-decoration:none}
a:hover{text-decoration:underline}
.wrap{max-width:1140px;margin:0 auto;padding:16px}
.surface-card{background:var(--surface);border:1px solid var(--line);border-radius:16px}
header.top{background:var(--surface);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20}
.head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-block:10px}
.brand{display:flex;align-items:center;gap:10px}
.brand img{width:44px;height:44px;border-radius:12px;border:1px solid var(--line)}
.brand b{font-size:17px;font-weight:800}
.socials{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.social-pill{display:inline-flex;align-items:center;gap:6px;padding:7px 11px;border-radius:12px;text-decoration:none;font-size:12px;font-weight:700;color:var(--text);background:var(--surface-alt);border:1px solid var(--line)}
.theme-btn{padding:7px 11px;border-radius:12px;border:1px solid var(--line);background:var(--surface-alt);color:var(--text);font-weight:700;cursor:pointer}
h1{font-size:23px;margin:18px 0 8px}
.lead{color:var(--muted);font-size:14px;margin:0 0 16px}
.ft{margin:18px 0 0;color:var(--muted);font-size:12px;line-height:1.9}
.notice{color:var(--b);font-weight:800}
@media(max-width:720px){
  .wrap{padding:8px}
  h1{font-size:18px}
  .brand b{font-size:13px}
  .brand img{width:36px;height:36px}
  .social-pill{font-size:11px;padding:5px 8px}
}
`;

const HUB_CSS = `
.big-groups{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:18px 0}
.big-group{display:flex;flex-direction:column;align-items:flex-start;gap:10px;min-height:230px;padding:22px;background:var(--surface);border:1px solid var(--line);border-radius:18px;transition:transform .15s ease,border-color .15s ease}
.big-group:hover{transform:translateY(-3px);border-color:var(--b);text-decoration:none}
.big-emoji{font-size:44px;line-height:1;display:flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:16px;background:var(--surface-alt)}
.big-img{display:block;width:100%;height:120px;object-fit:cover;border-radius:14px;background:var(--surface-alt)}
.big-group b{font-size:20px;font-weight:800;color:var(--text)}
.big-group .meta{font-size:13px;color:var(--muted)}
.big-group .go{font-size:13px;color:var(--win);font-weight:800;margin-top:auto}
.breadcrumb{font-size:13px;color:var(--muted);margin-bottom:6px}
@media(max-width:700px){.big-groups{grid-template-columns:1fr}.big-group{min-height:150px;padding:16px}.big-emoji{width:54px;height:54px;font-size:32px}.big-img{height:110px}.big-group b{font-size:17px}}
.searchbox{display:flex;gap:10px;align-items:center;margin:14px 0 18px}
.searchbox input{flex:1;min-width:0}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:8px}
.cat{display:flex;flex-direction:column;gap:8px;padding:16px;background:var(--surface);border:1px solid var(--line);border-radius:16px;transition:transform .15s ease,border-color .15s ease}
.cat:hover{transform:translateY(-3px);border-color:var(--b);text-decoration:none}
.cat .cat-img{width:100%;height:110px;object-fit:contain;background:var(--surface-alt);border-radius:12px;padding:8px}
.cat .emoji{font-size:30px;line-height:1;height:110px;display:flex;align-items:center;justify-content:center;background:var(--surface-alt);border-radius:12px}
.cat b{font-size:16px;font-weight:800;color:var(--text)}
.cat .meta{font-size:12px;color:var(--muted)}
.cat .go{font-size:12px;color:var(--win);font-weight:800;margin-top:auto}
.cat.empty{opacity:.55}
.group{margin:24px 0 6px}
.group h2{font-size:19px;margin:0 0 10px;padding-inline-start:10px;border-inline-start:4px solid var(--b)}
.group .grid{margin-top:0}
#noCats{color:var(--muted);font-weight:700;padding:18px;text-align:center}
@media(max-width:900px){.grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:650px){.grid{grid-template-columns:repeat(2,1fr)}.cat{padding:12px}.cat b{font-size:14px}}
`;

const TABLE_CSS = `
.breadcrumb{font-size:13px;color:var(--muted);margin-bottom:6px}
.banner{display:block;width:100%;height:auto;border-radius:16px;border:1px solid var(--line);margin:0 0 14px}
.group-hero{display:block;width:100%;max-height:220px;object-fit:cover;border-radius:16px;border:1px solid var(--line);margin:0 0 16px}
.bar{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;padding:12px 14px;margin-bottom:14px}
.fld{display:flex;flex-direction:column;gap:4px}
.fld label{font-size:12px;color:var(--muted);font-weight:600}
select,input{font-family:inherit;font-size:14px;padding:9px 11px;border:2px solid var(--line);border-radius:12px;background:var(--surface);color:var(--text);min-width:130px}
button.reset{font-family:inherit;font-size:14px;padding:9px 14px;border:1px solid var(--b);border-radius:12px;background:var(--b);color:#fff;font-weight:700;cursor:pointer}
:root[data-theme="dark"] button.reset{color:#0b1a2b}
.cnt{font-size:13px;color:var(--win);font-weight:700;margin-inline-start:auto;padding-bottom:8px}
.tablewrap{overflow-x:auto}
table{width:100%;border-collapse:separate;border-spacing:0;overflow:hidden;font-size:14px}
th{background:var(--a);color:#fff;padding:11px 10px;text-align:right;position:sticky;top:0;z-index:1;white-space:nowrap}
td{padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}
tr.alt td{background:var(--surface-alt)}
.n{color:var(--muted);width:34px}
.nm{font-weight:700;min-width:190px}
.nm a{color:var(--text)}
.nm a:hover{color:var(--a)}
.sp{white-space:nowrap}
.p{font-weight:800;white-space:nowrap;color:var(--win)}
.w{color:var(--muted);font-size:12px}
.im{width:90px;text-align:center}
.lk a{display:inline-block;padding:6px 10px;border-radius:9px;background:var(--a);color:#fff;font-size:12px;white-space:nowrap}
.lk a:hover{text-decoration:none;opacity:.9}
@media(max-width:720px){
  .bar{padding:10px}
  select,input{font-size:13px;padding:8px;min-width:0;width:100%}
  .fld{flex:1 1 130px}
  .cnt{width:100%;margin-inline-start:0;padding-bottom:0}
  .tablewrap{overflow:visible}
  table{font-size:12px;table-layout:fixed;width:100%}
  th:nth-child(1),td.n{display:none}
  th,td{padding:6px 4px;overflow-wrap:anywhere}
  .nm{min-width:0;white-space:normal}
  .im{width:52px}
  .im img{width:48px;height:48px}
  .p{font-size:12px}
  .lk a{padding:5px 7px;font-size:11px}
}
`;

const DETAIL_CSS = `
.card{margin-top:14px;padding:16px;display:grid;grid-template-columns:220px 1fr;gap:18px;align-items:start}
.pic{text-align:center}
.pic img{width:100%;max-height:270px;object-fit:contain}
.name{font-size:19px;font-weight:800;margin:0 0 6px}
.price{font-size:23px;font-weight:800;color:var(--win);margin:10px 0}
dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:7px 14px;font-size:14px}
dt{color:var(--muted)}
dd{margin:0;font-weight:700}
.buy{display:inline-block;margin-top:14px;padding:10px 18px;border-radius:12px;background:var(--win);color:#fff;font-weight:800}
.buy:hover{opacity:.9;text-decoration:none}
.back{display:inline-block;margin-bottom:4px;font-size:13px;font-weight:700}
.note{color:var(--muted);font-size:12px;margin-top:18px}
@media(max-width:600px){
  .card{grid-template-columns:1fr;padding:12px}
  .pic img{max-height:200px}
  .name{font-size:16px}
  dl{grid-template-columns:1fr;gap:2px}
  dd{margin-bottom:6px}
}
`;

function footer(rowsCount, meta) {
  return `<div class="ft">
  <div class="notice">تنويه: يجب مراجعة السعر والمواصفات الفنية من صفحة المنتج على أمازون قبل الشراء.</div>
  <div>آخر فحص تلقائي: ${esc(formatDate(meta?.updatedAt))} · ${rowsCount} منتج معروض</div>
  <div>كأفلييت أمازون: قد نحصل على عمولة من عمليات الشراء اللي بتحصل عن طريق روابط الصفحة، من غير أي تكلفة إضافية عليك. الأسعار بتتحدث تلقائيًا وقد تختلف لحظة الشراء.</div>
</div>`;
}

function renderHubCard(cat, stats, covers, base = '') {
  const count = stats[cat.id] || 0;
  const cover = covers[cat.id];
  const visual = cover
    ? `<img class="cat-img" src="${esc(cover)}" loading="lazy" alt="${esc(cat.title)}">`
    : `<span class="emoji">${cat.emoji}</span>`;
  return `<a class="cat${count === 0 ? ' empty' : ''}" href="${base}c/${cat.id}/index.html" data-name="${esc(cat.title + ' ' + cat.short + ' ' + cat.id)}">
    ${visual}
    <b>${esc(cat.title)}</b>
    <span class="meta">${count} منتج متوفر</span>
    <span class="go">اعرض المنتجات ←</span>
  </a>`;
}

// المستوى 1: الصفحة الرئيسية — 3 أقسام كبيرة بس
export function renderHub(stats, meta) {
  const cards = GROUPS.map((group) => {
    const cats = group.ids.map((id) => CATEGORY_BY_ID.get(id)).filter(Boolean);
    const total = cats.reduce((sum, c) => sum + (stats[c.id] || 0), 0);
    const visual = group.image
      ? `<img class="big-img" src="${esc(group.image)}" loading="lazy" alt="${esc(group.title)}">`
      : `<span class="big-emoji">${group.emoji}</span>`;
    return `<a class="big-group" href="groups/${group.id}/index.html">
  ${visual}
  <b>${esc(group.title)}</b>
  <span class="meta">${cats.length} أقسام · ${total} منتج</span>
  <span class="go">اعرض الأقسام ←</span>
</a>`;
  }).join('\n');

  return `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>دليل الأجهزة المنزلية في مصر | مشترياتك صح</title>
<meta name="description" content="قارن أسعار كل الأجهزة المنزلية على أمازون مصر: قلايات، ميكروويف، ثلاجات، مكانس، غسالات وأكثر. تحديث تلقائي كل 6 ساعات.">
<meta name="theme-color" content="#0f253d">
<meta property="og:type" content="website">
<meta property="og:title" content="دليل الأجهزة المنزلية في مصر | مشترياتك صح">
<meta property="og:description" content="اختر الجهاز المطلوب وقارن الأسعار والمواصفات من أمازون مصر.">
<meta property="og:image" content="assets/og-image.jpg">
<link rel="icon" href="assets/logo.jpg">
${tracker()}
<style>${BASE_CSS}${HUB_CSS}</style></head><body>
${siteHeader()}
<main class="wrap">
<h1>كل الأجهزة المنزلية في مكان واحد 🏠</h1>
<p class="lead">اختر القسم الرئيسي، وبعدين نوع الجهاز، وشوف كل الأسعار والمواصفات من أمازون مصر.</p>
<div class="big-groups">
${cards}
</div>
${footer(Object.values(stats).reduce((a, b) => a + b, 0), meta)}
</main>
<script>${themeScript()}</script>
</body></html>`;
}

// المستوى 2: صفحة القسم الرئيسي — فيها الأقسام الفرعية (أنواع الأجهزة)
export function renderGroup(group, stats, covers, meta) {
  const cats = group.ids.map((id) => CATEGORY_BY_ID.get(id)).filter(Boolean);
  const cards = cats.map((cat) => renderHubCard(cat, stats, covers, '../../')).join('\n');
  const total = cats.reduce((sum, c) => sum + (stats[c.id] || 0), 0);

  return `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(group.title)} | مشترياتك صح</title>
<meta name="description" content="اختر نوع الجهاز من قسم ${esc(group.title)} وقارن أسعاره على أمازون مصر.">
<meta name="theme-color" content="#0f253d">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(group.title)} | مشترياتك صح">
<meta property="og:image" content="../../assets/og-image.jpg">
<link rel="icon" href="../../assets/logo.jpg">
${tracker()}
<style>${BASE_CSS}${HUB_CSS}</style></head><body>
${siteHeader('../../')}
<main class="wrap">
<div class="breadcrumb"><a href="../../index.html">كل الأجهزة</a> ← ${esc(group.title)}</div>
<h1>${group.emoji} ${esc(group.title)}</h1>
<p class="lead">${cats.length} قسم · ${total} منتج متوفر — اختر نوع الجهاز عشان تشوف المقارنة الكاملة.</p>
${group.image ? `<img class="group-hero" src="../../${esc(group.image)}" alt="${esc(group.title)}">` : ''}
<div class="grid">
${cards}
</div>
${footer(total, meta)}
</main>
<script>${themeScript()}</script>
</body></html>`;
}

export function groupOf(categoryId) {
  return GROUPS.find((g) => g.ids.includes(categoryId)) || GROUPS[0];
}

// المواصفات اندمجت في الاسم المختصر، فصفحة المقارنة فيها سعر بس بدون أعمدة مواصفات
function renderSpecHead(category) {
  return '';
}

function renderSpecCells(offer, category) {
  return '';
}

function renderRows(rows, category, detailPrefix = 'p/') {
  return rows
    .map((offer, index) => {
      const url = esc(offer.url || `https://${MARKETPLACE}/dp/${offer.asin}?tag=${PARTNER_TAG}`);
      const detail = `${detailPrefix}${encodeURIComponent(offer.asin)}.html`;
      const image = `<a href='${detail}'><img src='${esc(offer.img)}' loading='lazy' alt='${esc(offer.name)}' style='width:76px;height:76px;object-fit:contain'></a>`;
      return `<tr data-brand='${esc(offer.brand || '')}' data-price='${offer.price}'>
<td class='n'>${index + 1}</td>
<td class='im'>${image}</td>
<td class='nm'><a href='${detail}'>${esc(offer.name)}</a></td>
<td class='w'>${esc(offer.brand || emptyDash)}</td>
${renderSpecCells(offer, category)}
<td class='p'>${formatPrice(offer.price)} ج.م</td>
<td class='lk'><a href='${url}' target='_blank' rel='nofollow sponsored'>أمازون</a></td>
</tr>`;
    })
    .join('\n');
}

// جدول المقارنة (بيستخدم لصفحة "كل المنتجات" ولصفحة كل نوع)
export function renderListPage(category, offers, meta, group = null, opts = {}) {
  const {
    assetBase = '../../',
    detailPrefix = 'p/',
    categoryHref = 'index.html',
    tail = 'كل المنتجات',
    heading = `${category.emoji} ${esc(category.title)} على أمازون مصر`,
    pageTitle = `${category.title} في مصر`,
  } = opts;
  const rows = visibleOffers(offers, category);

  return `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(pageTitle)} | مشترياتك صح</title>
<meta name="description" content="قارن أسعار ${esc(category.title)} على أمازون مصر مع تحديث تلقائي للمواصفات والأسعار.">
<meta name="theme-color" content="#0f253d">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(category.title)} في مصر | مشترياتك صح">
<meta property="og:image" content="${assetBase}assets/og-image.jpg">
<link rel="icon" href="${assetBase}assets/logo.jpg">
${tracker()}
<style>${BASE_CSS}${TABLE_CSS}</style></head><body>
${siteHeader(assetBase)}
<main class="wrap">
<div class="breadcrumb"><a href="${assetBase}index.html">كل الأجهزة</a> ← ${group ? `<a href="${assetBase}groups/${group.id}/index.html">${esc(group.title)}</a> ← ` : ''}<a href="${categoryHref}">${esc(category.title)}</a> ← ${esc(tail)}</div>
<h1>${heading}</h1>
<p class="lead">${rows.length} منتج متوفر حاليًا — الأسعار بتتحدث تلقائيًا كل 6 ساعات.</p>
<img class="banner" src="${assetBase}assets/banner.jpg" alt="مشترياتك صح" style="width:100%;border-radius:16px;border:1px solid var(--line)">
<div class="bar surface-card">
  <div class="fld"><label for="fBrand">البراند</label><select id="fBrand"><option value="">الكل</option></select></div>
  <div class="fld"><label for="fMin">السعر من</label><input id="fMin" type="number" inputmode="numeric" placeholder="0" min="0"></div>
  <div class="fld"><label for="fMax">السعر إلى</label><input id="fMax" type="number" inputmode="numeric" placeholder="∞" min="0"></div>
  <button id="fReset" class="reset" type="button">مسح الفلاتر</button>
  <div class="cnt" id="cnt">${rows.length} من ${rows.length} منتج</div>
</div>
<div class="tablewrap"><table id="tbl" class="surface-card">
<thead><tr><th></th><th>الصورة</th><th>الاسم</th><th>البراند</th>${renderSpecHead(category)}<th>السعر</th><th>الرابط</th></tr></thead>
<tbody>
${renderRows(rows, category, detailPrefix)}
</tbody></table></div>
${footer(rows.length, meta)}
</main>
<script>
${filterScript(category)}
${themeScript()}
</script>
</body></html>`;
}

function renderTypeCard(type, count, href) {
  return `<a class="cat${count === 0 ? ' empty' : ''}" href="${href}">
    <span class="emoji">${type.emoji}</span>
    <b>${esc(type.title)}</b>
    <span class="meta">${count} منتج متوفر</span>
    <span class="go">اعرض المنتجات ←</span>
  </a>`;
}

// صفحة القسم بقت بتفتح كروت الأنواع (زي الصفحة الرئيسية)، وكل نوع بيفتح جدوله
export function renderCategoryHub(category, offers, meta, group = null) {
  const rows = visibleOffers(offers, category);
  const counts = {};
  for (const o of rows) {
    const t = typeOf(category, o);
    counts[t] = (counts[t] || 0) + 1;
  }
  const cards = [
    renderTypeCard({ emoji: category.emoji, title: `كل ${category.title}` }, rows.length, 'all.html'),
    ...typesOf(category.id)
      .filter((t) => (counts[t.id] || 0) > 0)
      .map((t) => renderTypeCard(t, counts[t.id], `t/${t.id}.html`)),
  ].join('\n');

  return `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(category.title)} في مصر | مشترياتك صح</title>
<meta name="description" content="اختر نوع ${esc(category.title)} وقارن الأسعار على أمازون مصر.">
<meta name="theme-color" content="#0f253d">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(category.title)} في مصر | مشترياتك صح">
<meta property="og:image" content="../../assets/og-image.jpg">
<link rel="icon" href="../../assets/logo.jpg">
${tracker()}
<style>${BASE_CSS}${HUB_CSS}</style></head><body>
${siteHeader('../../')}
<main class="wrap">
<div class="breadcrumb"><a href="../../index.html">كل الأجهزة</a> ← ${group ? `<a href="../../groups/${group.id}/index.html">${esc(group.title)}</a> ← ` : ''}${esc(category.title)}</div>
<h1>${category.emoji} ${esc(category.title)}</h1>
<p class="lead">${rows.length} منتج متوفر — اختر النوع عشان تشوف مقارنة الأسعار الكاملة.</p>
<div class="grid">
${cards}
</div>
${footer(rows.length, meta)}
</main>
<script>${themeScript()}</script>
</body></html>`;
}

export function renderDetail(offer, category, meta) {
  const specs = (category.specs || [])
    .filter((s) => offer.specs?.[s.key])
    .map((s) => `<dt>${esc(s.label)}</dt><dd>${esc(offer.specs[s.key])}</dd>`)
    .join('\n');
  const url = esc(offer.url || `https://${MARKETPLACE}/dp/${offer.asin}?tag=${PARTNER_TAG}`);

  return `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(offer.name)} | ${esc(category.title)} | مشترياتك صح</title>
<meta name="description" content="تفاصيل وسعر ${esc(offer.name)} على أمازون مصر.">
<meta name="theme-color" content="#0f253d">
<link rel="icon" href="../../../assets/logo.jpg">
${tracker()}
<style>${BASE_CSS}${DETAIL_CSS}</style></head><body>
${siteHeader('../../../')}
<main class="wrap">
<a class="back" href="../index.html">← الرجوع لـ ${esc(category.title)}</a>
<div class="card surface-card">
  <div class="pic"><img src="${esc(offer.img)}" alt="${esc(offer.name)}"></div>
  <div>
    <p class="name">${esc(offer.name)}</p>
    <div class="price">${esc(formatPrice(offer.price))} ج.م</div>
    <dl>
      <dt>البراند</dt><dd>${esc(offer.brand || emptyDash)}</dd>
      ${specs}
      <dt>الموديل</dt><dd>${esc(offer.model || emptyDash)}</dd>
      <dt>الضمان</dt><dd>${esc(offer.warranty || emptyDash)}</dd>
      <dt>الشحن</dt><dd>${esc(offer.ship || emptyDash)}</dd>
    </dl>
    <a class="buy" href="${url}" target="_blank" rel="nofollow sponsored">اشترِ من أمازون</a>
  </div>
</div>
<div class="ft">
  <div class="notice">تنويه: يجب مراجعة السعر والمواصفات الفنية من صفحة المنتج على أمازون قبل الشراء.</div>
  <div>آخر فحص تلقائي: ${esc(formatDate(meta?.updatedAt))} · السعر قد يتغير لحظة الشراء.</div>
</div>
</main>
<script>${themeScript()}</script>
</body></html>`;
}

function csvCell(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

export function renderCsv(offers, category) {
  const rows = visibleOffers(offers, category);
  const lines = [['م', 'الصورة', 'الاسم', 'البراند', ...(category.specs || []).map((s) => s.label), 'السعر', 'الرابط']];
  rows.forEach((offer, index) => {
    lines.push([
      index + 1,
      offer.img || '',
      offer.name || '',
      offer.brand || '',
      ...(category.specs || []).map((s) => offer.specs?.[s.key] || ''),
      offer.price,
      offer.url || '',
    ]);
  });
  return '\uFEFF' + lines.map((line) => line.map(csvCell).join(',')).join('\r\n');
}

function renderSitemap(stats, typeCounts = {}) {
  const urls = [
    `${SITE_URL}/`,
    ...GROUPS.map((g) => `${SITE_URL}/groups/${g.id}/index.html`),
    ...CATEGORIES.filter((c) => stats[c.id] > 0).flatMap((c) => [
      `${SITE_URL}/c/${c.id}/index.html`,
      `${SITE_URL}/c/${c.id}/all.html`,
      ...Object.entries(typeCounts[c.id] || {})
        .filter(([, n]) => n > 0)
        .map(([tid]) => `${SITE_URL}/c/${c.id}/t/${tid}.html`),
    ]),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${esc(u)}</loc></url>`).join('\n')}
</urlset>`;
}

export async function writePublic(allData, meta = {}) {
  const stats = {};
  const covers = {};
  const typeCounts = {};
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(join(OUT_DIR, 'assets'), { recursive: true });
  await writeFile(join(OUT_DIR, '.nojekyll'), '', 'utf8');
  await writeFile(join(OUT_DIR, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`, 'utf8');

  for (const category of CATEGORIES) {
    const offers = allData[category.id] || [];
    const rows = visibleOffers(offers, category);
    stats[category.id] = rows.length;
    // صورة القسم = صورة عامة معزولة اتختارت مسبقًا، والصورة القديمة بتاع أول منتج كحل احتياطي
    covers[category.id] = CATEGORY_COVERS[category.id]
      || rows.find((o) => typeof o.img === 'string' && /^https:\/\//.test(o.img))?.img
      || '';

    const group = groupOf(category.id);
    const dir = join(OUT_DIR, 'c', category.id);
    await rm(join(dir, 'p'), { recursive: true, force: true });
    await rm(join(dir, 't'), { recursive: true, force: true });
    await mkdir(join(dir, 'p'), { recursive: true });
    await mkdir(join(dir, 't'), { recursive: true });

    // صفحة القسم = كروت الأنواع (زي الرئيسية)، وكل نوع له جدول مستقل
    const counts = {};
    const byType = {};
    for (const o of rows) {
      const t = typeOf(category, o);
      counts[t] = (counts[t] || 0) + 1;
      (byType[t] ||= []).push(o);
    }
    typeCounts[category.id] = counts;

    await writeFile(join(dir, 'index.html'), renderCategoryHub(category, offers, meta, group), 'utf8');
    await writeFile(join(dir, 'all.html'), renderListPage(category, offers, meta, group, {
      tail: 'كل المنتجات',
      heading: `${category.emoji} كل ${esc(category.title)} على أمازون مصر`,
      pageTitle: `كل ${category.title}`,
    }), 'utf8');
    await Promise.all(
      typesOf(category.id)
        .filter((t) => counts[t.id] > 0)
        .map((t) => writeFile(join(dir, 't', `${t.id}.html`), renderListPage(category, byType[t.id], meta, group, {
          assetBase: '../../../',
          detailPrefix: '../p/',
          categoryHref: '../index.html',
          tail: t.title,
          heading: `${t.emoji} ${esc(t.title)}`,
          pageTitle: `${t.title} | ${category.title}`,
        }), 'utf8')),
    );
    await writeFile(join(dir, `all-${category.id}.csv`), renderCsv(offers, category), 'utf8');
    await Promise.all(
      rows.map((offer) =>
        writeFile(join(dir, 'p', `${offer.asin}.html`), renderDetail(offer, category, meta), 'utf8'),
      ),
    );
  }

  for (const group of GROUPS) {
    const dir = join(OUT_DIR, 'groups', group.id);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, 'index.html'), renderGroup(group, stats, covers, meta), 'utf8');
  }

  await writeFile(join(OUT_DIR, 'index.html'), renderHub(stats, meta), 'utf8');
  await writeFile(join(OUT_DIR, 'sitemap.xml'), renderSitemap(stats, typeCounts), 'utf8');
  return stats;
}

async function main() {
  const all = {};
  for (const cat of CATEGORIES) {
    try {
      all[cat.id] = JSON.parse(await readFile(join(DATA_DIR, `${cat.id}.json`), 'utf8'));
    } catch {
      all[cat.id] = [];
    }
  }
  const stats = await writePublic(all, { updatedAt: new Date().toISOString() });
  console.log('تم بناء الصفحات:', stats);
}

if (process.argv[1] && process.argv[1].endsWith('render.mjs')) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
