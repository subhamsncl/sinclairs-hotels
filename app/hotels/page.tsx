import { HotelCard } from '@/components/hotel-card';
import { hotels } from '@/content/hotels';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Hotels',
  description: 'Explore Sinclairs Hotels & Resorts properties across India.',
};

export default function HotelsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Our Properties</p>
        <h1 className="mt-4 font-display text-4xl text-forest">Hotels &amp; Resorts</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-ink/70">
          {hotels.length} properties across India, each with its own character and charm.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.slug} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
