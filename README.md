# Pionio — Portfolio

Sito portfolio dello studio freelance **Pionio** (web design & sviluppo, Italia).
Prerenderizzato staticamente (SSG), bilingue IT/EN, con showcase progetti,
pagine servizi, blog SEO e un form di contatto serverless.

🔗 **Live:** https://portfolio-pionio.vercel.app

## Caratteristiche

- **SSG** — ogni rotta è prerenderizzata in HTML al build con `vite-react-ssg`
  (20 pagine: home, 7 case study, 7 servizi, 7 articoli, contatti, privacy).
- **Bilingue IT/EN** — i18n custom con persistenza su `localStorage` e
  auto-rilevamento da `navigator.language`.
- **3D hero** — modello GLTF interattivo via `@google/model-viewer`, mostrato
  solo dove ha senso (disattivato negli in-app browser di Instagram/TikTok/…
  per evitare stalli WebGL).
- **Motion & WebGL** — animazioni `framer-motion` (con `LazyMotion` per il
  tree-shaking), background aurora con shader WebGL custom, magnetic buttons.
- **Form contatti serverless** — Vercel Edge Function (`api/contact.ts`) con
  validazione, escaping HTML, anti header-injection e rate-limiting; invio via
  Resend.
- **SEO/a11y forti** — meta + canonical + OG/Twitter per rotta, JSON-LD
  (Person, WebSite, ProfessionalService), sitemap/robots, skip-link, manifest PWA.
- **Dark-only** per scelta di design (zinc-950).

## Stack

| Ambito | Tecnologia |
| --- | --- |
| UI | React 19 + React Router 6 |
| SSG / build | vite-react-ssg + Vite 7 + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first), font Geist self-hosted |
| Animazioni | framer-motion, WebGL shader |
| Serverless | Vercel Edge Function + Resend |
| Analytics | Vercel Analytics + Speed Insights |
| Hosting | Vercel |

## Sviluppo

```bash
npm install
cp .env.example .env.local   # RESEND_API_KEY, NOTIFICATION_EMAIL (lato server)
npm run dev                  # http://localhost:5173
```

### Script

| Comando | Descrizione |
| --- | --- |
| `npm run dev` | Dev server Vite |
| `npm run build` | Type-check + build SSG (prerender di tutte le rotte) |
| `npm run lint` | ESLint |
| `npm run preview` | Anteprima della build |

## Struttura

```
src/
├── pages/        # rotte (Home, ProjectPage, ServicePage, BlogPost, Contatti, Privacy)
├── components/   # sezioni e UI (Hero, WorksBento, AuroraBackground, ...)
├── lib/          # contenuti dati (projects/services/blog), i18n, analytics
├── context/      # LanguageContext (IT/EN)
└── routes.tsx    # definizione rotte per l'SSG
api/contact.ts    # edge function form contatti (Resend)
```

I contenuti (progetti, servizi, articoli) sono dati tipizzati in `src/lib/` —
aggiungere una voce è una modifica a un file, senza CMS.

## Variabili d'ambiente

| Variabile | Scopo |
| --- | --- |
| `RESEND_API_KEY` | Invio email dal form contatti (solo edge function) |
| `NOTIFICATION_EMAIL` | Destinatario delle notifiche |

Nessun segreto è committato: solo `.env.example` con placeholder.
