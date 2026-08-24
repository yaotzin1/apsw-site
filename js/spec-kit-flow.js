/**
 * APSW Brand Website - Spec-Kit Interactive Flow
 * Interactive 4-Stage Specification-Driven AI Engineering visualizer with i18n support
 */

document.addEventListener('DOMContentLoaded', () => {
  const stepCards = document.querySelectorAll('.pipeline-step-card');
  const detailsTitle = document.getElementById('speckit-stage-title');
  const detailsDesc = document.getElementById('speckit-stage-desc');
  const detailsCode = document.getElementById('speckit-stage-code');

  let currentActiveStep = '1';

  const stageSnippets = {
    1: `<span class="code-comment"># SPEC-KIT STAGE 1: Formal Domain Specification</span>
<span class="code-keyword">spec_definition</span>:
  <span class="code-property">feature</span>: <span class="code-string">"Autonomous Telemetry Incident Ingestion"</span>
  <span class="code-property">domain_boundaries</span>:
    <span class="code-property">entity</span>: <span class="code-string">"IndustrialUnitAsset"</span>
    <span class="code-property">invariants</span>:
      - <span class="code-string">"OperatingHours >= 0"</span>
      - <span class="code-string">"AnomalyScore threshold strictly bounded between [0.00, 1.00]"</span>
  <span class="code-property">schema_contract</span>: <span class="code-string">"AssetTelemetryV2.proto / json-schema"</span>`,
    2: `<span class="code-comment"># SPEC-KIT STAGE 2: Architectural Guardrails</span>
<span class="code-keyword">architectural_constraints</span>:
  <span class="code-property">patterns</span>: [<span class="code-string">"CQRS"</span>, <span class="code-string">"Event-Driven"</span>, <span class="code-string">"Clean Architecture"</span>]
  <span class="code-property">forbidden_patterns</span>:
    - <span class="code-string">"Direct DB mutations bypassing domain aggregates"</span>
    - <span class="code-string">"Synchronous cross-service blocking HTTP calls"</span>
  <span class="code-property">security_policies</span>:
    <span class="code-property">auth_mode</span>: <span class="code-string">"OAuth2 / JWT / Azure AD"</span>
    <span class="code-property">data_masking</span>: <span class="code-string">"PII_STRICT"</span>`,
    3: `<span class="code-comment"># SPEC-KIT STAGE 3: Autonomous Multi-Agent Swarm</span>
<span class="code-keyword">agent_orchestration</span>:
  <span class="code-property">planner_agent</span>: <span class="code-string">"Decompose spec into 4 atomic implementation tasks"</span>
  <span class="code-property">coder_agent</span>: <span class="code-string">"Synthesize Java 21 / Spring Boot domain entities & controllers"</span>
  <span class="code-property">test_agent</span>: <span class="code-string">"Generate Karate & JUnit 5 test suites covering 100% edge cases"</span>
  <span class="code-property">status</span>: <span class="code-string">"Autonomous synthesis complete with 0 hallucinations"</span>`,
    4: `<span class="code-comment"># SPEC-KIT STAGE 4: Automated Verification Gate</span>
<span class="code-keyword">verification_results</span>:
  <span class="code-property">contract_tests</span>: <span class="code-string">"48/48 PASSED (100%)"</span>
  <span class="code-property">linter_and_types</span>: <span class="code-string">"0 ERRORS, 0 WARNINGS"</span>
  <span class="code-property">security_scan</span>: <span class="code-string">"0 Vulnerabilities (OWASP Top 10 Clean)"</span>
  <span class="code-property">benchmark_p99</span>: <span class="code-string">"42ms (Target < 100ms) - APPROVED"</span>
  <span class="code-property">gate_status</span>: <span class="code-string">"READY_FOR_DEPLOYMENT"</span>`
  };

  function renderStage(step) {
    currentActiveStep = step;
    const lang = (window.APSW_I18N && window.APSW_I18N.currentLang) || 'en';
    const dict = (window.APSW_I18N && window.APSW_I18N.translations && window.APSW_I18N.translations[lang]) || null;
    const stageInfo = dict && dict.stages && dict.stages[step];

    if (stageInfo && detailsTitle && detailsDesc) {
      detailsTitle.textContent = stageInfo.title;
      detailsDesc.textContent = stageInfo.desc;
    }

    if (detailsCode && stageSnippets[step]) {
      detailsCode.innerHTML = stageSnippets[step];
    }
  }

  stepCards.forEach(card => {
    card.addEventListener('click', () => {
      const step = card.getAttribute('data-step') || '1';
      stepCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      renderStage(step);
    });
  });

  // Re-render current stage when language changes
  window.addEventListener('apsw:languageChanged', () => {
    renderStage(currentActiveStep);
  });
});
