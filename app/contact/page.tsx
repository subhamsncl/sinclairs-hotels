import { hotels } from '@/content/hotels';
import type { Metadata } from 'next';
import Link from 'next/link';

const propertyEmails: Record<string, string> = {
  burdwan: 'burdwan@sinclairshotels.com',
  darjeeling: 'darjeeling@sinclairshotels.com',
  dooars: 'dooars@sinclairshotels.com',
  gangtok: 'gangtok@sinclairshotels.com',
  kalimpong: 'kalimpong@sinclairshotels.com',
  ooty: 'ooty@sinclairshotels.com',
  'port-blair': 'portblair@sinclairshotels.com',
  siliguri: 'siliguri@sinclairshotels.com',
  udaipur: 'palace.udaipur@sinclairshotels.com',
};

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Sinclairs Hotels & Resorts reservations and sales teams.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Get In Touch</p>
        <h1 className="mt-4 font-display text-4xl text-forest">Contact Us</h1>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div className="rounded-lg border border-forest/10 bg-white p-8 shadow-sm transition hover:shadow-md">
          <h2 className="font-display text-xl text-forest">Reservations &amp; Sales</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink/50">Toll Free</dt>
              <dd className="mt-1">1800 120 267 000</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink/50">Reservations</dt>
              <dd className="mt-1">
                <a href="mailto:reservations@sinclairshotels.com" className="hover:text-gold">
                  reservations@sinclairshotels.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink/50">Sales</dt>
              <dd className="mt-1">
                <a href="mailto:sales@sinclairshotels.com" className="hover:text-gold">
                  sales@sinclairshotels.com
                </a>
              </dd>
            </div>
          </dl>
          <Link
            href="/enquiry"
            className="mt-6 inline-block rounded bg-forest px-6 py-3 text-sm uppercase tracking-wider text-cream transition hover:bg-forest-dark"
          >
            Send an Enquiry
          </Link>
        </div>

        <div className="rounded-lg border border-forest/10 bg-white p-8 shadow-sm transition hover:shadow-md">
          <h2 className="font-display text-xl text-forest">Property Contacts</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {hotels.map((hotel) => {
              const email = propertyEmails[hotel.slug];
              return (
                <li key={hotel.slug} className="flex items-baseline justify-between gap-3">
                  <span>{hotel.name}</span>
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="whitespace-nowrap text-gold hover:text-forest"
                    >
                      {email}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
