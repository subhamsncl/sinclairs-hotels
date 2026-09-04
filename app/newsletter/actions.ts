'use server';

import { prisma } from '@/lib/db';
import { newsletterNotificationHtml } from '@/lib/email-templates/newsletter-notification';
import { STAFF_NOTIFY_EMAIL, sendMail } from '@/lib/mail';
import { clientIp, isRateLimited } from '@/lib/rate-limit';
import { newsletterSchema } from '@/lib/validation';
import { Prisma } from '@prisma/client';
import { headers } from 'next/headers';

export type NewsletterFormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function subscribeNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const headerList = await headers();
  const ip = clientIp(headerList);

  if (isRateLimited(`newsletter:${ip}`)) {
    return { status: 'error', message: 'Too many requests. Please try again in a minute.' };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = newsletterSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please enter a valid email address.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.company) {
    return { status: 'success' };
  }

  try {
    await prisma.newsletter.create({ data: { email: parsed.data.email, ip } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return { status: 'success', message: 'You are already subscribed.' };
    }
    throw error;
  }

  await sendMail({
    to: STAFF_NOTIFY_EMAIL,
    subject: 'New newsletter subscriber',
    html: newsletterNotificationHtml({ email: parsed.data.email }),
  });

  return { status: 'success', message: 'Thanks for subscribing!' };
}
