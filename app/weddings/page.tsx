import { EditorialRow } from '@/components/editorial-row';
import { EnquiryForm } from '@/components/enquiry-form';
import {
  CakeIcon,
  CameraIcon,
  CateringIcon,
  FlowerIcon,
  HeartIcon,
  MusicIcon,
} from '@/components/service-icons';
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
    src: '/images/weddings/wedding-couple-portrait.jpg',
    alt: 'A newly married couple in traditional Indian wedding attire',
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
  { label: 'Photos and Video', icon: CameraIcon },
  { label: 'Wedding Floral Décor', icon: FlowerIcon },
  { label: 'Catering', icon: CateringIcon },
  { label: 'Live Music and DJ', icon: MusicIcon },
  { label: 'Wedding Cake', icon: CakeIcon },
  { label: 'Honeymoon Planning', icon: HeartIcon },
];

export default function WeddingsPage() {
  return (
    <div>
      <section className="relative flex h-[58vh] min-h-[400px] items-end overflow-hidden">
        <div className="absolute inset-0 animate-hero-zoom">
          <Image
            src="/images/weddings/wedding-hero-bride.jpg"
            alt="A bride adjusting her jewellery, seen through an ornate golden lattice"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/50 to-forest-dark/15" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 text-cream">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <p className="text-xs uppercase tracking-[0.4em] text-cream drop-shadow-md">
                Legendary Weddings
              </p>
            </div>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-7xl">
              Unforgettable Elegance,
              <br />
              Timeless Style
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/85">
              Your moment, your way — where happily ever after begins. At Sinclairs, we promise a
              memorable wedding experience across our event locations, from secluded retreats and
              mountain towns to sea getaways.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-10 w-full max-w-5xl px-4">
        <div className="grid grid-cols-2 gap-6 rounded-xl bg-white px-6 py-6 shadow-2xl sm:grid-cols-4 sm:gap-8 sm:px-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl text-forest">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-ink/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-forest/5">
        <EditorialRow
          title="Memorable Weddings"
          body="Your fairy tale wedding will come alive at Sinclairs Hotels. Whether it means holding your ceremony on a green lawn, taking portraits by the pool, or hosting a cocktail party on the terrace, we offer intimate indoor and outdoor options, with private and exclusive use of the entire property."
          image="/images/weddings/haldi-celebration.jpg"
          alt="Guests showering the bride with flower petals at a Haldi celebration"
          imageSide="right"
        />
        <EditorialRow
          title="Help Us Plan Your Special Day"
          body="Our in-house team will help you plan an unforgettable wedding tailored to your needs, collaborating with curated partners for everything from bespoke fresh florals to exquisite table details. Our Chef will prepare an exquisite menu that you and your loved ones will cherish."
          image="/images/weddings/bride-portrait-pink.jpg"
          alt="A bride in a pink and gold lehenga adjusting her earring"
          imageSide="left"
        />
        <EditorialRow
          title="A Tasteful Wedding Menu"
          body="Immerse in an opulent dining experience featuring a symphony of gastronomical delights. We can customise a menu that features ingredients from all over India, from grab-and-go counters to traditional food platters."
          image="/images/weddings/wedding-menu-spread.jpg"
          alt="A spread of Indian wedding banquet dishes in silver and gold serving ware"
          imageSide="right"
        />
        <EditorialRow
          title="Lavish Stays at Inspiring Venues"
          body="Nestled in the best locations, our accommodations embody sophistication and comfort. From spacious guest rooms to lavish suites, each space is a haven of tranquility. Our rooms have plush interiors and modern amenities that can accommodate all your wedding guests."
          image="/images/weddings/couple-mandap.jpg"
          alt="A newly engaged couple standing beneath a mandap decorated with garlands"
          imageSide="left"
        />
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-display text-2xl text-forest">
            Moments We&rsquo;ve Captured
          </h2>
          <div className="mt-8 grid auto-rows-[200px] grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.map((image, i) => (
              <div
                key={image.src}
                className={`group relative overflow-hidden rounded-lg ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-forest-dark/0 transition group-hover:bg-forest-dark/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
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
              key={service.label}
              className="flex items-center gap-2 rounded-full bg-forest/5 px-4 py-1.5 text-sm text-ink/80"
            >
              <service.icon className="h-4 w-4 stroke-current fill-none stroke-2 text-gold" />
              {service.label}
            </span>
          ))}
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-display text-2xl text-forest">
            Banquet Rooms for Every Occasion
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-ink/70">
            From breathtaking banquet rooms to scenic outdoor spaces, Sinclairs offers a variety of
            venues to suit every couple&rsquo;s style.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {hotels.map((hotel) => (
              <VenueTable key={hotel.slug} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-center font-display text-2xl text-forest">
            Contact Us, We Are Happy to Help
          </h2>
          <p className="mt-3 text-center text-sm text-ink/70">
            We understand that this day needs to be very special. Share your wedding dates, guest
            count, and preferred property, and our events team will reach out with options.
          </p>
          <div className="mt-8 rounded-xl bg-white p-6 shadow-xl sm:p-10">
            <EnquiryForm hotels={hotels} />
          </div>
        </div>
      </section>
    </div>
  );
}
