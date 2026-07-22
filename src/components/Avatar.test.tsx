import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials when no src is provided", () => {
    render(<Avatar name="Juan Pérez" />);
    expect(screen.getByText("JP")).toBeInTheDocument();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("renders initials from first 2 words", () => {
    render(<Avatar name="María José García López" />);
    expect(screen.getByText("MJ")).toBeInTheDocument();
  });

  it("renders an img element with alt text when src is provided", () => {
    render(<Avatar name="Juan Pérez" src="/photo.jpg" />);
    const img = screen.getByRole("img", { name: "Juan Pérez" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src");
  });

  it('applies sm size class when size="sm"', () => {
    render(<Avatar name="Juan Pérez" size="sm" />);
    expect(screen.getByText("JP")).toHaveClass("size-8");
  });

  it('applies md size class when size="md"', () => {
    render(<Avatar name="Juan Pérez" size="md" />);
    expect(screen.getByText("JP")).toHaveClass("size-12");
  });

  it('applies lg size class when size="lg"', () => {
    render(<Avatar name="Juan Pérez" size="lg" />);
    expect(screen.getByText("JP")).toHaveClass("size-20");
  });

  it("accepts custom className", () => {
    render(<Avatar name="Juan Pérez" className="my-avatar" />);
    expect(screen.getByText("JP")).toHaveClass("my-avatar");
  });

  it("applies custom className to img when src is provided", () => {
    render(<Avatar name="Juan Pérez" src="/photo.jpg" className="my-avatar" />);
    expect(screen.getByRole("img")).toHaveClass("my-avatar");
  });
});
