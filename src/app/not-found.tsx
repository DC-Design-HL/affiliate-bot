import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "עמוד לא נמצא | משתלם",
  description: "הדף שחיפשתם לא נמצא. חזרו לעמוד הבית לגלות מוצרים משתלמים מאליאקספרס.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="py-20">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            עמוד לא נמצא
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-lg mx-auto">
            הדף שחיפשתם לא קיים או הועבר למיקום אחר.
            בואו נמצא לכם משהו משתלם במקום!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/"
              className="cursor-pointer bg-gradient-to-l from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🏠 חזור לעמוד הבית
            </Link>
            <Link
              href="/reviews"
              className="cursor-pointer bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-xl font-bold border border-gray-300 transition-all duration-200"
            >
              📋 לכל הסקירות
            </Link>
          </div>

          <div className="bg-gradient-to-l from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              מה אפשר למצוא כאן?
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">💰</div>
                <div className="font-bold">מוצרים זולים</div>
                <div className="text-gray-500">המוצרים הכי משתלמים</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⭐</div>
                <div className="font-bold">סקירות מקצועיות</div>
                <div className="text-gray-500">בדיקות מעמיקות בעברית</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🚚</div>
                <div className="font-bold">משלוח לישראל</div>
                <div className="text-gray-500">כל המוצרים מגיעים עד הבית</div>
              </div>
            </div>
          </div>

          {/* Quick navigation */}
          <div className="mt-12 text-right">
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              קטגוריות פופולריות:
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { href: "/category/electronics", label: "אלקטרוניקה 🎧", count: "50+" },
                { href: "/category/home-garden", label: "בית וגן 🏠", count: "30+" },
                { href: "/category/gaming", label: "גיימינג 🎮", count: "25+" },
                { href: "/category/kitchen", label: "מטבח 🍳", count: "20+" },
              ].map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="cursor-pointer inline-flex items-center gap-2 bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <span>{cat.label}</span>
                  <span className="text-xs text-gray-400">{cat.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}