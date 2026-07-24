import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockSignInWithPassword = vi.hoisted(() => vi.fn());
const mockSignInWithGoogle = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/actions", () => ({
  signInWithPassword: mockSignInWithPassword,
  signInWithGoogle: mockSignInWithGoogle,
}));

import LoginPage from "@/app/auth/login/page";

describe("LoginPage", () => {
  it("renders brand hero with Mountain icon, title, and subtitle", () => {
    render(<LoginPage />);
    expect(screen.getByText("Nodo Serrano")).toBeInTheDocument();
    expect(screen.getByText("El backoffice de la comunidad")).toBeInTheDocument();
    expect(document.querySelector("svg")).toBeTruthy();
  });

  it("renders email and password inputs in order", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    const pwInput = document.querySelector("input[type='password']");
    expect(pwInput).toBeInTheDocument();
    const formFields = document.querySelectorAll("input");
    expect(formFields[0].getAttribute("name")).toBe("email");
  });

  it("renders forgot password link", () => {
    render(<LoginPage />);
    const forgotLink = screen.getByText(/¿Olvidaste tu contraseña/);
    expect(forgotLink).toBeInTheDocument();
    expect(forgotLink.closest("a")).toHaveAttribute("href", "/auth/recovery");
  });

  it("renders PrimaryButton with text Ingresar", () => {
    render(<LoginPage />);
    expect(screen.getByRole("button", { name: "Ingresar" })).toBeInTheDocument();
  });

  it("renders divider with o text", () => {
    render(<LoginPage />);
    expect(screen.getByText("o")).toBeInTheDocument();
  });

  it("renders Google SecondaryButton", () => {
    render(<LoginPage />);
    expect(screen.getByRole("button", { name: /Continuar con Google/i })).toBeInTheDocument();
  });

  it("renders footer with ¿Primera vez? and Creá tu cuenta link", () => {
    render(<LoginPage />);
    expect(screen.getByText(/¿Primera vez\?/)).toBeInTheDocument();
    const cuentaLink = screen.getByText("Creá tu cuenta");
    expect(cuentaLink).toBeInTheDocument();
    expect(cuentaLink.closest("a")).toHaveAttribute("href", "/auth/signup");
  });

  it("shows error message after failed submission", async () => {
    mockSignInWithPassword.mockReturnValue({ error: "Credenciales inválidas" });
    render(<LoginPage />);
    const form = document.querySelector("form");
    fireEvent.submit(form!);
    expect(await screen.findByText("Credenciales inválidas")).toBeInTheDocument();
  });
});
