declare global {
  interface Window {
    dataLayer?: unknown[];
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

function push(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer ??= [];
  window.dataLayer.push(payload);
}

export function pushDataLayerEvent(event: string, params: EventParams = {}): void {
  push({ event, ...params });
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
