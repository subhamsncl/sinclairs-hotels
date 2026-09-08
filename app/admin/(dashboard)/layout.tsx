import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white lg:flex-row">
      <AdminSidebar />
      <main className="min-h-0 min-w-0 flex-1 overflow-hidden p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
