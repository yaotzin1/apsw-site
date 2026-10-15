# showcase-src

Source of the open-source showcase page served at https://apsw.pl/showcase/ (Vite + React 19 + TypeScript + MUI 7).
It live-demos `apsw-gridwright`, `apsw-gridwright-mui` and `apsw-mui-excel-filter`, all installed from npm.

The showcase is also a catalogue of possible `apsw-gridwright` add-on options: `search()`, `columnFilters()`, `exportMenu()`, `rowActions()`, `inlineEditing()`, `columnLayout()`, `cellNavigation()`, `treeData()`, `rowDetail()`, `virtualRows()` and `urlSync()`. MUI-specific demos cover `muiAddons()`, `muiSorting()` and `muiTokens(theme)`.

- `npm install` — once, inside this folder (`node_modules` is gitignored).
- `npm run dev` — Vite on http://localhost:5173/showcase/ ; `/api` and `/assets` are proxied to the PHP dev server on 127.0.0.1:8088 (`php -S 127.0.0.1:8088` from the repo root).
- `npm run build` — typechecks, then writes the static bundle to `../showcase/` (`base: /showcase/`). That folder is committed and deployed as-is.
- `npm run typecheck` — `tsc --noEmit` only.

Theme follows the site convention: `<html data-theme="light|dark">`, persisted in `localStorage.apsw_theme`. Colours and fonts live in `src/theme.ts` and `src/styles.css`.
