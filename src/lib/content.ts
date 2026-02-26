import fs from "fs";
import path from "path";
import matter from "gray-matter";
import logger from "./logger";

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

function parseReviewFile(filePath: string): Review | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    if (!data.title || !data.slug) {
      logger.warn("Review missing required fields (title/slug)", { filePath });
      return null;
    }

    const meta: ReviewMeta = {
      title: data.title ?? "",
      slug: data.slug ?? "",
      category: data.category ?? "uncategorized",
      date: data.date ?? new Date().toISOString(),
      updated: data.updated ?? data.date ?? new Date().toISOString(),
      excerpt: data.excerpt ?? "",
      image: data.image ?? "",
      products: Array.isArray(data.products) ? data.products : [],
      seo: {
        keywords: data.seo?.keywords ?? [],
        description: data.seo?.description ?? data.excerpt ?? "",
      },
    };

    return { meta, content };
  } catch (error) {
    logger.error("Failed to parse review file", { filePath, error });
    return null;
  }
}

export function getAllReviews(): Review[] {
  try {
    if (!fs.existsSync(contentDir)) {
      logger.info("Content directory not found, returning empty list", { contentDir });
      return [];
    }

    const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
    logger.info("Loading reviews", { count: files.length });

    const reviews = files
      .map((file) => parseReviewFile(path.join(contentDir, file)))
      .filter((r): r is Review => r !== null);

    return reviews.sort(
      (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
  } catch (error) {
    logger.error("Failed to load reviews", { error });
    return [];
  }
}

export function getReviewBySlug(slug: string): Review | null {
  try {
    if (!slug) {
      logger.warn("getReviewBySlug called with empty slug");
      return null;
    }
    const reviews = getAllReviews();
    return reviews.find((r) => r.meta.slug === slug) ?? null;
  } catch (error) {
    logger.error("Failed to get review by slug", { slug, error });
    return null;
  }
}

export function getReviewsByCategory(category: string): Review[] {
  try {
    if (!category) {
      logger.warn("getReviewsByCategory called with empty category");
      return [];
    }
    return getAllReviews().filter((r) => r.meta.category === category);
  } catch (error) {
    logger.error("Failed to get reviews by category", { category, error });
    return [];
  }
}

export function getAllCategories(): string[] {
  try {
    const reviews = getAllReviews();
    return [...new Set(reviews.map((r) => r.meta.category))];
  } catch (error) {
    logger.error("Failed to get categories", { error });
    return [];
  }
}
