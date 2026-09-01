'use server';

import { prisma } from '@/lib/db';
import { isRateLimited } from '@/lib/rate-limit';
import { enquirySchema } from '@/lib/validation';
import { headers } from 'next/headers';

export type EnquiryFormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitEnquiry(
  _prevState: EnquiryFormState,
  formData: FormData,
): Promise<EnquiryFormState> {
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for') ?? 'unknown';

  if (isRateLimited(ip)) {
    return { status: 'error', message: 'Too many requests. Please try again in a minute.' };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = enquirySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.company) {
    return { status: 'success' };
  }

  const { name, email, phone, property, checkIn, checkOut, guests, message } = parsed.data;

  await prisma.enquiry.create({
    data: {
      name,
      email,
      phone,
      property,
      message,
      guests: guests ?? null,
      checkIn: checkIn ? new Date(checkIn) : null,
      checkOut: checkOut ? new Date(checkOut) : null,
    },
  });

  return { status: 'success', message: 'Thank you — our team will be in touch shortly.' };
}
