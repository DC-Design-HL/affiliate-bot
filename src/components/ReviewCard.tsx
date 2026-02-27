import Link from "next/link";
import { ReviewMeta } from "@/lib/content";
import { usdToIls, categoryNames, categoryEmoji } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({ review }: { review: ReviewMeta }) {
  const productCount = review.products?.length || 0;
  const topProduct = review.products?.[0];
  const avgRating = review.products?.length
    ? (review.products.reduce((sum, p) => sum + p.rating, 0) / review.products.length).toFixed(1)
    : null;
  const lowestPrice = review.products?.length
    ? review.products.reduce((min, p) => {
        const val = parseFloat(p.price.replace(/[^0-9.]/g, ""));
        return val < min ? val : min;
      }, Infinity)
    : null;

  return (
    <Link href={`/reviews/${review.slug}`} className="group cursor-pointer block">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-orange-300 transition-all duration-300 h-full flex flex-col">
        {/* Top section with category gradient */}
        <div className="relative bg-gradient-to-bl from-orange-50 via-amber-50 to-yellow-50 px-5 pt-5 pb-4">
          <div className="flex items-start justify-between">
            <span className="text-3xl">{categoryEmoji[review.category] || "📦"}</span>
            {lowestPrice && lowestPrice < Infinity && (
              <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                החל מ-₪{usdToIls(`$${lowestPrice}`)}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs bg-white/80 text-gray-600 px-2.5 py-1 rounded-full font-medium backdrop-blur-sm">
              {categoryNames[review.category] || review.category}
            </span>
            {productCount >= 5 && (
              <span className="text-xs bg-orange-500 text-white px-2.5 py-1 rounded-full font-bold">
                TOP {productCount}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold leading-snug group-hover:text-[var(--color-primary)] transition-colors duration-200">
            {review.title}
          </h3>
          <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">{review.excerpt}</p>

          {/* Stats row */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 mt-auto">
            {avgRating && (
              <div className="flex items-center gap-1.5">
                <Stars rating={parseFloat(avgRating)} />
                <span className="font-medium text-gray-700">{avgRating}</span>
              </div>
            )}
            <span className="flex items-center gap-1 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              {productCount} מוצרים
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
