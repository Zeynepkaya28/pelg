-- Sera Defteri — 008: çiçekçi adresi, çalışma saatleri ve konumu
-- hours: pazartesiden pazara 7 öğe; her biri "09:00-19:00" ya da kapalı gün için boş metin.
alter table public.shops
  add column address text not null default '' check (char_length(address) <= 200),
  add column hours text[] not null default '{}'::text[]
    check (cardinality(hours) = 0 or (cardinality(hours) = 7 and array_to_string(hours, ',') ~
      '^((([01][0-9]|2[0-3]):[0-5][0-9]-([01][0-9]|2[0-3]):[0-5][0-9])?,){6}(([01][0-9]|2[0-3]):[0-5][0-9]-([01][0-9]|2[0-3]):[0-5][0-9])?$')),
  add column lat double precision check (lat is null or (lat between 35 and 43)),
  add column lon double precision check (lon is null or (lon between 25 and 45));
-- konum ya ikisi birden var ya hiç yok (Türkiye sınırları içinde)
alter table public.shops add constraint shops_latlon_together check ((lat is null) = (lon is null));
