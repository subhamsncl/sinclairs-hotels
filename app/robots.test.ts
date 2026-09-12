import { siteConfig } from '@/content/site';
import { afterEach, describe, expect, it, vi } from 'vitest';

async function loadRobots(siteBaseUrl?: string) {
  vi.resetModules();
  vi.stubEnv('SITE_BASE_URL', siteBaseUrl ?? '');
  const mod = await import('./robots');
  return mod.default();
}

describe('robots', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('keeps crawlers out while the app is served from somewhere other than its canonical host', async () => {
    const robots = await loadRobots('https://sinclairs-hotels.vercel.app');
    expect(robots.rules).toEqual({ userAgent: '*', disallow: '/' });
  });

  it('opens up once SITE_BASE_URL is removed at cutover', async () => {
    const robots = await loadRobots(undefined);
    expect(robots.rules).toEqual({ userAgent: '*', allow: '/' });
  });

  it('opens up if SITE_BASE_URL is set but already points at the canonical host', async () => {
    const robots = await loadRobots(siteConfig.url);
    expect(robots.rules).toEqual({ userAgent: '*', allow: '/' });
  });

  it('always advertises the sitemap on the canonical host, never the staging one', async () => {
    const staging = await loadRobots('https://sinclairs-hotels.vercel.app');
    expect(staging.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });
});
