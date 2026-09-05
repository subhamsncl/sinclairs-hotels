import { getHotelBySlug } from '@/content/hotels';
import { prisma } from '@/lib/db';
import { dailyDigestHtml } from '@/lib/email-templates/daily-digest';
import { sendMail } from '@/lib/mail';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

function getPreviousIstDay(now: Date) {
  const istNow = new Date(now.getTime() + IST_OFFSET_MS);
  const year = istNow.getUTCFullYear();
  const month = istNow.getUTCMonth();
  const date = istNow.getUTCDate();

  const istTodayStartUtc = Date.UTC(year, month, date, 0, 0, 0) - IST_OFFSET_MS;
  const start = new Date(istTodayStartUtc - 24 * 60 * 60 * 1000);
  const end = new Date(istTodayStartUtc);
  const dayName = new Date(Date.UTC(year, month, date - 1)).toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'UTC',
  });
  const dateLabel = new Date(Date.UTC(year, month, date - 1)).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return { start, end, dayName, dateLabel };
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const digestTo = process.env.DIGEST_TO_EMAIL;
  if (!digestTo) {
    console.error('[cron:daily-digest] DIGEST_TO_EMAIL not configured, skipping send');
    return NextResponse.json({ error: 'DIGEST_TO_EMAIL not configured' }, { status: 500 });
  }

  const { start, end, dayName, dateLabel } = getPreviousIstDay(new Date());

  const [enquiries, newsletterSignups, payments] = await Promise.all([
    prisma.enquiry.findMany({
      where: { createdAt: { gte: start, lt: end } },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.newsletter.findMany({
      where: { subscribedAt: { gte: start, lt: end } },
      orderBy: { subscribedAt: 'asc' },
    }),
    prisma.payment.findMany({
      where: { status: 'SUCCESS', createdAt: { gte: start, lt: end } },
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  const html = dailyDigestHtml({
    dateLabel: `${dayName}, ${dateLabel}`,
    enquiries: enquiries.map((e) => ({
      property: getHotelBySlug(e.property)?.name ?? e.property,
      checkIn: e.checkIn,
      checkOut: e.checkOut,
      name: e.name,
      message: e.message,
    })),
    newsletterEmails: newsletterSignups.map((n) => n.email),
    payments: payments.map((p) => ({
      hotelName: getHotelBySlug(p.hotelSlug)?.name ?? p.hotelSlug,
      orderId: p.orderId,
      amount: p.amount.toFixed(2),
      guestName: p.guestName,
      bankRefNo: p.bankRefNo,
    })),
  });

  await sendMail({
    to: digestTo,
    bcc: process.env.DIGEST_BCC_EMAIL,
    subject: `Sinclairs Hotels online enquiries on ${dayName.toUpperCase()}`,
    html,
  });

  return NextResponse.json({
    ok: true,
    range: { start, end },
    counts: {
      enquiries: enquiries.length,
      newsletterSignups: newsletterSignups.length,
      payments: payments.length,
    },
  });
}
