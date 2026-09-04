import type { BookingOffice } from './types';

export const siteConfig = {
  name: 'Sinclairs Hotels & Resorts',
  shortName: 'Sinclairs',
  description:
    'A collection of hotels and resorts across India, designed for the value traveller — affordable comfort without compromising on cleanliness, service, or character.',
  url: 'https://www.sinclairshotels.com',
};

// Staah runs reservations end-to-end; every "Book Now" / availability CTA sends
// guests there instead of handling booking on this site.
export const reservationUrl =
  'https://reservation.sinclairshotels.com/inst/#group?groupId=882Mjkbac8S7wLYqvHyxVFGKNMfaaeRV5yNO8NFk4hB5fg15ZQ3NDc=&JDRN=Y';

export const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/sinclairshotelsandresorts/' },
  { label: 'Instagram', href: 'https://www.instagram.com/sinclairshotelsandresorts/' },
  { label: 'Twitter', href: 'https://www.twitter.com/sinclairshotels' },
] as const;

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Hotels', href: '/hotels' },
  { label: 'Meetings', href: '/meetings-events' },
  { label: 'Weddings', href: '/weddings' },
  { label: 'Enquire Now', href: '/enquiry' },
  { label: 'Contact', href: '/contact' },
] as const;

// The legacy voucher tool's full booking-office directory (per-office address/GSTIN)
// lived in a database table this migration hasn't pulled yet — only the head office,
// using contact details already verified elsewhere in this repo (components/footer.tsx),
// is listed here for now. Add real offices as that data is retrieved.
export const bookingOffices: BookingOffice[] = [
  {
    name: 'Sinclairs Hotels — Head Office',
    city: 'Kolkata',
    phone: '1800 120 267 000',
    email: 'reservations@sinclairshotels.com',
  },
];
