import {
  API_BASE,
  MARKETPLACE,
  PARTNER_TAG,
  TOKEN_ENDPOINT,
} from './config.mjs';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let cachedToken = null;

export function hasCredentials() {
  return Boolean(process.env.CREATORS_CLIENT_ID && process.env.CREATORS_CLIENT_SECRET);
}

export async function getToken(force = false) {
  if (cachedToken && !force) return cachedToken;
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.CREATORS_CLIENT_ID,
      client_secret: process.env.CREATORS_CLIENT_SECRET,
      scope: 'creatorsapi::default',
    }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`token ${res.status}: ${text.slice(0, 400)}`);
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`token: رد غير متوقع: ${text.slice(0, 200)}`);
  }
  if (!json.access_token) throw new Error(`token: مفيش access_token: ${text.slice(0, 200)}`);
  cachedToken = json.access_token;
  return cachedToken;
}

async function callApi(path, payload) {
  let lastError = null;

  for (let attempt = 0; attempt < 4; attempt++) {
    const token = await getToken(attempt > 0 && lastError?.status === 401);
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        'x-marketplace': MARKETPLACE,
      },
      body: JSON.stringify({
        marketplace: MARKETPLACE,
        partnerTag: PARTNER_TAG,
        ...payload,
      }),
    });
    const text = await res.text();

    if (res.ok) {
      // حد الـ API حوالي طلب واحد في الثانية
      await sleep(1100);
      try {
        return JSON.parse(text);
      } catch {
        throw new Error(`${path}: رد JSON غير صالح`);
      }
    }

    lastError = new Error(`${path} ${res.status}: ${text.slice(0, 300)}`);
    lastError.status = res.status;

    const retryable = res.status === 429 || res.status === 401 || res.status >= 500;
    if (!retryable || attempt === 3) break;
    await sleep(1200 * 2 ** attempt);
  }

  throw lastError;
}

export const GET_ITEMS_RESOURCES = [
  'itemInfo.title',
  'itemInfo.byLineInfo',
  'itemInfo.technicalInfo',
  'images.primary.large',
  'offersV2.listings.price',
  'offersV2.listings.availability',
  'offersV2.listings.condition',
  'offersV2.listings.isBuyBoxWinner',
  'offersV2.listings.merchantInfo',
  'parentASIN',
];

export const SEARCH_RESOURCES = [
  'itemInfo.title',
  'itemInfo.byLineInfo',
  'images.primary.large',
  'offersV2.listings.price',
  'offersV2.listings.availability',
  'offersV2.listings.condition',
  'offersV2.listings.isBuyBoxWinner',
  'parentASIN',
];

// كل المنتجات في كل الأقسام تتجمع في نداءات getItems (10 في الطلب) عشان نقلل عدد الطلبات
export async function getItems(asins) {
  const items = new Map();
  const errors = [];
  const list = [...new Set(asins)].filter(Boolean);

  for (let i = 0; i < list.length; i += 10) {
    const chunk = list.slice(i, i + 10);
    try {
      const json = await callApi('/catalog/v1/getItems', {
        itemIds: chunk,
        itemIdType: 'ASIN',
        resources: GET_ITEMS_RESOURCES,
      });
      for (const item of json?.itemsResult?.items || []) {
        if (item?.asin) items.set(item.asin, item);
      }
      for (const err of json?.errors || []) errors.push(err);
    } catch (err) {
      errors.push({ code: 'RequestError', message: err.message, itemIds: chunk });
    }
  }

  return { items, errors };
}

export async function searchItems({ keywords, itemPage = 1, itemCount = 10, minPrice, maxPrice }) {
  const json = await callApi('/catalog/v1/searchItems', {
    keywords,
    itemPage,
    itemCount,
    searchIndex: 'All',
    minPrice,
    maxPrice,
    resources: SEARCH_RESOURCES,
  });
  return json?.searchResult?.items || [];
}

export function normalizeItem(item) {
  const listings = item?.offersV2?.listings || [];
  const listing = listings.find((l) => l.isBuyBoxWinner) || listings[0] || null;

  const rawPrice = listing?.price?.money?.amount;
  const price = Number.isFinite(Number(rawPrice)) ? Number(rawPrice) : null;

  return {
    asin: item?.asin || null,
    title: item?.itemInfo?.title?.displayValue || '',
    byLine:
      item?.itemInfo?.byLineInfo?.brand?.displayValue ||
      item?.itemInfo?.byLineInfo?.manufacturer?.displayValue ||
      '',
    price,
    currency: listing?.price?.money?.currency || null,
    availability: listing?.availability?.type || null,
    condition: listing?.condition?.value || null,
    image:
      item?.images?.primary?.large?.url ||
      item?.images?.primary?.medium?.url ||
      item?.images?.primary?.small?.url ||
      '',
    parentAsin: item?.parentASIN || null,
  };
}
