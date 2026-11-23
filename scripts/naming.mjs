import { BRAND_MAP, EXCLUDED_BRANDS, GENERIC_RE } from './config.mjs';

const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

export function toEnglishDigits(value) {
  return String(value ?? '').replace(/[٠-٩۰-۹]/g, (d) => {
    const ar = AR_DIGITS.indexOf(d);
    if (ar >= 0) return String(ar);
    const fa = FA_DIGITS.indexOf(d);
    return fa >= 0 ? String(fa) : d;
  });
}

function trimNumber(n) {
  return Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2)));
}

export function extractModel(text) {
  const t = toEnglishDigits(text).toUpperCase();
  const inParens = t.match(/\(([A-Z0-9][A-Z0-9\-/]{3,})\)/);
  if (inParens) return inParens[1];
  const dashed = t.match(/\b([A-Z]{1,4}\d{2,4}[A-Z0-9\-/]{0,6})\b/);
  if (dashed) return dashed[1];
  return '';
}

function cleanBrandToken(token) {
  return String(token || '')
    .replace(/[®™©]/g, '')
    .replace(/[^\p{L}\p{N}&\s-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const ARABIC_BRANDS = [
  'بلاك آند وايت', 'بلاك أند ديكر', 'دي إس بي', 'هاي واي', 'باناسونيك',
  'نيوتريكوك', 'سيلفرتين', 'ديلونجي', 'تورنيدو', 'سامسونج', 'كينوود',
  'فيليبس', 'تيفال', 'نينجا', 'شاومي', 'سوكاني', 'جاماكي', 'أورايمو',
  'أريون', 'ميديا', 'شارب', 'فريش', 'أكاي', 'سيلفر', 'كابري', 'مينتا',
  'بوش', 'بنز', 'إل جي', 'هايسنس', 'سيمنز', 'براون', 'أورال بي',
  'ريمينجتون', 'مولينكس', 'إلكترولوكس', 'ويرلبول', 'أريستون', 'إنديست',
  'كاندي', 'هوفر', 'هيتاشي', 'جري', 'هاير', 'دايسون', 'هني ويل',
  'وينسا', 'سونار', 'نسكافيه', 'بيكو', 'أرشيا',
];

const LATIN_BRANDS = [
  'Silvertine', 'GEOVINA', 'Multifunctional', 'Dollar', 'White', 'AKANE',
  'RAF', 'Rafal', 'NC', 'Beko', 'LG', 'Hisense', 'Samsung', 'Siemens',
];

export function detectBrand(title, byLine = '') {
  const haystack = `${title || ''} ${byLine || ''}`;
  for (const [re, arabic] of BRAND_MAP) {
    if (re.test(haystack)) return arabic;
  }
  for (const arabic of ARABIC_BRANDS) {
    if (haystack.includes(arabic)) return arabic;
  }
  for (const latin of LATIN_BRANDS) {
    const word = new RegExp(`(^|[^a-z])${latin}([^a-z]|$)`, 'i');
    const start = new RegExp(`^\\s*(?:the\\s+)?${latin}\\b`, 'i');
    if (word.test(byLine || '') || start.test(title || '')) return latin;
  }
  return cleanBrandToken(byLine) || cleanBrandToken(String(title || '').split(/[\s,|/]+/)[0]);
}

export function isExcludedBrand(brand) {
  if (!brand) return true;
  const b = String(brand).trim();
  if (EXCLUDED_BRANDS.includes(b)) return true;
  return GENERIC_RE.test(b);
}

// استخراج مواصفات القسم من عنوان المنتج
export function extractSpecs(title, category) {
  const t = toEnglishDigits(title || '').replace(/,/g, '.');
  const specs = {};

  for (const spec of category.specs || []) {
    if (spec.type === 'number') {
      const m = t.match(spec.pattern);
      if (!m || !m[1]) continue;
      const value = Number(m[1]);
      if (!Number.isFinite(value) || value < spec.min || value > spec.max) continue;
      specs[spec.key] = trimNumber(value);
    } else if (spec.type === 'enum') {
      for (const [re, label] of spec.options || []) {
        if (re.test(t)) {
          specs[spec.key] = label;
          break;
        }
      }
    }
  }

  return specs;
}

function unitFor(spec, category) {
  if (spec.suffix) return spec.suffix;
  switch (spec.key) {
    case 'cap':
      if (category.id === 'washing-machines') return ' كجم';
      if (category.id === 'microwaves' || category.id === 'ovens') return ' لتر';
      return ' لتر';
    case 'watt': return ' وات';
    case 'spin': return ' rpm';
    case 'hp': return ' حصان';
    case 'size': return ' بوصة';
    case 'places': return ' مكان';
    case 'slots': return ' شرائح';
    case 'burners': return ' بوات';
    case 'battery': return ' دقيقة';
    case 'speed': return ' سرعة';
    default: return '';
  }
}

export function buildName({ brand, specs, model, category, fallback = '' }) {
  const parts = [];
  if (brand) parts.push(brand);

  for (const spec of category.specs || []) {
    const value = specs[spec.key];
    if (!value) continue;
    const unit = spec.type === 'number' ? unitFor(spec, category) : '';
    parts.push(`${value}${unit}`);
  }

  let name = parts.join(' ').replace(/\s+/g, ' ').trim();
  if (model) name = `${name} (${model})`.trim();
  if (!name) name = String(fallback || '').replace(/\s+/g, ' ').trim().slice(0, 95);
  return name.slice(0, 105);
}

export function describeProduct({ title, byLine }, category) {
  const brand = detectBrand(title, byLine);
  const specs = extractSpecs(title, category);
  const model = extractModel(title);
  const name = buildName({ brand, specs, model, category, fallback: title });
  return { brand, specs, model, name };
}

// مفتاح تمييز المنتج (نفس المواصفات = منتج واحد، بنخلي الأرخص بس)
export function productKey(offer) {
  const specs = Object.entries(offer.specs || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|');
  return [offer.brand || '', offer.model || '', specs, String(offer.name || '').replace(/\s+/g, ' ').trim()].join('|');
}
