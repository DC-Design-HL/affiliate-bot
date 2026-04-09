import Link from "next/link";
import { getAllReviews, getAllCategories } from "@/lib/content";
import ReviewCard from "@/components/ReviewCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usdToIls, categoryNames, categoryEmoji } from "@/lib/utils";

const categories = [
  { name: "אלקטרוניקה", slug: "electronics", emoji: "🎧" },
  { name: "בית וגן", slug: "home-garden", emoji: "🏠" },
  { name: "גיימינג", slug: "gaming", emoji: "🎮" },
  { name: "רכב", slug: "automotive", emoji: "🚗" },
  { name: "מטבח", slug: "kitchen", emoji: "🍳" },
  { name: "ספורט", slug: "sports", emoji: "⚽" },
];

export default function Home() {
  const reviews = getAllReviews();
  const latestReviews = reviews.slice(0, 6);
  const allCategories = getAllCategories();

  // Find "deal of the day" — review with highest rated product
  const dealOfDay = reviews.reduce((best, r) => {
    const topProduct = r.meta.products?.[0];
    if (!topProduct) return best;
    if (!best || topProduct.rating > (best.meta.products?.[0]?.rating || 0)) return r;
    return best;
  }, reviews[0]);

  const dealProduct = dealOfDay?.meta.products?.[0];

  // Count products per category
  const categoryCounts: Record<string, number> = {};
  for (const r of reviews) {
    categoryCounts[r.meta.category] = (categoryCounts[r.meta.category] || 0) + (r.meta.products?.length || 0);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero — Deal of the Day */}
      <section className="bg-gradient-to-bl from-gray-900 via-gray-800 to-gray-900 text-white py-12 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.51 6.51 0 007.5 12a1.5 1.5 0 001.5-1.5 6.5 6.5 0 016.362-6.286z" />
                </svg>
                הדיל היומי
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                המוצרים הכי משתלמים
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-400 to-yellow-300">
                  מאליאקספרס
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
                סקירות מקצועיות בעברית, השוואות מחירים, וטיפים לקנייה חכמה.
                חוסכים לכם את הזמן — אנחנו כבר בדקנו.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/reviews"
                  className="cursor-pointer bg-gradient-to-l from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  גלו את הסקירות
                </Link>
                <Link
                  href="/deals"
                  className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl font-bold text-lg transition-all duration-200 backdrop-blur-sm border border-white/20"
                >
                  🔥 מבצעים חמים
                </Link>
              </div>
            </div>

            {/* Deal highlight card */}
            {dealProduct && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-sm text-orange-300 font-bold mb-2">🏆 המומלץ ביותר היום</div>
                <h3 className="text-xl font-bold mb-3">{dealProduct.name}</h3>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-4xl font-extrabold text-orange-400">₪{usdToIls(dealProduct.price)}</span>
                  <span className="text-lg text-gray-400" dir="ltr">{dealProduct.price}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex" dir="ltr">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className={`w-5 h-5 ${i <= Math.round(dealProduct.rating) ? "text-yellow-400" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-300">{dealProduct.rating}/5</span>
                </div>
                <Link
                  href={`/reviews/${dealOfDay.meta.slug}`}
                  className="cursor-pointer block text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-all duration-200 shadow-md"
                >
                  לסקירה המלאה
                </Link>
              </div>
            )}
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-orange-400">{reviews.length}+</div>
              <div className="text-sm text-gray-400">סקירות מקצועיות</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-orange-400">
                {reviews.reduce((sum, r) => sum + (r.meta.products?.length || 0), 0)}+
              </div>
              <div className="text-sm text-gray-400">מוצרים נבדקו</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-orange-400">{allCategories.length}</div>
              <div className="text-sm text-gray-400">קטגוריות</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold">קטגוריות פופולריות</h2>
          <Link href="/reviews" className="text-sm text-[var(--color-primary)] font-bold hover:underline cursor-pointer">
            הכל &larr;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => {
            const count = categoryCounts[cat.slug] || 0;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-2xl p-4 text-center transition-all duration-200 cursor-pointer hover:shadow-md group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">{cat.emoji}</div>
                <div className="font-bold text-sm">{cat.name}</div>
                {count > 0 && (
                  <div className="text-xs text-gray-400 mt-1">{count} מוצרים</div>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bestsellers / Latest Reviews */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold flex items-center gap-2">
              <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.51 6.51 0 007.5 12a1.5 1.5 0 001.5-1.5 6.5 6.5 0 016.362-6.286z"/></svg>
              הנמכרים ביותר
            </h2>
            <Link href="/reviews" className="text-sm text-[var(--color-primary)] font-bold hover:underline cursor-pointer">
              כל הסקירות &larr;
            </Link>
          </div>
          {latestReviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestReviews.map((r, i) => (
                <ReviewCard key={r.meta.slug} review={r.meta} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">סקירות חדשות בקרוב...</p>
          )}
        </div>
      </section>

      {/* Quick links / Call to action */}
      <section className="bg-gradient-to-l from-orange-500 to-red-500 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
            מצאו את המוצר המושלם
          </h2>
          <p className="text-orange-100 mb-6">
            סקרנו מאות מוצרים — כדי שתבחרו נכון
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Link
              href="/reviews" 
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3.5 rounded-xl font-bold transition-colors duration-200 text-center cursor-pointer"
            >
              גלו את הסקירות
            </Link>
            <Link
              href="/deals"
              className="flex-1 bg-white/20 hover:bg-white/30 text-white px-6 py-3.5 rounded-xl font-bold transition-colors duration-200 text-center backdrop-blur-sm cursor-pointer"
            >
              מבצעים חמים
            </Link>
          </div>
          <p className="text-xs text-orange-200 mt-3">סקירות מקצועיות בעברית — חינם לגמרי</p>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold mb-8">למה לסמוך על משתלם?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gray-50">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-bold mb-2">בדיקה מעמיקה</h3>
              <p className="text-sm text-gray-500">אנחנו בודקים כל מוצר — דירוגים, מכירות, תלונות, ואיכות אמיתית</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold mb-2">מחירים בשקלים</h3>
              <p className="text-sm text-gray-500">כל המחירים מוצגים בשקלים ובדולר — בלי הפתעות</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50">
              <div className="text-3xl mb-3">🇮🇱</div>
              <h3 className="font-bold mb-2">מותאם לישראלים</h3>
              <p className="text-sm text-gray-500">סקירות בעברית, עם דגש על משלוח לישראל והגנת קונה</p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal links — prominently accessible from homepage */}
      <div className="bg-gray-100 border-t border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-6 text-sm text-gray-600">
          <Link href="/privacy" className="hover:text-gray-900 underline cursor-pointer">מדיניות פרטיות</Link>
          <span className="text-gray-300">|</span>
          <Link href="/terms" className="hover:text-gray-900 underline cursor-pointer">תנאי שימוש</Link>
          <span className="text-gray-300">|</span>
          <a href="mailto:info@design-dc.com" className="hover:text-gray-900 underline">צרו קשר</a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
