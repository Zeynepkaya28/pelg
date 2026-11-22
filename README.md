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
| `api/page.js` | `/bitki/:id` sayfası: paylaşım önizlemesi için bitkiye özel başlık, açıklama ve Open Graph etiketleri |
| `api/_plants.js` | `app.js`'teki bitki verisinin sunucu kopyası — elle düzenleme, `node scripts/gen-plants.mjs` ile üret |
| `api/_lib.js` | Ortak: zaman aşımı, köken kontrolü, hız sınırı, AI çağrısı, kart doğrulama |
| `gizlilik.html`, `kosullar.html`, `404.html` | KVKK aydınlatma metni, kullanım koşulları, bulunamadı sayfası |
| `.github/workflows/test.yml` | Her push'ta sözdizimi kontrolü ve birim testleri |
| `sw.js`, `manifest.webmanifest` | PWA: ana ekrana eklenebilir, rehber çevrimdışı açılır (önce ağ, ağ yoksa önbellek) |
| `supabase/migrations/` | 001 şema, 002 `plant_cache` + `admins`, 003 silme politikaları, 004 ürün bildirimleri, 005 ürün istatistikleri, 006 çiçek anlamları |
| `tests/rls-check.sql` | İki sahte hesapla RLS denemesi (sonunda geri alınır) |

## Özellikler (kısaca)

- **Rehber:** 16 bitki, trie arama, gerçek fotoğraflar + 3B (Three.js yalnızca gerektiğinde yüklenir), mevsim notları, her bitkiye adres (`/bitki/orkide?renk=pembe`) ve paylaşım önizlemesi.
- **Bitkilerim:** tarayıcıda saklanan liste, sulama günü, `.ics` takvim dosyası, site açıkken bildirim.
- **Pazar:** arama, kategori/şehir/stok süzgeci, çiçekçi sayfaları (`/dukkan/:id`), ürün bildirme.
- **Çiçekçi paneli:** dükkân, ürün ekle/düzenle/kaldır, görüntülenme ve WhatsApp sayıları, şifremi unuttum, dükkânı silme.
- **Yönetici:** bildirimler, ürün kaldırma, çiçek anlamlarını düzenleme.

## Elle yapılacaklar

1. **Supabase → Authentication → URL Configuration:** Site URL = canlı adres; Redirect URLs = `https://<canlı-adres>/**` ve `http://localhost:3000/**`.
2. **Yapay zekâ:** Vercel → AI Gateway sayfasında kredi kartı ekle (ücretsiz krediler de bununla açılır). Kart yoksa soru sorma, yeni bitki kartı ve fotoğraftan tanıma hata verir; rehber ve pazar çalışır.
3. **Yasal metinler:** `gizlilik.html` ve `kosullar.html` içindeki `[Veri sorumlusunun adı / unvanı]`, `[adres]` ve `[e-posta adresi]` alanlarını doldur; yayından önce bir hukukçuya gözden geçirt.
4. **E-posta:** Supabase'in hazır e-posta servisi sınırlıdır; gerçek kayıtlar için Authentication → SMTP Settings'ten kendi e-posta servisini (ör. Resend) bağla.
5. **Yönetici eklemek:** Supabase SQL düzenleyicisinde `insert into public.admins (user_id) values ('<kullanıcı-uuid>');`
6. **Kalıcı hız sınırı:** bellek içi sınır her sunucu örneğinde ayrıdır; canlıda Vercel Firewall'da `/api/ai`, `/api/care`, `/api/identify` için IP başına kural ekle.
