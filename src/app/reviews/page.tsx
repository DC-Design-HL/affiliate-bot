import { getAllReviews } from "@/lib/content";
import ReviewCard from "@/components/ReviewCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "סקירות מוצרים מאליאקספרס | משתלם",
  description: "כל הסקירות והביקורות שלנו על מוצרים מאליאקספרס בעברית",
  alternates: { canonical: "https://meshtalem.design-dc.com/reviews" },
};

export default function ReviewsPage() {
  const reviews = getAllReviews();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-8">כל הסקירות</h1>
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-20">סקירות חדשות בקרוב...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <ReviewCard key={r.meta.slug} review={r.meta} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
