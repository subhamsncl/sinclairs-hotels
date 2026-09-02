import { hotels } from '@/content/hotels';
import { siteConfig } from '@/content/site';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-forest-dark text-cream/80">
      <div className="mx-auto max-w-7xl px-6 pt-16">
        <div className="grid gap-10 pb-16 md:grid-cols-4">
          <div className="min-w-0">
            <img src="/logo.svg" alt="Sinclairs" className="h-10 w-auto" />
            <p className="mt-4 text-sm leading-relaxed">{siteConfig.description}</p>
          </div>

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-gold-light">Our Hotels</p>
            <ul className="mt-4 space-y-2 text-sm">
              {hotels.map((hotel) => (
                <li key={hotel.slug}>
                  <Link
                    href={`/hotels/${hotel.slug}`}
                    className="transition hover:text-gold-light hover:underline hover:underline-offset-4"
                  >
                    {hotel.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-gold-light">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/meetings-events"
                  className="transition hover:text-gold-light hover:underline hover:underline-offset-4"
                >
                  Meetings &amp; Events
                </Link>
              </li>
              <li>
                <Link
                  href="/weddings"
                  className="transition hover:text-gold-light hover:underline hover:underline-offset-4"
                >
                  Weddings
                </Link>
              </li>
              <li>
                <Link
                  href="/enquiry"
                  className="transition hover:text-gold-light hover:underline hover:underline-offset-4"
                >
                  Enquire Now
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-gold-light hover:underline hover:underline-offset-4"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-gold-light">Reservations</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs text-cream/50">Toll Free</dt>
                <dd className="mt-0.5">
                  <a href="tel:1800120267000" className="transition hover:text-gold-light">
                    1800 120 267 000
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-cream/50">Email</dt>
                <dd className="mt-0.5">
                  <a
                    href="mailto:reservations@sinclairshotels.com"
                    className="break-words transition hover:text-gold-light"
                  >
                    reservations@sinclairshotels.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-cream/50">WhatsApp</dt>
                <dd className="mt-0.5">
                  <a
                    href="https://wa.me/919257108784"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-gold-light"
                  >
                    +91 92571 08784
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-6 text-center text-xs text-cream/50 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Always book through this official website for the best available rate.</p>
        </div>
      </div>
    </footer>
  );
}
