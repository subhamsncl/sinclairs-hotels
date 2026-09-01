import { hotels } from '@/content/hotels';
import { siteConfig } from '@/content/site';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-forest-dark text-cream/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <p className="font-display text-lg text-cream">Sinclairs</p>
          <p className="mt-3 text-sm leading-relaxed">{siteConfig.description}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-gold-light">Our Hotels</p>
          <ul className="mt-4 space-y-2 text-sm">
            {hotels.map((hotel) => (
              <li key={hotel.slug}>
                <Link href={`/hotels/${hotel.slug}`} className="hover:text-gold-light">
                  {hotel.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-gold-light">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/meetings-events" className="hover:text-gold-light">
                Meetings &amp; Events
              </Link>
            </li>
            <li>
              <Link href="/weddings" className="hover:text-gold-light">
                Weddings
              </Link>
            </li>
            <li>
              <Link href="/enquiry" className="hover:text-gold-light">
                Enquire Now
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold-light">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-gold-light">Stay Connected</p>
          <p className="mt-4 text-sm">
            For reservations, always book through this official website or by calling our central
            reservations team directly.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10 px-6 py-6 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
