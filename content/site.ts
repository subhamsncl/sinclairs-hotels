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
