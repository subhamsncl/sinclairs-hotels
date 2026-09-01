import { AwardsSection } from '@/components/awards-section';
import { BookingWidget } from '@/components/booking-widget';
import { EditorialRow } from '@/components/editorial-row';
import { ExperiencesCarousel } from '@/components/experiences-carousel';
import { HotelCard } from '@/components/hotel-card';
import { Reveal } from '@/components/reveal';
import { awards } from '@/content/awards';
import { experiences } from '@/content/experiences';
import { getHotelBySlug, hotels } from '@/content/hotels';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [primary, secondaryTop, secondaryBottom] = hotels;
  const heroProperty = getHotelBySlug('udaipur') ?? primary;
  const states = new Set(hotels.map((h) => h.state)).size;
  const totalDining = hotels.reduce((sum, h) => sum + h.dining.length, 0);
  const totalEventSpaces = hotels.reduce((sum, h) => sum + (h.eventSpaces?.venues.length ?? 0), 0);

  const stats = [
    { value: String(hotels.length), label: 'Destinations' },
    { value: String(states), label: 'States Across India' },
    { value: String(totalDining), label: 'Restaurants & Bars' },
    { value: String(totalEventSpaces), label: 'Event Spaces' },
  ];

  return (
    <>
      <section className="relative h-[85vh] min-h-[620px] overflow-hidden">
        {heroProperty && (
          <>
            <div className="absolute inset-0 animate-hero-zoom">
              <Image
                src={heroProperty.heroImage}
                alt={heroProperty.name}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/50 to-forest-dark/15" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream to-transparent sm:h-56" />
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 pb-24 sm:pb-32">
          <div className="animate-fade-up mx-auto w-full max-w-7xl px-6 text-cream">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <p className="text-xs uppercase tracking-[0.4em] text-cream drop-shadow-md">
                Business &amp; Leisure, Across India
              </p>
            </div>
            <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[1.05] drop-shadow-lg sm:text-7xl">
              Your Oasis of Relaxation Awaits
            </h1>
            <Link
              href="/hotels"
              className="mt-7 inline-block rounded bg-gold px-7 py-3 text-sm uppercase tracking-wider text-forest-dark transition hover:bg-gold-light"
            >
              Explore Our Hotels
            </Link>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-10 w-full max-w-5xl px-4">
        <BookingWidget hotels={hotels} />
      </div>

      <section className="border-b border-forest/10 py-10">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 text-center sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl text-forest">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-ink/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-forest py-20 text-cream">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <p className="text-xs uppercase tracking-[0.3em] text-gold-light">
              About Sinclairs Hotels
            </p>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">Your Oasis of Relaxation</h2>
          <p className="mt-6 text-base leading-relaxed text-cream/85">
            Sinclairs Hotels and Resorts is a collection of hotels across India, designed to meet
            the needs of the value traveller. Our hotels are located in select locations across
            India and offer affordable accommodations, without compromising on comfort and
            cleanliness. From breath-taking mountain getaways to destinations steeped in history,
            our hotels offer a variety of experiences, each with its own unique character and charm.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Featured Properties</p>
          <h2 className="mt-4 font-display text-3xl text-forest sm:text-4xl">Hotels and Resorts</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink/70">
            Whether staying for business or leisure, discover our properties across India.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel, i) => (
            <Reveal key={hotel.slug} delay={(i % 3) * 80}>
              <HotelCard hotel={hotel} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Signature Experiences</p>
            <h2 className="mt-4 font-display text-3xl text-forest sm:text-4xl">
              Memories that last a lifetime
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink/70">
              From misty mountain railways to island sunsets — unforgettable experiences await.
            </p>
          </Reveal>
          <ExperiencesCarousel experiences={experiences} />
        </div>
      </section>

      <section className="bg-forest/5">
        <EditorialRow
          title="A Journey of Delectable Flavours"
          body="At Sinclairs Hotels, dining is not just a meal — it's an experience. Whether you're seeking a casual bite or dishes immersed in local flavour, our culinary offerings promise to delight every palate, from grab-and-go counters to traditional feasts."
          image="/images/weddings/wedding-menu-spread.jpg"
          alt="A spread of Indian dishes served in silver and gold vessels"
          imageSide="right"
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl text-forest sm:text-4xl">
            Unforgettable Events and Weddings Await You
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="group overflow-hidden rounded-lg border border-forest/10 bg-white shadow-sm transition hover:shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden">
              {secondaryTop && (
                <Image
                  src={secondaryTop.heroImage}
                  alt="Events and conferences at Sinclairs"
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl text-forest">Events &amp; Conferences</h3>
              <p className="mt-2 text-sm text-ink/70">
                From planning to execution, our teams support you every step of the way.
              </p>
              <Link
                href="/meetings-events"
                className="mt-4 inline-block rounded bg-forest px-5 py-2 text-xs uppercase tracking-wider text-cream transition hover:bg-forest-dark"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="group overflow-hidden rounded-lg border border-forest/10 bg-white shadow-sm transition hover:shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/weddings/wedding-hero-bride.jpg"
                alt="Weddings at Sinclairs"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl text-forest">Weddings</h3>
              <p className="mt-2 text-sm text-ink/70">
                Host your dream wedding at our hotel — we&apos;ll handle the details so you can
                enjoy your day.
              </p>
              <Link
                href="/weddings"
                className="mt-4 inline-block rounded bg-forest px-5 py-2 text-xs uppercase tracking-wider text-cream transition hover:bg-forest-dark"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest/5 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Recognised Excellence</p>
            <h2 className="mt-4 font-display text-3xl text-forest sm:text-4xl">
              Awards and Recognitions
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink/70">
              Six of our properties have been honoured with Tripadvisor&rsquo;s Travellers&rsquo;
              Choice Award 2026, ranking among the top hotels reviewed by travellers worldwide.
            </p>
          </Reveal>
          <Reveal className="mt-12" delay={150}>
            <AwardsSection awards={awards} />
          </Reveal>
        </div>
      </section>

      <section className="relative flex h-[42vh] min-h-[320px] items-center justify-center overflow-hidden">
        {secondaryBottom && (
          <div className="absolute inset-0 animate-hero-zoom">
            <Image
              src={secondaryBottom.heroImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-forest-dark/75" />
        <div className="relative px-6 text-center text-cream">
          <h2 className="font-display text-3xl sm:text-4xl">Ready for Your Escape?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-cream/80">
            Share your travel dates and let our reservations team find the perfect stay for you.
          </p>
          <Link
            href="/enquiry"
            className="mt-6 inline-block rounded bg-gold px-7 py-3 text-sm uppercase tracking-wider text-forest-dark transition hover:bg-gold-light"
          >
            Enquire Now
          </Link>
        </div>
      </section>
    </>
  );
}
