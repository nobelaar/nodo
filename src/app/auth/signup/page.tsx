"use client";

export const dynamic = "force-dynamic";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { signUpWithPassword, signInWithGoogle } from "@/features/auth/actions";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signUpWithPassword, null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-text-primary">Crear cuenta</h2>
        <p className="text-text-secondary text-sm mt-1">Sumate a Nodo Serrano</p>
      </div>

      <form action={action} className="flex flex-col gap-4">
        <Input name="email" type="email" label="Email" placeholder="tu@email.com" required />
        <Input
          name="password"
          type="password"
          label="Contraseña"
          placeholder="Mínimo 6 caracteres"
          required
          minLength={6}
        />

        {state?.error && (
          <p className="text-sm text-coral bg-coral/10 rounded-md px-3 py-2">{state.error}</p>
        )}

        <PrimaryButton type="submit" disabled={pending} className="mt-2">
          {pending ? "Creando cuenta..." : "Crear cuenta"}
        </PrimaryButton>
      </form>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-text-muted">o</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form action={signInWithGoogle}>
        <SecondaryButton type="submit" className="w-full">
          Continuar con Google
        </SecondaryButton>
      </form>

      <p className="text-sm text-text-secondary text-center">
        ¿Ya tenés cuenta?{" "}
        <Link href="/auth/login" className="text-brand-mint hover:underline font-medium">
          Iniciá sesión
        </Link>
      </p>
    </div>
  );
}
