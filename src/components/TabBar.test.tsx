import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { TabBar, type Tab } from "./TabBar";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("TabBar", () => {
  const tabLabels: { label: string; icon: string }[] = [
    { label: "Inicio", icon: "🏠" },
    { label: "Plantel", icon: "👥" },
    { label: "Nodo", icon: "⚡" },
    { label: "Agenda", icon: "📅" },
    { label: "Perfil", icon: "👤" },
  ];

  it("renders all 5 tabs", () => {
    render(<TabBar />);

    for (const { label, icon } of tabLabels) {
      const btn = screen.getByRole("button", { name: new RegExp(label, "i") });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveTextContent(icon);
    }
  });

  it("applies text-primary class to the active tab", () => {
    render(<TabBar active="inicio" />);

    const activeBtn = screen.getByRole("button", { name: /Inicio/i });
    expect(activeBtn).toHaveClass("text-primary");
  });

  it("applies text-text-muted class to inactive tabs", () => {
    render(<TabBar active="inicio" />);

    const inactiveBtn = screen.getByRole("button", { name: /Plantel/i });
    expect(inactiveBtn).toHaveClass("text-text-muted");
  });

  it("active prop controls which tab is active", () => {
    const { rerender } = render(<TabBar active="inicio" />);

    expect(screen.getByRole("button", { name: /Inicio/i })).toHaveClass("text-primary");
    expect(screen.getByRole("button", { name: /Nodo/i })).toHaveClass("text-text-muted");

    rerender(<TabBar active="nodo" />);

    expect(screen.getByRole("button", { name: /Nodo/i })).toHaveClass("text-primary");
    expect(screen.getByRole("button", { name: /Inicio/i })).toHaveClass("text-text-muted");
  });

  it("calls onTabChange with tab id when a tab is clicked", () => {
    const onTabChange = vi.fn();
    render(<TabBar onTabChange={onTabChange} />);

    fireEvent.click(screen.getByRole("button", { name: /Nodo/i }));
    expect(onTabChange).toHaveBeenCalledWith("nodo" as Tab);
  });

  it("does not throw when onTabChange is not provided", () => {
    render(<TabBar />);

    expect(() => {
      fireEvent.click(screen.getByRole("button", { name: /Nodo/i }));
    }).not.toThrow();
  });
});
