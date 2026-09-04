import { VoucherForm } from '@/components/admin/voucher-form';
import { hotels } from '@/content/hotels';
import { bookingOffices } from '@/content/site';
import type { Metadata } from 'next';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function NewVoucherPage() {
  return (
    <div>
      <p className="font-display text-2xl text-forest">New Voucher</p>
      <div className="mt-6">
        <VoucherForm hotels={hotels} bookingOffices={bookingOffices} />
      </div>
    </div>
  );
}
