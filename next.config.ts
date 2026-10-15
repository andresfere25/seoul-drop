import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.KAYA_BUILD_DIR || '.next',
};

export default nextConfig;
