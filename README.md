# Sera Defteri — başlangıç projesi

- `PROMPT.md` — kod aracına verilecek ayrıntılı istem (API'ler, veri modeli, güvenlik, tasarım).
- `index.html`, `app.js` — ön yüz (rehber, renk dili, pazar, çiçekçi paneli, 3B çiçekler).
- `api/plant.js` — iNaturalist + Wikimedia Commons + Türkçe Vikipedi.
- `api/ai.js` — Vercel AI Gateway (soru yanıtlama, yeni bitki kartı).
- `vercel.json` — güvenlik başlıkları (CSP vb.).
- `supabase/migrations/001_init.sql` — Supabase şeması (zaten uygulandı).

Yerelde: `npm i -g vercel` → `vercel link` → `vercel dev`
Yayın: `vercel --prod`
