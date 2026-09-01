import type { Hotel } from '../types';
import burdwanHotel from './burdwan';
import darjeelingHotel from './darjeeling';
import dooarsHotel from './dooars';
import gangtokHotel from './gangtok';
import kalimpongHotel from './kalimpong';
import ootyHotel from './ooty';
import portBlairHotel from './port-blair';
import siliguriHotel from './siliguri';
import udaipurHotel from './udaipur';

export const hotels: Hotel[] = [
  burdwanHotel,
  darjeelingHotel,
  dooarsHotel,
  gangtokHotel,
  kalimpongHotel,
  ootyHotel,
  portBlairHotel,
  siliguriHotel,
  udaipurHotel,
];

export function getHotelBySlug(slug: string): Hotel | undefined {
  return hotels.find((hotel) => hotel.slug === slug);
}
