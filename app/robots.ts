import { siteConfig } from '@/content/site';
import { publicSiteUrl } from '@/lib/site-url';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Before DNS cutover this app answers on a Vercel URL while every canonical it
  // emits points at siteConfig.url — which is still the WordPress site, where
  // /weddings, /meetings-events, /enquiry and every /hotels/<slug> are 404s.
  // Google discards a canonical that resolves to a 404 and indexes the URL it
  // crawled instead, so an open robots.txt here puts the staging domain into the
  // index competing with the live site under a second hostname.
  //
  // Tied to the same switch as the base URLs rather than a flag of its own:
  // removing SITE_BASE_URL at cutover makes this the canonical host and flips
  // robots to Allow in the same step. See GO_LIVE_CHECKLIST.md § Cutover.
  const isCanonicalHost = publicSiteUrl === siteConfig.url;

  return {
    rules: isCanonicalHost ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
