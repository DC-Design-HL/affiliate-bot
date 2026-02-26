import { test, expect } from "@playwright/test";

test.describe("Site navigation", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/משתלם/);
  });

  test("homepage has hero section and CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=המוצרים הכי משתלמים")).toBeVisible();
    await expect(page.locator("text=לסקירות")).toBeVisible();
  });

  test("navigate to reviews page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=סקירות");
    await expect(page).toHaveURL(/\/reviews/);
    await expect(page.locator("text=כל הסקירות")).toBeVisible();
  });

  test("navigate to deals page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=מבצעים");
    await expect(page).toHaveURL(/\/deals/);
    await expect(page.locator("text=מבצעים חמים")).toBeVisible();
  });

  test("navigate to about page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=אודות");
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator("text=אודות משתלם")).toBeVisible();
  });

  test("review detail page loads", async ({ page }) => {
    await page.goto("/reviews/best-wireless-earbuds-2026");
    await expect(page.locator("text=אוזניות")).toBeVisible();
    // Should have product cards
    await expect(page.locator("text=לרכישה באליאקספרס").first()).toBeVisible();
  });

  test("category page loads", async ({ page }) => {
    await page.goto("/category/electronics");
    await expect(page.locator("text=אלקטרוניקה")).toBeVisible();
  });

  test("page is RTL", async ({ page }) => {
    await page.goto("/");
    const dir = await page.getAttribute("html", "dir");
    expect(dir).toBe("rtl");
  });

  test("page language is Hebrew", async ({ page }) => {
    await page.goto("/");
    const lang = await page.getAttribute("html", "lang");
    expect(lang).toBe("he");
  });

  test("404 page for non-existent review", async ({ page }) => {
    const response = await page.goto("/reviews/nonexistent-review-xyz");
    expect(response?.status()).toBe(404);
  });
});
