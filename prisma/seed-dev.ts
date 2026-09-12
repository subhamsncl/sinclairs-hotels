// Replaces the dev database's guest records with a small, obviously-fake set.
//
// The dev branch starts life as a Neon fork of prod, which means it arrives
// holding every real enquiry, voucher and payment — tens of thousands of real
// names, emails and phone numbers, in the environment content editors are given
// access to. That is the problem this fixes: dev should be testable, not a
// second copy of the guest list.
//
// Re-run this after any "Reset from parent" in Neon, because a reset re-copies
// production data by definition.
//
//   pnpm seed:dev
//
// It refuses to run against production. The guard is deliberately a refusal
// rather than a prompt: this script truncates, and the one thing it must never
// do is truncate the live guest data because someone had the wrong shell open.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// The production compute endpoint. A connection string containing this is the
// live database, whatever the branch is currently called.
const PRODUCTION_ENDPOINT = 'ep-small-boat-b34uwlep';

const HOTELS = [
  'gangtok',
  'darjeeling',
  'kalimpong',
  'dooars',
  'siliguri',
  'burdwan',
  'ooty',
  'port-blair',
  'udaipur',
] as const;

// Every fabricated address uses example.com, which IANA reserves precisely so
// that test data cannot reach a real inbox even if the mail override is off.
function guest(n: number) {
  return {
    name: `Test Guest ${n}`,
    email: `test.guest.${n}@example.com`,
    phone: `98765${String(10000 + n).slice(-5)}`,
  };
}

function daysFromNow(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(12, 0, 0, 0);
  return d;
}

async function assertNotProduction(): Promise<void> {
  const url = process.env.DATABASE_URL ?? '';
  if (!url) throw new Error('DATABASE_URL is not set.');

  if (url.includes(PRODUCTION_ENDPOINT)) {
    throw new Error(
      'Refusing to run: DATABASE_URL points at the production database.\n' +
        'This script truncates guest data. Point it at the dev branch and try again.',
    );
  }

  const host = url.replace(/.*@([^/?]+).*/, '$1');
  console.log(`Target database: ${host}`);
}

async function main(): Promise<void> {
  await assertNotProduction();

  const before = {
    enquiries: await prisma.enquiry.count(),
    vouchers: await prisma.voucher.count(),
    payments: await prisma.payment.count(),
    newsletter: await prisma.newsletter.count(),
  };
  console.log('Existing rows:', before);

  // Refund rows reference Payment, so order matters and CASCADE covers it.
  await prisma.$executeRawUnsafe(
    'TRUNCATE "Refund", "Payment", "Voucher", "Enquiry", "Newsletter" RESTART IDENTITY CASCADE',
  );
  console.log('Guest tables truncated.');

  const types = ['GENERAL', 'HOTEL', 'WEDDING', 'MEETINGS'] as const;
  const statuses = ['NEW', 'CONTACTED', 'CLOSED'] as const;

  await prisma.enquiry.createMany({
    data: Array.from({ length: 12 }, (_, i) => {
      const g = guest(i + 1);
      return {
        ...g,
        property: HOTELS[i % HOTELS.length] as string,
        type: types[i % types.length],
        status: statuses[i % statuses.length],
        guests: (i % 4) + 1,
        checkIn: daysFromNow(14 + i),
        checkOut: daysFromNow(16 + i),
        message: `Seeded test enquiry ${i + 1}. Not a real guest.`,
      };
    }),
  });

  await prisma.newsletter.createMany({
    data: Array.from({ length: 5 }, (_, i) => ({
      email: `test.subscriber.${i + 1}@example.com`,
    })),
  });

  // Voucher numbers continue from a realistic point rather than 1, so dev
  // matches how production behaves after the sequence fix.
  await prisma.$executeRawUnsafe(`SELECT setval('"Voucher_voucherNo_seq"', 35001)`);

  for (let i = 0; i < 4; i++) {
    const g = guest(i + 1);
    await prisma.voucher.create({
      data: {
        viewToken: `seeded-dev-token-${i + 1}-${Math.random().toString(36).slice(2, 10)}`,
        hotelSlug: HOTELS[i % HOTELS.length] as string,
        guestName: g.name,
        guestPhone: g.phone,
        guestEmail: g.email,
        billingAddress: 'Test Address, Kolkata 700001',
        rooms: (i % 2) + 1,
        checkIn: daysFromNow(20 + i),
        checkOut: daysFromNow(22 + i),
        rate: 8500,
        taxes: 1530,
        issuerName: 'Seed Script',
        issuerPhone: '9876500000',
        bookingOffice: 'Sinclairs Hotels — Head Office',
      },
    });
  }

  const payStatuses = ['SUCCESS', 'SUCCESS', 'FAILURE', 'INITIATED'] as const;
  for (let i = 0; i < 4; i++) {
    const g = guest(i + 1);
    await prisma.payment.create({
      data: {
        orderId: `SEEDDEV${String(i + 1).padStart(6, '0')}`,
        hotelSlug: HOTELS[i % HOTELS.length] as string,
        amount: 1000 * (i + 1),
        guestName: g.name,
        guestEmail: g.email,
        guestPhone: g.phone,
        status: payStatuses[i],
        trackingId: payStatuses[i] === 'SUCCESS' ? `SEEDTXN${i + 1}` : null,
      },
    });
  }

  const after = {
    enquiries: await prisma.enquiry.count(),
    vouchers: await prisma.voucher.count(),
    payments: await prisma.payment.count(),
    newsletter: await prisma.newsletter.count(),
  };
  console.log('Seeded rows:', after);
  console.log('\nDev database reseeded. No real guest data remains.');
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
