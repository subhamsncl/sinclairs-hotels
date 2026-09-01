import { getAmenityIcon } from '@/components/amenity-icon';
import { VenueTable } from '@/components/venue-table';
import { awards } from '@/content/awards';
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

const subNav = [
  { href: '#overview', label: 'Overview' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#dining', label: 'Dining' },
  { href: '#events', label: 'Events' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#location', label: 'Location' },
];

export default async function HotelPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel) notFound();

  const award = awards.find((a) => a.propertySlug === hotel.slug);
  const sections = subNav.filter((item) => {
    if (item.href === '#events') return Boolean(hotel.eventSpaces);
    if (item.href === '#gallery') return hotel.gallery.length > 0;
    if (item.href === '#location')
      return Boolean(hotel.mapEmbedUrl) || hotel.sightseeing.length > 0;
    return true;
  });

  return (
    <div>
      <section className="relative flex h-[72vh] min-h-[480px] items-end">
        <Image src={hotel.heroImage} alt={hotel.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/25 to-transparent" />
        {award && (
          <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-lg">
            <div className="relative h-8 w-8 shrink-0">
              <Image src={award.badgeImage} alt="" fill className="object-contain" />
            </div>
            <span className="text-xs font-medium uppercase tracking-wide text-forest-dark">
              Travellers&rsquo; Choice 2026
            </span>
          </div>
        )}
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-10 text-cream">
          <p className="text-sm uppercase tracking-[0.3em] text-gold-light">
            {hotel.location}, {hotel.state}
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl">{hotel.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-cream/85">{hotel.tagline}</p>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-8 w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-xl bg-white px-6 py-5 shadow-xl sm:gap-10">
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            <Stat value={String(hotel.rooms.length)} label="Room Types" />
            <Stat value={String(hotel.dining.length)} label="Dining Venues" />
            {hotel.eventSpaces && (
              <Stat value={String(hotel.eventSpaces.venues.length)} label="Event Spaces" />
            )}
            <Stat value={String(hotel.amenities.length)} label="Amenities" />
          </div>
          <Link
            href={`/enquiry?property=${hotel.slug}`}
            className="rounded bg-gold px-6 py-3 text-sm uppercase tracking-wider text-forest-dark transition hover:bg-gold-light"
          >
            Check Availability
          </Link>
        </div>
      </div>

      <nav className="sticky top-16 z-30 mt-10 border-y border-forest/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 py-3 text-sm">
          {sections.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 text-ink/70 transition hover:text-forest"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="overview" className="mx-auto max-w-4xl scroll-mt-32 px-6 py-16">
        <p className="text-base leading-relaxed text-ink/80">{hotel.description}</p>

        {hotel.amenities.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl text-forest">Amenities</h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              {hotel.amenities.map((amenity) => {
                const Icon = getAmenityIcon(amenity);
                return (
                  <li key={amenity} className="flex items-start gap-2.5">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 stroke-current stroke-[1.6] text-gold" />
                    <span className="text-sm text-ink/80">{amenity}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      {hotel.rooms.length > 0 && (
        <section id="rooms" className="scroll-mt-32 border-y border-forest/10 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-2xl text-forest">Rooms &amp; Suites</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {hotel.rooms.map((room) => (
                <div key={room.name} className="group overflow-hidden rounded-lg bg-cream">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-forest">{room.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{room.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hotel.dining.length > 0 && (
        <section id="dining" className="scroll-mt-32 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-2xl text-forest">Dining</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {hotel.dining.map((venue) => (
                <div
                  key={venue.name}
                  className="overflow-hidden rounded-lg border border-forest/10"
                >
                  {venue.image && (
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-lg text-forest">{venue.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">{venue.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hotel.eventSpaces && (
        <section id="events" className="scroll-mt-32 border-y border-forest/10 bg-white py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-display text-2xl text-forest">Meetings &amp; Celebrations</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              {hotel.eventSpaces.venues.length}{' '}
              {hotel.eventSpaces.venues.length === 1 ? 'venue' : 'venues'} across{' '}
              {hotel.eventSpaces.totalSqFt.toLocaleString('en-IN')} sq ft, hosting up to{' '}
              {hotel.eventSpaces.maxCapacity.toLocaleString('en-IN')} guests.
            </p>
            <div className="mt-6">
              <VenueTable hotel={hotel} />
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link href="/weddings" className="text-forest underline underline-offset-4">
                Plan a wedding here
              </Link>
              <Link href="/meetings-events" className="text-forest underline underline-offset-4">
                Plan a meeting here
              </Link>
            </div>
          </div>
        </section>
      )}

      {hotel.gallery.length > 0 && (
        <section id="gallery" className="scroll-mt-32 bg-forest-dark py-16">
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

      {(hotel.mapEmbedUrl || hotel.sightseeing.length > 0) && (
        <section id="location" className="scroll-mt-32 py-16">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2">
            {hotel.mapEmbedUrl && (
              <div className="aspect-[4/3] overflow-hidden rounded-lg border border-forest/10 lg:aspect-auto">
                <iframe
                  src={hotel.mapEmbedUrl}
                  title={`Map showing ${hotel.name}`}
                  className="h-full min-h-[320px] w-full"
                  loading="lazy"
                />
              </div>
            )}
            {hotel.sightseeing.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-forest">Sightseeing Nearby</h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {hotel.sightseeing.map((spot) => (
                    <span
                      key={spot}
                      className="rounded-full border border-forest/15 px-3 py-1.5 text-sm text-ink/80"
                    >
                      {spot}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="border-t border-forest/10 py-16 text-center">
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl text-forest">{value}</p>
      <p className="text-xs uppercase tracking-wider text-ink/50">{label}</p>
    </div>
  );
}
