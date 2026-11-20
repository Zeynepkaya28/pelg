# Sera Defteri

Türkçe bitki bakım rehberi ve çiçekçi pazarı. Ayrıntılı istem: `PROMPT.md`.

## Çalıştırma

```bash
npm run dev          # http://localhost:3000 — Vercel CLI gerekmez (scripts/dev.mjs)
npm test             # ağ gerektirmeyen birim testleri (köken, 429, gövde sınırı, AI çıktısı doğrulama…)
npm run smoke        # 16 bitkinin hepsinde lisanslı fotoğraf + atıf var mı (ağ gerekir)
node tests/smoke-keyless.mjs   # GBIF / Wikidata / Openverse gerçekten veri döndürüyor mu
```

Hiçbir dış veri kaynağı anahtar ya da hesap istemez (iNaturalist, Wikimedia Commons, Vikipedi, Wikidata, GBIF, Openverse).
Yapay zekâ Vercel AI Gateway üzerinden çalışır: Vercel'de anahtarsız (OIDC), yerelde `vercel link` sonrası `.env.local` içindeki `VERCEL_OIDC_TOKEN` ile. Gateway, hesapta kayıtlı kredi kartı ister.

`plant_cache`e yazmak için isteğe bağlı: `SUPABASE_SERVICE_ROLE_KEY` (yalnızca sunucu ortam değişkeni).

Yayın: GitHub'daki `main` dalına her `git push` Vercel'de otomatik olarak canlıya yayınlanır (proje: `pelg`, canlı adres: https://pelg.vercel.app). Diğer dallar önizleme adresi alır. Elle yayın gerekirse: `npx vercel@latest deploy --prod`.

## Yapı

| Dosya | Ne yapar |
|---|---|
| `index.html`, `styles.css`, `app.js` | Ön yüz: rehber (trie arama, 3B/foto), renklerin dili, pazar, çiçekçi paneli |
| `api/plant.js` | iNaturalist + Wikimedia Commons fotoğrafları (yalnızca CC0/CC BY/CC BY-SA), Türkçe Vikipedi özeti |
| `api/ai.js` | AI Gateway: soru yanıtlama, yeni bitki kartı (IP başına dakikada 8) |
| `api/care.js` | Vikipedi (TR/EN) + Wikidata + GBIF ham verisi → yapay zekâyla Türkçe kart → `plant_cache` (30 gün) |
| `api/identify.js` | Görsel tanıyan modelle fotoğraftan tanıma, AI Gateway üzerinden (≤4 MB, jpeg/png/webp, imza kontrolü) |
| `api/stock.js` | Openverse kategori görselleri (CC BY / BY-SA / CC0 / kamu malı, atıflı; tür tanımada kullanılmaz) |
| `api/_lib.js` | Ortak: zaman aşımı, köken kontrolü, hız sınırı, AI çağrısı, kart doğrulama |
| `supabase/migrations/` | 001 şema, 002 `plant_cache` + `admins`, 003 silme politikaları |
| `tests/rls-check.sql` | İki sahte hesapla RLS denemesi (sonunda geri alınır) |

## Elle yapılacaklar

1. **Supabase → Authentication → URL Configuration:** Site URL = canlı adres; Redirect URLs = `https://<canlı-adres>/**` ve `http://localhost:3000/**`.
2. **Yapay zekâ:** Vercel → AI Gateway sayfasında kredi kartı ekle (ücretsiz krediler de bununla açılır). Kart yoksa soru sorma, yeni bitki kartı ve fotoğraftan tanıma hata verir; rehber ve pazar çalışır.
3. **Yönetici eklemek:** Supabase SQL düzenleyicisinde `insert into public.admins (user_id) values ('<kullanıcı-uuid>');`
4. **Kalıcı hız sınırı:** bellek içi sınır her sunucu örneğinde ayrıdır; canlıda Vercel Firewall'da `/api/ai`, `/api/care`, `/api/identify` için IP başına kural ekle.
