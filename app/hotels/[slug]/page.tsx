import { getHotelBySlug, hotels } from '@/content/hotels';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return hotels.map((hotel) => ({ slug: hotel.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel) return {};
  return {
    title: hotel.name,
    description: hotel.description,
  };
}

export default async function HotelPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel) notFound();

  return (
    <div>
      <section className="relative flex h-[60vh] min-h-[420px] items-end">
        <Image src={hotel.heroImage} alt={hotel.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/10 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-12 text-cream">
          <p className="text-sm uppercase tracking-[0.3em] text-gold-light">{hotel.location}</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{hotel.name}</h1>
          <p className="mt-3 max-w-2xl text-cream/85">{hotel.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-base leading-relaxed text-ink/80">{hotel.description}</p>
      </section>

      {hotel.amenities.length > 0 && (
        <section className="border-y border-forest/10 bg-white py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="font-display text-2xl text-forest">Amenities</h2>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {hotel.amenities.map((amenity) => (
                <li key={amenity} className="text-sm text-ink/80">
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {hotel.rooms.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="font-display text-2xl text-forest">Rooms &amp; Suites</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotel.rooms.map((room) => (
              <div
                key={room.name}
                className="overflow-hidden rounded-lg border border-forest/10 bg-white"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={room.image} alt={room.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-forest">{room.name}</h3>
                  <p className="mt-2 text-sm text-ink/70">{room.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {hotel.dining.length > 0 && (
        <section className="border-y border-forest/10 bg-white py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="font-display text-2xl text-forest">Dining</h2>
            <ul className="mt-6 space-y-2">
              {hotel.dining.map((venue) => (
                <li key={venue} className="text-sm text-ink/80">
                  {venue}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {hotel.sightseeing.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-display text-2xl text-forest">Sightseeing Nearby</h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {hotel.sightseeing.map((spot) => (
              <li key={spot} className="text-sm text-ink/80">
                {spot}
              </li>
            ))}
          </ul>
        </section>
      )}

      {hotel.gallery.length > 0 && (
        <section className="bg-forest-dark py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-2xl text-cream">Gallery</h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {hotel.gallery.map((image) => (
                <div key={image.src} className="relative aspect-square overflow-hidden rounded">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 text-center">
        <Link
          href={`/enquiry?property=${hotel.slug}`}
          className="inline-block rounded bg-gold px-8 py-3 text-sm uppercase tracking-wider text-forest-dark transition hover:bg-gold-light"
        >
          Enquire About {hotel.name}
        </Link>
      </section>
    </div>
  );
}
