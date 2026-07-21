import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PrimaryButton } from "@/components/PrimaryButton";

describe("PrimaryButton", () => {
  it("renders with children", () => {
    render(<PrimaryButton>Click me</PrimaryButton>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies disabled state", () => {
    render(<PrimaryButton disabled>Click me</PrimaryButton>);
    expect(screen.getByText("Click me")).toBeDisabled();
  });
});
