-- Sera Defteri — 002: dış API önbelleği ve yönetici (moderasyon) rolü

-- Dış API sonuçlarının önbelleği (yalnızca sunucu / service_role yazar)
create table public.plant_cache (
  key text primary key check (key ~ '^[a-z]+:[a-z0-9 ]{1,80}$'),
  data jsonb not null check (pg_column_size(data) <= 16384),
  fetched_at timestamptz not null default now()
);
alter table public.plant_cache enable row level security;
create policy "cache: herkes okur" on public.plant_cache for select to anon, authenticated using (true);
-- yazma politikası YOK: anon/authenticated yazamaz; service_role RLS'i atlar
revoke insert, update, delete, truncate on public.plant_cache from anon, authenticated;

-- Yönetici rolü: kayıtlar yalnızca SQL ile (panelden) eklenir
create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
-- herkes yalnızca kendisinin yönetici olup olmadığını görebilir (ön yüzde "Kaldır" düğmesi için)
create policy "admins: kendini görür" on public.admins for select to authenticated
  using (user_id = (select auth.uid()));
revoke insert, update, delete, truncate on public.admins from anon, authenticated;

-- Yöneticiler uygunsuz ürünleri ve fotoğraflarını silebilir
create policy "products: admin siler" on public.products for delete to authenticated
  using (exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
create policy "photos: admin siler" on storage.objects for delete to authenticated
  using (bucket_id = 'product-photos' and exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
