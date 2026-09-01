import type { Hotel } from '../types';

export const portBlairHotel: Hotel = {
  slug: 'port-blair',
  name: 'Sinclairs Bayview',
  location: 'Port Blair',
  state: 'Andaman and Nicobar Islands',
  tagline: 'A quiet getaway for those who want to unwind and explore the Andamans.',
  description:
    "Located right on the waterfront, Sinclairs Bayview is Port Blair's only hotel to offer spectacular views of the Bay of Bengal from almost all its rooms. Refreshingly environment-friendly and functionally decorated, it is a quiet getaway for those who want to unwind and explore the Andamans, just 15 minutes from the airport and the town's shopping centre. The hotel's 46 rooms and suites are virtually on the sea, opening onto the crystal-blue waters of the Indian Ocean, with the Valentine rooms offering views of the ocean on one side and Ross Island on the other. A rare relic from World War II — a bunker built by the Japanese, its cannon still in place — remains within the hotel grounds.",
  heroImage: '/images/hotels/port-blair/Sinclairs-bayview-Port-Blair-Sea-view.jpg',
  thumbnailImage: '/images/hotels/port-blair/Sinclairs-bayview-Port-Blair-Sea-view.jpg',
  amenities: [
    'Multicuisine Restaurant',
    'Doctor by Appointment',
    'Pool Table',
    'Airport/Railway Transfers',
    'Sea Deck',
    'Free Car Parking',
    'Special Candlelight Dinners',
    'Special Excursions and Water Sports',
    'Bar',
    'Laundry',
    'Wi-Fi in All Rooms',
    'Seaside Lawn',
    'Barbeques',
    'Car Hire',
    'Elevator',
    'Express Check-in/Check-out',
    'Luggage Storage',
    'Room Service',
    'Smoking Area',
    'Valet Parking',
    'Sightseeing Tours',
    'Swimming Pool',
  ],
  rooms: [
    {
      name: 'Premier Room',
      description:
        'The all new Premier room affords a stunning view of the sea. Tastefully furnished, the rooms have all that makes luxury accommodation.',
      image: '/images/hotels/port-blair/Sinclairs-bayview-Port-Blair-Sea-view.jpg',
    },
    {
      name: 'The Valentine Room',
      description:
        'The Andaman Islands are a paradise for honeymooners. These corner rooms offer privacy and an unbelievable view of the sea from two sides, furnished to ensure that the newly wed spend time in a romantic setting.',
      image: '/images/hotels/port-blair/Sinclairs-bayview-Port-Blair-Sea-view.jpg',
    },
    {
      name: 'Premier Family Room',
      description:
        'A spacious room where a family of four can spend their vacation together in great comfort, equipped with one king and one queen size bed. The attached three-fixture toilet is ideal for the family.',
      image: '/images/hotels/port-blair/Sinclairs-bayview-Port-Blair-Sea-view.jpg',
    },
    {
      name: 'Premier Family Suite',
      description:
        'The family suite combines the luxury of space and fine décor. With an arresting view of the sea, the spacious suite enables the family to stay together in comfort and style, with an attached three-fixture toilet.',
      image: '/images/hotels/port-blair/Sinclairs-bayview-Port-Blair-Sea-view.jpg',
    },
    {
      name: 'Premier Family Attic Room',
      description:
        'A family room with an attic where children can have good fun. With two queen size beds, the room is ideal for a family of four to stay together comfortably, with an attached three-fixture toilet.',
      image: '/images/hotels/port-blair/Sinclairs-bayview-Port-Blair-Sea-view.jpg',
    },
    {
      name: 'Premier Family Suite with Attic',
      description:
        'A spacious, elegant and functional suite where you can relax to the sound of the waves below. The wooden attic is perfect for children travelling with the family, giving them their own private space.',
      image: '/images/hotels/port-blair/Sinclairs-bayview-Port-Blair-Sea-view.jpg',
    },
  ],
  dining: [
    {
      name: 'The Bayview',
      description:
        "the hotel's sea-facing multicuisine restaurant, with an open view of the garden surrounded by palm trees.",
    },
    {
      name: 'Alto Espirito',
      description: 'a bar with a relaxed old-world ambience, offering snacks and drinks.',
    },
    {
      name: 'The Terrace',
      description:
        'a covered sea-facing deck where meals can be served on request, with the sea breeze and the sound of waves.',
    },
  ],
  gallery: [
    {
      src: '/images/hotels/port-blair/Sinclairs-bayview-Port-Blair-Sea-view.jpg',
      alt: 'Sea view from Sinclairs Bayview, Port Blair',
    },
  ],
  sightseeing: [
    'Cellular Jail',
    'Marine Samudrika Museum',
    "Corbyn's Cove",
    'Chidiya Tapu',
    'Andaman Water Sport Complex',
    'Havelock Island',
    'Jolly Buoy Island',
    'North Bay Island',
    'Viper Island',
  ],
};

export default portBlairHotel;
