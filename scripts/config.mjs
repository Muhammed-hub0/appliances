// إعدادات مشتركة لدليل الأجهزة المنزلية على أمازون مصر
export const MARKETPLACE = 'www.amazon.eg';
export const PARTNER_TAG = process.env.PARTNER_TAG || 'fineartslab-21';
export const CURRENCY = 'EGP';

// مصر تتبع منطقة أوروبا (EU 3.2) في Creators API
export const TOKEN_ENDPOINT = 'https://api.amazon.co.uk/auth/o2/token';
export const API_BASE = 'https://creatorsapi.amazon';

// حدود عامة (لكل قسم حدوده الخاصة في CATEGORIES)
export const MIN_PRICE = 150;
export const MAX_PRICE = 600000;
export const SEARCH_MAX_PRICE = 80000;
export const MAX_STALE_DAYS = 7;
export const MAX_NEW_PER_CATEGORY = 12;
export const MAX_STORED_PER_CATEGORY = 180;
export const HISTORY_LIMIT = 200;
export const SEARCH_PAGES = [1, 2];
export const SEARCH_ITEM_COUNT = 10;

const n = (key, label, pattern, min, max, suffix = '') => ({
  key, label, pattern, min, max, suffix, type: 'number',
});
const e = (key, label, options) => ({ key, label, options, type: 'enum' });

// كلمات تدل على إكسسوارات/قطع غيار/كتب بدل الجهاز نفسه
export const ACCESSORY_RE =
  /liner|accessor|spare|replacement|part\b|cover|case|bag|stand|holder|rack|tray|mat\b|brush|glove|tong|filter|nozzle|hose|blade\s*only|paper|parchment|silicone|mold|mould|skewer|steamer|baking|seasoning|spice|cookbook|recipe|book|guide|manual|sticker|organizer|magnet|decal|cleaning\s*kit|protection\s*film/i;

export const GENERIC_RE =
  /^(air|fryer|microwave|fridge|freezer|shaver|machine|electric|digital|portable|multi|multifunction|smart|home|new|white|black|8|\d+)$/i;

// تحويل أسماء الماركات الإنجليزية لعربي
export const BRAND_MAP = [
  [/black\s*&?\s*decker|black\+decker/i, 'بلاك أند ديكر'],
  [/black\s*&\s*white/i, 'بلاك آند وايت'],
  [/philips|versuni/i, 'فيليبس'],
  [/tefal/i, 'تيفال'],
  [/kenwood/i, 'كينوود'],
  [/midea/i, 'ميديا'],
  [/xiaomi|mi\s*home/i, 'شاومي'],
  [/ninja/i, 'نينجا'],
  [/bosch/i, 'بوش'],
  [/siemens/i, 'سيمنز'],
  [/panasonic/i, 'باناسونيك'],
  [/sharp/i, 'شارب'],
  [/tornado/i, 'تورنيدو'],
  [/fresh/i, 'فريش'],
  [/sokany|sokani/i, 'سوكاني'],
  [/akai/i, 'أكاي'],
  [/\bdsp\b/i, 'دي إس بي'],
  [/oraimo/i, 'أورايمو'],
  [/arion/i, 'أريون'],
  [/\bsilver\b|silvertine/i, 'سيلفر'],
  [/capri/i, 'كابري'],
  [/\bbenz\b/i, 'بنز'],
  [/mienta/i, 'مينتا'],
  [/hi-?way/i, 'هاي واي'],
  [/jamaki/i, 'جاماكي'],
  [/samsung/i, 'سامسونج'],
  [/\blg\b/i, 'إل جي'],
  [/hisense/i, 'هايسنس'],
  [/nutricook/i, 'نيوتريكوك'],
  [/toshiba/i, 'توشيبا'],
  [/delonghi/i, 'ديلونجي'],
  [/beko/i, 'بيكو'],
  [/arshia/i, 'أرشيا'],
  [/braun/i, 'براون'],
  [/oral-?b/i, 'أورال بي'],
  [/remington/i, 'ريمينجتون'],
  [/moulinex/i, 'مولينكس'],
  [/electrolux/i, 'إلكترولوكس'],
  [/whirlpool/i, 'ويرلبول'],
  [/ariston/i, 'أريستون'],
  [/indesit/i, 'إنديست'],
  [/candy/i, 'كاندي'],
  [/hoover/i, 'هوفر'],
  [/hitachi/i, 'هيتاشي'],
  [/gree\b/i, 'جري'],
  [/haier/i, 'هاير'],
  [/dyson/i, 'دايسون'],
  [/honeywell/i, 'هني ويل'],
  [/russell\s*hobbs/i, 'راسل هوبز'],
  [/morphy\s*richards/i, 'مورفي ريتشاردز'],
  [/teka/i, 'تاكا'],
  [/zanussi/i, 'زانوسي'],
  [/fakir/i, 'فاكير'],
  [/sinbo/i, 'سينبو'],
  [/arzum/i, 'أرزوم'],
  [/kumtel/i, 'كومتيل'],
  [/vestel/i, 'فيستل'],
  [/altus/i, 'ألتوس'],
  [/goldmaster/i, 'جولد ماستر'],
  [/wansa/i, 'وينسا'],
  [/super\s*general/i, 'سوبر جنرال'],
  [/sonar/i, 'سونار'],
  [/tcl/i, 'تي سي إل'],
  [/fuji/i, 'فوجي'],
  [/nescafe|nespresso|dolce\s*gusto/i, 'نسكافيه'],
];

// براندات مسموح للبحث التلقائي يضيف منها منتجات
export const AUTO_ADD_BRANDS = [
  'فيليبس', 'تيفال', 'بلاك أند ديكر', 'ميديا', 'نينجا', 'نيوتريكوك',
  'فريش', 'مينتا', 'سوكاني', 'كينوود', 'شارب', 'أورايمو', 'AKANE',
  'ديلونجي', 'DeLonghi', 'RAF', 'Rafal', 'توشيبا', 'Toshiba', 'NC',
  'أريون', 'تورنيدو', 'باناسونيك', 'شاومي', 'بوش', 'أكاي', 'بيكو', 'أرشيا',
  'إل جي', 'هايسنس', 'سامسونج', 'سيمنز', 'براون', 'أورال بي', 'ريمينجتون',
  'مولينكس', 'إلكترولوكس', 'ويرلبول', 'أريستون', 'إنديست', 'كاندي', 'هوفر',
  'هيتاشي', 'جري', 'هاير', 'دايسون', 'هني ويل', 'راسل هوبز', 'مورفي ريتشاردز',
  'تاكا', 'زانوسي', 'فاكير', 'سينبو', 'أرزوم', 'كومتيل', 'فيستل', 'ألتوس',
  'جولد ماستر', 'وينسا', 'سوبر جنرال', 'سونار', 'تي سي إل', 'فوجي', 'نسكافيه',
  'بيكو', 'Beko', 'LG', 'Hisense', 'Samsung', 'Siemens', 'Braun', 'Midea',
];

// براندات عامة/مش ماركات حقيقية
export const EXCLUDED_BRANDS = [
  'سيلفر', 'إير فراير', 'Dollar', 'بنز', 'Multifunctional', 'White',
  'هاي واي', 'بلاك آند وايت', 'كابري', 'GEOVINA', 'Silvertine', 'دي إس بي',
];

// تعريف الأقسام. كل قسم له بياناته وتاريخ أسعاره وجدوله وصفحاته الخاصة.
export const CATEGORIES = [
  {
    id: 'airfryers', title: 'القلايات الهوائية', short: 'قلاية هوائية', emoji: '🍟',
    queries: ['air fryer', 'airfryer', 'قلاية هوائية'],
    include: /air\s?fryer|airfryer|friteuse|قلاية/i,
    exclude: /microwave|fridge|washing|shaver/i,
    specs: [
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|liter|litre|لتر)/i, 1, 30, ''),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|watts|وات)/i, 200, 5000, ''),
      e('type', 'النوع', [[/تاتش|touch/i, 'تاتش'], [/بكر|\bbakr\b/i, 'بكر'], [/رقمي|digital/i, 'رقمي']]),
    ],
  },
  {
    id: 'microwaves', title: 'الميكروويف', short: 'ميكروويف', emoji: '🔥',
    queries: ['microwave', 'microwave oven', 'ميكروويف', 'مايكروويف'],
    include: /micro\s?wave|مايكروويف|ميكروويف/i,
    exclude: /air\s?fryer|قلاية/i,
    specs: [
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|liter|litre|لتر)/i, 10, 60, ''),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|watts|وات)/i, 400, 5000, ''),
      e('type', 'النوع', [[/grill|جريل/i, 'جريل'], [/steam|بخار/i, 'بخار'], [/touch|تاتش/i, 'تاتش'], [/digital|رقمي/i, 'رقمي']]),
    ],
  },
  {
    id: 'fridges', title: 'الثلاجات', short: 'ثلاجة', emoji: '❄️',
    queries: ['fridge', 'refrigerator', 'ثلاجة', 'ثلاجات'],
    include: /fridge|refrigerator|ثلاج/i,
    exclude: /freezer only|مagnet|organizer|cover/i,
    specs: [
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|liter|litre|لتر)/i, 50, 900, ''),
      e('type', 'نظام التبريد', [[/no\s?frost|نوفروست/i, 'نوفروست'], [/defrost|ديفروست/i, 'ديفروست'], [/inverter|إنفرتر/i, 'إنفرتر']]),
      e('door', 'نوع الباب', [[/french|فرنش/i, 'فرنش'], [/bottom\s*freezer|فريزر سفلي/i, 'فريزر سفلي'], [/side\s*by\s*side/i, 'بابين'], [/double\s*door|2\s*door|بابين/i, 'بابين']]),
    ],
  },
  {
    id: 'freezers', title: 'الفريزرات', short: 'فريزر', emoji: '🧊',
    queries: ['chest freezer', 'upright freezer', 'فريزر'],
    include: /freezer|فريزر/i,
    exclude: /fridge\s*freezer|ثلاجة|organizer|cover/i,
    specs: [
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|liter|litre|لتر)/i, 30, 900, ''),
      e('type', 'النوع', [[/chest|أفقي/i, 'أفقي'], [/upright|عمودي/i, 'عمودي']]),
    ],
  },
  {
    id: 'shavers', title: 'ماكينات الحلاقة', short: 'ماكينة حلاقة', emoji: '🪒',
    queries: ['electric shaver', 'electric razor', 'ماكينة حلاقة', 'حلاقة كهربائية'],
    include: /shaver|razor|حلاق|ماكينة\s*حلاقة/i,
    exclude: /blade\s*refill|replacement\s*head|شفرات\s*بديلة/i,
    specs: [
      e('blades', 'عدد الشفرات', [[/\b5\s*blade|5\s*شفرة/i, '5 شفرات'], [/\b4\s*blade|4\s*شفرة/i, '4 شفرات'], [/\b3\s*blade|3\s*شفرة/i, '3 شفرات'], [/\b2\s*blade|2\s*شفرة/i, '2 شفرة']]),
      e('type', 'النوع', [[/wet\s*(and|&|\/)\s*dry|مقاوم للماء|waterproof/i, 'مقاوم للماء'], [/trimmer|مقص/i, 'مقص'], [/rotary|دواري/i, 'دواري'], [/foil|شبكي/i, 'شبكي']]),
      n('battery', 'البطارية (دقيقة)', /(\d{2,4})\s*(?:min|دقيقة)/i, 20, 2000, ''),
    ],
  },
  {
    id: 'washing-machines', title: 'الغسالات', short: 'غسالة', emoji: '🧺',
    queries: ['washing machine', 'غسالة ملابس', 'غسالة'],
    include: /washing\s*machine|غسال/i,
    exclude: /washing\s*machine|غسالة ملابس|tablet|salt|rinse\s*aid/i,
    specs: [
      n('cap', 'الحمولة (كجم)', /(\d+(?:\.\d+)?)\s*(?:kg\b|كجم|كيلو)/i, 2, 25, ''),
      n('spin', 'سرعة العصر (rpm)', /(\d{3,4})\s*(?:rpm|دورة)/i, 400, 2000, ''),
      e('type', 'النوع', [[/front\s*load|تحميل أمامي/i, 'تحميل أمامي'], [/top\s*load|تحميل علوي/i, 'تحميل علوي'], [/semi|نصف أوتوماتيك/i, 'نصف أوتوماتيك'], [/automatic|أوتوماتيك/i, 'أوتوماتيك']]),
    ],
  },
  {
    id: 'dishwashers', title: 'غسالات الأطباق', short: 'غسالة أطباق', emoji: '🍽️',
    queries: ['dishwasher', 'غسالة أطباق'],
    include: /dish\s?washer|غسالة\s*أطباق/i,
    exclude: /washing\s*machine|غسالة ملابس|tablet|salt|rinse\s*aid/i,
    specs: [
      n('places', 'عدد الأماكن', /(\d{1,2})\s*(?:place|setting|مكان)/i, 4, 16, ''),
      e('type', 'النوع', [[/built\s*in|مدمج/i, 'مدمج'], [/countertop|سطح الطاولة/i, 'سطح الطاولة'], [/freestanding|قائم/i, 'قائم']]),
    ],
  },
  {
    id: 'ovens', title: 'الأفران', short: 'فرن', emoji: '🍕',
    queries: ['electric oven', 'toaster oven', 'فرن كهربائي', 'فرن'],
    include: /\boven\b|فرن|توستر/i,
    exclude: /microwave|ميكروويف|tray|rack|mitt|glove/i,
    specs: [
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|liter|litre|لتر)/i, 8, 120, ''),
      e('type', 'النوع', [[/convection|confirm|كونفكشن/i, 'كونفكشن'], [/gas|غاز/i, 'غاز'], [/built\s*in|مدمج/i, 'مدمج'], [/toaster|توستر/i, 'توستر']]),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 500, 5000, ''),
    ],
  },
  {
    id: 'coffee-machines', title: 'ماكينات القهوة', short: 'ماكينة قهوة', emoji: '☕',
    queries: ['coffee machine', 'espresso machine', 'ماكينة قهوة'],
    include: /coffee|espresso|قهوة|كافيه/i,
    exclude: /beans\s*only|filter\s*paper|cup|مكعبات|منظف/i,
    specs: [
      e('type', 'النوع', [[/capsule|kapsul|كبسولات|nespresso|dolce/i, 'كبسولات'], [/espresso|إسبريسو/i, 'إسبريسو'], [/filter|فلتر/i, 'فلتر'], [/instant|فورية/i, 'فورية']]),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 500, 4000, ''),
    ],
  },
  {
    id: 'blenders', title: 'الخلاطات', short: 'خلاط', emoji: '🥤',
    queries: ['blender', 'خلاط كهربائي', 'خلاط'],
    include: /blender|خلاط/i,
    exclude: /food\s*processor|محضرة|juicer|عصارة|jar|كوب\s*بديل/i,
    specs: [
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 100, 4000, ''),
      n('speed', 'السرعات', /(\d{1,2})\s*(?:speed|سرعة)/i, 1, 20, ''),
      e('type', 'النوع', [[/hand|يدوي/i, 'يدوي'], [/stand|قائم/i, 'قائم'], [/immersion|غاطس/i, 'غاطس']]),
    ],
  },
  {
    id: 'food-processors', title: 'محضرات الطعام', short: 'محضرة طعام', emoji: '🥣',
    queries: ['food processor', 'محضرة طعام'],
    include: /food\s*processor|محضر/i,
    exclude: /blender|خلاط|bowl|وعاء\s*بديل/i,
    specs: [
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 100, 3000, ''),
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|لتر)/i, 0.5, 10, ''),
    ],
  },
  {
    id: 'vacuum-cleaners', title: 'المكانس الكهربائية', short: 'مكنسة', emoji: '🧹',
    queries: ['vacuum cleaner', 'مكنسة كهربائية', 'مكنسة'],
    include: /vacuum|مكنس/i,
    exclude: /filter|bag|nozzle|hose|brush|غيار|كيس/i,
    specs: [
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 100, 4000, ''),
      e('type', 'النوع', [[/robot|روبوت/i, 'روبوت'], [/cordless|لاسلكي/i, 'لاسلكي'], [/upright|عمودي/i, 'عمودي'], [/handheld|يدوي/i, 'يدوي']]),
    ],
  },
  {
    id: 'irons', title: 'المكاوي', short: 'مكواة', emoji: '👔',
    queries: ['steam iron', 'iron box', 'مكواة'],
    include: /\biron\b|مكواة/i,
    exclude: /board|طاولة|cover|غلاف/i,
    specs: [
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 500, 3500, ''),
      e('type', 'النوع', [[/steam|بخار/i, 'بخار'], [/ceramic|سيراميك/i, 'سيراميك'], [/dry|جاف/i, 'جاف']]),
    ],
  },
  {
    id: 'hair-dryers', title: 'مجففات الشعر', short: 'مجفف شعر', emoji: '💨',
    queries: ['hair dryer', 'مجفف شعر', 'سيشوار'],
    include: /hair\s*dryer|blow\s*dryer|مجفف\s*شعر|سيشوار/i,
    exclude: /diffuser|nozzle|comb|فرشاة/i,
    specs: [
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 500, 3500, ''),
      n('speed', 'السرعات', /(\d{1,2})\s*(?:speed|سرعة)/i, 1, 10, ''),
    ],
  },
  {
    id: 'kettles', title: 'الغلايات', short: 'غلاية', emoji: '🫖',
    queries: ['electric kettle', 'غلاية كهربائية', 'غلاية'],
    include: /kettle|غلاي/i,
    exclude: /filter|مقياس|غطار/i,
    specs: [
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|liter|لتر)/i, 0.5, 5, ''),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 500, 3500, ''),
    ],
  },
  {
    id: 'toasters', title: 'المحمصات', short: 'محمصة', emoji: '🍞',
    queries: ['toaster', 'محمصة خبز', 'محمصة'],
    include: /toaster|محمص/i,
    exclude: /oven|فرن|bag|غطاء/i,
    specs: [
      n('slots', 'عدد الشرائح', /(\d{1,2})\s*(?:slice|شرائح|شريحة)/i, 1, 6, ''),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 400, 2500, ''),
    ],
  },
  {
    id: 'mixers', title: 'المضربات', short: 'مضرب', emoji: '🥄',
    queries: ['hand mixer', 'electric mixer', 'مضرب كهربائي'],
    include: /mixer|مضرب/i,
    exclude: /blender|خلاط|attachment|قطعة\s*بديلة/i,
    specs: [
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 100, 2000, ''),
      n('speed', 'السرعات', /(\d{1,2})\s*(?:speed|سرعة)/i, 1, 15, ''),
    ],
  },
  {
    id: 'cookers', title: 'البوتاجازات', short: 'بوتاجاز', emoji: '🔥',
    queries: ['cooking range', 'gas cooker', 'بوتاجاز'],
    include: /cooker|cooking\s*range|بوتاجاز/i,
    exclude: /rice|pressure|قدر|oven\s*only/i,
    specs: [
      n('burners', 'عدد البوات', /(\d{1,2})\s*(?:burner|بوتاج|عين)/i, 2, 8, ''),
      e('type', 'النوع', [[/gas|غاز/i, 'غاز'], [/electric|كهربائي/i, 'كهربائي'], [/built\s*in|مدمج/i, 'مدمج']]),
    ],
  },
  {
    id: 'water-heaters', title: 'السخانات', short: 'سخان', emoji: '🚿',
    queries: ['electric water heater', 'سخان ماء', 'سخان'],
    include: /water\s*heater|سخان/i,
    exclude: /filter|أنبوب|قطعة/i,
    specs: [
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|liter|لتر)/i, 5, 200, ''),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 500, 6000, ''),
    ],
  },
  {
    id: 'air-conditioners', title: 'التكييفات', short: 'تكييف', emoji: '🌬️',
    queries: ['air conditioner', 'تكييف', 'مكيف'],
    include: /air\s*conditioner|تكييف|مكيف/i,
    exclude: /filter|cover|غلاف|remote|ريموت/i,
    specs: [
      n('hp', 'القدرة (حصان)', /(\d+(?:\.\d+)?)\s*(?:hp\b|حصان)/i, 0.5, 5, ''),
      e('type', 'النوع', [[/split|سبليت/i, 'سبليت'], [/window|شباك/i, 'شباك'], [/portable|متنقل/i, 'متنقل']]),
      e('cool', 'التبريد', [[/inverter|إنفرتر/i, 'إنفرتر'], [/heat\s*pump|تبريد وتدفئة/i, 'تبريد وتدفئة'], [/cooling only|تبريد فقط/i, 'تبريد فقط']]),
    ],
  },
  {
    id: 'fans', title: 'المراوح', short: 'مروحة', emoji: '🌀',
    queries: ['electric fan', 'مروحة', 'مراوح'],
    include: /\bfan\b|مروح/i,
    exclude: /blade|cover|غلاف|motor|موتور/i,
    specs: [
      n('size', 'المقاس (بوصة)', /(\d{1,2})\s*(?:inch|بوصة|")/i, 8, 30, ''),
      e('type', 'النوع', [[/tower|برج/i, 'برج'], [/ceiling|سقف/i, 'سقف'], [/stand|أرضية/i, 'أرضية'], [/table|طاولة/i, 'طاولة'], [/exhaust|شفاط/i, 'شفاط']]),
    ],
  },
  {
    id: 'rice-cookers', title: 'أجهزة طهي الأرز', short: 'طباخ أرز', emoji: '🍚',
    queries: ['rice cooker', 'طباخ أرز'],
    include: /rice\s*cooker|طباخ\s*أرز/i,
    exclude: /inner\s*pot|قدر\s*بديل/i,
    specs: [
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|liter|لتر)/i, 0.5, 10, ''),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 200, 2000, ''),
    ],
  },
  {
    id: 'pressure-cookers', title: 'قدور الضغط', short: 'قدر ضغط', emoji: '🍲',
    queries: ['electric pressure cooker', 'قدر ضغط كهربائي', 'قدر ضغط'],
    include: /pressure\s*cooker|قدر\s*ضغط/i,
    exclude: /gasket|ختم|قطعة|valve/i,
    specs: [
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|liter|لتر)/i, 2, 20, ''),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 400, 2500, ''),
    ],
  },
  {
    id: 'juicers', title: 'العصارات', short: 'عصارة', emoji: '🍊',
    queries: ['juicer', 'عصارة', 'عصير'],
    include: /juic|عصار|عصير/i,
    exclude: /blender|خلاط|filter|فلتر/i,
    specs: [
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 100, 2000, ''),
      e('type', 'النوع', [[/centrifugal|طرد مركزي/i, 'طرد مركزي'], [/slow|بطيء/i, 'بطيء'], [/citrus|حمضيات/i, 'حمضيات']]),
    ],
  },
];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);
export const CATEGORY_BY_ID = new Map(CATEGORIES.map((c) => [c.id, c]));
