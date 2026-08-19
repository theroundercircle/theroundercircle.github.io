# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The public website for The Rounder Circle (a Bay Area bluegrass/Americana band), served as static files from GitHub Pages. The repo is `theroundercircle/theroundercircle.github.io`; `CNAME` maps it to `theroundercircle.com`. There is no build step, package manager, bundler, or test suite — plain HTML/CSS/vanilla JS, deployed by pushing to `main`.

## Working locally

No install/build required. Open the HTML files directly in a browser, or serve the directory to avoid `fetch()` CORS issues with `shows.json`:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000/index.html` etc.

## Architecture

**Pages** are independent top-level HTML files (`index.html`, `about.html`, `music.html`, `shows.html`, `videos.html`, `contact.html`, `epk.html`, `merch/index.html`). Each page repeats its own `<head>` boilerplate (Google Fonts, Font Awesome CDN, `assets/css/style.css`) — there is no templating engine, so shared markup changes must be hand-edited across every page that needs them.

**Header/footer are Web Components, not includes.** `assets/js/header.js` and `assets/js/footer.js` define `<main-header>` and `<main-footer>` custom elements that inject their markup via `connectedCallback`. Every page loads both scripts with `defer` in `<head>` and places `<main-header></main-header>` / `<main-footer></main-footer>` in the body. To change nav links, the promo banner, or footer social links site-wide, edit these two files — not the individual pages.
- `header.js` also sets the `.active` nav class by comparing `location.pathname` against each link's `href`, and shows a one-time-per-session promo banner (via `sessionStorage`) that auto-hides after 60s.
- `toggleMenu()` (mobile hamburger) is a global function defined in `header.js` and wired up via inline `onclick` in the injected markup.

**Shows page is data-driven.** `assets/js/shows.json` is a flat array of show objects (`date`, `time`, `venue`, `event`, `link`, `details`, `location`). `assets/js/shows.js` fetches it, splits into upcoming/past relative to today's date (parsed as local time, not UTC, to avoid timezone off-by-one bugs), sorts each list, and renders into `#upcoming-shows` / `#past-shows` on `shows.html`. Past shows are additionally grouped by venue and by month. **To add/update a show, edit `assets/js/shows.json` only** — dates must be zero-padded `YYYY-MM-DD` (e.g. `2026-01-30`, not `2026-1-30`) since `parseLocalDate` assumes that format positionally.

**Styling** is one global stylesheet, `assets/css/style.css`, using CSS custom properties for spacing/color tokens (e.g. `var(--space-xl)`). No CSS modules/scoping — class names are shared across all pages (`.card`, `.show-list`, `.hero`, `.contact-form`, etc.), so renaming or restyling a class affects every page that uses it.

**Assets**: `assets/images/` holds all photography/artwork (an `archive/` and `gallery/` subfolder exist for older/extra images — check there before assuming an image is unused), `assets/audio/` holds song preview MP3s referenced from `music.html`, `assets/epk/` holds the press kit PDF/zip linked from `epk.html`.

**Email signup popup**: defined inline in `index.html` (not componentized) — a Substack embed iframe shown once per calendar day via a `localStorage` key keyed on `new Date().toDateString()`.

**Merch** links out to an external Fourthwall store rather than being hosted here; `merch/index.html` exists but the main nav links directly to `https://the-rounder-circle-shop.fourthwall.com`.

## Conventions to follow

- When adding a new page, copy the `<head>` block (fonts, Font Awesome, stylesheet, header/footer script tags) from an existing page like `shows.html` rather than reinventing it, and add the nav link in `header.js`.
- Keep `assets/js/shows.json` dates zero-padded and in `YYYY-MM-DD` format.
- There's no linter/formatter/test runner configured — verify changes by opening the affected pages in a browser.
