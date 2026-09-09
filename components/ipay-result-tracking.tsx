'use client';

import { pushDataLayerEvent } from '@/lib/analytics';
import { useEffect } from 'react';

// ipay/result stays a Server Component (it already fetches the Payment row
// there) — this is a small client child so the page.tsx doesn't need
// 'use client' just to fire one dataLayer event on mount.
export function IpayResultTracking({
  status,
  orderId,
  amount,
  hotelSlug,
}: {
  status: 'SUCCESS' | 'FAILURE' | 'INITIATED' | 'ABORTED';
  orderId: string;
  amount: number;
  hotelSlug: string;
}) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: fire once per result page load, not on every render
  useEffect(() => {
    if (status === 'SUCCESS') {
      pushDataLayerEvent('purchase', {
        transaction_id: orderId,
        value: amount,
        currency: 'INR',
        property: hotelSlug,
      });
    } else {
      pushDataLayerEvent('payment_failed', {
        transaction_id: orderId,
        value: amount,
        currency: 'INR',
        property: hotelSlug,
        status,
      });
    }
  }, []);

  return null;
}
