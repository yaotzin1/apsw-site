# APSW Labs — AI-Native Architecture & Turnkey Engineering Studio

> **Website of APSW Labs, led by Piotr Solarz-Wnęk.**  
> One static bilingual (EN/PL) landing page with an interactive hero workbench, the Indaba and Gridwright open-source projects, the delivery model, engagement tracks, a scoping form, and machine-readable discovery endpoints (`agent.json`, `llms.txt`).

---

## Key Architecture & Highlights

1. **Positioning**: APSW Labs is an AI-native architecture and turnkey engineering studio on a
   "Principal-led, elastic capacity" model. The page is not a CV: no employer history, no hourly
   retainers. Methodology is named after **Indaba** and `workflow.ai.yml` only.

2. **Design system**: one cold, dark, industrial palette defined as tokens in
   `css/design-system.css` (no warm neutrals, no light theme), Plus Jakarta Sans with JetBrains
   Mono, and exposed 1px hairlines.

3. **Sections** (anchors in brackets):
   - **Hero workbench (`#workbench`)**: three scenarios. The left pane replays a simulated Indaba
     run (spec, council debate, a gate that fails once and passes on an isolated retry, verified
     artifact) with a telemetry bar. The right pane is the working artifact: a miniature data grid
     (search, sort with `aria-sort`, paging, array / remote switch with the "of many" footer), a
     council transcript with exit-code guards and span data, and a multi-tenant triage belt with a
     token-credit ledger. All of it is sample data and labelled as such.
   - **Open source (`#open-source`, `#indaba`, `#gridwright`)**: the two MIT projects with copyable
     commands and links.
   - **The standard (`#assurance`)**: one rules file generating and enforcing the agent documents,
     with a drift demo. The Gridwright README links here as `apsw.pl/#assurance`, so the anchor
     must stay.
   - **Delivery model (`#delivery`)**: Principal wedge, core synthesis, partner scale-out.
   - **Engagement tracks (`#tracks`)**: three lab sprints and one scaled partner track.
   - **Scope & Route (`#contact`)**: the configurator form. The execution mode switches to the
     partner route for track 04 or the dedicated-squad scale. It posts to `contact.php`.

4. **Machine-readable discovery**: `/agent.json`, `/llms.txt`, `/llms-full.txt`, `/robots.txt`,
   `/sitemap.xml`. They describe the same offer as the page and change with it.

---

## 🛠 Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Properties & Design System), Vanilla Modern ES6+ JavaScript.
- **Backend (Contact API)**: PHP 8.2+ (`contact.php`) with JSON response protocol, dual-honeypot bot defense, time trap, rate limiting, and audit logging.
- **Fonts**: Plus Jakarta Sans & JetBrains Mono (Google Fonts stylesheet; no third-party scripts).
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

## 🧭 Development & Agent Setup

No build step and nothing to install: the files in the repository are the files served. Node 22+ runs the checks.

```bash
npm run hooks:install   # once per clone: enables the pre-commit and commit-msg hooks in .githooks/
npm run verify          # every gate: agent docs, i18n keys in EN+PL, anchors, agent.json/JSON-LD/sitemap, php -l contact.php
npm run sync            # after editing workflow.ai.yml or .agents/skills: regenerates AGENTS.md, GEMINI.md, .claude/skills
```

The agent setup mirrors [apsw-gridwright](https://github.com/yaotzin1/apsw-gridwright): `workflow.ai.yml` is the single source of rules and outranks every other agent document; `AGENTS.md`, `GEMINI.md` and `.claude/skills/` are generated from it, and `CLAUDE.md` imports `AGENTS.md`. Every commit needs a `Track: content|fix|chore` trailer. CI (`.github/workflows/ci.yml`) runs the same gates on every pull request.

---

## 🌐 Production Deployment

### Option A: Cyber_Folks / cPanel (Shared Hosting)
1. Upload the site files to `public_html/` (the repository tooling — `scripts/`, `.agents/`, `.claude/`, `.githooks/`, `.github/`, `workflow.ai.yml`, `package.json` — is not needed on the server).
2. Ensure `.logs/` directory has write permissions (`chmod 770 .logs`).
3. Configure PHP version to **PHP 8.2, 8.3, 8.4 or 8.5** in cPanel / Cyber_Folks.
4. Test contact form submission at `https://apsw.pl/#contact`.

### Option B: Hetzner Cloud / Docker PaaS (Coolify / Portainer)
1. Build and run using the included `Dockerfile` and `docker-compose.yml`:
   ```bash
   docker build -t apsw-site:latest .
   docker run -d --name apsw-site -p 80:80 --restart unless-stopped apsw-site:latest
   ```
2. Configure reverse proxy (Nginx / Caddy / Traefik) with SSL certificate via Let's Encrypt.

---

## 🔒 Security & Privacy

- Dual-honeypot trap fields (`website_hp` and `company_url_hp`) to catch automated spambots silently.
- 2-second timestamp threshold to block sub-second automated headless form submissions.
- Rate limiting per client IP address. (There is no CSRF token yet; do not describe one in copy.)
- Strict input sanitization and email header injection protection in `contact.php`.
- Full compliance with EU GDPR data privacy regulations.

---

## 👤 Author & Contact

**Piotr Solarz-Wnęk**  
*Principal Software Architect, APSW Labs*  
- **Email**: [piotr.solarz-wnek@apsw.pl](mailto:piotr.solarz-wnek@apsw.pl)  
- **Phone**: +48 666 522 923  
- **LinkedIn**: [linkedin.com/in/piotrsolarzwnek](https://www.linkedin.com/in/piotrsolarzwnek/)  
- **Website**: [https://apsw.pl](https://apsw.pl)
