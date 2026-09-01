import { EnquiryForm } from '@/components/enquiry-form';
import { hotels } from '@/content/hotels';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weddings',
  description: 'Celebrate your wedding at a Sinclairs property, from the mountains to the coast.',
};

export default function WeddingsPage() {
  return (
    <div>
      <section className="bg-forest py-20 text-cream">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-light">Celebrations</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">Weddings at Sinclairs</h1>
          <p className="mt-6 text-base leading-relaxed text-cream/85">
            Celebrate your wedding at one of our properties — from misty hill stations to heritage
            towns and coastal retreats. Our teams work closely with you to plan a celebration that
            reflects your style, with dedicated spaces for ceremonies, receptions, and everything in
            between.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-16">
        <h2 className="text-center font-display text-2xl text-forest">Start Planning</h2>
        <p className="mt-3 text-center text-sm text-ink/70">
          Share your wedding dates, guest count, and preferred property, and our events team will
          reach out with options.
        </p>
        <div className="mt-8">
          <EnquiryForm hotels={hotels} />
        </div>
      </section>
    </div>
  );
}
