# APSW — AI-Native Solution Architecture & Enterprise Engineering

> **Official Website & Digital Presence of Piotr Solarz-Wnęk (APSW)**  
> High-performance, responsive SaaS landing page featuring Spec-Kit methodology, fully agentic multi-agent development showcases, enterprise architecture track record, structured fixed-scope engagement models, mutual NDA compliance, and machine-readable AI agent discovery endpoints (`agent.json`, `llms.txt`).

---

## 🌟 Key Architecture & Highlights

1. **Design System & Aesthetics**:
   - **Anti-AI-Slop Visual Doctrine**: No generic templates. Built with a bespoke design token system (Dark slate navy `#0c2333`, vibrant cyan/teal `#00a8cc`, pure white, glowing cyan accents `#00e5ff`).
   - **Dual-Theme Support**: Instant Light/Dark mode switching with `[data-theme="dark"]` CSS variables and local storage persistence.
   - **Dynamic Dual-Theme Vector Logos**: Responsive SVGs (`apsw-logo-color.svg` and `apsw-logo-white.svg`) with vector scaling and crisp typography.

2. **Core Sections**:
   - **Hero & Trust Metrics**: High-impact enterprise positioning (*"Move Beyond Fragile AI Prototypes. Build Reliable, Production-Ready Systems."*), verifiable trust metrics (19+ yrs, 500k+ LOC, €100M+ enterprise impact, 0% AI hallucination leakage).
   - **Spec-Kit Pipeline & Interactive Code Switcher**: Interactive 4-stage pipeline (Domain Model, Invariant Schema, Prompt Injection, CI Test Gate) with real-time JSON Schema, Proto, and Test assertions.
   - **Fully Agentic Development Showcase**: Multi-agent swarms (Planner, Worker, Verifier) with self-healing feedback loops and 100% autonomous code synthesis demonstrations.
   - **Enterprise Services Grid**: 4 deep-dive capability cards (Fully Agentic Dev, Spec-Kit AI, Enterprise Architecture, High-Load Telemetry/GIS).
   - **Structured Engagement Models**: 3 fixed-scope transparent engagement cards (10-Day Strategic Architecture Audit, Production Delivery Sprint, Fractional Principal Architect Retainer).
   - **Enterprise Case Studies (NDA Compliant)**: Tier-1 Commercial & Investment Banking, Autonomous AI B2B SaaS (100% AI-developed), Industrial IoT Asset Management, Big-Four M&A Analytics, and Biotech Clinical Instrumentation.
   - **Gridwright (Open-Source Product, `#gridwright`)**: showcase of the latest `apsw-gridwright` release (0.22.1) — the MIT React data grid on a headless engine — with install command, key capabilities, playground screenshot (light/dark), sourced facts and the planned Pro tier.
   - **Delivery Assurance (`#assurance`)**: the `workflow.ai.yml`-driven agent standard Gridwright is built with, offered to B2B teams. The Gridwright README and playground link here as `apsw.pl/#assurance`, so the anchor must stay.
   - **Principal Architect Profile & Credentials**: Piotr Solarz-Wnęk (19+ yrs, MSc, Azure AZ-900, DNA Architect, ITIL, EU GDPR compliant).
   - **Contact Flow & Anti-Spam Bot Defense**: 3-step SLA (24h review, 15m qualification call, C4 proposal), 1-click Mutual NDA request (`oneNDA` standard), dual hidden honeypots, 2-second time-trap defense, and IP rate limiting.

3. **Machine-Readable AI Discovery Endpoints**:
   - `/agent.json`: Agent / AI procurement discovery manifest.
   - `/llms.txt` & `/llms-full.txt`: Curated semantic context for LLMs, Claude, ChatGPT, and automated research bots.
   - `/robots.txt`: Search crawler directives explicitly welcoming GPTBot, ClaudeBot, PerplexityBot, and Google-Extended.
   - `/sitemap.xml`: Complete XML search index.

---

## 🛠 Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Properties & Design System), Vanilla Modern ES6+ JavaScript.
- **Backend (Contact API)**: PHP 8.2+ (`contact.php`) with JSON response protocol, dual-honeypot bot defense, time trap, rate limiting, and audit logging.
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
*Principal Solution Architect & AI-Native Engineer*  
- **Email**: [piotr.solarz-wnek@apsw.pl](mailto:piotr.solarz-wnek@apsw.pl)  
- **Phone**: +48 666 522 923  
- **LinkedIn**: [linkedin.com/in/piotrsolarzwnek](https://www.linkedin.com/in/piotrsolarzwnek/)  
- **Website**: [https://apsw.pl](https://apsw.pl)
