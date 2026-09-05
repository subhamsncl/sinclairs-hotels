import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { WhatsAppButton } from '@/components/whatsapp-button';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
