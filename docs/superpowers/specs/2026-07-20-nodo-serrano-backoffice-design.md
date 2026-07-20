# PRD — Backoffice de Nodo Serrano (PWA)

**Fecha:** 2026-07-20
**Estado:** Diseño aprobado, pendiente de plan de implementación
**Autor:** Nóbel + Claude

---

## 1. Contexto

Nodo Serrano es una comunidad que arrancó hace ~1 año con la intención de ser un **Ethereum Hub**. Empezó chiquita y hoy tiene un espacio físico donde sus miembros se juntan a coworkear, pensar, estudiar, dar charlas y hacer eventos pequeños. La comunidad es diversa: matemáticos, ingenieros de software, vibecoders, expertos en IA, gente de ciberseguridad, artistas y más.

A los miembros se los llama **serranos**.

Este proyecto es el **backoffice** de todo lo que ocurre en la comunidad: una PWA mobile-first que centraliza el plantel de miembros, sus habilidades y disponibilidad, y el calendario de eventos.

## 2. Objetivo

Construir una **PWA mobile-first** que sirva como backoffice de la comunidad, permitiendo:

1. Cuentas y alta de miembros (Tourist → Serrano).
2. **Plantel de serranos** definido por **Tier** (aporte económico) y **Rol** (aporte comunitario), además de habilidades y disponibilidad.
3. **Proyectos** de la comunidad (dinámica tipo grupo), con ingreso abierto o por aprobación.
4. **Aportes** al nodo: económicos y en especie (donaciones/préstamos de objetos, charlas dadas, actividades, mantenimiento, yerba 🧉…).
5. **Calendario de eventos** con confirmación de asistencia.
6. **Fecha de nacimiento** → edad y próximos cumpleaños.

### Métricas de éxito (MVP)
- Los serranos activos crean y completan su perfil.
- Los eventos se publican y la gente confirma asistencia desde la app.
- Un admin puede aprobar nuevas cuentas sin fricción.

## 3. Usuarios: Tiers, Roles y permisos

Un serrano se describe por **dos ejes independientes**, más un permiso técnico:

### Tier — aporte económico / membresía (un valor por persona)
| Tier | Qué es |
|------|--------|
| **Tourist** | Entrada. Se registra con email/Google. Ve el plantel, la agenda y los proyectos, pero **no participa** (no aparece en el plantel, no crea contenido). Puede **solicitar ser Serrano**. |
| **Scholar** | Miembro becado: no paga aportes económicos. |
| **Standard** | Miembro que paga aportes. Tier por defecto al aprobar. |
| **Founder** | Miembro fundador. |

> "Serrano" = cualquier miembro aprobado (Scholar / Standard / Founder). El Tourist todavía no es Serrano.

### Rol — aporte comunitario (cero o varios por persona)
Infra, RRSS, Charlas, Organización, Administración, Tesorería, Contenido, Diseño, etc. Es tu **función** en el nodo. **Autoasignado y confirmado por un admin** (para evitar que cualquiera se ponga "Tesorería"). Distinto de las **habilidades** (skills profesionales como Solidity o IA).

### Admin de plataforma
Permiso técnico aparte (`is_platform_admin`, flag manual). Aprueba solicitudes de membresía, asigna tiers y confirma roles. Normalmente lo tienen Founders / gente de Organización.

### Alta de membresía
Registro → **Tourist** → el Tourist toca **"Solicitar ser Serrano"** (con un mensaje opcional) → queda **en revisión** → un admin **aprueba y asigna tier** (Standard por defecto).

**Nota:** El primer admin (`is_platform_admin = true`) se define manualmente en la base de datos (seed inicial).

## 4. Alcance del MVP

### Incluido
1. **Registro / login** con email y Google (Supabase Auth).
2. **Tiers** (Tourist / Scholar / Standard / Founder) y **Roles** comunitarios (autoasignado + confirmado).
3. **Solicitud de membresía** (Tourist → Serrano) + **panel de admin** para aprobarla, asignar tier y confirmar roles.
4. **Onboarding de perfil** — foto, nombre, apellido, apodo, fecha de nacimiento, bio, contacto.
5. **Perfil de serrano** centrado en **Tier + Rol**; habilidades (tags); tarifa como dato **secundario** con visibilidad configurable.
6. **Plantel de serranos** — lista/grilla con filtros por rol, habilidad y disponibilidad.
7. **Detalle de miembro** — Tier, Rol, aportes, proyectos, habilidades, bio.
8. **Proyectos** — crear y configurar (nombre, descripción, estado, ingreso abierto/por aprobación), unirse, designar admins de proyecto.
9. **Aportes** — registrar contribuciones (económicas y en especie) y verlas por persona.
10. **Calendario de eventos** — ver, crear (cualquier serrano) y RSVP.
11. **Cumpleaños** — edad y próximos cumpleaños.
12. **Tasks** — publicar y tomar tareas del nodo (reparaciones, compras, mantenimiento), **sin puntaje por ahora**.
13. **PWA** instalable + **modo claro/oscuro**.

### Fuera de alcance (por ahora — YAGNI)
- Chat / mensajería interna.
- **Puntos Serrano / gamificación** — **parkeado**: primero probamos cargar tareas y aportes sin valuarlos; el sistema de puntos (valor de cada aporte/task, umbral mensual, relación con tiers) se define más adelante.
- **Pagos / cripto on-chain** — los aportes económicos se **registran**, no se cobran dentro de la app.
- Presupuestos / facturación de proyectos.
- Notificaciones push (fase posterior).

## 5. Detalle funcional

### 5.1 Autenticación y membresía
- Registro/login por **email (magic link o password)** y **Google OAuth** (Supabase Auth).
- Al crear la cuenta, el perfil nace con `tier = tourist`.
- El Tourist navega en **modo lectura** (plantel, agenda, proyectos) pero no participa.
- Cuando quiere sumarse, toca **"Solicitar ser Serrano"** → crea una `membership_request` con mensaje opcional → estado **en revisión**.
- Un admin aprueba desde el panel → asigna `tier` (Standard por defecto) y setea `aprobado_en`.

### 5.2 Perfil de serrano
- **Identidad:** nombre, apellido, apodo (nick opcional), `nombre_visible` (apodo / nombre+apellido / apellido+nombre), avatar, bio, fecha_nacimiento, contacto (Telegram), sitio (opcional).
- **Tier** (aporte económico) y **Roles** (aporte comunitario) son **lo más destacado** del perfil.
- **Habilidades:** etiquetas libres con **sugerencias** de las ya usadas (normalizadas para evitar duplicados tipo "React" / "reactjs").
- **Disponibilidad:** `Disponible` / `Ocupado` / `Solo eventos`.
- **Tarifa (secundaria):** `tarifa_hora` en **USD** con `visibilidad_tarifa` (pública / privada). Se muestra en un lugar secundario ("Disponible para proyectos"), **no como titular**.

### 5.3 Plantel de serranos
- Lista/grilla de miembros aprobados (los Tourists no aparecen).
- **Filtros:** por rol, habilidad (tag) y disponibilidad.
- Card por miembro: avatar, nombre visible, **Tier**, **Rol(es)**, habilidades destacadas y disponibilidad.
- La tarifa se muestra solo si es pública (o si el que mira es admin).

### 5.4 Calendario de eventos
- Cualquier serrano puede **crear** eventos (título, descripción, lugar, inicio, fin).
- Los demás **confirman asistencia** (RSVP): `voy` / `quizás` / `no`.
- Vista de calendario / lista de próximos eventos.
- (El creador puede editar/borrar sus propios eventos; los admins, cualquiera.)

### 5.5 Cumpleaños
- A partir de `fecha_nacimiento` se calcula la **edad** y se listan los **próximos cumpleaños** (widget o sección).

### 5.6 Panel de admin
- Cola de **solicitudes de membresía** (aprobar → asignar tier, o rechazar).
- **Confirmar roles** propuestos por los serranos.
- (Opcional futuro: cambiar tiers, revocar, editar roles.)

### 5.7 Proyectos
- Cualquier serrano **crea** un proyecto: nombre, descripción, **estado** (`idea` / `en curso` / `pausado` / `terminado`) e **ingreso** (`abierto`: cualquiera se une al toque / `por aprobación`: un admin del proyecto lo aprueba).
- El creador es admin del proyecto y puede **designar más admins**; los admins editan la config y aprueban ingresos.
- Miembros con estado `pendiente` / `aprobado`; solo los aprobados figuran como parte del proyecto.
- Los proyectos de cada persona se muestran en su perfil.

### 5.8 Aportes
- Registro de contribuciones al nodo. **Tipos:** económico (cuota), donación, préstamo de objeto, charla dada, actividad, mantenimiento, administración, yerba, otro.
- Cada aporte: tipo, descripción, fecha, monto (opcional), quién lo registró.
- Los **aportes económicos** informan el Tier; los **comunitarios** respaldan el Rol.
- Se muestran en el perfil/detalle. Los carga uno mismo y/o un admin (los económicos, típicamente Tesorería/admin).

### 5.9 Tasks (tareas del nodo)
- Cualquier serrano **publica una tarea**: título, descripción, **categoría** (reparación, limpieza, compra, mantenimiento, otro) y **urgencia** (baja/media/alta).
- Estados: `abierta` → `tomada` (alguien la reclama) → `hecha` → (`verificada`).
- Por ahora **sin puntaje**: solo cargar, tomar y marcar tareas.

> **Puntos Serrano (parkeado):** la idea de puntos mensuales que valúan aportes y tasks se conversó y se pospone. Primero validamos el flujo de cargar tareas/aportes; después definimos la tabla de valuación (categoría × tamaño), el umbral mensual y su relación con los tiers.

## 6. Modelo de datos (borrador)

```
profiles
  id              uuid (= auth.users.id)
  email           text
  nombre          text
  apellido        text
  apodo           text              -- nick opcional
  nombre_visible  enum('apodo','nombre_apellido','apellido_nombre') default 'nombre_apellido'
  avatar_url      text
  tier            enum('tourist','scholar','standard','founder') default 'tourist'
  is_platform_admin boolean default false
  fecha_nacimiento date
  bio             text
  contacto_telegram text            -- handle de Telegram (o contacto)
  sitio_url       text              -- portfolio / sitio (opcional)
  disponibilidad  enum('disponible','ocupado','solo_eventos')
  tarifa_hora     numeric            -- en USD
  visibilidad_tarifa enum('publica','privada') default 'privada'
  aprobado_en     timestamptz
  created_at      timestamptz

membership_requests   -- Tourist solicita ser Serrano
  id              uuid
  profile_id      uuid -> profiles.id
  mensaje         text
  estado          enum('pendiente','aprobada','rechazada') default 'pendiente'
  resuelta_por    uuid -> profiles.id
  created_at      timestamptz

roles             -- catálogo de roles comunitarios
  id              uuid
  nombre          text unique        -- Infra, RRSS, Charlas, Organización, Tesorería...

profile_roles     -- N:N, autoasignado + confirmado por admin
  profile_id      uuid
  role_id         uuid
  confirmado      boolean default false
  (PK: profile_id + role_id)

skills            -- catálogo para sugerencias (tags libres normalizados)
  id              uuid
  nombre          text unique

profile_skills    -- relación N:N
  profile_id      uuid
  skill_id        uuid

projects
  id              uuid
  nombre          text
  descripcion     text
  estado          enum('idea','en_curso','pausado','terminado') default 'idea'
  ingreso         enum('abierto','aprobacion') default 'aprobacion'
  creado_por      uuid -> profiles.id
  created_at      timestamptz

project_members
  project_id      uuid -> projects.id
  profile_id      uuid -> profiles.id
  rol             enum('miembro','admin') default 'miembro'
  estado          enum('pendiente','aprobado') default 'pendiente'
  (PK: project_id + profile_id)

aportes
  id              uuid
  profile_id      uuid -> profiles.id   -- de quién es el aporte
  tipo            enum('economico','donacion','prestamo','charla','actividad','mantenimiento','administracion','yerba','otro')
  descripcion     text
  monto           numeric               -- opcional (económicos)
  fecha           date
  registrado_por  uuid -> profiles.id
  created_at      timestamptz

tasks
  id              uuid
  titulo          text
  descripcion     text
  categoria       enum('reparacion','limpieza','compra','mantenimiento','otro')
  urgencia        enum('baja','media','alta') default 'media'
  estado          enum('abierta','tomada','hecha','verificada') default 'abierta'
  creado_por      uuid -> profiles.id
  tomada_por      uuid -> profiles.id      -- opcional, quien la toma
  created_at      timestamptz
  -- puntos: se agregará cuando definamos Puntos Serrano

events
  id              uuid
  titulo          text
  descripcion     text
  lugar           text
  inicio          timestamptz
  fin             timestamptz
  creado_por      uuid -> profiles.id
  created_at      timestamptz

event_attendance
  event_id        uuid -> events.id
  profile_id      uuid -> profiles.id
  estado          enum('voy','quizas','no')
  (PK: event_id + profile_id)
```

### Seguridad (Row Level Security)
Las reglas viven en la base de datos, no solo en el front:
- **profiles**: los Tourists no son visibles en el plantel (solo serranos/admin en las lecturas del plantel); cada uno edita su propio perfil; solo un admin puede cambiar `tier` e `is_platform_admin`.
- **tarifa_hora**: legible por el dueño, por admins, y por otros serranos solo si `visibilidad_tarifa = 'publica'`. (Se resolverá con una vista/policy que oculte la columna cuando corresponda.)
- **profile_roles**: cada uno propone sus propios roles; el flag `confirmado` solo lo cambia un admin.
- **membership_requests**: el dueño crea y lee la suya; los admins ven todas y las resuelven.
- **projects / project_members**: lectura para autenticados; crear proyecto = cualquier serrano; editar config y aprobar ingresos = admins de ese proyecto; al unirse, si `ingreso = abierto` entra `aprobado`, si `aprobacion` entra `pendiente`.
- **aportes**: lectura para serranos; inserta el dueño o un admin; los económicos los gestiona admin/Tesorería.
- **events**: lectura para cualquier usuario autenticado; escritura para serranos; edición/borrado por el creador o admin.
- **event_attendance**: cada uno gestiona su propia asistencia.

## 7. Arquitectura técnica

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS. Mobile-first.
- **UI / Design system:** tokens de Figma mapeados a un tema de Tailwind (ver §8). Componentes con estética neumórfica.
- **Backend / datos:** Supabase — Auth (email + Google), Postgres, RLS, Storage (avatares).
- **PWA:** manifest, íconos, service worker (shell offline básico) — vía `next-pwa` o Serwist.
- **Hosting:** Vercel.

### Estructura y límites
- La UI se organiza en unidades chicas y enfocadas: cada componente/módulo con un propósito claro y una interfaz definida (plantel, perfil, eventos, admin como features separadas).
- La lógica de acceso a datos se aísla en una capa de "queries" por feature, para poder testear y cambiar internals sin romper consumidores.

## 8. Design System (extraído de Figma)

**Archivo:** `web-nodo-final-a-produccion` (Figma) — página "Design system".

### Tipografía
- **Space Grotesk** — display, headings (h1–h3), caption, micro.
  - `mob-display-xl` 40/60 Bold, `mob-display-lg` 32 Bold, `h1` 44 Bold, `h2` 32 Medium, `h3` 22 Medium, `caption` 12 Medium (tracking +1.2), `micro` 11 Medium.
- **Inter** — body: `body-lg` 17, `body` 14, `body-sm` 13 (Regular).

### Color
- **Fondos (claro):** `bg-light #f8f4ed`, `bg-card #fefbf6`; **oscuro:** `bg-elev-dark #1a1614`.
- **Texto (claro):** primary `#1a1614`, secondary `#5a5550`, muted `#8a847c`.
- **Texto (oscuro):** primary `#f8f4ed`, secondary `#ff9728`.
- **Marca (logo):** mint `#0a8268`, green `#0c8a5e`, blue `#1158b0`, violet `#6b3fa8`.
- **Raw / vibrantes:** mint `#4fe6c3`, blue `#2e9bff`, violet `#b57fe0`.
- **Acentos:** coral `#c70067`, amarillo `#ff9728`, naranja `#ff4d21`, violeta `#9e1fd0`.
- **Gradientes:** `grad-primary (logo)`, `grad-warm`, `grad-primary-CTA`.

### Efectos
- **Neumorphic-light** y **Neumorphic-dark** (inner + drop shadows) para superficies.
- **card-light** (drop shadow suave) para tarjetas.
- **Sombras de botón** de color: Blue y Red (para CTAs).

> El estilo general es **neumórfico y cálido** (crema + oscuro), con acentos vibrantes y gradientes. Soporta modo claro y oscuro.

## 9. Riesgos y decisiones abiertas
- **Visibilidad de la tarifa vía RLS:** ocultar una columna condicionalmente en Postgres requiere una vista o política cuidada; se define en el plan de implementación.
- **Normalización de tags de habilidades:** las "sugerencias" necesitan normalizar (minúsculas/acentos) para evitar duplicados.
- **Primer admin:** se crea por seed manual.
- **Notificaciones / recordatorios de eventos y cumpleaños:** fuera del MVP, candidato a fase 2.

## 9b. Diseño de pantallas (Pencil)

Diseñado en un archivo `.pen` (Pencil) con los tokens del design system como variables temáticas (claro/oscuro). Componentes reutilizables: Avatar, Chip, **TierBadge**, **RoleChip**, PrimaryButton, SecondaryButton, Input, StatusBar, TabBar (píldora, **5 destinos**: Inicio · Plantel · Nodo · Agenda · Perfil), MemberCard, EventCard, **ProjectCard**, **TaskCard**, **AporteItem**, RequestCard.

El canvas está organizado en grupos que siguen el flujo, con títulos de sección:

**Grupo 1 — Ingreso y alta de cuenta** (9)
- 1.1 Login / Registro (email + Google) · 1.2 Revisá tu email · 1.3 Recuperar contraseña · 1.4 Restablecer contraseña · 1.5 Onboarding Paso 1 · 1.6 Onboarding Paso 2 · 1.7 Solicitar membresía · 1.8 Solicitud en revisión · 1.9 ¡Solicitud enviada!

**Grupo 2 — App principal (5 tabs)** (7)
- 2.1 Inicio · 2.2 Plantel · 2.3 Nodo — Tareas · 2.4 Nodo — Proyectos · 2.5 Agenda · 2.6 Perfil · 2.7 Perfil (Tourist)
- Tabs: Inicio · Plantel · **Nodo** (hub Tareas/Proyectos) · Agenda · Perfil

**Grupo 3 — Detalle y edición de perfil** (4)
- 3.1 Detalle de miembro (Tier + Rol, aportes, proyectos, habilidades, tarifa secundaria) · 3.2 Editar perfil (nombre/apellido/apodo, nombre visible, roles, disponibilidad, tarifa) · 3.3 Editar habilidades · 3.4 Mis aportes

**Grupo 4 — Nodo: tareas, proyectos y aportes** (6)
- 4.1 Detalle de tarea · 4.2 Crear tarea · 4.3 Detalle de proyecto · 4.4 Crear proyecto · 4.5 Solicitudes de ingreso · 4.6 Registrar aporte

**Grupo 5 — Eventos** (3)
- 5.1 Detalle de evento + RSVP · 5.2 Crear evento · 5.3 Editar evento

**Grupo 6 — Admin** (2)
- 6.1 Admin — Membresías · 6.2 Admin — Roles a confirmar

**Grupo 7 — Estados vacíos y de sistema** (6)
- 7.1 Vacío Plantel · 7.2 Vacío Tareas · 7.3 Vacío Proyectos · 7.4 Vacío Agenda · 7.5 Offline / error · 7.6 404

**Total: 37 pantallas** + librería de componentes (Avatar, Chip, TierBadge, RoleChip, botones, Input, StatusBar, TabBar, MemberCard, EventCard, ProjectCard, TaskCard, AporteItem, RequestCard).

> **v2 del modelo:** el perfil dejó de girar en torno a la tarifa; ahora el titular es **Tier** (aporte económico) + **Rol** (aporte comunitario). Se agregaron **Proyectos** (5ta tab) y **Aportes** (sección del perfil).
>
> Se conservan **contacto (Telegram)**, **apodo** y **nombre visible**.
>
> El diseño vive en `design/nodo-serrano.pen` (dentro del repo).

## 10. Fases sugeridas
1. **Fase 1 — Base:** Next.js + Tailwind con tokens, Supabase Auth (email + Google), modelo de datos + RLS, tiers/roles, solicitud de membresía y panel de admin.
2. **Fase 2 — Plantel y perfil:** perfil (Tier/Rol/habilidades/tarifa), plantel con filtros, editar perfil/roles/habilidades.
3. **Fase 3 — Proyectos:** crear, ingreso (abierto/aprobación), admins de proyecto, proyectos en el perfil.
4. **Fase 4 — Aportes y eventos:** registro de aportes, calendario + RSVP.
5. **Fase 5 — Cumpleaños + PWA:** widget de cumpleaños, manifest/service worker, pulido de modo claro/oscuro.
