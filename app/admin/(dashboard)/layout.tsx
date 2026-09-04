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
      <header className="border-b border-ink/10 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <p className="font-display text-lg text-forest">Sinclairs Hotels — Internal</p>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs uppercase tracking-wider text-ink/60 hover:text-forest"
            >
              Sign Out
            </button>
          </form>
        </div>
        <nav className="mx-auto mt-4 flex max-w-5xl gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-widest text-ink/60 transition hover:text-forest"
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
