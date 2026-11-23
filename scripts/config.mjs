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
export const SEARCH_MAX_PRICE = 300000;
export const MAX_STALE_DAYS = 7;
// بنضيف أكبر عدد ممكن من منتجات أمازون في كل قسم، مش 15 بس
export const MAX_NEW_PER_CATEGORY = 120;
export const MAX_STORED_PER_CATEGORY = 2000;
export const HISTORY_LIMIT = 200;
export const SEARCH_PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const SEARCH_ITEM_COUNT = 10;

const n = (key, label, pattern, min, max, suffix = '') => ({
  key, label, pattern, min, max, suffix, type: 'number',
});
const e = (key, label, options) => ({ key, label, options, type: 'enum' });

// عبارات تدل على إكسسوارات/قطع غيار/كتب بدل الجهاز نفسه.
// متعمّدة إنها عبارات مركّبة عشان كلمات زي "filter" أو "bag" أو "stand" أو "cleaner"
// بتيجي كمان في عنوان الجهاز نفسه (stand mixer / bagless vacuum / vacuum cleaner).
export const ACCESSORY_RE =
  /\b(replacement|spare)\s+(part|parts|filter|filters|bag|bags|blade|blades|head|heads|kit|kits|brush|brushes|tray|trays|rack|racks|pot|pots|nozzle|nozzles)\b|\baccessor(y|ies)\b|\bcompatible\s+with\b|\bcookbook\b|\brecipe\s+book\b|\bcleaning\s+(?:kit|tablet|pods?|liquid|spray)\b|\bprotective\s+(?:cover|case)\b|\bsilicone\s+(?:liner|liners|mat|mats|pot|pots|mold|mould|tray|trays)\b|\bparchment\s+paper\b|\bmagnet\b|\borganizer\b|\bsticker\b|\bdecal\b|\bمنظف\b|\breplacement\b|\bspare\b|\b(?:glass\s*plate|turntable)\s+(?:for\s+)?(?:microwave|oven)\b|\bstorage\s+(?:box|container|bin)\b|\b(?:washing\s*machine|fridge|freezer|oven|dishwasher|air\s*conditioner)\s+cover\b|\brefill\s+kit\b|\bwater\s+filter\s+refill\b|\b(?:blade|cover|case|head|nozzle|filter|bag|hose)\s+only\b/i;

export const GENERIC_RE =
  /^(air|fryer|microwave|fridge|freezer|shaver|machine|electric|digital|portable|multi|multifunction|smart|home|new|white|black|generic|unbranded|8|\d+|قلاية|قلايه|ميكروويف|مايكروويف|ثلاجة|ثلاجه|فريزر|غسالة|غساله|مكنسة|مكنسه|مكواة|مكواه|غلاية|غلايه|محمصة|محمصه|خلاط|مضرب|فرن|بوتاجاز|سخان|تكييف|مروحة|مروحه|عصارة|عصاره|قدر|ماكينة|ماكينه|جهاز|طقم|عدة|أدوات|ادوات)$/i;

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
  [/tornado/i, 'تورنيدو'],
  [/sokany|sokani/i, 'سوكاني'],
  [/akai/i, 'أكاي'],
  [/\bdsp\b/i, 'دي إس بي'],
  [/oraimo/i, 'أورايمو'],
  [/arion/i, 'أريون'],
  [/mienta/i, 'مينتا'],
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
  [/\bcandy\b/i, 'كاندي'],
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
  [/\bsonar\b/i, 'سونار'],
  [/\btcl\b/i, 'تي سي إل'],
  [/\bfuji\b/i, 'فوجي'],
  [/nescafe|nespresso|dolce\s*gusto/i, 'نسكافيه'],
  [/\bcarrier\b/i, 'كارير'],
  [/nikai/i, 'نيكاي'],
  [/sonashi/i, 'سوناشي'],
  [/impex/i, 'إمبكس'],
  [/hoffmans?/i, 'هوفمانز'],
  [/\bwahl\b/i, 'وول'],
  [/kemei/i, 'كيمي'],
  [/konka/i, 'كونكا'],
  [/unionaire/i, 'يونيون إير'],
  [/white\s*point/i, 'وايت بوينت'],
  [/\belba\b/i, 'إلبا'],
  [/la\s*germania/i, 'لا جرمانيا'],
  [/zanussi/i, 'زانوسي'],
  [/bompani/i, 'بومباني'],
  [/kiriazi/i, 'كريازي'],
  [/\bolympic\b/i, 'أوليمبيك'],
  [/union\s*tech/i, 'يونيون تك'],
  [/haier/i, 'هاير'],
  [/tefal/i, 'تيفال'],
  [/sencor/i, 'سينكور'],
  [/german\s*pool/i, 'جيرمان بول'],
  [/homestar/i, 'هوم ستار'],
  [/geepas/i, 'جيباس'],
  [/sanford/i, 'سانفورد'],
  // أسماء ممكن تتلخبط مع كلمات وصفية (لون/صفة) — بنحطها الآخر
  [/silvertine/i, 'سيلفر'],
  [/\bsilver\b/i, 'سيلفر'],
  [/\bcapri\b/i, 'كابري'],
  [/\bbenz\b/i, 'بنز'],
  [/hi-?way/i, 'هاي واي'],
  [/\bsharp\b/i, 'شارب'],
  [/\bfresh\b/i, 'فريش'],
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
  'كارير', 'نيكاي', 'سوناشي', 'إمبكس', 'هوفمانز', 'وول', 'كيمي', 'كونكا',
  'يونيون إير', 'وايت بوينت', 'إلبا', 'لا جرمانيا', 'بومباني', 'كريازي',
  'أوليمبيك', 'يونيون تك', 'سينكور', 'جيرمان بول', 'هوم ستار',
  'جيباس', 'سانفورد',
];

// براندات عامة/مش ماركات حقيقية
export const EXCLUDED_BRANDS = [
  'سيلفر', 'إير فراير', 'Dollar', 'بنز', 'Multifunctional', 'White',
  'هاي واي', 'بلاك آند وايت', 'كابري', 'GEOVINA', 'Silvertine', 'دي إس بي',
  'Silver', 'Capri', 'Benz', 'Hi-Way', 'High Way', 'Generic', 'Unbranded',
  'No Brand', 'NoName', 'OEM', 'Other', 'Home', 'Kitchen', 'Household',
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
    queries: ['chest freezer', 'deep freezer', 'upright freezer', 'فريزر'],
    include: /freezer|فريزر/i,
    exclude: /fridge\s*freezer|ثلاجة|organizer|cover|\bbags?\b|ice\s*pack|container/i,
    specs: [
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|liter|litre|لتر)/i, 30, 900, ''),
      e('type', 'النوع', [[/chest|أفقي/i, 'أفقي'], [/upright|عمودي/i, 'عمودي']]),
    ],
  },
  {
    id: 'shavers', title: 'ماكينات الحلاقة', short: 'ماكينة حلاقة', emoji: '🪒',
    // بحث شامل للرجالي والنسائي في قسم واحد، والتمييز بينهم عن طريق فلتر «النوع»
    queries: [
      'electric shaver', 'electric razor', 'beard trimmer', 'men shaver',
      'women shaver', 'ladies shaver', 'women epilator', 'bikini trimmer',
      'ماكينة حلاقة', 'حلاقة كهربائية', 'ماكينة حلاقة نسائية', 'إزالة شعر',
    ],
    include: /shaver|razor|trimmer|epilat|grooming|bikini|حلاق|ماكينة\s*حلاقة|تشذيب|إزالة\s*شعر/i,
    exclude: /blade\s*refill|replacement\s*head|شفرات\s*بديلة|pet\s*groom|\bdog\b|\bcat\b|كلاب|قطط/i,
    specs: [
      e('gender', 'الفئة', [[/women|ladies|female|نسائ|بنات|bikini|epilat|إزالة/i, 'نسائي'], [/men|male|رجال|رجالي|beard|moustache|ذقن|شارب/i, 'رجالي']]),
      e('blades', 'عدد الشفرات', [[/\b5\s*blade|5\s*شفرة/i, '5 شفرات'], [/\b4\s*blade|4\s*شفرة/i, '4 شفرات'], [/\b3\s*blade|3\s*شفرة/i, '3 شفرات'], [/\b2\s*blade|2\s*شفرة/i, '2 شفرة']]),
      e('type', 'النوع', [[/wet\s*(and|&|\/)\s*dry|مقاوم للماء|waterproof/i, 'مقاوم للماء'], [/trimmer|مقص/i, 'مقص'], [/rotary|دواري/i, 'دواري'], [/foil|شبكي/i, 'شبكي']]),
      n('battery', 'البطارية (دقيقة)', /(\d{2,4})\s*(?:min|دقيقة)/i, 20, 2000, ''),
    ],
  },
  {
    id: 'washing-machines', title: 'الغسالات', short: 'غسالة', emoji: '🧺',
    queries: ['washing machine', 'غسالة ملابس', 'غسالة أوتوماتيك'],
    include: /washing\s*machine|غسالة\s*(?:ملابس|أوتوماتيك|اتوماتيك|فوق|تحميل)|غسال/i,
    exclude: /dish\s?washer|غسالة\s*(?:أطباق|اطباق)|tablet|salt|rinse\s*aid|detergent|منظف/i,
    specs: [
      n('cap', 'الحمولة (كجم)', /(\d+(?:\.\d+)?)\s*(?:kg\b|كجم|كيلو)/i, 2, 25, ''),
      n('spin', 'سرعة العصر (rpm)', /(\d{3,4})\s*(?:rpm|دورة)/i, 400, 2000, ''),
      e('type', 'النوع', [[/front\s*load|تحميل أمامي/i, 'تحميل أمامي'], [/top\s*load|تحميل علوي/i, 'تحميل علوي'], [/semi|نصف أوتوماتيك/i, 'نصف أوتوماتيك'], [/automatic|أوتوماتيك/i, 'أوتوماتيك']]),
    ],
  },
  {
    id: 'dishwashers', title: 'غسالات الأطباق', short: 'غسالة أطباق', emoji: '🍽️',
    queries: ['dishwasher', 'غسالة أطباق', 'غسالة اطباق'],
    include: /dish\s?washer|غسالة\s*(?:أطباق|اطباق)/i,
    exclude: /washing\s*machine|غسالة\s*ملابس|tablet|capsule|powder|\bgel\b|salt|rinse\s*aid|detergent|منظف/i,
    specs: [
      n('places', 'عدد الأماكن', /(\d{1,2})\s*(?:place|setting|مكان)/i, 4, 16, ''),
      e('type', 'النوع', [[/built\s*in|مدمج/i, 'مدمج'], [/countertop|سطح الطاولة/i, 'سطح الطاولة'], [/freestanding|قائم/i, 'قائم']]),
    ],
  },
  {
    id: 'ovens', title: 'الأفران', short: 'فرن', emoji: '🍕',
    queries: ['electric oven', 'toaster oven', 'فرن كهربائي', 'فرن'],
    include: /\boven\b|فرن|توستر/i,
    exclude: /microwave|ميكروويف|mitt|glove|cleaner|منظف/i,
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
    exclude: /beans\s*only|filter\s*paper|مكعبات|منظف|\btable\b|\bmug\b|\bcup\b|grinder|\bpod\s*only\b/i,
    specs: [
      e('type', 'النوع', [[/capsule|kapsul|كبسولات|nespresso|dolce/i, 'كبسولات'], [/espresso|إسبريسو/i, 'إسبريسو'], [/filter|فلتر/i, 'فلتر'], [/instant|فورية/i, 'فورية']]),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 500, 4000, ''),
    ],
  },
  {
    id: 'blenders', title: 'الخلاطات', short: 'خلاط', emoji: '🥤',
    queries: ['blender', 'خلاط كهربائي', 'خلاط'],
    include: /blender|خلاط/i,
    exclude: /food\s*processor|محضرة|juicer|عصارة|كوب\s*بديل/i,
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
    exclude: /blender|خلاط|وعاء\s*بديل/i,
    specs: [
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 100, 3000, ''),
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|لتر)/i, 0.5, 10, ''),
    ],
  },
  {
    id: 'vacuum-cleaners', title: 'المكانس الكهربائية', short: 'مكنسة', emoji: '🧹',
    queries: ['vacuum cleaner', 'cordless vacuum', 'مكنسة كهربائية', 'مكنسة'],
    include: /vacuum|hoover|مكنس/i,
    exclude: /replacement\s+filter|dust\s+bag\s+only|أكياس\s+غيار|كيس\s+غيار|flask|thermos|bottle|sealer|\bcontainer\b/i,
    specs: [
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 100, 4000, ''),
      e('type', 'النوع', [[/robot|روبوت/i, 'روبوت'], [/cordless|لاسلكي/i, 'لاسلكي'], [/upright|عمودي/i, 'عمودي'], [/handheld|يدوي/i, 'يدوي']]),
    ],
  },
  {
    id: 'irons', title: 'المكاوي', short: 'مكواة', emoji: '👔',
    queries: ['steam iron', 'iron box', 'electric iron', 'مكواة'],
    include: /\b(?:steam|dry|electric)\s+iron\b|\biron\s*(?:box|steam)\b|مكواة/i,
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
    exclude: /hair\s*brush|round\s*brush|فرشاة\s*شعر/i,
    specs: [
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 500, 3500, ''),
      n('speed', 'السرعات', /(\d{1,2})\s*(?:speed|سرعة)/i, 1, 10, ''),
    ],
  },
  {
    id: 'kettles', title: 'الغلايات', short: 'غلاية', emoji: '🫖',
    queries: ['electric kettle', 'غلاية كهربائية', 'غلاية'],
    include: /kettle|غلاي/i,
    exclude: /kettlebell|\bbell\b|مقياس|غطار/i,
    specs: [
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|liter|لتر)/i, 0.5, 5, ''),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 500, 3500, ''),
    ],
  },
  {
    id: 'toasters', title: 'المحمصات', short: 'محمصة', emoji: '🍞',
    queries: ['toaster', 'محمصة خبز', 'محمصة'],
    include: /toaster|محمص/i,
    exclude: /oven|فرن|غطاء/i,
    specs: [
      n('slots', 'عدد الشرائح', /(\d{1,2})\s*(?:slice|شرائح|شريحة)/i, 1, 6, ''),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 400, 2500, ''),
    ],
  },
  {
    id: 'mixers', title: 'المضربات', short: 'مضرب', emoji: '🥄',
    queries: ['hand mixer', 'electric mixer', 'مضرب كهربائي'],
    include: /mixer|مضرب/i,
    exclude: /blender|خلاط|قطعة\s*بديلة|audio|sound|\bdj\b|paint|cement|plaster/i,
    specs: [
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 100, 2000, ''),
      n('speed', 'السرعات', /(\d{1,2})\s*(?:speed|سرعة)/i, 1, 15, ''),
    ],
  },
  {
    id: 'cookers', title: 'البوتاجازات', short: 'بوتاجاز', emoji: '🔥',
    queries: ['cooking range', 'gas cooker', 'gas stove', 'بوتاجاز'],
    include: /cooker|cooking\s*range|\bstove\b|بوتاجاز/i,
    exclude: /rice|pressure|قدر|oven\s*only|cleaner|منظف/i,
    specs: [
      n('burners', 'عدد البوات', /(\d{1,2})\s*(?:burner|بوتاج|عين)/i, 2, 8, ''),
      e('type', 'النوع', [[/gas|غاز/i, 'غاز'], [/electric|كهربائي/i, 'كهربائي'], [/built\s*in|مدمج/i, 'مدمج']]),
    ],
  },
  {
    id: 'water-heaters', title: 'السخانات', short: 'سخان', emoji: '🚿',
    queries: ['electric water heater', 'water geyser', 'سخان ماء', 'سخان'],
    include: /water\s*heater|geyser|\bboiler\b|سخان/i,
    exclude: /أنبوب|قطعة/i,
    specs: [
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|liter|لتر)/i, 5, 200, ''),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 500, 6000, ''),
    ],
  },
  {
    id: 'air-conditioners', title: 'التكييفات', short: 'تكييف', emoji: '🌬️',
    queries: ['air conditioner', 'تكييف', 'مكيف'],
    include: /air\s*conditioner|\bac\b|split\s*ac|تكييف|مكيف/i,
    exclude: /cover|غلاف|adapter|charger|dc\s*ac|motor|home\s*services|\bservice\b|تركيب/i,
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
    exclude: /cover|غلاف|heater|سخان|\btoy\b|لعبة/i,
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
    exclude: /gasket|ختم|قطعة/i,
    specs: [
      n('cap', 'السعة (لتر)', /(\d+(?:\.\d+)?)\s*(?:l\b|ltr|liter|لتر)/i, 2, 20, ''),
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 400, 2500, ''),
    ],
  },
  {
    id: 'juicers', title: 'العصارات', short: 'عصارة', emoji: '🍊',
    queries: ['juicer', 'عصارة', 'عصير'],
    include: /juic|عصار|عصير/i,
    exclude: /blender|خلاط|\bbottle\b|\bcup\b|\bglass\b|زجاجة/i,
    specs: [
      n('watt', 'القدرة (وات)', /(\d{3,4})\s*(?:w\b|watt|وات)/i, 100, 2000, ''),
      e('type', 'النوع', [[/centrifugal|طرد مركزي/i, 'طرد مركزي'], [/slow|بطيء/i, 'بطيء'], [/citrus|حمضيات/i, 'حمضيات']]),
    ],
  },
];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);
export const CATEGORY_BY_ID = new Map(CATEGORIES.map((c) => [c.id, c]));

// تقسيم الصفحة الرئيسية لمجموعات كبيرة، بكل مجموعة شبكة كروت مستقلة
export const GROUPS = [
  {
    id: 'large', title: 'أجهزة منزلية كبيرة', emoji: '🏠',
    ids: ['fridges', 'freezers', 'washing-machines', 'dishwashers', 'ovens', 'cookers', 'air-conditioners', 'water-heaters'],
  },
  {
    id: 'small', title: 'أجهزة منزلية صغيرة', emoji: '🍳',
    ids: ['airfryers', 'microwaves', 'coffee-machines', 'blenders', 'food-processors', 'vacuum-cleaners', 'irons', 'kettles', 'toasters', 'mixers', 'fans', 'rice-cookers', 'pressure-cookers', 'juicers'],
  },
  {
    id: 'personal', title: 'العناية الشخصية', emoji: '🪒',
    ids: ['shavers', 'hair-dryers'],
  },
];

// قواعد تنقيح خاصة بكل قسم: لازم العنوان يذكر الجهاز نفسه، ومش كافي يذكر كلمة
// عامة زي "juice" أو "diffuser" أو "portafilter" اللي بتيجي في الإكسسوارات.
export const CATEGORY_FILTERS = {
  airfryers: {
    device: /air\s?fryer|airfryer|friteuse|قلاية/i,
    accessory: /\bair\s*fryer\s+(?:basket|tray|rack|liner|paper)\b|\bbasket\s+for\s+air\s*fryer\b|\bcrisping\s+plate\b/i,
  },
  microwaves: {
    device: /micro\s?wave|مايكروويف|ميكروويف/i,
    accessory: /\bmicrowave\s+(?:cover|liner|tray|rack)\b|\bmicrowave\s+oven\s+(?:rack|tray|cover|liner)\b|\b(?:cover|liner|tray|rack)\s+for\s+microwave\b|\bmicrowave\s+oven\s+cleaner\b|\bplate\s+stacker\b|\bsplatter\s+cover\b|\b(?:baking\s+dish|casserole|glass\s+dish)\b.*\bmicrowave\b|\bmicrowave\b.*\b(?:baking\s+dish|casserole|glass\s+dish)\b/i,
  },
  fridges: {
    device: /fridge|refrigerator|ثلاج/i,
    accessory: /(?:^|[\s,(-])(?:fridge|refrigerator)?\s*(?:deodorizer|odor\s+eliminator|moisture\s+absorber|drying\s+sticks?|diatom\s+drying)\b(?!\s*filter)|\bfridge\s+(?:liner|mat|organizer|bin|shelf|door\s+seal)\b|\b(?:liner|organizer|bin|shelf)\s+for\s+(?:fridge|refrigerator)\b|\b(?:fridge|refrigerator)\s+lock\b|^\s*pyrex\b|\bpyrex\b.*\b(?:fridge|refrigerator)\b|\bfood\s+storage\b|\bstorage\s+bowl\b|\bmood\s+board\b|\bmagnetic\b.*\bfridge\b|\bfridge\b.*\bmagnetic\b|\bmobile\s+base\b.*\b(?:refrigerator|washing\s+machine)\b|ممتص\s+رطوبة|معطر\s+ثلاجة/i,
  },
  freezers: {
    device: /freezer|فريزر/i,
    accessory: /(?:^|[\s,(-])(?:freezer)?\s*(?:deodorizer|odor\s+eliminator|moisture\s+absorber|drying\s+sticks?|diatom\s+drying)\b(?!\s*filter)|\bfreezer\s+(?:bag|container|cover|liner|mat)\b|\b(?:bag|container|cover|liner)\s+for\s+freezer\b|\bice\s+(?:cube\s+)?(?:tray|mold|mould|maker)\b|\bice\s+tray\b|\bfreezer\s+labels?\b|\bfood\s+storage\b|\bstorage\s+bowl\b|\b(?:fridge|refrigerator|freezer)\s+lock\b|\bchild\s+safety\s+latch\b|ممتص\s+رطوبة|\bfreezer\s+mates\b/i,
  },
  shavers: {
    device: /shaver|razor|trimmer|epilat|grooming|bikini|حلاق|ماكينة\s*حلاقة|تشذيب|إزالة\s*شعر/i,
    accessory: /^blade\b|\bblades?\s+(?:refill|replacement)\b|\brefill\s+(?:blades?|cartridges?|heads?)\b|\breplacement\s+(?:blades?|heads?|cartridges?)\b|\b(?:disposable|manual|straight\s*edge)\s+razor\b|\bshaving\s+(?:brush|bowl|cup|bib|cape)\b|\bbeard\s+bib\b|شفرات\s*(?:بديلة|غيار)|فرشاة\s*حلاقة|كريم\s*حلاقة/i,
  },
  'washing-machines': {
    device: /washing\s*machine|غسالة\s*(?:ملابس|أوتوماتيك|اتوماتيك|فوق|تحميل)|غسال/i,
    accessory: /\b(?:washing\s*machine|washer)\s+(?:intake\s+|drain\s+|pull\s+)?hose\b|\b(?:intake|drain|pull)\s+hose\b.*\b(?:washing\s*machine|washer)\b|\b(?:filter\s+bag|lint\s+bag|door\s+seal)\b.*\b(?:washing\s*machine|washer)\b|\b(?:washing\s*machine|washer)\s+(?:leather\s+)?cover\b|\bcover\s+for\s+(?:washing\s*machine|washer)\b|خرطوم\s*غسالة|كيس\s*فلتر\s*غسالة/i,
  },
  dishwashers: {
    device: /dish\s?washer|غسالة\s*(?:أطباق|اطباق)/i,
    accessory: /\bdishwasher\s+(?:hose|filter|rack|basket|salt|tablet|pod|cleaner|cover|brush)\b|\b(?:hose|filter|rack|basket)\s+for\s+dishwasher\b|\bsoap\s+dispensing\s+brush\b|خرطوم\s*غسالة\s*أطباق/i,
  },
  ovens: {
    device: /\boven\b|فرن|توستر/i,
    accessory: /^(?:[A-Z][\w-]*\s+){0,2}(?:baking\s+)?(?:oven\s+)?(?:tray|rack|liner|mat|basket)\b|\boven\s+(?:tray|rack|liner|mat|basket)\b|\boven\s+baking\s+(?:tray|sheet|mat)\b|\bair\s*fryer\s+(?:basket|tray|rack|liner)\b|\bbbq\s+grill\s+mats?\b|\bgrill\s+mats?\b|\bparchment\b|غطاء\s*فرن/i,
  },
  'coffee-machines': {
    device: /coffee|espresso|قهوة|كافيه/i,
    accessory: /^(?:[A-Z][\w-]*\s+){0,2}(?:tamper|portafilter)\b|\bportafilter\b.*\b(?:replacement|spare|\b\d{2}\s*mm\b)|\b(?:tamping\s+station|distribution\s+tool|distributor\s+leveler|leveling\s+tool|knock\s+box|dosing\s+cup|filter\s*paper)\b|^(?:[^,]{0,40}\b)?(?:coffee\s+)?(?:capsules?|pods?|beans?)\b.*\b(?:pack|box|set\s+of|refill)\b|محطة\s*(?:ضغط|تنظيم|مكبس)|صندوق\s*طرق|موزع\s*وفلتر\s*القهوة|فلتر\s*قهوة\s*بديل/i,
  },
  blenders: {
    device: /blender|خلاط/i,
    accessory: /^(?:[A-Z][\w-]*\s+){0,2}blender\s+(?:jar|cup|jug|blade|lid)\b|\b(?:jar|jug|blade|lid)\s+for\s+blender\b|كوب\s*(?:بديل|غيار)\s*خلاط|خلاط\s+كوب\s*بديل/i,
  },
  'food-processors': {
    device: /food\s*processor|محضر/i,
    accessory: /^(?:[^,]{0,40}\b)?food\s*processor\s+(?:bowl|blade|lid|container|jar)\b|\b(?:bowl|blade|lid|container|jar)\s+for\s+food\s*processor\b|وعاء\s*بديل|قطع\s*غيار/i,
  },
  'vacuum-cleaners': {
    device: /vacuum|hoover|مكنس/i,
    accessory: /^(?:[^,]{0,40}\b)?(?:vacuum\s+(?:bag|filter|hose|nozzle|brush|roller|belt)|dust\s*bag|filter\s*bag)\b|\b(?:bag|filter|hose|nozzle|brush|roller|belt)\s+for\s+(?:vacuum|hoover)\b|أكياس\s*(?:غيار|مكنسة)|فلتر\s*(?:بديل|غيار)\s*مكنسة/i,
  },
  irons: {
    device: /\b(?:steam|dry|electric)\s+iron\b|\biron\s*(?:box|steam)\b|مكواة/i,
    accessory: /\biron\s+(?:cover|shield|protector|soleplate|sole\s+plate|case|board)\b|\b(?:cover|shield|soleplate|case)\s+for\s+iron\b|غطاء\s*مكواة|طاولة\s*مكواة/i,
  },
  'hair-dryers': {
    device: /hair\s*dryer|blow\s*dryer|مجفف\s*شعر|سيشوار/i,
    accessory: /^(?:(?:universal|silicone)\s+)*(?:hair\s+)?diffuser\b|^hair\s+dryer\s+diffuser\b|\bdiffuser\s+(?:only|replacement)\b/i,
  },
  kettles: {
    device: /kettle|غلاي/i,
    accessory: /\bkettle\s+(?:filter|lid|jug|base|element)\b|\b(?:filter|lid|jug|base|element)\s+for\s+kettle\b/i,
  },
  toasters: {
    device: /toaster|محمص/i,
    accessory: /\btoaster\s+(?:bag|cover|rack|tray|tongs?)\b|\b(?:bag|cover|rack|tray)\s+for\s+toaster\b|\btoast\s+trivet\b|غطاء\s*محمصة/i,
  },
  mixers: {
    device: /mixer|مضرب/i,
    accessory: /\b(?:whisk|beater|dough\s+hook|bowl|attachment)\s+for\s+(?:mixer|stand\s+mixer)\b|\bmixer\s+(?:whisk|beater|attachment)\s+(?:only|replacement|spare)\b|^(?:[^,]{0,50}\b)?(?:milk\s+frother|milk\s+whisk(?:er)?|foam\s+maker)\b|\bhandheld\s+milk\s+frother\b|\bmilk\s+frother\s+wand\b|قطعة\s*بديلة/i,
  },
  cookers: {
    device: /cooker|cooking\s*range|\bstove\b|بوتاجاز/i,
    accessory: /\b(?:gas|stove|cooker)\s+hose\b|\bhose\s+for\s+(?:gas|cooker|stove)\b|\bgas\s+(?:regulator|refill\s+canister|cartridge)\b|\bheat\s+diffuser\b|\bcooker\s+hood\s+bulb\b|\bextractor\s+hood\b|\bmoka\s+pot\b|موزع\s+غاز|خرطوم\s+غاز|اسطوانة\s+غاز\s*(?:صغيرة|محمول|تعبئة)|غطاء\s*بوتاجاز/i,
  },
  'water-heaters': {
    device: /water\s*heater|geyser|\bboiler\b|سخان/i,
    accessory: /\b(?:water\s+heater|geyser|boiler)\s+(?:hose|pipe|adapter|connector|power\s+cord|element|anode|thermostat)\b|\b(?:hose|adapter|connector|power\s+cord|element|anode|thermostat)\s+for\s+(?:water\s+heater|geyser|boiler)\b|\bconnection\s+(?:hose|pipe)\b.*\b(?:geyser|water\s+heater|boiler)\b|\b(?:geyser|water\s+heater|boiler)\b.*\bconnection\s+(?:hose|pipe)\b|\bcopper\s+water\s+heater\s+with\s+thermostat\b|خرطوم\s*سخان|محول\s*سخان|أنبوب\s*سخان/i,
  },
  'air-conditioners': {
    device: /air\s*conditioner|\bac\b|split\s*ac|تكييف|مكيف/i,
    accessory: /^(?:[^,]{0,45}\b)?(?:air\s*conditioner\s+)?(?:diffuser|deflector|diverter|air\s+blocker)\b|\b(?:diffuser|deflector|diverter)\s+for\s+(?:air\s*conditioner|ac)\b|\bair\s+conditioner\s+(?:diffuser|deflector|diverter|vent\s+cover)\b|موزع\s+تكييف|غطاء\s+تكييف/i,
  },
  fans: {
    device: /\bfan\b|مروح/i,
    accessory: /\bfan\s+(?:cover|grill|blade|motor|regulator|capacitor)\b|\b(?:cover|grill|blade|motor)\s+for\s+fan\b|غطاء\s*مروحة|ريش\s*مروحة\s*بديل/i,
  },
  'rice-cookers': {
    device: /rice\s*cooker|طباخ\s*أرز/i,
    accessory: /\brice\s*cooker\s+(?:inner\s+pot|heat\s+diffuser|plate|tray|steam\s+tray)\b|\binner\s+pot\b.*\brice\s*cooker\b|\bheat\s+diffuser\b.*\brice\b|\brice\s+(?:paddle|spoon)\b|\bspoon\s+rest\b|\butensil\s+holder\b|قطعة\s*بديل|قدر\s*بديل/i,
  },
  'pressure-cookers': {
    device: /pressure\s*cooker|قدر\s*ضغط/i,
    accessory: /\bpressure\s+cooker\s+(?:gasket|seal|valve|lid|inner\s+pot)\b|\b(?:gasket|seal|valve|lid)\s+for\s+pressure\s+cooker\b|ختم\s*قدر\s*ضغط|قطعة\s*بديل/i,
  },
  juicers: {
    device: /\b(?:juicer|juice\s*extractor|citrus\s+press|centrifugal)\b|عصارة|مكبس\s+عصير|عصار/i,
    accessory: /^(?:[^,]{0,40}\b)?(?:juicer|juice\s+extractor)\s+(?:filter|screen|blade|jug|lid|strainer|pulp\s+container)\b|\bjuice\b.*\b(?:ml|ltr|litre|bottle|carton|pack|set\s+of|\d+\s*pcs)\b|\b(?:bottle|carton|pack)\b.*\bjuice\b|عصير.*\b(?:مل|عبوة|علبة|كرتون)/i,
  },
};

// صورة عامة واحدة لكل قسم: صورة منتج معزولة على خلفية بيضاء، مش صورة أول نتيجة
// في البيانات (اللي ممكن تكون إكسسوار أو صورة بحياة واقعية).
export const CATEGORY_COVERS = {
  airfryers: 'https://m.media-amazon.com/images/I/41Ry94z9PBL._SL500_.jpg',
  microwaves: 'https://m.media-amazon.com/images/I/31rWru0HBkL._SL500_.jpg',
  fridges: 'https://m.media-amazon.com/images/I/31ciWYFAtCL._SL500_.jpg',
  freezers: 'https://m.media-amazon.com/images/I/31BnXBhWViL._SL500_.jpg',
  shavers: 'https://m.media-amazon.com/images/I/31BX4sR7h2L._SL500_.jpg',
  'washing-machines': 'https://m.media-amazon.com/images/I/21BN7rWi1tL._SL500_.jpg',
  dishwashers: 'https://m.media-amazon.com/images/I/21yhx6gk4fL._SL500_.jpg',
  ovens: 'https://m.media-amazon.com/images/I/21y7DRsDN8L._SL500_.jpg',
  'coffee-machines': 'https://m.media-amazon.com/images/I/414UxiQN2dL._SL500_.jpg',
  blenders: 'https://m.media-amazon.com/images/I/21Wgb4W7wOL._SL500_.jpg',
  'food-processors': 'https://m.media-amazon.com/images/I/41i-Mmj2R3L._SL500_.jpg',
  'vacuum-cleaners': 'https://m.media-amazon.com/images/I/21fjakwi77L._SL500_.jpg',
  irons: 'https://m.media-amazon.com/images/I/31nbDD3RKYL._SL500_.jpg',
  'hair-dryers': 'https://m.media-amazon.com/images/I/31Me2MhS07L._SL500_.jpg',
  kettles: 'https://m.media-amazon.com/images/I/41mGm5XKwmL._SL500_.jpg',
  toasters: 'https://m.media-amazon.com/images/I/31J+yBtT1jL._SL500_.jpg',
  mixers: 'https://m.media-amazon.com/images/I/31VEBCvFZVL._SL500_.jpg',
  cookers: 'https://m.media-amazon.com/images/I/21s3HdsejgL._SL500_.jpg',
  'water-heaters': 'https://m.media-amazon.com/images/I/31nSBYcKeNL._SL500_.jpg',
  'air-conditioners': 'https://m.media-amazon.com/images/I/21ROlNwl27L._SL500_.jpg',
  fans: 'https://m.media-amazon.com/images/I/31NciJPivAL._SL500_.jpg',
  'rice-cookers': 'https://m.media-amazon.com/images/I/21MILFWJMPS._SL500_.jpg',
  'pressure-cookers': 'https://m.media-amazon.com/images/I/41C91aecPOL._SL500_.jpg',
  juicers: 'https://m.media-amazon.com/images/I/31Acqychf+L._SL500_.jpg',
};

// الفلتر الموحّد: أي عنوان ما بيذكرش الجهاز، أو بيذكر إكسسوار/قطعة غيار، اتشال.
export function isAccessoryTitle(category, title) {
  const text = String(title || '').replace(/\s+/g, ' ').trim();
  if (!text) return true;
  const rules = CATEGORY_FILTERS[category?.id] || {};
  if (ACCESSORY_RE.test(text)) return true;
  if (category?.exclude?.test(text)) return true;
  if (rules.accessory?.test(text)) return true;
  if (rules.device && !rules.device.test(text)) return true;
  return false;
}
