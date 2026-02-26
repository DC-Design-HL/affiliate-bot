import fs from "fs";
import path from "path";
import {
  getAllReviews,
  getReviewBySlug,
  getReviewsByCategory,
  getAllCategories,
} from "@/lib/content";

// Suppress logger output in tests
jest.spyOn(console, "log").mockImplementation();
jest.spyOn(console, "warn").mockImplementation();
jest.spyOn(console, "error").mockImplementation();

const CONTENT_DIR = path.join(process.cwd(), "content/reviews");

const VALID_MDX = `---
title: "Test Review"
slug: "test-review"
category: "electronics"
date: "2026-01-01"
updated: "2026-01-01"
excerpt: "Test excerpt"
image: "/images/test.jpg"
products:
  - name: "Product 1"
    price: "$10"
    rating: 4.5
    affiliateUrl: "https://example.com"
seo:
  keywords: ["test"]
  description: "Test description"
---

# Test Content
`;

const SECOND_MDX = `---
title: "Second Review"
slug: "second-review"
category: "kitchen"
date: "2026-02-01"
updated: "2026-02-01"
excerpt: "Second excerpt"
image: ""
products: []
seo:
  keywords: []
  description: ""
---

Content here.
`;

const MISSING_FIELDS_MDX = `---
category: "electronics"
---

No title or slug.
`;

const EMPTY_MDX = ``;

describe("content utilities", () => {
  const tmpDir = path.join(process.cwd(), "content/reviews/__test_tmp__");

  function setupContentDir(files: Record<string, string>) {
    // We mock the content dir by writing temp files
    // Instead, let's use jest.spyOn on fs to control behavior
  }

  describe("getAllReviews", () => {
    it("returns reviews from content directory", () => {
      const reviews = getAllReviews();
      // Should work with the existing MDX file
      expect(Array.isArray(reviews)).toBe(true);
    });

    it("returns reviews sorted by date descending", () => {
      const reviews = getAllReviews();
      if (reviews.length > 1) {
        for (let i = 0; i < reviews.length - 1; i++) {
          expect(
            new Date(reviews[i].meta.date).getTime()
          ).toBeGreaterThanOrEqual(
            new Date(reviews[i + 1].meta.date).getTime()
          );
        }
      }
    });

    it("returns empty array when directory does not exist", () => {
      const existsSpy = jest.spyOn(fs, "existsSync").mockReturnValue(false);
      const reviews = getAllReviews();
      expect(reviews).toEqual([]);
      existsSpy.mockRestore();
    });

    it("returns empty array when fs throws", () => {
      const existsSpy = jest.spyOn(fs, "existsSync").mockImplementation(() => {
        throw new Error("boom");
      });
      const reviews = getAllReviews();
      expect(reviews).toEqual([]);
      existsSpy.mockRestore();
    });
  });

  describe("getReviewBySlug", () => {
    it("returns null for empty slug", () => {
      expect(getReviewBySlug("")).toBeNull();
    });

    it("returns null for non-existent slug", () => {
      expect(getReviewBySlug("does-not-exist-xyz")).toBeNull();
    });

    it("returns review for valid slug", () => {
      const reviews = getAllReviews();
      if (reviews.length > 0) {
        const slug = reviews[0].meta.slug;
        const review = getReviewBySlug(slug);
        expect(review).not.toBeNull();
        expect(review?.meta.slug).toBe(slug);
      }
    });
  });

  describe("getReviewsByCategory", () => {
    it("returns empty array for empty category", () => {
      expect(getReviewsByCategory("")).toEqual([]);
    });

    it("returns empty array for non-existent category", () => {
      expect(getReviewsByCategory("nonexistent-cat-xyz")).toEqual([]);
    });

    it("filters by category correctly", () => {
      const reviews = getAllReviews();
      if (reviews.length > 0) {
        const cat = reviews[0].meta.category;
        const filtered = getReviewsByCategory(cat);
        filtered.forEach((r) => expect(r.meta.category).toBe(cat));
      }
    });
  });

  describe("getAllCategories", () => {
    it("returns unique categories", () => {
      const cats = getAllCategories();
      expect(Array.isArray(cats)).toBe(true);
      expect(cats.length).toBe(new Set(cats).size);
    });
  });

  describe("edge cases — malformed MDX", () => {
    it("skips files missing title/slug", () => {
      const origExists = fs.existsSync;
      const origReaddir = fs.readdirSync;
      const origRead = fs.readFileSync;

      jest.spyOn(fs, "existsSync").mockImplementation((p) => {
        if (String(p) === CONTENT_DIR) return true;
        return origExists(p);
      });
      jest.spyOn(fs, "readdirSync").mockImplementation((p, opts) => {
        if (String(p) === CONTENT_DIR) return ["bad.mdx"] as unknown as fs.Dirent[];
        return origReaddir(p, opts);
      });
      jest.spyOn(fs, "readFileSync").mockImplementation((p, enc) => {
        if (String(p) === path.join(CONTENT_DIR, "bad.mdx")) return MISSING_FIELDS_MDX;
        return origRead(p, enc);
      });

      const reviews = getAllReviews();
      expect(reviews).toEqual([]);

      jest.restoreAllMocks();
    });

    it("handles empty MDX gracefully", () => {
      const origExists = fs.existsSync;
      const origReaddir = fs.readdirSync;
      const origRead = fs.readFileSync;

      jest.spyOn(fs, "existsSync").mockImplementation((p) => {
        if (String(p) === CONTENT_DIR) return true;
        return origExists(p);
      });
      jest.spyOn(fs, "readdirSync").mockImplementation((p, opts) => {
        if (String(p) === CONTENT_DIR) return ["empty.mdx"] as unknown as fs.Dirent[];
        return origReaddir(p, opts);
      });
      jest.spyOn(fs, "readFileSync").mockImplementation((p, enc) => {
        if (String(p) === path.join(CONTENT_DIR, "empty.mdx")) return EMPTY_MDX;
        return origRead(p, enc);
      });

      const reviews = getAllReviews();
      expect(reviews).toEqual([]);

      jest.restoreAllMocks();
    });

    it("parses valid MDX correctly with all fields", () => {
      const origExists = fs.existsSync;
      const origReaddir = fs.readdirSync;
      const origRead = fs.readFileSync;

      jest.spyOn(fs, "existsSync").mockImplementation((p) => {
        if (String(p) === CONTENT_DIR) return true;
        return origExists(p);
      });
      jest.spyOn(fs, "readdirSync").mockImplementation((p, opts) => {
        if (String(p) === CONTENT_DIR) return ["valid.mdx"] as unknown as fs.Dirent[];
        return origReaddir(p, opts);
      });
      jest.spyOn(fs, "readFileSync").mockImplementation((p, enc) => {
        if (String(p) === path.join(CONTENT_DIR, "valid.mdx")) return VALID_MDX;
        return origRead(p, enc);
      });

      const reviews = getAllReviews();
      expect(reviews).toHaveLength(1);
      expect(reviews[0].meta.title).toBe("Test Review");
      expect(reviews[0].meta.slug).toBe("test-review");
      expect(reviews[0].meta.products).toHaveLength(1);
      expect(reviews[0].meta.products[0].name).toBe("Product 1");
      expect(reviews[0].content).toContain("# Test Content");

      jest.restoreAllMocks();
    });

    it("defaults missing optional fields", () => {
      const minimalMdx = `---
title: "Minimal"
slug: "minimal"
---

Content.
`;
      const origExists = fs.existsSync;
      const origReaddir = fs.readdirSync;
      const origRead = fs.readFileSync;

      jest.spyOn(fs, "existsSync").mockImplementation((p) => {
        if (String(p) === CONTENT_DIR) return true;
        return origExists(p);
      });
      jest.spyOn(fs, "readdirSync").mockImplementation((p, opts) => {
        if (String(p) === CONTENT_DIR) return ["min.mdx"] as unknown as fs.Dirent[];
        return origReaddir(p, opts);
      });
      jest.spyOn(fs, "readFileSync").mockImplementation((p, enc) => {
        if (String(p) === path.join(CONTENT_DIR, "min.mdx")) return minimalMdx;
        return origRead(p, enc);
      });

      const reviews = getAllReviews();
      expect(reviews).toHaveLength(1);
      expect(reviews[0].meta.category).toBe("uncategorized");
      expect(reviews[0].meta.products).toEqual([]);
      expect(reviews[0].meta.seo.keywords).toEqual([]);

      jest.restoreAllMocks();
    });
  });
});
