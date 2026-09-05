import { siteConfig } from '@/content/site';

// sinclairshotels.com still serves the legacy WordPress site (see CLAUDE.md's SEO
// note), so absolute links/images generated server-side (email logo, voucher
// "view as webpage" links) would 404 against it before DNS cutover. SITE_BASE_URL
// overrides the base to wherever this app is actually reachable right now (e.g. the
// live preview domain) — remove the override once sinclairshotels.com is this app.
export const publicSiteUrl = process.env.SITE_BASE_URL || siteConfig.url;
