import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders the site name", () => {
    render(<Footer />);
    // "משתלם" appears in both logo and copyright — use getAllByText
    const matches = screen.getAllByText(/משתלם/);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("renders affiliate disclosure", () => {
    render(<Footer />);
    expect(screen.getByText(/קישורי שותפים/)).toBeInTheDocument();
  });

  it("renders current year in copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
