import { HotelCard } from '@/components/hotel-card';
import { hotels } from '@/content/hotels';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const heroHotel = hotels[0];

  return (
    <>
      <section className="relative flex h-[80vh] min-h-[520px] items-end">
        {heroHotel && (
          <Image
            src={heroHotel.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/20 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 text-cream">
          <p className="text-sm uppercase tracking-[0.3em] text-gold-light">
            Business &amp; Leisure, Across India
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
            Your Oasis of Relaxation Awaits
          </h1>
          <div className="mt-8 flex gap-4">
            <Link
              href="/hotels"
              className="rounded bg-gold px-6 py-3 text-sm uppercase tracking-wider text-forest-dark transition hover:bg-gold-light"
            >
              Explore Our Hotels
            </Link>
            <Link
              href="/enquiry"
              className="rounded border border-cream/40 px-6 py-3 text-sm uppercase tracking-wider transition hover:border-cream"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-forest py-20 text-cream">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-light">
            About Sinclairs Hotels
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">Your Oasis of Relaxation</h2>
          <p className="mt-6 text-base leading-relaxed text-cream/85">
            Sinclairs Hotels and Resorts is a collection of hotels across India, designed to meet
            the needs of the value traveller. Our hotels are located in select locations across
            India and offer affordable accommodations, without compromising on comfort and
            cleanliness. From breath-taking mountain getaways to destinations steeped in history,
            our hotels offer a variety of experiences, each with its own unique character and charm.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Featured Properties</p>
          <h2 className="mt-4 font-display text-3xl text-forest sm:text-4xl">Hotels and Resorts</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink/70">
            Whether staying for business or leisure, discover our properties across India.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.slug} hotel={hotel} />
          ))}
        </div>
      </section>

      <section className="bg-brand-cream border-y border-forest/10 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Plan Your Stay</p>
          <h2 className="mt-4 font-display text-3xl text-forest sm:text-4xl">
            Meetings, Weddings &amp; Celebrations
          </h2>
          <p className="mt-4 text-sm text-ink/70">
            From boardrooms to banquet halls, our properties host business gatherings and
            once-in-a-lifetime celebrations with equal care.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/meetings-events"
              className="rounded border border-forest px-6 py-3 text-sm uppercase tracking-wider text-forest transition hover:bg-forest hover:text-cream"
            >
              Meetings &amp; Events
            </Link>
            <Link
              href="/weddings"
              className="rounded border border-forest px-6 py-3 text-sm uppercase tracking-wider text-forest transition hover:bg-forest hover:text-cream"
            >
              Weddings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
