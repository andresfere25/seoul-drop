-- =====================================================================
-- Seoul Drop · Tabla de catálogo para la tienda (MVP)
-- Mapea 1:1 con lo que muestra el storefront. Ejecutar en Supabase SQL Editor.
-- Es idempotente: se puede correr varias veces sin problema.
-- =====================================================================

create table if not exists public.catalog_products (
  id               text primary key,
  slug             text unique not null,
  name             text not null,
  brand            text not null,
  category         text not null,          -- kbeauty | kpop | stationery | snacks | tech
  price            integer not null,       -- precio en COP
  original_price   integer,                -- precio tachado (opcional)
  description      text,
  full_description text,
  badges           text[] default '{}',
  badge_color      text,
  rating           numeric(2,1) default 0,
  reviews          integer default 0,
  stock            integer default 0,
  tags             text[] default '{}',
  gradient         text,
  image_url        text,                   -- foto real del producto (opcional)
  featured         boolean default false,
  is_new           boolean default false,
  sort_order       integer default 0,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create index if not exists idx_catalog_category ON public.catalog_products(category);
create index if not exists idx_catalog_featured ON public.catalog_products(featured);
create index if not exists idx_catalog_slug     ON public.catalog_products(slug);

-- updated_at automático
create or replace function public.touch_catalog_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_catalog_updated_at on public.catalog_products;
create trigger trg_catalog_updated_at
  before update on public.catalog_products
  for each row execute function public.touch_catalog_updated_at();

-- =====================================================================
-- Row Level Security
--  · Lectura pública (cualquiera puede ver el catálogo)
--  · Escritura solo para usuarios autenticados (el admin / tu hermano)
-- =====================================================================
alter table public.catalog_products enable row level security;

drop policy if exists "catalog_public_read" on public.catalog_products;
create policy "catalog_public_read"
  on public.catalog_products
  for select
  using (true);

drop policy if exists "catalog_auth_write" on public.catalog_products;
create policy "catalog_auth_write"
  on public.catalog_products
  for all
  to authenticated
  using (true)
  with check (true);

-- =====================================================================
-- Storage: bucket público para fotos de productos
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "product_images_auth_upload" on storage.objects;
create policy "product_images_auth_upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "product_images_auth_update" on storage.objects;
create policy "product_images_auth_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

drop policy if exists "product_images_auth_delete" on storage.objects;
create policy "product_images_auth_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
