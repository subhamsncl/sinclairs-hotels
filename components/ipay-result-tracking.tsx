'use client';

import { hotelItem, pushDataLayerEvent, pushEcommerceEvent } from '@/lib/analytics';
import { useEffect } from 'react';

// sessionStorage rather than a ref: the duplicate comes from a fresh page load,
// which a ref does not survive. Private-mode and blocked-storage browsers throw
// on access, and a missed de-duplication is a better failure than a missed sale.
function alreadyReported(key: string): boolean {
  try {
    const storageKey = `sncl:ipay-reported:${key}`;
    if (sessionStorage.getItem(storageKey)) return true;
    sessionStorage.setItem(storageKey, '1');
    return false;
  } catch {
    return false;
  }
}

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
    // ICICI returns the guest here with the order in the URL, so a refresh or a
    // back-navigation re-mounts this and would report the same transaction_id
    // again. GA4 does not de-duplicate purchases, so each repeat is counted as
    // real additional revenue.
    if (alreadyReported(`${orderId}:${status}`)) return;

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
