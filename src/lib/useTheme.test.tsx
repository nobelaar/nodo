import { describe, expect, it, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { useTheme } from "./useTheme";

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});

function ThemeHarness() {
  const { dark, toggle } = useTheme();
  return (
    <div>
      <span data-testid="mode">{dark ? "dark" : "light"}</span>
      <button data-testid="toggle" onClick={toggle}>
        toggle
      </button>
    </div>
  );
}

describe("useTheme class sync", () => {
  it("adds dark class to documentElement when localStorage theme is dark", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeHarness />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("does NOT add dark class when localStorage theme is light", () => {
    localStorage.setItem("theme", "light");
    render(<ThemeHarness />);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("removes dark class on toggle to light", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeHarness />);
    fireEvent.click(screen.getByTestId("toggle"));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("adds dark class on toggle to dark", () => {
    localStorage.setItem("theme", "light");
    render(<ThemeHarness />);
    fireEvent.click(screen.getByTestId("toggle"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
