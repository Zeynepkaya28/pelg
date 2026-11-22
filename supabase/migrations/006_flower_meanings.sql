-- Sera Defteri — 006: çiçek × renk anlamları veritabanında (yönetici panelinden düzenlenebilir)
-- app.js içindeki FLOWERS yedek olarak kalır; veritabanındaki anlam varsa onun yerine geçer.
create table public.flower_meanings (
  flower_id text not null check (flower_id ~ '^[a-z]{2,20}$'),
  color text not null check (char_length(color) between 1 and 20),
  meaning text not null check (char_length(meaning) between 2 and 120),
  updated_at timestamptz not null default now(),
  updated_by uuid default auth.uid() references auth.users(id) on delete set null,
  primary key (flower_id, color)
);
create index flower_meanings_updated_by_idx on public.flower_meanings(updated_by);
alter table public.flower_meanings enable row level security;
create policy "meanings: herkes okur" on public.flower_meanings for select to anon, authenticated using (true);
create policy "meanings: admin ekler" on public.flower_meanings for insert to authenticated
  with check (exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
create policy "meanings: admin günceller" on public.flower_meanings for update to authenticated
  using (exists (select 1 from public.admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
create policy "meanings: admin siler" on public.flower_meanings for delete to authenticated
  using (exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
revoke truncate on public.flower_meanings from anon, authenticated;

-- başlangıç verisi: app.js FLOWERS
insert into public.flower_meanings (flower_id, color, meaning, updated_by) values
('zambak', 'Beyaz', 'asalet, saflık ve zarafet', null),
('zambak', 'Pembe', 'şefkat ve bolluk', null),
('zambak', 'Turuncu', 'tutku ve özgüven', null),
('zambak', 'Sarı', 'neşe ve minnettarlık', null),
('zambak', 'Kırmızı', 'derin sevgi', null),
('gul', 'Kırmızı', 'aşk ve tutku', null),
('gul', 'Beyaz', 'saflık ve yeni başlangıç', null),
('gul', 'Pembe', 'hayranlık ve minnet', null),
('gul', 'Sarı', 'dostluk ve neşe', null),
('gul', 'Turuncu', 'coşku ve heyecan', null),
('gul', 'Lila', 'ilk görüşte aşk', null),
('lale', 'Kırmızı', 'gerçek aşk', null),
('lale', 'Sarı', 'neşe ve güneşli düşünceler', null),
('lale', 'Beyaz', 'af ve saygı', null),
('lale', 'Mor', 'asalet', null),
('lale', 'Pembe', 'şefkat ve iyi dilekler', null),
('orkide', 'Beyaz', 'zarafet ve saygı', null),
('orkide', 'Pembe', 'incelik ve sevgi', null),
('orkide', 'Mor', 'hayranlık ve saygınlık', null),
('orkide', 'Sarı', 'dostluk ve yeni başlangıç', null),
('papatya', 'Beyaz', 'masumiyet ve saflık', null),
('papatya', 'Sarı', 'neşe', null),
('papatya', 'Pembe', 'sevecenlik', null),
('aycicegi', 'Sarı', 'sadakat, hayranlık ve uzun ömür', null),
('aycicegi', 'Bordo', 'sıcaklık ve içtenlik', null),
('aycicegi', 'Krem', 'huzur', null),
('lavanta', 'Mor', 'sükûnet ve bağlılık', null),
('lavanta', 'Beyaz', 'saflık', null),
('lavanta', 'Pembe', 'zarafet', null),
('karanfil', 'Kırmızı', 'derin sevgi ve hayranlık', null),
('karanfil', 'Beyaz', 'saf sevgi ve iyi şans', null),
('karanfil', 'Pembe', 'anne sevgisi', null),
('karanfil', 'Mor', 'kaprislilik (geleneksel)', null),
('karanfil', 'Sarı', 'hayal kırıklığı (geleneksel)', null),
('sumbul', 'Mavi', 'samimiyet', null),
('sumbul', 'Mor', 'pişmanlık ve af dileme', null),
('sumbul', 'Beyaz', 'güzellik ve dua', null),
('sumbul', 'Pembe', 'oyunbazlık', null),
('sumbul', 'Sarı', 'kıskançlık (geleneksel)', null),
('nergis', 'Sarı', 'yeniden doğuş ve yeni başlangıç', null),
('nergis', 'Beyaz', 'umut ve saflık', null),
('kasimpati', 'Beyaz', 'dürüstlük ve sadakat', null),
('kasimpati', 'Sarı', 'dostluk', null),
('kasimpati', 'Kırmızı', 'sevgi', null),
('kasimpati', 'Mor', 'iyileşme dileği', null),
('kasimpati', 'Turuncu', 'sıcaklık ve coşku', null),
('ortanca', 'Mavi', 'anlayış ve af', null),
('ortanca', 'Pembe', 'içtenlik', null),
('ortanca', 'Beyaz', 'zarafet ve bolluk', null),
('ortanca', 'Mor', 'derin anlayış', null),
('menekse', 'Mor', 'sadakat ve bağlılık', null),
('menekse', 'Beyaz', 'saflık', null),
('menekse', 'Pembe', 'sevgi', null),
('menekse', 'Mavi', 'vefa', null),
('gerbera', 'Turuncu', 'neşe', null),
('gerbera', 'Pembe', 'hayranlık', null),
('gerbera', 'Kırmızı', 'aşk', null),
('gerbera', 'Sarı', 'mutluluk', null),
('gerbera', 'Beyaz', 'saflık', null),
('sakayik', 'Pembe', 'romantizm ve mutlu evlilik', null),
('sakayik', 'Beyaz', 'onur ve incelik', null),
('sakayik', 'Kırmızı', 'onur ve bereket', null),
('sakayik', 'Mercan', 'tutku', null),
('zeytin', 'Yeşil', 'barış ve bilgelik', null),
('zeytin', 'Gümüşi', 'dayanıklılık', null);
