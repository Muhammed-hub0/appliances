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

// ترتيب أهم المواصفات في الاسم المختصر لكل قسم (اثنتين بالكثير)
const NAME_SPEC_PRIORITY = {
  airfryers: ['cap', 'watt', 'type'],
  microwaves: ['cap', 'type', 'watt'],
  fridges: ['cap', 'door', 'type'],
  freezers: ['cap', 'type'],
  shavers: ['gender', 'blades', 'type'],
  'washing-machines': ['cap', 'type', 'spin'],
  dishwashers: ['places', 'type'],
  ovens: ['cap', 'type', 'watt'],
  'coffee-machines': ['type', 'watt'],
  blenders: ['watt', 'type', 'speed'],
  'food-processors': ['cap', 'watt'],
  'vacuum-cleaners': ['type', 'watt'],
  irons: ['type', 'watt'],
  'hair-dryers': ['watt', 'speed'],
  kettles: ['cap', 'watt'],
  toasters: ['slots', 'watt'],
  mixers: ['watt', 'speed'],
  cookers: ['burners', 'type'],
  'water-heaters': ['cap', 'watt'],
  'air-conditioners': ['hp', 'type', 'cool'],
  fans: ['size', 'type'],
  hoods: ['size', 'type'],
  'rice-cookers': ['cap', 'watt'],
  'pressure-cookers': ['cap', 'watt'],
  juicers: ['type', 'watt'],
};

// أسماء أقصر للأنواع اللي عنوانها الأصلي طويل
// أسماء مختصرة للبراندات المكوّنة من كلمتين أو أكتر عشان الاسم يفضل 4 كلمات
const BRAND_SHORT = {
  'بلاك أند ديكر': 'بلاك',
  'بلاك آند وايت': 'بلاك',
  'هاي واي': 'هاي',
  'راسل هوبز': 'راسل',
  'مورفي ريتشاردز': 'مورفي',
  'جولد ماستر': 'جولد',
  'سوبر جنرال': 'سوبر',
  'وايت بوينت': 'وايت',
  'لا جرمانيا': 'جرمانيا',
  'يونيون إير': 'يونيون',
  'يونيون تك': 'يونيون',
  'أورال بي': 'أورال',
};

const DEVICE_SHORT = {
  airfryers: 'قلاية',
  shavers: 'حلاقة',
  'coffee-machines': 'قهوة',
  'food-processors': 'محضرة',
  'hair-dryers': 'سيشوار',
  'dishwashers': 'أطباق',
  hoods: 'شفاط',
};

const SPEC_LABEL_SHORT = {
  'تحميل أمامي': 'أمامي',
  'تحميل علوي': 'علوي',
  'سطح الطاولة': 'طاولة',
  'تبريد وتدفئة': 'تدفئة',
  '5 شفرات': '5شفات',
  '4 شفرات': '4شفات',
  '3 شفرات': '3شفات',
  '2 شفرة': '2شفرة',
};

const SHORT_UNITS = {
  cap: 'لتر', watt: 'وات', spin: 'rpm', hp: 'حصان', size: 'بوصة',
  places: 'مكان', slots: 'شرائح', burners: 'بوات', battery: 'دقيقة', speed: 'سرعة',
};

const LATIN_BRANDS = [
  'Silvertine', 'GEOVINA', 'Multifunctional', 'Dollar', 'White', 'AKANE',
  'RAF', 'Rafal', 'NC', 'Beko', 'LG', 'Hisense', 'Samsung', 'Siemens',
];

function matchBrandMap(text) {
  if (!text) return '';
  for (const [re, arabic] of BRAND_MAP) {
    if (re.test(text)) return arabic;
  }
  for (const arabic of ARABIC_BRANDS) {
    if (text.includes(arabic)) return arabic;
  }
  return '';
}

export function detectBrand(title, byLine = '') {
  const line = String(byLine || '').trim();
  const heading = String(title || '');

  // براند أمازون الرسمي هو الأدق، فبنستخدمه قبل أي كلمة في العنوان
  const fromLine = matchBrandMap(line);
  if (fromLine) return fromLine;

  const fromTitle = matchBrandMap(heading);
  if (fromTitle) return fromTitle;

  for (const latin of LATIN_BRANDS) {
    const start = new RegExp(`^\\s*(?:the\\s+)?${latin}\\b`, 'i');
    const word = new RegExp(`(^|[^a-z])${latin}([^a-z]|$)`, 'i');
    if (start.test(heading) || word.test(line)) return latin;
  }

  // byLine ساعات بيبقى جملة طويلة ("Visit the X Store") — نرفضه لو كده
  if (line && line.split(/\s+/).length <= 4) return cleanBrandToken(line);
  return cleanBrandToken(heading.split(/[\s,|/]+/)[0]);
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

function shortSpecText(spec, value, category) {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  const mapped = SPEC_LABEL_SHORT[text] || text;
  if (spec.type !== 'number') return mapped.replace(/\s+/g, '');
  let unit = SHORT_UNITS[spec.key] || '';
  if (spec.suffix) unit = spec.suffix.replace(/^\s+/, '');
  if (spec.key === 'cap' && category?.id === 'washing-machines') unit = 'كجم';
  return `${mapped}${unit}`;
}

export function buildName({ brand, specs, model, category, fallback = '' }) {
  const rawBrand = brand && !isExcludedBrand(brand) ? String(brand).trim() : '';
  const safeBrand = BRAND_SHORT[rawBrand] || rawBrand;
  const device = DEVICE_SHORT[category?.id] || category?.short || category?.title || 'جهاز';
  const parts = [safeBrand, device].filter(Boolean);

  const specMap = new Map((category?.specs || []).map((spec) => [spec.key, spec]));
  const priority = NAME_SPEC_PRIORITY[category?.id]
    || (category?.specs || []).map((spec) => spec.key);

  for (const key of priority) {
    if (parts.length >= 4) break;
    const spec = specMap.get(key);
    const raw = specs?.[key];
    if (!spec || !raw) continue;
    const text = shortSpecText(spec, raw, category);
    if (text && !parts.includes(text)) parts.push(text);
  }

  const wordCount = () => parts.join(' ').trim().split(/\s+/).filter(Boolean).length;
  while (wordCount() > 4 && parts.length > 2) parts.pop();

  return parts.join(' ').replace(/\s+/g, ' ').trim().slice(0, 105);
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
