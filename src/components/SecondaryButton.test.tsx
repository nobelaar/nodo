import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SecondaryButton } from "./SecondaryButton";

describe("SecondaryButton", () => {
  it("renders children content", () => {
    render(<SecondaryButton>Click me</SecondaryButton>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<SecondaryButton disabled>Disabled</SecondaryButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is not disabled by default", () => {
    render(<SecondaryButton>Enabled</SecondaryButton>);
    expect(screen.getByRole("button")).toBeEnabled();
  });

  it('applies sm size class when size="sm"', () => {
    render(<SecondaryButton size="sm">Small</SecondaryButton>);
    expect(screen.getByRole("button")).toHaveClass("h-10");
  });

  it('applies md size class when size="md"', () => {
    render(<SecondaryButton size="md">Medium</SecondaryButton>);
    expect(screen.getByRole("button")).toHaveClass("h-[54px]");
  });

  it('applies lg size class when size="lg"', () => {
    render(<SecondaryButton size="lg">Large</SecondaryButton>);
    expect(screen.getByRole("button")).toHaveClass("h-14");
  });

  it("accepts custom className", () => {
    render(<SecondaryButton className="my-btn">Custom</SecondaryButton>);
    expect(screen.getByRole("button")).toHaveClass("my-btn");
  });

  it("has surface background and border-border (not border-primary or border-2)", () => {
    render(<SecondaryButton>Surface</SecondaryButton>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("bg-surface");
    expect(btn).toHaveClass("border-border");
    expect(btn.className).not.toContain("border-primary");
    expect(btn.className).not.toContain("border-2");
  });

  it("uses text-text-primary (not text-primary brand color)", () => {
    render(<SecondaryButton>Text</SecondaryButton>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("text-text-primary");
    expect(btn).not.toHaveClass("text-primary");
  });

  it("has pill shape and default height 54px", () => {
    render(<SecondaryButton>Pill</SecondaryButton>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("rounded-pill");
    expect(btn).toHaveClass("h-[54px]");
  });
});
