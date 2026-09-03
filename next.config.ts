import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // avif is deliberately excluded: it's meaningfully smaller than webp but
    // its encode is CPU-heavy, and in dev every first request re-encodes from
    // scratch (no CDN warm cache) — with a page rendering 9+ photos at once,
    // that stalls first paint until each one finishes. webp gets most of the
    // size win at a fraction of the encode cost.
    formats: ['image/webp'],
    // Content is static and only changes on redeploy, so cache optimized
    // variants for as long as possible instead of the 60s default.
    minimumCacheTTL: 31536000,
    // Default (75) is fine for cards/thumbnails. Full-bleed heroes stretch an
    // already-compressed 1600px source up to 3840px, so a second lossy pass
    // at 75 compounds into visible haze — those opt into 90 explicitly.
    qualities: [75, 90],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      // Next's App Router streams RSC hydration payloads via inline <script>
      // tags it injects itself; a nonce-based CSP is possible but needs
      // middleware to thread a per-request nonce, so 'unsafe-inline' here is
      // a deliberate tradeoff for compatibility. The other directives below
      // still block the exfiltration and embedding vectors that matter most.
      "script-src 'self' 'unsafe-inline'",
      // Radix (Select/Popover) and react-day-picker position themselves via
      // inline style attributes, so style-src needs 'unsafe-inline' too.
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      // Only external embed on the site: the per-hotel Google Maps iframe.
      'frame-src https://maps.google.com https://www.google.com',
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
