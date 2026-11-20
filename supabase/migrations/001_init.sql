-- Sera Defteri — ilk şema (Supabase projesinde zaten uygulandı: scsfclxgoxhogttmhazg)
create table public.shops (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 60),
  city text not null default '' check (char_length(city) <= 30),
  phone text not null default '' check (phone = '' or phone ~ '^[+0-9 ()-]{7,20}$'),
  about text not null default '' check (char_length(about) <= 300),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 60),
  cat text not null check (cat in ('Kesme çiçek','Saksı çiçeği','Buket','Ağaç / fidan','Soğan / tohum','Diğer')),
  species text not null default '' check (species ~ '^[a-z-]{0,30}$'),
  color text not null default '' check (char_length(color) <= 20),
  price numeric(10,2) not null check (price >= 0 and price <= 1000000),
  stock integer not null default 0 check (stock between 0 and 9999),
  description text not null default '' check (char_length(description) <= 600),
  photos text[] not null default '{}' check (cardinality(photos) <= 4),
  created_at timestamptz not null default now()
);
create index products_shop_idx on public.products(shop_id);
create index products_created_idx on public.products(created_at desc);

create or replace function public.limit_products() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.products where shop_id = new.shop_id) >= 200 then
    raise exception 'Bir dükkânda en fazla 200 ürün olabilir';
  end if;
  return new;
end $$;
create trigger products_limit before insert on public.products
for each row execute function public.limit_products();

create or replace function public.touch_updated() returns trigger
language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;
create trigger shops_touch before update on public.shops
for each row execute function public.touch_updated();

revoke execute on function public.limit_products() from public, anon, authenticated;
revoke execute on function public.touch_updated() from public, anon, authenticated;

alter table public.shops enable row level security;
alter table public.products enable row level security;

create policy "shops: herkes okur" on public.shops for select using (true);
create policy "shops: sahibi ekler" on public.shops for insert to authenticated with check (id = (select auth.uid()));
create policy "shops: sahibi günceller" on public.shops for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "shops: sahibi siler" on public.shops for delete to authenticated using (id = (select auth.uid()));

create policy "products: herkes okur" on public.products for select using (true);
create policy "products: sahibi ekler" on public.products for insert to authenticated with check (shop_id = (select auth.uid()));
create policy "products: sahibi günceller" on public.products for update to authenticated using (shop_id = (select auth.uid())) with check (shop_id = (select auth.uid()));
create policy "products: sahibi siler" on public.products for delete to authenticated using (shop_id = (select auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-photos','product-photos', true, 5242880, array['image/webp','image/jpeg','image/png']);

create policy "photos: sahibi yükler" on storage.objects for insert to authenticated
  with check (bucket_id = 'product-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "photos: sahibi siler" on storage.objects for delete to authenticated
  using (bucket_id = 'product-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
