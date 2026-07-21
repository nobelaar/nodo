---
tags: [roadmap, milestone]
status: todo
depends-on: "[[M1 · Cuenta y perfil]]"
---

# M5 · Proyectos

**Objetivo:** proyectos de la comunidad con dinámica tipo grupo (ingreso abierto o por aprobación, admins de proyecto).

**Entregable:** sub-pestaña Proyectos en [[M2 · Nodo — Tasks|Nodo]], crear, detalle, unirse y gestión de ingresos.

## Pantallas (diseño)
`2.4 Nodo — Proyectos` · `4.3 Detalle de proyecto` · `4.4 Crear proyecto` · `4.5 Solicitudes de ingreso` · `7.3 Vacío Proyectos`.

## Datos
`projects`, `project_members` (rol `miembro/admin`, estado `pendiente/aprobado`). Ver [[Modelo de datos]] y [[Seguridad RLS]].

## Alcance
- [ ] Crear proyecto: nombre, descripción, estado (`idea/en_curso/pausado/terminado`), ingreso (`abierto/aprobacion`).
- [ ] Detalle: estado, miembros, admins; unirse (o solicitar).
- [ ] Admin de proyecto: designar admins + aprobar/rechazar ingresos.
- [ ] Proyectos de cada persona en su perfil.
- [ ] RLS a nivel proyecto.

## Done (DoD)
- Un serrano crea un proyecto por aprobación; otro solicita y el admin lo aprueba.
- En un proyecto abierto, unirse es inmediato.

**Siguiente:** [[M6 · Aportes y eventos]]
