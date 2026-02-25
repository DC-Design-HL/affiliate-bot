import Link from "next/link";
import { getAllReviews } from "@/lib/content";
import ReviewCard from "@/components/ReviewCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  { name: "אלקטרוניקה", slug: "electronics", emoji: "📱" },
  { name: "בית וגן", slug: "home-garden", emoji: "🏠" },
  { name: "גיימינג", slug: "gaming", emoji: "🎮" },
  { name: "רכב", slug: "automotive", emoji: "🚗" },
  { name: "מטבח", slug: "kitchen", emoji: "🍳" },
  { name: "ספורט", slug: "sports", emoji: "⚽" },
];

export default function Home() {
  const reviews = getAllReviews();
  const latestReviews = reviews.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-bl from-orange-50 to-amber-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            המוצרים הכי משתלמים
            <br />
            <span className="text-[var(--color-primary)]">מאליאקספרס 🛒</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            סקירות מקצועיות בעברית, השוואות מחירים, וטיפים לקנייה חכמה.
            חוסכים לכם את הזמן — אנחנו כבר בדקנו.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/reviews"
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors"
            >
              לסקירות →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">קטגוריות</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-[var(--color-primary)] rounded-xl p-6 text-center transition-all"
            >
              <div className="text-3xl mb-2">{cat.emoji}</div>
              <div className="font-bold">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Reviews */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">סקירות אחרונות</h2>
          {latestReviews.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {latestReviews.map((r) => (
                <ReviewCard key={r.meta.slug} review={r.meta} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">סקירות חדשות בקרוב...</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
