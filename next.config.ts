import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Advanced server-side features
  },
  images: {
    remotePatterns: [],
  },
  reactStrictMode: true,
};

export default nextConfig;
