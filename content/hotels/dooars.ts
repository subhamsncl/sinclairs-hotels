import type { Hotel } from '../types';

export const dooarsHotel: Hotel = {
  slug: 'dooars',
  name: 'Sinclairs Retreat Dooars',
  location: 'Chalsa, Dooars',
  state: 'West Bengal',
  tagline: 'Come and live with nature.',
  description:
    'Sinclairs Retreat Dooars sits on 20 acres of verdant green at Chalsa Hilltop, and is regarded as one of the finest resorts in North Bengal. Built in complete harmony with nature, it is ideal for those seeking rest, rejuvenation and adventure. The resort features 66 rooms, 3 suites and 2 wooden cottage accommodations with a rustic feel, each opening onto a private balcony overlooking the greens. Its versatile indoor and outdoor spaces, embraced by nature, make it equally suited to family holidays, banqueting, conferencing and destination weddings.',
  heroImage: '/images/hotels/dooars/Sinclairs-Retreat-Dooars-Greenery.jpg',
  thumbnailImage: '/images/hotels/dooars/Sinclairs-Retreat-Dooars-Greenery.jpg',
  amenities: [
    'Free Wi-Fi',
    "Outdoor swimming pool with children's wading pool",
    "Children's park",
    'Library',
    'Thematic bar',
    'Café',
    'Cycling track (cycles on hire)',
    'Bonfire',
    'Car park & valet service',
    'Business centre',
    'Laundry',
    'Airport/railway transfers',
    'Indoor games and table tennis',
    'Badminton, croquet, cricket/football, frisbee',
    'Barbeques',
    'Large gardens for receptions and parties',
    'Organic farm',
  ],
  rooms: [
    {
      name: 'Deluxe Room',
      description:
        'Functional and contemporary, these rooms offer the ultimate in luxurious seclusion with a view of the main lawns. Room size 345 sq. ft., with an attached bath with hot and cold shower, herbal bathroom amenities, a queen or twin bed, writing desk, private balcony, electronic safe and tea/coffee set.',
      image: '/images/hotels/dooars/Sinclairs-Retreat-Dooars-Greenery.jpg',
    },
    {
      name: 'Premier Suite',
      description:
        'Spaciously created with a bedroom, living room, dining area and additional washroom, this suite has a distinct style recreating the atmosphere of the colonial lifestyle. Room size 690 sq. ft. plus balcony, with two baths with bathtub and rain shower, a king size bed, a separate living room with dining table, a private garden with sit-out, two 32" LCD televisions, electronic safe, tea/coffee set and refrigerator.',
      image: '/images/hotels/dooars/Sinclairs-Retreat-Dooars-Greenery.jpg',
    },
  ],
  dining: [
    {
      name: 'The Palm Terrace',
      description:
        "the resort's multicuisine restaurant, serving Indian, Chinese, Continental and regional dishes made from fresh, home-grown fare, with views over the Gorumara valley (7 AM to 11 PM).",
    },
    {
      name: 'Thematic Bar',
      description: 'overlooks the Gorumara sanctuary, ideal for unwinding in the evening.',
    },
    {
      name: 'Café',
      description: 'an epicurean delight for casual bites through the day.',
    },
  ],
  gallery: [
    {
      src: '/images/hotels/dooars/Sinclairs-Retreat-Dooars-Greenery.jpg',
      alt: 'Manicured lawns, garden bench and tree canopy across the resort grounds at Sinclairs Retreat Dooars',
    },
    {
      src: '/images/hotels/dooars/DooarsPackage6-6.webp',
      alt: 'Forest canopy along a nature trail near the resort at Chalsa, Dooars',
    },
  ],
  sightseeing: [
    'Chapramari Wildlife Park (1 km)',
    'Gorumara National Park (14 km)',
    'Samsing (15 km)',
    'Suntalekhola (20 km)',
    'Neora Valley National Park (58 km)',
    'Jaldapara Wildlife Sanctuary (82 km)',
    'Phuntsholing (103 km)',
    'Lava – Lolaygaon (100 km)',
    'Buxa Tiger Reserve (104 km)',
    'Alipurduar (112 km)',
  ],
  eventSpaces: {
    totalSqFt: 8995,
    maxCapacity: 500,
    venues: [
      { name: 'The Iris', areaSqFt: 5000, capacity: 500 },
      { name: 'The Hibiscus', areaSqFt: 1560, capacity: 110 },
      { name: 'The Carnation', areaSqFt: 1190, capacity: 90 },
      { name: 'The Jasmine', areaSqFt: 525, capacity: 30 },
      { name: 'The Lilac', areaSqFt: 720, capacity: 45 },
    ],
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Sinclairs%20Retreat%20Dooars&t=m&z=17&output=embed&iwloc=near',
};

export default dooarsHotel;
