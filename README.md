# HermanScience CQI ROI Calculator for iframe

A compact React + TypeScript ROI calculator designed for embedding in an iframe on the HermanScience website.

## What changed from the original prototype

- Removed the large HermanScience hero box for easier iframe use
- Simplified the layout into a single narrow column
- Removed weighted opportunity charts and task-level analysis tables
- Simplified notes to interpretation guidance only
- Updated sample prompts to more common everyday use cases
- Locked ROI math to Best Observed Opportunity
- Configured Vite with a relative base path for GitHub Pages compatibility

## Local run

```bash
npm install
npm run dev
```

## Production build

```bash
npm install
npm run build
npm run preview
```

## GitHub Pages deployment

This project includes a GitHub Actions workflow for Pages deployment.

1. Create a GitHub repository.
2. Upload this project to the repo root.
3. In GitHub, open **Settings > Pages**.
4. Set the source to **GitHub Actions**.
5. Push to `main`.

Because Vite uses `base: './'`, the built assets will load correctly from a GitHub Pages project site and within an iframe.
