/**
 * APSW Brand Website - Internationalisation (i18n) Engine
 * Full Polish (PL) & English (EN) language switcher with persistence and live DOM updates
 */

const APSW_TRANSLATIONS = {
  en: {
    meta: {
      page_title: "APSW | AI-Native Solution Developer & Enterprise Solution Architect",
      page_description: "Piotr Solarz-Wnęk (19+ years enterprise experience). Fully Agentic Application Development, Spec-Kit Methodology, Java 21, Symfony, Cloud Architecture & Industrial IoT. Zero AI Slop."
    },
    nav: {
      brand_sub: "AI NATIVE ARCHITECTURE",
      skip_link: "Skip to content",
      assurance: "Assurance",
      speckit: "Spec-Kit AI",
      agentic: "Agentic Dev",
      services: "Services",
      engagement: "Engagements",
      track_record: "Case Studies",
      showcase: "Showcase",
      gridwright: "Gridwright Playbook",
      about: "About",
      contact: "Contact",
      book_review: "Book a review",
      theme_toggle_title: "Toggle theme",
      lang_toggle_aria: "Switch language"
    },
    hero: {
      status_badge: "● Available for Strategic AI & Enterprise Architecture Engagements",
      title_html: `AI writes the prototype in five minutes.<br>We build what survives the audit.`,
      description_html: `AI-generated code is cheap. AI-generated risk is not: accessibility failures, supply-chain exposure, silent data errors and UIs that freeze at scale. With 19+ years of architecture across Tier-1 banking and industrial IoT, APSW builds and rescues systems to a <strong>verifiable standard</strong>, and proves it in public with an open-source grid that has zero runtime dependencies.`,
      cta_speckit: "See the proof",
      cta_engagement: "Book an architecture review",
      metric_years_val: "19+ years",
      metric_years_lbl: "Enterprise architecture, from Tier-1 banking to industrial IoT",
      metric_velocity_val: "30+ engineers",
      metric_velocity_lbl: "Engineering unit built and led across Java, PHP and mobile",
      metric_regulated_val: "Regulated sectors",
      metric_regulated_lbl: "Institutional finance, biotech instrumentation, heavy industry",
      metric_anti_slop_val: "Spec-gated",
      metric_anti_slop_lbl: "Every merge checked against an executable contract in CI"
    },
    assurance: {
      code_title: "The real code, not a mock-up",
      code_intro: "Both snippets are copied unchanged from the apsw-gridwright documentation. Swapping an array for a server, or holding ten million rows, is a change to one prop, not a rewrite.",
      code_a_cap: "Ten million rows: a source that holds a window, and virtual rows",
      code_b_cap: "Array today, paginating API tomorrow, same columns and add-ons",
      code_link: "Read the full tour on GitHub",
      scale_title: "What it takes to build this, and what it normally costs",
      scale_dev_lbl: "Developers",
      scale_dev_val: "1",
      scale_loc_lbl: "Source / tests / docs (lines)",
      scale_loc_val: "19k / 18k / 9k",
      scale_days_lbl: "First commit to v0.17",
      scale_days_val: "24 active days (34 calendar)",
      scale_est_lbl: "Same scope by hand (estimate)",
      scale_est_val: "1.5–3 person-years",
      scale_note: "One developer working with AI agents under the Spec-Kit and Indaba process. Line counts and dates come from the public git history (first commit 10 September 2026, which already held about 16,600 lines, so the real working time is a little longer than shown). Active days are days with at least one commit, 24 of the 34 calendar days up to the v0.17.0 release on 13 October 2026. The by-hand figure is our estimate, not a measurement: roughly 37,000 lines of code and tests at 50 to 100 finished, tested lines per senior-developer day, before documentation.",
      scale_enterprise: "The feature set is the kind that is normally sold in commercial tiers, for example AG Grid Enterprise or MUI X Pro and Premium: row grouping with aggregation, Excel export, column pinning, tree data, windowing to ten million rows. Here it is MIT-licensed. What it deliberately does not have is a pivot engine or spreadsheet-style range selection; if you need those, pick a different tool or contact us and we will price adding them.",
      tag: "High-Assurance Engineering",
      title: "AI writes the happy path in five minutes. We engineer the edges.",
      subtitle: "A generated data table works on 100 rows on the developer's laptop. What fails an audit, a regulator or a Monday-morning release is everything around it. These are the cases we build for, and they are in a public open-source package you can read.",
      p1_tag: "EU ACCESSIBILITY ACT",
      p1_title: "Your tables fail accessibility audits",
      p1_desc: "Since June 2025 banks, telecoms, e-commerce and transport in the EU owe WCAG-level accessibility. Generated UI loses focus on disabled pagination, ignores forced colours and misses touch targets.",
      p1_proof: "Proof: focus stays inside the grid, axe-core runs over 24 grid states with zero violations, opt-in WCAG 2.2 AA sizing and colours.",
      p1_btn: "Book an accessibility review",
      p2_tag: "SUPPLY CHAIN & DORA",
      p2_title: "AI-assisted code pulls in dozens of packages",
      p2_desc: "In finance, medtech and defence every extra dependency is a supply-chain risk, and a copied cell is a formula-injection vector. Assistants add both without asking.",
      p2_proof: "Proof: zero runtime dependencies, no install scripts, a commit gate that rejects HTML and script sinks, guarded CSV and clipboard output.",
      p2_btn: "Request a dependency & security audit",
      p3_tag: "AFTER VIBE CODING",
      p3_title: "The prototype froze at 50,000 rows",
      p3_desc: "Teams that shipped fast with agents now hit a wall: 100 columns, tens of thousands of rows, a UI that stutters on every scroll, and PRs of 3,000 lines nobody reads.",
      p3_proof: "Proof: windowed rows and columns, honest totals, 2–3 ms of script per scrolled frame at 500 columns, all held by tests an agent cannot quietly break.",
      p3_btn: "Start a rescue sprint",
      litmus_title: "The litmus test: a quick prompt versus an engineered grid",
      litmus_caption: "Comparison of a quickly generated data table with the APSW engineered approach",
      col_topic: "Where it breaks",
      col_quick: "Generated in five minutes",
      col_apsw: "Engineered by APSW",
      r1_topic: "Scroll performance",
      r1_quick: "Fine on 100 rows. At 500 columns it costs around 60 ms of script per frame.",
      r1_apsw: "About 2–3 ms per frame at 500 columns, and a windowed source that holds a few thousand rows whatever the total.",
      r2_topic: "Export of \"all rows\"",
      r2_quick: "With server paging it silently saves page one as the full report.",
      r2_apsw: "The option is disabled until the server can answer it, and the totals read \"1–25 of many\" instead of an invented number.",
      r3_topic: "Copy to Excel",
      r3_quick: "Guards the plain-text channel and forgets the HTML one, so a cell such as <code>=cmd|…</code> still runs.",
      r3_apsw: "Both clipboard formats are escaped, and the grid never reads the clipboard or copies without a user action.",
      r4_topic: "Accessibility",
      r4_quick: "ARIA labels added for show; keyboard focus drops to the page body when a button disables.",
      r4_apsw: "Focus moves to the neighbouring control, one live region announces state, axe-core runs on 24 states.",
      r5_topic: "Dependencies",
      r5_quick: "Dozens of transitive packages to audit and patch.",
      r5_apsw: "Zero runtime dependencies and no install scripts.",
      note_html: `Everything in the right-hand column is in <a href="https://github.com/yaotzin1/apsw-gridwright" target="_blank" rel="noopener noreferrer">apsw-gridwright</a> and <a href="https://github.com/yaotzin1/apsw-mui-excel-filter" target="_blank" rel="noopener noreferrer">apsw-mui-excel-filter</a> (MIT) and runs live in the showcase: <a href="showcase/#virtual">10M windowed rows</a>, <a href="showcase/#excel">Excel AutoFilter</a>, <a href="showcase/#a11y">WCAG &amp; ARIA keyboard nav</a>, and <a href="showcase/#mui-dashboard">MUI operational dashboard</a> (plus the <a href="https://yaotzin1.github.io/apsw-gridwright/examples/playground/index.html" target="_blank" rel="noopener noreferrer">playground</a>). The accessibility results are test results, not a legal conformance statement; the package's own report says which criteria are still unevaluated. The same discipline, applied to your system, is what we sell.`,
      offer_title: "Fixed price, fixed scope, delivered with evidence",
      offer_desc: "Rebuild or migrate a legacy panel, harden a codebase that agents wrote, or move your design system to an agent-ready standard. Scoped in one 30-minute call with the Principal Architect under mutual oneNDA, with a written fixed-fee proposal within 24 hours. You get the code, the tests that guard it and the playbook your own agents follow.",
      offer_cta: "Discuss your case",
      offer_models: "See engagement models"
    },
    speckit: {
      tag: "Methodology",
      title_html: `The Spec-Kit Approach: <br>Specification-Driven AI Engineering`,
      subtitle_html: `Most generative AI initiatives fail in production because unstructured prompting produces "AI slop" — non-deterministic code with hidden state bugs and hallucinations. <strong>Spec-Kit replaces prompt-and-pray with formal executable contracts and CI verification gates.</strong>`,
      stage1_badge: "STAGE 01",
      stage1_title: "Formal Domain Specification",
      stage1_desc: "Drafting machine-readable schemas, strict invariant boundaries, and edge-case contracts before writing code.",
      stage1_guarantee: "Produces: a signed-off, machine-readable domain contract",
      stage2_badge: "STAGE 02",
      stage2_title: "Architectural Guardrails",
      stage2_desc: "Injecting C4 boundaries, security compliance (GDPR/PCI-DSS), database isolation levels, and non-blocking asynchronous patterns.",
      stage2_guarantee: "Produces: C4 boundaries and security policy the agents must obey",
      stage3_badge: "STAGE 03",
      stage3_title: "Autonomous Code Synthesis",
      stage3_desc: "Multi-agent swarms (Planner-Executor-Critic) generate clean, context-isolated code and 100% test suites against the spec.",
      stage3_guarantee: "Produces: implementation plus the test suite that proves it",
      stage4_badge: "STAGE 04",
      stage4_title: "Deterministic CI Quality Gate",
      stage4_desc: "Continuous automated contract testing, static analysis, performance benchmarks, and strict zero-hallucination gates.",
      stage4_guarantee: "Produces: contract, static-analysis and benchmark results per merge",
      comp_caption: "Standard AI prompting compared with the APSW Spec-Kit methodology, across four engineering dimensions.",
      comp_slop_header_short: "Prompting",
      comp_speckit_header_short: "Spec-Kit",
      comp_dim: "Engineering Dimension",
      comp_slop_header: 'Standard AI Chat / Prompting ("AI Slop")',
      comp_speckit_header: "APSW Spec-Kit Methodology",
      comp_dim_1: "Output Determinism",
      comp_slop_1: "✕ Non-deterministic, probabilistic drifts",
      comp_speckit_1: "✓ 100% Deterministic against schema contracts",
      comp_dim_2: "Architectural Control",
      comp_slop_2: "✕ Uncontrolled spaghetti code & hallucinations",
      comp_speckit_2: "✓ Strict C4 boundary enforcement & clean domain logic",
      comp_dim_3: "Enterprise Verification",
      comp_slop_3: '✕ "Looks good to me" manual inspection',
      comp_speckit_3: '✓ Automated contract tests & CI gating ("Cheap to Verify")',
      comp_dim_4: "Regulated Compliance",
      comp_slop_4: "✕ High risk of security & data leakage",
      comp_speckit_4: "✓ Zero-leakage sandboxes & GDPR / PCI-DSS compliance"
    },
    agentic: {
      proof_title: "The engine behind it is open source: Indaba",
      proof_desc: "The workflow and trace readout above match the public @indaba/engine architecture: a declarative workflow.ai.yml file defines the steps as a DAG, the deterministic engine rather than a model decides what runs next, implementation runs in an ephemeral git worktree, roles built on different models cross-examine each other instead of grading their own work, and every step is traced with OpenTelemetry GenAI cost and token data into .indaba/traces/. It is an alpha preview (0.1.0-alpha.0), MIT licensed.",
      proof_github: "Indaba on GitHub",
      proof_npm: "@indaba/engine on npm",
      tag: "Autonomous Engineering",
      title: "Fully Agentic Application Development",
      subtitle: "Moving past copilot auto-complete into end-to-end autonomous multi-agent development pipelines that architect, code, test, and self-heal production systems under expert architectural direction.",
      feat1_title: "Hierarchical Multi-Agent Swarms",
      feat1_desc: "Coordinating specialised Planner, Architect, Worker, and Critic subagents. Complex tasks are broken down into isolated, parallel execution threads with strict context boundaries.",
      feat2_title: "Self-Healing Execution & Test Loops",
      feat2_desc: "Agents don't just write code; they run test suites, inspect compile errors, diagnose regressions, and automatically self-correct until all contract requirements pass 100%.",
      feat3_title: "Deterministic Tool-Use & Sandbox Security",
      feat3_desc: "Autonomous agents operate in isolated secure sandboxes with declarative tool interfaces (AST parsing, Git branching, database migration verification, and CI triggers).",
      swarm_badge: "DAG ENGINE · OTel TRACED",
      swarm_log1_html: `<span class="indaba-key">steps:</span> <span class="indaba-str">[specify → plan → implement(worktree) → verify(adversarial)]</span>`,
      swarm_log2_html: `<span class="indaba-key">[step:specify]</span> <span class="indaba-muted">role=architect (claude-opus)</span> → <span class="indaba-str">specs/virtual-scroll/spec.md</span>`,
      swarm_log3_html: `<span class="indaba-key">[step:implement]</span> <span class="indaba-muted">worktree=.indaba/wt/feat-virtual · role=implementer</span>`,
      swarm_log4_html: `<span class="indaba-pass">[gate:test]</span> <span class="indaba-muted">vitest + axe-core (24 states)</span> → <span class="indaba-pass">PASS (0 violations)</span>`,
      swarm_log5_html: `<span class="indaba-warn">[step:verify]</span> <span class="indaba-muted">role=critic (cross-model adversarial review)</span> → <span class="indaba-pass">APPROVED</span>`,
      swarm_log6_html: `<span class="indaba-key">[otel:trace]</span> <span class="indaba-muted">.indaba/traces/run-042.json · gen_ai.usage.cost=$1.84</span>`,
      swarm_log7_html: `✓ WORKTREE_MERGED: Contract verified, trace archived, ready for release.`
    },
    services: {
      tag: "Capabilities",
      title: "End-to-End Architectural Solutions",
      subtitle: "From strategic technical blueprints to autonomous agent swarms and high-load telemetry backends.",
      s1_title: "Fully Agentic Application Development",
      s1_desc: "Complete end-to-end software development executed by coordinated multi-agent swarms with autonomous self-healing test loops.",
      s1_d1: "Autonomous Feature Synthesis Swarms",
      s1_d2: "Self-Debugging & Automated CI Repair",
      s1_d3: "Deterministic Tool & API Contracts",
      s2_title: "Spec-Kit AI & Agentic Workflows",
      s2_desc: "Architecting deterministic AI pipelines, custom graph workflows (ComfyUI / LangGraph), tool-calling agents, and enterprise RAG.",
      s2_d1: "Formal Spec-Kit Domain Modelling",
      s2_d2: "Deterministic RAG with Source Citations",
      s2_d3: "Computer Vision (Ultralytics) Integration",
      s3_title: "Enterprise Software Architecture",
      s3_desc: "Designing resilient, high-throughput microservices, CQRS data patterns, and cloud infrastructures for regulated financial & industrial sectors.",
      s3_d1: "Java 21 / Spring Boot & Symfony 8 Core",
      s3_d2: "Azure Infrastructure as Code (Bicep/YAML)",
      s3_d3: "C4 System Blueprints & Decoupling",
      s4_title: "High-Load Telemetry & Spatial Systems",
      s4_desc: "Constructing recursive multi-tenant asset management engines and geospatial data integrations (ESRI, Smallworld GIS).",
      s4_d1: "Industrial Machinery Telemetry Engines",
      s4_d2: "Databricks & Azure Data Factory ETL",
      s4_d3: "Geospatial GIS (Smallworld, ESRI, PostGIS)",
      s5_title: "Spec-Kit AI Team Enablement",
      s5_desc: "Transforming engineering organisations from chaotic AI chat usage into disciplined, deterministic Spec-Driven AI workflows.",
      s5_d1: "Spec-Kit SDLC Guidelines & Tooling",
      s5_d2: "AI Velocity & Code Consistency Audits",
      s5_d3: "Hands-On Senior Engineering Workshops",
      s6_title: "Strategic Architecture Audit & Blueprint",
      s6_desc: "A deep-dive technical health check of your codebases, microservice boundaries, security policies, and AI readiness.",
      s6_d1: "10-Day Comprehensive Architecture Audit",
      s6_d2: "C4 Container & Component Schemas",
      s6_d3: "Executive Modernisation Roadmap"
    },
    engagement: {
      tag: "Engagement Models",
      title: "Clear, Predictable Engagement Models",
      subtitle: "Whether you need a rapid diagnostic audit, end-to-end autonomous AI delivery, or continuous architectural leadership.",
      m1_badge: "DIAGNOSTIC & AUDIT",
      m1_title: "10-Day Strategic Architecture Audit",
      m1_desc: "Deep-dive technical inspection of your legacy codebases, microservice boundaries, security policies, and AI integration readiness.",
      m1_timeline_lbl: "Timeline",
      m1_timeline_val: "10 Working Days (Fixed Scope)",
      m1_d1: "Comprehensive Codebase & Technical Debt Audit",
      m1_d2: "C4 System Architecture & Component Blueprints",
      m1_d3: "Security, GDPR & Database Isolation Review",
      m1_d4: "Executive Modernisation & AI Roadmap",
      m1_btn: "Request Architecture Audit",
      m2_badge: "MOST POPULAR • CORE DELIVERY",
      m2_title: "Fully Agentic MVP & Core Delivery Sprint",
      m2_desc: "End-to-end production software delivery executed autonomously by multi-agent swarms under formal Spec-Kit contracts and self-healing test loops.",
      m2_timeline_lbl: "Timeline",
      m2_timeline_val: "4 – 8 Weeks Sprint",
      m2_d1: "Formal Spec-Kit Domain Contract & Invariant Modelling",
      m2_d2: "Autonomous Multi-Agent Synthesis (Zero AI Slop)",
      m2_d3: "100% Automated Contract Test Suites & CI Gates",
      m2_d4: "Production Codebase & Docker / Cloud Deployment",
      m2_btn: "Discuss Delivery Sprint",
      m3_badge: "LEADERSHIP & RETAINER",
      m3_title: "Fractional Principal Architect & Advisory",
      m3_desc: "Continuous senior architectural leadership, technical governance, C4 system steering, and Spec-Kit team enablement for growing engineering units.",
      m3_timeline_lbl: "Timeline",
      m3_timeline_val: "Monthly Dedicated Retainer",
      m3_d1: "Weekly Architecture Governance & Code Reviews",
      m3_d2: "Spec-Kit Engineering SDLC Tooling & Team Mentorship",
      m3_d3: "Tier-1 Cloud & High-Load Architecture Steering",
      m3_d4: "Direct Async Access & Dedicated Standups",
      m3_btn: "Inquire About Retainer"
    },
    track_record: {
      tag: "Track Record (NDA Compliant)",
      title: "Verifiable Enterprise Experience",
      subtitle: "19+ years delivering mission-critical platforms across institutional finance, biomedical instruments, and heavy industry IoT.",
      c1_client: "Tier-1 European Bank",
      c1_domain: "Institutional Finance",
      c1_title: "Cloud-Native Financial Transaction Management Platform",
      c1_desc: "Architected enterprise cloud-native transaction management utilities for a leading European financial institution. Drove infrastructural stabilisation, continuous deployment engineering, and service decoupling in strictly regulated banking.",
      c1_m1_val: "-40% Cycle Time",
      c1_m1_lbl: "Release Velocity Acceleration",
      c1_m2_val: "Zero Disruption",
      c1_m2_lbl: "100% Declarative IaC for Settlements",
      c2_client: "Heavy Industry / Oil & Drilling",
      c2_domain: "Industrial IoT & Asset ERP",
      c2_title: "Preventative Maintenance & Telemetry Asset Engine",
      c2_desc: "Principal architect and developer for a multi-tenant telemetry and preventative maintenance platform deployed across distributed drilling rigs and heavy machinery. Engineered recursive tree models mapping operational days, metric drilled meters, engine hours, and automatic threshold overrides.",
      c2_m1_val: "99.99% Reliability",
      c2_m1_lbl: "Asset Telemetry & Anomaly Tracking",
      c2_m2_val: "Zero Downtime",
      c2_m2_lbl: "Preventative Incident Automation",
      c3_client: "Autonomous AI B2B SaaS",
      c3_domain: "100% Agentic Development",
      c3_title: "AI Reputation Engine & Multi-Tenant Agentic Triage",
      c3_desc_html: `Architected an enterprise multi-tenant B2B reputation engine featuring a 45-second conveyor-belt triage UX, swappable multi-LLM engine, token-credit ledger tracking, and tenant isolation shields. <strong>100% Autonomous Multi-Agent Synthesis: The entire production codebase, migrations, and test suites were synthesised autonomously by AI agents under formal architectural direction and deterministic CI contract gates — zero human manual coding.</strong>`,
      c3_m1_val: "3 Mos → 2 Wks",
      c3_m1_lbl: "Time-to-Market Acceleration",
      c3_m2_val: "100% AI Synthesised",
      c3_m2_lbl: "0 Manual Developers / 100% CI Contract Gates",
      c4_client: "Big-Four Consulting Firm",
      c4_domain: "M&A Analytics Platform",
      c4_title: "Corporate Deal Analytics & Interactive Visualizers",
      c4_desc: "Engineered frontend data layers for a global professional services firm's high-availability corporate analytics platform, supporting multi-million dollar M&A deal pipelines with interactive data-visualisation matrices and zero-downtime hot-fix reliability across international timezones.",
      c4_m1_val: "$100M+ Pipeline",
      c4_m1_lbl: "Deal Transaction Data Engines",
      c4_m2_val: "Zero Downtime",
      c4_m2_lbl: "Real-Time Global Hot-Fix Reliability",
      c5_client: "Global Biotech Leader",
      c5_domain: "Biotech Instrumentation",
      c5_title: "Medical Analysis Probe Classification Machine",
      c5_desc: "Formulated the architectural redesign and codebase decomposition blueprint for legacy telemetry loops driving automated clinical analysis machinery. Remediated hidden software race states and asynchronous sorting logic errors into isolated operational modules.",
      c5_m1_val: "100% Compliance",
      c5_m1_lbl: "Strict Biomedical Diagnostic Standards",
      c5_m2_val: "Zero Race States",
      c5_m2_lbl: "Decoupled Telemetry Modules",
      c6_client: "Programmatic Marketing SaaS",
      c6_domain: "Recruitment & Ad Engines",
      c6_title: "Modular ATS & Automated Social Advertisement Engine",
      c6_desc: "Supervised frontend architecture to modernise a legacy platform into a high-performance workspace combining automated social advertisement engines with modular Applicant Tracking Systems (ATS).",
      c6_m1_val: "High Velocity",
      c6_m1_lbl: "International Engineering Squad",
      c6_m2_val: "Full-Stack REST",
      c6_m2_lbl: "Ad Engine Interfaces"
    },
    architect: {
      tag: "Principal Architect",
      name: "Piotr Solarz-Wnęk",
      subtitle: "MSc in Industrial Informatics | 19+ Years of Experience",
      bio_p1_html: `Software Architect, AI-Native developer, and former Business Unit Head who expanded global engineering units to 30+ engineers across Banking, Energy, and Industry 4.0. Azure certified (AZ-900), ITIL Foundation, and graduate of <em>Droga Nowoczesnego Architekta</em>.`,
      bio_p2_html: `Pioneering <strong>Spec-Kit</strong> and <strong>Fully Agentic Development</strong> to make AI-assisted engineering deterministic, safe, and free from AI slop.`,
      linkedin_btn: "LinkedIn Profile",
      email_btn: "Direct Email",
      credentials_title: "Certified Credentials & Education",
      leadership_title: "Enterprise Leadership:",
      leadership_desc: "Scaled BU to 30+ Engineers across Mobile, Java & PHP streams",
      direct_contact_btn: "Direct Contact"
    },
    contact: {
      tag: "Let's Connect",
      title: "Schedule an Architecture Review",
      subtitle: "Whether you want to build a Fully Agentic Application, eliminate AI slop via Spec-Kit, or modernise legacy systems — let's engineer the right solution.",
      direct_email_title: "Direct Email",
      response_time: "Average response time: < 4 business hours",
      phone_title: "Direct Phone / WhatsApp",
      timezone: "Europe / Warsaw (UTC+1 / UTC+2)",
      availability_title: "Engagement Availability",
      availability_val: "Strategic Sprints & Retainers",
      availability_desc: "Remote / EU Hybrid architecture engagements",
      sla_title: "What happens next",
      sla_step1_html: `<strong class="form-nda-strong">Stack Review (&lt; 4h):</strong> Piotr personally reviews your requirements under mutual NDA.`,
      sla_step2_html: `<strong class="form-nda-strong">Technical Alignment:</strong> Direct 30-min call with the Principal Architect. Zero sales pitch.`,
      sla_step3_html: `<strong class="form-nda-strong">Actionable Scope (24h):</strong> Concrete 10-Day Audit or Core Delivery Sprint roadmap.`,
      form_name_label: "Your Name / Company *",
      form_name_placeholder: "e.g. Alex Jensen (CTO, Fintech)",
      form_email_label: "Work Email *",
      form_email_placeholder: "alex@company.com",
      form_service_label: "Primary Area of Interest",
      opt_agentic: "Fully Agentic Application Development",
      opt_speckit: "Spec-Kit AI & Agentic Systems",
      opt_enterprise: "Enterprise Architecture & Cloud Modernisation",
      opt_iot: "High-Load Telemetry / Spatial IoT Systems",
      opt_enablement: "Spec-Kit AI Team Enablement & Workshops",
      opt_rescue: "Post-Vibe-Coding Rescue & Performance Sprint",
      opt_a11y: "EAA / WCAG 2.2 Accessibility & Supply-Chain Security Audit",
      opt_audit: "10-Day Comprehensive Architecture Audit",
      form_msg_label: "Project Description / Technical Goals *",
      form_msg_placeholder: "Tell me about your system architecture, challenges, target timeline, or tech stack...",
      nda_text_html: `<strong class="form-nda-strong">Request Mutual NDA:</strong> Execute a bilateral Non-Disclosure Agreement before our technical alignment call.`,
      form_submit_btn: "Send Architecture Inquiry",
      sending_inquiry: "Sending Inquiry...",
      feedback_success: "Thank you! Your message has been sent successfully. Piotr Solarz-Wnęk will review your architecture inquiry shortly.",
      feedback_error: "An error occurred. Please reach out directly to piotr.solarz-wnek@apsw.pl",
      feedback_offline_html: `The form could not reach the server, so this inquiry was not sent. Please email <a href="mailto:piotr.solarz-wnek@apsw.pl">piotr.solarz-wnek@apsw.pl</a> directly.`,
      feedback_fallback_html: `✓ Inquiry recorded. You can also contact directly at <a href="mailto:piotr.solarz-wnek@apsw.pl" class="contact-item-link">piotr.solarz-wnek@apsw.pl</a>`,
      copied_tooltip: "Copied!"
    },
    footer: {
      footer_desc: "APSW — AI-Native Solution Architecture & Enterprise Engineering by Piotr Solarz-Wnęk. Zero AI Slop. Deterministic systems engineered for high-availability production.",
      col1_title: "Methodology & Tech",
      col2_title: "Services",
      col3_title: "Availability & Office",
      rights: "APSW — Piotr Solarz-Wnęk. All rights reserved.",
      showcase_link: "Live component showcase",
      gridwright_link: "Gridwright Data Grid (npm)",
      indaba_link: "Indaba orchestration engine (GitHub)"
    },
    gridwright_showcase: {
      tag: "Public NPM Packages & Open Source",
      badge: "AVAILABLE ON NPM",
      title: "apsw-gridwright & apsw-mui-excel-filter",
      subtitle: "Headless, deterministic table architecture and Excel-style AutoFilter extracted from an industrial ERP and generalized for React 17–19 and MUI 5–7.",
      desc: "The public proof of how APSW engineers and extracts legacy capabilities. Zero runtime dependencies in core, windowing to ten million rows, grouping with aggregates, Excel export, tree data, a security gate on every commit, axe-core checks over 24 states, plus apsw-mui-excel-filter (subtractive two-term 'Add current selection to filter' extracted from a production ERP with 47 tests at 100% coverage). MIT-licensed.",
      install_cmd: "npm i apsw-gridwright",
      pill_npm: "npm: apsw-gridwright",
      pill_virtual: "Windowed rows (10M)",
      pill_rest: "Live REST Wire Protocol",
      pill_editing: "Inline Cell Editing",
      pill_aria: "Strict ARIA & Keyboard Nav",
      pill_ts: "TypeScript Native",
      pill_mui: "MUI views: apsw-gridwright-mui",
      pill_excel: "Excel AutoFilter: apsw-mui-excel-filter",
      btn_showcase: "Live React Showcase",
      btn_live_playground: "Live Playground",
      btn_playground: "Agent Playbook & REST Harness",
      btn_npm: "View on npm",
      btn_github: "GitHub Repository"
    },
    stages: {
      1: {
        title: "Stage 01: Formal Domain & Specification Drafting",
        desc: "Instead of conversational prompt rambling, the architect defines deterministic domain schemas, strict input/output contracts, business invariants, and edge case matrices in human and machine-readable format."
      },
      2: {
        title: "Stage 02: Architectural Guardrails & C4 Boundary Injection",
        desc: "Injects strict architectural constraints: microservice boundaries, security policies (GDPR/PCI-DSS), database isolation levels, and non-negotiable coding conventions into the agent context window."
      },
      3: {
        title: "Stage 03: Fully Agentic Code Synthesis & Subagent Orchestration",
        desc: "Autonomous specialised agents (Planner Agent, Implementation Worker, Test Generator) synthesise clean code, migration scripts, and full unit/integration test suites verified against the contract."
      },
      4: {
        title: "Stage 04: Deterministic Verification & CI Quality Gates",
        desc: "Zero AI slop is allowed into production. Continuous Integration executes automated contract testing, static analysis, linter checks, and performance benchmarks before merging."
      }
    }
  },
  pl: {
    meta: {
      page_title: "APSW | Architektura Rozwiązań AI-Native & Systemy Enterprise",
      page_description: "Piotr Solarz-Wnęk — ponad 19 lat doświadczenia w architekturze IT. W pełni autonomiczny rozwój oprogramowania (Agentic Dev), metodyka Spec-Kit, Java 21, Symfony, chmura i przemysłowy IoT. Zero AI Slop."
    },
    nav: {
      brand_sub: "ARCHITEKTURA AI-NATIVE",
      skip_link: "Przejdź do treści",
      assurance: "Dowód",
      speckit: "Metodyka Spec-Kit",
      agentic: "Agentic Dev",
      services: "Usługi",
      engagement: "Współpraca",
      track_record: "Projekty",
      showcase: "Showcase",
      gridwright: "Playbook Gridwright",
      about: "O mnie",
      contact: "Kontakt",
      book_review: "Umów przegląd",
      theme_toggle_title: "Przełącz motyw",
      lang_toggle_aria: "Zmień język"
    },
    hero: {
      status_badge: "● Dostępny dla projektów strategicznych AI i architektury enterprise",
      title_html: `AI napisze prototyp w pięć minut.<br>My budujemy to, co przejdzie audyt.`,
      description_html: `Kod generowany przez AI jest tani. Ryzyko generowane przez AI już nie: braki dostępności, ekspozycja łańcucha dostaw, ciche błędy w danych i interfejsy zamarzające przy skali. Z ponad 19-letnim doświadczeniem architektonicznym w bankowości Tier-1 i przemysłowym IoT, APSW buduje i ratuje systemy według <strong>weryfikowalnego standardu</strong> i dowodzi tego publicznie otwartoźródłową tabelą bez zależności runtime.`,
      cta_speckit: "Zobacz dowód",
      cta_engagement: "Umów przegląd architektury",
      metric_years_val: "19+ lat",
      metric_years_lbl: "Architektura enterprise — od bankowości Tier-1 po przemysłowy IoT",
      metric_velocity_val: "30+ inżynierów",
      metric_velocity_lbl: "Zbudowany i prowadzony zespół w obszarach Java, PHP i mobile",
      metric_regulated_val: "Sektory regulowane",
      metric_regulated_lbl: "Finanse instytucjonalne, aparatura biotech, przemysł ciężki",
      metric_anti_slop_val: "Bramki specyfikacji",
      metric_anti_slop_lbl: "Każdy merge weryfikowany wykonywalnym kontraktem w CI"
    },
    assurance: {
      code_title: "Prawdziwy kod, a nie makieta",
      code_intro: "Oba fragmenty skopiowano bez zmian z dokumentacji apsw-gridwright. Zamiana tablicy na serwer albo obsługa dziesięciu milionów wierszy to zmiana jednej właściwości, a nie przepisywanie kodu.",
      code_a_cap: "Dziesięć milionów wierszy: źródło trzymające okno danych i wirtualne wiersze",
      code_b_cap: "Dziś tablica, jutro API z paginacją, te same kolumny i dodatki",
      code_link: "Przeczytaj pełny przewodnik na GitHubie",
      scale_title: "Ile trzeba czasu, żeby to zbudować, i ile zwykle kosztuje",
      scale_dev_lbl: "Programistów",
      scale_dev_val: "1",
      scale_loc_lbl: "Kod / testy / dokumentacja (linie)",
      scale_loc_val: "19k / 18k / 9k",
      scale_days_lbl: "Od pierwszego commita do v0.17",
      scale_days_val: "24 dni pracy (34 kalendarzowe)",
      scale_est_lbl: "Ten sam zakres ręcznie (estymata)",
      scale_est_val: "1,5–3 osobolata",
      scale_note: "Jeden programista pracujący z agentami AI w procesie Spec-Kit i Indaba. Liczby linii i daty pochodzą z publicznej historii gita (pierwszy commit 10 września 2026 zawierał już około 16 600 linii, więc realny czas pracy jest nieco dłuższy niż pokazane). Dni pracy to dni z co najmniej jednym commitem: 24 z 34 dni kalendarzowych do wydania v0.17.0 z 13 października 2026. Wartość „ręcznie” to nasza estymata, nie pomiar: ok. 37 000 linii kodu i testów przy 50–100 gotowych, przetestowanych liniach na dzień pracy seniora, bez dokumentacji.",
      scale_enterprise: "Takie funkcje zwykle dostaje się dopiero w płatnych wersjach, na przykład AG Grid Enterprise albo MUI X Pro i Premium: grupowanie wierszy z agregacją, eksport do Excela, przypinanie kolumn, dane hierarchiczne w postaci drzewa i obsługa do dziesięciu milionów wierszy. Tutaj wszystko jest na licencji MIT. Czegoś nie ma celowo: tabeli przestawnej (pivot) ani zaznaczania zakresów komórek jak w arkuszu. Jeśli tego potrzebujesz, wybierz inne narzędzie albo skontaktuj się z nami: wycenimy dodanie tej funkcji.",
      tag: "Inżynieria wysokiego zaufania",
      title: "AI napisze happy path w pięć minut. My bierzemy na siebie przypadki brzegowe.",
      subtitle: "Wygenerowana tabela działa na 100 wierszach na laptopie dewelopera. Na audycie, przed regulatorem albo przy poniedziałkowym wydaniu zawodzi wszystko wokół niej. Właśnie pod takie przypadki projektujemy, a dowód znajdziesz w publicznym pakiecie open source, którego kod możesz przejrzeć.",
      p1_tag: "EUROPEJSKI AKT O DOSTĘPNOŚCI",
      p1_title: "Twoje tabele nie przechodzą audytów dostępności",
      p1_desc: "Od czerwca 2025 banki, telekomy, e-commerce i transport w UE muszą spełniać wymogi dostępności na poziomie WCAG. Wygenerowany interfejs gubi fokus przy wyłączonej paginacji, ignoruje forced colors i pomija pola dotykowe.",
      p1_proof: "Dowód: fokus zostaje w tabeli, axe-core sprawdza 24 stany bez naruszeń, opcjonalny tryb WCAG 2.2 AA dla rozmiarów i kolorów.",
      p1_btn: "Umów przegląd dostępności",
      p2_tag: "ŁAŃCUCH DOSTAW I DORA",
      p2_title: "Kod z asystentem AI ciągnie dziesiątki pakietów",
      p2_desc: "W finansach, medtechu i obronności każda dodatkowa zależność to ryzyko łańcucha dostaw, a skopiowana komórka to wektor formula injection. Asystenci dodają jedno i drugie bez pytania.",
      p2_proof: "Dowód: zero zależności runtime, brak skryptów instalacyjnych, bramka commitów odrzucająca sinki HTML i skryptów, zabezpieczony eksport CSV i schowek.",
      p2_btn: "Zamów audyt zależności i bezpieczeństwa",
      p3_tag: "PO VIBE CODINGU",
      p3_title: "Prototyp zamarzł przy 50 000 wierszy",
      p3_desc: "Zespoły, które szybko dowiozły produkt agentami, trafiają na ścianę: 100 kolumn, dziesiątki tysięcy wierszy, interfejs szarpiący przy każdym przewijaniu i PR-y po 3000 linii, których nikt nie czyta.",
      p3_proof: "Dowód: wirtualizacja wierszy i kolumn, rzetelny licznik wierszy, 2–3 ms skryptu na klatkę przewijania przy 500 kolumnach, a wszystko pilnowane testami, których agent po cichu nie złamie.",
      p3_btn: "Zacznij sprint ratunkowy",
      litmus_title: "Test lakmusowy: szybki prompt kontra zaprojektowana tabela",
      litmus_caption: "Porównanie szybko wygenerowanej tabeli danych z podejściem inżynieryjnym APSW",
      col_topic: "Gdzie zawodzi",
      col_quick: "Wygenerowane w pięć minut",
      col_apsw: "Zaprojektowane przez APSW",
      r1_topic: "Wydajność przewijania",
      r1_quick: "Działa na 100 wierszach. Przy 500 kolumnach kosztuje około 60 ms skryptu na klatkę.",
      r1_apsw: "Około 2–3 ms na klatkę przy 500 kolumnach i źródło danych ładowane porcjami, które trzyma w pamięci kilka tysięcy wierszy niezależnie od ich liczby.",
      r2_topic: "Eksport „wszystkich wierszy”",
      r2_quick: "Przy paginacji po stronie serwera po cichu zapisuje pierwszą stronę jako pełny raport.",
      r2_apsw: "Opcja jest wyłączona, dopóki serwer nie potrafi zwrócić całości, a licznik pokazuje „1–25 z wielu” zamiast zmyślonej liczby.",
      r3_topic: "Kopiowanie do Excela",
      r3_quick: "Zabezpiecza kanał tekstowy i zapomina o HTML, więc komórka typu <code>=cmd|…</code> nadal się wykona.",
      r3_apsw: "Oba formaty schowka są escapowane, a tabela nigdy nie czyta schowka ani nie kopiuje bez akcji użytkownika.",
      r4_topic: "Dostępność",
      r4_quick: "Atrybuty ARIA dodane na pokaz; fokus klawiatury spada na body, gdy przycisk się wyłącza.",
      r4_apsw: "Fokus przechodzi na sąsiednią kontrolkę, jeden live region komunikuje stan, axe-core działa w 24 stanach.",
      r5_topic: "Zależności",
      r5_quick: "Dziesiątki tranzytywnych pakietów do audytu i łatania.",
      r5_apsw: "Zero zależności runtime i brak skryptów instalacyjnych.",
      note_html: `Wszystko z prawej kolumny znajduje się w <a href="https://github.com/yaotzin1/apsw-gridwright" target="_blank" rel="noopener noreferrer">apsw-gridwright</a> oraz <a href="https://github.com/yaotzin1/apsw-mui-excel-filter" target="_blank" rel="noopener noreferrer">apsw-mui-excel-filter</a> (MIT) i działa na żywo w showcase: <a href="showcase/#virtual">wirtualizacja 10M wierszy</a>, <a href="showcase/#excel">Excel AutoFilter</a>, <a href="showcase/#a11y">dostępność WCAG &amp; ARIA</a> oraz <a href="showcase/#mui-dashboard">panel operacyjny MUI</a> (a także w <a href="https://yaotzin1.github.io/apsw-gridwright/examples/playground/index.html" target="_blank" rel="noopener noreferrer">playgroundzie</a>). Wyniki dostępności to wyniki testów, a nie prawne oświadczenie o zgodności; raport samego pakietu wskazuje kryteria wciąż nieocenione. I właśnie tę dyscyplinę, wdrożoną w Twoim systemie, oferujemy klientom.`,
      offer_title: "Stała cena, stały zakres, wdrożenie poparte dowodami",
      offer_desc: "Przebudowa lub migracja starego panelu, utwardzenie kodu napisanego przez agentów albo przeniesienie Twojego design systemu na standard agent-ready. Zakres ustalamy podczas jednej 30-minutowej rozmowy z Głównym Architektem w ramach obustronnej umowy oneNDA, a pisemną wycenę ze stałą ceną otrzymujesz w ciągu 24 godzin. Dostajesz kod, testy, które go pilnują, i playbook dla Twoich agentów.",
      offer_cta: "Omówmy Twój przypadek",
      offer_models: "Zobacz modele współpracy"
    },
    speckit: {
      tag: "Metodyka Inżynieryjna",
      title_html: `Podejście Spec-Kit: <br>Inżynieria AI Sterowana Specyfikacją`,
      subtitle_html: `Większość inicjatyw GenAI zawodzi na produkcji, ponieważ chaotyczny prompting generuje kod niskiej jakości („AI slop”) — niedeterministyczny, z ukrytymi błędami i halucynacjami. <strong>Spec-Kit zastępuje metodę prób i błędów formalnymi, wykonywalnymi kontraktami oraz automatyczną weryfikacją w CI.</strong>`,
      stage1_badge: "ETAP 01",
      stage1_title: "Formalna specyfikacja domeny",
      stage1_desc: "Projektowanie maszynowo czytelnych schematów, ścisłych niezmienników biznesowych i kontraktów brzegowych przed napisaniem kodu.",
      stage1_guarantee: "Efekt: zatwierdzony, maszynowo czytelny kontrakt domeny",
      stage2_badge: "ETAP 02",
      stage2_title: "Architektoniczne Guardrails",
      stage2_desc: "Wstrzykiwanie granic C4, wymogów bezpieczeństwa (RODO/PCI-DSS), poziomów izolacji baz danych i wzorców asynchronicznych.",
      stage2_guarantee: "Efekt: granice C4 i polityki bezpieczeństwa wiążące dla agentów",
      stage3_badge: "ETAP 03",
      stage3_title: "Autonomiczna synteza kodu",
      stage3_desc: "Wyspecjalizowane zespoły agentów (Planner-Executor-Critic) generują czysty kod w izolacji kontekstowej oraz 100% testów weryfikowanych ze specyfikacją.",
      stage3_guarantee: "Efekt: implementacja wraz z zestawem testów, który ją weryfikuje",
      stage4_badge: "ETAP 04",
      stage4_title: "Deterministyczne bramki jakości CI",
      stage4_desc: "Ciągłe zautomatyzowane testy kontraktowe, analiza statyczna, benchmarki wydajnościowe i restrykcyjne bramki eliminacji halucynacji.",
      stage4_guarantee: "Efekt: wyniki testów kontraktowych, analizy statycznej i benchmarków",
      comp_caption: "Porównanie standardowego promptowania AI z metodyką APSW Spec-Kit w czterech wymiarach inżynieryjnych.",
      comp_slop_header_short: "Prompting",
      comp_speckit_header_short: "Spec-Kit",
      comp_dim: "Wymiar Inżynieryjny",
      comp_slop_header: "Standardowy Czat AI / Prompting („AI Slop”)",
      comp_speckit_header: "Metodyka APSW Spec-Kit",
      comp_dim_1: "Determinizm Wyników",
      comp_slop_1: "✕ Niedeterministyczny, dryf probabilistyczny",
      comp_speckit_1: "✓ 100% Deterministyczny według kontraktów schematów",
      comp_dim_2: "Kontrola Architektoniczna",
      comp_slop_2: "✕ Niekontrolowany spaghetti code i halucynacje",
      comp_speckit_2: "✓ Ścisłe egzekwowanie granic C4 i czysta logika domenowa",
      comp_dim_3: "Weryfikacja Enterprise",
      comp_slop_3: "✕ Ręczna, subiektywna inspekcja „na oko”",
      comp_speckit_3: "✓ Zautomatyzowane testy kontraktów i bramki CI („Tanie w weryfikacji”)",
      comp_dim_4: "Zgodność Regulacyjna",
      comp_slop_4: "✕ Wysokie ryzyko wycieku danych i luk bezpieczeństwa",
      comp_speckit_4: "✓ Izolowane środowiska typu sandbox i pełna zgodność z RODO / PCI-DSS"
    },
    agentic: {
      proof_title: "Stojący za tym silnik jest otwarty: Indaba",
      proof_desc: "Powyższy odczyt workflow i śladów odpowiada publicznej architekturze @indaba/engine: deklaratywny plik workflow.ai.yml opisuje kroki jako DAG, deterministyczny silnik — a nie model — decyduje co uruchomić dalej, implementacja działa w tymczasowym git worktree, role oparte na różnych modelach weryfikują się nawzajem zamiast oceniać własną pracę, a każdy krok zapisuje koszty i tokeny w standardzie OpenTelemetry GenAI do .indaba/traces/. To wersja alfa (0.1.0-alpha.0) na licencji MIT.",
      proof_github: "Indaba na GitHubie",
      proof_npm: "@indaba/engine w npm",
      tag: "Inżynieria Autonomiczna",
      title: "W pełni autonomiczny rozwój aplikacji (Agentic Dev)",
      subtitle: "Przejście poza asystentów typu copilot w stronę kompleksowych potoków multi-agentowych, które projektują architekturę, piszą kod, testują i samoczynnie naprawiają błędy pod nadzorem głównego architekta.",
      feat1_title: "Hierarchiczne zespoły multi-agentowe",
      feat1_desc: "Koordynacja wyspecjalizowanych subagentów: Plannera, Architekta, Workera i Critica. Złożone zadania są dzielone na izolowane, równoległe wątki o ścisłych granicach kontekstu.",
      feat2_title: "Pętle samonaprawcze i zautomatyzowane testy",
      feat2_desc: "Agenci nie tylko generują kod; uruchamiają zestawy testów, analizują błędy kompilacji, diagnozują regresje i samoczynnie naprawiają błędy aż do 100% zaliczenia wymagań kontraktu.",
      feat3_title: "Deterministyczne narzędzia i bezpieczny sandbox",
      feat3_desc: "Autonomiczni agenci działają w odizolowanych, bezpiecznych środowiskach z deklaratywnymi interfejsami narzędzi (parsowanie AST, gałęzie Git, weryfikacja migracji bazodanowych i wyzwalacze CI).",
      swarm_badge: "SILNIK DAG · ŚLAD OTel",
      swarm_log1_html: `<span class="indaba-key">steps:</span> <span class="indaba-str">[specify → plan → implement(worktree) → verify(adversarial)]</span>`,
      swarm_log2_html: `<span class="indaba-key">[step:specify]</span> <span class="indaba-muted">role=architect (claude-opus)</span> → <span class="indaba-str">specs/virtual-scroll/spec.md</span>`,
      swarm_log3_html: `<span class="indaba-key">[step:implement]</span> <span class="indaba-muted">worktree=.indaba/wt/feat-virtual · role=implementer</span>`,
      swarm_log4_html: `<span class="indaba-pass">[gate:test]</span> <span class="indaba-muted">vitest + axe-core (24 stany)</span> → <span class="indaba-pass">PASS (0 naruszeń)</span>`,
      swarm_log5_html: `<span class="indaba-warn">[step:verify]</span> <span class="indaba-muted">role=critic (krzyżowa recenzja kontradyktoryjna)</span> → <span class="indaba-pass">APPROVED</span>`,
      swarm_log6_html: `<span class="indaba-key">[otel:trace]</span> <span class="indaba-muted">.indaba/traces/run-042.json · gen_ai.usage.cost=$1.84</span>`,
      swarm_log7_html: `✓ WORKTREE_MERGED: Kontrakt zweryfikowany, ślad zarchiwizowany, gotowe do wydania.`
    },
    services: {
      tag: "Kompetencje",
      title: "Kompleksowe rozwiązania architektoniczne",
      subtitle: "Od strategicznych projektów technicznych po autonomiczne roje agentów i wysokowydajne backendy telemetryczne.",
      s1_title: "W pełni autonomiczny rozwój aplikacji",
      s1_desc: "Kompleksowy rozwój oprogramowania produkcyjnego realizowany przez skoordynowane roje multi-agentowe z autonomicznymi pętlami samonaprawczymi.",
      s1_d1: "Autonomiczne roje syntezy funkcjonalności",
      s1_d2: "Samonaprawa błędów & automatyczne poprawki CI",
      s1_d3: "Deterministyczne kontrakty narzędzi i API",
      s2_title: "Spec-Kit AI & przepływy agentowe",
      s2_desc: "Projektowanie deterministycznych potoków AI, dedykowanych grafów (ComfyUI / LangGraph), agentów narzędziowych oraz korporacyjnego RAG.",
      s2_d1: "Formalne modelowanie domeny Spec-Kit",
      s2_d2: "Deterministyczny RAG z cytowaniem źródeł",
      s2_d3: "Integracje Computer Vision (Ultralytics)",
      s3_title: "Architektura oprogramowania enterprise",
      s3_desc: "Projektowanie odpornych, wysokoprzepustowych mikrousług, wzorców CQRS i chmurowych infrastruktur dla sektora finansowego i przemysłowego.",
      s3_d1: "Java 21 / Spring Boot & Symfony 8 Core",
      s3_d2: "Infrastruktura Azure jako kod (Bicep/YAML)",
      s3_d3: "Projekty systemowe C4 i dekompozycja usług",
      s4_title: "Wysokowydajne systemy telemetryczne i przestrzenne",
      s4_desc: "Tworzenie rekurencyjnych, wielotenantowych silników zarządzania majątkiem i integracji danych przestrzennych (ESRI, Smallworld GIS).",
      s4_d1: "Silniki telemetrii maszyn przemysłowych",
      s4_d2: "Potoki ETL w Databricks i Azure Data Factory",
      s4_d3: "Systemy informacji geograficznej (Smallworld, ESRI, PostGIS)",
      s5_title: "Wdrożenie metodyki Spec-Kit AI w zespołach",
      s5_desc: "Transformacja organizacji inżynieryjnych z chaotycznego korzystania z czatów AI w ustrukturyzowaną, deterministyczną pracę sterowaną specyfikacją.",
      s5_d1: "Standardy SDLC Spec-Kit i dedykowane narzędzia",
      s5_d2: "Audyty Prędkości i Spójności Kodu z AI",
      s5_d3: "Praktyczne warsztaty dla doświadczonych inżynierów",
      s6_title: "Strategiczny audyt i projekt architektury",
      s6_desc: "Głęboka analiza techniczna repozytoriów kodu, granic mikrousług, polityk bezpieczeństwa oraz gotowości na integrację z AI.",
      s6_d1: "10-dniowy kompleksowy audyt architektury",
      s6_d2: "Schematy kontenerów i komponentów C4",
      s6_d3: "Strategiczna mapa drogowa modernizacji"
    },
    engagement: {
      tag: "Modele Współpracy",
      title: "Przejrzyste i przewidywalne modele współpracy",
      subtitle: "Niezależnie od tego, czy potrzebujesz szybkiego audytu diagnostycznego, autonomicznego wdrożenia AI od A do Z, czy stałego doradztwa architektonicznego.",
      m1_badge: "DIAGNOSTYKA I AUDYT",
      m1_title: "10-dniowy strategiczny audyt architektury",
      m1_desc: "Szczegółowa inspekcja techniczna zastanego kodu, granic mikrousług, polityk bezpieczeństwa i gotowości na wdrożenie AI.",
      m1_timeline_lbl: "Czas Trwania",
      m1_timeline_val: "10 dni roboczych (stały zakres)",
      m1_d1: "Kompleksowy audyt kodu i długu technicznego",
      m1_d2: "Architektura systemu C4 i schematy komponentów",
      m1_d3: "Weryfikacja bezpieczeństwa, RODO i izolacji danych",
      m1_d4: "Strategiczna mapa drogowa modernizacji i AI",
      m1_btn: "Zamów audyt architektury",
      m2_badge: "GŁÓWNE WDROŻENIE • MVP",
      m2_title: "Sprint wdrożeniowy MVP (Fully Agentic Delivery)",
      m2_desc: "Kompleksowe wytworzenie oprogramowania produkcyjnego realizowane autonomicznie przez zespoły multi-agentowe w oparciu o kontrakty Spec-Kit i testy samonaprawcze.",
      m2_timeline_lbl: "Czas Trwania",
      m2_timeline_val: "Sprint 4 – 8 Tygodni",
      m2_d1: "Formalny kontrakt domenowy Spec-Kit i modelowanie niezmienników",
      m2_d2: "Autonomiczna synteza multi-agentowa (Zero AI Slop)",
      m2_d3: "100% Zautomatyzowane Testy Kontraktów i Bramki CI",
      m2_d4: "Kod produkcyjny & wdrożenie Docker / cloud",
      m2_btn: "Porozmawiajmy o Sprincie",
      m3_badge: "DORADZTWO I RETAINER",
      m3_title: "Fractional Principal Architect & doradztwo",
      m3_desc: "Stałe strategiczne przywództwo architektoniczne, nadzór techniczny C4 oraz wdrażanie metodyki Spec-Kit dla rozwijających się zespołów inżynieryjnych.",
      m3_timeline_lbl: "Czas Trwania",
      m3_timeline_val: "Dedykowany retainer miesięczny",
      m3_d1: "Cotygodniowy nadzór architektoniczny i Code Review",
      m3_d2: "Standardy SDLC Spec-Kit i mentoring zespołu",
      m3_d3: "Sterowanie architekturą chmurową i High-Load Tier-1",
      m3_d4: "Bezpośredni dostęp asynchroniczny i dedykowane standupy",
      m3_btn: "Zapytaj o Retainer"
    },
    track_record: {
      tag: "Doświadczenie Projektowe (NDA)",
      title: "Sprawdzone projekty w skali enterprise",
      subtitle: "Ponad 19 lat praktyki architektonicznej w tworzeniu i wdrażaniu systemów mission-critical dla bankowości, aparatury medycznej oraz przemysłowego IoT.",
      c1_client: "Wiodący europejski bank komercyjny",
      c1_domain: "Bankowość i Finanse",
      c1_title: "Chmurowa platforma zarządzania transakcjami finansowymi",
      c1_desc: "Projekt architektury chmurowych narzędzi do obsługi transakcji finansowych dla czołowej instytucji bankowej w Europie. Stabilizacja infrastruktury, automatyzacja wdrożeń (CI/CD) i dekompozycja usług w restrykcyjnym środowisku bankowości regulowanej.",
      c1_m1_val: "-40% Czasu Wdrożenia",
      c1_m1_lbl: "Przyspieszenie cyklu wydań",
      c1_m2_val: "Zero Przestojów",
      c1_m2_lbl: "100% deklaratywny IaC w rozliczeniach",
      c2_client: "Przemysł ciężki i wydobywczy",
      c2_domain: "Przemysłowy IoT & Asset ERP",
      c2_title: "Silnik telemetrii i prewencyjnego utrzymania ruchu",
      c2_desc: "Główny architekt i programista wielotenantowej platformy telemetrycznej dla rozproszonych wież wiertniczych i ciężkiego parku maszynowego. Opracowanie rekurencyjnych struktur danych przeliczających dni pracy, metry odwiertów, motogodziny oraz automatyczne alarmy progowe.",
      c2_m1_val: "99,99% niezawodności",
      c2_m1_lbl: "Telemetria i detekcja anomalii",
      c2_m2_val: "Ciągłość Pracy",
      c2_m2_lbl: "Automatyzacja prewencji awarii",
      c3_client: "Autonomiczny produkt B2B SaaS AI",
      c3_domain: "100% rozwój autonomiczny (Agentic Dev)",
      c3_title: "Silnik reputacji AI i wielotenantowy triage zgłoszeń",
      c3_desc_html: `Architektura wielotenantowej platformy B2B do zarządzania reputacją z 45-sekundowym procesem triage, wymiennymi modelami LLM, precyzyjnym rozliczaniem tokenów i pełną izolacją danych. <strong>100% Autonomiczna Synteza Multi-Agentowa: Cały kod produkcyjny, migracje baz danych i zestawy testów powstały w 100% autonomicznie przez agentów AI pod formalnym nadzorem architektonicznym i bramkami CI — bez ręcznego pisania kodu przez programistów.</strong>`,
      c3_m1_val: "3 Mies. → 2 Tyg.",
      c3_m1_lbl: "Przyspieszenie Time-to-Market",
      c3_m2_val: "100% Synteza AI",
      c3_m2_lbl: "0 Ręcznego Kodowania / 100% Bramek CI",
      c4_client: "Międzynarodowa firma doradcza (wielka czwórka)",
      c4_domain: "Platforma analityczna transakcji M&A",
      c4_title: "Analityka fuzji i przejęć (M&A) oraz wizualizacja danych",
      c4_desc: "Architektura warstwy frontendowej platformy analitycznej wspierającej procesy transakcyjne fuzji i przejęć o wartości setek milionów dolarów. Interaktywne matryce danych i bezawaryjne wdrażanie poprawek w czasie rzeczywistym w globalnych strefach czasowych.",
      c4_m1_val: "Portfel $100M+",
      c4_m1_lbl: "Wartość obsługiwanych transakcji",
      c4_m2_val: "Wysoka Dostępność",
      c4_m2_lbl: "Wdrażanie poprawek bez przestojów",
      c5_client: "Globalny koncern biotechnologiczny",
      c5_domain: "Aparatura diagnostyczna biotech",
      c5_title: "Oprogramowanie sondy i klasyfikatora próbek medycznych",
      c5_desc: "Projekt przebudowy architektury i dekompozycji kodu pętli telemetrycznych aparatury do automatycznej analizy klinicznej. Wyeliminowanie ukrytych wyścigów wątków (race conditions) oraz błędów logiki asynchronicznej poprzez modularną architekturę.",
      c5_m1_val: "100% Zgodności",
      c5_m1_lbl: "Restrykcyjne normy diagnostyki medycznej",
      c5_m2_val: "Zero wyścigów wątków",
      c5_m2_lbl: "Odseparowane moduły telemetrii",
      c6_client: "SaaS reklamy programatycznej",
      c6_domain: "Rekrutacja & systemy reklamowe",
      c6_title: "Modułowy system ATS i automatyzacja reklam społecznościowych",
      c6_desc: "Nadzór nad architekturą modernizacji platformy do postaci nowoczesnego środowiska łączącego automatyzację kampanii w social media z modułowym systemem śledzenia aplikacji (ATS).",
      c6_m1_val: "Wysoka Prędkość",
      c6_m1_lbl: "Międzynarodowy zespół inżynierski",
      c6_m2_val: "Full-Stack REST",
      c6_m2_lbl: "Architektura Integracji API"
    },
    architect: {
      tag: "Główny Architekt",
      name: "Piotr Solarz-Wnęk",
      subtitle: "Mgr inż. Informatycznych Systemów Przemysłowych | 19+ lat Doświadczenia",
      bio_p1_html: `Architekt Oprogramowania, inżynier AI-Native oraz były Dyrektor Jednostki Biznesowej, który rozwijał międzynarodowe działy inżynieryjne do 30+ specjalistów w sektorach Bankowości, Energetyki i Przemysłu 4.0. Certyfikat Microsoft Azure Fundamentals (AZ-900), ITIL Foundation oraz absolwent programu <em>Droga Nowoczesnego Architekta</em>.`,
      bio_p2_html: `Pionier praktycznego wdrażania metodyki <strong>Spec-Kit</strong> oraz <strong>W Pełni Autonomicznego Rozwoju (Agentic Dev)</strong>, czyniąc inżynierię oprogramowania z AI przewidywalną, bezpieczną i wolną od niskiej jakości kodu (AI slop).`,
      linkedin_btn: "Profil LinkedIn",
      email_btn: "Bezpośredni Email",
      credentials_title: "Certyfikaty i Wykształcenie",
      leadership_title: "Doświadczenie Liderskie:",
      leadership_desc: "Skalowanie jednostki do 30+ inżynierów (Mobile, Java, PHP)",
      direct_contact_btn: "Kontakt Bezpośredni"
    },
    contact: {
      tag: "Kontakt",
      title: "Umów przegląd architektury",
      subtitle: "Niezależnie od tego, czy planujesz wdrożyć autonomiczną aplikację AI, wyeliminować błędy AI dzięki Spec-Kit, czy zmodernizować istniejące systemy — zaprojektujmy właściwe rozwiązanie.",
      direct_email_title: "Bezpośredni Email",
      response_time: "Średni czas odpowiedzi: < 4 godziny robocze",
      phone_title: "Telefon / WhatsApp",
      timezone: "Europa / Warszawa (UTC+1 / UTC+2)",
      availability_title: "Dostępność Projektowa",
      availability_val: "Sprinty strategiczne & retainery",
      availability_desc: "Projekty zdalne / hybrydowe w UE",
      sla_title: "Jak wygląda współpraca",
      sla_step1_html: `<strong class="form-nda-strong">Analiza Zgłoszenia (&lt; 4h):</strong> Piotr osobiście analizuje wymagania z zachowaniem pełnej poufności (NDA).`,
      sla_step2_html: `<strong class="form-nda-strong">Rozmowa Techniczna:</strong> 30-minutowa merytoryczna konsultacja z Głównym Architektem. Zero marketingu.`,
      sla_step3_html: `<strong class="form-nda-strong">Plan Działania (24h):</strong> Konkretny zakres 10-Dniowego Audytu lub Sprintu Wdrożeniowego.`,
      form_name_label: "Imię i Nazwisko / Firma *",
      form_name_placeholder: "np. Jan Kowalski (CTO, Fintech)",
      form_email_label: "Służbowy adres email *",
      form_email_placeholder: "jan@firma.pl",
      form_service_label: "Główny obszar zainteresowania",
      opt_agentic: "W pełni autonomiczny rozwój aplikacji (Agentic Dev)",
      opt_speckit: "Spec-Kit AI & systemy agentowe",
      opt_enterprise: "Architektura enterprise & modernizacja chmurowa",
      opt_iot: "Systemy Telemetryczne High-Load & IoT / GIS",
      opt_enablement: "Szkolenia Spec-Kit AI dla zespołów inżynierskich",
      opt_rescue: "Sprint ratunkowy po vibe codingu: wydajność i architektura",
      opt_a11y: "Audyt dostępności EAA / WCAG 2.2 i bezpieczeństwa łańcucha dostaw",
      opt_audit: "10-dniowy kompleksowy audyt architektury",
      form_msg_label: "Opis projektu / cele techniczne *",
      form_msg_placeholder: "Opisz architekturę systemu, wyzwania techniczne, harmonogram lub stos technologiczny...",
      nda_text_html: `<strong class="form-nda-strong">Wymagana Umowa Poufności (NDA):</strong> Podpisanie obustronnej umowy NDA przed rozmową techniczną.`,
      form_submit_btn: "Wyślij zapytanie ofertowe",
      sending_inquiry: "Wysyłanie zapytania...",
      feedback_success: "Dziękuję! Twoja wiadomość została pomyślnie wysłana. Piotr Solarz-Wnęk skontaktuje się wkrótce.",
      feedback_error: "Wystąpił błąd. Skontaktuj się bezpośrednio: piotr.solarz-wnek@apsw.pl",
      feedback_offline_html: `Formularz nie połączył się z serwerem, więc zapytanie nie zostało wysłane. Napisz bezpośrednio na <a href="mailto:piotr.solarz-wnek@apsw.pl">piotr.solarz-wnek@apsw.pl</a>.`,
      feedback_fallback_html: `✓ Zapytanie zapisane. Możesz także skontaktować się bezpośrednio: <a href="mailto:piotr.solarz-wnek@apsw.pl" class="contact-item-link">piotr.solarz-wnek@apsw.pl</a>`,
      copied_tooltip: "Skopiowano!"
    },
    footer: {
      footer_desc: "APSW — Architektura Rozwiązań AI-Native i Inżynieria Enterprise prowadzona przez Piotra Solarza-Wnęka. Zero AI Slop. Deterministyczne systemy o wysokiej dostępności produkcyjnej.",
      col1_title: "Metodyka & Technologie",
      col2_title: "Usługi",
      col3_title: "Dostępność i Biuro",
      rights: "APSW — Piotr Solarz-Wnęk. Wszelkie prawa zastrzeżone.",
      showcase_link: "Demo komponentów na żywo",
      gridwright_link: "Gridwright Data Grid (npm)",
      indaba_link: "Silnik orkiestracji Indaba (GitHub)"
    },
    gridwright_showcase: {
      tag: "Publiczne pakiety NPM & open source",
      badge: "DOSTĘPNY W NPM",
      title: "apsw-gridwright & apsw-mui-excel-filter",
      subtitle: "Architektura headless tabeli danych oraz filtr w stylu Excel AutoFilter wyodrębniony z przemysłowego systemu ERP i uogólniony dla React 17–19 oraz MUI 5–7.",
      desc: "Publiczny dowód tego, jak w APSW projektujemy i wyodrębniamy komponenty z systemów legacy. Zero zależności runtime w rdzeniu, wirtualizacja do 10 milionów wierszy, grupowanie z agregatami, eksport do Excela, drzewa danych, bramka bezpieczeństwa na każdym commicie, testy axe-core w 24 stanach oraz apsw-mui-excel-filter (subtraktywne dwuczłonowe 'Dodaj bieżące zaznaczenie do filtru' wyodrębnione z produkcyjnego ERP z 47 testami i 100% pokryciem). Licencja MIT.",
      install_cmd: "npm i apsw-gridwright",
      pill_npm: "npm: apsw-gridwright",
      pill_virtual: "Wirtualizacja (10M wierszy)",
      pill_rest: "Protokół REST Wire Protocol",
      pill_editing: "Edycja komórek in-line",
      pill_aria: "Dostępność ARIA & Klawiatura",
      pill_ts: "Natywny TypeScript",
      pill_mui: "Widoki MUI: apsw-gridwright-mui",
      pill_excel: "Excel AutoFilter: apsw-mui-excel-filter",
      btn_showcase: "Demo React na żywo",
      btn_live_playground: "Playground na żywo",
      btn_playground: "Playbook agenta i poligon REST",
      btn_npm: "Zobacz na npm",
      btn_github: "Repozytorium GitHub"
    },
    stages: {
      1: {
        title: "Etap 01: formalna specyfikacja domeny i kontraktów",
        desc: "Zamiast chaotycznych promptów w czacie, architekt definiuje deterministyczne schematy domeny, ścisłe kontrakty wejścia/wyjścia, niezmienniki biznesowe oraz macierze przypadków brzegowych w formacie czytelnym dla człowieka i maszyn."
      },
      2: {
        title: "Etap 02: architektoniczne guardrails i wstrzykiwanie granic C4",
        desc: "Wstrzykuje ścisłe ograniczenia architektoniczne do okna kontekstu agenta: granice mikrousług, polityki bezpieczeństwa (RODO/PCI-DSS), poziomy izolacji baz danych i bezkompromisowe standardy kodu."
      },
      3: {
        title: "Etap 03: w pełni autonomiczna synteza kodu i orkiestracja agentów",
        desc: "Autonomiczni wyspecjalizowani agenci (Planner, Worker, Test Generator) syntetyzują czysty kod, skrypty migracji i pełne zestawy testów jednostkowych oraz integracyjnych, weryfikowane pod kątem kontraktu."
      },
      4: {
        title: "Etap 04: deterministyczna weryfikacja i bramki jakości CI",
        desc: "Kod o niskiej jakości (AI slop) nie ma wstępu na produkcję. System Continuous Integration wykonuje zautomatyzowane testy kontraktowe, analizę statyczną, weryfikację typów i benchmarki wydajnościowe przed mergem."
      }
    }
  }
};

/**
 * Helper to get a nested value from an object using a dot-path (e.g. 'hero.title_html')
 */
function getNestedTranslation(obj, path) {
  return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : null), obj);
}

/**
 * Current Active Language state
 */
window.APSW_I18N = {
  currentLang: 'en',
  translations: APSW_TRANSLATIONS,

  /**
   * Initialize language detection and event listeners
   */
  init() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const savedLang = localStorage.getItem('apsw_lang');
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();

    let initialLang = 'en';
    if (urlLang && (urlLang === 'pl' || urlLang === 'en')) {
      initialLang = urlLang;
    } else if (savedLang && (savedLang === 'pl' || savedLang === 'en')) {
      initialLang = savedLang;
    } else if (browserLang.startsWith('pl')) {
      initialLang = 'pl';
    }

    this.setLanguage(initialLang, false);
  },

  /**
   * Switch the active language and update the entire DOM
   */
  setLanguage(lang, persist = true) {
    if (lang !== 'pl' && lang !== 'en') lang = 'en';
    this.currentLang = lang;

    if (persist) {
      localStorage.setItem('apsw_lang', lang);
      const url = new URL(window.location);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url);
    }

    // 1. Update <html lang="...">
    document.documentElement.setAttribute('lang', lang);

    const dict = APSW_TRANSLATIONS[lang];
    if (!dict) return;

    // 2. Update Document Title & Meta Description
    if (dict.meta) {
      if (dict.meta.page_title) document.title = dict.meta.page_title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && dict.meta.page_description) {
        metaDesc.setAttribute('content', dict.meta.page_description);
      }
    }

    // 3. Update Text Content (data-i18n)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getNestedTranslation(dict, key);
      if (val !== null && val !== undefined) {
        el.textContent = val;
      }
    });

    // 4. Update HTML Content (data-i18n-html)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = getNestedTranslation(dict, key);
      if (val !== null && val !== undefined) {
        el.innerHTML = val;
      }
    });

    // 5. Update Placeholders (data-i18n-placeholder)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = getNestedTranslation(dict, key);
      if (val !== null && val !== undefined) {
        el.setAttribute('placeholder', val);
      }
    });

    // 6. Update Titles / Tooltips (data-i18n-title)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = getNestedTranslation(dict, key);
      if (val !== null && val !== undefined) {
        el.setAttribute('title', val);
      }
    });

    // 7. Update ARIA Labels (data-i18n-aria)
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const val = getNestedTranslation(dict, key);
      if (val !== null && val !== undefined) {
        el.setAttribute('aria-label', val);
      }
    });

    // 8. Update UI Language Switcher Active States
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // 9. Dispatch custom event for interactive components (Spec-Kit flow, Estimator, etc.)
    window.dispatchEvent(new CustomEvent('apsw:languageChanged', { detail: { lang } }));
  },

  /**
   * Get translation for a key in current language
   */
  t(path) {
    const dict = APSW_TRANSLATIONS[this.currentLang] || APSW_TRANSLATIONS.en;
    return getNestedTranslation(dict, path) || path;
  }
};

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.APSW_I18N.init();

  // Attach click listeners to language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== window.APSW_I18N.currentLang) {
        window.APSW_I18N.setLanguage(targetLang, true);
      }
    });
  });
});
