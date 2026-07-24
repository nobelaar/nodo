# Screen inventory (in-scope)

Pencil SSOT: `design/nodo-serrano.pen`. Mobile frame width **390**.

| Pencil frame                 | Node id  | App route(s)                  | CAP          | Notes                                                     |
| ---------------------------- | -------- | ----------------------------- | ------------ | --------------------------------------------------------- |
| 1.1 · Login / Registro       | `RCjjt`  | `/auth/login`, `/auth/signup` | CAP-4        | Brand hero, email/password, forgot, Google, register link |
| 1.2 · Revisá tu email        | `Sk56P`  | `/auth/check-email`           | CAP-4        | Icon, copy, resend, back                                  |
| 1.3 · Recuperar contraseña   | `u1xLt6` | `/auth/recovery`              | CAP-4        |                                                           |
| 1.4 · Restablecer contraseña | `ipTDL`  | `/auth/reset-password`        | CAP-4        |                                                           |
| 1.5 · Onboarding · Paso 1    | `bvpj5`  | `/onboarding/step1`           | CAP-5        | Photo + identity fields                                   |
| 1.6 · Onboarding · Paso 2    | `TvVFf`  | `/onboarding/step2`           | CAP-5        | Bio, telegram, site                                       |
| 2.3 · Nodo — Tareas          | `P77en`  | `/nodo/tasks`                 | CAP-9, CAP-3 | Segmented Tareas/Proyectos; FAB                           |
| 2.6 · Perfil                 | `N9jKVl` | `/profile` (non-tourist)      | CAP-6        | Menu shell                                                |
| 2.7 · Perfil (Tourist)       | `J0GRm`  | `/profile` (tourist)          | CAP-7        | Banner + short menu                                       |
| 3.2 · Editar perfil          | `YOaWa`  | `/profile/edit`               | CAP-8        |                                                           |
| 4.1 · Detalle de tarea       | `dyDLm`  | `/nodo/tasks/[id]`            | CAP-9        |                                                           |
| 4.2 · Crear tarea            | `V0ODk`  | `/nodo/tasks/new`             | CAP-9        |                                                           |
| 7.2 · Vacío — Tareas         | `ZSmb5`  | `/nodo/tasks` (empty)         | CAP-3        |                                                           |

## Explicitly out of scope (this spec)

All other top-level Pencil frames (Inicio, Plantel, Agenda, Admin, Projects, Events, membership request, 404, offline, etc.).

## Acceptance method

For each row: open Pencil frame screenshot vs running route at ~390px. Fail if layout IA, primary CTA placement, or key copy diverges. Minor font-hinting/subpixel differences OK.
