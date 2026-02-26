import { getReviewsByCategory } from "@/lib/content";
import ReviewCard from "@/components/ReviewCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

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

export function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = categoryNames[slug] || slug;
  return {
    title: `${name} — סקירות מאליאקספרס | משתלם`,
    description: `סקירות וביקורות מוצרי ${name} מאליאקספרס בעברית`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const reviews = getReviewsByCategory(slug);
  const name = categoryNames[slug] || slug;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-8">{name}</h1>
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-20">סקירות בקטגוריה זו בקרוב...</p>
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
