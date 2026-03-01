import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "מבצעים חמים מאליאקספרס | משתלם",
  description: "מבצעים והנחות חמות מאליאקספרס — עודכן יומית",
  alternates: { canonical: "https://meshtalem.design-dc.com/deals" },
};

export default function DealsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-extrabold mb-4">מבצעים חמים</h1>
        <p className="text-gray-500 mb-8">מבצעים והנחות מיוחדות מאליאקספרס — בקרוב!</p>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8">
          <p className="text-lg font-bold text-[var(--color-primary)]">בינתיים, בדקו את הסקירות שלנו</p>
          <a href="/reviews" className="cursor-pointer inline-block mt-4 bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-bold hover:bg-[var(--color-primary-dark)] transition-colors duration-200">
            לסקירות ←
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
