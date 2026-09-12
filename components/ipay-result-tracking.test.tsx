import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IpayResultTracking } from './ipay-result-tracking';

const props = {
  orderId: 'SNCL123',
  amount: 4500,
  hotelSlug: 'darjeeling',
  hotelName: 'Sinclairs Darjeeling',
};

function eventsNamed(name: string) {
  return (window.dataLayer ?? []).filter((e) => (e as { event?: string }).event === name);
}

describe('IpayResultTracking', () => {
  beforeEach(() => {
    window.dataLayer = [];
    sessionStorage.clear();
  });

  it('reports a successful payment as a GA4 purchase', () => {
    render(<IpayResultTracking status="SUCCESS" {...props} />);
    expect(window.dataLayer?.[1]).toMatchObject({
      event: 'purchase',
      hotel: 'darjeeling',
      ecommerce: { transaction_id: 'SNCL123', value: 4500, currency: 'INR' },
    });
  });

  it('keeps a failed payment out of the ecommerce reports', () => {
    render(<IpayResultTracking status="FAILURE" {...props} />);
    const [failure] = eventsNamed('payment_failed');
    expect(failure).toMatchObject({ transaction_id: 'SNCL123', status: 'FAILURE' });
    expect(failure).not.toHaveProperty('ecommerce');
    expect(eventsNamed('purchase')).toHaveLength(0);
  });

  it('does not report the same order twice when the result page is reloaded', () => {
    render(<IpayResultTracking status="SUCCESS" {...props} />);
    window.dataLayer = [];
    render(<IpayResultTracking status="SUCCESS" {...props} />);

    expect(eventsNamed('purchase')).toHaveLength(0);
  });

  it('still reports a different order in the same session', () => {
    render(<IpayResultTracking status="SUCCESS" {...props} />);
    window.dataLayer = [];
    render(<IpayResultTracking status="SUCCESS" {...props} orderId="SNCL999" />);

    expect(eventsNamed('purchase')).toHaveLength(1);
  });

  it('reports a retry that succeeds after an earlier failure on the same order', () => {
    render(<IpayResultTracking status="FAILURE" {...props} />);
    window.dataLayer = [];
    render(<IpayResultTracking status="SUCCESS" {...props} />);

    expect(eventsNamed('purchase')).toHaveLength(1);
  });

  it('reports the payment when sessionStorage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    render(<IpayResultTracking status="SUCCESS" {...props} />);
    expect(eventsNamed('purchase')).toHaveLength(1);

    vi.restoreAllMocks();
  });

  it('renders nothing', () => {
    const { container } = render(<IpayResultTracking status="SUCCESS" {...props} />);
    expect(container).toBeEmptyDOMElement();
  });
});
