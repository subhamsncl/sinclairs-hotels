import type { Hotel } from '../types';

export const gangtokHotel: Hotel = {
  slug: 'gangtok',
  name: 'Sinclairs Gangtok',
  location: 'Gangtok',
  state: 'Sikkim',
  tagline: 'The paradise of the Northeast',
  description:
    "Strategically located at the Cherry complex in the Zero Point development area, less than a kilometre from M G Marg, Sinclairs Gangtok offers a spectacular view of the entire town against the backdrop of the Kanchenjunga range. The cozy boutique hotel has 60 rooms, including four large suites, four family rooms and four Valentine Rooms ideal for honeymooners, with the majority of rooms overlooking the alluring Himalayan range. Guests can relish authentic and international cuisine at the multi-cuisine restaurant Magnolia, unwind with a drink at the Guras Bar & Lounge, or relax by the infinity swimming pool with its adjoining kids' pool.",
  heroImage: '/images/hotels/gangtok/Sinclairs-Gangtok-with-Pool.jpg',
  thumbnailImage: '/images/hotels/gangtok/Sinclairs-Gangtok-with-Pool.jpg',
  amenities: [
    'Multicuisine restaurant',
    '24-hour front desk',
    'Doctor on call by appointment',
    'Laundry service',
    'In-house generator',
    'Transfers to NJP/Bagdogra airport',
    'Bar & Lounge',
    "Outdoor swimming pool with separate kids' pool",
    'Indoor games',
    'Smoking area',
    'Free Wi-Fi',
    'Sightseeing tours',
    'Free car parking',
    'Online check-in and express check-out',
    'Elevator',
    'Left luggage storage',
    'Room service',
    'Conference and banquet halls (The Cherry Hall and Jasmine)',
  ],
  rooms: [
    {
      name: 'Deluxe Room',
      description:
        'The well-appointed rooms in wood finish are spacious and comfortable, blending well with the intimate and tranquil atmosphere of the hotel. Rooms overlook the forest or road side and feature a king-size bed or two twin beds, at 335 sq. ft.',
      image: '/images/hotels/gangtok/Sinclairs-Gangtok-with-Pool.jpg',
    },
    {
      name: 'Deluxe Family Room',
      description:
        'The ideal solution for privacy while keeping family members close in complete comfort and style, the Family Room consists of two adjoining double rooms with two toilets, together spanning 554 sq. ft.',
      image: '/images/hotels/gangtok/Sinclairs-Gangtok-with-Pool.jpg',
    },
    {
      name: 'Premier Room',
      description:
        'These well-appointed rooms face the mountain range and Gangtok town, offering a relaxed stay for couples, with a private standing balcony affording a panoramic view of the town against the mountains. Some rooms have a triple bed, ideal for an extra adult, at 340 sq. ft.',
      image: '/images/hotels/gangtok/Sinclairs-Gangtok-with-Pool.jpg',
    },
    {
      name: 'Premier Suite',
      description:
        'This spacious 535 sq. ft. suite has a bedroom and a separate living room with sofa seating, wooden floors and rich furnishings that reflect the typical hill style of the hotel, along with a private balcony facing the valley.',
      image: '/images/hotels/gangtok/Sinclairs-Gangtok-with-Pool.jpg',
    },
    {
      name: 'Valentine Room',
      description:
        'Specially designed for honeymooners and couples celebrating an anniversary, the alluring view, mood lighting and special accessories all add up to a romantic setting, complete with a complimentary platter of goodies, at 340 sq. ft.',
      image: '/images/hotels/gangtok/Sinclairs-Gangtok-with-Pool.jpg',
    },
  ],
  dining: [
    {
      name: 'Magnolia',
      description:
        "the hotel's multi-cuisine restaurant, a floor above the lobby, serving a daily fresh selection of Indian, Continental and Oriental dishes for breakfast, lunch and dinner (7 AM–11 PM); special Jain preparations available.",
    },
    {
      name: 'Guras Bar & Lounge',
      description:
        "a spacious bar named for Sikkim's Rhododendron trees, with an orchestra deck and private seating area offering panoramic views of Gangtok against the Kanchenjunga range, serving whisky, lager and craft cocktails with chef-inspired snacks (11 AM–11 PM).",
    },
  ],
  gallery: [
    {
      src: '/images/hotels/gangtok/Sinclairs-Gangtok-with-Pool.jpg',
      alt: 'Sinclairs Gangtok exterior with the outdoor swimming pool',
    },
  ],
  sightseeing: [
    'Tashi View Point',
    'Hanuman Tok',
    'Ganesh Tok',
    'Flower Exhibition Centre',
    'Cottage Industry and Handicraft Centre',
    'Namgyal Institute of Tibetology',
    'Do-drul Chorten',
    'Rumtek Monastery',
    'Banjhakri Falls',
    'Seven Sister Water Falls',
    'Himalayan Zoological Park',
    'Tsomgo Lake',
    'Baba Mandir',
    'Nathula Pass',
    'Lachung',
    'Yumthang Valley',
    'Ravangla',
    'Pelling',
    'Pemayangtse Monastery',
  ],
  eventSpaces: {
    totalSqFt: 4728,
    maxCapacity: 110,
    venues: [
      { name: 'The Cherry Hall (Lower)', areaSqFt: 2240, capacity: 110 },
      { name: 'The Cherry Hall (Upper)', areaSqFt: 1468, capacity: 80 },
      { name: 'Jasmine Hall', areaSqFt: 510, capacity: 30 },
    ],
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Sinclairs%20Gangtok&t=m&z=17&output=embed&iwloc=near',
  contact: {
    address: 'Cherry Residency Complex, Zero Point, PO Rajbhawan, Gangtok 737101, Sikkim, India',
    phone: '+91 70032 07937',
    email: 'gangtok@sinclairshotels.com',
  },
};

export default gangtokHotel;
