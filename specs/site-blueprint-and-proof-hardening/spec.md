# Specification: APSW Site Blueprint Visual Hardening & Open-Source Trilogy Proof

## 1. Business Motivation & Objectives
`apsw.pl` positions Piotr Solarz-Wnęk (APSW) around high-assurance enterprise architecture, EU Accessibility Act (EAA / WCAG 2.2) & DORA supply-chain audits, post-vibe-coding rescue sprints, and deterministic agentic engineering.

Across three verification passes (technical/cache-busting, commercial & open-source proof strength, and Blueprint & Anti-AI-Slop visual audit), we identified concrete gaps where older sections of the site diluted the strength of the newer `#assurance` section and the three open-source repositories (`apsw-gridwright`, `Indaba`, `apsw-mui-excel-filter`).

## 2. Target Personas
- **CTO / VP of Engineering (`owner`):** Wants verifiable proof that AI-assisted delivery will not create a 50k-row UI freeze, a DORA dependency nightmare, or an EAA accessibility failure.
- **Procurement / Technical Lead (`agency`):** Evaluates fixed-scope entry points (10-Day Audit, Rescue Sprint, Retainer), deep-links to live code, and transparent scoping under mutual `oneNDA`.
- **Developer / Architect arriving from GitHub, npm, or Reddit (`pixel`):** Lands on `/showcase/` or `/gridwright-examples.html` in English and expects immediate, responsive, high-craft technical truth without language mismatches or AI-template clichés.

## 3. Functional & Visual Acceptance Criteria

### AC-1: Open-Source Trilogy Commercial Strength (`Indaba`, `apsw-mui-excel-filter`, `apsw-gridwright`)
1. **Real `Indaba` Artifact in `#agentic-dev`:** Replace the fabricated `AGENTIC_SWARM_ORCHESTRATION.log` terminal box with a real `Indaba` `workflow.ai.yml` + `.indaba/traces` execution readout showing deterministic DAG orchestration, ephemeral `git worktree` isolation, shell exit-code verification gates (`npm run verify`), and cross-vendor council debate (Claude / Codex / Gemini).
2. **Visible `apsw-mui-excel-filter` B2B Proof on `index.html`:** Surface `apsw-mui-excel-filter` inside `#gridwright-showcase` (and link its live demos) with its production industrial ERP extraction origin story (extracted via Claude Code, 47 unit tests, 100% coverage, subtractive AutoFilter + two-term *"Add current selection to filter"*).
3. **Direct Deep-Links & Price-Scoping Clarity in `#assurance`:** Deep-link the `#assurance` proof table directly to `/showcase/#virtual`, `/showcase/#excel`, `/showcase/#accessibility`, and `/showcase/#mui-dashboard`, and clarify fixed-price scoping mechanics (written fixed fee within 24h after the 30-min architect call under `oneNDA`).
4. **Bilingual `/showcase/` Sticky Pointer Banner:** Default `#sc-banner` in `showcase-src/index.html` to English for international GitHub/npm/Reddit visitors, and automatically switch to Polish when `localStorage.getItem('apsw_lang') === 'pl'` (or `navigator.language` starts with `'pl'` when unset).
5. **Responsive Showcase Filter Sections:** Enable `responsive()` on the `Gridwright` grids in `FilterSection.tsx`, `MuiDashboardSection.tsx`, and `ExcelDeepDiveSection.tsx`, remove the rigid `.sc-grid .gw-root { min-width: 640px }` overflow trap where `responsive()` is active, and make `.sc-dashboard__bar` wrap cleanly on narrow viewports.

### AC-2: Blueprint & Anti-AI-Slop Visual Compliance (`pixel` Doctrine)
1. **Zero Forbidden Purple (`#a855f7`):** Remove all `#a855f7` inline styles from `index.html` and `js/i18n.js`.
2. **One Brand Accent (Teal/Cyan) + Semantic Status Only:**
   - Primary CTA buttons (`.btn-emerald`, `.btn-primary`) use Brand Teal (`#044259` / `#075a7a`) in light mode and Brand Cyan (`#38bdf8`) in dark mode.
   - Section tags (`[ ... ]`) use the blueprint cyan/teal bracket (`--instrument-bracket`) consistently across all sections; emerald is reserved strictly for semantic passing/available indicators.
3. **No Headline Biscuit Pills:** Convert `.hero-status-badge` (`index.html`) and `.gw-hero-badge` (`gridwright-examples.html`) from `border-radius: 9999px` emerald pills into squared (`border-radius: 4px`) monospace instrument readouts with subtle blueprint borders and a semantic emerald status dot.
4. **No Glowing Orbs or Colored Borders at Rest:** Remove `.gw-card-glow` radial gradient, remove permanent green border on `.engagement-card.featured` at rest (use subtle blueprint border + registration marks), and replace thick `4px solid var(--accent-amber)` inline borders in `gridwright-examples.html` with clean CSS classes.
5. **No Icon-Stuffed Bento Boxes:** Replace decorative boxed SVG icons (`.step-icon-wrap`, `.service-icon-wrap`) in `#speckit` and `#services` with clean monospace index badges (`[ 01 ]`–`[ 06 ]`) matching `#assurance`.
6. **Inline Style Cleanup & Cache-Busting Sync:** Move inline `style="..."` color/typography declarations in `index.html` and `gridwright-examples.html` into CSS classes, and bump all `?v=` query strings to `20261016`.
