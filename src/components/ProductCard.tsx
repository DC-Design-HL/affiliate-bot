import { Product } from "@/lib/content";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ms-1">{rating}</span>
    </div>
  );
}

function BestsellerBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
      </svg>
      בסט סלר
    </span>
  );
}

export default function ProductCard({ product, rank }: { product: Product; rank: number }) {
  const isTop = rank === 1;

  return (
    <div className={`relative bg-white border rounded-xl p-5 flex flex-col gap-3 hover:shadow-lg transition-all duration-200 ${isTop ? "border-[var(--color-primary)] ring-2 ring-orange-100" : "border-gray-200"}`}>
      {/* Top pick ribbon */}
      {isTop && (
        <div className="absolute -top-3 start-4 bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          הבחירה שלנו
        </div>
      )}

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <span className="bg-orange-100 text-[var(--color-primary)] font-bold text-sm px-3 py-1 rounded-full">
            #{rank}
          </span>
          {isTop && <BestsellerBadge />}
        </div>
        <span className="text-2xl font-extrabold text-green-600" dir="ltr">
          {product.price}
        </span>
      </div>

      <h3 className="text-lg font-bold leading-snug">{product.name}</h3>

      <div className="flex items-center gap-3">
        <Stars rating={product.rating} />
        <span className="text-xs text-gray-400">(2.3K+ דירוגים)</span>
      </div>

      {/* Urgency cue */}
      <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
        </svg>
        מחיר מבצע — לזמן מוגבל
      </div>

      {/* Trust signals */}
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          משלוח חינם
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          הגנת קונה
        </span>
      </div>

      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="cursor-pointer bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-center py-3.5 rounded-lg font-bold transition-colors duration-200 mt-auto flex items-center justify-center gap-2 text-base shadow-sm hover:shadow-md"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        לרכישה באליאקספרס
      </a>
    </div>
  );
}
