import type { Hotel } from '../types';

export const kalimpongHotel: Hotel = {
  slug: 'kalimpong',
  name: 'Sinclairs Retreat Kalimpong',
  location: 'Kalimpong',
  state: 'West Bengal',
  tagline: 'An ideal retreat for those in search of a restful nature experience.',
  description:
    'Nestled in virgin green surroundings, Sinclairs Retreat Kalimpong stands out over five acres of aesthetically landscaped grounds, with an unmatched view of the Himalayan mountain range and a luxuriant forested valley. This cozy boutique resort has 44 rooms, two large suites and two rooms in a wooden cottage, all with a view of the alluring Himalayan range. Guests can enjoy local fare and international favourites at the all-day dining venue The Golden Oak, sip a drink at the thematic bar, or relax by the swimming pool and rejuvenate at the spa.',
  heroImage: '/images/hotels/kalimpong/Sinclairs-Retreat-Kalimpong-Night-View.jpg',
  thumbnailImage: '/images/hotels/kalimpong/Sinclairs-Retreat-Kalimpong-Night-View.jpg',
  amenities: [
    'Multicuisine Restaurant',
    '24 hrs front desk (staffed)',
    'Bar',
    'Coffee Shop',
    'Gymnasium',
    'Spa',
    'Outdoor Swimming Pool',
    'Indoor Games Room',
    'Doctor by Appointment',
    'Laundry',
    'In-house generator',
    'Sightseeing Tours',
    'Car Parking & Valet service',
    'Garden for Reception and Parties',
    'Fire place in all rooms',
    'Wi-Fi in lobby area',
    'Airport/Railway Transfer',
    'Express Check-In/Check-Out',
    'Room Service',
    'Smoking Area',
    'Elevator',
    'Luggage Storage',
    'Kids Pool',
  ],
  rooms: [
    {
      name: 'Premier Room',
      description:
        'The richly appointed premier rooms in dark wood finish are spacious and comfortable, blending well with the intimate and tranquil atmosphere of the resort. Each room features one king size bed or two twin beds plus a day bed, and a private balcony overlooking the mountains. Room size: 420 sq. ft.',
      image: '/images/hotels/kalimpong/Sinclairs-Retreat-Kalimpong-Night-View.jpg',
    },
    {
      name: 'Premier Plus Room',
      description:
        'These charming guest rooms provide a relaxed stay for individuals or a couple, with modern amenities such as flat screen LED televisions and wireless internet, a private balcony, a fireplace and a daybed to lounge on. Room size: 460 sq. ft.',
      image: '/images/hotels/kalimpong/Sinclairs-Retreat-Kalimpong-Night-View.jpg',
    },
    {
      name: 'Premier Attic Room',
      description:
        'Similar to the premier rooms but with a spacious attic reached via a wooden staircase, ideal for families — the attic has its own king size bed and a separate wardrobe for children. Room size: 524 sq. ft.',
      image: '/images/hotels/kalimpong/Sinclairs-Retreat-Kalimpong-Night-View.jpg',
    },
    {
      name: 'Premier Suite',
      description:
        'With a view of the swimming pool and the mountains, this extravagant suite has two separate rooms — a bedroom with a king bed and a mountain-facing balcony, and a living room with a full sofa set and a four-seater dining table. Room size: 900 sq. ft.',
      image: '/images/hotels/kalimpong/Sinclairs-Retreat-Kalimpong-Night-View.jpg',
    },
    {
      name: 'Wooden Cottage Room',
      description:
        'Made entirely out of steam-treated recyclable wood, this secluded cottage has two rooms with attached baths — even the toilets, barring the shower area, are built from wood. The king size bed has a large upholstered headboard, and the room opens onto a private sit-out area overlooking the mountains, ideal for honeymooners. Room size: 284 sq. ft.',
      image: '/images/hotels/kalimpong/Sinclairs-Retreat-Kalimpong-Night-View.jpg',
    },
  ],
  dining: [
    {
      name: 'The Golden Oak',
      description:
        'All-day dining restaurant a floor below the lobby, serving daily fresh Indian, Continental and Oriental dishes for breakfast, lunch and dinner, with open-terrace seating looking out over the mountains. Timings: 12:30 PM to 3 PM | 7:30 PM to 10 PM.',
    },
    {
      name: 'Alto Espirito',
      description:
        'A debonair bar created on a Spanish theme, serving whisky, lager and artfully made cocktails alongside chef-inspired snacks and nibbles. Timings: 12 Noon to 11 PM.',
    },
    {
      name: 'The Birch',
      description:
        'A cosy coffee shop with a smart selection of coffee and breads, with the option of indoor or outdoor seating. Timings: 10 AM to 10:30 PM.',
    },
  ],
  gallery: [
    {
      src: '/images/hotels/kalimpong/Sinclairs-Retreat-Kalimpong-Night-View.jpg',
      alt: 'Night view of Sinclairs Retreat Kalimpong lit up against the hillside',
    },
    {
      src: '/images/hotels/kalimpong/Kalimpong-wedding-in-natural-settings.jpg',
      alt: "A wedding celebration set up amid the resort's natural garden surroundings",
    },
    {
      src: '/images/hotels/kalimpong/Dining-at-Kalimpong-1140x740.webp',
      alt: 'Dining setup at Sinclairs Retreat Kalimpong',
    },
  ],
  sightseeing: [
    'Durpin Dara',
    'Durpin Monastery',
    'Thongsa Gompa',
    'Flower Nurseries',
    "Dr Graham's Homes",
    'Deolo Hill',
    'Macfarlane Church',
    'Tharpa Choling Gompa',
    'Mangal Dham',
    'Army Golf Club',
    'Kalibari',
    'Central Sericulture Station',
    'Cinchona Plantation',
    'Tea Estates',
    'Dharmodaya Vihar',
    'Hanuman Mandir',
    'Chardham Trip (Namchi)',
  ],
  eventSpaces: {
    totalSqFt: 3828,
    maxCapacity: 300,
    venues: [
      { name: 'The Orchid', areaSqFt: 2700, capacity: 300 },
      { name: 'The Fern', areaSqFt: 875, capacity: 70 },
      { name: 'The Juniper', areaSqFt: 253, capacity: 10 },
    ],
  },
};

export default kalimpongHotel;
