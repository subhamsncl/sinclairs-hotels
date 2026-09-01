import { EnquiryForm } from '@/components/enquiry-form';
import { hotels } from '@/content/hotels';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enquire Now',
  description: 'Send us your travel dates and requirements and our team will get back to you.',
};

export default async function EnquiryPage({
  searchParams,
}: {
  searchParams: Promise<{
    property?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
}) {
  const { property, checkIn, checkOut, guests } = await searchParams;

  return (
    <div className="bg-forest/5 py-16">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Get In Touch</p>
          <h1 className="mt-4 font-display text-4xl text-forest">Enquire Now</h1>
          <p className="mt-4 text-sm text-ink/70">
            Share your travel dates and requirements, and our reservations team will be in touch.
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-xl sm:p-10">
          <EnquiryForm
            hotels={hotels}
            defaultProperty={property}
            defaultCheckIn={checkIn}
            defaultCheckOut={checkOut}
            defaultGuests={guests}
          />
        </div>
      </div>
    </div>
  );
}
