import { describe, expect, it, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  getUser: vi.fn(),
  profilesSelect: vi.fn(),
  profilesSelectEq: vi.fn(),
  profilesSelectSingle: vi.fn(),
  tasksInsert: vi.fn(),
  tasksUpdate: vi.fn(),
  tasksUpdateEq1: vi.fn(),
  tasksUpdateEq2: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: { getUser: mocks.getUser },
    from: vi.fn((table: string) => {
      if (table === "profiles") {
        return {
          select: mocks.profilesSelect.mockImplementation(() => ({
            eq: mocks.profilesSelectEq.mockImplementation(() => ({
              single: mocks.profilesSelectSingle,
            })),
          })),
        };
      }
      if (table === "tasks") {
        return {
          insert: mocks.tasksInsert,
          update: mocks.tasksUpdate.mockImplementation(() => ({
            eq: mocks.tasksUpdateEq1.mockImplementation(() => ({
              eq: mocks.tasksUpdateEq2,
            })),
          })),
        };
      }
      return {};
    }),
  }),
}));

import { createTask, takeTask, markTaskDone, verifyTask } from "./actions";

beforeEach(() => {
  vi.clearAllMocks();
});

function setupAuth(userId = "test-user-id") {
  mocks.getUser.mockResolvedValue({ data: { user: { id: userId } } });
}

describe("createTask", () => {
  it("creates a task and redirects on success", async () => {
    setupAuth();
    mocks.profilesSelectSingle.mockResolvedValue({ data: { tier: "standard" } });
    mocks.tasksInsert.mockResolvedValue({ error: null });

    const fd = new FormData();
    fd.set("titulo", "Fix the roof");
    fd.set("descripcion", "The roof needs urgent repair");
    fd.set("categoria", "mantenimiento");
    fd.set("urgencia", "alta");

    try {
      await createTask(null, fd);
    } catch {
      // redirect throws
    }

    expect(mocks.profilesSelect).toHaveBeenCalledWith("tier");
    expect(mocks.profilesSelectEq).toHaveBeenCalledWith("id", "test-user-id");
    expect(mocks.tasksInsert).toHaveBeenCalledWith({
      titulo: "Fix the roof",
      descripcion: "The roof needs urgent repair",
      categoria: "mantenimiento",
      urgencia: "alta",
      creado_por: "test-user-id",
    });
  });

  it("blocks tourist-tier users from creating tasks", async () => {
    setupAuth();
    mocks.profilesSelectSingle.mockResolvedValue({ data: { tier: "tourist" } });

    const result = await createTask(null, new FormData());

    expect(result).toEqual({ error: "Solo los serranos pueden crear tareas" });
    expect(mocks.tasksInsert).not.toHaveBeenCalled();
  });

  it("returns error when task insert fails", async () => {
    setupAuth();
    mocks.profilesSelectSingle.mockResolvedValue({ data: { tier: "standard" } });
    mocks.tasksInsert.mockResolvedValue({
      error: { message: "DB insert error" },
    });

    const result = await createTask(null, new FormData());

    expect(result).toEqual({ error: "DB insert error" });
  });
});

describe("takeTask", () => {
  const makeFormData = (taskId = "task-001") => {
    const fd = new FormData();
    fd.set("taskId", taskId);
    return fd;
  };

  it("takes an open task and redirects on success", async () => {
    setupAuth();
    mocks.profilesSelectSingle.mockResolvedValue({ data: { tier: "standard" } });
    mocks.tasksUpdateEq2.mockResolvedValue({ data: null, error: null });

    try {
      await takeTask(null, makeFormData());
    } catch {
      // redirect throws
    }

    expect(mocks.profilesSelect).toHaveBeenCalledWith("tier");
    expect(mocks.profilesSelectEq).toHaveBeenCalledWith("id", "test-user-id");
    expect(mocks.tasksUpdate).toHaveBeenCalledWith({
      estado: "tomada",
      tomada_por: "test-user-id",
    });
    expect(mocks.tasksUpdateEq1).toHaveBeenCalledWith("id", "task-001");
    expect(mocks.tasksUpdateEq2).toHaveBeenCalledWith("estado", "abierta");
  });

  it("blocks tourist-tier users from taking tasks", async () => {
    setupAuth();
    mocks.profilesSelectSingle.mockResolvedValue({ data: { tier: "tourist" } });

    const result = await takeTask(null, makeFormData());

    expect(result).toEqual({ error: "Solo los serranos pueden tomar tareas" });
    expect(mocks.tasksUpdate).not.toHaveBeenCalled();
  });

  it("returns error when task update fails", async () => {
    setupAuth();
    mocks.profilesSelectSingle.mockResolvedValue({ data: { tier: "standard" } });
    mocks.tasksUpdateEq2.mockResolvedValue({
      data: null,
      error: { message: "Task already taken" },
    });

    const result = await takeTask(null, makeFormData());

    expect(result).toEqual({ error: "Task already taken" });
  });
});

describe("markTaskDone", () => {
  const makeFormData = (taskId = "task-001") => {
    const fd = new FormData();
    fd.set("taskId", taskId);
    return fd;
  };

  it("marks task as done for the user who took it and redirects", async () => {
    setupAuth("taker-user-id");
    mocks.tasksUpdateEq2.mockResolvedValue({ data: null, error: null });

    try {
      await markTaskDone(null, makeFormData());
    } catch {
      // redirect throws
    }

    expect(mocks.tasksUpdate).toHaveBeenCalledWith({ estado: "hecha" });
    expect(mocks.tasksUpdateEq1).toHaveBeenCalledWith("id", "task-001");
    expect(mocks.tasksUpdateEq2).toHaveBeenCalledWith("tomada_por", "taker-user-id");
  });

  it("returns error when update fails", async () => {
    setupAuth();
    mocks.tasksUpdateEq2.mockResolvedValue({
      data: null,
      error: { message: "Task not found" },
    });

    const result = await markTaskDone(null, makeFormData());

    expect(result).toEqual({ error: "Task not found" });
  });
});

describe("verifyTask", () => {
  const makeFormData = (taskId = "task-001") => {
    const fd = new FormData();
    fd.set("taskId", taskId);
    return fd;
  };

  it("allows platform admin to verify a done task and redirects", async () => {
    setupAuth("admin-user-id");
    mocks.profilesSelectSingle.mockResolvedValue({ data: { is_platform_admin: true } });
    mocks.tasksUpdateEq2.mockResolvedValue({ data: null, error: null });

    try {
      await verifyTask(null, makeFormData());
    } catch {
      // redirect throws
    }

    expect(mocks.profilesSelect).toHaveBeenCalledWith("is_platform_admin");
    expect(mocks.profilesSelectEq).toHaveBeenCalledWith("id", "admin-user-id");
    expect(mocks.tasksUpdate).toHaveBeenCalledWith({ estado: "verificada" });
    expect(mocks.tasksUpdateEq1).toHaveBeenCalledWith("id", "task-001");
    expect(mocks.tasksUpdateEq2).toHaveBeenCalledWith("estado", "hecha");
  });

  it("blocks non-admin users from verifying tasks", async () => {
    setupAuth("regular-user-id");
    mocks.profilesSelectSingle.mockResolvedValue({ data: { is_platform_admin: false } });

    const result = await verifyTask(null, makeFormData());

    expect(result).toEqual({ error: "Solo un admin puede verificar tareas" });
    expect(mocks.tasksUpdate).not.toHaveBeenCalled();
  });
});
