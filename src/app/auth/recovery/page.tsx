"use client";

export const dynamic = "force-dynamic";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { sendPasswordReset } from "@/features/auth/actions";

export default function RecoveryPage() {
  const [state, action, pending] = useActionState(sendPasswordReset, null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-primary">Recuperar contraseña</h2>
        <p className="text-text-secondary text-sm mt-1">Te enviamos un link para restablecerla</p>
      </div>

      <form action={action} className="flex flex-col gap-4">
        <Input name="email" type="email" label="Email" placeholder="tu@email.com" required />

        {state?.error && (
          <p className="text-sm text-coral bg-coral/10 rounded-md px-3 py-2">{state.error}</p>
        )}

        <PrimaryButton type="submit" disabled={pending} className="mt-2">
          {pending ? "Enviando..." : "Enviar link"}
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
