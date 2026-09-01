import { AwardsSection } from '@/components/awards-section';
import { BookingWidget } from '@/components/booking-widget';
import { ExperiencesCarousel } from '@/components/experiences-carousel';
import { HotelCard } from '@/components/hotel-card';
import { awards } from '@/content/awards';
import { experiences } from '@/content/experiences';
import { hotels } from '@/content/hotels';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [primary, secondaryTop, secondaryBottom] = hotels;

  return (
    <>
      <section className="relative">
        <div className="grid h-[70vh] min-h-[480px] grid-cols-1 gap-1 sm:grid-cols-3">
          {primary && (
            <div className="relative col-span-1 sm:col-span-2">
              <Image
                src={primary.heroImage}
                alt={primary.name}
                fill
                priority
                sizes="(min-width: 640px) 66vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-cream sm:p-10">
                <p className="text-sm uppercase tracking-[0.3em] text-gold-light">
                  Business &amp; Leisure, Across India
                </p>
                <h1 className="mt-4 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
                  Your Oasis of Relaxation Awaits
                </h1>
                <Link
                  href="/hotels"
                  className="mt-6 inline-block rounded bg-gold px-6 py-3 text-sm uppercase tracking-wider text-forest-dark transition hover:bg-gold-light"
                >
                  Explore Our Hotels
                </Link>
              </div>
            </div>
          )}
          <div className="hidden grid-rows-2 gap-1 sm:grid">
            {secondaryTop && (
              <div className="relative">
                <Image
                  src={secondaryTop.heroImage}
                  alt={secondaryTop.name}
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            )}
            {secondaryBottom && (
              <div className="relative">
                <Image
                  src={secondaryBottom.heroImage}
                  alt={secondaryBottom.name}
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-8 w-full max-w-5xl px-4 sm:-mt-10">
          <BookingWidget hotels={hotels} />
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

      <section className="border-y border-forest/10 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Signature Experiences</p>
            <h2 className="mt-4 font-display text-3xl text-forest sm:text-4xl">
              Memories that last a lifetime
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink/70">
              From misty mountain railways to island sunsets — unforgettable experiences await.
            </p>
          </div>
          <ExperiencesCarousel experiences={experiences} />
        </div>
      </section>

      <section className="bg-forest/5 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Stellar Cuisine</p>
          <h2 className="mt-4 font-display text-3xl text-forest sm:text-4xl">
            A Journey of Delectable Flavours
          </h2>
          <p className="mt-4 text-sm text-ink/70">
            At Sinclairs Hotels, dining is not just a meal — it&apos;s an experience. Whether
            you&apos;re seeking a casual bite or dishes immersed in local flavour, our culinary
            offerings promise to delight every palate.
          </p>
        </div>
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
                src="/images/weddings/mandap-entrance.jpg"
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
          <h2 className="text-center font-display text-3xl text-forest sm:text-4xl">
            Awards and Recognitions
          </h2>
          <div className="mt-10">
            <AwardsSection awards={awards} />
          </div>
        </div>
      </section>
    </>
  );
}
