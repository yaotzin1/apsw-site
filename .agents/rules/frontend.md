# Frontend Guidelines (React, Vite, TypeScript & MUI)

## 1. Tech Stack Constraints
* **HTTP Requests:** STRICTLY use native browser `fetch` API. **DO NOT use Axios.**
* **State Management:** STRICTLY use native React state (`useState`, `useEffect`, `useContext`). **DO NOT use TanStack Query or Redux.**
* **Dialogs & Toasts:** **DO NOT** use `window.alert()` or `window.confirm()`. Use the custom `useConfirm` Context for dialogs, and `sonner` (`toast()`) for toast notifications.

## 2. Component-Oriented Architecture & Dedicated Service Layer (CRITICAL)
* **No Monolithic Files:** Keep pages clean, focused, and thin. NEVER place complex forms, data tables, dialog modules, or charts directly in monolithic single-file dashboards (e.g. `AdminDashboard.tsx`, `AclDashboard.tsx`).
* **Component Extraction:** Extract reusable or complex sub-sections into standalone functional components under `/web/src/components/`.
* **Dedicated API Service Layer:** All API interactions MUST be separated from GUI components and encapsulated in typed domain service modules under `/web/src/services/` (e.g., `adminService.ts`, `aclService.ts`, `brandService.ts`, `prospectService.ts`). Components must delegate data fetching and mutations to services rather than scattering raw `apiClient` or `fetch` calls inside UI handlers.
* **Clean State Boundaries:** Pass data down via typed TypeScript props interfaces and emit updates up via callbacks (`onSave`, `onCancel`, `onRefresh`).
* **MUI Theme Styling:** Rely on the global MUI Theme for styling instead of writing scattered inline `sx` styles or page-specific utility wrappers.

## 3. High-Speed Conveyor Belt UX
* The primary dashboard (`/`) is an approval conveyor belt.
* Implement **Optimistic UI Updates**: instantly remove approved/rejected items from local state/DOM before background `fetch` calls complete.
* **Tenant Context:** `TenantContext` automatically appends active Brand ID (`X-Brand-Id`) to every request header.
* **Real-time Notifications:** Subscribe to Mercure SSE streams (`/.well-known/mercure`) using native `EventSource`.

## 4. Dynamic Plugin Rendering
* Brand workspace tabs are resolved dynamically from `GET /api/brands/{id}/addons-tabs`.
* NEVER hardcode dynamic add-on tabs in React code—they must be rendered dynamically via `AddonTabRenderer.tsx`.

## 5. Strict Anti-AI-Slop GUI Rules for Agent Code Generation (MANDATORY)
When Antigravity generates React/MUI components, it MUST adhere strictly to the Anti-AI-Slop GUI doctrine:
- 🚫 **No Fake "AI Magic" Gimmicks:** NEVER add arbitrary sparkle icons (`✨`, `<AutoAwesomeIcon />`) or pulsating rainbow gradient outlines claiming "AI is analyzing...".
- 🚫 **No Meaningless Mock/Decorative Charts:** NEVER render fake charts with static sinusoidal curves or empty decorative graphs. Charts must bind strictly to verified backend analytics APIs and display concrete ROI metrics.
- 🚫 **No Cliché Bento Box Overuse:** Do not generate random 4x4 card grids where every card contains an unrelated icon. Every container must earn its place on screen by serving triage ergonomics.
- 🚫 **No Over-Nested Cards:** Maximum 1 level of card elevation (`<Card>` or `<Paper>`). Never place cards inside cards inside cards.
- 🚫 **No Monolithic Components (>150 Lines):** Any component exceeding 150 lines or containing complex conditional flows MUST be broken down into smaller, single-responsibility sub-components under a `/components/` or `/Tabs/` subdirectory.
- 🚫 **Strict i18n Enforcement (Zero Hardcoded Text):** 100% of user-visible strings (headers, buttons, toasts, tooltips, placeholders) MUST use `t('key')` i18n functions from `useTranslation()`.
- 🚫 **Zero Inline Styles & Strict Token Usage:** The `style={{...}}` prop is STRICTLY FORBIDDEN. All styling MUST use MUI v6 `sx` prop or `@mui/material/styles` with predefined theme tokens (e.g. `color: 'primary.main'`). Raw hex/RGB color codes are forbidden in component code.


