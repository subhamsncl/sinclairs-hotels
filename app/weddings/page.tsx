import { EnquiryForm } from '@/components/enquiry-form';
import { VenueTable } from '@/components/venue-table';
import { hotels } from '@/content/hotels';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Weddings',
  description: 'Celebrate your wedding at a Sinclairs property, from the mountains to the coast.',
};

const gallery = [
  {
    src: '/images/weddings/mandap-entrance.jpg',
    alt: 'A floral mandap entrance lit up for an evening wedding',
  },
  {
    src: '/images/weddings/wedding-reception-dance.jpg',
    alt: 'A couple dancing at their wedding reception under festive lights',
  },
  { src: '/images/weddings/celebration-toast.jpg', alt: 'Guests raising a toast in celebration' },
];

const stats = [
  { value: '26', label: 'Event Rooms' },
  { value: '45,570', label: 'Sq Ft of Event Space' },
  { value: '500', label: 'Capacity, Largest Space' },
  { value: '18', label: 'Breakout Rooms' },
];

const occasions = [
  'Roka',
  'Mehendi',
  'Haldi',
  'Sangeet',
  'Bridal Shower',
  'Wedding Ceremony',
  'Reception',
  'Renewal of Vows',
  'Honeymoon',
];

const services = [
  'Photos and Video',
  'Wedding Floral Décor',
  'Catering',
  'Live Music and DJ',
  'Wedding Cake',
  'Honeymoon Planning',
];

export default function WeddingsPage() {
  return (
    <div>
      <section className="relative flex h-[60vh] min-h-[420px] items-end">
        <Image
          src="/images/weddings/wedding-couple-portrait.jpg"
          alt="A newly married couple in traditional Indian wedding attire"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/20 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-12 text-cream">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-light">Legendary Weddings</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">
            Unforgettable Elegance, Timeless Style
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/85">
            Your moment, your way — where happily ever after begins. At Sinclairs, we promise a
            memorable wedding experience across our event locations, from secluded retreats and
            mountain towns to sea getaways.
          </p>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 text-center sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl text-forest">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-ink/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <h2 className="font-display text-lg text-forest">Memorable Weddings</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Your fairy tale wedding will come alive at Sinclairs Hotels. Whether it means holding
              your ceremony on a green lawn, taking portraits by the pool, or hosting a cocktail
              party on the terrace, we offer intimate indoor and outdoor options, with private and
              exclusive use of the entire property.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg text-forest">Help Us Plan Your Special Day</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Our in-house team will help you plan an unforgettable wedding tailored to your needs,
              collaborating with curated partners for everything from bespoke fresh florals to
              exquisite table details.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg text-forest">A Tasteful Wedding Menu</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Immerse in an opulent dining experience featuring a symphony of gastronomical
              delights. We can customise a menu that features ingredients from all over India, from
              grab-and-go counters to traditional food platters.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-forest-dark py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {gallery.map((image) => (
              <div key={image.src} className="relative aspect-[4/5] overflow-hidden rounded">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center font-display text-2xl text-forest">Wedding Events</h2>
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-3">
          {occasions.map((occasion) => (
            <span
              key={occasion}
              className="rounded-full border border-gold/40 px-4 py-1.5 text-sm text-ink/80"
            >
              {occasion}
            </span>
          ))}
        </div>

        <h2 className="mt-14 text-center font-display text-2xl text-forest">Our Services</h2>
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-3">
          {services.map((service) => (
            <span
              key={service}
              className="rounded-full bg-forest/5 px-4 py-1.5 text-sm text-ink/80"
            >
              {service}
            </span>
          ))}
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-display text-2xl text-forest">
            Banquet Rooms for Every Occasion
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-ink/70">
            From breathtaking banquet rooms to scenic outdoor spaces, Sinclairs offers a variety of
            venues to suit every couple&rsquo;s style.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {hotels.map((hotel) => (
              <VenueTable key={hotel.slug} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-center font-display text-2xl text-forest">
            Contact Us, We Are Happy to Help
          </h2>
          <p className="mt-3 text-center text-sm text-ink/70">
            We understand that this day needs to be very special. Share your wedding dates, guest
            count, and preferred property, and our events team will reach out with options.
          </p>
          <div className="mt-8">
            <EnquiryForm hotels={hotels} />
          </div>
        </div>
      </section>
    </div>
  );
}
