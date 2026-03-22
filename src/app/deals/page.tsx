import Link from "next/link";
import { getAllReviews } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usdToIls, parseUsdPrice, categoryEmoji } from "@/lib/utils";

export const metadata = {
  title: "מבצעים חמים מאליאקספרס | משתלם",
  description: "מבצעים והנחות חמות מאליאקספרס — המחירים הכי נמוכים שמצאנו",
  alternates: { canonical: "https://meshtalem.design-dc.com/deals" },
};

interface DealItem {
  name: string;
  price: string;
  priceNum: number;
  priceIls: string;
  rating: number;
  affiliateUrl: string;
  reviewSlug: string;
  reviewTitle: string;
  category: string;
}

export default function DealsPage() {
  const reviews = getAllReviews();

  // Extract all products with their review context, sort by price ascending
  const allDeals: DealItem[] = [];
  for (const r of reviews) {
    for (const p of r.meta.products || []) {
      const priceNum = parseUsdPrice(p.price);
      if (priceNum > 0) {
        allDeals.push({
          name: p.name,
          price: p.price,
          priceNum,
          priceIls: usdToIls(p.price),
          rating: p.rating,
          affiliateUrl: p.affiliateUrl,
          reviewSlug: r.meta.slug,
          reviewTitle: r.meta.title,
          category: r.meta.category,
        });
      }
    }
  }

  allDeals.sort((a, b) => a.priceNum - b.priceNum);
  const topDeals = allDeals.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-bl from-gray-900 via-gray-800 to-gray-900 text-white py-12 md:py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="max-w-6xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 text-sm font-bold px-4 py-1.5 rounded-full mb-4 border border-red-500/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.51 6.51 0 007.5 12a1.5 1.5 0 001.5-1.5 6.5 6.5 0 016.362-6.286z" />
            </svg>
            🔥 מבצעים
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            המבצעים הכי שווים עכשיו
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            המוצרים הכי זולים שמצאנו בסקירות שלנו — במחירים שלא תמצאו בארץ
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 md:py-12">
        {topDeals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-6">מבצעים חדשים בקרוב...</p>
            <Link
              href="/reviews"
              className="cursor-pointer inline-block bg-gradient-to-l from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
            >
              בינתיים, גלו את הסקירות שלנו
            </Link>
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-500 mb-6 font-medium">
              {topDeals.length} מבצעים מובילים — מסודרים מהזול ליקר
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {topDeals.map((deal, i) => (
                <div
                  key={`${deal.reviewSlug}-${i}`}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col"
                >
                  {/* Top badge area */}
                  <div className="bg-gradient-to-l from-orange-50 to-red-50 px-5 pt-4 pb-3 flex items-center justify-between">
                    <span className="text-2xl">{categoryEmoji[deal.category] || "📦"}</span>
                    {i === 0 && (
                      <span className="text-xs bg-red-500 text-white px-2.5 py-1 rounded-full font-bold shadow-sm">
                        💰 הכי זול
                      </span>
                    )}
                    {i === 1 && (
                      <span className="text-xs bg-orange-500 text-white px-2.5 py-1 rounded-full font-bold shadow-sm">
                        🔥 מומלץ
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold leading-snug mb-2 line-clamp-2">{deal.name}</h3>
                    
                    {/* Price */}
                    <div className="flex items-end gap-2 mb-3">
                      <span className="text-3xl font-extrabold text-orange-500">₪{deal.priceIls}</span>
                      <span className="text-sm text-gray-400 mb-1" dir="ltr">{deal.price}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="flex" dir="ltr">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg
                            key={s}
                            className={`w-4 h-4 ${s <= Math.round(deal.rating) ? "text-yellow-400" : "text-gray-200"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 font-medium">{deal.rating}/5</span>
                    </div>

                    {/* From review */}
                    <p className="text-xs text-gray-400 mb-4 line-clamp-1">מתוך: {deal.reviewTitle}</p>

                    {/* Actions */}
                    <div className="mt-auto flex gap-2">
                      <a
                        href={deal.affiliateUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener"
                        className="flex-1 cursor-pointer text-center bg-gradient-to-l from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm"
                      >
                        צפה בפרטים
                      </a>
                      <Link
                        href={`/reviews/${deal.reviewSlug}`}
                        className="cursor-pointer text-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-200"
                      >
                        לסקירה המלאה
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA to see all reviews */}
            <div className="text-center mt-12">
              <Link
                href="/reviews"
                className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-l from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                לכל הסקירות
              </Link>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
