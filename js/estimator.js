/**
 * APSW Brand Website - Solution Scope & Cost Estimator
 * Transparent calculation of architecture projects, agentic development & timelines
 */

document.addEventListener('DOMContentLoaded', () => {
  const domainCards = document.querySelectorAll('.domain-tier-card');
  const scaleCards = document.querySelectorAll('.scale-tier-card');
  const durationSlider = document.getElementById('est-duration-slider');
  const durationValDisplay = document.getElementById('est-duration-val');

  // Output elements
  const outDomain = document.getElementById('out-domain');
  const outScale = document.getElementById('out-scale');
  const outTimeline = document.getElementById('out-timeline');
  const outArchitectureType = document.getElementById('out-arch-type');
  const outDeliverables = document.getElementById('out-deliverables');
  const outEstimatedTotal = document.getElementById('out-estimated-total');
  const copyRfpBtn = document.getElementById('btn-copy-rfp');

  let state = {
    domain: 'ai_agentic', // ai_agentic, enterprise_arch, data_spatial, team_enablement
    domainName: 'Fully Agentic Application Development',
    baseRateWeekly: 3800, // EUR per week
    scale: 'enterprise', // startup, midmarket, enterprise
    scaleName: 'Enterprise / High-Availability (Tier 1)',
    scaleMultiplier: 1.25,
    weeks: 4
  };

  const domainConfigs = {
    ai_agentic: {
      name: 'Fully Agentic Application Development',
      baseWeekly: 3800,
      archType: 'Multi-Agent Autonomous Synthesis & Spec-Kit Guardrails',
      deliverables: 'Architecture Blueprint + Multi-Agent Pipeline + Production Codebase + Automated CI Contract Tests'
    },
    enterprise_arch: {
      name: 'Enterprise Architecture & Cloud Modernization',
      baseWeekly: 3500,
      archType: 'Java 21 / Spring Boot & Symfony 8 Microservices + Azure Bicep IaC',
      deliverables: 'C4 Blueprint + Decoupled Microservices + High-Throughput APIs + Declarative YAML CI/CD'
    },
    data_spatial: {
      name: 'High-Load Telemetry & Spatial Systems',
      baseWeekly: 3600,
      archType: 'Databricks + Azure Data Factory + IoT Recursive Asset Engine',
      deliverables: 'ETL Pipeline Blueprint + Telemetry Ingestion Hub + Anomaly Detection Engine'
    },
    team_enablement: {
      name: 'Spec-Kit AI SDLC Enablement & Training',
      baseWeekly: 3200,
      archType: 'Spec-First AI Tooling (Junie, Copilot, Antigravity) + Standardized SDLC Guidelines',
      deliverables: 'Enterprise Spec-Kit Standard Docs + Team Workshops + Custom Agentic Templates'
    }
  };

  const scaleConfigs = {
    startup: { name: 'MVP / Fast-Track Prototype', multiplier: 1.0 },
    midmarket: { name: 'Production System (Mid-Scale)', multiplier: 1.15 },
    enterprise: { name: 'Enterprise / Regulated Tier-1 (Banking / Biotech / IoT)', multiplier: 1.3 }
  };

  function updateCalculation() {
    const dConfig = domainConfigs[state.domain] || domainConfigs.ai_agentic;
    const sConfig = scaleConfigs[state.scale] || scaleConfigs.enterprise;

    state.domainName = dConfig.name;
    state.scaleName = sConfig.name;

    const weeklyTotal = dConfig.baseWeekly * sConfig.multiplier;
    const estimatedTotal = Math.round(weeklyTotal * state.weeks);

    if (durationValDisplay) durationValDisplay.textContent = `${state.weeks} Weeks`;
    if (outDomain) outDomain.textContent = state.domainName;
    if (outScale) outScale.textContent = state.scaleName;
    if (outTimeline) outTimeline.textContent = `${state.weeks} Weeks (${state.weeks * 40} Architect Engineering Hours)`;
    if (outArchitectureType) outArchitectureType.textContent = dConfig.archType;
    if (outDeliverables) outDeliverables.textContent = dConfig.deliverables;
    if (outEstimatedTotal) outEstimatedTotal.textContent = `€${estimatedTotal.toLocaleString('en-US')}`;
  }

  // Domain selection
  domainCards.forEach(card => {
    card.addEventListener('click', () => {
      domainCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.domain = card.getAttribute('data-domain');
      updateCalculation();
    });
  });

  // Scale selection
  scaleCards.forEach(card => {
    card.addEventListener('click', () => {
      scaleCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.scale = card.getAttribute('data-scale');
      updateCalculation();
    });
  });

  // Duration Slider
  if (durationSlider) {
    durationSlider.addEventListener('input', (e) => {
      state.weeks = parseInt(e.target.value, 10) || 4;
      updateCalculation();
    });
  }

  // Copy RFP / Agent Purchase Spec
  if (copyRfpBtn) {
    copyRfpBtn.addEventListener('click', () => {
      const dConfig = domainConfigs[state.domain];
      const sConfig = scaleConfigs[state.scale];
      const total = Math.round(dConfig.baseWeekly * sConfig.multiplier * state.weeks);

      const rfpSpec = {
        rfp_version: "2026.1",
        provider: "APSW (Piotr Solarz-Wnek)",
        inquiry_type: state.domainName,
        target_scale: state.scaleName,
        engagement_duration_weeks: state.weeks,
        estimated_budget_eur: total,
        architecture_foundation: dConfig.archType,
        core_deliverables: dConfig.deliverables,
        anti_slop_guarantee: "Deterministic Verification Gate with 100% Contract Test Coverage",
        contact_endpoint: "piotr.solarz-wnek@apsw.pl"
      };

      const jsonStr = JSON.stringify(rfpSpec, null, 2);
      window.copyToClipboard(jsonStr, copyRfpBtn);
    });
  }

  // Initial calculation
  updateCalculation();
});
