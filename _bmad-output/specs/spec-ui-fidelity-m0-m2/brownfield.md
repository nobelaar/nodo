# Brownfield notes

## What already works (preserve)

- Auth: password + Google actions, recovery/reset routes, session middleware patterns.
- Profile: `profiles` read/write, onboarding step actions, `displayName`, tourist tier read-only edit gating (behavior).
- Tasks: list/filter, create, detail, take/state transitions, tourist cannot create.
- Tooling: Next App Router, Tailwind theme start, Vitest + Testing Library, Supabase SSR.

## What is wrong (fix)

| Area         | Current                                                                     | Target                    |
| ------------ | --------------------------------------------------------------------------- | ------------------------- |
| Primitives   | Partial tokens; wrong CTA gradient; emoji TabBar                            | CAP-1, CAP-2              |
| Profile      | Centered avatar + field grid + “Ir al inicio”; tourist “Modo lectura” badge | CAP-6, CAP-7 menu shells  |
| Onboarding   | Generic forms; no photo affordance; copy ≠ Pencil                           | CAP-5                     |
| Auth         | Functional forms; weak brand hero vs 1.1                                    | CAP-4                     |
| Tasks        | Flat list rows; header “Tareas” not “Nodo” hub                              | CAP-3, CAP-9              |
| Inicio       | Redirect only                                                               | Out of scope (assumption) |
| Domain cards | Missing TaskCard (+ others unused)                                          | TaskCard only required    |

## Implemented routes (audit baseline)

- `/auth/login`, `/auth/signup`, `/auth/check-email`, `/auth/recovery`, `/auth/reset-password`
- `/onboarding/step1`, `/onboarding/step2`
- `/profile`, `/profile/edit`
- `/nodo/tasks`, `/nodo/tasks/new`, `/nodo/tasks/[id]`
- `/` redirects authenticated users toward profile (not Pencil Inicio)

## Non-negotiable during reskin

- Do not break auth redirects or RLS.
- Do not mark M3+ done by faking data.
- Prefer composing shared components over page-local one-off CSS.
- **Production-first:** no intentional debt; avatar upload real; tourist membership CTA no-op until M3 (UI only).
