import { MetadataRoute } from "next";
import { getAllReviews, getAllCategories } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://meshtalem.design-dc.com";
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/reviews`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/deals`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const reviews = getAllReviews();
  const reviewPages: MetadataRoute.Sitemap = reviews.map((r) => ({
    url: `${baseUrl}/reviews/${r.meta.slug}`,
    lastModified: r.meta.updated || r.meta.date,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Promo pages excluded from sitemap — they canonical to /reviews/ pages
  // to avoid duplicate content penalties from Google

  const categories = getAllCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...reviewPages, ...categoryPages];
}
