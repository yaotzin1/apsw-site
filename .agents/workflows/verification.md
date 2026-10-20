# Workflow: APSW Site Verification & Anti-AI-Slop Quality Gate

## Purpose
Execute automated technical, i18n, visual-token, and packaging verification checks before deploying `apsw-site`.

## Step 1: PHP Backend Syntax Check
```powershell
php -l contact.php
php -l api/people.php
```
Confirm zero syntax errors in both PHP endpoints.

## Step 2: JavaScript & i18n Parity Verification
```powershell
node --check js/app.js
node --check js/i18n.js
node --check js/spec-kit-flow.js
node --check js/gridwright-examples.js
```
Confirm:
- All `data-i18n*` keys in `index.html` exist in both `APSW_TRANSLATIONS.en` and `APSW_TRANSLATIONS.pl` with zero missing or orphaned keys.
- All `data-i18n*` keys in `gridwright-examples.html` exist in `js/gridwright-examples.js`.
- All JSON-LD `<script type="application/ld+json">` blocks in `index.html`, `gridwright-examples.html`, and `showcase/index.html` parse cleanly.
- `agent.json` is valid JSON and `sitemap.xml` is valid XML.

## Step 3: Showcase TypeScript & Vite Build
```powershell
npx --prefix showcase-src tsc -p showcase-src/tsconfig.json --noEmit
npm --prefix showcase-src run build
```
Confirm `tsc` exits `0` and `showcase/` assets match `showcase-src/`.

## Step 4: Blueprint & Anti-AI-Slop Audit (`pixel` & `agency` rules)
- [ ] **Zero Forbidden Purple:** No `#a855f7`, `#8b5cf6`, or `#6366f1` in HTML, CSS, or JS.
- [ ] **One Accent (Brand Teal/Cyan) + Semantic Status Only:** Primary CTAs and `[ bracketed ]` section tags use brand teal/cyan across light and dark modes; emerald is strictly semantic (passing/available/zero-violations).
- [ ] **No Headline Biscuit Pills or Glowing Orbs:** Hero status readouts use squared instrument styling; no `.gw-card-glow` radial blobs or thick colored card borders at rest.
- [ ] **No Icon-Stuffed Bento Cards:** Cards in `#assurance`, `#speckit`, and `#services` use monospace index/domain tags rather than decorative boxed icons.
- [ ] **Real Open-Source Proof:** `apsw-gridwright`, `apsw-gridwright-mui`, `apsw-mui-excel-filter`, and `Indaba` (`workflow.ai.yml`) are all accurately represented with real artifacts.
- [ ] **Cache-Busting Sync:** Whenever `css/*.css` or `js/*.js` change, bump `?v=YYYYMMDD` in `index.html` and `gridwright-examples.html`.

## Step 5: Cyber_Folks / WinSCP Upload Packaging
```powershell
bash ./deploy/package-cyberfolks.sh
```
Confirm `dist/upload/` and `dist/apsw-site-<sha>.zip` are freshly generated with the updated files so WinSCP syncs the latest bundle to `public_html/`.

