import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { HotelViewTracking } from './hotel-view-tracking';

describe('HotelViewTracking', () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  it('clears the previous ecommerce object before reporting the view', () => {
    render(<HotelViewTracking slug="gangtok" name="Sinclairs Gangtok" />);
    expect(window.dataLayer?.[0]).toEqual({ ecommerce: null });
  });

  it('reports the property as a GA4 ecommerce item', () => {
    render(<HotelViewTracking slug="gangtok" name="Sinclairs Gangtok" />);
    expect(window.dataLayer?.[1]).toEqual({
      event: 'view_item',
      hotel: 'gangtok',
      ecommerce: {
        items: [
          {
            item_id: 'gangtok',
            item_name: 'Sinclairs Gangtok',
            item_brand: 'Sinclairs',
            item_category: 'Hotel',
          },
        ],
      },
    });
  });

  it('fires once per page load, not once per render', () => {
    const { rerender } = render(<HotelViewTracking slug="ooty" name="Sinclairs Retreat Ooty" />);
    rerender(<HotelViewTracking slug="ooty" name="Sinclairs Retreat Ooty" />);
    expect(
      window.dataLayer?.filter((e) => (e as { event?: string }).event === 'view_item'),
    ).toHaveLength(1);
  });

  it('renders nothing', () => {
    const { container } = render(<HotelViewTracking slug="ooty" name="Sinclairs Retreat Ooty" />);
    expect(container).toBeEmptyDOMElement();
  });
});
