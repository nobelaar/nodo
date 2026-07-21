"use client";

import { useActionState } from "react";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { saveOnboardingStep1 } from "@/features/profile/actions";

export const dynamic = "force-dynamic";

export default function OnboardingStep1() {
  const [state, action, pending] = useActionState(saveOnboardingStep1, null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Paso 1 de 2
        </p>
        <h2 className="font-display text-2xl font-bold text-text-primary mt-1">¿Quién sos?</h2>
        <p className="text-text-secondary text-sm mt-1">Contanos un poco sobre vos</p>
      </div>

      <form action={action} className="flex flex-col gap-4">
        <Input name="nombre" label="Nombre" placeholder="Tu nombre" />
        <Input name="apellido" label="Apellido" placeholder="Tu apellido" />
        <Input name="apodo" label="Apodo (opcional)" placeholder="Cómo te dicen" />

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-text-secondary">
            ¿Cómo querés que te vean?
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "apodo", label: "Apodo" },
              { value: "nombre_apellido", label: "Nombre Apellido" },
              { value: "apellido_nombre", label: "Apellido Nombre" },
            ].map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm cursor-pointer has-checked:border-primary has-checked:bg-primary/5"
              >
                <input
                  type="radio"
                  name="nombre_visible"
                  value={opt.value}
                  defaultChecked={opt.value === "nombre_apellido"}
                  className="accent-primary"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <Input name="fecha_nacimiento" type="date" label="Fecha de nacimiento" />

        {state?.error && (
          <p className="text-sm text-coral bg-coral/10 rounded-md px-3 py-2">{state.error}</p>
        )}

        <PrimaryButton type="submit" disabled={pending} className="mt-4">
          {pending ? "Guardando..." : "Siguiente"}
        </PrimaryButton>
      </form>
    </div>
  );
}
