# Sera Defteri — kendi sunucunda çalıştırmak için (Vercel'e gerek kalmadan)
# docker compose up --build  ->  http://localhost:3000
FROM node:22-alpine

ENV NODE_ENV=production \
    PORT=3000
WORKDIR /app

# Uygulamanın npm bağımlılığı yok; yalnızca gereken dosyalar kopyalanır (.dockerignore da bakın)
COPY package.json vercel.json ./
COPY index.html 404.html gizlilik.html kosullar.html app.js styles.css \
     favicon.svg icon-maskable.svg manifest.webmanifest sw.js sitemap.xml robots.txt ./
COPY api ./api
COPY scripts/dev.mjs ./scripts/dev.mjs

# root olmayan kullanıcıyla çalış
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

# scripts/dev.mjs: statik dosyaları ve /api/*.js uçlarını vercel.json'daki güvenlik başlıklarıyla sunar
CMD ["node", "scripts/dev.mjs"]
