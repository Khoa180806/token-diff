import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
