import type { NextConfig } from "next";

// Durable Cache TTL cap is set in src/middleware.ts, not here.
// next.config headers() is ignored by @netlify/plugin-nextjs for pages
// that use generateStaticParams (all review pages).
const nextConfig: NextConfig = {};

export default nextConfig;
