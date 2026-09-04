import { VoucherView } from '@/components/voucher-view';
import { getHotelBySlug } from '@/content/hotels';
import { prisma } from '@/lib/db';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function VoucherViewPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const voucher = await prisma.voucher.findUnique({ where: { viewToken: token } });

  if (!voucher) notFound();

  const hotel = getHotelBySlug(voucher.hotelSlug);

  return <VoucherView voucher={voucher} hotel={hotel} />;
}
