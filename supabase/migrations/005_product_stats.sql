-- Sera Defteri — 005: ürün istatistikleri (görüntülenme, WhatsApp tıklaması)
-- Kişisel veri tutulmaz: her olay yalnızca ürün kimliği, türü ve zamanıdır.
-- Herkes yalnızca satır EKLEYEBİLİR (her satır +1); sayıları yalnızca ürünün sahibi ve yöneticiler görür.
create table public.product_events (
  id bigint generated always as identity primary key,
  product_id uuid not null references public.products(id) on delete cascade,
  kind text not null check (kind in ('view', 'wa')),
  created_at timestamptz not null default now()
);
create index product_events_product_idx on public.product_events(product_id);
alter table public.product_events enable row level security;
create policy "events: herkes ekler" on public.product_events for insert to anon, authenticated
  with check (kind in ('view', 'wa'));
create policy "events: sahibi veya admin okur" on public.product_events for select to authenticated
  using (exists (select 1 from public.products p where p.id = product_id and p.shop_id = (select auth.uid()))
         or exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
revoke update, delete, truncate on public.product_events from anon, authenticated;

-- taşkın koruması: bir ürüne saatte en fazla 600 olay
create or replace function public.limit_product_events() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.product_events where product_id = new.product_id and created_at > now() - interval '1 hour') >= 600 then
    raise exception 'Çok fazla istek';
  end if;
  return new;
end $$;
revoke execute on function public.limit_product_events() from public, anon, authenticated;
create trigger product_events_limit before insert on public.product_events
for each row execute function public.limit_product_events();

-- sahibi için özet: görünüm, okuyanın yetkisiyle çalışır (RLS geçerli)
create view public.product_stats with (security_invoker = true) as
  select product_id,
         count(*) filter (where kind = 'view')::int as views,
         count(*) filter (where kind = 'wa')::int as wa_clicks
  from public.product_events group by product_id;
revoke all on public.product_stats from anon;
grant select on public.product_stats to authenticated;
