# COFFEE STUDIO

A bilingual (Ukrainian / English) one-page website for a fictional specialty coffee shop, built with **Vite, React 18, TypeScript and plain CSS**.

> **Demo content.** The address, phone number, email, social handle and customer reviews are placeholders, and the contact and newsletter forms do not send or store anything. Replace them before using the site for a real business.

## Features

- Editorial hero, menu with photo cards and category filters, story, signature drinks, gallery with lightbox, reviews, location & hours, contact form
- UA / EN language switcher (Ukrainian by default, choice remembered in `localStorage`)
- Prerendered HTML: the page is rendered to static HTML at build time and hydrated in the browser
- Responsive from 320 px to wide desktop; respects `prefers-reduced-motion`
- WCAG 2.2 AA checked with axe-core; no runtime API keys or environment variables

## Getting started

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                                                  |
| ------------------- | ----------------------------------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                                            |
| `npm run build`     | Type-check, build to `dist/`, then prerender the page into `dist/index.html` |
| `npm run preview`   | Serve the production build locally                                           |
| `npm run typecheck` | TypeScript check only                                                        |

## Deploying to Vercel

Import the repository in Vercel. The settings are also pinned in `vercel.json`:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework preset | **Vite**        |
| Install command  | `npm ci`        |
| Build command    | `npm run build` |
| Output directory | `dist`          |

No environment variables are required. `vercel.json` also rewrites unknown paths to `index.html`, sets long-term caching for hashed assets and adds basic security headers.

## Editing content

- **Texts and translations:** `src/i18n.tsx` (interface strings, both languages)
- **Menu, prices, featured drinks, gallery, reviews, opening hours:** `src/data.ts`
- **Styles and design tokens:** `src/styles.css`
- **Hero photo:** `public/images/hero-cappuccino-*`

## Project structure

```
public/            static files copied as-is (icons, robots.txt, hero images)
scripts/           build-time prerender step
src/
  components/      page sections and shared UI
  hooks/           scroll-reveal and in-page anchor scrolling
  data.ts          menu and content data (UA + EN)
  i18n.tsx         translations and language context
  entry-server.tsx render entry used for prerendering
  main.tsx         browser entry (hydration)
```

## Credits

Photography from [Unsplash](https://unsplash.com) (Unsplash License). Fonts: Cormorant Garamond and Manrope via Google Fonts.
