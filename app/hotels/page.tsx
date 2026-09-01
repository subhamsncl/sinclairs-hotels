import { HotelCard } from '@/components/hotel-card';
import { hotels } from '@/content/hotels';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Our Hotels',
  description: 'Explore Sinclairs Hotels & Resorts properties across India.',
};

export default function HotelsPage() {
  return (
    <div>
      <section className="relative flex h-[50vh] min-h-[360px] items-end overflow-hidden">
        <div className="absolute inset-0 animate-hero-zoom">
          <Image
            src="/images/hotels/udaipur/Sinclairs-Palace-Retreat-Udaipur-Night-View.jpg"
            alt="Sinclairs Palace Retreat Udaipur lit up at night"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/30 to-forest-dark/10" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 text-cream">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <p className="text-xs uppercase tracking-[0.4em] text-gold-light">Our Properties</p>
            </div>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl">Hotels &amp; Resorts</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/85">
              {hotels.length} destinations across the Himalayas, the Dooars, the Nilgiris,
              Rajasthan, and the Andamans — each with its own character and charm.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.slug} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}
