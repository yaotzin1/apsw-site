/**
 * APSW Labs website - translations (EN / PL) and the language switcher.
 * Every visible string on the page lives here under both languages.
 */

const APSW_TRANSLATIONS = {
  "en": {
    "meta": {
      "page_title": "APSW Labs | Models guess. Engines verify.",
      "page_description": "APSW Labs combines Principal-led system architecture and deterministic AI pipelines with elastic partner engineering capacity. Creators of Indaba and Gridwright."
    },
    "common": {
      "copy": "Copy",
      "copied": "Copied",
      "sample": "Sample data"
    },
    "nav": {
      "brand_badge": "ARCHITECTURE · OPEN SOURCE · TURNKEY DELIVERY",
      "main_aria": "Main navigation",
      "workshop": "Live Workbench",
      "oss": "Open Source",
      "standard": "The Standard",
      "delivery": "Delivery & Scale",
      "cta": "Scope a System →",
      "github_aria": "APSW Labs on GitHub (yaotzin1)",
      "lang_aria": "Language",
      "menu_aria": "Open or close the menu",
      "skip": "Skip to content"
    },
    "hero": {
      "eyebrow": "AI-NATIVE ARCHITECTURE & TURNKEY ENGINEERING STUDIO",
      "title_html": "Models guess.<br><span class=\"hl\">Engines verify.</span><br>We ship deterministic software.",
      "sub": "APSW Labs combines Principal-led system architecture and deterministic AI pipelines with elastic partner engineering capacity — taking you from a 10-day architectural blueprint to a full-scale production platform.",
      "cta_secondary": "See the open source",
      "switch_label": "Pick a scenario. The run on the left produces the artifact on the right.",
      "tabs_aria": "Workshop scenario",
      "tab1": "High-Load UI",
      "tab2": "Multi-Agent Engine",
      "tab3": "Turnkey B2B SaaS",
      "tab3_sub": "AI Reputation Platform"
    },
    "wb": {
      "engine_title": "The engine",
      "artifact_title": "The materialized artifact",
      "simulated": "Simulated run",
      "contract_note": "abridged, illustrative",
      "pipeline_aria": "Pipeline run",
      "s1": "SPEC",
      "s2": "COUNCIL DEBATE",
      "s3": "GATE",
      "s4": "ARTIFACT VERIFIED",
      "n_wait": "Waiting.",
      "n_spec_run": "Writing the specification into an isolated worktree.",
      "n_spec_ok": "Specification written. Guard: the file exists and is not empty.",
      "n_council_run": "Two engines cross-examine the same diff.",
      "n_council_ok": "Quorum 2 of 2 after two rounds.",
      "n_gate_run": "Running the gate commands. Attempt 1.",
      "n_gate_fail": "Gate failed. Exit code 1.",
      "n_gate_retry": "Retrying this step only. The agent gets the last failure, not the transcript.",
      "n_gate_ok": "Gate passed on attempt 2. Exit code 0.",
      "n_art_ok": "The artifact left the worktree as a patch. Try it on the right.",
      "replay": "Replay Run",
      "next": "Next step",
      "mode_aria": "Run mode",
      "mode_auto": "Auto",
      "mode_step": "Step Mode",
      "status_pending": "Awaiting gate",
      "status_verified": "Verified",
      "tel_aria": "Trace telemetry",
      "cost_note": "provider-verified",
      "worktree": "isolated"
    },
    "grid": {
      "title": "apsw-gridwright, running here",
      "search_label": "Search rows",
      "search_placeholder": "Search services…",
      "swap_to_remote": "Swap Array → Remote API",
      "swap_to_local": "Swap Remote API → Array",
      "diff_note": "One line changes. Search, sort and paging stay as written.",
      "caption": "Service health, sample data",
      "col_service": "Service",
      "col_latency": "Latency (p99)",
      "col_throughput": "Throughput",
      "col_status": "Status",
      "st_healthy": "healthy",
      "st_degraded": "degraded",
      "st_down": "down",
      "of": "of",
      "of_many": "of many",
      "no_rows": "No rows match.",
      "prev": "Previous page",
      "next": "Next page",
      "facts": "0 deps · ~17 kB · 10M rows windowed",
      "remote_note": "The API sent no count, so the grid does not print one.",
      "local_note": "The array is in memory, so the total is known."
    },
    "council": {
      "title": "Council transcript and span inspector",
      "hint": "Open a step to read the cross-examination and the guards that decided it.",
      "rfc_sum": "Two proposals for the same change.",
      "debate_sum": "Disagreement, then quorum.",
      "verify_sum": "A failure, an isolated retry, a pass.",
      "rfc_claude": "Print \"of many\" in the footer when the source reports no total. Keep page arithmetic unchanged.",
      "rfc_anti": "Agreed on the footer. Objection: a short last page proves the end, so the grid should print the real total then.",
      "rfc_out": "Both proposals recorded. No code yet.",
      "debate_claude": "Accepts the objection. A page shorter than the page size sets the total.",
      "debate_anti": "Confirms the revised diff. Asks for a test covering the short last page.",
      "debate_out": "Quorum 2 of 2 in round 2. No human arbiter needed.",
      "verify_claude": "Attempt 1 failed one test. Retried with that failure only and fixed the off-by-one.",
      "verify_anti": "Re-ran the suite and the packaging audit against the built package. Both pass.",
      "verify_out": "Exit code 0. The patch leaves the worktree.",
      "guards": "Exit-code guards",
      "span": "Span",
      "tokens": "tokens",
      "cost": "cost",
      "duration": "duration",
      "cost_src": "reported by the provider"
    },
    "belt": {
      "title": "Multi-tenant AI reputation triage",
      "fact_time_k": "Build time",
      "fact_time_v": "2 weeks",
      "fact_how_k": "Method",
      "fact_how_v": "Synthesized under Indaba CI contract gates",
      "fact_stack_k": "Stack",
      "fact_stack_v": "Symfony 8 + React / MUI",
      "tenant_aria": "Active tenant",
      "shield": "Scoped to {tenant}. {n} rows belong to other tenants. 0 are visible here.",
      "st_ingest": "Ingest",
      "st_classify": "Classify",
      "st_draft": "Draft reply",
      "st_approve": "Human approval",
      "advance": "Advance the belt",
      "approve": "Approve",
      "empty": "empty",
      "ledger_title": "Token-credit ledger",
      "balance": "Balance",
      "credits": "credits",
      "l_classify": "classify",
      "l_draft": "draft reply",
      "l_none": "No charges yet. Advance the belt.",
      "published": "Published"
    },
    "oss": {
      "eyebrow": "OPEN-SOURCE PROOF OF WORK",
      "title": "We Build Our Own Engines First",
      "sub": "Both projects are MIT licensed. Read the source before you read our pitch.",
      "indaba_tag": "Let your agents argue. Ship what they agree on.",
      "indaba_m1": "A declared graph of steps behind exit-code guards. A step passes when its command exits 0, not when a model says so.",
      "indaba_m2": "A multi-agent council reaches consensus by cross-examination. When it cannot, a human arbiter decides.",
      "indaba_m3": "Runs Claude Code, Codex, Gemini, Cursor or Antigravity in disposable git worktrees.",
      "indaba_m4": "OpenTelemetry GenAI traces. Every token and dollar is counted, never invented.",
      "indaba_note": "Preview release. The API is not stable below 1.0.",
      "grid_tag": "The React data grid that does not care where your rows live.",
      "grid_m1": "Built by one architect using the Indaba engine and covered by 1,300+ automated tests.",
      "grid_m2": "0 runtime dependencies, about 17 kB gzipped.",
      "grid_m3": "Up to 10M rows with row and column virtualization.",
      "grid_m4_html": "Real HTML <code>&lt;table&gt;</code> semantics, with a WCAG 2.2 AA add-on.",
      "grid_m5": "Honest \"of many\" totals when an API omits the count.",
      "docs": "Documentation",
      "source": "Source on GitHub",
      "npm": "npm package"
    },
    "std": {
      "eyebrow": "THE ENGINEERING STANDARD",
      "title": "One Rules File Outranks Every Prompt",
      "sub": "Teams that prompt by habit get a different codebase from every engineer. We keep one file. Everything an agent reads is generated from it, and CI fails when a copy drifts.",
      "src_note": "the single source of rules",
      "generates": "generates",
      "enforces": "enforces",
      "n_agents": "loaded by every AGENTS.md-aware agent",
      "n_claude": "Claude Code entry point",
      "n_gemini": "Gemini entry point",
      "n_hook": "gates run before a commit exists",
      "n_ci": "the same gates, on every pull request",
      "btn_drift": "Hand-edit CLAUDE.md",
      "btn_regen": "Regenerate from workflow.ai.yml",
      "status_ok": "In sync. Every generated file matches the rules file.",
      "status_drift": "Drift detected. CI fails until the file is regenerated.",
      "p1_title": "A graph with gates",
      "p1_text": "Guards decide pass or fail: commands, git diffs, file checks. A failure retries only the target step with the latest error. The full history never pollutes the context.",
      "p2_title": "A council, not a chorus",
      "p2_text": "Multiple engines cross-examine the same diff until quorum is reached.",
      "p3_title": "Enforced, not just written",
      "p3_text": "CI fails immediately if repository instructions drift from workflow.ai.yml.",
      "p4_title": "Verified where it breaks",
      "p4_text": "Smoke tests against built packages, packaging audits and security gates block bad commits before human review."
    },
    "scope": {
      "eyebrow": "PRINCIPAL NOTE & SCOPE ROUTING",
      "title": "Scope & Route",
      "founder_html": "APSW Labs is led by <strong>Piotr Solarz-Wnęk</strong> — Principal Software Architect with 19+ years designing mission-critical platforms across institutional finance, industrial IoT, and enterprise SaaS, and creator of Indaba and Gridwright.",
      "direct": "Direct email",
      "s1": "1 · Engagement track",
      "c1": "10-Day Architecture Blueprint",
      "b1": "Solo Principal · Rapid Start",
      "c2": "Turnkey MVP / High-Load Module",
      "b2": "Lab Synthesis · 3–6 Wks",
      "c3": "AI Factory Repo Installation",
      "b3": "Team Enablement · 2–3 Wks",
      "c4": "Full-Scale Platform / Engineering Squad",
      "b4": "Principal + Partner Software House",
      "s2": "2 · Delivery scale and timeline",
      "p1": "Surgical Sprint (Fixed Deliverable)",
      "p2": "Core System Build (1–3 Months)",
      "p3": "Dedicated Partner Squad (3–12+ Months / Multi-Engineer)",
      "s3": "3 · Routing preview",
      "mode_label": "Execution Mode",
      "mode_direct": "Direct APSW Labs Principal Execution (Zero agency overhead)",
      "mode_partner": "Principal Architecture by APSW Labs + Elastic Engineering Squad via Partner Software House",
      "note_direct": "You talk to the architect who builds it.",
      "note_partner": "The architect sets the contracts and the gates. The squad builds inside them.",
      "s4": "4 · Contact and NDA",
      "name_label": "Name / Company",
      "name_placeholder": "Name and company",
      "email_label": "Work Email",
      "email_placeholder": "you@company.com",
      "brief_label": "Technical Brief / Stack",
      "brief_placeholder": "What the system must do, the stack it lives in, and when it has to run.",
      "nda_html": "<strong>Execute Mutual NDA before technical alignment call.</strong> We sign before you share anything sensitive.",
      "submit": "Request Technical Scope (<4h Principal Response) →",
      "sending": "Sending…",
      "fb_success": "Received. Piotr reads every brief himself and replies directly.",
      "fb_invalid": "Not sent. Check the name, the work email and a brief of at least 8 characters.",
      "fb_rate": "Too many requests from this address. Wait a few minutes, or use the direct email.",
      "fb_unreachable": "Not sent. The server did not answer. Use the direct email: piotr.solarz-wnek@apsw.pl"
    },
    "footer": {
      "desc": "APSW Labs. Principal-led architecture, open-source engines and turnkey delivery.",
      "build": "No build step. The files in the repository are the files served.",
      "col_products": "Open source",
      "col_studio": "Studio",
      "rights": "APSW Labs · Piotr Solarz-Wnęk"
    },
    "model": {
      "eyebrow": "THE ARCHITECT-WEDGE DELIVERY MODEL",
      "title": "Principal Precision. Partner Scale.",
      "sub": "Principal architecture at the root. Elastic engineering squads at scale.",
      "cmp_free_k": "Solo freelancer",
      "cmp_free_v": "Deep skill, no capacity. The project stops when one person does.",
      "cmp_agency_k": "Traditional agency",
      "cmp_agency_v": "Capacity, but slow setup, account managers in between, and code nobody verified.",
      "cmp_apsw_k": "APSW Labs",
      "cmp_apsw_v": "One architect sets the contracts and the gates. Capacity is added behind them.",
      "ph1_tag": "APSW LABS CORE",
      "ph1_name": "Principal Wedge & Blueprint",
      "ph1_text": "Piotr personally defines C4 boundaries, domain contracts, security isolation and the repository CI guardrails in workflow.ai.yml. Zero sales reps, zero translation loss.",
      "ph2_tag": "APSW LABS ENGINE",
      "ph2_name": "Autonomous Core Synthesis",
      "ph2_text": "High-leverage core modules, data pipelines and MVPs are synthesized and verified with @indaba/engine and multi-agent councils. Weeks, not quarters.",
      "ph3_tag": "PARTNER SOFTWARE HOUSE SQUADS",
      "ph3_name": "Elastic Partner Scale-Out",
      "ph3_text": "Need 4–8 engineers for long-term feature expansion, mobile apps or a 24/7 SLA? Our vetted partner squads plug directly into the pre-configured workflow.ai.yml repository. Automated CI gates govern every commit, so code quality does not degrade after handoff.",
      "gate": "same CI gates"
    },
    "tracks": {
      "eyebrow": "PRODUCTIZED ENGAGEMENT TRACKS",
      "title": "Choose Your Entry Point",
      "g_lab": "High-Velocity Lab Sprints",
      "g_partner": "Scaled Partner Delivery",
      "t1_name": "10-Day Architecture & AI Readiness Blueprint",
      "t1_terms": "Entry Wedge · Fixed Scope",
      "t1_text": "A deep-dive codebase and microservice audit, C4 target blueprints, a security and isolation review, and an executable workflow.ai.yml roadmap. The right start before you commit to a major build.",
      "t2_name": "Turnkey Core MVP / Module Sprint",
      "t2_terms": "APSW Labs Delivery · 3–6 Weeks",
      "t2_text": "Rapid, fixed-scope delivery of a complete MVP, a high-load telemetry backend or a 10M-row Gridwright Pro interface. Synthesized in the Lab with >90% automated contract tests and Docker / Cloud IaC.",
      "t3_name": "Deterministic AI Factory Setup",
      "t3_terms": "In-House Team Enablement · 2–3 Weeks",
      "t3_text": "We install the exact engineering standard behind Gridwright into your repository: custom workflow.ai.yml tracks, multi-agent review councils, CI drift guards and senior engineering playbooks.",
      "t4_name": "Full-Scale Platform & Dedicated Squads",
      "t4_terms": "Architect-Led + Partner Software House",
      "t4_text": "End-to-end enterprise product development, legacy modernization or dedicated multi-disciplinary squads in Java 21, Symfony 8, React and Cloud / Data. Architected and gated by APSW Labs, scaled and staffed by our partner software house.",
      "cta": "Scope this track →"
    }
  },
  "pl": {
    "meta": {
      "page_title": "APSW Labs | Modele zgadują. Silniki weryfikują.",
      "page_description": "APSW Labs łączy architekturę systemów prowadzoną przez Principala i deterministyczne potoki AI z elastycznymi zespołami partnerskimi. Twórcy Indaby i Gridwrighta."
    },
    "common": {
      "copy": "Kopiuj",
      "copied": "Skopiowano",
      "sample": "Dane przykładowe"
    },
    "nav": {
      "brand_badge": "ARCHITEKTURA · OPEN SOURCE · DOSTAWA POD KLUCZ",
      "main_aria": "Nawigacja główna",
      "workshop": "Warsztat na żywo",
      "oss": "Open Source",
      "standard": "Standard",
      "delivery": "Dostawa i skala",
      "cta": "Określ zakres systemu →",
      "github_aria": "APSW Labs na GitHubie (yaotzin1)",
      "lang_aria": "Język",
      "menu_aria": "Otwórz lub zamknij menu",
      "skip": "Przejdź do treści"
    },
    "hero": {
      "eyebrow": "STUDIO ARCHITEKTURY AI-NATIVE I INŻYNIERII POD KLUCZ",
      "title_html": "Modele zgadują.<br><span class=\"hl\">Silniki weryfikują.</span><br>Dostarczamy deterministyczne oprogramowanie.",
      "sub": "APSW Labs łączy architekturę systemów prowadzoną przez Principala i deterministyczne potoki AI z elastycznymi zespołami partnerskimi — od 10-dniowego blueprintu architektury do pełnoskalowej platformy produkcyjnej.",
      "cta_secondary": "Zobacz open source",
      "switch_label": "Wybierz scenariusz. Przebieg po lewej wytwarza artefakt po prawej.",
      "tabs_aria": "Scenariusz warsztatu",
      "tab1": "Interfejs pod dużym obciążeniem",
      "tab2": "Silnik wieloagentowy",
      "tab3": "B2B SaaS pod klucz",
      "tab3_sub": "Platforma reputacji AI"
    },
    "wb": {
      "engine_title": "Silnik",
      "artifact_title": "Zmaterializowany artefakt",
      "simulated": "Przebieg symulowany",
      "contract_note": "skrócony, poglądowy",
      "pipeline_aria": "Przebieg potoku",
      "s1": "SPECYFIKACJA",
      "s2": "DEBATA RADY",
      "s3": "BRAMKA",
      "s4": "ARTEFAKT ZWERYFIKOWANY",
      "n_wait": "Oczekuje.",
      "n_spec_run": "Specyfikacja powstaje w izolowanym worktree.",
      "n_spec_ok": "Specyfikacja zapisana. Strażnik: plik istnieje i nie jest pusty.",
      "n_council_run": "Dwa silniki krzyżowo przesłuchują ten sam diff.",
      "n_council_ok": "Kworum 2 z 2 po dwóch rundach.",
      "n_gate_run": "Uruchamiam polecenia bramki. Próba 1.",
      "n_gate_fail": "Bramka nie przeszła. Kod wyjścia 1.",
      "n_gate_retry": "Ponawiam tylko ten krok. Agent dostaje ostatni błąd, nie cały zapis rozmowy.",
      "n_gate_ok": "Bramka przeszła w próbie 2. Kod wyjścia 0.",
      "n_art_ok": "Artefakt opuścił worktree jako patch. Wypróbuj go po prawej.",
      "replay": "Odtwórz przebieg",
      "next": "Następny krok",
      "mode_aria": "Tryb przebiegu",
      "mode_auto": "Auto",
      "mode_step": "Tryb krokowy",
      "status_pending": "Czeka na bramkę",
      "status_verified": "Zweryfikowany",
      "tel_aria": "Telemetria śladu",
      "cost_note": "potwierdzone przez dostawcę",
      "worktree": "izolowany"
    },
    "grid": {
      "title": "apsw-gridwright, działa tutaj",
      "search_label": "Szukaj wierszy",
      "search_placeholder": "Szukaj usług…",
      "swap_to_remote": "Zamień tablicę → zdalne API",
      "swap_to_local": "Zamień zdalne API → tablicę",
      "diff_note": "Zmienia się jedna linia. Wyszukiwanie, sortowanie i stronicowanie zostają bez zmian.",
      "caption": "Stan usług, dane przykładowe",
      "col_service": "Usługa",
      "col_latency": "Opóźnienie (p99)",
      "col_throughput": "Przepustowość",
      "col_status": "Status",
      "st_healthy": "sprawna",
      "st_degraded": "obniżona",
      "st_down": "niedostępna",
      "of": "z",
      "of_many": "z wielu",
      "no_rows": "Brak pasujących wierszy.",
      "prev": "Poprzednia strona",
      "next": "Następna strona",
      "facts": "0 zależności · ~17 kB · 10 mln wierszy w oknie",
      "remote_note": "API nie podało liczby wierszy, więc grid jej nie wypisuje.",
      "local_note": "Tablica jest w pamięci, więc suma jest znana."
    },
    "council": {
      "title": "Zapis obrad rady i inspektor spanów",
      "hint": "Otwórz krok, aby przeczytać krzyżowe przesłuchanie i strażników, którzy o nim rozstrzygnęli.",
      "rfc_sum": "Dwie propozycje tej samej zmiany.",
      "debate_sum": "Spór, potem kworum.",
      "verify_sum": "Błąd, izolowane ponowienie, zaliczenie.",
      "rfc_claude": "Wypisz w stopce „z wielu”, gdy źródło nie podaje sumy. Arytmetyka stron bez zmian.",
      "rfc_anti": "Zgoda co do stopki. Zastrzeżenie: krótka ostatnia strona dowodzi końca, więc wtedy grid powinien podać prawdziwą sumę.",
      "rfc_out": "Obie propozycje zapisane. Kodu jeszcze nie ma.",
      "debate_claude": "Przyjmuje zastrzeżenie. Strona krótsza niż rozmiar strony ustala sumę.",
      "debate_anti": "Potwierdza poprawiony diff. Prosi o test krótkiej ostatniej strony.",
      "debate_out": "Kworum 2 z 2 w rundzie 2. Arbiter-człowiek nie był potrzebny.",
      "verify_claude": "W próbie 1 nie przeszedł jeden test. Ponowienie tylko z tym błędem naprawiło pomyłkę o jeden.",
      "verify_anti": "Ponownie uruchomił testy i audyt paczki na zbudowanym pakiecie. Oba przechodzą.",
      "verify_out": "Kod wyjścia 0. Patch opuszcza worktree.",
      "guards": "Strażnicy kodu wyjścia",
      "span": "Span",
      "tokens": "tokeny",
      "cost": "koszt",
      "duration": "czas",
      "cost_src": "podany przez dostawcę"
    },
    "belt": {
      "title": "Wielodostępny triaż reputacji AI",
      "fact_time_k": "Czas budowy",
      "fact_time_v": "2 tygodnie",
      "fact_how_k": "Metoda",
      "fact_how_v": "Synteza pod bramkami kontraktowymi CI Indaby",
      "fact_stack_k": "Stos",
      "fact_stack_v": "Symfony 8 + React / MUI",
      "tenant_aria": "Aktywny tenant",
      "shield": "Zakres: {tenant}. {n} wierszy należy do innych tenantów. Tutaj widać 0.",
      "st_ingest": "Pobranie",
      "st_classify": "Klasyfikacja",
      "st_draft": "Szkic odpowiedzi",
      "st_approve": "Akceptacja człowieka",
      "advance": "Przesuń taśmę",
      "approve": "Zatwierdź",
      "empty": "pusto",
      "ledger_title": "Księga kredytów tokenowych",
      "balance": "Saldo",
      "credits": "kredytów",
      "l_classify": "klasyfikacja",
      "l_draft": "szkic odpowiedzi",
      "l_none": "Brak obciążeń. Przesuń taśmę.",
      "published": "Opublikowane"
    },
    "oss": {
      "eyebrow": "DOWÓD PRACY W OPEN SOURCE",
      "title": "Najpierw budujemy własne silniki",
      "sub": "Oba projekty mają licencję MIT. Przeczytaj kod, zanim przeczytasz naszą ofertę.",
      "indaba_tag": "Pozwól agentom się spierać. Wdrażaj to, co uzgodnią.",
      "indaba_m1": "Zadeklarowany graf kroków za strażnikami kodu wyjścia. Krok przechodzi, gdy polecenie kończy się kodem 0, a nie gdy model tak twierdzi.",
      "indaba_m2": "Rada wielu agentów dochodzi do konsensusu przez krzyżowe przesłuchanie. Gdy się nie uda, rozstrzyga arbiter-człowiek.",
      "indaba_m3": "Uruchamia Claude Code, Codex, Gemini, Cursor lub Antigravity w jednorazowych worktree gita.",
      "indaba_m4": "Ślady OpenTelemetry GenAI. Każdy token i dolar jest policzony, nigdy zmyślony.",
      "indaba_note": "Wydanie podglądowe. API nie jest stabilne poniżej wersji 1.0.",
      "grid_tag": "Grid danych dla Reacta, któremu wszystko jedno, gdzie mieszkają wiersze.",
      "grid_m1": "Zbudowany przez jednego architekta silnikiem Indaba i pokryty ponad 1300 testami automatycznymi.",
      "grid_m2": "0 zależności w czasie działania, około 17 kB po kompresji gzip.",
      "grid_m3": "Do 10 mln wierszy dzięki wirtualizacji wierszy i kolumn.",
      "grid_m4_html": "Prawdziwa semantyka HTML <code>&lt;table&gt;</code> z dodatkiem WCAG 2.2 AA.",
      "grid_m5": "Uczciwe sumy „z wielu”, gdy API pomija liczbę wierszy.",
      "docs": "Dokumentacja",
      "source": "Kod na GitHubie",
      "npm": "Pakiet npm"
    },
    "std": {
      "eyebrow": "STANDARD INŻYNIERSKI",
      "title": "Jeden plik reguł jest ważniejszy niż każdy prompt",
      "sub": "Zespół, który promptuje z przyzwyczajenia, dostaje inny kod od każdego inżyniera. My utrzymujemy jeden plik. Wszystko, co czyta agent, jest z niego generowane, a CI nie przechodzi, gdy kopia się rozjedzie.",
      "src_note": "jedyne źródło reguł",
      "generates": "generuje",
      "enforces": "egzekwuje",
      "n_agents": "ładowany przez każdego agenta czytającego AGENTS.md",
      "n_claude": "punkt wejścia Claude Code",
      "n_gemini": "punkt wejścia Gemini",
      "n_hook": "bramki działają, zanim powstanie commit",
      "n_ci": "te same bramki przy każdym pull requeście",
      "btn_drift": "Edytuj ręcznie CLAUDE.md",
      "btn_regen": "Wygeneruj ponownie z workflow.ai.yml",
      "status_ok": "Zsynchronizowane. Każdy wygenerowany plik zgadza się z plikiem reguł.",
      "status_drift": "Wykryto rozjazd. CI nie przejdzie, dopóki plik nie zostanie wygenerowany ponownie.",
      "p1_title": "Graf z bramkami",
      "p1_text": "O wyniku decydują strażnicy: polecenia, diffy gita, sprawdzenia plików. Błąd ponawia tylko wskazany krok z ostatnim błędem. Pełna historia nigdy nie zaśmieca kontekstu.",
      "p2_title": "Rada, nie chór",
      "p2_text": "Kilka silników krzyżowo przesłuchuje ten sam diff, aż do osiągnięcia kworum.",
      "p3_title": "Egzekwowane, nie tylko zapisane",
      "p3_text": "CI nie przechodzi natychmiast, gdy instrukcje w repozytorium rozjadą się z workflow.ai.yml.",
      "p4_title": "Weryfikowane tam, gdzie pęka",
      "p4_text": "Testy dymne na zbudowanych pakietach, audyty paczek i bramki bezpieczeństwa blokują złe commity przed przeglądem człowieka."
    },
    "scope": {
      "eyebrow": "NOTA PRINCIPALA I ROUTING ZAKRESU",
      "title": "Zakres i routing",
      "founder_html": "APSW Labs prowadzi <strong>Piotr Solarz-Wnęk</strong> — Principal Software Architect z ponad 19-letnim doświadczeniem w projektowaniu platform krytycznych dla finansów instytucjonalnych, przemysłowego IoT i enterprise SaaS, twórca Indaby i Gridwrighta.",
      "direct": "Bezpośredni e-mail",
      "s1": "1 · Ścieżka współpracy",
      "c1": "10-dniowy blueprint architektury",
      "b1": "Sam Principal · Szybki start",
      "c2": "MVP pod klucz / moduł pod duże obciążenie",
      "b2": "Synteza w laboratorium · 3–6 tyg.",
      "c3": "Instalacja fabryki AI w repozytorium",
      "b3": "Wzmocnienie zespołu · 2–3 tyg.",
      "c4": "Pełnoskalowa platforma / zespół inżynierski",
      "b4": "Principal + partnerski software house",
      "s2": "2 · Skala dostawy i horyzont",
      "p1": "Sprint chirurgiczny (stały rezultat)",
      "p2": "Budowa rdzenia systemu (1–3 miesiące)",
      "p3": "Dedykowany zespół partnerski (3–12+ miesięcy / wielu inżynierów)",
      "s3": "3 · Podgląd routingu",
      "mode_label": "Tryb realizacji",
      "mode_direct": "Bezpośrednia realizacja przez Principala APSW Labs (zero narzutu agencyjnego)",
      "mode_partner": "Architektura Principala APSW Labs + elastyczny zespół inżynierski partnerskiego software house’u",
      "note_direct": "Rozmawiasz z architektem, który to buduje.",
      "note_partner": "Architekt ustala kontrakty i bramki. Zespół buduje w ich granicach.",
      "s4": "4 · Kontakt i NDA",
      "name_label": "Imię i nazwisko / firma",
      "name_placeholder": "Imię, nazwisko i firma",
      "email_label": "Służbowy e-mail",
      "email_placeholder": "ty@firma.pl",
      "brief_label": "Opis techniczny / stos",
      "brief_placeholder": "Co system ma robić, w jakim stosie działa i kiedy ma ruszyć.",
      "nda_html": "<strong>Podpisz wzajemne NDA przed techniczną rozmową uzgadniającą.</strong> Podpisujemy, zanim przekażesz cokolwiek wrażliwego.",
      "submit": "Poproś o zakres techniczny (odpowiedź Principala <4h) →",
      "sending": "Wysyłanie…",
      "fb_success": "Otrzymano. Piotr czyta każdy opis osobiście i odpowiada bezpośrednio.",
      "fb_invalid": "Nie wysłano. Sprawdź imię i nazwisko, służbowy e-mail oraz opis o długości co najmniej 8 znaków.",
      "fb_rate": "Zbyt wiele zgłoszeń z tego adresu. Odczekaj kilka minut albo napisz bezpośrednio.",
      "fb_unreachable": "Nie wysłano. Serwer nie odpowiedział. Napisz bezpośrednio: piotr.solarz-wnek@apsw.pl"
    },
    "footer": {
      "desc": "APSW Labs. Architektura prowadzona przez Principala, silniki open source i dostawa pod klucz.",
      "build": "Bez kroku budowania. Pliki w repozytorium to pliki serwowane.",
      "col_products": "Open source",
      "col_studio": "Studio",
      "rights": "APSW Labs · Piotr Solarz-Wnęk"
    },
    "model": {
      "eyebrow": "MODEL DOSTAWY „KLIN ARCHITEKTA”",
      "title": "Precyzja Principala. Skala partnera.",
      "sub": "Architektura Principala u podstaw. Elastyczne zespoły inżynierskie w skali.",
      "cmp_free_k": "Samodzielny freelancer",
      "cmp_free_v": "Duże umiejętności, brak mocy przerobowych. Projekt staje, gdy staje jedna osoba.",
      "cmp_agency_k": "Tradycyjna agencja",
      "cmp_agency_v": "Moce są, ale start jest powolny, po drodze stoją opiekunowie klienta, a kodu nikt nie zweryfikował.",
      "cmp_apsw_k": "APSW Labs",
      "cmp_apsw_v": "Jeden architekt ustala kontrakty i bramki. Moce przerobowe dochodzą za nimi.",
      "ph1_tag": "RDZEŃ APSW LABS",
      "ph1_name": "Klin Principala i blueprint",
      "ph1_text": "Piotr osobiście określa granice C4, kontrakty domenowe, izolację bezpieczeństwa i zabezpieczenia CI repozytorium w workflow.ai.yml. Zero handlowców, zero strat w tłumaczeniu.",
      "ph2_tag": "SILNIK APSW LABS",
      "ph2_name": "Autonomiczna synteza rdzenia",
      "ph2_text": "Kluczowe moduły rdzenia, potoki danych i MVP są syntetyzowane i weryfikowane przez @indaba/engine i rady wielu agentów. Tygodnie, nie kwartały.",
      "ph3_tag": "ZESPOŁY PARTNERSKIEGO SOFTWARE HOUSE’U",
      "ph3_name": "Elastyczne skalowanie z partnerem",
      "ph3_text": "Potrzebujesz 4–8 inżynierów do długofalowego rozwoju funkcji, aplikacji mobilnych albo SLA 24/7? Sprawdzone zespoły partnerskie wpinają się prosto w skonfigurowane repozytorium z workflow.ai.yml. Każdym commitem rządzą automatyczne bramki CI, więc jakość kodu nie spada po przekazaniu.",
      "gate": "te same bramki CI"
    },
    "tracks": {
      "eyebrow": "ŚCIEŻKI WSPÓŁPRACY",
      "title": "Wybierz punkt wejścia",
      "g_lab": "Szybkie sprinty laboratorium",
      "g_partner": "Dostawa w skali z partnerem",
      "t1_name": "10-dniowy blueprint architektury i gotowości na AI",
      "t1_terms": "Klin wejściowy · Stały zakres",
      "t1_text": "Dogłębny audyt kodu i mikroserwisów, docelowe schematy C4, przegląd bezpieczeństwa i izolacji oraz wykonywalna mapa drogowa w workflow.ai.yml. Właściwy początek, zanim zdecydujesz się na dużą budowę.",
      "t2_name": "Sprint: rdzeń MVP lub moduł pod klucz",
      "t2_terms": "Dostawa APSW Labs · 3–6 tygodni",
      "t2_text": "Szybka dostawa o stałym zakresie: kompletne MVP, backend telemetryczny pod duże obciążenie albo interfejs Gridwright Pro na 10 mln wierszy. Syntetyzowane w laboratorium z ponad 90% automatycznych testów kontraktowych i Docker / IaC w chmurze.",
      "t3_name": "Uruchomienie deterministycznej fabryki AI",
      "t3_terms": "Wzmocnienie zespołu wewnętrznego · 2–3 tygodnie",
      "t3_text": "Instalujemy w twoim repozytorium dokładnie ten standard inżynierski, który stoi za Gridwrightem: własne ścieżki workflow.ai.yml, wieloagentowe rady przeglądu, strażników rozjazdu w CI i playbooki dla starszych inżynierów.",
      "t4_name": "Pełnoskalowa platforma i dedykowane zespoły",
      "t4_terms": "Prowadzi architekt + partnerski software house",
      "t4_text": "Kompleksowy rozwój produktu enterprise, modernizacja legacy albo dedykowane zespoły interdyscyplinarne: Java 21, Symfony 8, React, chmura i dane. Architektura i bramki po stronie APSW Labs, skala i obsada po stronie partnerskiego software house’u.",
      "cta": "Określ zakres tej ścieżki →"
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

    // 7a. Update Image Alt Text (data-i18n-alt)
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      const val = getNestedTranslation(dict, key);
      if (val !== null && val !== undefined) {
        el.setAttribute('alt', val);
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

    // 9. Dispatch custom event for interactive components (the hero workbench)
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
