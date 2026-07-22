"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { createTask } from "@/features/tasks/actions";

export const dynamic = "force-dynamic";

const CATEGORIAS = [
  { value: "reparacion", label: "Reparación" },
  { value: "limpieza", label: "Limpieza" },
  { value: "compra", label: "Compra" },
  { value: "mantenimiento", label: "Mantenimiento" },
  { value: "otro", label: "Otro" },
];

const URGENCIAS = [
  { value: "baja", label: "Baja" },
  { value: "media", label: "Media" },
  { value: "alta", label: "Alta" },
];

export default function NewTaskPage() {
  const [state, action, pending] = useActionState(createTask, null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/nodo/tasks" className="text-text-muted hover:text-text-secondary">
          <svg
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="font-display text-2xl font-bold text-text-primary">Crear tarea</h1>
      </div>

      <form action={action} className="flex flex-col gap-4">
        <Input name="titulo" label="Título" placeholder="¿Qué hay que hacer?" required />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="descripcion" className="text-sm font-medium text-text-secondary">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={3}
            placeholder="Más detalles..."
            className="h-auto rounded-md border border-border bg-surface px-4 py-3 text-base text-text-primary placeholder:text-text-muted focus:outline-hidden focus:ring-2 focus:ring-primary/40 resize-none"
          />
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-text-secondary">Categoría</legend>
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.map((c) => (
              <label
                key={c.value}
                className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm cursor-pointer has-checked:border-primary has-checked:bg-primary/5"
              >
                <input
                  type="radio"
                  name="categoria"
                  value={c.value}
                  defaultChecked={c.value === "otro"}
                  className="accent-primary"
                />
                {c.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-text-secondary">Urgencia</legend>
          <div className="flex gap-2">
            {URGENCIAS.map((u) => (
              <label
                key={u.value}
                className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm cursor-pointer has-checked:border-primary has-checked:bg-primary/5"
              >
                <input
                  type="radio"
                  name="urgencia"
                  value={u.value}
                  defaultChecked={u.value === "media"}
                  className="accent-primary"
                />
                {u.label}
              </label>
            ))}
          </div>
        </fieldset>

        {state?.error && (
          <p className="text-sm text-coral bg-coral/10 rounded-md px-3 py-2">{state.error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Link href="/nodo/tasks" className="flex-1">
            <PrimaryButton type="button" className="w-full">
              Cancelar
            </PrimaryButton>
          </Link>
          <div className="flex-1">
            <PrimaryButton type="submit" disabled={pending} className="w-full">
              {pending ? "Creando..." : "Crear tarea"}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
}
