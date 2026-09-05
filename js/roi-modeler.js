/**
 * APSW Platform - Executive ROI & Delivery Risk Modeler
 * Interactive simulation of delivery velocity, risk elimination, and cost optimization
 * comparing traditional agency/in-house paths against APSW Spec-Kit & Fully Agentic Architecture.
 */

(function () {
  'use strict';

  const ROI_CONFIGS = {
    domains: {
      monolith: {
        id: 'monolith',
        nameEn: 'Legacy Monolith Modernization',
        namePl: 'Modernizacja Monolitu Legacy',
        subtitleEn: 'Regulated Insurance & Banking Core Platforms',
        subtitlePl: 'Regulowane platformy ubezpieczeniowe i bankowe',
        traditionalWeeksBase: 28,
        apswWeeksBase: 8,
        weeklyBurnBase: 7500,
        riskScore: '94% Risk Elimination',
        riskScorePl: '94% redukcji ryzyka wdrożeniowego',
        strategyEn: 'Strangler-fig incremental decoupling with domain-aligned Java 21 / Node.js microservices under shared C4 contracts. Zero downtime cutover with full compliance.',
        strategyPl: 'Stopniowe odcinanie monolitu wzorcem strangler-fig na mikrousługi Java 21 / Node.js oparte na kontraktach C4. Przełączenie bez przestojów w pełnej zgodności regulacyjnej.'
      },
      agentic_saas: {
        id: 'agentic_saas',
        nameEn: 'Autonomous Multi-Tenant B2B SaaS',
        namePl: 'Autonomiczny Multi-Tenant B2B SaaS',
        subtitleEn: 'AI Reputation Platform & Automated Lead-Gen Engine',
        subtitlePl: 'Silnik reputacji AI i automatycznego lead-generation',
        traditionalWeeksBase: 20,
        apswWeeksBase: 4,
        weeklyBurnBase: 6500,
        riskScore: '98% Hallucination Elimination',
        riskScorePl: '98% eliminacji halucynacji AI',
        strategyEn: 'Multi-agent autonomous synthesis with Symfony 8.1 / PHP 8.5 worker loops, pgvector tone calibration, and Doctrine TenantFilter data shields. Sub-45s triage conveyor belt UX.',
        strategyPl: 'Autonomiczna synteza wieloagentowa na pętlach workerów Symfony 8.1 / PHP 8.5, kalibracji tonu pgvector i filtrach TenantFilter. Ergonomia triażu w <45 sekund.'
      },
      telemetry_iot: {
        id: 'telemetry_iot',
        nameEn: 'Industrial IoT & Asset Telemetry',
        namePl: 'Przemysłowy IoT i Telemetria Aktywów',
        subtitleEn: 'Machinery Fleets, Drilling Rigs (JO) & Spatial Networks',
        subtitlePl: 'Floty maszynowe, wieże wiertnicze (JO) i sieci przestrzenne',
        traditionalWeeksBase: 24,
        apswWeeksBase: 6,
        weeklyBurnBase: 7000,
        riskScore: '99.99% Telemetry Reliability',
        riskScorePl: '99.99% niezawodności telemetrii',
        strategyEn: 'Recursive asset tree telemetry pipelines processing runtime hours, drilled meters, and fuel consumption with automatic threshold triggers and multi-tier incident lockout locks.',
        strategyPl: 'Rekurencyjne drzewiaste modele aktywów liczące motogodziny, odwiercone metry i paliwo z automatycznymi progami ostrzegawczymi i wielopoziomowymi blokadami maszyn.'
      },
      cloud_microservices: {
        id: 'cloud_microservices',
        nameEn: 'High-Throughput Cloud & Microservices',
        namePl: 'Wysokowydajne Chmury i Mikrousługi',
        subtitleEn: 'Institutional Finance, Azure Bicep IaC & Event-Driven APIs',
        subtitlePl: 'Instytucjonalne finanse, Azure Bicep IaC i architektura sterowana zdarzeniami',
        traditionalWeeksBase: 22,
        apswWeeksBase: 5,
        weeklyBurnBase: 7200,
        riskScore: 'Zero Deployment Regressions',
        riskScorePl: 'Zero regresji wdrożeniowych',
        strategyEn: 'Declarative YAML pipelines, Azure Bicep infrastructure as code, Spring Boot transaction aggregates, and Databricks ETL streaming at ~10 GB/day with Karate contract gates.',
        strategyPl: 'Deklaratywne pipeline\'y YAML, infrastruktura w kodzie Bicep, agregaty transakcyjne Spring Boot i ETL Databricks ~10 GB/dzień z bramkami Karate.'
      }
    },
    bottlenecks: {
      slow_releases: { multiplier: 1.25, labelEn: 'Slow 6-week release cycles & monolith fear', labelPl: 'Wolne 6-tygodniowe cykle wdrożeń i strach przed monolitem' },
      ai_slop: { multiplier: 1.20, labelEn: 'Fragile AI chat prompts & hallucination leakage', labelPl: 'Niestabilne prompty AI i wyciek halucynacji na produkcję' },
      dev_burn: { multiplier: 1.30, labelEn: 'Bloated agency bills & sluggish feature velocity', labelPl: 'Rozdmuchane faktury agencji i ślimacze tempo dowozu' },
      data_leak: { multiplier: 1.15, labelEn: 'Multi-tenant data isolation & compliance risks', labelPl: 'Ryzyko wycieku danych w architekturze multi-tenant' }
    },
    scales: {
      small: { multiplier: 1.0, labelEn: 'Focused Sprint (1–4 Core Services / MVP)', labelPl: 'Precyzyjny Sprint (1–4 usługi / MVP)' },
      mid: { multiplier: 1.5, labelEn: 'Mid-Market Core System (5–12 Services)', labelPl: 'System Średniej Skali (5–12 usług)' },
      enterprise: { multiplier: 2.2, labelEn: 'Regulated Enterprise Platform (12+ Services)', labelPl: 'Regulowana Platforma Enterprise (12+ usług)' }
    }
  };

  function initRoiModeler() {
    const domainButtons = document.querySelectorAll('.roi-domain-btn');
    const bottleneckButtons = document.querySelectorAll('.roi-bottleneck-btn');
    const scaleButtons = document.querySelectorAll('.roi-scale-btn');

    // Display elements
    const tradWeeksEl = document.getElementById('roi-trad-weeks');
    const apswWeeksEl = document.getElementById('roi-apsw-weeks');
    const savedTimeEl = document.getElementById('roi-saved-time');
    const tradCostEl = document.getElementById('roi-trad-cost');
    const apswCostEl = document.getElementById('roi-apsw-cost');
    const savedCostEl = document.getElementById('roi-saved-cost');
    const riskBadgeEl = document.getElementById('roi-risk-badge');
    const strategyEl = document.getElementById('roi-strategy-text');
    const applyScopeBtn = document.getElementById('roi-apply-scope-btn');
    const copyRfpBtn = document.getElementById('roi-copy-rfp-btn');

    if (!tradWeeksEl) return;

    let currentState = {
      domain: 'monolith',
      bottleneck: 'slow_releases',
      scale: 'mid'
    };

    function calculateAndRender() {
      const lang = (window.APSW_I18N && window.APSW_I18N.currentLang) || 'en';
      const d = ROI_CONFIGS.domains[currentState.domain];
      const b = ROI_CONFIGS.bottlenecks[currentState.bottleneck];
      const s = ROI_CONFIGS.scales[currentState.scale];

      const tradWeeks = Math.round(d.traditionalWeeksBase * b.multiplier * s.multiplier);
      const apswWeeks = Math.round(d.apswWeeksBase * Math.sqrt(s.multiplier));
      const weeksSaved = tradWeeks - apswWeeks;
      const speedup = (tradWeeks / apswWeeks).toFixed(1);

      const tradCost = Math.round(tradWeeks * d.weeklyBurnBase * (s.multiplier * 0.85));
      const apswCost = Math.round(apswWeeks * 4800 * (1 + (s.multiplier - 1) * 0.4));
      const costSaved = Math.max(0, tradCost - apswCost);

      tradWeeksEl.textContent = `${tradWeeks} ${lang === 'pl' ? 'tygodni' : 'Weeks'}`;
      apswWeeksEl.textContent = `${apswWeeks} ${lang === 'pl' ? 'tygodni' : 'Weeks'}`;
      savedTimeEl.textContent = `${weeksSaved} ${lang === 'pl' ? 'tyg. szybciej' : 'Weeks Faster'} (${speedup}x Velocity)`;

      tradCostEl.textContent = `€${tradCost.toLocaleString('en-US')}`;
      apswCostEl.textContent = `€${apswCost.toLocaleString('en-US')}`;
      savedCostEl.textContent = `€${costSaved.toLocaleString('en-US')} ${lang === 'pl' ? 'zaoszczędzone' : 'Capital Saved'}`;

      riskBadgeEl.textContent = lang === 'pl' ? d.riskScorePl : d.riskScore;
      strategyEl.textContent = lang === 'pl' ? d.strategyPl : d.strategyEn;

      // Update state for RFP spec
      currentState.calculated = {
        domainName: lang === 'pl' ? d.namePl : d.nameEn,
        bottleneckLabel: lang === 'pl' ? b.labelPl : b.labelEn,
        scaleLabel: lang === 'pl' ? s.labelPl : s.labelEn,
        tradWeeks,
        apswWeeks,
        costSaved,
        strategy: lang === 'pl' ? d.strategyPl : d.strategyEn
      };
    }

    // Attach domain clicks
    domainButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        domainButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentState.domain = btn.getAttribute('data-domain');
        calculateAndRender();
      });
    });

    // Attach bottleneck clicks
    bottleneckButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        bottleneckButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentState.bottleneck = btn.getAttribute('data-bottleneck');
        calculateAndRender();
      });
    });

    // Attach scale clicks
    scaleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        scaleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentState.scale = btn.getAttribute('data-scale');
        calculateAndRender();
      });
    });

    // Apply Scope to Contact Form
    if (applyScopeBtn) {
      applyScopeBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        const serviceSelect = document.getElementById('form-service');
        const msgTextarea = document.getElementById('form-message');

        if (serviceSelect) {
          if (currentState.domain === 'monolith') {
            serviceSelect.value = 'Enterprise Architecture & Cloud Modernization';
          } else if (currentState.domain === 'agentic_saas') {
            serviceSelect.value = 'Fully Agentic Application Development';
          } else if (currentState.domain === 'telemetry_iot') {
            serviceSelect.value = 'Industrial IoT / Spatial Telemetry';
          } else {
            serviceSelect.value = 'Enterprise Architecture & Cloud Modernization';
          }
        }

        if (msgTextarea && currentState.calculated) {
          const lang = (window.APSW_I18N && window.APSW_I18N.currentLang) || 'en';
          const pref = lang === 'pl' 
            ? `Dzień dobry, chciałbym omówić audyt / sprint wdrożeniowy dla:\n- Obszar: ${currentState.calculated.domainName}\n- Wyzwanie: ${currentState.calculated.bottleneckLabel}\n- Skala: ${currentState.calculated.scaleLabel}\n- Szacowany cel wdrożenia: ~${currentState.calculated.apswWeeks} tyg.\n\nDodatkowe szczegóły naszego stosu technologicznego:`
            : `Hello Piotr, I would like to schedule an architecture review for:\n- Domain: ${currentState.calculated.domainName}\n- Primary Challenge: ${currentState.calculated.bottleneckLabel}\n- Scale: ${currentState.calculated.scaleLabel}\n- Target Timeline: ~${currentState.calculated.apswWeeks} weeks\n\nAdditional details about our current stack:`;
          msgTextarea.value = pref;
        }

        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            const nameInput = document.getElementById('form-name');
            if (nameInput) nameInput.focus();
          }, 600);
        }
      });
    }

    // Copy RFP / Agent Purchase Spec
    if (copyRfpBtn) {
      copyRfpBtn.addEventListener('click', () => {
        const spec = {
          rfp_standard: "APSW-SPEC-KIT-2026.1",
          inquiry_domain: currentState.calculated.domainName,
          identified_bottleneck: currentState.calculated.bottleneckLabel,
          architectural_scale: currentState.calculated.scaleLabel,
          targeted_timeline_weeks: currentState.calculated.apswWeeks,
          estimated_capital_efficiency: `€${currentState.calculated.costSaved.toLocaleString('en-US')}`,
          recommended_architecture_moat: currentState.calculated.strategy,
          verification_gate: "100% Contract Tests & Zero AI Slop Merge Requirement",
          mutual_nda_requested: true,
          contact_architect: "piotr.solarz-wnek@apsw.pl"
        };
        if (window.copyToClipboard) {
          window.copyToClipboard(JSON.stringify(spec, null, 2), copyRfpBtn);
        }
      });
    }

    // Re-render on language change
    window.addEventListener('apsw:languageChanged', calculateAndRender);

    // Initial render
    calculateAndRender();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRoiModeler);
  } else {
    initRoiModeler();
  }
})();
