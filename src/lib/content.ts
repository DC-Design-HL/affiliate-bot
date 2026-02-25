import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content/reviews");

export interface Product {
  name: string;
  price: string;
  rating: number;
  affiliateUrl: string;
  image?: string;
}

export interface ReviewMeta {
  title: string;
  slug: string;
  category: string;
  date: string;
  updated: string;
  excerpt: string;
  image: string;
  products: Product[];
  seo: {
    keywords: string[];
    description: string;
  };
}

export interface Review {
  meta: ReviewMeta;
  content: string;
}

export function getAllReviews(): Review[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data, content } = matter(raw);
      return { meta: data as ReviewMeta, content };
    })
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export function getReviewBySlug(slug: string): Review | null {
  const reviews = getAllReviews();
  return reviews.find((r) => r.meta.slug === slug) || null;
}

export function getReviewsByCategory(category: string): Review[] {
  return getAllReviews().filter((r) => r.meta.category === category);
}

export function getAllCategories(): string[] {
  const reviews = getAllReviews();
  return [...new Set(reviews.map((r) => r.meta.category))];
}
