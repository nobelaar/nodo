---
tags: [roadmap, milestone]
status: todo
depends-on: "[[M1 · Cuenta y perfil]]"
---

# M6 · Aportes y eventos

**Objetivo:** registrar aportes (económicos y en especie) y manejar la agenda de eventos con RSVP.

**Entregable:** registro de aportes visible en el perfil + calendario con creación y confirmación de asistencia.

## Pantallas (diseño)
`4.6 Registrar aporte` · `3.4 Mis aportes` · `2.5 Agenda` · `5.1 Detalle de evento` · `5.2 Crear evento` · `5.3 Editar evento` · `7.4 Vacío Agenda`.

## Datos
`aportes`, `events`, `event_attendance`. Ver [[Modelo de datos]] y [[Seguridad RLS]].

## Alcance
- [ ] Registrar aporte: tipo, descripción, fecha, monto opcional; carga propia y de admin.
- [ ] Aportes en perfil / detalle de miembro (alimenta [[M4 · Plantel y directorio]]).
- [ ] Agenda: crear (cualquier serrano), tira de días, detalle.
- [ ] RSVP: `voy / quizás / no` + lista de asistentes.
- [ ] Editar/eliminar evento (creador o admin).

## Done (DoD)
- Se registra un aporte y aparece en el perfil.
- Se crea un evento, la gente confirma y se ve la lista de asistentes.

**Siguiente:** [[M7 · Cumpleaños, PWA y pulido]]
