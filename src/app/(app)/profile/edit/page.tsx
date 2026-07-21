"use client";

export const dynamic = "force-dynamic";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { updateProfile } from "@/features/profile/actions";

export default function EditProfilePage() {
  const [state, action, pending] = useActionState(updateProfile, null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/profile" className="text-text-muted hover:text-text-secondary">
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
        <h1 className="font-display text-2xl font-bold text-text-primary">Editar perfil</h1>
      </div>

      <form action={action} className="flex flex-col gap-6">
        <section className="flex flex-col gap-4">
          <h2 className="font-display text-sm font-semibold text-text-secondary">Identidad</h2>
          <Input name="nombre" label="Nombre" placeholder="Tu nombre" />
          <Input name="apellido" label="Apellido" placeholder="Tu apellido" />
          <Input name="apodo" label="Apodo" placeholder="Cómo te dicen" />

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-text-secondary">Nombre visible</legend>
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
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-sm font-semibold text-text-secondary">Sobre vos</h2>
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
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-sm font-semibold text-text-secondary">
            Disponibilidad y tarifa
          </h2>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-text-secondary">Disponibilidad</legend>
            <div className="flex gap-2">
              {[
                { value: "disponible", label: "Disponible" },
                { value: "ocupado", label: "Ocupado" },
                { value: "solo_eventos", label: "Solo eventos" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm cursor-pointer has-checked:border-primary has-checked:bg-primary/5"
                >
                  <input
                    type="radio"
                    name="disponibilidad"
                    value={opt.value}
                    className="accent-primary"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>

          <Input name="tarifa_hora" type="number" label="Tarifa por hora (USD)" placeholder="0" />

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium text-text-secondary">
              Visibilidad de tarifa
            </legend>
            <div className="flex gap-2">
              {[
                { value: "publica", label: "Pública" },
                { value: "privada", label: "Privada" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm cursor-pointer has-checked:border-primary has-checked:bg-primary/5"
                >
                  <input
                    type="radio"
                    name="visibilidad_tarifa"
                    value={opt.value}
                    defaultChecked={opt.value === "privada"}
                    className="accent-primary"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        {state?.error && (
          <p className="text-sm text-coral bg-coral/10 rounded-md px-3 py-2">{state.error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Link href="/profile" className="flex-1">
            <SecondaryButton type="button" className="w-full">
              Cancelar
            </SecondaryButton>
          </Link>
          <div className="flex-1">
            <PrimaryButton type="submit" disabled={pending} className="w-full">
              {pending ? "Guardando..." : "Guardar"}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
}
