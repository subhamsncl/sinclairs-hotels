import { EnquiryForm } from '@/components/enquiry-form';
import { hotels } from '@/content/hotels';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meetings & Events',
  description: 'Host your next business gathering or conference at a Sinclairs property.',
};

export default function MeetingsEventsPage() {
  return (
    <div>
      <section className="bg-forest py-20 text-cream">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-light">
            Business &amp; Events
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">Meetings &amp; Events</h1>
          <p className="mt-6 text-base leading-relaxed text-cream/85">
            From boardroom meetings to multi-day conferences, our properties offer dedicated spaces
            and attentive service to help your event run smoothly — set against the backdrop of the
            mountains, forests, and heritage towns where our hotels are located.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <h2 className="text-center font-display text-2xl text-forest">Plan Your Event</h2>
        <p className="mt-3 text-center text-sm text-ink/70">
          Tell us about your requirements and our sales team will get back to you with venue options
          and a quote.
        </p>
        <div className="mt-8">
          <EnquiryForm hotels={hotels} />
        </div>
      </section>
    </div>
  );
}
