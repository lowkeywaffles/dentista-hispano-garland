# Dentista Hispano Garland: website demo

Spanish-first demo website for Dentista Hispano Garland, 2130 W Kingsley Rd, Garland, TX 75041 · (469) 908-8291.

- Single static page (`index.html`). Opens in Spanish; `?lang=en` for English.
- Speech-bubble language switch, tooth light/dark switch, live open/closed status (Dallas time).

## Needed before going live
- [ ] Confirm hours (listings say Mon–Fri 8–8, Sat 8–4, Sun 8–2:30; one directory shows closed)
- [ ] Dentist name(s) and a photo of the office or team
- [ ] Full list of treatments (listings only mention cleanings, check-ups, fillings, preventive care)
- [ ] Which PPO plans, and details of the savings plan for uninsured patients
- [ ] Logo, if they have one

## Stack
- **Next.js** (static export) + **TypeScript** + **Tailwind CSS v4**
- **Magic UI** (Marquee, MagicCard, BorderBeam), **Motion**, **GSAP**, **Lenis** smooth scroll, **Phosphor** icons
- Strings live in `src/content/strings.json` (English plus each translation); the page is `src/app/page.tsx`

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```
Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/pages.yml`).
