import type { Hotel } from '../types';

export const darjeelingHotel: Hotel = {
  slug: 'darjeeling',
  name: 'Sinclairs Darjeeling',
  location: 'Darjeeling',
  state: 'West Bengal',
  tagline: "Kanchenjunga, the world's third highest peak, is the reason to be here.",
  description:
    'Strategically located a few minutes from the town centre, Chowrasta, Sinclairs Darjeeling offers splendid views of Mount Kanchenjunga, unmatched by any other hotel in the region. The hotel is an exciting blend of modernity and Victorian charm, perfect for those looking to explore the hill town or relax in comfort. Sinclairs Darjeeling offers 46 rooms and suites, including a special suite for honeymooners that opens out to a private balcony with unhindered views of the Himalayan mountain range.',
  heroImage: '/images/hotels/darjeeling/Sinclairs-Darjeeling-Lobby.jpg',
  thumbnailImage: '/images/hotels/darjeeling/Sinclairs-Darjeeling-Lobby.jpg',
  amenities: [
    'Multicuisine Restaurant',
    'Doctor by Appointment',
    'Laundry',
    'In-house generator',
    'Airport/Railway Transfers',
    'Pool Table',
    'Bar',
    'Cafe',
    'Sundeck and viewing gallery',
    'Smoking Area',
    'Garden',
    'Heating',
    'Free Wi-Fi',
    'Sightseeing Tours',
    'Barbeques',
    'Business Centre',
    'Car Hire',
    'Express Check-In/Check-Out',
    'Library',
    'Luggage Storage',
    'Room Service',
    'Kids play area',
    'Indoor games room with board games, carom and table tennis',
  ],
  rooms: [
    {
      name: 'Deluxe Room',
      description:
        'Each of these cozy and well appointed rooms have ensuite washrooms, and are equipped with modern facilities. Room size: 223 sq. ft., with an attached bath with hot and cold shower.',
      image: '/images/hotels/darjeeling/rooms/deluxe-room.jpg',
    },
    {
      name: 'Premier Room',
      description:
        'Enjoy beautiful mountain views with a spectacular sunrise from these rooms overlooking the Himalayas. Room size: 223 sq. ft., with a Kanchenjunga view and an attached bath with hot and cold shower.',
      image: '/images/hotels/darjeeling/rooms/premier-room.jpg',
    },
    {
      name: 'Kanchenjunga Room',
      description:
        'This room has a stunning view of the mountains and is ideal for newly-weds. Room size: 271 sq. ft. with a Kanchenjunga view and an attached bath with hot and cold shower.',
      image: '/images/hotels/darjeeling/rooms/kanchenjunga-room.jpg',
    },
    {
      name: 'Burra Sahib Suite',
      description:
        'This spacious suite has a bedroom and a living room with wooden floors and rich furnishings which reflect the typical hill style of the hotel. Room size: 446 sq. ft. with a Kanchenjunga view and an attached bath with hot and cold shower.',
      image: '/images/hotels/darjeeling/rooms/burra-sahib-suite.jpg',
    },
    {
      name: 'Deluxe Family Room',
      description:
        'For guests with greater space requirements, this room is the ideal solution to ensure your privacy and have your family next to you in complete comfort and style. It consists of two adjoining double rooms, with the possibility of adding an extra bed in both rooms, sharing a common bathroom with separate areas for relaxing and a writing desk. Room size: 446 sq. ft.',
      image: '/images/hotels/darjeeling/rooms/deluxe-family-room.jpg',
    },
  ],
  dining: [
    'The Kanchenjunga — Overlooking a beautiful garden, this multicuisine restaurant serves delicious local, Indian or Continental cuisine customized to your preferences. Open 7 AM to 11 PM.',
    'The Dorjee Lounge — A colonial style bar with an unhindered view of the Himalayan mountain range, ideal for a game of pool or relaxing with a book. Open 11 AM to 11 PM.',
    'Mount View Café — An outdoor café serving freshly prepared snacks and a cup of hot Darjeeling tea while you take in the gorgeous mountain views. Open 10 AM to 7:30 PM.',
  ],
  gallery: [
    {
      src: '/images/hotels/darjeeling/Sinclairs-Darjeeling-Lobby.jpg',
      alt: 'Lobby at Sinclairs Darjeeling with mountain views',
    },
  ],
  sightseeing: [
    'Tiger Hill',
    'Darjeeling Himalayan Railway (Toy Train)',
    'Batasia Loop',
    'Chowrasta',
    'The Mall',
    'Lloyd Botanical Garden',
    'Ropeway',
    'Zoological Park',
    'Himalayan Mountaineering Institute',
    'Ghoom Monastery',
    'Mirik',
  ],
};

export default darjeelingHotel;
