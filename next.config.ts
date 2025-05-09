import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: true, // Enable source maps in production
  // output: "export",
  // images: { unoptimized: true },
};

export default nextConfig;
