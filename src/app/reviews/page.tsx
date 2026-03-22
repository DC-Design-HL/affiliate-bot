import Link from "next/link";
import { getAllReviews } from "@/lib/content";
import ReviewCard from "@/components/ReviewCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categoryNames, categoryEmoji } from "@/lib/utils";

export const metadata = {
  title: "סקירות מוצרים מאליאקספרס | משתלם",
  description: "כל הסקירות והביקורות שלנו על מוצרים מאליאקספרס בעברית",
  alternates: { canonical: "https://meshtalem.design-dc.com/reviews" },
};

const filterCategories = [
  { name: "הכל", slug: null },
  { name: "אלקטרוניקה", slug: "electronics" },
  { name: "בית וגן", slug: "home-garden" },
  { name: "גיימינג", slug: "gaming" },
  { name: "מטבח", slug: "kitchen" },
  { name: "רכב", slug: "automotive" },
  { name: "ספורט", slug: "sports" },
  { name: "אופנה", slug: "fashion" },
  { name: "כלי עבודה", slug: "tools" },
];

export default function ReviewsPage() {
  const reviews = getAllReviews();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-bl from-gray-900 via-gray-800 to-gray-900 text-white py-12 md:py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="max-w-6xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 text-sm font-bold px-4 py-1.5 rounded-full mb-4 border border-orange-500/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            {reviews.length} סקירות מקצועיות
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            כל הסקירות
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            סקירות מקצועיות בעברית למוצרים מאליאקספרס
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterCategories.map((cat) => (
            cat.slug === null ? (
              <span
                key="all"
                className="inline-flex items-center gap-1.5 bg-gradient-to-l from-orange-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-sm"
              >
                הכל
              </span>
            ) : (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 text-gray-700 hover:text-orange-600 text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>{categoryEmoji[cat.slug] || "📦"}</span>
                {cat.name}
              </Link>
            )
          ))}
        </div>

        {/* Review Count */}
        <div className="text-sm text-gray-500 mb-6 font-medium">
          {reviews.length} סקירות נמצאו
        </div>

        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-20">סקירות חדשות בקרוב...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <ReviewCard key={r.meta.slug} review={r.meta} index={i} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
