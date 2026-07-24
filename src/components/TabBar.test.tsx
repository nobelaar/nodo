import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { TabBar, type Tab } from "./TabBar";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("TabBar", () => {
  it("renders all 5 tabs with uppercase labels", () => {
    render(<TabBar />);
    for (const label of ["INICIO", "PLANTEL", "NODO", "AGENDA", "PERFIL"]) {
      expect(screen.getByRole("button", { name: new RegExp(label, "i") })).toBeInTheDocument();
    }
  });

  it("renders lucide icons (no emoji)", () => {
    render(<TabBar />);
    const btn = screen.getByRole("button", { name: /INICIO/i });
    expect(btn.querySelector("svg")).toBeInTheDocument();
    expect(btn).not.toHaveTextContent("🏠");
    expect(btn).not.toHaveTextContent("👥");
  });

  it("active tab has bg-primary pill and text-on-primary", () => {
    render(<TabBar active="inicio" />);
    const activeBtn = screen.getByRole("button", { name: /INICIO/i });
    expect(activeBtn).toHaveClass("bg-primary");
    expect(activeBtn).toHaveClass("text-on-primary");
    expect(activeBtn).toHaveClass("rounded-[26px]");
  });

  it("inactive tabs have text-text-muted and no bg-primary", () => {
    render(<TabBar active="inicio" />);
    const inactiveBtn = screen.getByRole("button", { name: /PLANTEL/i });
    expect(inactiveBtn).toHaveClass("text-text-muted");
    expect(inactiveBtn).not.toHaveClass("bg-primary");
  });

  it("container has rounded-[36px] pill with shadow, border, and 62px height", () => {
    render(<TabBar />);
    const nav = screen.getByRole("navigation");
    const pill = nav.firstElementChild as HTMLElement;
    expect(pill).toHaveClass("rounded-[36px]");
    expect(pill).toHaveClass("bg-surface");
    expect(pill).toHaveClass("border-border");
    expect(pill).toHaveClass("h-[62px]");
    expect(pill).toHaveClass("p-1");
    expect(pill.className).toContain("shadow-[0_8px_24px_-6px_rgba(26,22,20,0.13)]");
  });

  it("outer nav has Pencil padding", () => {
    render(<TabBar />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("pt-[21px]");
    expect(nav).toHaveClass("pr-[12px]");
    expect(nav).toHaveClass("pb-[21px]");
    expect(nav).toHaveClass("pl-[21px]");
  });

  it("labels have font-semibold and tracking-[0.5px]", () => {
    render(<TabBar active="inicio" />);
    const activeBtn = screen.getByRole("button", { name: /INICIO/i });
    expect(activeBtn).toHaveClass("font-semibold");
    expect(activeBtn).toHaveClass("text-[10px]");
    expect(activeBtn).toHaveClass("font-display");
  });

  it("Nodo tab has tracking-[0.3px] instead of tracking-[0.5px]", () => {
    render(<TabBar />);
    const nodoBtn = screen.getByRole("button", { name: /NODO/i });
    expect(nodoBtn).toHaveClass("tracking-[0.3px]");
    const inicioBtn = screen.getByRole("button", { name: /INICIO/i });
    expect(inicioBtn).toHaveClass("tracking-[0.5px]");
  });

  it("active prop controls which tab is active (pill swaps)", () => {
    const { rerender } = render(<TabBar active="inicio" />);
    expect(screen.getByRole("button", { name: /INICIO/i })).toHaveClass("bg-primary");
    expect(screen.getByRole("button", { name: /NODO/i })).not.toHaveClass("bg-primary");

    rerender(<TabBar active="nodo" />);
    expect(screen.getByRole("button", { name: /NODO/i })).toHaveClass("bg-primary");
    expect(screen.getByRole("button", { name: /INICIO/i })).not.toHaveClass("bg-primary");
  });

  it("calls onTabChange with tab id when a tab is clicked", () => {
    const onTabChange = vi.fn();
    render(<TabBar onTabChange={onTabChange} />);
    fireEvent.click(screen.getByRole("button", { name: /NODO/i }));
    expect(onTabChange).toHaveBeenCalledWith("nodo" as Tab);
  });

  it("does not throw when onTabChange is not provided", () => {
    render(<TabBar />);
    expect(() => {
      fireEvent.click(screen.getByRole("button", { name: /NODO/i }));
    }).not.toThrow();
  });
});
