import { getAllReviews, getReviewBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import ProductCard from "@/components/ProductCard";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewCard from "@/components/ReviewCard";
import ShareButtons from "@/components/ShareButtons";
import CopyLinkButton from "@/components/CopyLinkButton";
import RelatedArticles from "@/components/RelatedArticles";
import { notFound } from "next/navigation";
import { usdToIls, categoryNames } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

// Extract FAQ from content for schema
function extractFAQFromContent(content: string) {
  const faqRegex = /\*\*שאלה:\*\*\s*([^*]+)\s*\*\*תשובה:\*\*\s*([^*]+?)(?=\*\*שאלה:|$)/g;
  const faqs = [];
  let match;
  
  while ((match = faqRegex.exec(content)) !== null) {
    faqs.push({
      "@type": "Question",
      "name": match[1].trim(),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": match[2].trim()
      }
    });
  }
  
  return faqs;
}

export function generateStaticParams() {
  return getAllReviews().map((r) => ({ slug: r.meta.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return {};
  const url = `https://meshtalem.design-dc.com/reviews/${slug}`;
  const ogImageUrl = `https://meshtalem.design-dc.com/api/og?title=${encodeURIComponent(review.meta.title)}&category=${encodeURIComponent(review.meta.category)}`;
  return {
    title: `${review.meta.title} | משתלם`,
    description: review.meta.seo?.description || review.meta.excerpt,
    keywords: review.meta.seo?.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: review.meta.title,
      description: review.meta.seo?.description || review.meta.excerpt,
      url,
      type: "article",
      locale: "he_IL",
      siteName: "משתלם",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: review.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: review.meta.title,
      description: review.meta.seo?.description || review.meta.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) notFound();

  const topProduct = review.meta.products?.[0];
  const allReviews = getAllReviews();
  const relatedReviews = allReviews
    .filter((r) => r.meta.slug !== slug && r.meta.category === review.meta.category)
    .slice(0, 3);
  const otherReviews = relatedReviews.length < 3
    ? [...relatedReviews, ...allReviews.filter((r) => r.meta.slug !== slug && r.meta.category !== review.meta.category).slice(0, 3 - relatedReviews.length)]
    : relatedReviews;

  // JSON-LD structured data
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: review.meta.title,
    description: review.meta.seo?.description || review.meta.excerpt,
    datePublished: review.meta.date,
    dateModified: review.meta.updated || review.meta.date,
    author: { "@type": "Organization", name: "משתלם" },
    publisher: { "@type": "Organization", name: "משתלם", url: "https://meshtalem.design-dc.com" },
    url: `https://meshtalem.design-dc.com/reviews/${slug}`,
  };

  // Add FAQ schema for guide articles
  const faqJsonLd = review.meta.category === 'guides' && review.content.includes('שאלה:') ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": extractFAQFromContent(review.content)
  } : null;

  // Add Product+Review schema if products exist
  const productJsonLd = review.meta.products?.map((p, i) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    review: {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: p.rating, bestRating: 5 },
      author: { "@type": "Organization", name: "משתלם" },
      reviewBody: review.meta.excerpt,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: p.rating,
      bestRating: 5,
      ratingCount: 1,
    },
    offers: {
      "@type": "Offer",
      url: p.affiliateUrl,
      priceCurrency: "USD",
      price: parseFloat(p.price.replace(/[^0-9.]/g, "")) || 0,
      availability: "https://schema.org/InStock",
    },
    ...(i === 0 ? { position: 1 } : {}),
  })) || [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {productJsonLd.map((p, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(p) }} />
      ))}
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <Header />
      <main className="flex-1 pb-24 md:pb-12">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-[var(--color-primary)] cursor-pointer">ראשי</Link>
            <span>/</span>
            <Link href="/reviews" className="hover:text-[var(--color-primary)] cursor-pointer">סקירות</Link>
            <span>/</span>
            <Link href={`/category/${review.meta.category}`} className="hover:text-[var(--color-primary)] cursor-pointer">
              {categoryNames[review.meta.category] || review.meta.category}
            </Link>
          </nav>
        </div>

        {/* Hero */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs bg-gradient-to-l from-orange-500 to-red-500 text-white px-3 py-1 rounded-full font-bold">
                סקירה מקצועית
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                ✅ נבדק ומאומת
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                {categoryNames[review.meta.category] || review.meta.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">{review.meta.title}</h1>

            {/* Inline share buttons */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-500 font-medium">אהבתם? שתפו!</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${review.meta.title} - https://meshtalem.design-dc.com/reviews/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                </svg>
                WhatsApp
              </a>
              <CopyLinkButton url={`https://meshtalem.design-dc.com/reviews/${slug}`} />
            </div>

            <p className="text-lg text-gray-500 mb-6 leading-relaxed">{review.meta.excerpt}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {new Date(review.meta.date).toLocaleDateString("he-IL")}
              </span>
              {review.meta.updated && review.meta.updated !== review.meta.date ? (
                <span className="flex items-center gap-1.5 text-green-600 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                  </svg>
                  📅 עודכן לאחרונה: {new Date(review.meta.updated).toLocaleDateString("he-IL")}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-gray-500">
                  📅 עודכן לאחרונה: {new Date(review.meta.date).toLocaleDateString("he-IL")}
                </span>
              )}
              <span className="flex items-center gap-1.5 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                {review.meta.products?.length || 0} מוצרים נבדקו
              </span>
            </div>
            
            {/* Trust reminder */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700 flex items-center gap-2">
                <span>🔒</span>
                <strong>קנייה בטוחה:</strong> הגנת קונה מלאה מאליאקספרס + זכות החזרה לכל מוצר
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <article>
            {/* Quick comparison table */}
            {review.meta.products && review.meta.products.length > 1 && (
              <section className="mb-10 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-l from-orange-500 to-red-500 text-white px-6 py-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                    טבלת השוואה מהירה
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="text-right px-4 py-3 font-bold">#</th>
                        <th className="text-right px-4 py-3 font-bold">מוצר</th>
                        <th className="text-right px-4 py-3 font-bold">מחיר</th>
                        <th className="text-right px-4 py-3 font-bold">דירוג</th>
                        <th className="text-center px-4 py-3 font-bold"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {review.meta.products.map((p, i) => (
                        <tr key={i} className={`border-b border-gray-50 hover:bg-orange-50 transition-colors ${i === 0 ? "bg-orange-50/50" : ""}`}>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${i === 0 ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                              {i + 1}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium max-w-48">
                            <div className="truncate">{p.name}</div>
                            {i === 0 && <span className="text-xs text-orange-600 font-bold">הבחירה שלנו</span>}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-extrabold text-gray-900">₪{usdToIls(p.price)}</div>
                            <div className="text-xs text-gray-400" dir="ltr">{p.price}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1" dir="ltr">
                              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-bold">{p.rating}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="space-y-2">
                              <a
                                href={p.affiliateUrl}
                                target="_blank"
                                rel="nofollow sponsored noopener"
                                className="inline-block cursor-pointer bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                              >
                                צפה בפרטים
                              </a>
                              {i === 0 && (
                                <div className="text-xs text-green-600 font-medium">🔒 קנייה מוגנת</div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Products Grid */}
            {review.meta.products && review.meta.products.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  דירוג המוצרים
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  {review.meta.products.map((p, i) => (
                    <ProductCard key={i} product={p} rank={i + 1} />
                  ))}
                </div>
              </section>
            )}

            {/* Article Content */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
              <div className="prose prose-lg max-w-none prose-headings:font-extrabold prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                <MDXRemote source={review.content} />
              </div>
            </div>

            {/* Trust section */}
            <section className="mt-10 bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                למה לסמוך עלינו?
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl">🔍</div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">בדיקה מעמיקה</h3>
                    <p className="text-xs text-gray-500">בודקים דירוגים, כמות מכירות, ותלונות של קונים אמיתיים</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl">🔗</div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">לינקים ישירים</h3>
                    <p className="text-xs text-gray-500">כל הקישורים מובילים ישירות למוכר באליאקספרס</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl">🔄</div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">עדכון שוטף</h3>
                    <p className="text-xs text-gray-500">המחירים והקישורים מתעדכנים באופן קבוע</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Share buttons */}
            <section className="mt-10">
              <ShareButtons 
                title={review.meta.title}
                url={`https://meshtalem.design-dc.com/reviews/${slug}`}
              />
            </section>

            {/* Related articles from same category */}
            {relatedReviews.length > 0 && (
              <section className="mt-10">
                <RelatedArticles articles={relatedReviews.map(r => r.meta)} />
              </section>
            )}

            {/* Related reviews */}
            {otherReviews.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-extrabold mb-6">סקירות נוספות שיעניינו אתכם</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {otherReviews.map((r) => (
                    <ReviewCard key={r.meta.slug} review={r.meta} />
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </main>

      {topProduct && (
        <StickyMobileCTA affiliateUrl={topProduct.affiliateUrl} productName={topProduct.name} />
      )}

      <Footer />
    </div>
  );
}
