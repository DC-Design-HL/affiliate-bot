import { Product } from "@/lib/content";
import { usdToIls } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 ms-1.5 font-bold">{rating}</span>
    </div>
  );
}

// Deterministic "order count" from product name hash
function getOrderCount(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  const count = 5000 + Math.abs(hash % 25000);
  if (count >= 10000) return `${(count / 1000).toFixed(0)}K+`;
  return `${(count / 1000).toFixed(1)}K+`;
}

export default function ProductCard({ product, rank }: { product: Product; rank: number }) {
  const isTop = rank === 1;
  const ilsPrice = usdToIls(product.price);
  const orderCount = getOrderCount(product.name);

  return (
    <div className={`relative bg-white border-2 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col ${isTop ? "border-orange-400 ring-4 ring-orange-100" : "border-gray-200 hover:border-orange-300"}`}>
      {/* Crown ribbon for #1 */}
      {isTop && (
        <div className="bg-gradient-to-l from-orange-500 to-red-500 text-white text-center py-2 text-sm font-bold flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm0 2h14v2H5v-2z"/></svg>
          הבחירה שלנו
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Rank + Price row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className={`font-extrabold text-lg w-10 h-10 rounded-full flex items-center justify-center ${isTop ? "bg-gradient-to-bl from-orange-500 to-red-500 text-white shadow-md" : "bg-gray-100 text-gray-700"}`}>
              #{rank}
            </span>
          </div>
          <div className="text-left">
            <div className="text-3xl font-extrabold text-gray-900">
              ₪{ilsPrice}
            </div>
            <div className="text-sm text-gray-400 font-medium" dir="ltr">
              {product.price}
            </div>
          </div>
        </div>

        {/* Product name */}
        <h3 className="text-base font-bold leading-snug">{product.name}</h3>

        {/* Rating + orders */}
        <div className="flex items-center gap-3 flex-wrap">
          <Stars rating={product.rating} />
          <span className="text-xs text-gray-400 border-r border-gray-200 pr-3">({orderCount} הזמנות)</span>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full border border-green-200">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            משלוח חינם
          </span>
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            הגנת קונה
          </span>
          {isTop && (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" /></svg>
              בסט סלר
            </span>
          )}
        </div>

        {/* Urgency */}
        <div className="flex items-center gap-1.5 text-xs text-red-600 font-bold bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          מחיר מבצע — לזמן מוגבל!
        </div>

        {/* CTA */}
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          className={`cursor-pointer text-white text-center py-4 rounded-xl font-bold transition-all duration-200 mt-auto flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] ${isTop ? "bg-gradient-to-l from-orange-500 to-red-500 cta-glow" : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          קנו עכשיו ב-₪{ilsPrice}
        </a>
      </div>
    </div>
  );
}
