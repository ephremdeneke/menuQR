# Sinan Cafe — Premium QR Menu

A high-end, immersive digital cafe experience for Sinan Cafe (Addis Ababa, Ethiopia).
Customers scan a QR code and browse an editorial-style menu. Includes an admin panel
for menu, category, and QR management, plus order/kitchen and analytics screens.

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS v3** (custom coffee-inspired design system with light/dark themes)
- **Zustand** (state + persisted stores: cart, menu, auth)
- **React Router v6**
- **qrcode.react** (QR generation)
- **lucide-react** (icons)

## Features

### Customer Menu (`/sinan`, root `/`)
- Story-driven scrolling experience: Hero → Today at Sinan → Menu → Coffee Story → Footer
- Hero with scroll parallax and rotating brand badge
- Editorial menu grid with varied card layouts
- Product detail bottom-sheet (view information)
- Search with highlighted matches, dark mode, skeleton loaders, empty & sold-out states

> **Ordering is currently DISABLED (menu display only).** The cart, checkout and
> order-success flows exist in the code but are hidden. To enable them later, set
> `ORDERING_ENABLED = true` in `src/config.js` — no other change needed.

### Admin (`/admin`)
- Protected by login (default `admin` / `sinan123`)
- Dashboard with sales stats & charts
- Live Kitchen Display System (KDS): New → Confirmed → Preparing → Ready
- Orders table with status badges
- Menu CRUD: edit price/photo/name/description/category, add new items, delete, toggle availability
- Category management: add, rename, reorder and delete categories (delete is guarded while items exist)
- General menu QR code with SVG download + per-table QR (future feature)
- Settings: change admin credentials and reset the menu to defaults

## Getting Started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
```

Build for production:

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Deployment (Vercel)

This is a Vite SPA. Vercel auto-detects the Vite build (outputs to `dist/`).
A `vercel.json` provides SPA rewrites so client-side routes work after build.

```bash
npm install -g vercel
vercel          # deploy
vercel --prod   # deploy to production
```

## Credentials

- Admin login: `admin` / `sinan123` (mock, client-side — swap for a real API in production)
