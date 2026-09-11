'use client';

import { hotelItem, pushDataLayerEvent, pushEcommerceEvent } from '@/lib/analytics';
import { useEffect } from 'react';

// ipay/result stays a Server Component (it already fetches the Payment row
// there) — this is a small client child so the page.tsx doesn't need
// 'use client' just to fire one dataLayer event on mount.
export function IpayResultTracking({
  status,
  orderId,
  amount,
  hotelSlug,
  hotelName,
}: {
  status: 'SUCCESS' | 'FAILURE' | 'INITIATED' | 'ABORTED';
  orderId: string;
  amount: number;
  hotelSlug: string;
  hotelName: string;
}) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: fire once per result page load, not on every render
  useEffect(() => {
    if (status === 'SUCCESS') {
      pushEcommerceEvent(
        'purchase',
        {
          transaction_id: orderId,
          value: amount,
          currency: 'INR',
          items: [hotelItem(hotelSlug, hotelName, { price: amount, quantity: 1 })],
        },
        { hotel: hotelSlug },
      );
    } else {
      // Not a GA4 ecommerce event — a failed payment must never reach the
      // Monetization reports, so it stays a flat custom event.
      pushDataLayerEvent('payment_failed', {
        transaction_id: orderId,
        value: amount,
        currency: 'INR',
        hotel: hotelSlug,
        status,
      });
    }
  }, []);

  return null;
}
