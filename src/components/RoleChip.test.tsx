import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RoleChip } from "./RoleChip";

describe("RoleChip", () => {
  it("renders the label text", () => {
    render(<RoleChip label="Admin" />);
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("applies confirmed styling when confirmed is true", () => {
    render(<RoleChip label="Admin" confirmed={true} />);
    const chip = screen.getByText("Admin");
    expect(chip).toHaveClass("bg-primary/10");
    expect(chip).toHaveClass("border-primary/30");
    expect(chip).toHaveClass("text-primary");
  });

  it("applies unconfirmed styling when confirmed is false", () => {
    render(<RoleChip label="Moderator" confirmed={false} />);
    const chip = screen.getByText("Moderator");
    expect(chip).toHaveClass("bg-surface-inset");
    expect(chip).toHaveClass("border-border");
    expect(chip).toHaveClass("text-text-secondary");
  });

  it("shows pending indicator dot when not confirmed", () => {
    render(<RoleChip label="Member" confirmed={false} />);
    const dot = screen.getByTitle("Pendiente de confirmación");
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveClass("bg-warm-yellow");
  });

  it("does not show pending dot when confirmed", () => {
    render(<RoleChip label="Admin" confirmed={true} />);
    expect(screen.queryByTitle("Pendiente de confirmación")).not.toBeInTheDocument();
  });

  it("accepts custom className", () => {
    render(<RoleChip label="Admin" className="my-role" />);
    expect(screen.getByText("Admin")).toHaveClass("my-role");
  });
});
