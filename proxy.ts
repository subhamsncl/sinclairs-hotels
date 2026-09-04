import { ADMIN_COOKIE_NAME, verifySessionCookieValue } from '@/lib/admin-auth';
import { type NextRequest, NextResponse } from 'next/server';

// The internal admin/voucher tool only exists on the staff.* hostname — on the
// public hostname it must behave as if /admin doesn't exist at all, and on the
// staff hostname nothing but /admin is reachable.
export async function proxy(request: NextRequest) {
  // request.nextUrl.hostname reflects the server's bind address in some
  // environments, not the domain actually requested — the raw Host header
  // (what Vercel's edge sets to the real custom domain) is the reliable source.
  const host = request.headers.get('host') ?? '';
  const isStaffHost = host.startsWith('staff.');
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

  if (!isStaffHost) {
    if (isAdminPath) {
      return NextResponse.rewrite(new URL('/__not_found__', request.url));
    }
    return NextResponse.next();
  }

  if (!isAdminPath) {
    return NextResponse.redirect(new URL('/admin/vouchers', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  const ok = await verifySessionCookieValue(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
  if (!ok) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt)$).*)',
  ],
};
