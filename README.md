# APSW — AI-Native Solution Architecture & Enterprise Engineering

> **Official Website & Digital Presence of Piotr Solarz-Wnęk (APSW)**  
> High-performance, responsive SaaS landing page featuring Spec-Kit methodology, fully agentic multi-agent development showcases, enterprise architecture track record, structured fixed-scope engagement models, mutual NDA compliance, and machine-readable AI agent discovery endpoints (`agent.json`, `llms.txt`).

---

## 🌟 Key Architecture & Highlights

1. **Design System & Aesthetics**:
   - **Anti-AI-Slop Visual Doctrine**: No generic templates. Built with a bespoke design token system (`css/design-system.css`).
   - **Dual-Theme Support**: first visit follows the OS (`prefers-color-scheme`); the header toggle is remembered in local storage (`apsw_theme`).
   - **"Blueprint & Instruments" layer** (`css/instrument.css`, both themes): the architect's own tools as the visual reference — a drafting sheet with major/minor lines behind the hero, corner registration marks, a dimension line under the headline, mono instrument readouts for measured values, `[ bracketed ]` section tags. Dark is a navy control room (never black); light is paper with blueprint hairlines. One accent (brand cyan); status colours stay semantic (emerald passing, amber pending, red error only). No motion.
   - **Dynamic Dual-Theme Vector Logos**: Responsive SVGs (`apsw-logo-color.svg` and `apsw-logo-white.svg`) with vector scaling and crisp typography.

2. **Core Sections**:
   - **Hero & Trust Metrics**: Enterprise positioning (*"Move beyond fragile AI prototypes. Build systems that survive production."*) over four factual credentials: 19+ years of enterprise architecture, an engineering unit built to 30+ people, regulated-sector delivery, and spec-gated CI.
   - **Spec-Kit Pipeline & Interactive Code Switcher**: Interactive 4-stage pipeline (Domain Model, Invariant Schema, Prompt Injection, CI Test Gate) with real-time JSON Schema, Proto, and Test assertions.
   - **Fully Agentic Development Showcase**: Multi-agent swarms (Planner, Worker, Verifier) with self-healing feedback loops and 100% autonomous code synthesis demonstrations.
   - **Enterprise Services Grid**: 4 deep-dive capability cards (Fully Agentic Dev, Spec-Kit AI, Enterprise Architecture, High-Load Telemetry/GIS).
   - **Structured Engagement Models**: 3 fixed-scope transparent engagement cards (10-Day Strategic Architecture Audit, Production Delivery Sprint, Fractional Principal Architect Retainer).
   - **Enterprise Case Studies (NDA Compliant)**: Tier-1 Commercial & Investment Banking, Autonomous AI B2B SaaS (100% AI-developed), Industrial IoT Asset Management, Big-Four M&A Analytics, and Biotech Clinical Instrumentation.
   - **Principal Architect Profile & Credentials**: Piotr Solarz-Wnęk (19+ yrs, MSc, Azure AZ-900, DNA Architect, ITIL, EU GDPR compliant).
   - **Contact Flow & Anti-Spam Bot Defense**: 3-step SLA (4h review, 30m technical call, 24h scope), 1-click Mutual NDA request (`oneNDA` standard), dual hidden honeypots, 2-second time-trap defense, mail-header-injection sanitisation, and IP rate limiting.

3. **Open-Source Showcase (`/showcase/`)**:
   - A small Vite + React + MUI app (source in `showcase-src/`, built output committed to `showcase/`) running the real npm packages `apsw-gridwright`, `apsw-gridwright-mui` and `apsw-mui-excel-filter`.
   - It shows `apsw-gridwright` as a composable add-on system, following the package's Add-ons model: `search()`, `columnFilters()`, `exportMenu()`, `rowActions()`, `inlineEditing()`, `columnLayout()`, `cellNavigation()`, `treeData()`, `rowDetail()`, `virtualRows()` and `urlSync()`.
   - The live demos cover three Excel-style filter dropdowns driving a 300-row grid, a feature grid (multi-sort, typed column filters, search, pagination, inline editing with rejection, CSV/Excel/print export), 100,000 virtualised rows, tree data, master-detail rows with a nested grid, row action menus, column resize/reorder/pin with URL-synced view state, five locale packs with RTL, keyboard cell navigation and the accessibility live region.
   - MUI options are shown with the same grid using Material UI controls and theme values via `coreAddons={muiAddons()}`, three live `createTheme` presets, a single MUI sort view mixed into native controls, reusable `muiTokens(theme)`, and an `ExcelFilterSelect` dashboard strip over the grid.
   - The remote grid uses `createRestDataSource` against `api/people.php`, including server-side sorting, filtering, search, pagination and live PATCH edits with server-side rejection messages.
   - Rebuild after changing the demos: `cd showcase-src && npm install && npm run build`.
   - `gridwright-examples.html` stays as the agent playbook: rules, decision matrix, vanilla REST harness and canonical snippets.

4. **Machine-Readable AI Discovery Endpoints**:
   - `/agent.json`: Agent / AI procurement discovery manifest.
   - `/llms.txt` & `/llms-full.txt`: Curated semantic context for LLMs, Claude, ChatGPT, and automated research bots.
   - `/robots.txt`: Search crawler directives explicitly welcoming GPTBot, ClaudeBot, PerplexityBot, and Google-Extended.
   - `/sitemap.xml`: Complete XML search index.

---

## 🛠 Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Properties & Design System), Vanilla Modern ES6+ JavaScript. `/showcase/` only: Vite, React 19, MUI 7, TypeScript.
- **Backend (Contact API)**: PHP 8.2+ (`contact.php`) with JSON response protocol, dual-honeypot bot defense, header-injection sanitisation, and audit logging.
- **Fonts**: Inter & JetBrains Mono (Google Fonts).
- **Containerization**: Docker / Apache / FrankenPHP.

---

## 🚀 Local Development & Testing

### Option 1: Docker Compose (Recommended)
```bash
# Start container with live volume reload on port 8090
docker compose up -d

# View live site
open http://localhost:8090/
```

### Option 2: Built-in PHP Development Server
```bash
# Start local PHP server on port 8088
php -S 127.0.0.1:8088

# View live site
open http://localhost:8088/
```

---

## 🌐 Deployment

Two targets: **production** is the Cyber_Folks shared host behind `apsw.pl` (files uploaded, no containers); **staging** is a VPS running the Docker stack behind a subdomain. Both serve the same tree — the `.htaccess` works under LiteSpeed and under Apache in the container.

### Production: Cyber_Folks (Shared Hosting, DirectAdmin)
1. Build the upload set: `./deploy/package-cyberfolks.sh` (Git Bash or Linux). It writes `dist/upload/` and `dist/apsw-site-<sha>.zip` containing only what production serves — the HTML, `css/`, `js/`, `assets/`, `api/`, `contact.php`, the built `showcase/`, `.htaccess`, `robots.txt`, `sitemap.xml`, `agent.json`, `llms*.txt` — and nothing from `showcase-src/`, `deploy/`, `docker/`, `branding_raw/` or `.git`. Run `cd showcase-src && npm run build` first if the demos changed.
2. Upload the **contents** of `dist/upload/` into `public_html/`, replacing what is there. Fastest routes, in order of preference:
   - **SSH + rsync** (if the plan has SSH enabled in DirectAdmin): `rsync -avz --delete --exclude '.logs/*.log' dist/upload/ user@host:domains/apsw.pl/public_html/`
   - **SFTP** with WinSCP/FileZilla: synchronise `dist/upload/` → `public_html/`, delete orphans, keep `.logs/*.log`.
   - **DirectAdmin File Manager**: upload the zip into `public_html/`, extract, delete the zip.
3. Ensure `.logs/` is writable (`chmod 770 .logs`) — the package ships the folder with its `Deny from all` `.htaccess`.
4. PHP version **8.2–8.5** in DirectAdmin → PHP Settings (unchanged from before).
5. Check: `https://apsw.pl/` (theme follows the OS, toggle works), `/showcase/`, `/gridwright-examples.html`, `/api/people?page=1`, `/agent.json`, `/sitemap.xml`; send one inquiry from `#contact` and confirm it arrives. CSS/JS links carry `?v=<date>` so the one-week browser cache from `.htaccess` does not serve stale styles — bump the value in both HTML files when you change CSS/JS.

### Staging: fresh VPS (Ubuntu/Debian) with Docker + Caddy

Files involved: `Dockerfile` (PHP 8.2 + Apache + msmtp), `docker/entrypoint.sh` (writes the msmtp config from env), `docker-compose.staging.yml` (Caddy + site), `deploy/Caddyfile`, `.env.example`, `deploy/deploy.sh`, `.github/workflows/deploy-staging.yml`.

**1. DNS** — add an `A` record (and `AAAA` if the VPS has IPv6) for `staging.apsw.pl` → VPS IP. Caddy cannot obtain a certificate until this resolves.

**2. One-time server setup** (as root, once):
```bash
apt-get update && apt-get -y upgrade
apt-get -y install ca-certificates curl git ufw
curl -fsSL https://get.docker.com | sh              # Docker Engine + compose plugin

ufw allow OpenSSH && ufw allow 80/tcp && ufw allow 443/tcp && ufw allow 443/udp
ufw --force enable

adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy
mkdir -p /opt/apsw-site && chown deploy:deploy /opt/apsw-site
# put the deploy user's public key (and yours) in /home/deploy/.ssh/authorized_keys
```
Then, as `deploy`:
```bash
git clone https://github.com/yaotzin1/apsw-site.git /opt/apsw-site
cd /opt/apsw-site
cp .env.example .env && nano .env                    # SITE_HOST, ACME_EMAIL, SMTP_*
./deploy/deploy.sh main                              # first build + start
```
`deploy.sh` fetches the branch, rebuilds the image, restarts the stack, waits for the container health check and prunes old images. Re-run it with a branch name to put any branch on staging: `./deploy/deploy.sh fix/site-hardening`.

**3. Check** — `https://staging.apsw.pl/` (certificate issued by Let's Encrypt within a minute), `/showcase/`, `/api/people?page=1`, then send a test inquiry from `#contact`. `docker compose -f docker-compose.staging.yml logs -f apsw-site` shows PHP errors and the msmtp transcript; `docker compose -f docker-compose.staging.yml logs caddy` shows certificate issuance.

**4. Automatic deploys** — `.github/workflows/deploy-staging.yml` SSHes to the VPS and runs `deploy.sh` on every push to `main` (or by hand for any branch from the Actions tab). Add three repository secrets: `STAGING_HOST`, `STAGING_USER` (`deploy`), `STAGING_SSH_KEY` (the deploy user's private key; generate a dedicated one with `ssh-keygen -t ed25519 -C github-actions`).

**How the pieces fit**
- Caddy terminates TLS and proxies to Apache on the internal network with `X-Forwarded-Proto: https`; `.htaccess` only forces HTTPS when that header is absent, so there is no redirect loop.
- Caddy has a fixed address (`172.28.0.10`) and `APSW_TRUSTED_PROXIES` is set to it, so the contact form rate limiter sees real visitor IPs instead of the proxy.
- `mail()` goes through `msmtp -t` to the SMTP relay in `.env` (a Cyber_Folks mailbox works). With `SMTP_HOST` empty the site runs but the form only logs; the entrypoint says so at start.
- `.logs/` is a named volume (`apsw_logs`), so inquiries survive rebuilds. Read them with `docker exec apsw-site cat .logs/inquiries_secure.log`.
- Rate-limit scratch files live in the container's `/tmp` and are lost on restart, which is fine.

---

## 🔒 Security & Privacy

- Dual-honeypot trap fields (`website_hp` and `company_url_hp`) to catch automated spambots silently.
- 2-second timestamp threshold to block sub-second automated headless form submissions.
- Per-IP rate limiting (4 submissions / 10 minutes). Proxy headers (`X-Forwarded-For`, `CF-Connecting-IP`) are only trusted for peers listed in the `APSW_TRUSTED_PROXIES` environment variable — otherwise they are attacker-controlled and the limit is trivially bypassed.
- All user input that reaches a mail header is stripped of control characters, closing the CRLF header-injection path that would otherwise turn the form into an open relay.
- Strict input sanitization in `contact.php`.

> **Note:** there is no CSRF token. This is a deliberate choice, not an omission: the form carries no authenticated state, so a forged submission gains an attacker nothing the honeypot, time-trap and rate limiter do not already cover. Earlier revisions of this README claimed CSRF protection that was never implemented.
- Full compliance with EU GDPR data privacy regulations.

---

## 👤 Author & Contact

**Piotr Solarz-Wnęk**  
*Principal Solution Architect & AI-Native Engineer*  
- **Email**: [piotr.solarz-wnek@apsw.pl](mailto:piotr.solarz-wnek@apsw.pl)  
- **Phone**: +48 666 522 923  
- **LinkedIn**: [linkedin.com/in/piotrsolarzwnek](https://www.linkedin.com/in/piotrsolarzwnek/)  
- **Website**: [https://apsw.pl](https://apsw.pl)
