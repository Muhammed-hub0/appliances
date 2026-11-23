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
// متعمّدة إنها عبارات مركّبة عشان كلمات زي "filter" أو "bag" أو "stand" بتيجي
// كمان في عنوان الجهاز نفسه (stand mixer / bagless vacuum / air filter).
export const ACCESSORY_RE =
  /\b(replacement|spare)\s+(part|parts|filter|filters|bag|bags|blade|blades|head|heads|kit|kits|brush|brushes|tray|trays|rack|racks|pot|pots|nozzle|nozzles)\b|\baccessor(y|ies)\b|\bcompatible\s+with\b|\bcookbook\b|\brecipe\s+book\b|\bcleaning\s+kit\b|\bprotective\s+(cover|case)\b|\bsilicone\s+(liner|liners|mat|mats|pot|pots|mold|mould|tray|trays)\b|\bparchment\s+paper\b|\bmagnet\b|\borganizer\b|\bsticker\b|\bdecal\b|\bcleaner\b|\bمنظف\b|\bspare\b|\breplacement\b|\bglass\s*plate\b|\bturntable\b|\bknob\b|\bstorage\s+(?:box|container|bin)\b|\bcontainer\b|\b(?:washing\s*machine|fridge|freezer|oven|dishwasher|air\s*conditioner)\s+cover\b|\brefill\s+kit\b|\bwater\s+filter\s+refill\b|\bblade\s*only\b|\bcover\s+only\b|\bcase\s+only\b/i;

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
