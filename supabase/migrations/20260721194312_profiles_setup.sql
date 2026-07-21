create type tier as enum ('tourist', 'scholar', 'standard', 'founder');

create type nombre_visible as enum ('apodo', 'nombre_apellido', 'apellido_nombre');

create type disponibilidad as enum ('disponible', 'ocupado', 'solo_eventos');

create type visibilidad_tarifa as enum ('publica', 'privada');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  nombre text,
  apellido text,
  apodo text,
  nombre_visible nombre_visible not null default 'nombre_apellido',
  avatar_url text,
  tier tier not null default 'tourist',
  is_platform_admin boolean not null default false,
  fecha_nacimiento date,
  bio text,
  contacto_telegram text,
  sitio_url text,
  disponibilidad disponibilidad default 'disponible',
  tarifa_hora numeric,
  visibilidad_tarifa visibilidad_tarifa not null default 'privada',
  aprobado_en timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, tier)
  values (new.id, new.email, 'tourist');
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

create index idx_profiles_tier on public.profiles(tier);
create index idx_profiles_disponibilidad on public.profiles(disponibilidad);
