import { beforeEach, describe, expect, it } from 'vitest';
import { hotelItem, pushDataLayerEvent, pushEcommerceEvent } from './analytics';

describe('pushDataLayerEvent', () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  it('pushes a single flat object with the event name and params', () => {
    pushDataLayerEvent('generate_lead', { hotel: 'gangtok', enquiry_type: 'wedding' });
    expect(window.dataLayer).toEqual([
      { event: 'generate_lead', hotel: 'gangtok', enquiry_type: 'wedding' },
    ]);
  });

  it('pushes an event with no params', () => {
    pushDataLayerEvent('sign_up');
    expect(window.dataLayer).toEqual([{ event: 'sign_up' }]);
  });
});

describe('pushEcommerceEvent', () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  it('clears the previous ecommerce object before pushing the event', () => {
    pushEcommerceEvent('view_item', { items: [hotelItem('gangtok', 'Sinclairs Gangtok')] });
    expect(window.dataLayer?.[0]).toEqual({ ecommerce: null });
  });

  it('keeps event-scoped params out of the ecommerce object', () => {
    pushEcommerceEvent(
      'begin_checkout',
      { items: [hotelItem('ooty', 'Sinclairs Retreat Ooty')] },
      { cta_source: 'hotel_room_card', hotel: 'ooty' },
    );
    expect(window.dataLayer?.[1]).toEqual({
      event: 'begin_checkout',
      cta_source: 'hotel_room_card',
      hotel: 'ooty',
      ecommerce: {
        items: [
          {
            item_id: 'ooty',
            item_name: 'Sinclairs Retreat Ooty',
            item_brand: 'Sinclairs',
            item_category: 'Hotel',
          },
        ],
      },
    });
  });

  it('carries transaction_id, value and currency on a purchase', () => {
    pushEcommerceEvent(
      'purchase',
      {
        transaction_id: 'SNCL123',
        value: 4500,
        currency: 'INR',
        items: [hotelItem('darjeeling', 'Sinclairs Darjeeling', { price: 4500, quantity: 1 })],
      },
      { hotel: 'darjeeling' },
    );
    expect(window.dataLayer?.[1]).toMatchObject({
      event: 'purchase',
      ecommerce: { transaction_id: 'SNCL123', value: 4500, currency: 'INR' },
    });
  });

  it('does not leak items between two consecutive ecommerce events', () => {
    pushEcommerceEvent('view_item', { items: [hotelItem('gangtok', 'Sinclairs Gangtok')] });
    pushEcommerceEvent('begin_checkout', { items: [hotelItem('ooty', 'Sinclairs Retreat Ooty')] });
    expect(window.dataLayer).toHaveLength(4);
    expect(window.dataLayer?.[2]).toEqual({ ecommerce: null });
  });
});

describe('hotelItem', () => {
  it('applies the shared brand and category', () => {
    expect(hotelItem('siliguri', 'Sinclairs Siliguri')).toEqual({
      item_id: 'siliguri',
      item_name: 'Sinclairs Siliguri',
      item_brand: 'Sinclairs',
      item_category: 'Hotel',
    });
  });

  it('lets a room name ride along as the item variant', () => {
    expect(
      hotelItem('darjeeling', 'Sinclairs Darjeeling', { item_variant: 'Deluxe Room' }),
    ).toMatchObject({ item_variant: 'Deluxe Room' });
  });
});
