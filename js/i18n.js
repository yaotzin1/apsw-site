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
      solutions_group: "Solutions",
      methodology_group: "Methodology",
      proof_group: "Track Record",
      architecture: "C4 Blueprints",
      roi_modeler: "ROI Modeler",
      anti_slop: "Anti-Slop Triage",
      governance: "Governance",
      track_record: "Case Studies (NDA)",
      services: "Services",
      speckit: "Spec-Kit AI",
      agentic_dev: "Agentic Dev",
      engagement: "Engagements",
      nda_protocol: "NDA Protocol",
      career: "Career",
      about: "About",
      contact: "Contact",
      book_review: "Book Review",
      theme_toggle_title: "Toggle theme",
      lang_toggle_aria: "Switch language"
    },
    nda_protocol: {
      tag: "Confidentiality & Compliance",
      title: "Bilateral NDA Protocol & IP Protection",
      subtitle: "How APSW guarantees 100% trade secret isolation, oneNDA standard compliance, and zero AI data leakage.",
      p1_title: "1. Bilateral oneNDA Standard",
      p1_desc: "We operate under the globally recognized oneNDA framework. Zero legal friction, standardized mutual terms, and instant electronic execution before any code review or architecture deep-dive.",
      p2_title: "2. Rigorous Sanitization & Anonymization",
      p2_desc: "Every system architecture, case study, and telemetry dataset on this site is legally sanitized under active non-disclosure agreements. Verifiable technical metrics are shared; client trade secrets are safeguarded.",
      p3_title: "3. Zero IP Contamination (Private Sandboxes)",
      p3_desc: "Your source code, data models, and business logic are never ingested to train external foundation models. All agentic synthesis executes within private, ephemeral client sandboxes with strict egress rules.",
      sla_title: "Mutual NDA SLA Commitment",
      sla_desc: "Need to execute a mutual NDA before our technical alignment call? We provide a countersigned oneNDA agreement within 2 business hours.",
      btn_request: "Request Bilateral oneNDA Execution"
    },
    architecture: {
      tag: "C4 System Blueprints",
      title: "Battle-Tested Production System Topologies",
      subtitle: "Interactive inspection of mission-critical platforms designed and maintained by Piotr Solarz-Wnęk across institutional banking, insurance monolith modernization, autonomous SaaS, and heavy industrial IoT.",
      nav_bank: "Tier-1 Bank Transaction Core",
      nav_saas: "Autonomous B2B SaaS",
      nav_insurance: "Insurance Monolith Strangler-Fig",
      nav_iot: "Industrial Telemetry Tree",
      invariant_label: "Architectural Invariant",
      risk_label: "Enterprise Risk Mitigated",
      code_label: "Production Contract / Code Excerpt"
    },
    roi_modeler: {
      tag: "Executive Value Modeler",
      title: "Calculate Your Delivery Velocity & Risk Elimination",
      subtitle: "Interactive simulation comparing traditional dev agency burn against APSW's Spec-Kit & Fully Agentic architecture.",
      domain_title: "1. Select Primary Architectural Challenge",
      bottleneck_title: "2. Identify Current Core Bottleneck",
      scale_title: "3. Scope & Organizational Complexity",
      time_saved_lbl: "Estimated Timeline",
      capital_saved_lbl: "Capital Efficiency",
      risk_elim_lbl: "Delivery Risk Elimination",
      recommended_lbl: "Recommended Architecture Moat",
      btn_apply: "Apply This Scope to Architecture Review",
      btn_copy_rfp: "Copy Scoped Executive Spec (JSON)"
    },
    anti_slop: {
      tag: "The Anti-AI-Slop Doctrine",
      title: "Human-in-the-Loop Reputation Defense",
      subtitle: "Why 90% of AI prototypes fail in production: Unconstrained prompts hallucinate false promises and damage brand trust. APSW replaces prompt chaos with calibrated tone embeddings and a 45-second daily triage conveyor belt.",
      scenarios_label: "Select Test Scenario:",
      sc_critical: "1-Star Critical Review",
      sc_delay: "3-Star Delayed Delivery",
      sc_vip: "5-Star Corporate Client",
      btn_approve: "Approve & Publish (Optimistic UI)",
      btn_reject: "Reject / Re-Calibrate",
      btn_reset: "Reset Review Card",
      badge_slop: "Generic AI Slop (Uncontrolled LLM)",
      badge_calibrated: "APSW Calibrated Brand Voice"
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
    governance: {
      tag: "The Governance Layer",
      title: "The rules the agents cannot break",
      subtitle: "Everything else on this page is a claim. This is the mechanism behind it: written, version-controlled constraints that every agent reads before it writes a line of code. Read them yourself.",
      meta_rules: "rules",
      meta_workflows: "workflows",
      meta_skills: "skills",
      meta_stages: "pipeline stages",
      meta_note: "Excerpt — 5 of 35 files, client specifics removed",
      tree_aria: "Governance documents",
      skills_note: "14 role-scoped skills",
      cap_spec_pipeline: "the six stages behind the four-stage summary on this page",
      cap_review: "7 questions, answered in writing on every pull request",
      cap_testing: "coverage is a merge condition, not a target",
      cap_security: "non-negotiable on regulated-sector delivery",
      cap_verification: "executed before completion is reported",
      gate_label: "No test, no merge",
      gate_note: "All four must pass before an agent may report a task complete.",
      footer_link: "Agent Governance Layer"
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
      subtitle: "19+ years delivering mission-critical platforms across institutional finance, insurance, biomedical instruments, and heavy industry IoT.",
      nda_notice_title: "Confidentiality Guarantee:",
      nda_notice_body: "Client names, internal codebases, and infrastructure endpoints are sanitized under active bilateral NDAs. Verifiable metrics, tech stacks, and architectural designs reflect real production outcomes.",
      nda_notice_link: "Read NDA Protocol →",
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
      c6_m2_lbl: "Ad Engine Interfaces",
      c7_client: "National Energy Grid Operator",
      c7_domain: "Energy & Geospatial Systems",
      c7_title: "Distributed GIS Transaction Queue Engine",
      c7_desc: "Engineered an enterprise transaction queuing engine for a national power grid operator, resolving database conflict isolation inside distributed multi-user GIS databases. Designed SOAP/SOA integration patterns across WebSphere nodes to sequence heavy data commits, and delivered regulated energy-sector blueprints under strict industry compliance.",
      c7_m1_val: "Zero Conflicts",
      c7_m1_lbl: "Multi-User Spatial Commit Isolation",
      c7_m2_val: "Regulated Delivery",
      c7_m2_lbl: "Polish Energy Sector Compliance",
      c8_client: "Tier-1 European Insurance Group",
      c8_domain: "Insurance Platform Modernization",
      c8_title: "Monolith-to-Microservices Platform Migration",
      c8_desc: "Solution Architect driving the decomposition of a legacy insurance monolith into a domain-aligned microservice landscape. Defining service boundaries, integration contracts and migration sequencing, while steering Java, Node.js and ReactJS delivery streams inside a strictly governed, regulated enterprise environment.",
      c8_m1_val: "Monolith → Microservices",
      c8_m1_lbl: "Domain-Aligned Service Decomposition",
      c8_m2_val: "Incremental Cutover",
      c8_m2_lbl: "Strangler-Fig Migration Pattern",
      filter_aria: "Filter case studies by domain",
      filter_all: "All Engagements",
      filter_finance: "Finance & Insurance",
      filter_industry: "Industry & Energy",
      filter_saas: "SaaS Platforms",
      filter_biotech: "Biotech",
      filter_ai: "Agentic AI",
      cta_title: "Recognise your problem in one of these?",
      cta_desc: "Book a 45-minute architecture review. You leave with a written assessment of your delivery risk — no obligation, no sales deck.",
      cta_primary: "Book Architecture Review",
      cta_secondary: "See Engagement Models"
    },
    career: {
      tag: "Professional Chronology",
      title: "19+ Years, Continuously Delivering",
      subtitle: "An unbroken engineering track from Junior Java Developer (2007) to Principal Solution Architect — employers named, client engagements NDA-protected.",
      e1_period: "2019 — Present",
      e1_company: "APSW",
      e1_role: "Founder & Principal Solution Architect",
      e1_desc: "Independent AI-native architecture practice. Authored the Spec-Kit methodology and Fully Agentic Development pipeline, delivering an autonomous multi-tenant B2B SaaS whose entire production codebase and test suites were synthesized by AI agents under formal architectural direction. Architected a multi-tenant industrial asset and preventative-maintenance platform built on recursive telemetry tree models.",
      e2_period: "2026 — Present",
      e2_company: "EMAGINE",
      e2_role: "Solution Architect",
      e2_desc: "Solution Architect for a Tier-1 European insurance group. Leading the decomposition of a legacy monolith into a domain-aligned microservice architecture — defining service boundaries, integration contracts and migration sequencing across Java, Node.js and ReactJS delivery streams, applying C4 modelling and cloud-native standards in a strictly governed regulated environment.",
      e3_period: "2019 — 2026",
      e3_company: "BCF",
      e3_role: "Software Architect & Business Unit Head",
      e3_desc: "Grew a global delivery unit from inception to 30+ engineers across Mobile, Java and PHP streams. Technical Lead and Solution Architect for a Tier-1 European bank — cloud-native transaction utilities, declarative YAML IaC, and ETL pipelines moving ~10 GB daily through Azure Data Factory and Databricks, cutting deployment cycle time by 40%.",
      e4_period: "2012 — 2019",
      e4_company: "REC Global → GlobalLogic (acquired)",
      e4_role: "Software Engineer → Technical Lead → Architect",
      e4_desc: "Held technical ownership across 10+ international projects, leading cross-functional teams of 4–10 engineers. Progressed from hands-on delivery into architecture and strategic planning — microservice extraction of legacy fleet-management systems, enterprise compliance auditing with LDAP/Kerberos at 85% automated test coverage, and point-of-sale platform migration to web-native services.",
      e5_period: "2011 — 2012",
      e5_company: "APATOR RECTOR",
      e5_role: "System Designer & Technical Leader",
      e5_desc: "Designed software blueprints for the Polish energy sector under rigorous industry regulation. Built a transaction queuing engine handling conflict isolation across distributed multi-user GIS databases for a national grid operator, integrating SOA services over IBM WebSphere.",
      e6_period: "2007 — 2011",
      e6_company: "ASTEC",
      e6_role: "Junior Java Developer → GSS & Java Specialist / Technical Lead",
      e6_desc: "Enterprise Java and geospatial systems engineering. Ported desktop Smallworld GIS operations into web-native modules for an international telecom infrastructure operator, built PKI-secured web-service clients for a global energy technology vendor, and delivered on-site GeoSpatial Server training in Switzerland and Cambridge."
    },
    architect: {
      tag: "Principal Architect",
      name: "Piotr Solarz-Wnęk",
      subtitle: "MSc Informatic Industrial Systems | 19+ Years Experience",
      bio_p1_html: `Software Architect, AI-Native developer, and former Business Unit Head who expanded global engineering units to 30+ engineers across Banking, Insurance, Energy, and Industry 4.0. Certified Azure Architect (AZ-900), ITIL Foundation, and alumni of <em>Droga Nowoczesnego Architekta</em>.`,
      bio_p2_html: `Pioneering <strong>Spec-Kit</strong> and <strong>Fully Agentic Development</strong> to make AI-assisted engineering deterministic, safe, and free from AI slop.`,
      linkedin_btn: "LinkedIn Profile",
      email_btn: "Direct Email",
      github_btn: "GitHub",
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
      err_form_token_missing: "This form could not be verified. Please reload the page and try again, or email piotr.solarz-wnek@apsw.pl directly.",
      err_form_token_invalid: "This form could not be verified. Please reload the page and try again, or email piotr.solarz-wnek@apsw.pl directly.",
      err_form_token_expired: "This page has been open too long. Please reload it and send your inquiry again.",
      err_rate_limited: "Too many submissions from this connection. Please wait a few minutes, or email piotr.solarz-wnek@apsw.pl directly.",
      err_invalid_name: "Please provide a valid name.",
      err_invalid_email: "Please provide a valid work email address.",
      err_invalid_message: "Please describe your project in between 8 and 5000 characters.",
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
      page_title: "APSW | Architektura rozwiązań AI-Native i systemy enterprise",
      page_description: "Piotr Solarz-Wnęk — ponad 19 lat doświadczenia w architekturze IT. W pełni autonomiczny rozwój oprogramowania (Agentic Dev), metodyka Spec-Kit, Java 21, Symfony, chmura i przemysłowy IoT. Zero AI Slop."
    },
    nav: {
      brand_sub: "ARCHITEKTURA AI-NATIVE",
      solutions_group: "Rozwiązania",
      methodology_group: "Metodyka",
      proof_group: "Doświadczenie",
      architecture: "Wzorce C4",
      roi_modeler: "Modeler ROI",
      anti_slop: "Triaż Anti-Slop",
      governance: "Nadzór",
      track_record: "Case Studies (NDA)",
      services: "Usługi",
      speckit: "Metodyka Spec-Kit",
      agentic_dev: "Agentic Dev",
      engagement: "Współpraca",
      nda_protocol: "Protokół NDA",
      career: "Kariera",
      about: "O mnie",
      contact: "Kontakt",
      book_review: "Umów audyt",
      theme_toggle_title: "Przełącz motyw",
      lang_toggle_aria: "Zmień język"
    },
    nda_protocol: {
      tag: "Poufność i Zgodność",
      title: "Bilateralny Protokół NDA i Ochrona IP",
      subtitle: "Jak APSW gwarantuje 100% izolacji tajemnic przedsiębiorstwa, standard oneNDA i brak wycieku danych do modeli AI.",
      p1_title: "1. Standard Bilateralny oneNDA",
      p1_desc: "Stosujemy globalny standard oneNDA. Brak przewlekłych negocjacji prawnych, ustandaryzowane warunki obustronne i podpisanie umowy w 5 minut przed pierwszym przeglądem kodu.",
      p2_title: "2. Rygorystyczna Anonimizacja i Sanityzacja",
      p2_desc: "Wszystkie studia przypadków i dane telemetryczne na tej stronie zostały prawnie zanonimizowane zgodnie z umowami NDA. Prawdziwe metryki są prezentowane; tajemnice klientów pozostają w 100% bezpieczne.",
      p3_title: "3. Brak Kontaminacji IP (Prywatne Sandboxy)",
      p3_desc: "Twój kod, schematy i logika biznesowa nigdy nie służą do trenowania zewnętrznych modeli LLM. Synteza agentowa działa w prywatnych, izolowanych środowiskach z zakazem retencji danych.",
      sla_title: "Zobowiązanie SLA do Umowy NDA",
      sla_desc: "Wymagasz podpisania NDA przed techniczną rozmową wstępną? Odsyłamy podpisany obustronny oneNDA w ciągu 2 godzin roboczych.",
      btn_request: "Zgłoś Chęć Podpisania oneNDA"
    },
    architecture: {
      tag: "Wzorce Architektoniczne C4",
      title: "Sprawdzone na Produkcji Topologie Systemowe",
      subtitle: "Interaktywny wgląd w architekturę systemów krytycznych zaprojektowanych i prowadzonych przez Piotra Solarza-Wnęka w bankowości, ubezpieczeniach, SaaS i przemyśle ciężkim.",
      nav_bank: "Rdzeń Transakcyjny Banku Tier-1",
      nav_saas: "Autonomiczny B2B SaaS",
      nav_insurance: "Monolit Ubezpieczeniowy Strangler-Fig",
      nav_iot: "Przemysłowe Drzewo Telemetrii",
      invariant_label: "Reguła Architektoniczna",
      risk_label: "Wyeliminowane Ryzyko Biznesowe",
      code_label: "Wycinek Kontraktu / Kodu"
    },
    roi_modeler: {
      tag: "Modeler Wartości i Ryzyka",
      title: "Oblicz Tempo Wdrożenia i Eliminację Ryzyka",
      subtitle: "Interaktywna symulacja porównująca koszty tradycyjnych agencji ze specyfikacją Spec-Kit i autonomiczną architekturą APSW.",
      domain_title: "1. Wybierz Główny Obszar Architektury",
      bottleneck_title: "2. Zidentyfikuj Kluczowe Wąskie Gardło",
      scale_title: "3. Zakres i Skala Organizacyjna",
      time_saved_lbl: "Szacowany Czas Realizacji",
      capital_saved_lbl: "Efektywność Kapitałowa",
      risk_elim_lbl: "Redukcja Ryzyka Wdrożeniowego",
      recommended_lbl: "Rekomendowana Przewaga Architektoniczna",
      btn_apply: "Przenieś Zakres do Formularza Audytu",
      btn_copy_rfp: "Kopiuj Specyfikację RFP (JSON)"
    },
    anti_slop: {
      tag: "Doktryna Przeciwko AI Slop",
      title: "Obrona Reputacji Human-in-the-Loop",
      subtitle: "Dlaczego 90% prototypów AI zawodzi na produkcji: Niekontrolowane prompty halucynują fałszywe obietnice niszcząc markę. APSW zastępuje chaos kalibracją wektorową i 45-sekundowym triażem dziennym.",
      scenarios_label: "Wybierz Scenariusz Testowy:",
      sc_critical: "1-Gwiazdkowa Krytyka",
      sc_delay: "3-Gwiazdkowe Opóźnienie",
      sc_vip: "5-Gwiazdkowy Klient VIP",
      btn_approve: "Zatwierdź i Opublikuj (Optimistic UI)",
      btn_reject: "Odrzuć / Rekalibruj",
      btn_reset: "Przywróć Kartę Triażu",
      badge_slop: "Typowy AI Slop (Niekontrolowany LLM)",
      badge_calibrated: "Skalibrowany Głos Marki APSW"
    },
    hero: {
      status_badge: "● Dostępny dla projektów strategicznych AI i architektury enterprise",
      title_html: `Koniec z kruchymi prototypami AI. <br><span class="title-accent">Czas na niezawodne systemy produkcyjne.</span>`,
      description_html: `Wdrożenie AI w oprogramowaniu enterprise jest proste na etapie prototypu, lecz niezwykle trudne w stabilnej pracy produkcyjnej. Opierając się na ponad 19 latach doświadczenia architektonicznego w bankowości i przemyśle, APSW tworzy <strong>deterministyczne, w pełni autonomiczne aplikacje</strong> oparte na formalnych kontraktach i zasadzie Zero AI Slop.`,
      cta_speckit: "Poznaj metodykę Spec-Kit",
      cta_engagement: "Modele współpracy",
      metric_years_val: "19+ lat",
      metric_years_lbl: "Doświadczenia w architekturze enterprise",
      metric_velocity_val: "5x szybciej",
      metric_velocity_lbl: "Autonomiczne zespoły multi-agentowe",
      metric_regulated_val: "Sektor regulowany",
      metric_regulated_lbl: "Sprawdzone w bankowości i biotech",
      metric_anti_slop_val: "Zero AI Slop",
      metric_anti_slop_lbl: "Deterministyczne bramki jakości CI"
    },
    governance: {
      tag: "Warstwa nadzoru",
      title: "Zasady, których agenci nie mogą złamać",
      subtitle: "Wszystko inne na tej stronie to deklaracja. To jest mechanizm, który za nią stoi: spisane, wersjonowane ograniczenia, które każdy agent czyta, zanim napisze linijkę kodu. Przeczytaj je sam.",
      meta_rules: "reguł",
      meta_workflows: "procesów",
      meta_skills: "umiejętności",
      meta_stages: "etapów pipeline’u",
      meta_note: "Fragment — 5 z 35 plików, szczegóły klientów usunięte. Dokumenty w języku źródłowym (angielskim).",
      tree_aria: "Dokumenty nadzoru",
      skills_note: "14 umiejętności przypisanych do ról",
      cap_spec_pipeline: "sześć etapów stojących za czteroetapowym skrótem na tej stronie",
      cap_review: "7 pytań, na które trzeba odpowiedzieć pisemnie przy każdym pull requeście",
      cap_testing: "pokrycie testami jest warunkiem merge’a, nie celem",
      cap_security: "nienegocjowalne przy projektach dla sektora regulowanego",
      cap_verification: "wykonywane, zanim zadanie zostanie zgłoszone jako gotowe",
      gate_label: "Bez testów nie ma merge’a",
      gate_note: "Wszystkie cztery muszą przejść, zanim agent może zgłosić zadanie jako ukończone.",
      footer_link: "Warstwa nadzoru agentów"
    },
    speckit: {
      tag: "Metodyka inżynieryjna",
      title_html: `Podejście Spec-Kit: <br>Inżynieria AI sterowana specyfikacją`,
      subtitle_html: `Większość inicjatyw GenAI zawodzi na produkcji, ponieważ chaotyczny prompting generuje kod niskiej jakości („AI slop”) — niedeterministyczny, z ukrytymi błędami i halucynacjami. <strong>Spec-Kit zastępuje metodę prób i błędów formalnymi, wykonywalnymi kontraktami oraz automatyczną weryfikacją w CI.</strong>`,
      stage1_badge: "ETAP 01",
      stage1_title: "Formalna specyfikacja domeny",
      stage1_desc: "Projektowanie maszynowo czytelnych schematów, ścisłych niezmienników biznesowych i kontraktów brzegowych przed napisaniem kodu.",
      stage1_guarantee: "GWARANCJA: Zero pełzania zakresu",
      stage2_badge: "ETAP 02",
      stage2_title: "Architektoniczne guardrails",
      stage2_desc: "Osadzanie granic C4, wymogów bezpieczeństwa (RODO/PCI-DSS), poziomów izolacji baz danych i wzorców asynchronicznych.",
      stage2_guarantee: "GWARANCJA: 100% bezpieczeństwa i izolacji",
      stage3_badge: "ETAP 03",
      stage3_title: "Autonomiczna synteza kodu",
      stage3_desc: "Wyspecjalizowane zespoły agentów (Planner-Executor-Critic) generują czysty kod w izolacji kontekstowej oraz 100% testów weryfikowanych ze specyfikacją.",
      stage3_guarantee: "GWARANCJA: 5x szybsze wejście na rynek",
      stage4_badge: "ETAP 04",
      stage4_title: "Deterministyczne bramki jakości CI",
      stage4_desc: "Ciągłe zautomatyzowane testy kontraktowe, analiza statyczna, benchmarki wydajnościowe i restrykcyjne bramki eliminacji halucynacji.",
      stage4_guarantee: "GWARANCJA: Zero regresji na produkcji",
      comp_dim: "Wymiar inżynieryjny",
      comp_slop_header: "Standardowy czat AI / prompting („AI Slop”)",
      comp_speckit_header: "Metodyka APSW Spec-Kit",
      comp_dim_1: "Determinizm wyników",
      comp_slop_1: "✕ Niedeterministyczny, dryf probabilistyczny",
      comp_speckit_1: "✓ 100% deterministyczny według kontraktów schematów",
      comp_dim_2: "Kontrola architektoniczna",
      comp_slop_2: "✕ Niekontrolowany spaghetti code i halucynacje",
      comp_speckit_2: "✓ Ścisłe egzekwowanie granic C4 i czysta logika domenowa",
      comp_dim_3: "Weryfikacja enterprise",
      comp_slop_3: "✕ Ręczna, subiektywna inspekcja „na oko”",
      comp_speckit_3: "✓ Zautomatyzowane testy kontraktów i bramki CI („tanie w weryfikacji”)",
      comp_dim_4: "Zgodność regulacyjna",
      comp_slop_4: "✕ Wysokie ryzyko wycieku danych i luk bezpieczeństwa",
      comp_speckit_4: "✓ Izolowane środowiska typu sandbox i pełna zgodność z RODO / PCI-DSS"
    },
    agentic: {
      tag: "Inżynieria autonomiczna",
      title: "W pełni autonomiczny rozwój aplikacji (Agentic Dev)",
      subtitle: "Wyjście poza asystentów typu copilot na rzecz kompleksowych potoków multi-agentowych, które projektują architekturę, piszą kod, testują i samoczynnie naprawiają błędy pod nadzorem głównego architekta.",
      feat1_title: "Hierarchiczne zespoły multi-agentowe",
      feat1_desc: "Koordynacja wyspecjalizowanych subagentów: Plannera, Architekta, Workera i Critica. Złożone zadania są dzielone na izolowane, równoległe wątki o ścisłych granicach kontekstu.",
      feat2_title: "Pętle samonaprawcze i zautomatyzowane testy",
      feat2_desc: "Agenci nie tylko generują kod; uruchamiają zestawy testów, analizują błędy kompilacji, diagnozują regresje i samoczynnie naprawiają błędy aż do 100% zaliczenia wymagań kontraktu.",
      feat3_title: "Deterministyczne narzędzia i bezpieczny sandbox",
      feat3_desc: "Autonomiczni agenci działają w odizolowanych, bezpiecznych środowiskach z deklaratywnymi interfejsami narzędzi (parsowanie AST, gałęzie Git, weryfikacja migracji bazodanowych i wyzwalacze CI).",
      swarm_badge: "AKTYWNY RÓJ",
      swarm_log1_html: `<span style="color: #a855f7;">[ARCHITECT_AGENT]</span> Załadowano specyfikację: <span style="color: #38bdf8;">SPEC-FINANCIAL-TRANSACTIONS-V3</span>`,
      swarm_log2_html: `<span style="color: #a855f7;">[ARCHITECT_AGENT]</span> Wymuszanie reguł C4 i reguł agregatów Spring Boot 3.3 / Java 21`,
      swarm_log3_html: `<span style="color: #38bdf8;">[PLANNER_AGENT]</span> Podział na 3 równoległe zadania (Entity, Controller, Karate Suite)`,
      swarm_log4_html: `<span style="color: #34d399;">[WORKER_SUBAGENT_01]</span> Wygenerowano idempotentny handler zatwierdzania transakcji`,
      swarm_log5_html: `<span style="color: #34d399;">[WORKER_SUBAGENT_02]</span> Uruchomiono testy: 34 zaliczone, 0 błędów`,
      swarm_log6_html: `<span style="color: #fbbf24;">[CRITIC_VERIFIER]</span> Analiza statyczna: 0 ostrzeżeń, certyfikat bezpieczeństwa OWASP`,
      swarm_log7_html: `✓ SYNTEZA_ZAKOŃCZONA: Gałąź produkcyjna gotowa do pull requesta.`
    },
    services: {
      tag: "Kompetencje",
      title: "Kompleksowe rozwiązania architektoniczne",
      subtitle: "Od strategicznych projektów technicznych po autonomiczne roje agentów i wysokowydajne backendy telemetryczne.",
      s1_title: "W pełni autonomiczny rozwój aplikacji",
      s1_desc: "Kompleksowy rozwój oprogramowania produkcyjnego realizowany przez skoordynowane roje multi-agentowe z autonomicznymi pętlami samonaprawczymi.",
      s1_d1: "Autonomiczne roje syntezy funkcjonalności",
      s1_d2: "Samonaprawa błędów i automatyczne poprawki CI",
      s1_d3: "Deterministyczne kontrakty narzędzi i API",
      s2_title: "Spec-Kit AI i przepływy agentowe",
      s2_desc: "Projektowanie deterministycznych potoków AI, dedykowanych grafów (ComfyUI / LangGraph), agentów narzędziowych oraz korporacyjnego RAG.",
      s2_d1: "Formalne modelowanie domeny Spec-Kit",
      s2_d2: "Deterministyczny RAG z cytowaniem źródeł",
      s2_d3: "Integracje Computer Vision (Ultralytics)",
      s3_title: "Architektura oprogramowania enterprise",
      s3_desc: "Projektowanie odpornych, wysokoprzepustowych mikrousług, wzorców CQRS i chmurowych infrastruktur dla sektora finansowego i przemysłowego.",
      s3_d1: "Java 21 / Spring Boot i Symfony 8 Core",
      s3_d2: "Infrastruktura Azure jako kod (Bicep/YAML)",
      s3_d3: "Projekty systemowe C4 i dekompozycja usług",
      s4_title: "Wysokowydajne systemy telemetryczne i przestrzenne",
      s4_desc: "Tworzenie rekurencyjnych silników zarządzania majątkiem w architekturze multi-tenant oraz integracji danych przestrzennych (ESRI, Smallworld GIS).",
      s4_d1: "Silniki telemetrii maszyn przemysłowych",
      s4_d2: "Potoki ETL w Databricks i Azure Data Factory",
      s4_d3: "Systemy informacji geograficznej (Smallworld, ESRI, PostGIS)",
      s5_title: "Wdrożenie metodyki Spec-Kit AI w zespołach",
      s5_desc: "Transformacja organizacji inżynieryjnych z chaotycznego korzystania z czatów AI w ustrukturyzowaną, deterministyczną pracę sterowaną specyfikacją.",
      s5_d1: "Standardy SDLC Spec-Kit i dedykowane narzędzia",
      s5_d2: "Audyty tempa i spójności kodu tworzonego z AI",
      s5_d3: "Praktyczne warsztaty dla doświadczonych inżynierów",
      s6_title: "Strategiczny audyt i projekt architektury",
      s6_desc: "Głęboka analiza techniczna repozytoriów kodu, granic mikrousług, polityk bezpieczeństwa oraz gotowości na integrację z AI.",
      s6_d1: "10-dniowy kompleksowy audyt architektury",
      s6_d2: "Schematy kontenerów i komponentów C4",
      s6_d3: "Strategiczna mapa drogowa modernizacji"
    },
    engagement: {
      tag: "Modele współpracy",
      title: "Przejrzyste i przewidywalne modele współpracy",
      subtitle: "Niezależnie od tego, czy potrzebujesz szybkiego audytu diagnostycznego, autonomicznego wdrożenia AI od A do Z, czy stałego doradztwa architektonicznego.",
      m1_badge: "DIAGNOSTYKA I AUDYT",
      m1_title: "10-dniowy strategiczny audyt architektury",
      m1_desc: "Szczegółowa inspekcja techniczna zastanego kodu, granic mikrousług, polityk bezpieczeństwa i gotowości na wdrożenie AI.",
      m1_timeline_lbl: "Czas trwania",
      m1_timeline_val: "10 dni roboczych (stały zakres)",
      m1_d1: "Kompleksowy audyt kodu i długu technicznego",
      m1_d2: "Architektura systemu C4 i schematy komponentów",
      m1_d3: "Weryfikacja bezpieczeństwa, RODO i izolacji danych",
      m1_d4: "Strategiczna mapa drogowa modernizacji i AI",
      m1_btn: "Zamów audyt architektury",
      m2_badge: "GŁÓWNE WDROŻENIE • MVP",
      m2_title: "Sprint wdrożeniowy MVP (Fully Agentic Delivery)",
      m2_desc: "Kompleksowe wytworzenie oprogramowania produkcyjnego realizowane autonomicznie przez zespoły multi-agentowe w oparciu o kontrakty Spec-Kit i testy samonaprawcze.",
      m2_timeline_lbl: "Czas trwania",
      m2_timeline_val: "Sprint 4 – 8 tygodni",
      m2_d1: "Formalny kontrakt domenowy Spec-Kit i modelowanie niezmienników",
      m2_d2: "Autonomiczna synteza multi-agentowa (Zero AI Slop)",
      m2_d3: "100% zautomatyzowane testy kontraktów i bramki CI",
      m2_d4: "Kod produkcyjny i wdrożenie Docker / Cloud",
      m2_btn: "Porozmawiajmy o sprincie",
      m3_badge: "DORADZTWO I RETAINER",
      m3_title: "Fractional Principal Architect i doradztwo",
      m3_desc: "Stałe strategiczne przywództwo architektoniczne, nadzór techniczny C4 oraz wdrażanie metodyki Spec-Kit dla rozwijających się zespołów inżynieryjnych.",
      m3_timeline_lbl: "Czas trwania",
      m3_timeline_val: "Dedykowany retainer miesięczny",
      m3_d1: "Cotygodniowy nadzór architektoniczny i Code Review",
      m3_d2: "Standardy SDLC Spec-Kit i mentoring zespołu",
      m3_d3: "Sterowanie architekturą chmurową i high-load Tier-1",
      m3_d4: "Bezpośredni dostęp asynchroniczny i dedykowane standupy",
      m3_btn: "Zapytaj o retainer"
    },
    track_record: {
      tag: "Doświadczenie projektowe (NDA)",
      title: "Sprawdzone projekty w skali enterprise",
      subtitle: "Ponad 19 lat praktyki architektonicznej w tworzeniu i wdrażaniu systemów mission-critical dla bankowości, aparatury medycznej oraz przemysłowego IoT.",
      nda_notice_title: "Gwarancja Poufności:",
      nda_notice_body: "Nazwy klientów, wewnętrzne bazy kodu i adresy infrastruktury są zanonimizowane zgodnie z bilateralnymi umowami NDA. Weryfikowalne metryki, stosy technologiczne i architektury odzwierciedlają rzeczywiste wdrożenia.",
      nda_notice_link: "Zobacz Protokół NDA →",
      c1_client: "Wiodący europejski bank komercyjny",
      c1_domain: "Bankowość i finanse",
      c1_title: "Chmurowa platforma zarządzania transakcjami finansowymi",
      c1_desc: "Projekt architektury chmurowych narzędzi do obsługi transakcji finansowych dla czołowej instytucji bankowej w Europie. Stabilizacja infrastruktury, automatyzacja wdrożeń (CI/CD) i dekompozycja usług w restrykcyjnym środowisku bankowości regulowanej.",
      c1_m1_val: "-40% czasu wdrożenia",
      c1_m1_lbl: "Przyspieszenie cyklu wydań",
      c1_m2_val: "Zero przestojów",
      c1_m2_lbl: "100% deklaratywny IaC w rozliczeniach",
      c2_client: "Przemysł ciężki i wydobywczy",
      c2_domain: "Przemysłowy IoT i asset ERP",
      c2_title: "Silnik telemetrii i prewencyjnego utrzymania ruchu",
      c2_desc: "Główny architekt i programista platformy telemetrycznej multi-tenant dla rozproszonych wież wiertniczych i ciężkiego parku maszynowego. Opracowanie rekurencyjnych struktur danych przeliczających dni pracy, metry odwiertów, motogodziny oraz automatyczne alarmy progowe.",
      c2_m1_val: "99.99% niezawodności",
      c2_m1_lbl: "Telemetria i detekcja anomalii",
      c2_m2_val: "Ciągłość pracy",
      c2_m2_lbl: "Automatyzacja prewencji awarii",
      c3_client: "Autonomiczny produkt B2B SaaS AI",
      c3_domain: "100% rozwój autonomiczny (Agentic Dev)",
      c3_title: "Silnik reputacji AI i triage zgłoszeń multi-tenant",
      c3_desc_html: `Architektura platformy B2B multi-tenant do zarządzania reputacją z 45-sekundowym procesem triage, wymiennymi modelami LLM, precyzyjnym rozliczaniem tokenów i pełną izolacją danych. <strong>100% autonomiczna synteza multi-agentowa: cały kod produkcyjny, migracje baz danych i zestawy testów powstały w 100% autonomicznie przez agentów AI pod formalnym nadzorem architektonicznym i bramkami CI — bez ręcznego pisania kodu przez programistów.</strong>`,
      c3_m1_val: "3 mies. → 2 tyg.",
      c3_m1_lbl: "Przyspieszenie time-to-market",
      c3_m2_val: "100% synteza AI",
      c3_m2_lbl: "0 ręcznego kodowania / 100% bramek CI",
      c4_client: "Międzynarodowa firma doradcza (Wielka Czwórka)",
      c4_domain: "Platforma analityczna transakcji M&A",
      c4_title: "Analityka fuzji i przejęć (M&A) oraz wizualizacja danych",
      c4_desc: "Architektura warstwy frontendowej platformy analitycznej wspierającej procesy transakcyjne fuzji i przejęć o wartości setek milionów dolarów. Interaktywne matryce danych i bezawaryjne wdrażanie poprawek w czasie rzeczywistym w globalnych strefach czasowych.",
      c4_m1_val: "Portfel $100M+",
      c4_m1_lbl: "Wartość obsługiwanych transakcji",
      c4_m2_val: "Wysoka dostępność",
      c4_m2_lbl: "Wdrażanie poprawek bez przestojów",
      c5_client: "Globalny koncern biotechnologiczny",
      c5_domain: "Aparatura diagnostyczna biotech",
      c5_title: "Oprogramowanie sondy i klasyfikatora próbek medycznych",
      c5_desc: "Projekt przebudowy architektury i dekompozycji kodu pętli telemetrycznych aparatury do automatycznej analizy klinicznej. Wyeliminowanie ukrytych wyścigów wątków (race conditions) oraz błędów logiki asynchronicznej poprzez modularną architekturę.",
      c5_m1_val: "100% zgodności",
      c5_m1_lbl: "Restrykcyjne normy diagnostyki medycznej",
      c5_m2_val: "Zero wyścigów wątków",
      c5_m2_lbl: "Odseparowane moduły telemetrii",
      c6_client: "SaaS reklamy programatycznej",
      c6_domain: "Rekrutacja i systemy reklamowe",
      c6_title: "Modułowy system ATS i automatyzacja reklam społecznościowych",
      c6_desc: "Nadzór nad architekturą modernizacji platformy do postaci nowoczesnego środowiska łączącego automatyzację kampanii w social media z modułowym systemem śledzenia kandydatów (ATS).",
      c6_m1_val: "Wysokie tempo",
      c6_m1_lbl: "Międzynarodowy zespół inżynierski",
      c6_m2_val: "Full-Stack REST",
      c6_m2_lbl: "Architektura integracji API",
      c7_client: "Krajowy operator sieci energetycznej",
      c7_domain: "Energetyka i systemy geoprzestrzenne",
      c7_title: "Rozproszony silnik kolejkowania transakcji GIS",
      c7_desc: "Zaprojektowałem korporacyjny silnik kolejkowania transakcji dla krajowego operatora sieci energetycznej, rozwiązując problem izolacji konfliktów w rozproszonych, wielodostępowych bazach GIS. Opracowałem wzorce integracji SOAP/SOA na węzłach WebSphere sekwencjonujące ciężkie zapisy danych oraz dostarczyłem projekty dla regulowanego sektora energetycznego.",
      c7_m1_val: "Zero konfliktów",
      c7_m1_lbl: "Izolacja zapisów wielu użytkowników",
      c7_m2_val: "Zgodność regulacyjna",
      c7_m2_lbl: "Wymogi polskiego sektora energetycznego",
      c8_client: "Wiodąca europejska grupa ubezpieczeniowa",
      c8_domain: "Modernizacja platformy ubezpieczeniowej",
      c8_title: "Migracja platformy z monolitu do mikroserwisów",
      c8_desc: "Architekt rozwiązań prowadzący dekompozycję monolitu ubezpieczeniowego na krajobraz mikroserwisów zgodny z domenami biznesowymi. Definiowanie granic usług, kontraktów integracyjnych i kolejności migracji, wraz z nadzorem nad strumieniami dostarczania Java, Node.js i ReactJS w ściśle regulowanym środowisku korporacyjnym.",
      c8_m1_val: "Monolit → Mikroserwisy",
      c8_m1_lbl: "Dekompozycja usług zgodna z domenami",
      c8_m2_val: "Migracja przyrostowa",
      c8_m2_lbl: "Wzorzec Strangler-Fig",
      filter_aria: "Filtruj projekty według domeny",
      filter_all: "Wszystkie projekty",
      filter_finance: "Finanse i ubezpieczenia",
      filter_industry: "Przemysł i energetyka",
      filter_saas: "Platformy SaaS",
      filter_biotech: "Biotechnologia",
      filter_ai: "Agentic AI",
      cta_title: "Rozpoznajesz u siebie któryś z tych problemów?",
      cta_desc: "Umów 45-minutowy przegląd architektury. Wychodzisz z pisemną oceną ryzyka dostarczania — bez zobowiązań i bez prezentacji sprzedażowej.",
      cta_primary: "Umów przegląd architektury",
      cta_secondary: "Zobacz modele współpracy"
    },
    career: {
      tag: "Przebieg kariery",
      title: "19+ lat nieprzerwanej realizacji projektów",
      subtitle: "Ciągła ścieżka inżynierska od Junior Java Developera (2007) do głównego architekta rozwiązań — pracodawcy wymienieni z nazwy, projekty klientów chronione NDA.",
      e1_period: "2019 — obecnie",
      e1_company: "APSW",
      e1_role: "Założyciel i główny architekt rozwiązań",
      e1_desc: "Niezależna praktyka architektoniczna AI-Native. Autor metodyki Spec-Kit oraz procesu W pełni autonomicznego rozwoju (Agentic Dev), w ramach którego powstał autonomiczny system B2B SaaS w architekturze multi-tenant — cały kod produkcyjny i testy zostały wygenerowane przez agentów AI pod formalnym nadzorem architektonicznym. Architekt platformy multi-tenant do zarządzania majątkiem przemysłowym i utrzymaniem prewencyjnym, opartej na rekurencyjnych modelach drzewiastych telemetrii.",
      e2_period: "2026 — obecnie",
      e2_company: "EMAGINE",
      e2_role: "Architekt rozwiązań",
      e2_desc: "Architekt rozwiązań dla wiodącej europejskiej grupy ubezpieczeniowej. Prowadzę dekompozycję monolitu na architekturę mikroserwisową zgodną z domenami biznesowymi — definiuję granice usług, kontrakty integracyjne i kolejność migracji w strumieniach Java, Node.js i ReactJS, stosując modelowanie C4 i standardy cloud-native w ściśle regulowanym środowisku.",
      e3_period: "2019 — 2026",
      e3_company: "BCF",
      e3_role: "Architekt oprogramowania i dyrektor jednostki biznesowej",
      e3_desc: "Rozwinąłem globalną jednostkę realizacji projektów od zera do 30+ inżynierów w strumieniach Mobile, Java i PHP. Lider techniczny i architekt rozwiązań dla banku Tier-1 — chmurowe narzędzia obsługi transakcji, deklaratywne IaC w YAML oraz procesy ETL przetwarzające ok. 10 GB dziennie przez Azure Data Factory i Databricks, skracając czas wdrożenia o 40%.",
      e4_period: "2012 — 2019",
      e4_company: "REC Global → GlobalLogic (przejęcie)",
      e4_role: "Software Engineer → Lider techniczny → Architekt",
      e4_desc: "Odpowiadałem technicznie za ponad 10 projektów międzynarodowych, prowadząc interdyscyplinarne zespoły 4–10 inżynierów. Przeszedłem od realizacji hands-on do architektury i planowania strategicznego — wydzielanie mikroserwisów z systemu zarządzania flotą, audyt zgodności korporacyjnej z LDAP/Kerberos przy 85% pokryciu testami oraz migracja platformy POS do usług webowych.",
      e5_period: "2011 — 2012",
      e5_company: "APATOR RECTOR",
      e5_role: "Projektant systemów i lider techniczny",
      e5_desc: "Projektowałem rozwiązania dla polskiego sektora energetycznego zgodnie z rygorystycznymi regulacjami branżowymi. Zbudowałem silnik kolejkowania transakcji obsługujący izolację konfliktów w rozproszonych bazach GIS krajowego operatora sieci, integrując usługi SOA na IBM WebSphere.",
      e6_period: "2007 — 2011",
      e6_company: "ASTEC",
      e6_role: "Junior Java Developer → Specjalista GSS i Java / lider techniczny",
      e6_desc: "Inżynieria systemów korporacyjnych Java i geoprzestrzennych. Przeniosłem desktopowe operacje GIS Smallworld do modułów webowych dla międzynarodowego operatora infrastruktury telekomunikacyjnej, zbudowałem klientów usług webowych zabezpieczonych PKI dla globalnego dostawcy technologii energetycznych oraz prowadziłem szkolenia GeoSpatial Server w Szwajcarii i Cambridge."
    },
    architect: {
      tag: "Główny architekt",
      name: "Piotr Solarz-Wnęk",
      subtitle: "Mgr inż. informatycznych systemów przemysłowych | 19+ lat doświadczenia",
      bio_p1_html: `Architekt oprogramowania, inżynier AI-Native oraz były dyrektor jednostki biznesowej, który rozwijał międzynarodowe działy inżynieryjne do 30+ specjalistów w sektorach bankowości, ubezpieczeń, energetyki i przemysłu 4.0. Certyfikowany architekt Azure (AZ-900), ITIL Foundation oraz absolwent programu <em>Droga Nowoczesnego Architekta</em>.`,
      bio_p2_html: `Pionier praktycznego wdrażania metodyki <strong>Spec-Kit</strong> oraz <strong>W pełni autonomicznego rozwoju (Agentic Dev)</strong>, dzięki czemu inżynieria oprogramowania z AI staje się przewidywalna, bezpieczna i wolna od kodu niskiej jakości (AI slop).`,
      linkedin_btn: "Profil LinkedIn",
      email_btn: "Bezpośredni email",
      github_btn: "GitHub",
      credentials_title: "Certyfikaty i wykształcenie",
      leadership_title: "Doświadczenie liderskie:",
      leadership_desc: "Skalowanie jednostki do 30+ inżynierów (Mobile, Java, PHP)",
      direct_contact_btn: "Kontakt bezpośredni"
    },
    contact: {
      tag: "Kontakt",
      title: "Umów przegląd architektury",
      subtitle: "Niezależnie od tego, czy planujesz wdrożyć autonomiczną aplikację AI, wyeliminować błędy AI dzięki Spec-Kit, czy zmodernizować istniejące systemy — zaprojektujmy właściwe rozwiązanie.",
      direct_email_title: "Bezpośredni email",
      response_time: "Średni czas odpowiedzi: < 4 godziny robocze",
      phone_title: "Telefon / WhatsApp",
      timezone: "Europa / Warszawa (UTC+1 / UTC+2)",
      availability_title: "Dostępność projektowa",
      availability_val: "Sprinty strategiczne i retainery",
      availability_desc: "Projekty zdalne / hybrydowe w UE",
      sla_title: "Jak wygląda współpraca (SLA)",
      sla_step1_html: `<strong style="color: var(--text-primary);">Analiza zgłoszenia (&lt; 4h):</strong> Piotr osobiście analizuje wymagania z zachowaniem pełnej poufności (NDA).`,
      sla_step2_html: `<strong style="color: var(--text-primary);">Rozmowa techniczna:</strong> 30-minutowa merytoryczna konsultacja z głównym architektem. Zero marketingu.`,
      sla_step3_html: `<strong style="color: var(--text-primary);">Plan działania (24h):</strong> Konkretny zakres 10-dniowego audytu lub sprintu wdrożeniowego.`,
      form_name_label: "Imię i nazwisko / firma *",
      form_name_placeholder: "np. Jan Kowalski (CTO, Fintech)",
      form_email_label: "Służbowy adres email *",
      form_email_placeholder: "jan@firma.pl",
      form_service_label: "Główny obszar zainteresowania",
      opt_agentic: "W pełni autonomiczny rozwój aplikacji (Agentic Dev)",
      opt_speckit: "Spec-Kit AI i systemy agentowe",
      opt_enterprise: "Architektura enterprise i modernizacja chmurowa",
      opt_iot: "Systemy telemetryczne high-load i IoT / GIS",
      opt_enablement: "Szkolenia Spec-Kit AI dla zespołów inżynierskich",
      opt_audit: "10-dniowy kompleksowy audyt architektury",
      form_msg_label: "Opis projektu / cele techniczne *",
      form_msg_placeholder: "Opisz architekturę systemu, wyzwania techniczne, harmonogram lub stos technologiczny...",
      nda_text_html: `<strong style="color: var(--text-primary);">Wymagana umowa poufności (NDA):</strong> Podpisanie obustronnej umowy NDA przed rozmową techniczną.`,
      form_submit_btn: "Wyślij zapytanie ofertowe",
      sending_inquiry: "Wysyłanie zapytania...",
      feedback_success: "Dziękuję! Twoja wiadomość została pomyślnie wysłana. Piotr Solarz-Wnęk skontaktuje się z Tobą wkrótce.",
      feedback_error: "Wystąpił błąd. Skontaktuj się bezpośrednio: piotr.solarz-wnek@apsw.pl",
      err_form_token_missing: "Nie udało się zweryfikować formularza. Odśwież stronę i spróbuj ponownie lub napisz bezpośrednio na piotr.solarz-wnek@apsw.pl.",
      err_form_token_invalid: "Nie udało się zweryfikować formularza. Odśwież stronę i spróbuj ponownie lub napisz bezpośrednio na piotr.solarz-wnek@apsw.pl.",
      err_form_token_expired: "Strona była otwarta zbyt długo. Odśwież ją i wyślij zapytanie ponownie.",
      err_rate_limited: "Zbyt wiele zgłoszeń z tego połączenia. Odczekaj kilka minut lub napisz bezpośrednio na piotr.solarz-wnek@apsw.pl.",
      err_invalid_name: "Podaj prawidłowe imię i nazwisko lub nazwę firmy.",
      err_invalid_email: "Podaj prawidłowy służbowy adres e-mail.",
      err_invalid_message: "Opis projektu musi mieć od 8 do 5000 znaków.",
      feedback_fallback_html: `✓ Zapytanie zapisane. Możesz także skontaktować się bezpośrednio: <a href="mailto:piotr.solarz-wnek@apsw.pl" style="color: var(--text-brand); text-decoration: underline; font-weight: 600;">piotr.solarz-wnek@apsw.pl</a>`,
      copied_tooltip: "Skopiowano!"
    },
    footer: {
      footer_desc: "APSW — Architektura rozwiązań AI-Native i inżynieria enterprise prowadzona przez Piotra Solarz-Wnęka. Zero AI Slop. Deterministyczne systemy o wysokiej dostępności produkcyjnej.",
      footer_deploy: "Gotowość wdrożeniowa: Cyber_Folks / Hetzner",
      col1_title: "Metodyka i technologie",
      col2_title: "Usługi",
      col3_title: "Dostępność i biuro",
      rights: "© 2026 APSW — Piotr Solarz-Wnęk. Wszelkie prawa zastrzeżone."
    },
    stages: {
      1: {
        title: "Etap 01: Formalna specyfikacja domeny i kontraktów",
        desc: "Zamiast chaotycznych promptów w czacie, architekt definiuje deterministyczne schematy domeny, ścisłe kontrakty wejścia/wyjścia, niezmienniki biznesowe oraz macierze przypadków brzegowych w formacie czytelnym dla człowieka i maszyn."
      },
      2: {
        title: "Etap 02: Architektoniczne guardrails i osadzanie granic C4",
        desc: "Osadza ścisłe ograniczenia architektoniczne w oknie kontekstu agenta: granice mikrousług, polityki bezpieczeństwa (RODO/PCI-DSS), poziomy izolacji baz danych i bezkompromisowe standardy kodu."
      },
      3: {
        title: "Etap 03: W pełni autonomiczna synteza kodu i orkiestracja agentów",
        desc: "Autonomiczni wyspecjalizowani agenci (Planner, Worker, Test Generator) syntetyzują czysty kod, skrypty migracji i pełne zestawy testów jednostkowych oraz integracyjnych, weryfikowane pod kątem kontraktu."
      },
      4: {
        title: "Etap 04: Deterministyczna weryfikacja i bramki jakości CI",
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
