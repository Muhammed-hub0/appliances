# دليل الأجهزة المنزلية في مصر | مشترياتك صح 🏠

موقع واحد بيجمع **كل فئات الأجهزة المنزلية** على `amazon.eg`. الصفحة الرئيسية مقسّمة لأقسام، المستخدم يختار الجهاز المطلوب فيفتح جدول مقارنة (زي جدول الإير فراير والميكروويف) فيه الأسعار والمواصفات والروابط.

## الفكره

- نفس محرك **`airfryers-site` / `microwaves-site`**: Amazon **Creators API** الرسمي (مش سكرابينج).
- **24 قسم**، لكل قسم: كلمات بحث، قواعد استبعاد الإكسسوارات، مواصفاته الخاصة، بياناته، وتاريخ أسعاره.
- تحديث تلقائي **كل 6 ساعات** عبر GitHub Actions + نشر على GitHub Pages.
- كل الروابط فيها `?tag=fineartslab-21`.

## الأقسام

`airfryers` · `microwaves` · `fridges` · `freezers` · `shavers` · `washing-machines` · `dishwashers` · `ovens` · `coffee-machines` · `blenders` · `food-processors` · `vacuum-cleaners` · `irons` · `hair-dryers` · `kettles` · `toasters` · `mixers` · `cookers` · `water-heaters` · `air-conditioners` · `fans` · `rice-cookers` · `pressure-cookers` · `juicers`

## الملفات

```
appliances-site/
├─ scripts/
│  ├─ config.mjs     الإعدادات + تعريف الأقسام (CATEGORIES)
│  ├─ amazon.mjs     توكن Creators API + getItems + searchItems
│  ├─ naming.mjs     البراند/المواصفات/الاسم العربي/مفتاح التكرار
│  ├─ update.mjs     تحديث كل الأقسام + إضافة جديد + حذف غير المتاح
│  └─ render.mjs     بناء الصفحة الرئيسية + صفحات الأقسام + صفحات المنتج + CSV
├─ data/
│  ├─ <id>.json              منتجات القسم
│  ├─ <id>-history.json      تاريخ الأسعار
│  └─ meta.json              آخر تشغيل
├─ public/          النسخة المنشورة على Pages
├─ assets/          اللوجو والبانر وصورة الميتا
└─ .github/workflows/update.yml
```

## التشغيل لأول مرة

1. اعمل ريبو **Public** (الاسم المقترح: `appliances`) وارفع **محتويات مجلد `appliances-site`** نفسه في الجذر.
2. Settings → **Pages** → Source = **GitHub Actions**.
3. Settings → **Secrets and variables → Actions** → أضف:
   - `CREATORS_CLIENT_ID`
   - `CREATORS_CLIENT_SECRET`
   - (اختياري) Variables: `PARTNER_TAG` = `fineartslab-21`, و `SITE_URL` = رابط الـ Pages.
4. Actions → **تحديث أسعار الأجهزة المنزلية** → **Run workflow**.

> ⚠️ المفاتيح بتتخزن **بس** في GitHub Secrets. متكتبهوش في أي ملف داخل الريبو.

بعد أول تشغيل، كل قسم هيبتدي يجمع منتجات تلقائيًا (لحد 12 منتج جديد في القسم في كل دورة). الصفحة هتكون على:
`https://<اسم-حسابك>.github.io/<اسم-الريبو>/`

## إزاي بيشتغل

| الخطوة | التفاصيل |
|---|---|
| **تحديث** | `getItems` لكل الـ ASINs في كل الأقسام (10 في الطلب) → سعر + توفر + صورة + مواصفات |
| **إضافة** | `searchItems` لكلمات كل قسم (صفحتين لكل كلمة) + فلترة الإكسسوارات والبراندات غير المسموحة وحدود السعر |
| **حذف** | منتج غير متاح دورتين ورا بعض (≈12 ساعة) → `active=false`، ويرجع تلقائيًا لو رجع متاح |
| **تكرار** | نفس المواصفات بأكتر من ASIN → الأرخص بس |
| **نشر** | بناء `public/` → رفعه Artifact → نشره على Pages، وتكومّت `data/` في الريبو |

## تخصيص

| عايز تعدّل | المكان |
|---|---|
| قسم جديد / حذف قسم | `scripts/config.mjs` → `CATEGORIES` |
| كلمات البحث لقسم | `category.queries` في `config.mjs` |
| مواصفات قسم | `category.specs` في `config.mjs` |
| براندات مسموحة | `AUTO_ADD_BRANDS` |
| براندات مستثناة | `EXCLUDED_BRANDS` |
| كلمة إكسسوار مستثناة | `ACCESSORY_RE` |
| حدود السعر | `MIN_PRICE` / `MAX_PRICE` / `SEARCH_MAX_PRICE` أو لكل قسم |
| شكل الصفحة | `scripts/render.mjs` |

## تجربة محليًا

محتاج Node 20+:

```bash
npm run render:only        # rebuilding من آخر بيانات محفوظة من غير API
npm run update             # تحديث كامل (محتاج المتغيرات في البيئة)
```

```powershell
$env:CREATORS_CLIENT_ID="..."; $env:CREATORS_CLIENT_SECRET="..."; npm run update
```

## ملاحظات

- الأسعار لازم تيجي من الـ API الرسمي؛ برنامج أفلييت أمازون بيمنع الأسعار المسحوبة.
- الضمان والشحن قيم ثابتة (seed) لأن الـ API مبيترجعش بياناتهم.
- التسمية عربية: `البراند + المواصفات + (الموديل)`.
- الصفحات فيها إفصاح أفلييت أمازون تحت الجدول.
