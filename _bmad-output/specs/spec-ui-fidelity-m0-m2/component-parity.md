# Component parity (Pencil → code)

## Design tokens (Pencil variables → theme)

Must exist and match values (light/dark where themed):

| Token                                                           | Role                    |
| --------------------------------------------------------------- | ----------------------- |
| `bg`, `surface`, `surface-inset`, `border`                      | Surfaces                |
| `text-primary`, `text-secondary`, `text-muted`, `on-primary`    | Text                    |
| `brand-mint`, `brand-green`, `brand-blue`, `brand-violet`       | Brand                   |
| `primary`, `coral`, `warm-yellow`, `warm-orange`, `warm-violet` | Accents                 |
| `mint-raw`, `blue-raw`, `violet-raw`                            | Raw accents             |
| `font-display` = Space Grotesk, `font-body` = Inter             | Type                    |
| `radius-sm/md/lg/xl/pill`                                       | Radii (12/18/24/30/999) |

## Primitives required (CAP-2)

| Pencil component | id       | Code target                            | Parity musts                                                                  |
| ---------------- | -------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| Avatar           | `aaHkg`  | `src/components/Avatar.tsx`            | Gradient fallback; sizes; image when `src`                                    |
| Chip             | `MSKvX`  | `src/components/Chip.tsx`              | Pill, inset fill, border                                                      |
| PrimaryButton    | `qt9Zw`  | `src/components/PrimaryButton.tsx`     | Pill; **gradient brand-green → brand-blue**; outer shadow; height ~54 default |
| SecondaryButton  | `TCez0`  | `src/components/SecondaryButton.tsx`   | Pill; surface + border                                                        |
| Input            | `D7fHHd` | `src/components/Input.tsx`             | Label + field; pill/soft radius per Pencil; surface fill                      |
| TabBar           | `nMDGY`  | `src/components/TabBar.tsx` (+ client) | 5 tabs; **icons not emoji-only**; **active pill**                             |
| TierBadge        | `wv7cW`  | `src/components/TierBadge.tsx`         | Tier label styles per design                                                  |
| RoleChip         | `Xk6Li`  | `src/components/RoleChip.tsx`          | Role presentation                                                             |

## Domain component required (CAP-3)

| Pencil   | id      | Code target                           | Parity musts                                                                             |
| -------- | ------- | ------------------------------------- | ---------------------------------------------------------------------------------------- |
| TaskCard | `cboAZ` | new `TaskCard` (or feature component) | Card radius/shadow/surface; title; estado chip; category/urgency meta; action affordance |

## Not required unless a listed screen needs them

MemberCard, EventCard, ProjectCard, AporteItem, RequestCard, StatusBar (device chrome).

## Known code gaps (brownfield)

- PrimaryButton currently green→mint; must become green→blue.
- TabBar uses emoji; must match Pencil icon + active treatment.
- Task list uses plain bordered rows; no TaskCard.
- Profile pages use field grids/menus that do not match 2.6/2.7 shells.
- Avatar upload/storage not wired; required for onboarding + edit (real, production).
