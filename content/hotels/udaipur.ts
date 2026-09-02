import type { Hotel } from '../types';

export const udaipurHotel: Hotel = {
  slug: 'udaipur',
  name: 'Sinclairs Palace Retreat Udaipur',
  location: 'Haldighati, Udaipur',
  state: 'Rajasthan',
  tagline: 'Experience the grandeur and elegance of a bygone royal era.',
  description:
    "Experience the grandeur and elegance of a bygone royal era at Sinclairs Palace Retreat, a palace hotel set in the heart of Haldighati, an hour's drive from Udaipur city. The 95-room hotel blends rich history with modern opulence, offering guests a royal retreat with impeccable service and panoramic views of the surrounding landscapes. The palace exudes luxury and grandeur, making it an ideal venue for an extravagant wedding, social gathering, or royal conference.",
  heroImage: '/images/hotels/udaipur/destination/Sinclairs-Palace-Retreat-Udaipur-Night-View.jpg',
  thumbnailImage:
    '/images/hotels/udaipur/destination/Sinclairs-Palace-Retreat-Udaipur-Day-View.jpg',
  amenities: [
    'Intercom',
    'Tea/Coffee Maker',
    'Work Desk',
    'Mini Bar',
    'Television',
    'Ceiling Fan',
    'Air Conditioning',
  ],
  rooms: [
    {
      name: 'Premier Room',
      description:
        'Step into comfort and elegance in our Premier Room, designed to blend traditional Rajasthani charm with modern amenities. Enjoy spacious interiors, plush bedding, and thoughtful touches that create a relaxing retreat after a day exploring Haldighati. Room size: 334 sq. ft., with an attached bath with hot and cold shower, king-size bed, in-room dining, and mini fridge.',
      image:
        '/images/hotels/udaipur/accommodations/Sinclairs-Palace-Retreat-Udaipur-Premier-Room.jpg',
    },
    {
      name: 'Premier Plus Room',
      description:
        'The Premier Plus Room offers an enhanced experience with added space and premium furnishings. Bask in tasteful decor inspired by local heritage, complemented by upgraded amenities for a truly memorable stay. Room size: 363 sq. ft., with an attached bath with hot and cold shower, king-size bed, in-room dining, and mini fridge.',
      image:
        '/images/hotels/udaipur/accommodations/Sinclairs-Palace-Retreat-Udaipur-Premier-Plus-Room.jpg',
    },
    {
      name: 'Premier Suite',
      description:
        "Our Premier Suite elevates luxury with separate living and sleeping areas, perfect for families or guests seeking extra comfort. Revel in exquisite interiors, rich textures, and panoramic views that capture the spirit of Udaipur's royal legacy. Room size: 457 sq. ft., with an attached bath with hot and cold shower, king-size bed, in-room dining, and mini fridge.",
      image:
        '/images/hotels/udaipur/accommodations/Sinclairs-Palace-Retreat-Udaipur-Premier-Suite.jpg',
    },
    {
      name: 'Villa',
      description:
        'Experience the pinnacle of opulence in our Villa, a private haven featuring expansive living spaces, elegant decor, and exclusive amenities. Ideal for discerning guests, the villa offers unparalleled privacy along with the warmth of traditional Rajasthani hospitality. Room size: 400 sq. ft., with an attached bath with hot and cold shower, a large wardrobe and luggage rack, queen-size bed, in-room dining, and mini fridge.',
      image: '/images/hotels/udaipur/accommodations/Sinclairs-Palace-Retreat-Udaipur-Villa.jpg',
    },
  ],
  dining: [
    {
      name: 'The Gharana',
      description:
        'a vegetarian, multicuisine restaurant serving a daily fresh selection of Indian and local specialties for breakfast, lunch, and dinner (7 AM to 11 PM, casual dress code)',
      image:
        '/images/hotels/udaipur/dining/Sinclairs-Palace-Retreat-Udaipur-The-Gharana-Restaurant.jpg',
    },
  ],
  gallery: [
    {
      src: '/images/hotels/udaipur/destination/Sinclairs-Palace-Retreat-Udaipur-Night-View.jpg',
      alt: 'Night view of Sinclairs Palace Retreat Udaipur',
    },
    {
      src: '/images/hotels/udaipur/gallery/Sinclairs-Palace-Retreat-Udaipur-Reception.jpg',
      alt: 'Reception at Sinclairs Palace Retreat Udaipur',
    },
    {
      src: '/images/hotels/udaipur/gallery/Sinclairs-Palace-Retreat-Udaipur-Swimming-Pool.jpg',
      alt: 'Outdoor swimming pool at Sinclairs Palace Retreat Udaipur',
    },
    {
      src: '/images/hotels/udaipur/gallery/Sinclairs-Palace-Retreat-Udaipur-Rajmahal-Banquet-Hall.jpg',
      alt: 'Rajmahal banquet hall set for a wedding at Sinclairs Palace Retreat Udaipur',
    },
  ],
  sightseeing: [
    'Haldighati Museum',
    'Chetak Samadhi',
    'Rakt Talai',
    'Nathdwara Shrinathji Temple',
    'Eklingji Temple',
    'Kumbhalgarh Fort',
    'City Palace Udaipur',
    'Lake Pichola',
    'Fateh Sagar Lake',
    'Saheliyon Ki Bari',
  ],
  eventSpaces: {
    totalSqFt: 7000,
    maxCapacity: 700,
    venues: [{ name: 'Rajmahal', areaSqFt: 7000, capacity: 700 }],
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Sinclairs%20Palace%20Retreat%20Udaipur&t=m&z=17&output=embed&iwloc=near',
  contact: {
    address: 'Karanji Ka Guda, District Udaipur 313322, Rajasthan, India',
    phone: '+91 90075 40727',
    email: 'palace.udaipur@sinclairshotels.com',
  },
};

export default udaipurHotel;
