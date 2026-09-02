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
  },
};

export default nextConfig;
