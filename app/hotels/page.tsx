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
      <section className="relative flex h-[62vh] min-h-[440px] items-end overflow-hidden">
        <div className="absolute inset-0 animate-hero-zoom">
          <Image
            src="/images/hotels/ooty/destination/Sinclairs-Retreat-Ooty-view.jpg"
            alt="Sinclairs Retreat Ooty overlooking the Nilgiri hills at dusk"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/55 to-forest-dark/20" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 text-cream">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <p className="text-[0.65rem] uppercase tracking-[0.15em] text-cream drop-shadow-md sm:whitespace-nowrap sm:text-xs sm:tracking-[0.4em]">
                Our Properties
              </p>
            </div>
            <h1 className="mt-5 font-display text-5xl drop-shadow-lg sm:text-6xl">
              Hotels &amp; Resorts
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/85">
              {hotels.length} destinations across the Himalayas, the Dooars, the Nilgiris,
              Rajasthan, and the Andamans — each with its own character and charm.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.slug} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}
