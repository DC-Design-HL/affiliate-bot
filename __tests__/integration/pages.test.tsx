/**
 * Integration tests — verify page components render without crashing
 * with real content from the filesystem.
 */
import { render, screen } from "@testing-library/react";
import { getAllReviews, getReviewsByCategory, getAllCategories } from "@/lib/content";

// Suppress logger output
jest.spyOn(console, "log").mockImplementation();
jest.spyOn(console, "warn").mockImplementation();
jest.spyOn(console, "error").mockImplementation();

// We can't easily render full Next.js page components (they use server-only features),
// so we test the data layer integration + component composition.

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewCard from "@/components/ReviewCard";
import ProductCard from "@/components/ProductCard";

describe("Integration: data + components", () => {
  it("renders ReviewCard for each review from getAllReviews", () => {
    const reviews = getAllReviews();
    const { container } = render(
      <div>
        {reviews.map((r) => (
          <ReviewCard key={r.meta.slug} review={r.meta} />
        ))}
      </div>
    );
    // Each review should produce a link
    const links = container.querySelectorAll("a");
    expect(links.length).toBe(reviews.length);
  });

  it("renders ProductCards for products in a review", () => {
    const reviews = getAllReviews();
    if (reviews.length === 0) return;
    const review = reviews[0];
    render(
      <div>
        {review.meta.products.map((p, i) => (
          <ProductCard key={i} product={p} rank={i + 1} />
        ))}
      </div>
    );
    review.meta.products.forEach((p) => {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    });
  });

  it("renders Header and Footer together", () => {
    render(
      <>
        <Header />
        <Footer />
      </>
    );
    // Header nav
    expect(screen.getByText("סקירות")).toBeInTheDocument();
    // Footer copyright
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("getAllCategories returns categories matching review data", () => {
    const reviews = getAllReviews();
    const categories = getAllCategories();
    const reviewCats = new Set(reviews.map((r) => r.meta.category));
    expect(categories.sort()).toEqual([...reviewCats].sort());
  });

  it("getReviewsByCategory returns subset of getAllReviews", () => {
    const allReviews = getAllReviews();
    if (allReviews.length === 0) return;
    const cat = allReviews[0].meta.category;
    const filtered = getReviewsByCategory(cat);
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.length).toBeLessThanOrEqual(allReviews.length);
    filtered.forEach((r) => expect(r.meta.category).toBe(cat));
  });
});
