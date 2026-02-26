import { getAllReviews, getReviewBySlug } from "@/lib/content";
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
  const bestProduct = review.meta.products?.[0];
  return {
    title: `🔥 ${review.meta.title} | משתלם`,
    description: review.meta.excerpt,
    openGraph: {
      title: `🔥 ${review.meta.title}`,
      description: `${bestProduct?.name} רק ${bestProduct?.price}! ${review.meta.excerpt}`,
      type: "article",
      locale: "he_IL",
      siteName: "משתלם",
      url: `https://meshtalem.netlify.app/promo/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `🔥 ${review.meta.title}`,
      description: `${bestProduct?.name} רק ${bestProduct?.price}!`,
    },
  };
}

export default async function PromoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) notFound();

  const products = review.meta.products || [];
  const topProduct = products[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Promo Banner */}
        <section className="bg-gradient-to-bl from-red-600 to-orange-500 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-4">🔥</div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              {review.meta.title}
            </h1>
            <p className="text-xl opacity-90 mb-6">{review.meta.excerpt}</p>
            {topProduct && (
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 inline-block">
                <p className="text-lg">המוצר #1 שלנו:</p>
                <p className="text-2xl font-extrabold">{topProduct.name?.substring(0, 40)}</p>
                <p className="text-4xl font-extrabold mt-2">{topProduct.price} בלבד!</p>
              </div>
            )}
          </div>
        </section>

        {/* Products */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8 text-center">🏆 הטופ 5 שלנו</h2>
          <div className="space-y-4">
            {products.map((p, i) => (
              <div key={i} className="bg-white border-2 border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-orange-400 transition-all">
                <div className="flex items-center gap-4">
                  <span className="bg-orange-100 text-orange-600 font-extrabold text-lg w-10 h-10 rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg">{p.name?.substring(0, 45)}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>⭐ {p.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-extrabold text-green-600" dir="ltr">{p.price}</p>
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="inline-block mt-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg font-bold transition-colors"
                  >
                    🛒 לרכישה
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-50 py-12 px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">רוצים לקרוא את הסקירה המלאה?</h2>
          <a
            href={`/reviews/${slug}`}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-xl font-bold transition-colors"
          >
            לסקירה המלאה ←
          </a>
        </section>

        {/* Share */}
        <section className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-xl font-bold mb-4">שתפו את הדיל! 🎉</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`🔥 ${review.meta.title}\n${topProduct?.name} רק ${topProduct?.price}!\nhttps://meshtalem.netlify.app/promo/${slug}`)}`}
              target="_blank"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              📱 WhatsApp
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(`https://meshtalem.netlify.app/promo/${slug}`)}&text=${encodeURIComponent(`🔥 ${review.meta.title}`)}`}
              target="_blank"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              ✈️ Telegram
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://meshtalem.netlify.app/promo/${slug}`)}`}
              target="_blank"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              📘 Facebook
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
