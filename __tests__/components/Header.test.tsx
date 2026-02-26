import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header", () => {
  it("renders the site logo/name", () => {
    render(<Header />);
    expect(screen.getByText(/משתלם/)).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getByText("ראשי")).toBeInTheDocument();
    expect(screen.getByText("סקירות")).toBeInTheDocument();
    expect(screen.getByText("מבצעים")).toBeInTheDocument();
    expect(screen.getByText("אודות")).toBeInTheDocument();
  });

  it("links point to correct paths", () => {
    render(<Header />);
    const reviewsLink = screen.getByText("סקירות").closest("a");
    expect(reviewsLink).toHaveAttribute("href", "/reviews");
    const dealsLink = screen.getByText("מבצעים").closest("a");
    expect(dealsLink).toHaveAttribute("href", "/deals");
  });
});
