-- Kaya operations MVP. Run AFTER 03-admin-access.sql, first in staging.
-- This does NOT publish to catalog_products or activate payments.
begin;
create table if not exists public.ops_suppliers (
  id uuid primary key default gen_random_uuid(), name text not null,
  country_code text not null default 'KR', contact text,
  created_at timestamptz not null default now()
);
create table if not exists public.ops_products (
  id uuid primary key default gen_random_uuid(), name text not null,
  brand text not null, category text not null check(category in ('skincare','kpop','kdrama')),
  created_at timestamptz not null default now()
);
create table if not exists public.ops_skus (
  id uuid primary key default gen_random_uuid(), product_id uuid not null references public.ops_products(id),
  supplier_id uuid references public.ops_suppliers(id),
  sku text unique not null check(sku ~ '^KAY-[A-Z]{2}-[0-9]{4,8}$'),
  variant text not null check(length(trim(variant)) > 0),
  cost integer not null check(cost >= 0), price integer not null check(price > 0),
  on_hand integer not null default 0 check(on_hand >= 0),
  status text not null default 'draft' check(status in ('draft','active','archived')),
  version integer not null default 1, created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.ops_stock_moves (
  id uuid primary key default gen_random_uuid(), sku_id uuid not null references public.ops_skus(id),
  quantity integer not null check(quantity <> 0), reason text not null,
  batch_code text, expires_on date, actor uuid references auth.users(id),
  created_at timestamptz not null default now()
);
create table if not exists public.ops_promotions (
  id uuid primary key default gen_random_uuid(), sku_id uuid not null references public.ops_skus(id),
  name text not null, percent integer not null check(percent between 1 and 50),
  starts_at timestamptz not null, ends_at timestamptz not null,
  check(ends_at > starts_at), created_at timestamptz not null default now()
);
create table if not exists public.ops_requests (
  id uuid primary key default gen_random_uuid(),
  kind text not null check(kind in ('sku_save','stock_move','promo_create')),
  payload jsonb not null check(jsonb_typeof(payload) = 'object'),
  source text not null default 'manual' check(source in ('manual','ai')),
  status text not null default 'pending' check(status in ('pending','approved','rejected')),
  created_by uuid not null references auth.users(id), resolved_by uuid references auth.users(id),
  created_at timestamptz not null default now(), resolved_at timestamptz
);
create table if not exists public.ops_audit (
  id uuid primary key default gen_random_uuid(), request_id uuid not null references public.ops_requests(id),
  actor uuid not null references auth.users(id), action text not null,
  detail text not null, before_data jsonb, after_data jsonb,
  created_at timestamptz not null default now()
);
create index if not exists ops_moves_sku_idx on public.ops_stock_moves(sku_id,created_at);
create index if not exists ops_requests_status_idx on public.ops_requests(status,created_at);
create index if not exists ops_promotions_sku_idx on public.ops_promotions(sku_id,starts_at,ends_at);

-- No direct browser mutations. All writes go through authenticated, checked RPCs.
do $$ declare t text; begin
  foreach t in array array['ops_suppliers','ops_products','ops_skus','ops_stock_moves','ops_promotions','ops_requests','ops_audit'] loop
    execute format('alter table public.%I enable row level security',t);
    execute format('revoke all on public.%I from anon, authenticated',t);
    execute format('grant select on public.%I to authenticated',t);
    execute format('drop policy if exists ops_admin_read on public.%I',t);
    execute format('create policy ops_admin_read on public.%I for select to authenticated using (public.is_kaya_admin())',t);
  end loop;
end $$;
create or replace view public.ops_catalog with(security_invoker = true) as
select s.id,s.product_id,s.sku,p.name,p.brand,p.category,s.variant,s.cost,s.price,
       s.on_hand,s.status,s.version
from public.ops_skus s join public.ops_products p on p.id=s.product_id;
revoke all on public.ops_catalog from anon;
grant select on public.ops_catalog to authenticated;

create or replace function public.kaya_ops_submit(p_kind text,p_payload jsonb)
returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
  if auth.uid() is null or not public.is_kaya_admin() then raise exception 'Acceso no autorizado'; end if;
  if p_kind not in ('sku_save','stock_move','promo_create') or p_kind is null then raise exception 'Operacion no permitida'; end if;
  if p_payload is null or jsonb_typeof(p_payload) <> 'object' or octet_length(p_payload::text)>16000 then raise exception 'Solicitud invalida'; end if;
  insert into public.ops_requests(kind,payload,created_by) values(p_kind,p_payload,auth.uid()) returning id into v_id;
  return v_id;
end $$;

create or replace function public.kaya_ops_resolve(p_id uuid,p_approve boolean)
returns void language plpgsql security definer set search_path = '' as $$
declare
  r public.ops_requests; s public.ops_skus; p jsonb; v_id uuid; v_product uuid;
  v_before jsonb; v_after jsonb; v_price integer; v_cost integer;
  v_qty integer; v_percent integer; v_start timestamptz; v_end timestamptz; v_category text;
begin
  if auth.uid() is null or not public.is_kaya_admin() then raise exception 'Acceso no autorizado'; end if;
  if p_approve is null then raise exception 'Decision requerida'; end if;
  select * into r from public.ops_requests where id=p_id for update;
  if not found or r.status<>'pending' then raise exception 'Solicitud inexistente o ya resuelta'; end if;
  p:=r.payload;
  if p_approve then
    if r.kind='sku_save' then
      v_id:=(p->>'id')::uuid;
      if v_id is null or nullif(trim(p->>'name'),'') is null or nullif(trim(p->>'brand'),'') is null
        or nullif(trim(p->>'variant'),'') is null then raise exception 'Campos obligatorios incompletos'; end if;
      v_price:=(p->>'price')::integer; v_cost:=(p->>'cost')::integer;
      if v_price is null or v_cost is null or v_price<=0 or v_cost<0 then raise exception 'Precio o costo invalido'; end if;
      select * into s from public.ops_skus where id=v_id for update;
      if found then
        if (p->>'version')::integer is distinct from s.version then raise exception 'Version obsoleta, recargue'; end if;
        v_before:=to_jsonb(s); v_product:=s.product_id;
        if exists(select 1 from public.ops_promotions x where x.sku_id=v_id and x.ends_at>now() and v_price*(1-x.percent/100.0)<=v_cost) then raise exception 'El cambio invalidaria una promocion'; end if;
        update public.ops_products set name=trim(p->>'name'),brand=trim(p->>'brand'),category=p->>'category' where id=v_product;
        update public.ops_skus set sku=p->>'sku',variant=trim(p->>'variant'),price=v_price,cost=v_cost,
          status=p->>'status',version=version+1,updated_at=now() where id=v_id returning to_jsonb(ops_skus.*) into v_after;
      else
        if coalesce((p->>'version')::integer,0)<>0 then raise exception 'SKU inexistente'; end if;
        insert into public.ops_products(name,brand,category) values(trim(p->>'name'),trim(p->>'brand'),p->>'category') returning id into v_product;
        insert into public.ops_skus(id,product_id,sku,variant,price,cost,status)
          values(v_id,v_product,p->>'sku',trim(p->>'variant'),v_price,v_cost,p->>'status') returning to_jsonb(ops_skus.*) into v_after;
      end if;
    else
      v_id:=(p->>'sku_id')::uuid;
      select * into s from public.ops_skus where id=v_id for update;
      if not found then raise exception 'SKU inexistente'; end if;
      v_before:=to_jsonb(s);
      if r.kind='stock_move' then
        v_qty:=(p->>'quantity')::integer;
        if v_qty is null or v_qty=0 or s.on_hand+v_qty<0 or nullif(trim(p->>'reason'),'') is null then raise exception 'Movimiento invalido'; end if;
        select category into v_category from public.ops_products where id=s.product_id;
        if v_category='skincare' and v_qty>0 and (nullif(trim(p->>'batch_code'),'') is null or nullif(p->>'expires_on','') is null or (p->>'expires_on')::date<current_date) then raise exception 'Skincare requiere lote y vencimiento vigente'; end if;
        insert into public.ops_stock_moves(sku_id,quantity,reason,batch_code,expires_on,actor)
          values(v_id,v_qty,trim(p->>'reason'),nullif(p->>'batch_code',''),nullif(p->>'expires_on','')::date,auth.uid());
        update public.ops_skus set on_hand=on_hand+v_qty,version=version+1,updated_at=now() where id=v_id returning to_jsonb(ops_skus.*) into v_after;
      elsif r.kind='promo_create' then
        v_percent:=(p->>'percent')::integer; v_start:=(p->>'starts_at')::timestamptz; v_end:=(p->>'ends_at')::timestamptz;
        if v_percent is null or v_percent not between 1 and 50 or v_start is null or v_end is null or v_end<=v_start or v_end<=now() or nullif(trim(p->>'name'),'') is null then raise exception 'Promocion invalida'; end if;
        if s.price*(1-v_percent/100.0)<=s.cost then raise exception 'Descuento iguala o supera el margen antes de gastos'; end if;
        if exists(select 1 from public.ops_promotions x where x.sku_id=v_id and v_start<x.ends_at and v_end>x.starts_at) then raise exception 'Promociones solapadas'; end if;
        insert into public.ops_promotions(sku_id,name,percent,starts_at,ends_at)
          values(v_id,trim(p->>'name'),v_percent,v_start,v_end) returning to_jsonb(ops_promotions.*) into v_after;
      else raise exception 'Operacion no permitida'; end if;
    end if;
  end if;
  update public.ops_requests set status=case when p_approve then 'approved' else 'rejected' end,
    resolved_by=auth.uid(),resolved_at=now() where id=p_id;
  insert into public.ops_audit(request_id,actor,action,detail,before_data,after_data)
    values(p_id,auth.uid(),case when p_approve then 'approved' else 'rejected' end,r.kind||': '||coalesce(p->>'sku',p->>'name',p->>'sku_id'),v_before,v_after);
end $$;
revoke all on function public.kaya_ops_submit(text,jsonb) from public;
revoke all on function public.kaya_ops_resolve(uuid,boolean) from public;
grant execute on function public.kaya_ops_submit(text,jsonb) to authenticated;
grant execute on function public.kaya_ops_resolve(uuid,boolean) to authenticated;
commit;
