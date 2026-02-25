import { getAllReviews, getReviewBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import ProductCard from "@/components/ProductCard";
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <article>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{review.meta.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
            <span>📅 {new Date(review.meta.date).toLocaleDateString("he-IL")}</span>
            {review.meta.updated !== review.meta.date && (
              <span>🔄 עודכן: {new Date(review.meta.updated).toLocaleDateString("he-IL")}</span>
            )}
            <span>📦 {review.meta.products?.length || 0} מוצרים</span>
          </div>

          {/* Products Grid */}
          {review.meta.products && review.meta.products.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {review.meta.products.map((p, i) => (
                <ProductCard key={i} product={p} rank={i + 1} />
              ))}
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-[var(--color-primary)]">
            <MDXRemote source={review.content} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
