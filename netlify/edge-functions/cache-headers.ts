import type { Context } from "https://edge.netlify.com";

// Cap Netlify Durable Cache TTL on dynamic pages to 1h.
// Force-deploy: bust stale ISR 404 blobs for 6 review pages (2026-04-14)
//
// Why an Edge Function and not middleware / next.config / netlify.toml?
// - @netlify/plugin-nextjs hardcodes s-maxage=31536000 (1y) for SSG routes
//   with generateStaticParams, and ignores every other mechanism:
//   - netlify.toml [[headers]] (static-asset only)
//   - next.config.ts headers() (bypassed for static-param pages)
//   - Next.js middleware (plugin serves prerender blobs without running it)
//   - export const revalidate = 3600 (plugin doesn't translate to CDN header)
// - Edge Functions run AFTER the Next.js plugin's serverless response but
//   BEFORE Netlify's CDN decides how to cache it. Headers set here are the
//   final word for the CDN.
//
// Also emits a Netlify-Cache-Tag so we can purge by tag via the API.
const DURABLE_CACHE_1H =
  "public, s-maxage=3600, stale-while-revalidate=86400, durable";

export default async (request: Request, context: Context) => {
  const response = await context.next();

  // Only override on HTML responses (skip assets, JSON, etc.)
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  const newResponse = new Response(response.body, response);
  newResponse.headers.set("Netlify-CDN-Cache-Control", DURABLE_CACHE_1H);
  newResponse.headers.set("Netlify-Cache-Tag", "page");
  return newResponse;
};

export const config = {
  path: ["/", "/reviews/*"],
};
