# Eugen FnF Coming Soon Landing Page

A luxury fitness brand coming-soon landing page built with **Astro** and **Tailwind CSS**, designed for instant loading, silky-smooth hardware-accelerated pointer parallax, and zero runtime bloat.

## Tech Stack
- **Framework:** Astro 4 (Static Site Generation)
- **Styling:** Tailwind CSS (Luxury Gold & Dark Night Theme)
- **Deployment:** Cloudflare Pages (Static Output)

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:4321` to view in browser.

### 3. Run Tests
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```
Build output is generated into the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

## Cloudflare Pages Deployment

When setting up your Cloudflare Pages project:
- **Framework preset:** `Astro` (or `None`)
- **Build command:** `npm run build`
- **Build output directory:** `dist`

### Environment Variables

Configure the countdown target launch date in Cloudflare Pages dashboard under **Settings > Environment variables** (or in a `.env` file locally):

```env
PUBLIC_LAUNCH_DATE="2026-10-01T00:00:00+05:30"
```

The app checks the following variables in order:
1. `PUBLIC_LAUNCH_DATE`
2. `LAUNCH_DATE`
3. `VITE_LAUNCH_DATE` (backwards compatibility)
4. Default fallback: `"2026-10-01T00:00:00+05:30"`
