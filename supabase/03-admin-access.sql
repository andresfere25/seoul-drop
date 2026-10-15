-- Review and run manually in Supabase. No user is granted access automatically.
begin;
create table if not exists public.kaya_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.kaya_admins enable row level security;
revoke all on public.kaya_admins from anon, authenticated;
create or replace function public.is_kaya_admin()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists(select 1 from public.kaya_admins where user_id = auth.uid()); $$;
revoke all on function public.is_kaya_admin() from public;
grant execute on function public.is_kaya_admin() to authenticated;
drop policy if exists "catalog_auth_write" on public.catalog_products;
drop policy if exists "kaya_admin_write" on public.catalog_products;
create policy "kaya_admin_write" on public.catalog_products for all to authenticated
using (public.is_kaya_admin()) with check (public.is_kaya_admin());
drop policy if exists "product_images_auth_upload" on storage.objects;
drop policy if exists "product_images_auth_update" on storage.objects;
drop policy if exists "product_images_auth_delete" on storage.objects;
drop policy if exists "kaya_admin_images" on storage.objects;
create policy "kaya_admin_images" on storage.objects for all to authenticated
using (bucket_id = 'product-images' and public.is_kaya_admin())
with check (bucket_id = 'product-images' and public.is_kaya_admin());
commit;
-- After reviewing, grant each approved founder access with their Auth UUID:
-- insert into public.kaya_admins(user_id) values ('ACTUAL-USER-UUID');
-- Verify existing policies in pg_policies; other permissive policies may coexist.
