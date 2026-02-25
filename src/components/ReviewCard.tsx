import Link from "next/link";
import { ReviewMeta } from "@/lib/content";

const categoryNames: Record<string, string> = {
  electronics: "אלקטרוניקה",
  "home-garden": "בית וגן",
  fashion: "אופנה",
  "beauty-health": "יופי ובריאות",
  sports: "ספורט",
  "toys-kids": "צעצועים וילדים",
  automotive: "רכב",
  tools: "כלי עבודה",
  gaming: "גיימינג",
  kitchen: "מטבח",
};

export default function ReviewCard({ review }: { review: ReviewMeta }) {
  return (
    <Link href={`/reviews/${review.slug}`} className="group">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
        <div className="bg-gradient-to-bl from-orange-50 to-amber-50 h-40 flex items-center justify-center">
          <span className="text-5xl">📦</span>
        </div>
        <div className="p-5">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {categoryNames[review.category] || review.category}
          </span>
          <h3 className="text-lg font-bold mt-2 group-hover:text-[var(--color-primary)] transition-colors">
            {review.title}
          </h3>
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">{review.excerpt}</p>
          <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
            <span>{review.products?.length || 0} מוצרים</span>
            <span>{new Date(review.date).toLocaleDateString("he-IL")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
