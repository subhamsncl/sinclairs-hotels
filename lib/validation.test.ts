import { describe, expect, it } from 'vitest';
import { enquirySchema } from './validation';

const validInput = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+91 9876543210',
  property: 'burdwan',
  message: 'Looking for a room for two nights in December.',
};

describe('enquirySchema', () => {
  it('accepts a valid enquiry', () => {
    const result = enquirySchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('rejects a missing name', () => {
    const result = enquirySchema.safeParse({ ...validInput, name: '' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = enquirySchema.safeParse({ ...validInput, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid phone number', () => {
    const result = enquirySchema.safeParse({ ...validInput, phone: 'call me maybe' });
    expect(result.success).toBe(false);
  });

  it('rejects a message that is too short', () => {
    const result = enquirySchema.safeParse({ ...validInput, message: 'hi' });
    expect(result.success).toBe(false);
  });

  it('rejects submissions with a filled honeypot field', () => {
    const result = enquirySchema.safeParse({ ...validInput, company: 'Acme Corp' });
    expect(result.success).toBe(false);
  });

  it('accepts an empty honeypot field', () => {
    const result = enquirySchema.safeParse({ ...validInput, company: '' });
    expect(result.success).toBe(true);
  });

  it('accepts an empty guests field, as submitted by a blank optional number input', () => {
    const result = enquirySchema.safeParse({ ...validInput, guests: '' });
    expect(result.success).toBe(true);
  });

  it('accepts a valid guests count', () => {
    const result = enquirySchema.safeParse({ ...validInput, guests: '2' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.guests).toBe(2);
    }
  });
});
