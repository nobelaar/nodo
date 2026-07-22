import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBar } from "./StatusBar";

describe("StatusBar", () => {
  it("renders without crashing", () => {
    render(<StatusBar />);
    expect(screen.getByText("9:41")).toBeInTheDocument();
  });

  it("accepts custom className", () => {
    render(<StatusBar className="my-status" />);
    expect(screen.getByText("9:41").parentElement).toHaveClass("my-status");
  });
});
