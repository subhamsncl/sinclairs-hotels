import type { Hotel } from '../types';

export const ootyHotel: Hotel = {
  slug: 'ooty',
  name: 'Sinclairs Ooty',
  location: 'Ooty',
  state: 'Tamil Nadu',
  tagline: 'Stunning views from the highest point in South India.',
  description:
    "Enveloped by clouds at 8,000 feet, and situated exactly where the 'Queen of the Nilgiris' was discovered, Sinclairs Ooty is the highest located resort in South India. Far away from the crowd, the resort commands a majestic view of the Ooty valley and the Blue Mountains, with pristine forests interspersed with eucalyptus trees on the other side. It is an ideal getaway to beat the heat of the plains, for honeymooners and those in search of tranquil surroundings. The resort offers rooms and suites, a multicuisine restaurant overlooking the landscaped lawns, a Spanish bar, and an entertainment area with indoor games and a fitness centre.",
  heroImage: '/images/hotels/ooty/destination/Sinclairs-Retreat-Ooty-view.jpg',
  thumbnailImage: '/images/hotels/ooty/destination/Sinclairs-Retreat-Ooty-view.jpg',
  amenities: [
    'Free Wi-Fi',
    'Health Club & Gym',
    'Coffee Shop',
    'Souvenir Shop',
    'Travel Arrangements',
    'Library',
    'Car Park',
    'Laundry',
    'Bar',
    'Viewing Gallery',
    'Car Rental & Sightseeing',
    'Beautiful Three-Level Garden',
    'Multicuisine Restaurant',
    'Tic Tac Toe Entertainment Zone',
    'Business Centre',
    'Bonfire',
    'Elevator',
    'Express Check-In/Check-Out',
    'Smoking Area',
    "Children's Playground",
    'Room Service',
    'Sightseeing Tours',
  ],
  rooms: [
    {
      name: 'Deluxe Room',
      description:
        'Overlooks pine forests interspersed with eucalyptus trees. These forest-facing rooms measure 210 sq. ft. and come with a queen-sized bed and a twin bed, a writing desk, and an attached bath with hot and cold shower.',
      images: ['/images/hotels/ooty/accommodations/Sinclairs-Ooty-Deluxe-Room.jpg'],
    },
    {
      name: 'Premier Room',
      description:
        'Offers a breathtaking view of the Blue Mountains and Ooty valley. These garden-facing rooms measure 210 sq. ft. and come with a queen-sized bed and a twin bed, a writing desk, and an attached bath with hot and cold shower.',
      images: ['/images/hotels/ooty/accommodations/Sinclairs-Ooty-Premier-Room.jpg'],
    },
    {
      name: 'Superior Room',
      description:
        'Cozy and quiet, the superior rooms overlook the pine forests. Measuring 273 sq. ft., they come with a queen-sized bed, a writing desk, and an attached bath with hot and cold shower.',
      images: ['/images/hotels/ooty/accommodations/Sinclairs-Ooty-Superior-Room.jpg'],
    },
    {
      name: 'Deluxe Suite',
      description:
        'Spacious and luxurious, the deluxe suites overlook the Blue Mountains and the Ooty valley. Measuring 397 sq. ft., they come with a queen-sized bed, sofa seating and a dining table, and an attached four-fixture bath with hot and cold shower.',
      images: ['/images/hotels/ooty/accommodations/Sinclairs-Ooty-Deluxe-Suite.jpg'],
    },
    {
      name: 'Nilgiri Suite',
      description:
        'Popular with honeymooners, this suite provides elite comfort with spectacular views of pine forests from a private viewing veranda. Measuring 890 sq. ft., it comes with a queen-sized bed, sofa seating, a dining table, a private deck facing the forest, and an attached four-fixture bath with hot and cold running water.',
      images: ['/images/hotels/ooty/accommodations/Sinclairs-Ooty-Nilgiri-Suite.jpg'],
    },
  ],
  dining: [
    {
      name: "Pine n' Petals",
      description:
        'Located on the lobby level of the hotel, this multicuisine restaurant offers a varied selection for breakfast, lunch and dinner in a cozy ambience with family-friendly, warm service. Open 7:30 AM to 10:30 PM.',
    },
    {
      name: 'Alto Espirito',
      description:
        'A stylish Spanish bar with catchy Spanish tunes, delectable Spanish snacks and dapper cocktails. Open 11 AM to 10:30 PM.',
      images: ['/images/hotels/ooty/dining/Sinclairs-Ooty-Alto-Espirito-Bar.jpg'],
    },
  ],
  gallery: [
    {
      src: '/images/hotels/ooty/destination/Sinclairs-Retreat-Ooty-view.jpg',
      alt: 'Sinclairs Ooty at dusk, its terraced lawns stepping down the hillside',
    },
    {
      src: '/images/hotels/ooty/dining/Sinclairs-Ooty-Alto-Espirito-Bar.jpg',
      alt: 'Alto Espirito, the Spanish-themed bar at Sinclairs Ooty',
    },
    {
      src: '/images/hotels/ooty/accommodations/Sinclairs-Ooty-Nilgiri-Suite.jpg',
      alt: 'The Nilgiri Suite, with its private forest-facing viewing veranda',
    },
    {
      src: '/images/hotels/ooty/accommodations/Sinclairs-Ooty-Deluxe-Suite.jpg',
      alt: 'The Deluxe Suite living area at Sinclairs Ooty',
    },
  ],
  sightseeing: [
    'Nilgiri Mountain Railway',
    "Dolphin's Nose",
    'Dodabetta',
    'Botanical Gardens',
    'Tea Factory',
    'Ooty Lake',
    'Coonoor',
    'Charing Cross',
    'Toda Villages',
    'Pykara',
    'Honey & Bee Museum',
    'Government Museum',
    'Lalit Kala Academy',
  ],
  eventSpaces: {
    totalSqFt: 3870,
    maxCapacity: 120,
    venues: [
      { name: 'The Regal Room', areaSqFt: 2200, capacity: 120 },
      { name: 'The Windsor Hall', areaSqFt: 1140, capacity: 70 },
      { name: 'The Summit Hall', areaSqFt: 530, capacity: 30 },
    ],
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Sinclairs%20Retreat%20Ooty&t=m&z=17&output=embed&iwloc=near',
  contact: {
    address: '444 Gorishola Road, Next to Tea Factory, Ooty 643001, Tamil Nadu, India',
    phone: '+91 63829 46457',
    email: 'ooty@sinclairshotels.com',
  },
};

export default ootyHotel;
