import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Content is static and only changes on redeploy, so cache optimized
    // variants for as long as possible instead of the 60s default.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
