import { render, screen } from "@testing-library/react";
import ReviewCard from "@/components/ReviewCard";
import { ReviewMeta } from "@/lib/content";

const mockReview: ReviewMeta = {
  title: "Best Earbuds 2026",
  slug: "best-earbuds",
  category: "electronics",
  date: "2026-01-15",
  updated: "2026-01-15",
  excerpt: "Top 5 wireless earbuds from AliExpress",
  image: "/images/test.jpg",
  products: [
    { name: "P1", price: "$10", rating: 4, affiliateUrl: "https://example.com" },
  ],
  seo: { keywords: ["test"], description: "test" },
};

describe("ReviewCard", () => {
  it("renders review title", () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText("Best Earbuds 2026")).toBeInTheDocument();
  });

  it("renders excerpt", () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText(/Top 5 wireless/)).toBeInTheDocument();
  });

  it("links to review page", () => {
    render(<ReviewCard review={mockReview} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/reviews/best-earbuds");
  });

  it("renders product count", () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText(/1 מוצרים/)).toBeInTheDocument();
  });

  it("renders category name in Hebrew for known categories", () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText("אלקטרוניקה")).toBeInTheDocument();
  });

  it("renders raw category slug for unknown categories", () => {
    const unknown = { ...mockReview, category: "mystery" };
    render(<ReviewCard review={unknown} />);
    expect(screen.getByText("mystery")).toBeInTheDocument();
  });

  it("handles missing products gracefully", () => {
    const noProducts = { ...mockReview, products: undefined as unknown as ReviewMeta["products"] };
    render(<ReviewCard review={noProducts} />);
    expect(screen.getByText(/0 מוצרים/)).toBeInTheDocument();
  });

  it("renders formatted date", () => {
    render(<ReviewCard review={mockReview} />);
    // Date appears in the card (Hebrew locale)
    const dateStr = new Date("2026-01-15").toLocaleDateString("he-IL");
    expect(screen.getByText(dateStr)).toBeInTheDocument();
  });
});
