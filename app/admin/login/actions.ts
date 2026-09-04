'use server';

import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createSessionCookieValue,
} from '@/lib/admin-auth';
import { clientIp, isRateLimited } from '@/lib/rate-limit';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export type LoginFormState = {
  status: 'idle' | 'error';
  message?: string;
};

export async function login(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const headerList = await headers();
  const ip = clientIp(headerList);

  if (isRateLimited(`admin-login:${ip}`)) {
    return { status: 'error', message: 'Too many attempts. Please try again in a minute.' };
  }

  const password = String(formData.get('password') ?? '');
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || password !== expected) {
    return { status: 'error', message: 'Incorrect password.' };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, await createSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });

  redirect('/admin/vouchers');
}
