'use server';

import { prisma } from '@/lib/db';
import { enquiryNotificationHtml } from '@/lib/email-templates/enquiry-notification';
import { STAFF_NOTIFY_EMAIL, sendMail } from '@/lib/mail';
import { clientIp, isRateLimited } from '@/lib/rate-limit';
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
  const ip = clientIp(headerList);

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
      userIp: ip,
    },
  });

  await sendMail({
    to: STAFF_NOTIFY_EMAIL,
    replyTo: email,
    subject: `New enquiry — ${property} (${name})`,
    html: enquiryNotificationHtml({
      name,
      email,
      phone,
      property,
      checkIn,
      checkOut,
      guests,
      message,
    }),
  });

  return { status: 'success', message: 'Thank you — our team will be in touch shortly.' };
}
