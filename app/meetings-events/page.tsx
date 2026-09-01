import { BusinessIcon, SightseeingIcon } from '@/components/amenity-icon';
import { EnquiryForm } from '@/components/enquiry-form';
import { CateringIcon } from '@/components/service-icons';
import { VenueTable } from '@/components/venue-table';
import { hotels } from '@/content/hotels';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Meetings & Events',
  description: 'Host your next business gathering or conference at a Sinclairs property.',
};

const features = [
  {
    title: 'Versatile Venues',
    description:
      'Our hotels have a variety of event spaces to meet your needs. Thoughtfully designed, each space offers exclusivity and access to the latest technology.',
    icon: BusinessIcon,
  },
  {
    title: 'Bespoke Menus',
    description:
      'Our culinary team crafts special menus featuring Indian and local cuisines, together with thoughtful service, to ensure a seamless event.',
    icon: CateringIcon,
  },
  {
    title: 'Team Building Activities',
    description:
      'Between meetings, we organise tours around town — from monasteries to lakes and mountains — helping you experience each destination at its best.',
    icon: SightseeingIcon,
  },
];

export default function MeetingsEventsPage() {
  return (
    <div>
      <section className="relative flex h-[58vh] min-h-[400px] items-end overflow-hidden">
        <div className="absolute inset-0 animate-hero-zoom">
          <Image
            src="/images/meetings-events/conference-setup.jpg"
            alt="A boardroom-style conference setup at a Sinclairs property"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/25 to-forest-dark/10" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 text-cream">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <p className="text-xs uppercase tracking-[0.4em] text-gold-light">
                Business &amp; Events
              </p>
            </div>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-7xl">
              Where Business Meets
              <br />
              Impeccable Hospitality
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/85">
              Discover the ultimate blend of elegance, adaptability, and outstanding service when
              hosting your meetings and events at Sinclairs Hotels &amp; Resorts. Our dedicated team
              works closely with you every step of the way, from boardroom meetings to multi-day
              conferences.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Our Commitment</p>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            At Sinclairs Hotels, we focus on creativity and luxury. Host your events with us for
            organised, innovative, and flawless experiences — set against the backdrop of the
            mountains, forests, and heritage towns where our hotels are located.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 px-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-forest/10 p-5 text-left shadow-sm transition hover:shadow-md"
            >
              <feature.icon className="h-6 w-6 stroke-current stroke-[1.6] text-gold" />
              <h3 className="mt-3 font-display text-lg text-forest">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-center font-display text-2xl text-forest">
          Meaningful Meetings and Celebrations
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-ink/70">
          There are endless reasons to celebrate, and Sinclairs offers flexible meeting venues to
          make your event memorable — be it a corporate triumph, a milestone, or an offsite that
          feels like a getaway.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {hotels.map((hotel) => (
            <VenueTable key={hotel.slug} hotel={hotel} />
          ))}
        </div>
      </section>

      <section className="border-t border-forest/10 bg-forest/5 py-12">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-center font-display text-2xl text-forest">Plan Your Event</h2>
          <p className="mt-3 text-center text-sm text-ink/70">
            Tell us about your requirements and our sales team will get back to you with venue
            options and a quote.
          </p>
          <div className="mt-8 rounded-xl bg-white p-6 shadow-xl sm:p-10">
            <EnquiryForm hotels={hotels} />
          </div>
        </div>
      </section>
    </div>
  );
}
