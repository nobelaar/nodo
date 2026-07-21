"use client";

import { useActionState } from "react";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { saveOnboardingStep2 } from "@/features/profile/actions";

export const dynamic = "force-dynamic";

export default function OnboardingStep2() {
  const [state, action, pending] = useActionState(saveOnboardingStep2, null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Paso 2 de 2
        </p>
        <h2 className="font-display text-2xl font-bold text-text-primary mt-1">Tu perfil</h2>
        <p className="text-text-secondary text-sm mt-1">Contanos más sobre vos</p>
      </div>

      <form action={action} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bio" className="text-sm font-medium text-text-secondary">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            placeholder="Contanos quién sos y qué hacés..."
            className="h-auto rounded-md border border-border bg-surface px-4 py-3 text-base text-text-primary placeholder:text-text-muted focus:outline-hidden focus:ring-2 focus:ring-primary/40 resize-none"
          />
        </div>

        <Input name="contacto_telegram" label="Telegram" placeholder="@usuario" />
        <Input name="sitio_url" label="Sitio web" type="url" placeholder="https://tusitio.com" />

        {state?.error && (
          <p className="text-sm text-coral bg-coral/10 rounded-md px-3 py-2">{state.error}</p>
        )}

        <PrimaryButton type="submit" disabled={pending} className="mt-4">
          {pending ? "Guardando..." : "Completar perfil"}
        </PrimaryButton>
      </form>
    </div>
  );
}
