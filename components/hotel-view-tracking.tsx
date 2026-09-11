'use client';

import { hotelItem, pushEcommerceEvent } from '@/lib/analytics';
import { useEffect } from 'react';

// The hotel page stays a Server Component; this is a small client child that
// reports the property view as a GA4 ecommerce item. It's what makes
// "views per property vs enquiries per property" answerable — the legacy site
// could only infer property interest from page paths.
export function HotelViewTracking({ slug, name }: { slug: string; name: string }) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: one view per page load
  useEffect(() => {
    pushEcommerceEvent('view_item', { items: [hotelItem(slug, name)] }, { hotel: slug });
  }, []);

  return null;
}
