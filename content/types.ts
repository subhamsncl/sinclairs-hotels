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
  dining: string[];
  gallery: GalleryImage[];
  sightseeing: string[];
  mapEmbedUrl?: string;
}
