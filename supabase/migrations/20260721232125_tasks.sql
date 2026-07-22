create type task_categoria as enum ('reparacion', 'limpieza', 'compra', 'mantenimiento', 'otro');

create type task_urgencia as enum ('baja', 'media', 'alta');

create type task_estado as enum ('abierta', 'tomada', 'hecha', 'verificada');

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  categoria task_categoria not null default 'otro',
  urgencia task_urgencia not null default 'media',
  estado task_estado not null default 'abierta',
  creado_por uuid not null references public.profiles(id) on delete cascade,
  tomada_por uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

create policy "Authenticated users can read tasks"
  on public.tasks
  for select
  using (auth.uid() is not null);

create policy "Serranos can create tasks"
  on public.tasks
  for insert
  with check (
    auth.uid() = creado_por
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and tier <> 'tourist'
    )
  );

create policy "Serranos can update tasks they took"
  on public.tasks
  for update
  using (
    auth.uid() = tomada_por
    or auth.uid() = creado_por
  )
  with check (
    auth.uid() = tomada_por
    or auth.uid() = creado_por
  );

create index idx_tasks_estado on public.tasks(estado);
create index idx_tasks_creado_por on public.tasks(creado_por);
