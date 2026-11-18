import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import { REMOVED_INSIGHTS } from "./src/data/removedInsights";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: false,
    qualities: [75, 90],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      // One canonical host: send www to the apex domain in a single hop.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.neoklyn.com" }],
        destination: "https://neoklyn.com/:path*",
        permanent: true,
      },
      ...REMOVED_INSIGHTS.map(([slug, destination]) => ({
        source: `/insights/${slug}`,
        destination,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
      {
        source: "/assets/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/opengraph-image",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
