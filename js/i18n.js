/**
 * APSW Brand Website - Internationalization (i18n) Engine
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
      speckit: "Spec-Kit AI",
      agentic: "Agentic Dev",
      services: "Services",
      engagement: "Engagements",
      track_record: "Case Studies",
      about: "About",
      contact: "Contact",
      book_review: "Book Review",
      theme_toggle_title: "Toggle theme",
      lang_toggle_aria: "Switch language"
    },
    hero: {
      status_badge: "● Available for Strategic AI & Enterprise Architecture Engagements",
      title_html: `Move Beyond Fragile AI Prototypes. <br><span class="title-accent">Build Reliable, Production-Ready Systems.</span>`,
      description_html: `Building AI into enterprise software is easy to prototype, but notoriously hard to run reliably in production. Backed by 19+ years of architecture experience across Tier-1 Banking and Industrial IoT, APSW delivers <strong>deterministic, fully agentic applications</strong> governed by formal contracts and zero AI slop.`,
      cta_speckit: "Explore Spec-Kit Workflow",
      cta_engagement: "Engagement Models",
      metric_years_val: "19+ Years",
      metric_years_lbl: "Enterprise Architecture Track Record",
      metric_velocity_val: "5x Velocity",
      metric_velocity_lbl: "Fully Agentic Multi-Agent Delivery",
      metric_regulated_val: "Tier-1 Regulated",
      metric_regulated_lbl: "Institutional Finance & Biotech Proven",
      metric_anti_slop_val: "Zero AI Slop",
      metric_anti_slop_lbl: "Deterministic Spec-Kit CI Gates"
    },
    speckit: {
      tag: "Methodology",
      title_html: `The Spec-Kit Approach: <br>Specification-Driven AI Engineering`,
      subtitle_html: `Most generative AI initiatives fail in production because unstructured prompting produces "AI slop" — non-deterministic code with hidden state bugs and hallucinations. <strong>Spec-Kit replaces prompt-and-pray with formal executable contracts and CI verification gates.</strong>`,
      stage1_badge: "STAGE 01",
      stage1_title: "Formal Domain Specification",
      stage1_desc: "Drafting machine-readable schemas, strict invariant boundaries, and edge-case contracts before writing code.",
      stage1_guarantee: "GUARANTEE: Zero Scope Creep",
      stage2_badge: "STAGE 02",
      stage2_title: "Architectural Guardrails",
      stage2_desc: "Injecting C4 boundaries, security compliance (GDPR/PCI-DSS), database isolation levels, and non-blocking asynchronous patterns.",
      stage2_guarantee: "GUARANTEE: 100% Security & Isolation",
      stage3_badge: "STAGE 03",
      stage3_title: "Autonomous Code Synthesis",
      stage3_desc: "Multi-agent swarms (Planner-Executor-Critic) generate clean, context-isolated code and 100% test suites against the spec.",
      stage3_guarantee: "GUARANTEE: 5x Time-to-Market Velocity",
      stage4_badge: "STAGE 04",
      stage4_title: "Deterministic CI Quality Gate",
      stage4_desc: "Continuous automated contract testing, static analysis, performance benchmarks, and strict zero-hallucination gates.",
      stage4_guarantee: "GUARANTEE: Zero Production Regressions",
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
      tag: "Autonomous Engineering",
      title: "Fully Agentic Application Development",
      subtitle: "Moving past copilot auto-complete into end-to-end autonomous multi-agent development pipelines that architect, code, test, and self-heal production systems under expert architectural direction.",
      feat1_title: "Hierarchical Multi-Agent Swarms",
      feat1_desc: "Coordinating specialized Planner, Architect, Worker, and Critic subagents. Complex tasks are broken down into isolated, parallel execution threads with strict context boundaries.",
      feat2_title: "Self-Healing Execution & Test Loops",
      feat2_desc: "Agents don't just write code; they run test suites, inspect compile errors, diagnose regressions, and automatically self-correct until all contract requirements pass 100%.",
      feat3_title: "Deterministic Tool-Use & Sandbox Security",
      feat3_desc: "Autonomous agents operate in isolated secure sandboxes with declarative tool interfaces (AST parsing, Git branching, database migration verification, and CI triggers).",
      swarm_badge: "ACTIVE SWARM",
      swarm_log1_html: `<span style="color: #a855f7;">[ARCHITECT_AGENT]</span> Loaded Spec: <span style="color: #38bdf8;">SPEC-FINANCIAL-TRANSACTIONS-V3</span>`,
      swarm_log2_html: `<span style="color: #a855f7;">[ARCHITECT_AGENT]</span> Enforcing C4 Guardrails & Spring Boot 3.3 / Java 21 Aggregate Rules`,
      swarm_log3_html: `<span style="color: #38bdf8;">[PLANNER_AGENT]</span> Decomposed into 3 Parallel Subtasks (Entity, Controller, Karate Suite)`,
      swarm_log4_html: `<span style="color: #34d399;">[WORKER_SUBAGENT_01]</span> Generated idempotent transaction commit handler`,
      swarm_log5_html: `<span style="color: #34d399;">[WORKER_SUBAGENT_02]</span> Executed test runner: 34 tests passed, 0 failures`,
      swarm_log6_html: `<span style="color: #fbbf24;">[CRITIC_VERIFIER]</span> Static analysis: 0 warnings, OWASP security pass certified`,
      swarm_log7_html: `✓ SYNTHESIS_COMPLETE: Production branch ready for pull request.`
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
      s2_d1: "Formal Spec-Kit Domain Modeling",
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
      s5_desc: "Transforming engineering organizations from chaotic AI chat usage into disciplined, deterministic Spec-Driven AI workflows.",
      s5_d1: "Spec-Kit SDLC Guidelines & Tooling",
      s5_d2: "AI Velocity & Code Consistency Audits",
      s5_d3: "Hands-On Senior Engineering Workshops",
      s6_title: "Strategic Architecture Audit & Blueprint",
      s6_desc: "A deep-dive technical health check of your codebases, microservice boundaries, security policies, and AI readiness.",
      s6_d1: "10-Day Comprehensive Architecture Audit",
      s6_d2: "C4 Container & Component Schemas",
      s6_d3: "Executive Modernization Roadmap"
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
      m1_d4: "Executive Modernization & AI Roadmap",
      m1_btn: "Request Architecture Audit",
      m2_badge: "MOST POPULAR • CORE DELIVERY",
      m2_title: "Fully Agentic MVP & Core Delivery Sprint",
      m2_desc: "End-to-end production software delivery executed autonomously by multi-agent swarms under formal Spec-Kit contracts and self-healing test loops.",
      m2_timeline_lbl: "Timeline",
      m2_timeline_val: "4 – 8 Weeks Sprint",
      m2_d1: "Formal Spec-Kit Domain Contract & Invariant Modeling",
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
      c1_desc: "Architected enterprise cloud-native transaction management utilities for a leading European financial institution. Drove infrastructural stabilization, continuous deployment engineering, and service decoupling in strictly regulated banking.",
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
      c3_desc_html: `Architected an enterprise multi-tenant B2B reputation engine featuring a 45-second conveyor-belt triage UX, swappable multi-LLM engine, token-credit ledger tracking, and tenant isolation shields. <strong>100% Autonomous Multi-Agent Synthesis: The entire production codebase, migrations, and test suites were synthesized autonomously by AI agents under formal architectural direction and deterministic CI contract gates — zero human manual coding.</strong>`,
      c3_m1_val: "3 Mos → 2 Wks",
      c3_m1_lbl: "Time-to-Market Acceleration",
      c3_m2_val: "100% AI Synthesized",
      c3_m2_lbl: "0 Manual Developers / 100% CI Contract Gates",
      c4_client: "Big-Four Consulting Firm",
      c4_domain: "M&A Analytics Platform",
      c4_title: "Corporate Deal Analytics & Interactive Visualizers",
      c4_desc: "Engineered frontend data layers for a global professional services firm's high-availability corporate analytics platform, supporting multi-million dollar M&A deal pipelines with interactive data-visualization matrices and zero-downtime hot-fix reliability across international timezones.",
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
      c6_desc: "Supervised frontend architecture to modernize a legacy platform into a high-performance workspace combining automated social advertisement engines with modular Applicant Tracking Systems (ATS).",
      c6_m1_val: "High Velocity",
      c6_m1_lbl: "International Engineering Squad",
      c6_m2_val: "Full-Stack REST",
      c6_m2_lbl: "Ad Engine Interfaces"
    },
    architect: {
      tag: "Principal Architect",
      name: "Piotr Solarz-Wnęk",
      subtitle: "MSc Informatic Industrial Systems | 19+ Years Experience",
      bio_p1_html: `Software Architect, AI-Native developer, and former Business Unit Head who expanded global engineering units to 30+ engineers across Banking, Energy, and Industry 4.0. Certified Azure Architect (AZ-900), ITIL Foundation, and alumni of <em>Droga Nowoczesnego Architekta</em>.`,
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
      subtitle: "Whether you want to build a Fully Agentic Application, eliminate AI slop via Spec-Kit, or modernize legacy systems — let's engineer the right solution.",
      direct_email_title: "Direct Email",
      response_time: "Average response time: < 4 business hours",
      phone_title: "Direct Phone / WhatsApp",
      timezone: "Europe / Warsaw (UTC+1 / UTC+2)",
      availability_title: "Engagement Availability",
      availability_val: "Strategic Sprints & Retainers",
      availability_desc: "Remote / EU Hybrid architecture engagements",
      sla_title: "What Happens Next (Direct SLA)",
      sla_step1_html: `<strong style="color: var(--text-primary);">Stack Review (&lt; 4h):</strong> Piotr personally reviews your requirements under mutual NDA.`,
      sla_step2_html: `<strong style="color: var(--text-primary);">Technical Alignment:</strong> Direct 30-min call with the Principal Architect. Zero sales pitch.`,
      sla_step3_html: `<strong style="color: var(--text-primary);">Actionable Scope (24h):</strong> Concrete 10-Day Audit or Core Delivery Sprint roadmap.`,
      form_name_label: "Your Name / Company *",
      form_name_placeholder: "e.g. Alex Jensen (CTO, Fintech)",
      form_email_label: "Work Email *",
      form_email_placeholder: "alex@company.com",
      form_service_label: "Primary Area of Interest",
      opt_agentic: "Fully Agentic Application Development",
      opt_speckit: "Spec-Kit AI & Agentic Systems",
      opt_enterprise: "Enterprise Architecture & Cloud Modernization",
      opt_iot: "High-Load Telemetry / Spatial IoT Systems",
      opt_enablement: "Spec-Kit AI Team Enablement & Workshops",
      opt_audit: "10-Day Comprehensive Architecture Audit",
      form_msg_label: "Project Description / Technical Goals *",
      form_msg_placeholder: "Tell me about your system architecture, challenges, target timeline, or tech stack...",
      nda_text_html: `<strong style="color: var(--text-primary);">Request Mutual NDA:</strong> Execute a bilateral Non-Disclosure Agreement before our technical alignment call.`,
      form_submit_btn: "Send Architecture Inquiry",
      sending_inquiry: "Sending Inquiry...",
      feedback_success: "Thank you! Your message has been sent successfully. Piotr Solarz-Wnek will review your architecture inquiry shortly.",
      feedback_error: "An error occurred. Please reach out directly to piotr.solarz-wnek@apsw.pl",
      feedback_fallback_html: `✓ Inquiry recorded. You can also contact directly at <a href="mailto:piotr.solarz-wnek@apsw.pl" style="color: var(--text-brand); text-decoration: underline; font-weight: 600;">piotr.solarz-wnek@apsw.pl</a>`,
      copied_tooltip: "Copied!"
    },
    footer: {
      footer_desc: "APSW — AI-Native Solution Architecture & Enterprise Engineering by Piotr Solarz-Wnęk. Zero AI Slop. Deterministic systems engineered for high-availability production.",
      footer_deploy: "Deployment Ready: Cyber_Folks / Hetzner",
      col1_title: "Methodology & Tech",
      col2_title: "Services",
      col3_title: "Availability & Office",
      rights: "© 2026 APSW — Piotr Solarz-Wnęk. All rights reserved."
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
        desc: "Autonomous specialized agents (Planner Agent, Implementation Worker, Test Generator) synthesize clean code, migration scripts, and full unit/integration test suites verified against the contract."
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
      speckit: "Metodyka Spec-Kit",
      agentic: "Agentic Dev",
      services: "Usługi",
      engagement: "Współpraca",
      track_record: "Projekty",
      about: "O mnie",
      contact: "Kontakt",
      book_review: "Umów Audyt",
      theme_toggle_title: "Przełącz motyw",
      lang_toggle_aria: "Zmień język"
    },
    hero: {
      status_badge: "● Dostępny dla projektów strategicznych AI i architektury enterprise",
      title_html: `Wyjdź poza kruche prototypy AI. <br><span class="title-accent">Buduj niezawodne systemy gotowe na produkcję.</span>`,
      description_html: `Wdrożenie AI w oprogramowaniu enterprise jest proste na etapie demo, lecz niezwykle trudne w stabilnej pracy produkcyjnej. Opierając się na ponad 19 latach doświadczenia architektonicznego w bankowości i przemyśle, APSW tworzy <strong>deterministyczne, w pełni autonomiczne aplikacje</strong> oparte na formalnych kontraktach i zasadzie Zero AI Slop.`,
      cta_speckit: "Poznaj Metodykę Spec-Kit",
      cta_engagement: "Modele Współpracy",
      metric_years_val: "19+ Lat",
      metric_years_lbl: "Doświadczenia w Architekturze Enterprise",
      metric_velocity_val: "5x Szybciej",
      metric_velocity_lbl: "Autonomiczne Zespoły Multi-Agentowe",
      metric_regulated_val: "Sektor Regulowany",
      metric_regulated_lbl: "Sprawdzone w Bankowości i Biotech",
      metric_anti_slop_val: "Zero AI Slop",
      metric_anti_slop_lbl: "Deterministyczne Bramki Jakości CI"
    },
    speckit: {
      tag: "Metodyka Inżynieryjna",
      title_html: `Podejście Spec-Kit: <br>Inżynieria AI Sterowana Specyfikacją`,
      subtitle_html: `Większość inicjatyw GenAI zawodzi na produkcji, ponieważ chaotyczny prompting generuje kod niskiej jakości („AI slop”) — niedeterministyczny, z ukrytymi błędami i halucynacjami. <strong>Spec-Kit zastępuje metodę prób i błędów formalnymi, wykonywalnymi kontraktami oraz automatyczną weryfikacją w CI.</strong>`,
      stage1_badge: "ETAP 01",
      stage1_title: "Formalna Specyfikacja Domeny",
      stage1_desc: "Projektowanie maszynowo czytelnych schematów, ścisłych niezmienników biznesowych i kontraktów brzegowych przed napisaniem kodu.",
      stage1_guarantee: "GWARANCJA: Brak Rozmycia Zakresu",
      stage2_badge: "ETAP 02",
      stage2_title: "Architektoniczne Guardrails",
      stage2_desc: "Wstrzykiwanie granic C4, wymogów bezpieczeństwa (RODO/PCI-DSS), poziomów izolacji baz danych i wzorców asynchronicznych.",
      stage2_guarantee: "GWARANCJA: 100% Bezpieczeństwa i Izolacji",
      stage3_badge: "ETAP 03",
      stage3_title: "Autonomiczna Synteza Kodu",
      stage3_desc: "Wyspecjalizowane zespoły agentów (Planner-Executor-Critic) generują czysty kod w izolacji kontekstowej oraz 100% testów weryfikowanych ze specyfikacją.",
      stage3_guarantee: "GWARANCJA: 5x Krótszy Czas Wdrożenia",
      stage4_badge: "ETAP 04",
      stage4_title: "Deterministyczne Bramki Jakości CI",
      stage4_desc: "Ciągłe zautomatyzowane testy kontraktowe, analiza statyczna, benchmarki wydajnościowe i restrykcyjne bramki eliminacji halucynacji.",
      stage4_guarantee: "GWARANCJA: Zero Regresji na Produkcji",
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
      tag: "Inżynieria Autonomiczna",
      title: "W Pełni Autonomiczny Rozwój Aplikacji (Agentic Dev)",
      subtitle: "Przejście poza asystentów typu copilot w stronę kompleksowych potoków multi-agentowych, które projektują architekturę, piszą kod, testują i samoczynnie naprawiają błędy pod nadzorem głównego architekta.",
      feat1_title: "Hierarchiczne Zespoły Multi-Agentowe",
      feat1_desc: "Koordynacja wyspecjalizowanych subagentów: Plannera, Architekta, Workera i Critica. Złożone zadania są dzielone na izolowane, równoległe wątki o ścisłych granicach kontekstu.",
      feat2_title: "Pętle Samonaprawcze i Zautomatyzowane Testy",
      feat2_desc: "Agenci nie tylko generują kod; uruchamiają zestawy testów, analizują błędy kompilacji, diagnozują regresje i samoczynnie naprawiają błędy aż do 100% zaliczenia wymagań kontraktu.",
      feat3_title: "Deterministyczne Narzędzia i Bezpieczny Sandbox",
      feat3_desc: "Autonomiczni agenci działają w odizolowanych, bezpiecznych środowiskach z deklaratywnymi interfejsami narzędzi (parsowanie AST, gałęzie Git, weryfikacja migracji bazodanowych i wyzwalacze CI).",
      swarm_badge: "AKTYWNY RÓJ",
      swarm_log1_html: `<span style="color: #a855f7;">[ARCHITECT_AGENT]</span> Załadowano specyfikację: <span style="color: #38bdf8;">SPEC-FINANCIAL-TRANSACTIONS-V3</span>`,
      swarm_log2_html: `<span style="color: #a855f7;">[ARCHITECT_AGENT]</span> Wymuszanie reguł C4 & reguł agregatów Spring Boot 3.3 / Java 21`,
      swarm_log3_html: `<span style="color: #38bdf8;">[PLANNER_AGENT]</span> Podział na 3 równoległe zadania (Entity, Controller, Karate Suite)`,
      swarm_log4_html: `<span style="color: #34d399;">[WORKER_SUBAGENT_01]</span> Wygenerowano idempotentny handler zatwierdzania transakcji`,
      swarm_log5_html: `<span style="color: #34d399;">[WORKER_SUBAGENT_02]</span> Uruchomiono testy: 34 zaliczone, 0 błędów`,
      swarm_log6_html: `<span style="color: #fbbf24;">[CRITIC_VERIFIER]</span> Analiza statyczna: 0 ostrzeżeń, certyfikat bezpieczeństwa OWASP`,
      swarm_log7_html: `✓ SYNTEZA_ZAKOŃCZONA: Gałąź produkcyjna gotowa do pull requesta.`
    },
    services: {
      tag: "Kompetencje",
      title: "Kompleksowe Rozwiązania Architektoniczne",
      subtitle: "Od strategicznych projektów technicznych po autonomiczne roje agentów i wysokowydajne backendy telemetryczne.",
      s1_title: "W Pełni Autonomiczny Rozwój Aplikacji",
      s1_desc: "Kompleksowy rozwój oprogramowania produkcyjnego realizowany przez skoordynowane roje multi-agentowe z autonomicznymi pętlami samonaprawczymi.",
      s1_d1: "Autonomiczne Roje Syntezy Funkcjonalności",
      s1_d2: "Samonaprawa Błędów & Automatyczne Poprawki CI",
      s1_d3: "Deterministyczne Kontrakty Narzędzi i API",
      s2_title: "Spec-Kit AI & Przepływy Agentowe",
      s2_desc: "Projektowanie deterministycznych potoków AI, dedykowanych grafów (ComfyUI / LangGraph), agentów narzędziowych oraz korporacyjnego RAG.",
      s2_d1: "Formalne Modelowanie Domeny Spec-Kit",
      s2_d2: "Deterministyczny RAG z Cytowaniem Źródeł",
      s2_d3: "Integracje Computer Vision (Ultralytics)",
      s3_title: "Architektura Oprogramowania Enterprise",
      s3_desc: "Projektowanie odpornych, wysokoprzepustowych mikrousług, wzorców CQRS i chmurowych infrastruktur dla sektora finansowego i przemysłowego.",
      s3_d1: "Java 21 / Spring Boot & Symfony 8 Core",
      s3_d2: "Infrastruktura Azure jako Kod (Bicep/YAML)",
      s3_d3: "Projekty Systemowe C4 i Dekompozycja Usług",
      s4_title: "Wysokowydajne Systemy Telemetryczne i Przestrzenne",
      s4_desc: "Tworzenie rekurencyjnych, wielotenantowych silników zarządzania majątkiem i integracji danych przestrzennych (ESRI, Smallworld GIS).",
      s4_d1: "Silniki Telemetrii Maszyn Przemysłowych",
      s4_d2: "Potoki ETL w Databricks i Azure Data Factory",
      s4_d3: "Systemy Informacji Geograficznej (Smallworld, ESRI, PostGIS)",
      s5_title: "Wdrożenie Metodyki Spec-Kit AI w Zespołach",
      s5_desc: "Transformacja organizacji inżynieryjnych z chaotycznego korzystania z czatów AI w ustrukturyzowaną, deterministyczną pracę sterowaną specyfikacją.",
      s5_d1: "Standardy SDLC Spec-Kit i Dedykowane Narzędzia",
      s5_d2: "Audyty Prędkości i Spójności Kodu z AI",
      s5_d3: "Praktyczne Warsztaty dla Doświadczonych Inżynierów",
      s6_title: "Strategiczny Audyt i Projekt Architektury",
      s6_desc: "Głęboka analiza techniczna repozytoriów kodu, granic mikrousług, polityk bezpieczeństwa oraz gotowości na integrację z AI.",
      s6_d1: "10-Dniowy Kompleksowy Audyt Architektury",
      s6_d2: "Schematy Kontenerów i Komponentów C4",
      s6_d3: "Strategiczna Mapa Drogowa Modernizacji"
    },
    engagement: {
      tag: "Modele Współpracy",
      title: "Przejrzyste i Przewidywalne Modele Współpracy",
      subtitle: "Niezależnie od tego, czy potrzebujesz szybkiego audytu diagnostycznego, autonomicznego wdrożenia AI od A do Z, czy stałego doradztwa architektonicznego.",
      m1_badge: "DIAGNOSTYKA I AUDYT",
      m1_title: "10-Dniowy Strategiczny Audyt Architektury",
      m1_desc: "Szczegółowa inspekcja techniczna zastanego kodu, granic mikrousług, polityk bezpieczeństwa i gotowości na wdrożenie AI.",
      m1_timeline_lbl: "Czas Trwania",
      m1_timeline_val: "10 Dni Roboczych (Stały Zakres)",
      m1_d1: "Kompleksowy Audyt Kodu i Długu Technicznego",
      m1_d2: "Architektura Systemu C4 i Schematy Komponentów",
      m1_d3: "Weryfikacja Bezpieczeństwa, RODO i Izolacji Danych",
      m1_d4: "Strategiczna Mapa Drogowa Modernizacji i AI",
      m1_btn: "Zamów Audyt Architektury",
      m2_badge: "GŁÓWNE WDROŻENIE • MVP",
      m2_title: "Sprint Wdrożeniowy MVP (Fully Agentic Delivery)",
      m2_desc: "Kompleksowe wytworzenie oprogramowania produkcyjnego realizowane autonomicznie przez zespoły multi-agentowe w oparciu o kontrakty Spec-Kit i testy samonaprawcze.",
      m2_timeline_lbl: "Czas Trwania",
      m2_timeline_val: "Sprint 4 – 8 Tygodni",
      m2_d1: "Formalny Kontrakt Domenowy Spec-Kit i Modelowanie Niezmienników",
      m2_d2: "Autonomiczna Synteza Multi-Agentowa (Zero AI Slop)",
      m2_d3: "100% Zautomatyzowane Testy Kontraktów i Bramki CI",
      m2_d4: "Kod Produkcyjny & Wdrożenie Docker / Cloud",
      m2_btn: "Porozmawiajmy o Sprincie",
      m3_badge: "DORADZTWO I RETAINER",
      m3_title: "Fractional Principal Architect & Doradztwo",
      m3_desc: "Stałe strategiczne przywództwo architektoniczne, nadzór techniczny C4 oraz wdrażanie metodyki Spec-Kit dla rozwijających się zespołów inżynieryjnych.",
      m3_timeline_lbl: "Czas Trwania",
      m3_timeline_val: "Dedykowany Retainer Miesięczny",
      m3_d1: "Cotygodniowy Nadzór Architektoniczny i Code Review",
      m3_d2: "Standardy SDLC Spec-Kit i Mentoring Zespołu",
      m3_d3: "Sterowanie Architekturą Chmurową i High-Load Tier-1",
      m3_d4: "Bezpośredni Dostęp Asynchroniczny i Dedykowane Standupy",
      m3_btn: "Zapytaj o Retainer"
    },
    track_record: {
      tag: "Doświadczenie Projektowe (NDA)",
      title: "Sprawdzone Projekty w Skali Enterprise",
      subtitle: "Ponad 19 lat praktyki architektonicznej w tworzeniu i wdrażaniu systemów mission-critical dla bankowości, aparatury medycznej oraz przemysłowego IoT.",
      c1_client: "Wiodący Europejski Bank Komercyjny",
      c1_domain: "Bankowość i Finanse",
      c1_title: "Chmurowa Platforma Zarządzania Transakcjami Finansowymi",
      c1_desc: "Projekt architektury chmurowych narzędzi do obsługi transakcji finansowych dla czołowej instytucji bankowej w Europie. Stabilizacja infrastruktury, automatyzacja wdrożeń (CI/CD) i dekompozycja usług w restrykcyjnym środowisku bankowości regulowanej.",
      c1_m1_val: "-40% Czasu Wdrożenia",
      c1_m1_lbl: "Przyspieszenie Cyklu Wydań",
      c1_m2_val: "Zero Przestojów",
      c1_m2_lbl: "100% Deklaratywny IaC w Rozliczeniach",
      c2_client: "Przemysł Ciężki i Wydobywczy",
      c2_domain: "Przemysłowy IoT & Asset ERP",
      c2_title: "Silnik Telemetrii i Prewencyjnego Utrzymania Ruchu",
      c2_desc: "Główny architekt i programista wielotenantowej platformy telemetrycznej dla rozproszonych wież wiertniczych i ciężkiego parku maszynowego. Opracowanie rekurencyjnych struktur danych przeliczających dni pracy, metry odwiertów, motogodziny oraz automatyczne alarmy progowe.",
      c2_m1_val: "99.99% Niezawodności",
      c2_m1_lbl: "Telemetria i Detekcja Anomalii",
      c2_m2_val: "Ciągłość Pracy",
      c2_m2_lbl: "Automatyzacja Prewencji Awarii",
      c3_client: "Autonomiczny Produkt B2B SaaS AI",
      c3_domain: "100% Rozwój Autonomiczny (Agentic Dev)",
      c3_title: "Silnik Reputacji AI i Wielotenantowy Triage Zgłoszeń",
      c3_desc_html: `Architektura wielotenantowej platformy B2B do zarządzania reputacją z 45-sekundowym procesem triage, wymiennymi modelami LLM, precyzyjnym rozliczaniem tokenów i pełną izolacją danych. <strong>100% Autonomiczna Synteza Multi-Agentowa: Cały kod produkcyjny, migracje baz danych i zestawy testów powstały w 100% autonomicznie przez agentów AI pod formalnym nadzorem architektonicznym i bramkami CI — bez ręcznego pisania kodu przez programistów.</strong>`,
      c3_m1_val: "3 Mies. → 2 Tyg.",
      c3_m1_lbl: "Przyspieszenie Time-to-Market",
      c3_m2_val: "100% Synteza AI",
      c3_m2_lbl: "0 Ręcznego Kodowania / 100% Bramek CI",
      c4_client: "Międzynarodowa Firma Doradcza (Wielka Czwórka)",
      c4_domain: "Platforma Analityczna Transakcji M&A",
      c4_title: "Analityka Fuzji i Przejęć (M&A) oraz Wizualizacja Danych",
      c4_desc: "Architektura warstwy frontendowej platformy analitycznej wspierającej procesy transakcyjne fuzji i przejęć o wartości setek milionów dolarów. Interaktywne matryce danych i bezawaryjne wdrażanie poprawek w czasie rzeczywistym w globalnych strefach czasowych.",
      c4_m1_val: "Portfel $100M+",
      c4_m1_lbl: "Wartość Obsługiwanych Transakcji",
      c4_m2_val: "Wysoka Dostępność",
      c4_m2_lbl: "Wdrażanie Poprawek bez Przestojów",
      c5_client: "Globalny Koncern Biotechnologiczny",
      c5_domain: "Aparatura Diagnostyczna Biotech",
      c5_title: "Oprogramowanie Sondy i Klasyfikatora Próbek Medycznych",
      c5_desc: "Projekt przebudowy architektury i dekompozycji kodu pętli telemetrycznych aparatury do automatycznej analizy klinicznej. Wyeliminowanie ukrytych wyścigów wątków (race conditions) oraz błędów logiki asynchronicznej poprzez modularną architekturę.",
      c5_m1_val: "100% Zgodności",
      c5_m1_lbl: "Restrykcyjne Normy Diagnostyki Medycznej",
      c5_m2_val: "Zero Wyścigów Wątków",
      c5_m2_lbl: "Odseparowane Moduły Telemetrii",
      c6_client: "SaaS Reklamy Programatycznej",
      c6_domain: "Rekrutacja & Systemy Reklamowe",
      c6_title: "Modułowy System ATS i Automatyzacja Reklam Społecznościowych",
      c6_desc: "Nadzór nad architekturą modernizacji platformy do postaci nowoczesnego środowiska łączącego automatyzację kampanii w social media z modułowym systemem śledzenia aplikacji (ATS).",
      c6_m1_val: "Wysoka Prędkość",
      c6_m1_lbl: "Międzynarodowy Zespół Inżynierski",
      c6_m2_val: "Full-Stack REST",
      c6_m2_lbl: "Architektura Integracji API"
    },
    architect: {
      tag: "Główny Architekt",
      name: "Piotr Solarz-Wnęk",
      subtitle: "Mgr inż. Informatycznych Systemów Przemysłowych | 19+ Lat Doświadczenia",
      bio_p1_html: `Architekt Oprogramowania, inżynier AI-Native oraz były Dyrektor Jednostki Biznesowej, który rozwijał międzynarodowe działy inżynieryjne do 30+ specjalistów w sektorach Bankowości, Energetyki i Przemysłu 4.0. Certyfikowany Architekt Azure (AZ-900), ITIL Foundation oraz absolwent programu <em>Droga Nowoczesnego Architekta</em>.`,
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
      title: "Umów Przegląd Architektury",
      subtitle: "Niezależnie od tego, czy planujesz wdrożyć autonomiczną aplikację AI, wyeliminować błędy AI dzięki Spec-Kit, czy zmodernizować istniejące systemy — zaprojektujmy właściwe rozwiązanie.",
      direct_email_title: "Bezpośredni Email",
      response_time: "Średni czas odpowiedzi: < 4 godziny robocze",
      phone_title: "Telefon / WhatsApp",
      timezone: "Europa / Warszawa (UTC+1 / UTC+2)",
      availability_title: "Dostępność Projektowa",
      availability_val: "Sprinty Strategiczne & Retainery",
      availability_desc: "Projekty zdalne / hybrydowe w UE",
      sla_title: "Jak Wygląda Współpraca (SLA)",
      sla_step1_html: `<strong style="color: var(--text-primary);">Analiza Zgłoszenia (&lt; 4h):</strong> Piotr osobiście analizuje wymagania z zachowaniem pełnej poufności (NDA).`,
      sla_step2_html: `<strong style="color: var(--text-primary);">Rozmowa Techniczna:</strong> 30-minutowa merytoryczna konsultacja z Głównym Architektem. Zero marketingu.`,
      sla_step3_html: `<strong style="color: var(--text-primary);">Plan Działania (24h):</strong> Konkretny zakres 10-Dniowego Audytu lub Sprintu Wdrożeniowego.`,
      form_name_label: "Imię i Nazwisko / Firma *",
      form_name_placeholder: "np. Jan Kowalski (CTO, Fintech)",
      form_email_label: "Służbowy Adres Email *",
      form_email_placeholder: "jan@firma.pl",
      form_service_label: "Główny Obszar Zainteresowania",
      opt_agentic: "W Pełni Autonomiczny Rozwój Aplikacji (Agentic Dev)",
      opt_speckit: "Spec-Kit AI & Systemy Agentowe",
      opt_enterprise: "Architektura Enterprise & Modernizacja Chmurowa",
      opt_iot: "Systemy Telemetryczne High-Load & IoT / GIS",
      opt_enablement: "Szkolenia Spec-Kit AI dla Zespołów Inżynierskich",
      opt_audit: "10-Dniowy Kompleksowy Audyt Architektury",
      form_msg_label: "Opis Projektu / Cele Techniczne *",
      form_msg_placeholder: "Opisz architekturę systemu, wyzwania techniczne, harmonogram lub stos technologiczny...",
      nda_text_html: `<strong style="color: var(--text-primary);">Wymagana Umowa Poufności (NDA):</strong> Podpisanie obustronnej umowy NDA przed rozmową techniczną.`,
      form_submit_btn: "Wyślij Zapytanie Ofertowe",
      sending_inquiry: "Wysyłanie zapytania...",
      feedback_success: "Dziękuję! Twoja wiadomość została pomyślnie wysłana. Piotr Solarz-Wnęk skontaktuje się wkrótce.",
      feedback_error: "Wystąpił błąd. Skontaktuj się bezpośrednio: piotr.solarz-wnek@apsw.pl",
      feedback_fallback_html: `✓ Zapytanie zapisane. Możesz także skontaktować się bezpośrednio: <a href="mailto:piotr.solarz-wnek@apsw.pl" style="color: var(--text-brand); text-decoration: underline; font-weight: 600;">piotr.solarz-wnek@apsw.pl</a>`,
      copied_tooltip: "Skopiowano!"
    },
    footer: {
      footer_desc: "APSW — Architektura Rozwiązań AI-Native i Inżynieria Enterprise prowadzona przez Piotra Solarz-Wnęka. Zero AI Slop. Deterministyczne systemy o wysokiej dostępności produkcyjnej.",
      footer_deploy: "Gotowość Wdrożeniowa: Cyber_Folks / Hetzner",
      col1_title: "Metodyka & Technologie",
      col2_title: "Usługi",
      col3_title: "Dostępność i Biuro",
      rights: "© 2026 APSW — Piotr Solarz-Wnęk. Wszelkie prawa zastrzeżone."
    },
    stages: {
      1: {
        title: "Etap 01: Formalna Specyfikacja Domeny i Kontraktów",
        desc: "Zamiast chaotycznych promptów w czacie, architekt definiuje deterministyczne schematy domeny, ścisłe kontrakty wejścia/wyjścia, niezmienniki biznesowe oraz macierze przypadków brzegowych w formacie czytelnym dla człowieka i maszyn."
      },
      2: {
        title: "Etap 02: Architektoniczne Guardrails i Wstrzykiwanie Granic C4",
        desc: "Wstrzykuje ścisłe ograniczenia architektoniczne do okna kontekstu agenta: granice mikrousług, polityki bezpieczeństwa (RODO/PCI-DSS), poziomy izolacji baz danych i bezkompromisowe standardy kodu."
      },
      3: {
        title: "Etap 03: W Pełni Autonomiczna Synteza Kodu i Orkiestracja Agentów",
        desc: "Autonomiczni wyspecjalizowani agenci (Planner, Worker, Test Generator) syntetyzują czysty kod, skrypty migracji i pełne zestawy testów jednostkowych oraz integracyjnych, weryfikowane pod kątem kontraktu."
      },
      4: {
        title: "Etap 04: Deterministyczna Weryfikacja i Bramki Jakości CI",
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
