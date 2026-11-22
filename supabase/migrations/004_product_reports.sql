-- Sera Defteri — 004: ürün bildirimleri (moderasyon)
-- Herkes (giriş yapmadan da) bildirim gönderebilir; yalnızca yöneticiler okuyup silebilir.
create table public.product_reports (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  reason text not null check (reason in ('Sahte ya da yanıltıcı','Uygunsuz içerik','Yasak ya da korunan bitki','Fiyat ya da stok yanlış','Diğer')),
  note text not null default '' check (char_length(note) <= 300),
  reporter uuid default auth.uid() references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index product_reports_product_idx on public.product_reports(product_id);
create index product_reports_created_idx on public.product_reports(created_at desc);
alter table public.product_reports enable row level security;

-- gönderen başkası adına bildirim yapamaz (reporter ya boş ya kendisi)
create policy "reports: herkes bildirir" on public.product_reports for insert to anon, authenticated
  with check (reporter is not distinct from (select auth.uid()));
create policy "reports: admin okur" on public.product_reports for select to authenticated
  using (exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
create policy "reports: admin siler" on public.product_reports for delete to authenticated
  using (exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
revoke update, truncate on public.product_reports from anon, authenticated;

-- taşkın koruması: bir ürüne saatte en fazla 10, siteye saatte en fazla 300 bildirim
create or replace function public.limit_reports() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.product_reports where product_id = new.product_id and created_at > now() - interval '1 hour') >= 10
     or (select count(*) from public.product_reports where created_at > now() - interval '1 hour') >= 300 then
    raise exception 'Çok fazla bildirim; daha sonra tekrar deneyin';
  end if;
  return new;
end $$;
revoke execute on function public.limit_reports() from public, anon, authenticated;
create trigger product_reports_limit before insert on public.product_reports
for each row execute function public.limit_reports();

-- Performance Advisor: yabancı anahtar için dizin
create index product_reports_reporter_idx on public.product_reports(reporter);
