---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
status: ready-for-development
inputDocuments:
  - _bmad-output/specs/spec-ui-fidelity-m0-m2/SPEC.md
  - _bmad-output/specs/spec-ui-fidelity-m0-m2/screen-inventory.md
  - _bmad-output/specs/spec-ui-fidelity-m0-m2/component-parity.md
  - _bmad-output/specs/spec-ui-fidelity-m0-m2/brownfield.md
  - design/nodo-serrano.pen
  - docs/roadmap/Design system.md
  - docs/roadmap/M0 · Fundación.md
  - docs/roadmap/M1 · Cuenta y perfil.md
  - docs/roadmap/M2 · Nodo — Tasks.md
  - docs/roadmap/Stack técnico.md
---

# nodo - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for nodo, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: App theme exposes Pencil design tokens (colors, radii, fonts) for light and dark so UI uses the same vocabulary as `design/nodo-serrano.pen`.
FR2: Theme switch updates surfaces/text using dark tokens; screen visual acceptance is light-first.
FR3: Avatar primitive matches Pencil (gradient fallback, sizes, image when `src`).
FR4: Chip primitive matches Pencil (pill, inset fill, border).
FR5: PrimaryButton matches Pencil (pill; gradient brand-green → brand-blue; outer shadow; default height ~54).
FR6: SecondaryButton matches Pencil (pill; surface + border).
FR7: Input matches Pencil (label + field; pill/soft radius; surface fill).
FR8: TabBar matches Pencil (5 tabs; icons not emoji-only; active pill treatment).
FR9: TierBadge matches Pencil tier label styles.
FR10: RoleChip matches Pencil role presentation.
FR11: TaskCard domain component matches Pencil (radius/shadow/surface; title; estado; category/urgency meta; action affordance).
FR12: Empty tasks state matches Pencil frame `7.2 · Vacío — Tareas`.
FR13: Auth login/signup (`1.1`) match Pencil brand layout and Spanish copy; password + Google flows still work.
FR14: Check-email (`1.2`) matches Pencil structure (icon, copy, resend, back).
FR15: Password recovery (`1.3`) matches Pencil.
FR16: Password reset (`1.4`) matches Pencil.
FR17: Onboarding step 1 (`1.5`) matches Pencil chrome/fields/copy and supports real avatar photo upload to storage + `avatar_url`.
FR18: Onboarding step 2 (`1.6`) matches Pencil structure/labels/CTA; existing step persistence preserved.
FR19: Serrano profile (`2.6`) is menu-shell identity UI (header card, roles, nav rows, theme, session) — not centered field grid.
FR20: Tourist profile (`2.7`) shows identity + Tourist tier, membership banner copy, CTA “Solicitar ser Serrano” visible/styled but no-op until M3, short menu only.
FR21: Edit profile (`3.2`) matches Pencil form chrome; loads current values; real avatar change upload; save via existing update action.
FR22: Nodo tasks hub (`2.3`) has header “Nodo”, Tareas/Proyectos segmented control (Proyectos placeholder OK until M5), TaskCards, FAB/create pattern.
FR23: Task detail (`4.1`) matches Pencil hierarchy, badges, primary actions; existing state transitions work.
FR24: Create task (`4.2`) matches Pencil form/IA; create still works; tourists cannot create.
FR25: Visual acceptance: each in-scope frame in screen-inventory demonstrably matches live route at ~390px width.
FR26: Existing auth, session, onboarding save, profile read/write, and task list/create/detail/take behaviors remain working after reskin.

### NonFunctional Requirements

NFR1: Production-ready bar — no intentional tech debt, vibecode, or “fix later” inside in-scope work; done means shippable.
NFR2: TDD mandatory (Vitest + Testing Library); tests pass before claiming done.
NFR3: Code identifiers in English; user-facing UI strings in Spanish as in Pencil.
NFR4: `design/nodo-serrano.pen` is sole visual SSOT; do not invent alternate layouts/copy/components.
NFR5: Scope freeze — no M3+ product features and no Pencil redesign in this workstream.
NFR6: Preserve auth, server actions, RLS, and data model; backend changes only when fidelity is blocked (avatar storage is allowed/required).
NFR7: Prefer shared DS components over page-local one-off CSS.
NFR8: Mobile-first composition (~390px acceptance width).
NFR9: Avatar backend via Supabase Storage with production bucket/policies.
NFR10: Build order: tokens + primitives → TaskCard → Login → Onboarding → Profile Tourist/Serrano → Edit profile → Tasks hub/detail/create.

### Additional Requirements

- Brownfield: Next.js App Router + TypeScript + Tailwind + Supabase SSR already running; reskin in place.
- No greenfield starter template story required.
- Preserve routes: `/auth/*`, `/onboarding/*`, `/profile`, `/profile/edit`, `/nodo/tasks*`.
- `/` redirect-to-profile may remain (Inicio `2.1` out of scope).
- Phone StatusBar is design chrome only — not required in web shell.
- Do not fake M3+ data or mark later milestones done.
- MemberCard/EventCard/ProjectCard/AporteItem/RequestCard not required unless a listed screen needs them.
- Stack reference: Supabase Auth/Postgres/RLS/Storage; Vitest+TL; Vercel deploy path unchanged.

### UX Design Requirements

UX-DR1: Implement Tailwind `@theme` tokens matching Pencil variables (bg, surface, surface-inset, border, text-_, brand-_, primary, coral, warm-*, raw accents, fonts Space Grotesk/Inter, radii sm/md/lg/xl/pill).
UX-DR2: Primary CTA gradient green→blue (not green→mint).
UX-DR3: TabBar icons + active pill (not emoji-only).
UX-DR4: Task list uses TaskCard, not flat bordered rows.
UX-DR5: Auth brand hero (mark + “Nodo Serrano”) per frame `1.1`.
UX-DR6: Onboarding photo affordance + step chrome (“Paso N de 2”, back, titles) per `1.5`/`1.6`.
UX-DR7: Profile Serrano menu-shell IA per `2.6`.
UX-DR8: Profile Tourist banner + short menu per `2.7`.
UX-DR9: Edit profile header/actions/avatar/nombre-visible controls per `3.2`.
UX-DR10: Nodo hub segmented control + FAB pattern per `2.3`.
UX-DR11: Empty tasks visual per `7.2`.
UX-DR12: Acceptance method: Pencil screenshot vs live route at ~390px; fail on IA/CTA/copy divergence; minor subpixel OK.
UX-DR13: Light-first screen QA; dark token parity + working theme switch; full dark per-screen pixel QA deferred.
UX-DR14: Soft card shadows / warm neomorphic surface language per Design system (as expressed in Pencil components).

### FR Coverage Map

FR1: Epic 1 — Design tokens light/dark
FR2: Epic 1 — Theme switch + light-first acceptance
FR3: Epic 1 — Avatar primitive
FR4: Epic 1 — Chip primitive
FR5: Epic 1 — PrimaryButton green→blue
FR6: Epic 1 — SecondaryButton
FR7: Epic 1 — Input
FR8: Epic 1 — TabBar icons + active pill
FR9: Epic 1 — TierBadge
FR10: Epic 1 — RoleChip
FR11: Epic 4 — TaskCard
FR12: Epic 4 — Empty tasks state 7.2
FR13: Epic 2 — Login/signup 1.1
FR14: Epic 2 — Check-email 1.2
FR15: Epic 2 — Recovery 1.3
FR16: Epic 2 — Reset 1.4
FR17: Epic 3 — Onboarding step 1 + real avatar upload
FR18: Epic 3 — Onboarding step 2
FR19: Epic 3 — Serrano profile 2.6
FR20: Epic 3 — Tourist profile 2.7 (CTA no-op)
FR21: Epic 3 — Edit profile 3.2 + avatar upload
FR22: Epic 4 — Nodo tasks hub 2.3
FR23: Epic 4 — Task detail 4.1
FR24: Epic 4 — Create task 4.2
FR25: Epics 1–4 — Visual acceptance per in-scope frames (gate each epic + final)
FR26: Epics 2–4 — Preserve domain behaviors (auth / profile / tasks)

## Epic List

### Epic 1: Brand system & app chrome

Users experience Nodo Serrano design tokens and shared primitives (buttons, inputs, TabBar, badges) matching Pencil so every later screen can be composed from the real DS.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9, FR10, FR25 (primitives)

### Epic 2: Trusted entry (Auth UI fidelity)

Users sign in, sign up, recover, and reset password on screens that match Pencil brand layout and copy, with existing auth actions preserved.
**FRs covered:** FR13, FR14, FR15, FR16, FR25 (auth frames), FR26 (auth)

### Epic 3: Identity (Onboarding, Profile, Edit)

Users complete onboarding (including real avatar upload), view Serrano/Tourist profile shells, and edit profile with production-ready UI matching Pencil.
**FRs covered:** FR17, FR18, FR19, FR20, FR21, FR25 (identity frames), FR26 (profile)

### Epic 4: Nodo tasks designed

Users browse, open, create, and empty-state tasks in the Nodo hub with TaskCards and IA matching Pencil; task workflows remain functional.
**FRs covered:** FR11, FR12, FR22, FR23, FR24, FR25 (tasks frames), FR26 (tasks)

## Epic 1: Brand system & app chrome

Users experience Nodo Serrano design tokens and shared primitives matching Pencil so later screens compose from the real DS.

### Story 1.1: Design tokens light and dark

As a member using the app,
I want colors, type, and radii to match the Pencil design system in light and dark,
So that the product feels like Nodo Serrano, not a generic shell.

**Acceptance Criteria:**

**Given** the Tailwind theme configuration
**When** tokens are compared to Pencil variables in `design/nodo-serrano.pen`
**Then** bg, surface, surface-inset, border, text-primary/secondary/muted, on-primary, brand-mint/green/blue/violet, primary, coral, warm-*, raw accents, font-display (Space Grotesk), font-body (Inter), and radius-sm/md/lg/xl/pill match Pencil values (FR1, UX-DR1)
**And** dark-mode token values exist for themed surfaces/text (FR2, UX-DR13)
**And** toggling theme updates those surfaces/text without hardcoded one-off colors on chrome that uses tokens (FR2)
**And** unit/theme tests or documented token map prove parity; `pnpm test` passes (NFR2)

### Story 1.2: PrimaryButton, SecondaryButton, and Input parity

As a member,
I want buttons and inputs to match Pencil primitives,
So that every form and CTA feels consistent and on-brand.

**Acceptance Criteria:**

**Given** Pencil PrimaryButton (`qt9Zw`), SecondaryButton (`TCez0`), and Input (`D7fHHd`)
**When** the React components render default and disabled states
**Then** PrimaryButton is pill-shaped, uses gradient brand-green → brand-blue, has outer shadow, and default height ~54 (FR5, UX-DR2)
**And** SecondaryButton is pill-shaped with surface fill and border (FR6)
**And** Input has label + field, soft/pill radius per Pencil, and surface fill (FR7)
**And** component tests cover render and key variants; no green→mint primary gradient remains (NFR2, NFR4)

### Story 1.3: Avatar, Chip, TierBadge, and RoleChip parity

As a member,
I want identity and status chips to match Pencil,
So that tiers, roles, and avatars read correctly across screens.

**Acceptance Criteria:**

**Given** Pencil Avatar, Chip, TierBadge, RoleChip
**When** components render with representative props
**Then** Avatar shows gradient fallback initials and image when `src` is set, with supported sizes (FR3)
**And** Chip is pill with inset fill and border (FR4)
**And** TierBadge and RoleChip match Pencil label/presentation styles (FR9, FR10)
**And** component tests cover main variants; `pnpm test` passes (NFR2)

### Story 1.4: TabBar icons and active pill

As a member navigating the app,
I want a TabBar that matches Pencil (icons + active pill),
So that chrome feels finished and I know which tab is active.

**Acceptance Criteria:**

**Given** Pencil TabBar (`nMDGY`) with five tabs
**When** TabBar renders with each tab active in turn
**Then** five tabs (Inicio, Plantel, Nodo, Agenda, Perfil) use icons (not emoji-only) and active pill treatment matching design intent (FR8, UX-DR3)
**And** inactive/active contrast is clear at mobile width
**And** existing navigation wiring still reaches the same routes
**And** component tests cover active state; `pnpm test` passes (NFR2, FR26 shell)

## Epic 2: Trusted entry (Auth UI fidelity)

Users complete auth flows on screens matching Pencil; existing auth actions preserved.

### Story 2.1: Login and signup brand layout (1.1)

As a visitor,
I want login and signup to match Pencil brand layout and copy,
So that I trust I am entering Nodo Serrano.

**Acceptance Criteria:**

**Given** Pencil frame `1.1 · Login / Registro` (`RCjjt`)
**When** I open `/auth/login` and `/auth/signup` at ~390px
**Then** brand mark + “Nodo Serrano” (or designed hero), field order, primary CTA, Google secondary, and footer links match Pencil IA and Spanish copy (FR13, UX-DR5, FR25)
**And** password sign-in/sign-up and Google actions still succeed or fail with existing error handling (FR26)
**And** tests cover critical UI structure and existing action wiring; production-ready styling only (NFR1, NFR2)

### Story 2.2: Check email screen (1.2)

As a user who just registered or requested email,
I want the check-email screen to match Pencil,
So that next steps are clear.

**Acceptance Criteria:**

**Given** Pencil frame `1.2 · Revisá tu email` (`Sk56P`)
**When** I open `/auth/check-email`
**Then** icon treatment, title, body copy, resend affordance (if designed), and back-to-login match Pencil (FR14, FR25)
**And** navigation back to login works (FR26)

### Story 2.3: Recovery and reset password (1.3, 1.4)

As a user who forgot their password,
I want recovery and reset screens to match Pencil,
So that I can restore access without a jarring UI.

**Acceptance Criteria:**

**Given** Pencil frames `1.3` (`u1xLt6`) and `1.4` (`ipTDL`)
**When** I open `/auth/recovery` and `/auth/reset-password`
**Then** layout, labels, CTAs, and Spanish copy match Pencil (FR15, FR16, FR25)
**And** existing send-reset and update-password actions still work (FR26)
**And** tests cover forms and error display (NFR2)

## Epic 3: Identity (Onboarding, Profile, Edit)

Users onboard with real photo, see correct profile shells, and edit with production UI.

### Story 3.1: Avatar storage and upload pipeline

As a member,
I want to upload a real profile photo to storage,
So that my avatar persists in production (not a fake control).

**Acceptance Criteria:**

**Given** Supabase Storage (or stack-equivalent) for avatars
**When** an authenticated user uploads a valid image
**Then** the file is stored with production bucket policies and `profiles.avatar_url` is updated (FR17, FR21, NFR9)
**And** invalid types/sizes are rejected with clear errors
**And** server/action logic is unit-tested with mocks; no stub-only path remains in-scope (NFR1, NFR2, NFR6)

### Story 3.2: Onboarding step 1 UI and photo (1.5)

As a new tourist completing onboarding,
I want step 1 to match Pencil including working photo upload,
So that I create my identity correctly.

**Acceptance Criteria:**

**Given** Pencil frame `1.5 · Onboarding · Paso 1` (`bvpj5`) and Story 3.1 upload
**When** I open `/onboarding/step1`
**Then** chrome (back if designed, “Paso 1 de 2”), titles/subtitles, fields, and primary CTA match Pencil Spanish copy (FR17, UX-DR6, FR25)
**And** photo control uploads via the real pipeline and sets avatar for later steps/profile
**And** existing step-1 save action still persists identity fields (FR26)
**And** tests cover UI + upload integration points (NFR2)

### Story 3.3: Onboarding step 2 UI (1.6)

As a new user,
I want step 2 to match Pencil,
So that bio and contact match the designed flow.

**Acceptance Criteria:**

**Given** Pencil frame `1.6 · Onboarding · Paso 2` (`TvVFf`)
**When** I open `/onboarding/step2`
**Then** structure, labels, icons if designed, and Finalizar/primary CTA match Pencil (FR18, UX-DR6, FR25)
**And** existing step-2 save still works (FR26)
**And** tests cover form structure and submit (NFR2)

### Story 3.4: Tourist profile shell (2.7)

As a tourist,
I want my profile to match Pencil Tourist shell,
So that I understand my tier and path to membership without fake privileges.

**Acceptance Criteria:**

**Given** Pencil frame `2.7 · Perfil (Tourist)` (`J0GRm`) and `tier = tourist`
**When** I open `/profile`
**Then** identity card, Tourist tier, green membership banner copy, and short menu (edit/theme/logout as designed) match Pencil (FR20, UX-DR8, FR25)
**And** CTA “Solicitar ser Serrano” is visible and styled but does not navigate to a membership flow (no-op until M3) (FR20)
**And** no Serrano-only menu rows that imply privileges tourists lack
**And** tests cover tourist branch rendering (NFR2)

### Story 3.5: Serrano profile shell (2.6)

As a serrano (non-tourist),
I want my profile menu shell to match Pencil,
So that I can reach identity-related actions as designed.

**Acceptance Criteria:**

**Given** Pencil frame `2.6 · Perfil` (`N9jKVl`) and non-tourist tier
**When** I open `/profile`
**Then** identity header card, role chips when present, grouped nav rows, theme and session actions match Pencil menu-shell IA — not a centered field grid (FR19, UX-DR7, FR25)
**And** no “Modo lectura — Tourist” chrome appears
**And** rows that target future milestones may navigate only if route exists; otherwise disabled/honest empty — no fake data (NFR5)
**And** tests cover non-tourist branch (NFR2, FR26)

### Story 3.6: Edit profile UI and avatar change (3.2)

As a member editing my profile,
I want the edit screen to match Pencil with working avatar change and prefilled values,
So that I can update identity in production.

**Acceptance Criteria:**

**Given** Pencil frame `3.2 · Editar perfil` (`YOaWa`) and Story 3.1 upload
**When** I open `/profile/edit`
**Then** header actions, avatar change, fields, and nombre-visible controls match Pencil (FR21, UX-DR9, FR25)
**And** form shows current profile values
**And** avatar change and save persist via real storage + update action (FR21, FR26)
**And** tests cover prefills, save, and upload paths (NFR2, NFR1)

## Epic 4: Nodo tasks designed

Users work tasks in a Nodo hub that matches Pencil; workflows stay functional.

### Story 4.1: TaskCard component

As a serrano browsing work,
I want each task shown as a Pencil TaskCard,
So that urgency, estado, and actions are scannable.

**Acceptance Criteria:**

**Given** Pencil TaskCard (`cboAZ`)
**When** TaskCard renders with sample task props
**Then** card radius/shadow/surface, title, estado chip, category/urgency meta, and action affordance match design intent (FR11, UX-DR4)
**And** component tests cover key estados/urgency; `pnpm test` passes (NFR2)

### Story 4.2: Empty tasks state (7.2)

As a user with no tasks,
I want the empty state to match Pencil,
So that I know what to do next.

**Acceptance Criteria:**

**Given** Pencil frame `7.2 · Vacío — Tareas` (`ZSmb5`) and no tasks (or filtered empty)
**When** I open `/nodo/tasks`
**Then** empty illustration/copy/CTA pattern matches Pencil (FR12, UX-DR11, FR25)
**And** create CTA only appears when the user may create (non-tourist) (FR26)

### Story 4.3: Nodo tasks hub (2.3)

As a member,
I want the Nodo tasks hub to match Pencil IA,
So that I can filter and open tasks in the designed layout.

**Acceptance Criteria:**

**Given** Pencil frame `2.3 · Nodo — Tareas` (`P77en`) and Story 4.1–4.2
**When** I open `/nodo/tasks` with tasks present
**Then** header “Nodo”, segmented Tareas/Proyectos (Proyectos placeholder OK until M5), list of TaskCards, and FAB/create pattern match Pencil (FR22, UX-DR10, FR25)
**And** filters/estado and navigation to detail still work; tourist cannot create (FR26)
**And** tests cover hub structure and list wiring (NFR2)

### Story 4.4: Task detail (4.1)

As a serrano,
I want task detail to match Pencil,
So that I can take or complete work with clear hierarchy.

**Acceptance Criteria:**

**Given** Pencil frame `4.1 · Detalle de tarea` (`dyDLm`)
**When** I open `/nodo/tasks/[id]`
**Then** hierarchy, badges, body, and primary actions match Pencil (FR23, FR25)
**And** existing take/state transitions still work under RLS rules (FR26)
**And** tests cover detail render and primary actions (NFR2)

### Story 4.5: Create task (4.2)

As a serrano creating work,
I want the create-task screen to match Pencil,
So that publishing a task feels designed and production-ready.

**Acceptance Criteria:**

**Given** Pencil frame `4.2 · Crear tarea` (`V0ODk`)
**When** I open `/nodo/tasks/new` as a non-tourist
**Then** form IA, labels, and primary CTA match Pencil (FR24, FR25)
**And** create still persists a task; tourists remain blocked (FR26)
**And** tests cover form and authorization behavior (NFR2, NFR1)
