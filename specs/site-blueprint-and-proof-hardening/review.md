# Review & Verification Sign-Off: APSW Site Blueprint Visual Hardening & Open-Source Trilogy Proof

**Date:** 2026-10-16  
**Branch:** `feat/showcase-responsive`  
**Status:** ✅ Verified & Ready for WinSCP Upload

---

## 1. Summary of Changes

### A. Skills, Workflows & Spec-Kit Governance
- **[`.agents/skills/pixel/SKILL.md`](file:///D:/projects/private/apsw-site/.agents/skills/pixel/SKILL.md):** Replaced inherited Idumela MUI persona with APSW's **"Blueprint & Instruments"** design doctrine, strict **One-Accent Colour Contract** (Teal in light mode, Cyan in dark mode; Emerald reserved strictly for semantic passing/availability status; zero neon purple `#a855f7`), and **Anti-AI-Slop** rules.
- **[`.agents/skills/agency/SKILL.md`](file:///D:/projects/private/apsw-site/.agents/skills/agency/SKILL.md):** Codified APSW's B2B commercial conversion architecture and the **Open-Source Proof Trilogy** (`apsw-gridwright`, `Indaba`, `apsw-mui-excel-filter`).
- **[`.agents/workflows/verification.md`](file:///D:/projects/private/apsw-site/.agents/workflows/verification.md):** Replaced Symfony/Docker commands with APSW's actual verification gates (JS/PHP syntax, 344-key EN/PL i18n parity, JSON-LD/XML validation, `showcase-src` TypeScript + Vite build, and Anti-AI-Slop regex audit).
- **[`specs/site-blueprint-and-proof-hardening/`](file:///D:/projects/private/apsw-site/specs/site-blueprint-and-proof-hardening/spec.md):** Full Spec-Kit (`spec.md`, `plan.md`, `tasks.md`, `review.md`).

### B. Pass 1 — Technical & Cache-Busting Hardening
- Bumped all CSS and JS asset query strings in [`index.html`](file:///D:/projects/private/apsw-site/index.html) and [`gridwright-examples.html`](file:///D:/projects/private/apsw-site/gridwright-examples.html) to `?v=20261016` so `.htaccess`'s 7-day browser cache serves the updated stylesheets and scripts immediately upon upload.

### C. Pass 2 — Commercial Proof & `/showcase/` Responsiveness
- **Real `Indaba` Workflow Readout:** Replaced the fabricated `AGENTIC_SWARM_ORCHESTRATION.log` in `#agentic-dev` ([`index.html`](file:///D:/projects/private/apsw-site/index.html) and [`js/i18n.js`](file:///D:/projects/private/apsw-site/js/i18n.js)) with an authentic `workflow.ai.yml · @indaba/engine` DAG and `.indaba/traces/` execution readout (`specify → plan → implement(worktree) → verify(adversarial)`).
- **`apsw-mui-excel-filter` Legacy ERP Extraction Story:** Surfaced `apsw-mui-excel-filter` visibly in `#gridwright-showcase`, `#assurance`, [`llms.txt`](file:///D:/projects/private/apsw-site/llms.txt), [`llms-full.txt`](file:///D:/projects/private/apsw-site/llms-full.txt), and [`showcase-src/src/packages.ts`](file:///D:/projects/private/apsw-site/showcase-src/src/packages.ts) (extracted from a production industrial ERP using Claude Code, generalized for MUI 5–7 / React 17–19, subtractive two-term *"Add current selection to filter"*, 47 tests at 100% coverage).
- **Direct Showcase Deep-Links & Fixed-Price Scoping:** Updated `#assurance` (`assurance.note_html` and `assurance.offer_desc` in EN & PL) to deep-link directly to `showcase/#virtual`, `showcase/#excel`, `showcase/#a11y`, and `showcase/#mui-dashboard`, and clarified that fixed-price engagements are scoped in one 30-minute call with the Principal Architect under mutual `oneNDA` with a written fixed-fee proposal within 24 hours.
- **Bilingual `/showcase/` Sticky Banner:** Updated `#sc-banner` in [`showcase-src/index.html`](file:///D:/projects/private/apsw-site/showcase-src/index.html) to default to English for international GitHub/npm/Reddit visitors and automatically switch to Polish when `localStorage.getItem('apsw_lang') === 'pl'` (or Polish browser locale when unset).
- **Responsive `apsw-mui-excel-filter` Sections on `/showcase/`:**
  - Scoped `.sc-grid .gw-root:not([data-gw-responsive]) { min-width: 640px; }` in [`showcase-src/src/styles.css`](file:///D:/projects/private/apsw-site/showcase-src/src/styles.css) so any grid opting into `responsive()` can shrink cleanly below `640px` down to `320px`.
  - Added `responsive({ stackBelow: 420 })` and per-column `responsive: { hideBelow: ... }` thresholds to [`FilterSection.tsx`](file:///D:/projects/private/apsw-site/showcase-src/src/sections/FilterSection.tsx), [`MuiDashboardSection.tsx`](file:///D:/projects/private/apsw-site/showcase-src/src/sections/MuiDashboardSection.tsx), and [`ExcelDeepDiveSection.tsx`](file:///D:/projects/private/apsw-site/showcase-src/src/sections/ExcelDeepDiveSection.tsx), and rebuilt `/showcase/`.

### D. Pass 3 — Colours & Anti-AI-Slop Enforcement
- **Zero Neon Purple:** Removed all occurrences of `#a855f7` from `index.html` and `js/i18n.js`.
- **Single Brand Accent:** Unified `.btn-emerald` and `.section-tag.emerald` in [`css/instrument.css`](file:///D:/projects/private/apsw-site/css/instrument.css) to use `--brand-teal` / `--text-brand` in light mode and `--instrument-readout` (`#38bdf8` cyan) in dark mode, keeping emerald strictly for semantic passing/availability indicators.
- **No Pill Badges Above `<h1>` / No Glow Orbs / No Boxed Icons:**
  - Squared `.hero-status-badge` and `.gw-hero-badge` (`border-radius: 4px`, monospace readout).
  - Removed `.gw-card-glow` radial blur orb and replaced permanent green border on `.engagement-card.featured` at rest with `--border-brand` + corner registration marks.
  - Replaced decorative boxed SVG icons in `#speckit`, `#agentic-dev`, and `#services` with monospace index tags (`[ 01 ]`–`[ 06 ]`).
  - Eliminated all non-honeypot inline `style="..."` attributes in `index.html` and `gridwright-examples.html`.

---

## 2. Verification Gate Results

| Gate | Result |
| :--- | :--- |
| `node --check js/i18n.js`, `js/app.js`, `js/gridwright-examples.js` | ✅ PASS (0 syntax errors) |
| EN/PL `data-i18n*` key parity across 344 attributes in `index.html` | ✅ PASS (0 missing keys in `en` or `pl`) |
| JSON-LD & `agent.json` validation (`index.html`, `gridwright-examples.html`, `showcase/index.html`) | ✅ PASS |
| `npm --prefix showcase-src run build` (`tsc --noEmit && vite build`) | ✅ PASS (built `showcase/` in 374ms) |
| Forbidden `#a855f7` purple audit across HTML/CSS/JS | ✅ PASS (0 matches) |
| Cache-busting `?v=20261016` audit across `index.html` & `gridwright-examples.html` | ✅ PASS |
| Inline `style="..."` audit across `index.html` & `gridwright-examples.html` | ✅ PASS (0 unexpected inline styles) |
