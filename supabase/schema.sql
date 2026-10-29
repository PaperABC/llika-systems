-- ============================================================
-- LLIKA SYSTEMS — Script de base de datos (Supabase / PostgreSQL)
-- ------------------------------------------------------------
-- CÓMO USARLO:
-- 1. Entra a tu proyecto en https://supabase.com
-- 2. En el menú lateral, haz clic en "SQL Editor"
-- 3. Clic en "New query" (Nueva consulta)
-- 4. Pega TODO este contenido y haz clic en "Run" (Ejecutar)
-- 5. Verifica en "Table Editor" que aparece la tabla "mensajes"
--
-- Este script crea la tabla que guarda los mensajes enviados
-- desde el formulario de contacto de la página contacto.html.
-- ============================================================

-- 1) Crear la tabla "mensajes"
create table if not exists public.mensajes (
  id          uuid        primary key default gen_random_uuid(),
  nombre      text        not null,
  correo      text        not null,
  telefono    text,                       -- opcional
  asunto      text        not null default 'Consulta general',
  mensaje     text        not null,
  leido       boolean     not null default false,   -- para marcar ya atendidos
  created_at  timestamptz not null default now()   -- fecha de envío
);

-- Comentario de la tabla (opcional, solo documentación)
comment on table public.mensajes is
  'Mensajes enviados desde el formulario de contacto del sitio web de LLIKA SYSTEMS';

-- 2) Activar la seguridad a nivel de fila (Row Level Security / RLS)
--    RLS es obligatorio: sin ella, Supabase bloquea el acceso
--    público por defecto (y es lo correcto por seguridad).
alter table public.mensajes enable row level security;

-- 3) Política: permitir que cualquier visitante ENVÍE mensajes (INSERT)
--    Esto es lo que usa el formulario de contacto.html
drop policy if exists "permitir_enviar_mensajes" on public.mensajes;

create policy "permitir_enviar_mensajes"
  on public.mensajes
  for insert
  to anon, authenticated
  with check (
    char_length(nombre)  between 3 and 80
    and char_length(correo) between 5 and 120
    and char_length(mensaje) between 10 and 1000
  );

-- 4) Política (OPCIONAL): permitir LEER los mensajes solo a usuarios
--    autenticados de tu propio panel (tú, al iniciar sesión en Supabase).
--    Descomenta las 5 líneas siguientes si algún día quieres leer los
--    mensajes desde una app conectada con tu usuario. Para leerlos desde
--    el panel web de Supabase NO hace falta esta política.
--
-- drop policy if exists "permitir_leer_mensajes" on public.mensajes;
-- create policy "permitir_leer_mensajes"
--   on public.mensajes
--   for select
--   to authenticated
--   using (true);

-- ============================================================
-- FIN. Ahora:
-- 5. Copia tu "Project URL" y la clave "anon public" desde
--    Project Settings → API
-- 6. Pégalas en el archivo js/config.js de tu sitio web
-- ============================================================
