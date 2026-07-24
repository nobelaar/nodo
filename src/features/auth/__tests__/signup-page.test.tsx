import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockSignUpWithPassword = vi.hoisted(() => vi.fn());
const mockSignInWithGoogle = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/actions", () => ({
  signUpWithPassword: mockSignUpWithPassword,
  signInWithGoogle: mockSignInWithGoogle,
}));

import SignupPage from "@/app/auth/signup/page";

describe("SignupPage", () => {
  it("renders brand hero with Mountain icon, title, and subtitle", () => {
    render(<SignupPage />);
    expect(screen.getByText("Nodo Serrano")).toBeInTheDocument();
    expect(screen.getByText("El backoffice de la comunidad")).toBeInTheDocument();
    expect(document.querySelector("svg")).toBeTruthy();
  });

  it("renders PrimaryButton with text Crear cuenta", () => {
    render(<SignupPage />);
    expect(screen.getByRole("button", { name: "Crear cuenta" })).toBeInTheDocument();
  });

  it("renders footer with ¿Ya tenés cuenta? and Iniciá sesión link", () => {
    render(<SignupPage />);
    expect(screen.getByText(/¿Ya tenés cuenta\?/)).toBeInTheDocument();
    const sesionLink = screen.getByText("Iniciá sesión");
    expect(sesionLink).toBeInTheDocument();
    expect(sesionLink.closest("a")).toHaveAttribute("href", "/auth/login");
  });
});
