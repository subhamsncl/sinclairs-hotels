import type { Hotel } from '@/content/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HotelCard } from './hotel-card';

const fixtureHotel: Hotel = {
  slug: 'burdwan',
  name: 'Sinclairs Burdwan',
  location: 'Burdwan',
  state: 'West Bengal',
  tagline: 'A comfortable stay in the heart of Burdwan.',
  description: 'A full description of the property.',
  heroImage: '/images/hotels/burdwan/hero.jpg',
  thumbnailImage: '/images/hotels/burdwan/thumb.jpg',
  amenities: ['Wi-Fi', 'Restaurant'],
  rooms: [],
  dining: [],
  gallery: [],
  sightseeing: [],
};

describe('HotelCard', () => {
  it('renders the hotel name, location, and tagline', () => {
    render(<HotelCard hotel={fixtureHotel} />);
    expect(screen.getByText('Sinclairs Burdwan')).toBeInTheDocument();
    expect(screen.getByText('Burdwan, West Bengal')).toBeInTheDocument();
    expect(screen.getByText(fixtureHotel.tagline)).toBeInTheDocument();
  });

  it('links to the hotel detail page', () => {
    render(<HotelCard hotel={fixtureHotel} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/hotels/burdwan');
  });
});
