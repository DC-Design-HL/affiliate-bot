import type { NextConfig } from "next";

// Cap Netlify Durable Cache TTL at 1h for dynamic pages.
// netlify.toml [[headers]] rules don't apply to Next.js SSG routes served
// by the plugin, so we set Netlify-CDN-Cache-Control directly from Next.js
// via next.config headers(). This runs for every matching response.
const DURABLE_CACHE_1H =
  "public, s-maxage=3600, stale-while-revalidate=86400, durable";

// Also tag responses so we can invalidate by tag via the Netlify purge API.
const CACHE_TAG = "page";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          { key: "Netlify-CDN-Cache-Control", value: DURABLE_CACHE_1H },
          { key: "Netlify-Cache-Tag", value: CACHE_TAG },
        ],
      },
      {
        source: "/reviews/:path*",
        headers: [
          { key: "Netlify-CDN-Cache-Control", value: DURABLE_CACHE_1H },
          { key: "Netlify-Cache-Tag", value: CACHE_TAG },
        ],
      },
    ];
  },
};

export default nextConfig;
