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
  /\b(replacement|spare)\s+(part|parts|filter|filters|bag|bags|blade|blades|head|heads|kit|kits|brush|brushes|tray|trays|rack|racks|pot|pots|nozzle|nozzles|shelf|shelves|glass)\b|\baccessor(y|ies)\b|\bcompatible\s+with\b|\bcookbook\b|\brecipe\s+book\b|\bcleaning\s+(?:kit|tablet|pods?|liquid|spray)\b|\bprotective\s+(?:cover|case)\b|\bsilicone\s+(?:liner|liners|mat|mats|pot|pots|mold|mould|tray|trays)\b|\bparchment\s+paper\b|\bmagnet\b|\borganisers?\b|\borganizer\b|\bsticker\b|\bdecal\b|\bمنظف\b|\breplacement\b|\bspare\b|\b(?:glass\s*plate|turntable)\s+(?:for\s+)?(?:microwave|oven)\b|\bstorage\s+(?:box|container|bin|basket|rack)\b|\b(?:washing\s*machine|fridge|freezer|oven|dishwasher|air\s*conditioner)\s+cover\b|\brefill\s+kit\b|\bwater\s+filter\s+refill\b|\b(?:blade|cover|case|head|nozzle|filter|bag|hose)\s+only\b|\bdecanter\b|\b(?:fridge|refrigerator)\s+jug\b|\bmoisture\s+absorbers?\b|\bfurniture\s+movers?\b|\bappliance\s+(?:rollers?|trolleys?|movers?)\b|\bmobile\s+base\b/i;

export const GENERIC_RE =
  /^(air|fryer|microwave|fridge|freezer|shaver|machine|electric|digital|portable|multi|multifunction|smart|home|new|white|black|generic|unbranded|universal|8|\d+|قلاية|قلايه|ميكروويف|مايكروويف|ثلاجة|ثلاجه|فريزر|غسالة|غساله|مكنسة|مكنسه|مكواة|مكواه|غلاية|غلايه|محمصة|محمصه|خلاط|مضرب|فرن|بوتاجاز|سخان|تكييف|مروحة|مروحه|عصارة|عصاره|قدر|ماكينة|ماكينه|جهاز|طقم|عدة|أدوات|ادوات)$/i;

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
  [/de'?longhi/i, 'ديلونجي'],
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
    id: 'large', title: 'أجهزة منزلية كبيرة', emoji: '🏠', image: 'assets/group-large.jpg',
    ids: ['fridges', 'freezers', 'washing-machines', 'dishwashers', 'ovens', 'cookers', 'air-conditioners', 'water-heaters'],
  },
  {
    id: 'small', title: 'أجهزة منزلية صغيرة', emoji: '🍳', image: 'assets/group-small.jpg',
    ids: ['airfryers', 'microwaves', 'coffee-machines', 'blenders', 'food-processors', 'vacuum-cleaners', 'irons', 'kettles', 'toasters', 'mixers', 'fans', 'rice-cookers', 'pressure-cookers', 'juicers'],
  },
  {
    id: 'personal', title: 'العناية الشخصية', emoji: '🪒', image: 'assets/group-personal.jpg',
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
    accessory: /\bmicrowave\s+(?:cover|liner|tray|rack)\b|\bmicrowave\s+oven\s+(?:rack|tray|cover|liner)\b|\b(?:cover|liner|tray|rack)\s+for\s+microwave\b|\bmicrowave\s+(?:oven\s+)?(?:storage\s+)?(?:rack|shelf|stand|bracket|wall\s+mount|mount)\b|\b(?:storage\s+)?(?:rack|shelf|stand|bracket|wall\s+mount)\s+for\s+microwave\b|\bmicrowave\b.*\b(?:organiser|organizer|wall\s+mount)\b|\bwall\s+mount\b.*\bmicrowave\b|\bmicrowave\s+oven\s+cleaner\b|\bplate\s+stacker\b|\bsplatter\s+cover\b|\b(?:roasting|baking)\s+bags?\b|\b(?:glass\s+)?food\s+storage\s+(?:containers?|bowls?)\b|\bmeal\s+prep\b|\bmicrowave\s+boxes\b|\beye\s+mask\b|\bdivided\s+plate\b|\bpopcorn\s+bowl\b|\bheating\s+shelf\b|\bglass\s+cooking\s+pot\b|\bglass\s+bowl\b|\bporcelain\b[^.]{0,20}\bbowl\b|\bserving\s+dish\b|\b(?:baking\s+dish|casserole|glass\s+dish)\b.*\bmicrowave\b|\bmicrowave\b.*\b(?:baking\s+dish|casserole|glass\s+dish)\b/i,
  },
  fridges: {
    device: /fridge|refrigerator|ثلاج/i,
    accessory: /(?:^|[\s,(-])(?:fridge|refrigerator)?\s*(?:deodorizer|odor\s+eliminator|moisture\s+absorber|drying\s+sticks?|diatom\s+drying)\b(?!\s*filter)|\bfridge\s+(?:liner|mat|organiser|organizer|bin|thermometer|gauge|lock|locks|jug|decanter|pitcher|drawer|basket|rack|storage|mover|roller|trolley|base)\b|\b(?:fridge|refrigerator)\s+(?:door\s+)?locks?\b|\blocks?\b.*\b(?:fridge|refrigerator)\b|\bchild\s+(?:proof|safety)\b.*\block\b|\blocks?\b.*\bchild\s+(?:proof|safety)\b|\b(?:fridge|refrigerator)\s+(?:liner|mat|organiser|organizer|bin|thermometer|gauge|jug|decanter|pitcher|drawer|basket|rack|storage)\b|\b(?:liner|mat|organiser|organizer|bin|thermometer|gauge|jug|decanter|pitcher|basket|rack)\s+for\s+(?:fridge|refrigerator)\b|\b(?:glass|shelf|shelves)\s+(?:for\s+)?(?:fridge|refrigerator)\b|\b(?:fridge|refrigerator)\s+(?:glass|shelf|shelves|door\s+seal)\b|\b(?:fridge|refrigerator)\b.*\b(?:thermometer|gauge|hygrometer)\b|\b(?:thermometer|gauge|hygrometer)\b.*\b(?:fridge|refrigerator|freezer)\b|\b(?:fridge|refrigerator)\b.*\bbundle\b|^\s*pyrex\b|\bpyrex\b.*\b(?:fridge|refrigerator)\b|\bfood\s+storage\b|\bstorage\s+bowl\b|\bmood\s+board\b|\bmagnetic\b.*\bfridge\b|\bfridge\b.*\bmagnetic\b|\bmobile\s+base\b.*\b(?:refrigerator|washing\s+machine)\b|ممتص\s+رطوبة|معطر\s+ثلاجة/i,
  },
  freezers: {
    device: /freezer|فريزر/i,
    accessory: /(?:^|[\s,(-])(?:freezer)?\s*(?:deodorizer|odor\s+eliminator|moisture\s+absorber|drying\s+sticks?|diatom\s+drying)\b(?!\s*filter)|\bfreezer\s+(?:bag|container|cover|liner|mat|thermometer|gauge|lock|locks|labels?|mold|mould|tray|ice\s+cube\s+tray)\b|\b(?:bag|container|cover|liner|thermometer|gauge)\s+for\s+freezer\b|\bice\s+(?:cube\s+)?(?:trays?|molds?|moulds?)\b|\bice\s+trays?\b|\bice\s+boxes?\b|\bfreezer\s+labels?\b|\bfood\s+storage\b|\bstorage\s+bowl\b|\b(?:fridge|refrigerator|freezer)\s+(?:door\s+)?locks?\b|\bchild\s+(?:proof|safety)\b.*\block\b|\blocks?\b.*\bchild\s+(?:proof|safety)\b|\bchild\s+safety\s+latch\b|\b(?:freezer|fridge|refrigerator)\b.*\b(?:thermometer|gauge|hygrometer)\b|\b(?:thermometer|gauge|hygrometer)\b.*\b(?:freezer|fridge|refrigerator)\b|ممتص\s+رطوبة|\bfreezer\s+mates\b|\baluminum\s+base\b|\bbase\s+for\b[^.]{0,30}\bfreezer\b|\bfreezer\b[^.]{0,30}\bbase\b|\bcake\s+trays?\b|\bdoor\s+shelf\b|\bheater\b/i,
  },
  shavers: {
    device: /shaver|razor|trimmer|epilat|grooming|bikini|حلاق|ماكينة\s*حلاقة|تشذيب|إزالة\s*شعر/i,
    accessory: /^blade\b|\bblades?\s+(?:refill|replacement)\b|\brefill\s+(?:blades?|cartridges?|heads?)\b|\breplacement\s+(?:blades?|heads?|cartridges?)\b|\b(?:disposable|manual|straight\s*edge)\s+razors?\b|\bshaving\s+(?:brush|bowl|cup|bib|cape)\b|\bbeard\s+bib\b|\bshaver\s+head\s+for\b|\bhandle\s+only\b|\bcartridges?\b[^.]{0,20}razor\b|شفرات\s*(?:بديلة|غيار)|فرشاة\s*حلاقة|كريم\s*حلاقة/i,
  },
  'washing-machines': {
    device: /washing\s*machine|غسالة\s*(?:ملابس|أوتوماتيك|اتوماتيك|فوق|تحميل)|غسال/i,
    accessory: /\b(?:washing\s*machines?|washers?)\s+(?:intake\s+|drain\s+|pull\s+|entry\s+|water\s+expeller\s+)?hoses?\b|\b(?:intake|drain|pull|entry|water\s+expeller)\s+hoses?\b.*\b(?:washing\s*machines?|washers?)\b|\b(?:filter\s+bag|lint\s+bag|door\s+seal)\b.*\b(?:washing\s*machines?|washers?)\b|\b(?:washing\s*machines?|washers?)\s+(?:filter\s+bag|lint\s+filter|shoe\s+bag|laundry\s+bag|stand|base|lifter|cover)\b|\b(?:shoe|laundry)\s+(?:washing\s+)?bags?\b.*\b(?:washing\s*machines?|washers?)\b|\b(?:stand|base|lifter)\b.*\b(?:washing\s*machines?|washers?)\b|\b(?:washing\s*machines?|washers?)\s+(?:leather\s+)?cover\b|\bcover\s+for\s+(?:washing\s*machines?|washers?)\b|\bwashing\s+machine\b[^.]{0,30}\bcover\b|\bwashing\s+machine\b[^.]{0,20}\bfan\b|خرطوم\s*غسالة|كيس\s*فلتر\s*غسالة/i,
  },
  dishwashers: {
    device: /dish\s?washer|غسالة\s*(?:أطباق|اطباق)/i,
    accessory: /\bdishwasher\s+(?:hose|filter|rack|basket|salt|tablet|pod|cleaner|cover|brush)\b|\b(?:hose|filter|rack|basket)\s+for\s+dishwasher\b|\bdish\s+rack\b|\bwooden\s+rack\b|\bdrying\s+cabinets?\b|\bdisposable\s+washing\s+dishwasher\b|\bplastic\s+washing\s+dish\b|\bsoap\s+dispensing\s+brush\b|خرطوم\s*غسالة\s*أطباق/i,
  },
  ovens: {
    device: /\boven\b|فرن|توستر/i,
    accessory: /^(?:[A-Z][\w-]*\s+){0,2}(?:baking\s+)?(?:oven\s+)?(?:trays?|racks?|liners?|mats?|baskets?)\b|\boven\s+(?:trays?|racks?|liners?|mats?|baskets?|thermometers?)\b|\boven\s+baking\s+(?:tray|sheet|mat)\b|\bair\s*fryer\s+(?:basket|tray|rack|liner)\b|\bbbq\s+grill\s+mats?\b|\bgrill\s+mats?\b|\bparchment\b|غطاء\s*فرن/i,
  },
  'coffee-machines': {
    device: /coffee|espresso|قهوة|كافيه/i,
    accessory: /^(?:[A-Z][\w-]*\s+){0,2}(?:tamper|portafilter)\b|\bportafilter\b.*\b(?:replacement|spare|\b\d{2}\s*mm\b)|\b(?:tamping\s+station|distribution\s+tool|distributor\s+leveler|leveling\s+tool|knock\s+box|dosing\s+cup|filter\s*paper)\b|^(?:[^,]{0,40}\b)?(?:coffee\s+)?(?:capsules?|pods?|beans?)\b.*\b(?:pack|box|set\s+of|refill)\b|\bespresso\s+filter\b|محطة\s*(?:ضغط|تنظيم|مكبس)|صندوق\s*طرق|موزع\s*وفلتر\s*القهوة|فلتر\s*قهوة\s*بديل/i,
  },
  blenders: {
    device: /blender|خلاط/i,
    accessory: /^(?:[A-Z][\w-]*\s+){0,2}blender\s+(?:jar|cup|jug|blade|lid)\b|\b(?:jar|jug|blade|lid)\s+for\s+blender\b|كوب\s*(?:بديل|غيار)\s*خلاط|خلاط\s+كوب\s*بديل/i,
  },
  'food-processors': {
    device: /food\s*processor|محضر/i,
    accessory: /^(?:[^,]{0,40}\b)?food\s*processor\s+(?:bowl|blade|lid|container|jar|cover)\b|\b(?:bowl|blade|lid|container|jar|cover)\s+for\s+food\s*processor\b|\b(?:chopper|food\s*processor)\s+cover\b|\bcover\b.*\bfood\s*processor\b|وعاء\s*بديل|قطع\s*غيار/i,
  },
  'vacuum-cleaners': {
    device: /vacuum|hoover|مكنس/i,
    accessory: /^(?:[^,]{0,40}\b)?(?:vacuum\s+(?:bag|filter|hose|nozzle|brush|roller|belt)|dust\s*bag|filter\s*bag)\b|\b(?:bag|filter|hose|nozzle|brush|roller|belt)\s+for\s+(?:vacuum|hoover)\b|أكياس\s*(?:غيار|مكنسة)|فلتر\s*(?:بديل|غيار)\s*مكنسة/i,
  },
  irons: {
    device: /\b(?:steam|dry|electric)\s+irons?\b|\biron\s+steam\b|مكواة/i,
    accessory: /\biron\s+(?:cover|shield|protector|soleplate|sole\s+plate|case|board)\b|\b(?:cover|shield|soleplate|case)\s+for\s+iron\b|\bheat\s+protector\s+pads?\b|\bsole\s+protector\b|\bprotector\b.*\bsole\s+of\s+the\s+electric\s+iron\b|غطاء\s*مكواة|طاولة\s*مكواة/i,
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
    accessory: /\b(?:whisk|beater|dough\s+hook|bowl|attachment)\s+for\s+(?:mixer|stand\s+mixer)\b|\bmixer\s+(?:whisk|beater|attachment)\s+(?:only|replacement|spare)\b|^(?:[^,]{0,50}\b)?(?:milk\s+frother|milk\s+whisk(?:er)?|foam\s+maker)\b|\bhandheld\s+milk\s+frother\b|\bmilk\s+frother\s+wand\b|\bwater\s+filter\s+faucet\b|\bwater\s+purifier\b|\bfrappe\b|\blatte\b|\bcappuccino\b|\bmilkshakes?\b|\bdrink\s+mixer\b|\bcoffee\s+foam\b|\bfoam\s+mixer\b|\bmanual\s+whisk\b|\bwhisk\s+rods\b|\bhand\s+crank\b|\bno\s+electricity\b|\bwood\s+handle\b|\bwood-style\s+handle\b|\bsilicone\s+spatula\b|\bmanual\s+hand\s+mixer\b|\bmanual\s+mixer\b|\bbottle\s+opener\b|قطعة\s*بديلة/i,
  },
  cookers: {
    device: /cooker|cooking\s*range|\bstove\b|بوتاجاز/i,
    accessory: /\b(?:gas|stove|cooker)\s+hose\b|\bhose\s+for\s+(?:gas|cooker|stove)\b|\bgas\s+(?:regulator|refill\s+canister|cartridge)\b|\bheat\s+diffuser\b|\b(?:stove|cooker)\s+protectors?\b|\b(?:stove|cooker)\s+(?:pipe\s+)?(?:adapter|connector|tube\s+adapter)\b|\b(?:adapter|connector)\b.*\b(?:stove|cooker)\b|\b(?:stove|cooker|gas\s+range|burner)\s+(?:covers?|protectors?|liners?)\b|\b(?:covers?|protectors?|liners?)\b.*\b(?:stove|cooker|burner)\b|\bcooker\s+eyes\s+cover\b|\bprotection\s+liners?\b.*\bstove\b|\bcooking\s+surface\s+protection\b|\bcooker\s+hood\s+bulb\b|\bextractor\s+hood\b|\bmoka\s+pot\b|\b(?:cooker|extractor|kitchen)\s+hood\b|\bhood\b|موزع\s+غاز|خرطوم\s+غاز|اسطوانة\s+غاز\s*(?:صغيرة|محمول|تعبئة)|غطاء\s*بوتاجاز|فلتر|شفاط/i,
  },
  'water-heaters': {
    device: /water\s*heater|geyser|\bboiler\b|سخان/i,
    accessory: /\b(?:water\s+heater|geyser|boiler)\s+(?:hose|pipe|adapter|connector|power\s+cord|element|anode|thermostat)\b|\b(?:hose|adapter|connector|power\s+cord|element|anode|thermostat)\s+for\s+(?:water\s+heater|geyser|boiler)\b|\bconnection\s+(?:hose|pipe)\b.*\b(?:geyser|water\s+heater|boiler)\b|\b(?:geyser|water\s+heater|boiler)\b.*\bconnection\s+(?:hose|pipe)\b|\bcopper\s+water\s+heater\s+with\s+thermostat\b|\baquarium\b|\bfish\s+tank\b|\bflange\b.*\b(?:water\s+heater|سخان)\b|\badapter\b.*\b(?:water\s+heater|geyser)\b|\bkettle\b|\btea\s+pot\b|\bmilk\s+warmer\b|\bgold\s+head\b|\b\d+\s+heating\s+elements?\b|خرطوم\s*سخان|محول\s*سخان|أنبوب\s*سخان/i,
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
    accessory: /\brice\s*cooker\s+(?:inner\s+pot|heat\s+diffuser|plate|tray|steam\s+tray|shields?|covers?|spoons?|paddles?)\b|\b(?:shields?|covers?|spoons?|paddles?)\b.*\brice\s*cookers?\b|\binner\s+pot\b.*\brice\s*cooker\b|\bheat\s+diffuser\b.*\brice\b|\brice\s+(?:paddle|spoon)\b|\bspoon\s+rest\b|\butensil\s+holder\b|قطعة\s*بديل|قدر\s*بديل/i,
  },
  'pressure-cookers': {
    device: /pressure\s*cooker|قدر\s*ضغط/i,
    accessory: /\bpressure\s+cooker\s+(?:gasket|seal|valve|lid|inner\s+pot|covers?|racks?)\b|\b(?:gasket|seal|valve|lid)\s+for\s+pressure\s+cooker\b|\b(?:covers?|racks?)\b.*\bpressure\s+cookers?\b|ختم\s*قدر\s*ضغط|قطعة\s*بديل/i,
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

// أنواع فرعية داخل كل قسم: صفحة القسم بتفتح كروت الأنواع زي الصفحة الرئيسية،
// وكل نوع بيفتح جدول منتجاته. أول نمط مطابق يكسب، والباقي "أنواع أخرى".
export const CATEGORY_TYPES = {
  fridges: [
    { id: 'mini', title: 'ثلاجات ميني / سيارة / محمول', emoji: '🧊', re: /mini\s*bar|minibar|\bmini\b|car\b|portable|travel|camping|صغير|سيارة|محمول|ميني|(?:^|[\s,(-])(?:\d{1,2}(?:\.\d+)?|100)\s*(?:l\b|ltr|liter|litre|لتر)/i },
    { id: 'french-door', title: 'ثلاجات French Door', emoji: '🚪', re: /french\s*door|فرنش\s*دور/i },
    { id: 'side-by-side', title: 'ثلاجات سايد باي سايد', emoji: '🚪', re: /side\s*by\s*side|سايد\s*باي/i },
    { id: 'bottom-mount', title: 'ثلاجات فريزر تحت', emoji: '⬇️', re: /bottom\s*mount|bottom\s*freezer|فريزر\s*تحت/i },
    { id: 'top-mount', title: 'ثلاجات بابين / فريزر فوق', emoji: '⬆️', re: /top\s*mount|top\s*freezer|double\s*door|two\s*door|2\s*door|بابين|فريزر\s*فوق/i },
    { id: 'single-door', title: 'ثلاجات باب واحد', emoji: '🚪', re: /single\s*door|1\s*door|one\s*door|باب\s*واحد/i },
  ],
  freezers: [
    { id: 'chest', title: 'فريزر صدري / أفقي', emoji: '📦', re: /chest|horizontal|deep\s*freezer|صدري|أفقي|عميق|ديب\s*فريزر/i },
    { id: 'upright', title: 'فريزر رأسي / أدراج', emoji: '🗄️', re: /upright|vertical|drawer|رأسي|عمودي|أدراج/i },
  ],
  'washing-machines': [
    { id: 'mini', title: 'غسالات صغيرة / محمولة', emoji: '🧺', re: /\bmini\b|portable|compact|foldable|folding|ultrasound|travel|صغير|محمول/i },
    { id: 'front-load', title: 'غسالات تحميل أمامي', emoji: '🌀', re: /front\s*load|تحميل\s*أمامي|أمامية/i },
    { id: 'top-load', title: 'غسالات تحميل علوي', emoji: '⬆️', re: /top\s*load|تحميل\s*علوي|علوية|فوق\s*أوتوماتيك/i },
    { id: 'twin-tub', title: 'غسالات حوضين / نصف أوتوماتيك', emoji: '🛁', re: /twin\s*tub|semi\s*automatic|half\s*automatic|حوضين|نصف\s*أوتوماتيك/i },
    { id: 'washer-dryer', title: 'غسالة ومجفف', emoji: '💨', re: /washer\s*dryer|washer\s*and\s*dryer|غسالة\s*ومجفف/i },
  ],
  dishwashers: [
    { id: 'built-in', title: 'غسالات أطباق مدمجة', emoji: '🍽️', re: /built\s*in|مدمج/i },
    { id: 'compact', title: 'غسالات أطباق صغيرة / سطح', emoji: '🍽️', re: /compact|countertop|mini|صغير|سطح/i },
    { id: 'freestanding', title: 'غسالات أطباق قائمة', emoji: '🍽️', re: /freestanding|standalone|قائم|dish\s*washer|غسالة\s*(?:أطباق|اطباق)/i },
  ],
  microwaves: [
    { id: 'grill', title: 'ميكروويف بشواية', emoji: '🍗', re: /grill|شواية|جريل/i },
    { id: 'convection', title: 'ميكروويف حمل حراري', emoji: '♨️', re: /convection|حمل\s*حراري|كونفكشن/i },
    { id: 'solo', title: 'ميكروويف عادي (سولو)', emoji: '📡', re: /solo|سولو|microwave|مايكروويف|ميكروويف/i },
  ],
  airfryers: [
    { id: 'dual', title: 'قلايات هوائية منطقتين', emoji: '🍟', re: /dual|double\s*zone|2\s*basket|منطقتين|مزدوج/i },
    { id: 'large', title: 'قلايات هوائية عائلية كبيرة', emoji: '🍟', re: /xxl|xxxl|[6-9](?:\.\d)?\s*(?:l\b|ltr|liter|litre|لتر)|large|عائلي/i },
    { id: 'compact', title: 'قلايات هوائية صغيرة', emoji: '🍟', re: /compact|mini|small|[2-3](?:\.\d)?\s*(?:l\b|ltr|liter|litre|لتر)|صغير/i },
    { id: 'standard', title: 'قلايات هوائية عادية', emoji: '🍟', re: /air\s*fryer|قلاية/i },
  ],
  ovens: [
    { id: 'built-in', title: 'أفران مدمجة', emoji: '🔥', re: /built\s*in|مدمج/i },
    { id: 'countertop', title: 'أفران سطح / محمصة', emoji: '🍞', re: /countertop|toaster\s*oven|table|سطح|محمصة/i },
    { id: 'freestanding', title: 'أفران قائمة', emoji: '🔥', re: /freestanding|range|قائم/i },
    { id: 'electric', title: 'أفران كهرباء', emoji: '🔥', re: /\boven\b|فرن/i },
  ],
  cookers: [
    { id: 'built-in', title: 'بوتاجازات مدمجة', emoji: '🔥', re: /built\s*in|مدمج|\b(?:60|80|90)\s*cm\b/i },
    { id: 'camping', title: 'مواقد رحلات / تخييم', emoji: '🏕️', re: /camping|backpacking|hiking|butane|تخييم|رحلات/i },
    { id: 'gas', title: 'بوتاجازات غاز', emoji: '🔥', re: /\bgas\b|غاز|شله|شعل/i },
    { id: 'freestanding', title: 'بوتاجازات قائمة', emoji: '🔥', re: /free\s*standing|freestanding|قائم/i },
    { id: 'electric', title: 'بوتاجازات كهرباء', emoji: '⚡', re: /electric|كهرباء|كهربائي|heater\s+wire|\d{3,4}\s*(?:w\b|watt|وات)|flat\s+cooker|burner|عين|eye/i },
    { id: 'induction', title: 'بوتاجازات حث (induction)', emoji: '🧲', re: /induction|حث/i },
  ],
  'water-heaters': [
    { id: 'gas', title: 'سخانات غاز', emoji: '🔥', re: /\bgas\b|غاز/i },
    { id: 'immersion', title: 'سخانات غمر / هتر', emoji: '🔌', re: /immersion|هتر|غمر|portable\s+water\s+heater/i },
    { id: 'instant', title: 'سخانات فورية', emoji: '⚡', re: /instant|tankless|فوري|لحظي/i },
    { id: 'electric', title: 'سخانات كهرباء تخزين', emoji: '⚡', re: /electric|كهربائي|storage|تخزين|water\s*heater|سخان|\bboiler\b/i },
  ],
  'air-conditioners': [
    { id: 'split', title: 'تكييف سبليت', emoji: '❄️', re: /split|سبليت|منفصل|\bac\b|\d(?:\.\d)?\s*hp|حصان/i },
    { id: 'window', title: 'تكييف شباك', emoji: '🪟', re: /window|شباك/i },
    { id: 'portable', title: 'تكييف محمول', emoji: '❄️', re: /portable|محمول|متنقل/i },
    { id: 'central', title: 'تكييف مركزي / كاسيت', emoji: '🏢', re: /cassette|central|مركزي|كاسيت/i },
    { id: 'other-split', title: 'تكييفات أخرى', emoji: '❄️', re: /air\s*conditioner|تكييف|مكيف|\bac\b/i },
  ],
  fans: [
    { id: 'stand', title: 'مراوح أرضية / قائمة', emoji: '🌀', re: /stand|pedestal|shaft|box(?:er)?\s*fan|أرضية|قائم/i },
    { id: 'table', title: 'مراوح طاولة / مكتب', emoji: '🌀', re: /table|desk|طاولة|مكتب/i },
    { id: 'ceiling', title: 'مراوح سقف', emoji: '🌀', re: /ceiling|سقف/i },
    { id: 'wall', title: 'مراوح حائط', emoji: '🌀', re: /wall|حائط|جدار/i },
    { id: 'tower', title: 'مراوح برج', emoji: '🗼', re: /tower|برج/i },
    { id: 'exhaust', title: 'شفاطات', emoji: '💨', re: /exhaust|شفاط|ventilation|تهوية/i },
    { id: 'personal', title: 'مراوح شخصية / USB', emoji: '🌀', re: /usb|personal|handheld|mini|neck|شخصي|رقبة/i },
  ],
  irons: [
    { id: 'garment', title: 'مكاوي بخار عمودية', emoji: '👔', re: /garment|steamer|عمودي/i },
    { id: 'steam', title: 'مكاوي بخار', emoji: '💨', re: /steam|بخار/i },
    { id: 'dry', title: 'مكاوي جافة', emoji: '🔥', re: /\bdry\b|جاف/i },
  ],
  'vacuum-cleaners': [
    { id: 'robot', title: 'مكانس روبوت', emoji: '🤖', re: /robot|روبوت/i },
    { id: 'cordless', title: 'مكانس لاسلكية / عصا', emoji: '🔋', re: /cordless|stick|لاسلكي|عصا|dyson\s*v\d|v\d+\s*(?:detect|absolute|slim)/i },
    { id: 'wet-dry', title: 'مكانس سوائل / مبلل', emoji: '💧', re: /wet|سوائل|مبلل|wd\s*\d|kärcher|karher/i },
    { id: 'canister', title: 'مكانس برميلية', emoji: '🛢️', re: /canister|برميل|اسطوانة/i },
    { id: 'handheld', title: 'مكانس يدوية / سيارة', emoji: '🚗', re: /handheld|car\b|mini|يدوي|سيارة|auto\s+vacuum|12\s*v|mattress|uv|pillow/i },
    { id: 'upright', title: 'مكانس قائمة', emoji: '🧹', re: /upright|قائم/i },
  ],
  kettles: [
    { id: 'travel', title: 'غلايات سفر / قابلة للطي', emoji: '🧳', re: /travel|foldable|portable|سفر|قابل\s*للطي/i },
    { id: 'glass', title: 'غلايات زجاج', emoji: '🫖', re: /glass|زجاج/i },
    { id: 'stainless', title: 'غلايات ستانلس', emoji: '🫖', re: /stainless|ستانلس|صلب/i },
    { id: 'electric', title: 'غلايات كهرباء', emoji: '🫖', re: /kettle|غلاي/i },
  ],
  toasters: [
    { id: 'sandwich', title: 'محمصات ساندويتش / جريل', emoji: '🥪', re: /sandwich|panini|grill|ساندويتش|جريل|شواية/i },
    { id: '4-slice', title: 'محمصات 4 شرائح', emoji: '🍞', re: /4\s*slice|4\s*شرائح/i },
    { id: '2-slice', title: 'محمصات شريحتين', emoji: '🍞', re: /2\s*slice|شريحتين/i },
    { id: 'oven', title: 'محمصات فرن', emoji: '🍞', re: /oven|فرن/i },
    { id: 'popup', title: 'محمصات خبز عادية', emoji: '🍞', re: /toaster|محمص/i },
  ],
  mixers: [
    { id: 'stand', title: 'عجانات قائمة', emoji: '🥣', re: /stand|قائم|ستاند|عجان/i },
    { id: 'hand', title: 'مضارب يدوية', emoji: '🥣', re: /hand|يدوي|يدوى|handheld|مضرب|بيض|egg|beater|mixer/i },
  ],
  blenders: [
    { id: 'hand', title: 'خلاطات يدوية / عصا', emoji: '🥤', re: /hand|stick|immersion|يدوي|عصا/i },
    { id: 'personal', title: 'خلاطات فردية / سموذي', emoji: '🥤', re: /personal|single|smoothie|portable|mini|usb|فردي|سموذي|محمول/i },
    { id: 'professional', title: 'خلاطات احترافية قوية', emoji: '🥤', re: /professional|heavy|commercial|احترافي|قوي/i },
    { id: 'jug', title: 'خلاطات دورق عادية', emoji: '🥤', re: /blender|خلاط/i },
  ],
  'food-processors': [
    { id: 'chopper', title: 'مفارم / محضرات صغيرة', emoji: '🧅', re: /chopper|mini|compact|مفرمة|صغير/i },
    { id: 'full', title: 'محضرات طعام كاملة', emoji: '🥗', re: /processor|محضر/i },
  ],
  'coffee-machines': [
    { id: 'espresso', title: 'ماكينة اسبريسو', emoji: '☕', re: /espresso|اسبريسو|ضغط/i },
    { id: 'capsule', title: 'ماكينة كبسولات', emoji: '☕', re: /capsule|pod|كبسول|بود/i },
    { id: 'turkish', title: 'ماكينة قهوة تركي', emoji: '☕', re: /turkish|turkesh|تركي|كنكة/i },
    { id: 'press', title: 'فرنش برس / كباسة', emoji: '☕', re: /french\s*press|كباسة|فرنش\s*برس/i },
    { id: 'drip', title: 'ماكينة فلتر / تقطير', emoji: '☕', re: /drip|filter|فلتر|تقطير|coffee|قهوة/i },
  ],
  juicers: [
    { id: 'manual', title: 'عصارات يدوية', emoji: '🍋', re: /manual|يدوي|hand\s*press|squeezer|acrylic|عصارة\s*يدوية/i },
    { id: 'slow', title: 'عصارات بطيئة / عصر بارد', emoji: '🥕', re: /slow|masticating|cold\s*press|بطيء|عصر\s*بارد/i },
    { id: 'citrus', title: 'عصارات حمضيات', emoji: '🍊', re: /citrus|حمضيات|برتقال|ليمون/i },
    { id: 'centrifugal', title: 'عصارات كهرباء', emoji: '🥤', re: /centrifugal|طرد\s*مركزي|juicer|juice\s*extractor|عصارة|عصار/i },
  ],
  'rice-cookers': [
    { id: 'small', title: 'طباخ أرز صغير', emoji: '🍚', re: /[0-1](?:\.\d)?\s*(?:l\b|ltr|liter|litre|لتر)|small|صغير/i },
    { id: 'large', title: 'طباخ أرز عائلي', emoji: '🍚', re: /[2-9](?:\.\d)?\s*(?:l\b|ltr|liter|litre|لتر)|large|عائلي/i },
    { id: 'standard', title: 'طباخ أرز عادي', emoji: '🍚', re: /rice\s*cooker|طباخ\s*أرز/i },
  ],
  'pressure-cookers': [
    { id: 'electric', title: 'قدور ضغط كهربائية', emoji: '🍲', re: /electric|كهربائي/i },
    { id: 'stovetop', title: 'قدور ضغط للموقد', emoji: '🍲', re: /stovetop|stove|موقد|غاز|pressure\s*cooker|قدر\s*ضغط|حلة/i },
  ],
  shavers: [
    { id: 'men', title: 'ماكينات حلاقة رجالي', emoji: '🧔', re: /\bmen\b|\bman\b|male|رجالي|للرجال|beard|ذقن|لحية|شارب/i },
    { id: 'women', title: 'ماكينات حلاقة نسائي', emoji: '👩', re: /\bwomen\b|\bwoman\b|lady|ladies|female|نسائي|للنساء|حريمي/i },
    { id: 'body', title: 'تشذيب جسم / متعدد', emoji: '🪒', re: /body|groom|multigroom|جسم|تشذيب/i },
    { id: 'clipper', title: 'ماكينات شعر وتشذيب', emoji: '💈', re: /clipper|trimmer|hair\s*cut|قص\s*شعر|epilat/i },
  ],
  'hair-dryers': [
    { id: 'travel', title: 'سيشوار سفر / قابل للطي', emoji: '🧳', re: /travel|compact|foldable|سفر|قابل\s*للطي|صغير/i },
    { id: 'professional', title: 'سيشوار احترافي / صالون', emoji: '💇', re: /professional|salon|احترافي|صالون/i },
    { id: 'high-power', title: 'سيشوار قوي', emoji: '💨', re: /[2-9][0-9]{3}\s*(?:w\b|watt|وات)|2200|2400|قوي/i },
    { id: 'standard', title: 'سيشوار عادي', emoji: '💨', re: /hair\s*dryer|blow\s*dryer|سيشوار|مجفف/i },
  ],
};

export const OTHER_TYPE = { id: 'other', title: 'أنواع أخرى', emoji: '📦' };

export function typesOf(categoryId) {
  return [...(CATEGORY_TYPES[categoryId] || []), OTHER_TYPE];
}

export function typeOf(category, offer) {
  // لو المراجعة العميقة لصفحة أمازون حدّدت نوع دقيق (offer.type) بنقدّمه على العنوان
  const valid = new Set((CATEGORY_TYPES[category?.id] || []).map((t) => t.id));
  if (offer?.type && valid.has(offer.type)) return offer.type;
  const text = String(offer?.title || offer?.name || '');
  for (const t of CATEGORY_TYPES[category?.id] || []) {
    if (t.re.test(text)) return t.id;
  }
  return OTHER_TYPE.id;
}

// حاجات مش أجهزة أصلًا (إكسسوارات/أدوات/كتب/قطع غيار) بتتسلل لأن اسم الجهاز
// موجود في العنوان كوصف (dishwasher safe / oven thermometer / AC remote...).
export const JUNK_RE =
  /^remote\s+control\b|\bremote\s+control\s+(?:for|compatible|replacement)\b|\b(?:dishwasher|microwave|freezer|oven)\s*[-\s]safe\b|\bdishwasher\s+(?:tabs|tablets|salt|pods?|cleaner|rinse\s+aid)\b|\b(?:tabs|tablets|pods?)\b[^.]{0,30}\bdishwasher\b|\bsponges?\b|\bmugs?\b|\btongs?\b|\bmeal\s+prep\b|\bfood\s+storage\s+containers?\b|\bcontainers?\s+with\s+(?:clear\s+)?lids?\b|\bmixing\s+bowls?\b|\bthermometers?\b|\bstabilizers?\b|\bvoltage\s+protector\b|\bfresheners?\b|\bdeodoriz(?:er|ers|ing)\b|\bodor\s+eliminator\b|\bair\s+purifier\b|\bjars?\s+with\b|\bstorage\s+jars?\b|\b(?:freezer|washer|washing\s+machine)\s+holder\b|\bholder\b[^.]{0,30}\b(?:freezer|washer)\b|\btarpaulin\b|\bwater\s*proof\s+cover\b|\b(?:drain|drainage|intake|water)\s+hose\b|خرطوم|\blight\s+bulbs?\b|\bbulbs?\b|لمبة|\bknobs?\b|\bkey\s+caps?\b|\b(?:cooker|stove)\s+switches?\b|\b(?:gas|sensor|green)\s+valve\b|\bvalve\b[^.]{0,30}\b(?:sensor|replacement|spare)\b|\bregulator\b|منظم\s*(?:انبوبة|غاز)|\btape\b|\bcleaning\s+(?:foam|spray|agent|solution)\b|\bfoam\s+(?:spray|cleaner)\b|\bbooks?\b|\bguides?\b|\bhandbook\b|\btextbook\b|\bfaucet\b|\b(?:basin|sink|shower|bath)\s+mixer\b|\bwaterfall\b|\bwax\b|شمع|\bfishing\b|\blures?\b|\bjig\b|\btoys?\b|\bbuild\s+more\b|\b(?:folding|foldable)\s+(?:hand\s+)?fan\b|\bhand\s+fan\b|\blace\s+fan\b|\bfan\b[^.]{0,30}\blace\b|\bwedding\b[^.]{0,30}\bfan\b|مروحة\s*(?:يدوية|طي)|\bsteamer\s+(?:basket|strainer|rack)\b|\bvegetable\s+steamer\b|\b(?:pizza|baking|cake)\s+(?:pan|tray|sheet|tin)\b|\bnon\s*stick\s+(?:square\s+)?pan\b|صاج|صج\s*فرن|\boven\s+(?:gloves?|mitts?)\b|جوانتي|\bshoe\s+(?:washing|cleaning)\s+bag\b|\bwashing\s+machine\b[^.]{0,40}\b(?:shoe|laundry|mesh)\s+bag\b|غطاء\s*(?:مكيف|تكييف)|\b(?:milk|coffee|cappuccino|latte|frappe)\s+(?:mixer|frother|blender)\b|\bfrothers?\b|\btupperware\b|\bserving\s+(?:jug|pitcher|bowl|dish)\b|\bfreezer\s+(?:molds?|moulds?)\b|\bsilicone\b[^.]{0,20}\b(?:molds?|moulds?)\b|\bmeal\s+prepping\b|\bniqab\b|\bgamepad\b|\bcharging\s+grip\b|\bmobile\s+controller\b|\bpwm\b|\bargb\b|\bpc\s+fan\b|\bcpu\s+fan\b|\bcase\s+fan\b|\bcomputer\s+fan\b|\bhand\s+held\s+fan\b|\bwood(?:en)?\s+fan\b|\bhand\s+made\b[^.]{0,20}\bfan\b|مروحة\s*يد|مروحة\s*خشب|\bcup\s+washing\s+machine\b|\btransparent\s+cover\b|\bcarbon\s+filter\b|\bactivated\s+carbon\b|فلتر\s*كربوني|شفاط\s*مطبخ|\b(?:air|ac|cabin)\s+filter\b|\bautomotive\b/i;

// الفلتر الموحّد: أي عنوان ما بيذكرش الجهاز، أو بيذكر إكسسوار/قطعة غيار، اتشال.
export function isAccessoryTitle(category, title) {
  const text = String(title || '').replace(/\s+/g, ' ').trim();
  if (!text) return true;
  const rules = CATEGORY_FILTERS[category?.id] || {};
  if (ACCESSORY_RE.test(text)) return true;
  if (JUNK_RE.test(text)) return true;
  if (category?.exclude?.test(text)) return true;
  if (rules.accessory?.test(text)) return true;
  if (rules.device && !rules.device.test(text)) return true;
  return false;
}
