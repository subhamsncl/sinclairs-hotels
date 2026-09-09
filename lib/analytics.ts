declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function pushDataLayerEvent(
  event: string,
  params: Record<string, string | number> = {},
): void {
  if (typeof window === 'undefined') return;
  window.dataLayer ??= [];
  window.dataLayer.push({ event, ...params });
}
