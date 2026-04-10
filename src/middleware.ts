import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Force Netlify Durable Cache TTL cap for dynamic pages.
//
// Why middleware and not next.config headers() or netlify.toml?
// - netlify.toml [[headers]] only applies to static assets, not SSG routes
//   served by @netlify/plugin-nextjs.
// - next.config.ts headers() is ignored by the plugin for pages that use
//   generateStaticParams — those are treated as fully static and stored
//   with the plugin's default s-maxage=31536000 (1 year).
// - Middleware runs on every request AFTER Next.js renders the response,
//   so headers set here override everything else and are seen by the
//   Netlify CDN when it decides the durable-cache TTL.
//
// This caps new Durable Cache entries at 1h and tags them so we can
// purge by tag via the Netlify API.
const DURABLE_CACHE_1H =
  "public, s-maxage=3600, stale-while-revalidate=86400, durable";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("Netlify-CDN-Cache-Control", DURABLE_CACHE_1H);
  response.headers.set("Netlify-Cache-Tag", "page");
  return response;
}

export const config = {
  // Homepage and all /reviews/* pages.
  matcher: ["/", "/reviews/:path*"],
};
