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
   - **Principal Architect Profile & Credentials**: Piotr Solarz-Wnęk (19+ yrs, MSc, Azure AZ-900, DNA Architect, ITIL, EU GDPR compliant).
   - **Contact Flow & Anti-Spam Bot Defense**: 3-step SLA (24h review, 15m qualification call, C4 proposal), 1-click Mutual NDA request (`oneNDA` standard), dual hidden honeypots, 2-second time-trap defense, CSRF token validation, and IP rate limiting.

3. **Machine-Readable AI Discovery Endpoints**:
   - `/agent.json`: Agent / AI procurement discovery manifest.
   - `/llms.txt` & `/llms-full.txt`: Curated semantic context for LLMs, Claude, ChatGPT, and automated research bots.
   - `/robots.txt`: Search crawler directives explicitly welcoming GPTBot, ClaudeBot, PerplexityBot, and Google-Extended.
   - `/sitemap.xml`: Complete XML search index.

---

## 🛠 Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Properties & Design System), Vanilla Modern ES6+ JavaScript.
- **Backend (Contact API)**: PHP 8.2+ (`contact.php`) with JSON response protocol, dual-honeypot bot defense, CSRF protection, and audit logging.
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

## 🌐 Production Deployment

### Option A: Cyber_Folks / cPanel (Shared Hosting)
1. Upload all workspace files directly to `public_html/`.
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
- Session-backed CSRF tokens with rate limiting per client IP address.
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
