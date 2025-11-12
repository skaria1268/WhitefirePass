import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Note: Removed 'output: export' to support API routes
  // This enables dynamic features like API routes and backend functionality
  images: {
    unoptimized: true,
  },
  // Only use basePath in production builds
  // basePath: process.env.NODE_ENV === 'production' ? '/WhitefirePass' : '',
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
