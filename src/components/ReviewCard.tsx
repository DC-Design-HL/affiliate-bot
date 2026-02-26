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

const categoryIcons: Record<string, React.ReactNode> = {
  electronics: (
    <svg className="w-10 h-10 text-[var(--color-primary)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
  ),
  gaming: (
    <svg className="w-10 h-10 text-[var(--color-primary)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875S10.5 3.089 10.5 4.125c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.007-1.875 2.25-1.875s2.25.84 2.25 1.875c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" /></svg>
  ),
};

const defaultIcon = (
  <svg className="w-10 h-10 text-[var(--color-primary)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
);

export default function ReviewCard({ review }: { review: ReviewMeta }) {
  const productCount = review.products?.length || 0;

  return (
    <Link href={`/reviews/${review.slug}`} className="group cursor-pointer">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-200">
        <div className="bg-gradient-to-bl from-orange-50 to-amber-50 h-36 flex items-center justify-center">
          {categoryIcons[review.category] || defaultIcon}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {categoryNames[review.category] || review.category}
            </span>
            {productCount >= 5 && (
              <span className="text-xs bg-orange-100 text-[var(--color-primary)] px-2 py-1 rounded-full font-medium">
                השוואה מקיפה
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold mt-1 group-hover:text-[var(--color-primary)] transition-colors duration-200 leading-snug">
            {review.title}
          </h3>
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">{review.excerpt}</p>
          <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              {productCount} מוצרים
            </span>
            <span>{new Date(review.date).toLocaleDateString("he-IL")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
