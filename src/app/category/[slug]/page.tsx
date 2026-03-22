import Link from "next/link";
import { getReviewsByCategory } from "@/lib/content";
import ReviewCard from "@/components/ReviewCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categoryNames, categoryEmoji } from "@/lib/utils";
import type { Metadata } from "next";

const categoryDescriptions: Record<string, string> = {
  electronics: "סקירות מקצועיות של אוזניות, רמקולים, שעונים חכמים, מטענים ועוד מוצרי אלקטרוניקה מובילים מאליאקספרס",
  "home-garden": "כל מה שצריך לבית ולגינה — מאליאקספרס ישירות אליכם, עם סקירות מקצועיות בעברית",
  gaming: "ציוד גיימינג מאליאקספרס — עכברים, מקלדות, אוזניות ועוד, במחירים שלא תמצאו בארץ",
  automotive: "אביזרי רכב שווים מאליאקספרס — מצלמות דרך, מטענים לרכב, ארגוניות ועוד",
  kitchen: "גאדג׳טים למטבח מאליאקספרס שיחסכו לכם זמן וכסף — סקירות מקצועיות בעברית",
  sports: "ציוד ספורט ופעילות גופנית מאליאקספרס — במחירים מפתיעים ואיכות מוכחת",
  fashion: "פריטי אופנה מאליאקספרס — טרנדים במחירים נוחים עם סקירות אמינות",
  "beauty-health": "מוצרי יופי ובריאות מאליאקספרס — סקירות כנות ומחירים שווים",
  "toys-kids": "צעצועים ומוצרי ילדים מאליאקספרס — בטוחים, איכותיים, ובמחירים מצוינים",
  tools: "כלי עבודה מאליאקספרס — מברגות, סטים מקצועיים, ועוד במחירים שלא תאמינו",
};

export function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = categoryNames[slug] || slug;
  return {
    title: `${name} — סקירות מאליאקספרס | משתלם`,
    description: categoryDescriptions[slug] || `סקירות וביקורות מוצרי ${name} מאליאקספרס בעברית`,
    alternates: { canonical: `https://meshtalem.design-dc.com/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const reviews = getReviewsByCategory(slug);
  const name = categoryNames[slug] || slug;
  const emoji = categoryEmoji[slug] || "📦";
  const description = categoryDescriptions[slug] || `סקירות מקצועיות של מוצרי ${name} מאליאקספרס`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Category Hero */}
      <section className="bg-gradient-to-bl from-gray-900 via-gray-800 to-gray-900 text-white py-12 md:py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="max-w-6xl mx-auto relative text-center">
          <div className="text-6xl mb-4">{emoji}</div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            {name}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full border border-white/20">
            {reviews.length} סקירות בקטגוריה
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-[var(--color-primary)] cursor-pointer">ראשי</Link>
          <span>/</span>
          <span className="text-gray-500">קטגוריות</span>
          <span>/</span>
          <span className="text-gray-700 font-medium">{name}</span>
        </nav>

        {reviews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-6">סקירות בקטגוריה זו בקרוב...</p>
            <Link
              href="/reviews"
              className="cursor-pointer inline-block bg-gradient-to-l from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-200"
            >
              לכל הסקירות
            </Link>
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-500 mb-6 font-medium">
              {reviews.length} סקירות נמצאו
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((r, i) => (
                <ReviewCard key={r.meta.slug} review={r.meta} index={i} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
