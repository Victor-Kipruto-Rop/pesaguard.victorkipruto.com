# PesaGuard web

The public PesaGuard website: a standalone Next.js App Router project. The backend lives in a separate repository (https://github.com/Victor-Kipruto-Rop/pesaguard).

## Run locally

Install Node.js 20+ and npm, then run:

```bash
npm install
npm run dev
```

Set `PESAGUARD_API_URL` to enable the server-side status health check. No backend secret is exposed to the browser.

Set `NEXT_PUBLIC_SITE_URL` (for example `https://pesaguard.victorkipruto.com`) at build time. The sitemap, robots.txt, canonical URLs and `metadataBase` all read it and fall back to `http://localhost:3000` if it is missing.

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```
