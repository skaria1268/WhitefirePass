import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/WhitefirePass' : '',
  eslint: {
    // Warning: Only use this for deployment builds
    // During development, these warnings should still be addressed
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep TypeScript checks enabled
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
