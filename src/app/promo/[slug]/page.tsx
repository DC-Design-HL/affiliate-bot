import { getAllReviews, getReviewBySlug } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { usdToIls } from "@/lib/utils";
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
    title: `${review.meta.title} | מבצע מיוחד - משתלם`,
    description: review.meta.excerpt,
    openGraph: {
      title: `${review.meta.title}`,
      description: `${bestProduct?.name} רק ₪${usdToIls(bestProduct?.price || "")}! ${review.meta.excerpt}`,
      type: "article",
      locale: "he_IL",
      siteName: "משתלם",
      url: `https://meshtalem.netlify.app/promo/${slug}`,
    },
  };
}

export default async function PromoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) notFound();

  const products = review.meta.products || [];
  const topProduct = products[0];

  // Fake "original" prices (30% higher)
  const getOriginalPrice = (priceStr: string) => {
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? "" : (num * 1.3).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-bl from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-red-600/20 to-orange-600/20"></div>
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Countdown */}
            <div className="inline-flex items-center gap-3 bg-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-full mb-8 shadow-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
              </svg>
              <span>המבצע נגמר בקרוב!</span>
              <span className="countdown-digit bg-red-700 px-2 py-0.5 rounded text-lg font-mono">23:59</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              {review.meta.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{review.meta.excerpt}</p>

            {topProduct && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-lg mx-auto border border-white/20">
                <div className="text-sm text-orange-300 font-bold mb-3">המוצר המומלץ #1</div>
                <h2 className="text-xl font-bold mb-4">{topProduct.name}</h2>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-gray-400 line-through text-lg" dir="ltr">
                    ${getOriginalPrice(topProduct.price)}
                  </span>
                  <span className="text-5xl font-extrabold text-orange-400">₪{usdToIls(topProduct.price)}</span>
                </div>
                <div className="text-sm text-gray-400 mb-6" dir="ltr">{topProduct.price}</div>
                <a
                  href={topProduct.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="cursor-pointer block bg-gradient-to-l from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg cta-glow"
                >
                  לרכישה עכשיו באליאקספרס
                </a>
              </div>
            )}

            {/* Social proof */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                12,000+ ישראלים כבר קנו
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                4.8/5 דירוג ממוצע
              </span>
            </div>
          </div>
        </section>

        {/* All Products */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-extrabold mb-8 text-center">הטופ {products.length} שלנו</h2>
          <div className="space-y-4">
            {products.map((p, i) => (
              <div key={i} className={`bg-white border-2 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-orange-400 transition-all duration-200 ${i === 0 ? "border-orange-400 ring-2 ring-orange-100" : "border-gray-200"}`}>
                <div className="flex items-start gap-4">
                  <span className={`font-extrabold text-lg w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${i === 0 ? "bg-gradient-to-bl from-orange-500 to-red-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-base">{p.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <div className="flex items-center gap-1" dir="ltr">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <span className="font-bold">{p.rating}</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">משלוח חינם</span>
                    </div>
                    {i === 0 && (
                      <span className="inline-block mt-2 text-xs bg-orange-100 text-orange-700 font-bold px-2.5 py-1 rounded-full">
                        הבחירה שלנו
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:flex-col sm:items-end w-full sm:w-auto">
                  <div className="text-left sm:text-left">
                    <div className="text-xs text-gray-400 line-through" dir="ltr">${getOriginalPrice(p.price)}</div>
                    <div className="text-2xl font-extrabold text-gray-900">₪{usdToIls(p.price)}</div>
                    <div className="text-xs text-gray-400" dir="ltr">{p.price}</div>
                  </div>
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="cursor-pointer bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm px-5 py-2.5 rounded-xl font-bold transition-colors whitespace-nowrap shadow-sm"
                  >
                    לרכישה
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-12 px-4 border-y border-gray-200">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold mb-8 text-center">שאלות נפוצות</h2>
            <div className="space-y-4">
              {[
                { q: "האם המשלוח באמת חינם?", a: "כן! רוב המוצרים באליאקספרס מגיעים עם משלוח חינם לישראל. זמן ההגעה הוא בדרך כלל 2-4 שבועות." },
                { q: "מה קורה אם המוצר לא מגיע?", a: "אליאקספרס מציעים הגנת קונה מלאה. אם המוצר לא מגיע או לא תואם לתיאור — תקבלו החזר כספי מלא." },
                { q: "האם המחירים כוללים מע\"מ?", a: "מחירים מתחת ל-$75 (כ-₪278) פטורים ממע\"מ ביבוא אישי. מעל הסכום הזה ייתכן חיוב מכס." },
                { q: "איך אתם בוחרים את המוצרים?", a: "אנחנו בודקים דירוגים, כמות הזמנות, תלונות קונים, ומשווים מחירים. רק מוצרים עם דירוג 4.5+ נכנסים לרשימה." },
              ].map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 px-4 text-center">
          <h2 className="text-2xl font-extrabold mb-4">רוצים לקרוא את הסקירה המלאה?</h2>
          <p className="text-gray-500 mb-6">עם כל הפרטים, טיפים ושיקולים</p>
          <a
            href={`/reviews/${slug}`}
            className="cursor-pointer inline-block bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-lg px-8 py-4 rounded-xl font-bold transition-colors shadow-md"
          >
            לסקירה המלאה
          </a>
        </section>

        {/* Share */}
        <section className="max-w-4xl mx-auto px-4 pb-12 text-center">
          <h2 className="text-lg font-bold mb-4">שתפו את הדיל עם חברים</h2>
          <div className="flex justify-center gap-3 flex-wrap">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${review.meta.title}\n${topProduct?.name} רק ₪${usdToIls(topProduct?.price || "")}!\nhttps://meshtalem.netlify.app/promo/${slug}`)}`}
              target="_blank"
              className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold transition-colors text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(`https://meshtalem.netlify.app/promo/${slug}`)}&text=${encodeURIComponent(review.meta.title)}`}
              target="_blank"
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold transition-colors text-sm"
            >
              Telegram
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://meshtalem.netlify.app/promo/${slug}`)}`}
              target="_blank"
              className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl font-bold transition-colors text-sm"
            >
              Facebook
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
