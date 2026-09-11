import { JsonLd } from '@/components/json-ld';
import { siteConfig, socialLinks } from '@/content/site';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const libreBaskerville = Libre_Baskerville({
  variable: '--font-libre-baskerville',
  weight: ['400', '700'],
  subsets: ['latin'],
});

const defaultOgImage = '/images/hotels/port-blair/destination/SinclairsBayviewAerielView.webp';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: defaultOgImage }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [defaultOgImage],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.svg`,
  sameAs: socialLinks.map((link) => link.href),
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream text-ink">
        {/* @next/third-parties renders only GTM's two <script> tags, never the
            <noscript> half of Google's install snippet, so image-pixel tags
            (Ads remarketing, Floodlight) would never fire for a JS-less client. */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              title="Google Tag Manager"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <JsonLd data={organizationJsonLd} />
        {children}
      </body>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </html>
  );
}
