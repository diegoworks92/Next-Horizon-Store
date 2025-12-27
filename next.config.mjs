import { fileURLToPath } from "url";
import { dirname, join } from "path";
import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  sassOptions: {
    includePaths: [join(__dirname, "src/sass")],
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.shopify.com",
        protocol: "https",
      },
    ],

    qualities: [75, 80],
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default bundleAnalyzer(nextConfig);
