import type { Hotel } from '../types';

export const burdwanHotel: Hotel = {
  slug: 'burdwan',
  name: 'Sinclairs Burdwan',
  location: 'Burdwan',
  state: 'West Bengal',
  tagline: 'The rice bowl of India',
  description:
    'Situated at High Street 1 in Renaissance Township, Sinclairs Burdwan is an upscale tourist resort offering the finest accommodation, club and banquet facilities. Spread over four acres, the resort is a perfect getaway for families looking for a break from stressful city life. Conveniently located a two-hour drive from Kolkata airport and five minutes from Ullas Bus Stand, the resort has 19 well-appointed Premier rooms, 4 Junior suites and 1 Maharaja suite. Sinclairs Burdwan provides a pulsating environment for relaxation and a fun-filled destination for business executives.',
  heroImage: '/images/hotels/burdwan/destination/Sinclairs-Burdwan-with-Pool-view.jpg',
  thumbnailImage: '/images/hotels/burdwan/destination/Sinclairs-Burdwan-with-Pool-view.jpg',
  amenities: [
    'Multicuisine Restaurant',
    'Doctor by Appointment',
    'Laundry Service',
    'Airport/Railway Transfers',
    'Free Wi-Fi',
    'Lounge Bar',
    'Sightseeing Tours',
    'Elevator',
    'Gym and Yoga',
    'Car Parking',
    'Open Air Terrace',
    'In-house Generator',
    'Room Service',
    'Lawn and Open Air Garden Cafe',
    'Business Centre',
    'Car Hire',
    'Smoking Area',
    "Outdoor Swimming Pool with Children's Wading Area",
    'Playzone with Table Tennis, Carrom, Chess and Ludo',
    'Library',
  ],
  rooms: [
    {
      name: 'Premier Room',
      description:
        'A twin bedroom with an ensuite bathroom and shower. The twin beds are of a larger than normal size for greater comfort, and the room comes with direct dial telephones, mini bar, tea and coffee maker, satellite television, electronic safe and in-room dining.',
      image: '/images/hotels/burdwan/accommodations/Sinclairs-Burdwan-Premier-Room.jpg',
    },
    {
      name: 'Junior Suite',
      description:
        'A spacious air-conditioned bedroom with a large bed and an attached toilet, along with a spacious seating lounge with TV. Rooms feature direct dial telephones, tea and coffee maker, satellite television, electronic safe and in-room dining.',
      image: '/images/hotels/burdwan/accommodations/Sinclairs-Burdwan-Junior-Suite.jpg',
    },
    {
      name: 'Maharaja Suite',
      description:
        'The suite has a bedroom and a living room, each with an ensuite bathroom and shower. The decor recreates the ornate lifestyle of the erstwhile maharajas, complemented by direct dial telephones, mini bar, tea and coffee maker, satellite television, electronic safe and in-room dining.',
      image: '/images/hotels/burdwan/accommodations/Sinclairs-Burdwan-Maharaja-Suite.jpg',
    },
  ],
  dining: [
    {
      name: 'The Palm Terrace',
      description:
        "the resort's all-day multicuisine restaurant serving breakfast, lunch and dinner with views of the poolside and gardens, plus a bar stocked with premium drinks.",
      image: '/images/hotels/burdwan/dining/Sinclairs-Burdwan-The-Palm-Terrace-Restaurant.jpg',
    },
    {
      name: 'O3 Lounge Bar',
      description:
        'a stylish lounge bar with colourful interiors and chic design, offering alcoholic and non-alcoholic beverages and cocktails, ideal for unwinding over drinks and snacks (opening shortly).',
      image: '/images/hotels/burdwan/dining/Sinclairs-Burdwan-O3-Lounge-Bar.jpg',
    },
  ],
  gallery: [
    {
      src: '/images/hotels/burdwan/destination/Sinclairs-Burdwan-with-Pool-view.jpg',
      alt: 'Sinclairs Burdwan resort building with outdoor swimming pool view',
    },
    {
      src: '/images/hotels/burdwan/gallery/Meetings-and-Events-at-Burdwan.webp',
      alt: 'Meetings and events venue set up at Sinclairs Burdwan',
    },
    {
      src: '/images/hotels/burdwan/dining/Sinclairs-Burdwan-The-Palm-Terrace-Restaurant.jpg',
      alt: 'The Palm Terrace multicuisine restaurant at Sinclairs Burdwan',
    },
    {
      src: '/images/hotels/burdwan/dining/Sinclairs-Burdwan-O3-Lounge-Bar.jpg',
      alt: 'O3 Lounge Bar seating and decor at Sinclairs Burdwan',
    },
  ],
  sightseeing: [
    'Curzon Gate (Vijay Toran)',
    '108 Shiva Mandir',
    'Sarvamangala Mandir',
    'Pir Baharam',
    'Meghnad Saha Planetarium',
    'Burdwan Science Centre',
    'Town Hall',
    'Krishnasayar Ecological Park',
    'Golapbag',
    'Deer Park',
    'Kankaleshwari Kali Mandir',
    'Kalna Raj Bari',
    'Santiniketan',
    'Bishnupur',
    'Bhalkimachan',
  ],
  eventSpaces: {
    totalSqFt: 4790,
    maxCapacity: 350,
    venues: [
      { name: 'Crystal Room', areaSqFt: 520, capacity: 45 },
      { name: 'Regal Room', areaSqFt: 3280, capacity: 350 },
      { name: 'Saffron Hall', areaSqFt: 990, capacity: 50 },
    ],
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Sinclairs%20Burdwan&t=m&z=17&output=embed&iwloc=near',
  contact: {
    address: 'High Street 1, Renaissance Township, NH-2, Burdwan 713102, West Bengal, India',
    phone: '+91 83730 71037',
    email: 'reservations@sinclairshotels.com',
  },
};

export default burdwanHotel;
