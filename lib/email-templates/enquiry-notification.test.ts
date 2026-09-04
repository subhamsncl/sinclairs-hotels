import { describe, expect, it } from 'vitest';
import { enquiryNotificationHtml } from './enquiry-notification';

describe('enquiryNotificationHtml', () => {
  it('escapes HTML in guest-supplied fields', () => {
    const html = enquiryNotificationHtml({
      name: 'Test Guest',
      email: 'test@example.com',
      phone: '+91 9876543210',
      property: 'gangtok',
      message: 'Smoke test <script>alert(1)</script> & "quotes" \'here\'',
    });

    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).toContain('&amp;');
    expect(html).toContain('&quot;quotes&quot;');
  });

  it('includes the guest-visible fields', () => {
    const html = enquiryNotificationHtml({
      name: 'Test Guest',
      email: 'test@example.com',
      phone: '+91 9876543210',
      property: 'gangtok',
      checkIn: '2026-01-10',
      checkOut: '2026-01-12',
      guests: 2,
      message: 'Looking forward to it.',
    });

    expect(html).toContain('Test Guest');
    expect(html).toContain('test@example.com');
    expect(html).toContain('2026-01-10');
    expect(html).toContain('2026-01-12');
    expect(html).toContain('>2<');
  });
});
