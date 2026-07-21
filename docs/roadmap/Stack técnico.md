---
tags: [roadmap, referencia, stack]
---

# 🧱 Stack técnico

Decisiones de arquitectura. Contexto en [[2026-07-20-nodo-serrano-backoffice-design|PRD §7]].

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS. Mobile-first, PWA.
- **UI:** tokens de Figma como tema de Tailwind → ver [[Design system]]. Estética neumórfica cálida.
- **Backend/datos:** **Supabase** — Auth (email + Google), Postgres, [[Seguridad RLS|RLS]], Storage (avatares).
- **Auth en Next:** `@supabase/ssr` (createServerClient/createBrowserClient + middleware de sesión).
- **PWA:** manifest + service worker (Serwist o `next-pwa`). Se arma en [[M7 · Cumpleaños, PWA y pulido]].
- **Hosting:** Vercel.
- **Testing:** Vitest + Testing Library (unit/componente); Supabase local (CLI) para integración/RLS.

## A decidir en [[M0 · Fundación]]
- Gestor de paquetes (pnpm sugerido) y versión de Node (24 LTS).
- Migraciones: **Supabase CLI** (`supabase/migrations`) versionadas en el repo.
- Estructura de carpetas por **feature** (no por capa técnica).
- CI/deploy en Vercel + envs (`vercel env`).
