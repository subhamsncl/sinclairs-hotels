export interface NavItem {
  label: string;
  href: string;
}

export interface RoomType {
  name: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface DiningVenue {
  name: string;
  description: string;
  image?: string;
}

export interface EventVenue {
  name: string;
  areaSqFt: number;
  capacity: number;
}

export interface EventSpaces {
  totalSqFt: number;
  maxCapacity: number;
  venues: EventVenue[];
}

export interface Hotel {
  slug: string;
  name: string;
  location: string;
  state: string;
  tagline: string;
  description: string;
  heroImage: string;
  thumbnailImage: string;
  amenities: string[];
  rooms: RoomType[];
  dining: DiningVenue[];
  gallery: GalleryImage[];
  sightseeing: string[];
  eventSpaces?: EventSpaces;
  mapEmbedUrl?: string;
}
