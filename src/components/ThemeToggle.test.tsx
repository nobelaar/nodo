import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

const mockToggle = vi.hoisted(() => vi.fn());

vi.mock("@/lib/useTheme", () => ({
  useTheme: vi.fn(),
}));

import { useTheme } from "@/lib/useTheme";
import { ThemeToggle } from "./ThemeToggle";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ThemeToggle", () => {
  it('renders "🌙 Oscuro" in light mode (dark=false)', () => {
    vi.mocked(useTheme).mockReturnValue({ dark: false, toggle: mockToggle });
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toHaveTextContent("🌙 Oscuro");
  });

  it('renders "☀️ Claro" in dark mode (dark=true)', () => {
    vi.mocked(useTheme).mockReturnValue({ dark: true, toggle: mockToggle });
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toHaveTextContent("☀️ Claro");
  });

  it("calls toggle when clicked", () => {
    vi.mocked(useTheme).mockReturnValue({ dark: false, toggle: mockToggle });
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockToggle).toHaveBeenCalledOnce();
  });
});
