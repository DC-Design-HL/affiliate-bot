import { getAllReviews, getReviewBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import ProductCard from "@/components/ProductCard";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllReviews().map((r) => ({ slug: r.meta.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return {};
  return {
    title: `${review.meta.title} | משתלם`,
    description: review.meta.seo?.description || review.meta.excerpt,
    keywords: review.meta.seo?.keywords,
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) notFound();

  const topProduct = review.meta.products?.[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 md:py-12 pb-24 md:pb-12">
        <article>
          {/* Breadcrumb-like category tag */}
          <div className="mb-4">
            <span className="text-xs bg-orange-100 text-[var(--color-primary)] px-3 py-1 rounded-full font-medium">
              סקירה
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">{review.meta.title}</h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              {new Date(review.meta.date).toLocaleDateString("he-IL")}
            </span>
            {review.meta.updated !== review.meta.date && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
                עודכן: {new Date(review.meta.updated).toLocaleDateString("he-IL")}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              {review.meta.products?.length || 0} מוצרים
            </span>
          </div>

          {/* Products Grid */}
          {review.meta.products && review.meta.products.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                דירוג המוצרים
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {review.meta.products.map((p, i) => (
                  <ProductCard key={i} product={p} rank={i + 1} />
                ))}
              </div>
            </section>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline">
            <MDXRemote source={review.content} />
          </div>
        </article>
      </main>

      {/* Sticky mobile CTA for top product */}
      {topProduct && (
        <StickyMobileCTA affiliateUrl={topProduct.affiliateUrl} productName={topProduct.name} />
      )}

      <Footer />
    </div>
  );
}
