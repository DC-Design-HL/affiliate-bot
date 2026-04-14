import type { NextConfig } from "next";

// Durable Cache TTL cap is set in src/middleware.ts, not here.
// next.config headers() is ignored by @netlify/plugin-nextjs for pages
// that use generateStaticParams (all review pages).
const nextConfig: NextConfig = {
  // Include content/reviews MDX files in the serverless function bundle.
  // Without this, the function can't read content at runtime (ISR/on-demand),
  // causing 404s for pages not found in the prerender blob cache.
  outputFileTracingIncludes: {
    "/reviews/[slug]": ["./content/reviews/**/*"],
  },
};

export default nextConfig;
