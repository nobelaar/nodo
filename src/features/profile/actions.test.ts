import { describe, expect, it, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  getUser: vi.fn(),
  profilesUpdate: vi.fn(),
  profilesUpdateEq: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: { getUser: mocks.getUser },
    from: vi.fn(() => ({
      update: mocks.profilesUpdate.mockImplementation(() => ({
        eq: mocks.profilesUpdateEq,
      })),
    })),
  }),
}));

import { saveOnboardingStep1, saveOnboardingStep2, updateProfile } from "./actions";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("saveOnboardingStep1", () => {
  it("updates profile and redirects on success", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: { id: "test-user-id" } } });
    mocks.profilesUpdateEq.mockResolvedValue({ data: null, error: null });

    const fd = new FormData();
    fd.set("nombre", "Juan");
    fd.set("apellido", "Pérez");
    fd.set("apodo", "juancito");
    fd.set("nombre_visible", "nombre_apellido");
    fd.set("fecha_nacimiento", "1990-01-15");

    try {
      await saveOnboardingStep1(null, fd);
    } catch {
      // redirect throws
    }

    expect(mocks.profilesUpdate).toHaveBeenCalledWith({
      nombre: "Juan",
      apellido: "Pérez",
      apodo: "juancito",
      nombre_visible: "nombre_apellido",
      fecha_nacimiento: "1990-01-15",
    });
    expect(mocks.profilesUpdateEq).toHaveBeenCalledWith("id", "test-user-id");
  });

  it("returns error when supabase update fails", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: { id: "test-user-id" } } });
    mocks.profilesUpdateEq.mockResolvedValue({
      data: null,
      error: { message: "DB error" },
    });

    const fd = new FormData();
    fd.set("nombre", "Juan");
    fd.set("nombre_visible", "nombre_apellido");

    const result = await saveOnboardingStep1(null, fd);

    expect(result).toEqual({ error: "DB error" });
  });

  it("returns error when user is not authenticated", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: null } });

    const result = await saveOnboardingStep1(null, new FormData());

    expect(result).toEqual({ error: "No autorizado" });
  });
});

describe("saveOnboardingStep2", () => {
  it("updates profile and redirects on success", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: { id: "test-user-id" } } });
    mocks.profilesUpdateEq.mockResolvedValue({ data: null, error: null });

    const fd = new FormData();
    fd.set("bio", "Hello I am Juan");
    fd.set("contacto_telegram", "@juan");
    fd.set("sitio_url", "https://example.com");

    try {
      await saveOnboardingStep2(null, fd);
    } catch {
      // redirect throws
    }

    expect(mocks.profilesUpdate).toHaveBeenCalledWith({
      bio: "Hello I am Juan",
      contacto_telegram: "@juan",
      sitio_url: "https://example.com",
    });
    expect(mocks.profilesUpdateEq).toHaveBeenCalledWith("id", "test-user-id");
  });

  it("returns error when supabase update fails", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: { id: "test-user-id" } } });
    mocks.profilesUpdateEq.mockResolvedValue({
      data: null,
      error: { message: "DB error" },
    });

    const result = await saveOnboardingStep2(null, new FormData());

    expect(result).toEqual({ error: "DB error" });
  });

  it("returns error when user is not authenticated", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: null } });

    const result = await saveOnboardingStep2(null, new FormData());

    expect(result).toEqual({ error: "No autorizado" });
  });
});

describe("updateProfile", () => {
  it("updates profile with numeric tarifa_hora and redirects on success", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: { id: "test-user-id" } } });
    mocks.profilesUpdateEq.mockResolvedValue({ data: null, error: null });

    const fd = new FormData();
    fd.set("nombre", "Juan");
    fd.set("apellido", "Pérez");
    fd.set("apodo", "juancito");
    fd.set("nombre_visible", "nombre_apellido");
    fd.set("fecha_nacimiento", "1990-01-15");
    fd.set("bio", "Hello");
    fd.set("contacto_telegram", "@juan");
    fd.set("sitio_url", "https://example.com");
    fd.set("disponibilidad", "full_time");
    fd.set("visibilidad_tarifa", "publica");
    fd.set("tarifa_hora", "50");

    try {
      await updateProfile(null, fd);
    } catch {
      // redirect throws
    }

    expect(mocks.profilesUpdate).toHaveBeenCalledWith({
      nombre: "Juan",
      apellido: "Pérez",
      apodo: "juancito",
      nombre_visible: "nombre_apellido",
      fecha_nacimiento: "1990-01-15",
      bio: "Hello",
      contacto_telegram: "@juan",
      sitio_url: "https://example.com",
      disponibilidad: "full_time",
      visibilidad_tarifa: "publica",
      tarifa_hora: 50,
    });
    expect(mocks.profilesUpdateEq).toHaveBeenCalledWith("id", "test-user-id");
  });

  it("returns error when supabase update fails", async () => {
    mocks.getUser.mockResolvedValue({ data: { user: { id: "test-user-id" } } });
    mocks.profilesUpdateEq.mockResolvedValue({
      data: null,
      error: { message: "DB error" },
    });

    const result = await updateProfile(null, new FormData());

    expect(result).toEqual({ error: "DB error" });
  });
});
