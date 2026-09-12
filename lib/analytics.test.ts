import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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

// The direct-to-GA4 transport reads NEXT_PUBLIC_GA4_ID once at module load, so
// each case stubs the env and re-imports rather than sharing one instance. CI
// runs with only DATABASE_URL set, so every case sets its own value and none
// depends on .env.local.
async function loadWithGa4Id(id?: string) {
  vi.resetModules();
  if (id === undefined) vi.stubEnv('NEXT_PUBLIC_GA4_ID', '');
  else vi.stubEnv('NEXT_PUBLIC_GA4_ID', id);
  return import('./analytics');
}

describe('direct-to-GA4 transport', () => {
  beforeEach(() => {
    window.dataLayer = [];
    window.gaDirectLayer = [];
    document.head.innerHTML = '';
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('stays dormant when NEXT_PUBLIC_GA4_ID is unset', async () => {
    const { pushDataLayerEvent } = await loadWithGa4Id(undefined);
    pushDataLayerEvent('contact_click', { method: 'phone' });

    expect(window.gaDirectLayer).toEqual([]);
    expect(document.querySelector('script')).toBeNull();
  });

  it('loads gtag.js on its own queue so it cannot collide with GTM', async () => {
    const { pushDataLayerEvent } = await loadWithGa4Id('G-TEST123');
    pushDataLayerEvent('contact_click', { method: 'phone' });

    const script = document.querySelector('script');
    expect(script?.getAttribute('src')).toBe(
      'https://www.googletagmanager.com/gtag/js?id=G-TEST123&l=gaDirectLayer',
    );
  });

  it('suppresses its own page_view so GTM stays the only sender of it', async () => {
    const { pushDataLayerEvent } = await loadWithGa4Id('G-TEST123');
    pushDataLayerEvent('sign_up', { method: 'newsletter' });

    expect(window.gaDirectLayer).toContainEqual(['config', 'G-TEST123', { send_page_view: false }]);
  });

  it('loads the script once across many events', async () => {
    const { pushDataLayerEvent } = await loadWithGa4Id('G-TEST123');
    pushDataLayerEvent('contact_click', { method: 'phone' });
    pushDataLayerEvent('form_start', { hotel: 'ooty' });
    pushDataLayerEvent('generate_lead', { hotel: 'ooty' });

    expect(document.querySelectorAll('script')).toHaveLength(1);
  });

  it('forwards a flat event with its params', async () => {
    const { pushDataLayerEvent } = await loadWithGa4Id('G-TEST123');
    pushDataLayerEvent('form_start', { hotel: 'gangtok', enquiry_type: 'HOTEL' });

    expect(window.gaDirectLayer).toContainEqual([
      'event',
      'form_start',
      { hotel: 'gangtok', enquiry_type: 'HOTEL' },
    ]);
  });

  it('flattens the ecommerce block, which gtag takes on the event itself', async () => {
    const { pushEcommerceEvent, hotelItem } = await loadWithGa4Id('G-TEST123');
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

    const event = window.gaDirectLayer?.find(
      (entry): entry is unknown[] => Array.isArray(entry) && entry[0] === 'event',
    );
    expect(event?.[2]).toMatchObject({
      hotel: 'darjeeling',
      transaction_id: 'SNCL123',
      value: 4500,
      currency: 'INR',
    });
    expect(event?.[2]).not.toHaveProperty('ecommerce');
  });

  it('still pushes the nested dataLayer shape the container reads', async () => {
    const { pushEcommerceEvent, hotelItem } = await loadWithGa4Id('G-TEST123');
    pushEcommerceEvent('view_item', { items: [hotelItem('ooty', 'Sinclairs Retreat Ooty')] });

    expect(window.dataLayer?.[0]).toEqual({ ecommerce: null });
    expect(window.dataLayer?.[1]).toMatchObject({
      event: 'view_item',
      ecommerce: { items: [{ item_id: 'ooty' }] },
    });
  });
});
