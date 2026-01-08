/**
 * Next.js Configuration for Maximo Design
 *
 * This configuration sets up:
 * - next-intl for internationalization (Dutch and English)
 * - Image optimization settings
 * - Other Next.js 14 App Router optimizations
 */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Image configuration
   * Optimized for catalog images with high quality at smaller file sizes
   */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  /**
   * Strict mode for React 18
   * Helps identify potential problems in the application
   */
  reactStrictMode: true,

};

export default withNextIntl(nextConfig);
