"use client";

import {
  Avatar,
  Chip,
  PrimaryButton,
  SecondaryButton,
  Input,
  StatusBar,
  TabBar,
  TierBadge,
  RoleChip,
} from "@/components";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SupabaseHealthcheck } from "@/components/SupabaseHealthcheck";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full bg-bg">
      <StatusBar />

      <div className="flex-1 px-5 py-6 flex flex-col gap-8 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-display-lg font-bold text-text-primary">
              Nodo Serrano
            </h1>
            <p className="text-text-secondary text-sm">M0 · Fundación</p>
          </div>
          <ThemeToggle />
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Conexión
          </h2>
          <div className="rounded-lg bg-surface border border-border p-4 flex items-center justify-between">
            <span className="text-sm text-text-secondary">Supabase</span>
            <SupabaseHealthcheck />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Colors
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "bg", bg: "bg-bg" },
              { label: "surface", bg: "bg-surface" },
              { label: "surface-inset", bg: "bg-surface-inset" },
              { label: "primary", bg: "bg-primary" },
            ].map((c) => (
              <div
                key={c.label}
                className={`${c.bg} rounded-md border border-border p-3 text-xs font-medium text-text-secondary`}
              >
                {c.label}
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Brand & Accents
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Mint", className: "bg-brand-mint text-on-primary" },
              { label: "Green", className: "bg-brand-green text-on-primary" },
              { label: "Blue", className: "bg-brand-blue text-on-primary" },
              {
                label: "Violet",
                className: "bg-brand-violet text-on-primary",
              },
            ].map((c) => (
              <span
                key={c.label}
                className={`inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium ${c.className}`}
              >
                {c.label}
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Components
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary w-24">Avatar</span>
              <Avatar name="Nodo Serrano" size="sm" />
              <Avatar name="Juan Pérez" size="md" />
              <Avatar name="María García" size="lg" />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary w-24">TierBadge</span>
              <TierBadge tier="tourist" />
              <TierBadge tier="scholar" />
              <TierBadge tier="standard" />
              <TierBadge tier="founder" />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary w-24">RoleChip</span>
              <RoleChip label="Infra" confirmed />
              <RoleChip label="RRSS" />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary w-24">Chip</span>
              <Chip label="Default" />
              <Chip label="Mint" variant="mint" />
              <Chip label="Blue" variant="blue" />
              <Chip label="Violet" variant="violet" />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary w-24">Buttons</span>
              <PrimaryButton size="sm">Primary</PrimaryButton>
              <SecondaryButton size="sm">Secondary</SecondaryButton>
            </div>

            <div>
              <span className="text-sm text-text-secondary w-24 mb-2 block">
                Input
              </span>
              <Input label="Email" placeholder="tu@email.com" />
            </div>

            <div>
              <span className="text-sm text-text-secondary w-24 mb-2 block">
                Input error
              </span>
              <Input
                label="Password"
                type="password"
                error="Debe tener al menos 8 caracteres"
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-lg font-semibold text-text-primary">
            TabBar
          </h2>
          <div className="rounded-lg border border-border overflow-hidden">
            <TabBar active="inicio" />
          </div>
        </section>
      </div>
    </div>
  );
}
