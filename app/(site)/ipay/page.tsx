import { IpayForm } from '@/components/ipay-form';
import { hotels } from '@/content/hotels';
import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'i-Pay',
    description: 'Make a secure online payment to Sinclairs Hotels & Resorts.',
    path: '/ipay',
  }),
  // A payment form has no reason to rank in search, and the legacy site
  // never linked it from nav either — guests reach it via a direct link.
  robots: { index: false, follow: false },
};

export default function IpayPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden aspect-[4/3] lg:sticky lg:top-0 lg:block lg:aspect-auto lg:h-screen">
        <Image
          src="/images/hotels/darjeeling/destination/Sinclairs-Darjeeling-Entrance-1.webp"
          alt="The warmly lit entrance porch at Sinclairs Darjeeling"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-forest-dark/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-10 text-cream">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-light">Secure Payment</p>
          <h2 className="mt-3 max-w-sm font-display text-3xl leading-tight">i-Pay</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/80">
            Pay a booking deposit or balance securely online — for any Sinclairs property, with or
            without an existing reservation.
          </p>
        </div>
      </div>

      <div className="bg-forest/5 px-6 py-10 sm:py-16 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-lg lg:mx-0">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Secure Payment</p>
            <h1 className="mt-4 font-display text-4xl text-forest">i-Pay</h1>
            <p className="mt-4 text-sm text-ink/70">
              Enter your details below to make a secure online payment. You will be redirected to
              our payment partner to complete the transaction.
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-xl sm:p-10">
            <IpayForm hotels={hotels} />
          </div>
        </div>
      </div>
    </div>
  );
}
