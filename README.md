# Sera Defteri

Türkçe bitki bakım rehberi ve çiçekçi pazarı. Ayrıntılı istem: `PROMPT.md`.

## Çalıştırma

```bash
npm run dev          # http://localhost:3000 — Vercel CLI gerekmez (scripts/dev.mjs)
npm test             # ağ gerektirmeyen birim testleri (köken, 429, gövde sınırı, AI çıktısı doğrulama…)
npm run smoke        # 16 bitkinin hepsinde lisanslı fotoğraf + atıf var mı (ağ gerekir)
```

Yerelde anahtarlar `.env.local` dosyasından okunur (repoya girmez):

```
AI_GATEWAY_API_KEY=...
PERENUAL_KEY=...
TREFLE_TOKEN=...
PEXELS_KEY=...
PLANTNET_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Yayın: `npm i -g vercel` → `vercel link` → `vercel --prod`. Aynı değişkenleri Vercel → Settings → Environment Variables'a ekle (`AI_GATEWAY_API_KEY` Vercel'de gerekmez, OIDC yeterli).

## Yapı

| Dosya | Ne yapar |
|---|---|
| `index.html`, `styles.css`, `app.js` | Ön yüz: rehber (trie arama, 3B/foto), renklerin dili, pazar, çiçekçi paneli |
| `api/plant.js` | iNaturalist + Wikimedia Commons fotoğrafları (yalnızca CC0/CC BY/CC BY-SA), Türkçe Vikipedi özeti |
| `api/ai.js` | AI Gateway: soru yanıtlama, yeni bitki kartı (IP başına dakikada 8) |
| `api/care.js` | Perenual + Trefle ham verisi → yapay zekâyla Türkçe kart → `plant_cache` (30 gün) |
| `api/identify.js` | Pl@ntNet ile fotoğraftan tanıma (≤5 MB, jpeg/png/webp, imza kontrolü) |
| `api/stock.js` | Pexels kategori görselleri (atıflı; tür tanımada kullanılmaz) |
| `api/_lib.js` | Ortak: zaman aşımı, köken kontrolü, hız sınırı, AI çağrısı, kart doğrulama |
| `supabase/migrations/` | 001 şema, 002 `plant_cache` + `admins`, 003 silme politikaları |
| `tests/rls-check.sql` | İki sahte hesapla RLS denemesi (sonunda geri alınır) |

## Elle yapılacaklar

1. **Supabase → Authentication → URL Configuration:** Site URL = canlı adres; Redirect URLs = `https://<canlı-adres>/**` ve `http://localhost:3000/**`.
2. **Anahtarlar:** perenual.com, trefle.io, pexels.com/api, my.plantnet.org hesaplarından alınıp ortam değişkenine yazılır. Anahtar yoksa ilgili özellik sessizce kapanır (rehber, fotoğraflar ve pazar yine çalışır).
3. **Yönetici eklemek:** Supabase SQL düzenleyicisinde `insert into public.admins (user_id) values ('<kullanıcı-uuid>');`
4. **Kalıcı hız sınırı:** bellek içi sınır her sunucu örneğinde ayrıdır; canlıda Vercel Firewall'da `/api/ai`, `/api/care`, `/api/identify` için IP başına kural ekle.
