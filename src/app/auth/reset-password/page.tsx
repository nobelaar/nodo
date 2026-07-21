"use client";

export const dynamic = "force-dynamic";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { resetPassword } from "@/features/auth/actions";

export default function ResetPasswordPage() {
  const [state, action, pending] = useActionState(resetPassword, null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Restablecer contraseña
        </h2>
        <p className="text-text-secondary text-sm mt-1">Elegí una contraseña nueva</p>
      </div>

      <form action={action} className="flex flex-col gap-4">
        <Input
          name="password"
          type="password"
          label="Nueva contraseña"
          placeholder="Mínimo 6 caracteres"
          required
          minLength={6}
        />

        {state?.error && (
          <p className="text-sm text-coral bg-coral/10 rounded-md px-3 py-2">{state.error}</p>
        )}

        <PrimaryButton type="submit" disabled={pending} className="mt-2">
          {pending ? "Guardando..." : "Guardar contraseña"}
        </PrimaryButton>
      </form>

      <p className="text-sm text-text-secondary text-center">
        <Link href="/auth/login" className="text-brand-mint hover:underline font-medium">
          Volver al inicio
        </Link>
      </p>
    </div>
  );
}
