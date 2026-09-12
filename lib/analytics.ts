declare global {
  interface Window {
    dataLayer?: unknown[];
    gaDirectLayer?: unknown[];
  }
}

export type EventParams = Record<string, string | number>;

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
  price?: number;
  quantity?: number;
}

export interface EcommercePayload {
  currency?: string;
  value?: number;
  transaction_id?: string;
  items: EcommerceItem[];
}

// Container GTM-NDXBWC is shared with the legacy WordPress site and we only hold
// read-only access to it (see GO_LIVE_CHECKLIST.md), so the nine tags/triggers
// docs/analytics-events.md specifies were never built. Verified against
// production on 2026-09-12: every event below reaches dataLayer and stops there
// — GA4 receives the automatic page_view and nothing else. This sends them to
// GA4 ourselves, which needs no container access.
//
// It is deliberately a second, parallel transport rather than a replacement: the
// dataLayer pushes stay exactly as they are so the container keeps receiving
// them, and so the planned next-site-cutover workspace still works unchanged if
// edit access ever lands. That day this becomes double-counting — unset
// NEXT_PUBLIC_GA4_ID to switch it off in one move.
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

let ga4Requested = false;

// gtag.js defaults to window.dataLayer, which GTM already owns. Sharing it would
// put gtag command tuples into the queue GTM is reading as event objects, so
// this instance gets its own queue via the documented ?l= parameter.
function gtag(...args: unknown[]): void {
  window.gaDirectLayer ??= [];
  window.gaDirectLayer.push(args);
}

function ensureGa4Loaded(): void {
  if (ga4Requested || !GA4_ID || typeof document === 'undefined') return;
  ga4Requested = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}&l=gaDirectLayer`;
  document.head.appendChild(script);

  gtag('js', new Date());
  // GTM's own GA4 tag is what sends page_view today, and that half does work.
  // Configuring a second sender for the same property without this would double
  // every pageview in the property.
  gtag('config', GA4_ID, { send_page_view: false });
}

function sendToGa4(event: string, params: Record<string, unknown>): void {
  if (!GA4_ID || typeof window === 'undefined') return;
  ensureGa4Loaded();
  gtag('event', event, params);
}

function push(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer ??= [];
  window.dataLayer.push(payload);
}

export function pushDataLayerEvent(event: string, params: EventParams = {}): void {
  push({ event, ...params });
  sendToGa4(event, params);
}

export function pushEcommerceEvent(
  event: string,
  ecommerce: EcommercePayload,
  params: EventParams = {},
): void {
  // GA4 merges each push into one persistent ecommerce object, so without this
  // reset the previous event's items reappear on the next one.
  push({ ecommerce: null });
  push({ event, ...params, ecommerce });
  // The dataLayer form nests the ecommerce block because that is what a GTM GA4
  // tag reads; gtag() takes the same fields flattened onto the event instead.
  sendToGa4(event, { ...params, ...ecommerce });
}

export function hotelItem(
  slug: string,
  name: string,
  extra: Partial<EcommerceItem> = {},
): EcommerceItem {
  return {
    item_id: slug,
    item_name: name,
    item_brand: 'Sinclairs',
    item_category: 'Hotel',
    ...extra,
  };
}
