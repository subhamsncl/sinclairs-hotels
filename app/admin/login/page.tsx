import { AdminLoginForm } from '@/components/admin/admin-login-form';
import type { Metadata } from 'next';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm rounded-lg border border-ink/10 bg-white p-8 shadow-sm">
        <p className="font-display text-xl text-forest">Staff Sign In</p>
        <p className="mt-1 text-sm text-ink/60">Sinclairs Hotels internal tools</p>
        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
