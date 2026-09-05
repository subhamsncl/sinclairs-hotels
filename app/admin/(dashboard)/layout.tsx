import { logout } from '@/app/admin/logout/actions';
import Link from 'next/link';

const navItems = [
  { label: 'Vouchers', href: '/admin/vouchers' },
  { label: 'Enquiries', href: '/admin/enquiries' },
  { label: 'Newsletter', href: '/admin/newsletter' },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-gold/20 bg-forest text-cream shadow-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Sinclairs" className="h-9 w-auto" />
            <span className="rounded-full border border-gold/30 px-2 py-0.5 text-[10px] uppercase tracking-widest text-gold-light">
              Internal
            </span>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs uppercase tracking-wider text-cream/70 transition hover:text-gold-light"
            >
              Sign Out
            </button>
          </form>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-6 px-6 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-widest text-cream/70 transition hover:text-gold-light"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
