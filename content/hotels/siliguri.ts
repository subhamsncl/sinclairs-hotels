import type { Hotel } from '../types';

export const siliguriHotel: Hotel = {
  slug: 'siliguri',
  name: 'Sinclairs Siliguri',
  location: 'Siliguri',
  state: 'West Bengal',
  tagline: 'Endless greenery with tea gardens amidst a bustling city.',
  description:
    'Situated in Pradhan Nagar, at the heart of the city, Sinclairs Siliguri is a luxury hotel equipped with modern amenities. One of the most renowned hotels in the region, it is ideal for businessmen and for tourists who want to make the best of what the city has to offer. The hotel offers rooms and suites over two levels, with guests able to dine at the multicuisine restaurant while taking in soothing views of the poolside and gardens, or unwind at the lounge bar which offers a range of premium drinks. For conferencing, multiple banquet halls and outdoor meeting facilities can accommodate up to 500 people, making Sinclairs one of the leading conference venues in Siliguri.',
  heroImage: '/images/hotels/siliguri/destination/Sinclairs-Siliguri-with-pool.jpg',
  thumbnailImage: '/images/hotels/siliguri/destination/Sinclairs-Siliguri-with-pool.jpg',
  amenities: [
    'Multicuisine Restaurant',
    'Doctor by Appointment',
    'Same Day Laundry Service',
    'Airport/Railway Transfers',
    'Outdoor Swimming Pool',
    'Free Wi-Fi',
    'Lounge Bar',
    'Sightseeing Tours',
    'Elevator',
    'Gym',
    'Car Parking & Valet Service',
    'Open Air Terrace',
    'In-house Generator',
    'Room Service',
    'Lawn and Open Air Garden Café',
    'Car Hire',
    'Smoking Area',
    'Spa',
  ],
  rooms: [
    {
      name: 'Premier Room',
      description:
        'Recently refurbished with modern comforts, the room is equipped with ensuite bathrooms and rain showers. Room size: 192 sq. ft., with herbal bathroom amenities, a rain shower, twin lighting options, an LCD TV with satellite channels, split AC system and free Wi-Fi.',
      images: ['/images/hotels/siliguri/accommodations/Sinclairs-Siliguri-Premier-Room.jpg'],
    },
    {
      name: 'Garden Suite',
      description:
        'A bedroom with ensuite bathroom and shower, attached with a small seating area and a private terrace. Room size: 290 sq. ft., with a king size bed, writing desk, attached terrace garden with sit out, LCD TV with satellite channels, tea/coffee set, safe and free Wi-Fi.',
      images: ['/images/hotels/siliguri/accommodations/Sinclairs-Siliguri-Garden-Suite.jpg'],
    },
    {
      name: 'Premier Suite',
      description:
        'The rooms are luxurious and contemporary with a spacious bedroom, living room and two ensuite bathrooms and showers. Room size: 450 sq. ft., with a king size bed, separate living room, writing desk, two 32-inch LCD televisions, tea/coffee set, safe and free Wi-Fi.',
      images: ['/images/hotels/siliguri/accommodations/Sinclairs-Siliguri-Premier-Suite.jpg'],
    },
  ],
  dining: [
    {
      name: 'The Palms',
      description:
        'Serves classic favourites in international and local cuisine, with soothing views of the poolside and gardens and a bar offering a variety of premium drinks. Multicuisine, casual dress code, open 7.30 AM to 10.30 PM.',
      image: '/images/hotels/siliguri/dining/Sinclairs-Siliguri-The-Palms-Restaurant.jpg',
    },
  ],
  gallery: [
    {
      src: '/images/hotels/siliguri/destination/Sinclairs-Siliguri-with-pool.jpg',
      alt: 'Sinclairs Siliguri exterior with outdoor swimming pool',
    },
    {
      src: '/images/hotels/siliguri/gallery/Sinclairs-Siliguri-Pool-Night-View.jpg',
      alt: 'Sinclairs Siliguri poolside and building lit up at night',
    },
    {
      src: '/images/hotels/siliguri/gallery/Sinclairs-Siliguri-Terrace-Event-Setup.jpg',
      alt: 'Open air terrace at Sinclairs Siliguri set up for an event',
    },
  ],
  sightseeing: [
    'The Kanchenjunga Stadium',
    'Kalchakra Monastery',
    'Salugara Monastery',
    'ISKCON Temple',
  ],
  eventSpaces: {
    totalSqFt: 13120,
    maxCapacity: 500,
    venues: [
      { name: 'The Darbar', areaSqFt: 2400, capacity: 220 },
      { name: 'Imperial', areaSqFt: 1750, capacity: 80 },
      { name: 'The Regacy', areaSqFt: 750, capacity: 40 },
      { name: 'The Summit', areaSqFt: 450, capacity: 18 },
      { name: 'The Emperor', areaSqFt: 270, capacity: 10 },
      { name: 'The Terrace', areaSqFt: 7500, capacity: 500 },
    ],
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Sinclairs%20Siliguri&t=m&z=17&output=embed&iwloc=near',
  contact: {
    address: 'P.O. Pradhan Nagar, Siliguri 734003, West Bengal, India',
    phone: '+91 97334 62777',
    email: 'siliguri@sinclairshotels.com',
  },
};

export default siliguriHotel;
