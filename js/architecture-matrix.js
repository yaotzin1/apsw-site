/**
 * APSW Platform - C4 System Architecture Command Center
 * Interactive System Topology Inspector showing real-world production architectures:
 * 1. Tier-1 Bank Financial Transaction Platform (ABN AMRO / CRCA / CRAS)
 * 2. Autonomous Multi-Tenant B2B SaaS (Idumela / Brandmonitor Architecture)
 * 3. Insurance Monolith Strangler-Fig Decoupling (EMAGINE / Tier-1 European Insurer)
 * 4. Heavy Industrial Asset Telemetry Tree (APSW Drilling Rigs & Fleets)
 */

(function () {
  'use strict';

  const ARCHITECTURES = {
    bank_core: {
      id: 'bank_core',
      titleEn: 'Tier-1 Bank Transaction Core (ABN AMRO / CRCA / CRAS)',
      titlePl: 'Rdzeń Transakcyjny Banku Tier-1 (ABN AMRO / CRCA / CRAS)',
      badgeEn: 'Institutional Finance & Compliance',
      badgePl: 'Finanse Instytucjonalne i Zgodność',
      overviewEn: 'Cloud-native transaction management and decoupled microservices engineered for strict zero-downtime banking compliance. High-throughput ETL moving 10 GB daily with declarative YAML and Bicep IaC.',
      overviewPl: 'Chmurowy system zarządzania transakcjami i rozproszone mikrousługi zaprojektowane pod rygorystyczne normy bankowe zero-downtime. Przetwarzanie 10 GB/dzień w ETL Databricks z deklaratywnym IaC Bicep.',
      nodes: [
        {
          id: 'bicep_iac',
          name: 'Azure Bicep IaC',
          roleEn: 'Declarative Infrastructure Baseline',
          rolePl: 'Deklaratywna Infrastruktura w Kodzie',
          badge: 'IaC / DevOps',
          invariantEn: 'No manual portal mutations. 100% version-controlled infrastructure drift prevention.',
          invariantPl: 'Zakaz ręcznych zmian w portalu Azure. 100% wersjonowana infrastruktura eliminująca drift.',
          riskEn: 'Prevents un-audited configuration drifts that violate European Banking Authority (EBA) regulations.',
          riskPl: 'Eliminuje niekontrolowane zmiany konfiguracji niezgodne z wymogami Europejskiego Urzędu Nadzoru Bankowego (EBA).',
          code: `targetScope = 'resourceGroup'

resource sqlServer 'Microsoft.Sql/servers@2023-05-01-preview' = {
  name: 'abn-crca-sql-prod'
  location: resourceGroup().location
  properties: {
    minimalTlsVersion: '1.2'
    publicNetworkAccess: 'Disabled'
  }
}`
        },
        {
          id: 'java_spring',
          name: 'Java 21 / Spring Boot 3',
          roleEn: 'Idempotent Transaction Core',
          rolePl: 'Idempotentny Rdzeń Transakcyjny',
          badge: 'Domain Core',
          invariantEn: 'Strict ACID commit isolation. Every transaction payload requires an immutable idempotency key.',
          invariantPl: 'Rygorystyczna izolacja transakcji ACID. Każdy rekord wymaga niezmiennego klucza idempotencji.',
          riskEn: 'Eliminates double-settlement anomalies and settlement race conditions during interbank transfers.',
          riskPl: 'Eliminuje ryzyko podwójnego zaksięgowania środków i wyścigów w rozliczeniach międzybankowych.',
          code: `@Transactional(isolation = Isolation.SERIALIZABLE)
public SettlementResult executeSettlement(SettlementOrderCommand cmd) {
    if (idempotencyStore.exists(cmd.idempotencyKey())) {
        return idempotencyStore.get(cmd.idempotencyKey());
    }
    var result = accountLedger.debitAndCredit(cmd);
    return idempotencyStore.save(cmd.idempotencyKey(), result);
}`
        },
        {
          id: 'databricks_etl',
          name: 'Databricks + Azure ADF',
          roleEn: '10 GB/Day Analytical Pipeline',
          rolePl: 'Pipeline Analityczny 10 GB/Dzień',
          badge: 'Data Streaming',
          invariantEn: 'Strict delta schema validation. Automatic quarantine of malformed regulatory records.',
          invariantPl: 'Walidacja schematu Delta Lake. Automatyczna kwarantanna niepoprawnych rekordów.',
          riskEn: 'Prevents data pipeline poison pills from disrupting regulatory audit feeds and deal pipelines.',
          riskPl: 'Chroni przed zatruciem pipeline\'u analitycznego i zablokowaniem raportowania nadzorczego.',
          code: `val deltaDf = spark.readStream
  .format("delta")
  .load("/mnt/transactions/raw")
  .filter($"settlementStatus" === "CONFIRMED")
  .writeStream
  .format("delta")
  .option("checkpointLocation", "/mnt/checkpoints/settlements")
  .start("/mnt/transactions/gold")`
        },
        {
          id: 'karate_gate',
          name: 'Karate Automated Test Gate',
          roleEn: 'Continuous Compliance Gate',
          rolePl: 'Bramka Ciągłej Weryfikacji',
          badge: 'CI Merge Gate',
          invariantEn: 'Zero manual releases. 100% green pass on regulatory scenarios prior to PR merge.',
          invariantPl: 'Zero manualnych wydań. 100% zielonych testów scenariuszy regulacyjnych przed mergem PR.',
          riskEn: 'Prevents breaking API regressions from reaching customer-facing banking settlement gateways.',
          riskPl: 'Chroni przed regresjami API w bramkach rozliczeniowych dostępnych dla klientów banku.',
          code: `Feature: Interbank Transaction Settlement Verification

Scenario: Idempotent replay of high-value settlement
  Given path '/api/v1/settlements'
  And header X-Idempotency-Key = 'CRC-992-TX'
  And request { accountId: 'NL91ABNA0412345678', amount: 5000000.00 }
  When method post
  Then status 200
  And match response.status == 'SETTLED'`
        }
      ]
    },

    agentic_saas: {
      id: 'agentic_saas',
      titleEn: 'Autonomous Multi-Tenant B2B SaaS (Idumela / Brandmonitor)',
      titlePl: 'Autonomiczny Multi-Tenant B2B SaaS (Idumela / Brandmonitor)',
      badgeEn: '100% Agentic Synthesis & Spec-Kit SDD',
      badgePl: '100% Synteza Wieloagentowa i Spec-Kit',
      overviewEn: 'High-speed reputation and automated lead-gen engine. Built on Symfony 8.1 / PHP 8.5 running in FrankenPHP worker mode, pgvector semantic tone calibration, and native Mercure SSE real-time push.',
      overviewPl: 'Błyskawiczny silnik ochrony reputacji i zautomatyzowanego pozyskiwania leadów. Oparty na Symfony 8.1 / PHP 8.5 w workerach FrankenPHP, wektorach pgvector i pushu Mercure SSE.',
      nodes: [
        {
          id: 'stealth_scraper',
          name: 'Apify Webhook Engine',
          roleEn: 'Lead Discovery & Review Ingestion',
          rolePl: 'Odkrywanie Leadów i Pobieranie Opinii',
          badge: 'Ingestion Layer',
          invariantEn: 'HMAC timing-attack safe verification. Reject unsigned payloads in constant time.',
          invariantPl: 'Weryfikacja HMAC odporna na ataki czasowe. Odrzucanie niepodpisanych żądań w stałym czasie.',
          riskEn: 'Prevents malicious actor forgery of external reviews, automated spamming, and quota hijacking.',
          riskPl: 'Chroni przed fałszowaniem opinii z zewnątrz, botami spamującymi i wyczerpywaniem limitów AI.',
          code: `final class ApifyWebhookVerifier {
    public function verify(Request $request, string $secret): bool {
        $signature = $request->headers->get('X-Apify-Signature');
        $computed = hash_hmac('sha256', $request->getContent(), $secret);
        return hash_equals($computed, (string) $signature);
    }
}`
        },
        {
          id: 'tenant_filter',
          name: 'Doctrine TenantFilter Shield',
          roleEn: 'Multi-Tenant Isolation Boundary',
          rolePl: 'Izolacja Danych Multi-Tenant',
          badge: 'Security Layer',
          invariantEn: 'Tenant isolation enforced at ORM SQL filter level. Impossible to leak data via missed WHERE clause.',
          invariantPl: 'Izolacja tenantów na poziomie SQLFilter w ORM. Niemożliwy wyciek danych przez pominięty WHERE.',
          riskEn: 'Eliminates cross-agency and cross-brand customer review leakage in shared database schemas.',
          riskPl: 'Całkowicie eliminuje ryzyko podejrzenia danych obcej agencji lub marki w bazie danych.',
          code: `final class TenantFilter extends SQLFilter {
    public function addFilterConstraint(ClassMetadata $targetEntity, $targetTableAlias): string {
        if (!$targetEntity->reflClass->implementsInterface(TenantScopedInterface::class)) {
            return '';
        }
        return sprintf('%s.agency_id = %s', $targetTableAlias, $this->getParameter('active_agency_id'));
    }
}`
        },
        {
          id: 'pgvector_voice',
          name: 'pgvector Brand Voice Engine',
          roleEn: 'Calibrated Semantic Tonal AI',
          rolePl: 'Semantyczna Kalibracja Tonu Marki',
          badge: 'AI Engine',
          invariantEn: 'Zero unconstrained prompting. Replies strictly bounded to top-k historical tone embeddings.',
          invariantPl: 'Zero nieskrępowanych promptów. Odpowiedzi ściśle dopasowane do wektorów tonu marki.',
          riskEn: 'Eliminates AI slop, sycophantic robot apologies, and hallucinated compensation promises.',
          riskPl: 'Eliminuje AI slop, sztuczne przeprosiny chatbota i halucynowanie nieprawdziwych rabatów.',
          code: `SELECT response_text, 1 - (embedding <=> :reviewVector) AS similarity
FROM brand_historical_responses
WHERE brand_id = :activeBrandId
ORDER BY embedding <=> :reviewVector
LIMIT 3;`
        },
        {
          id: 'mercure_conveyor',
          name: 'FrankenPHP Mercure SSE Triage',
          roleEn: 'Sub-45s Review Conveyor Belt',
          rolePl: 'Triaż Opinii w <45 Sekund',
          badge: 'Real-Time Frontend',
          invariantEn: 'Optimistic UI update in <=50ms. Zero polling loops; 100% native EventSource subscriptions.',
          invariantPl: 'Optymistyczny update UI w <=50ms. Zero pętli pollingu; 100% natywny EventSource Mercure.',
          riskEn: 'Saves business managers 15+ hours weekly by turning review triage into a fast, 1-click batch workflow.',
          riskPl: 'Oszczędza menedżerom 15+ godzin tygodniowo zamieniając uciążliwe odpisywanie w 1-klikowy triaż.',
          code: `// Mercure SSE Dispatcher in FrankenPHP Worker
$hub->publish(new Update(
    sprintf('/brands/%d/reviews', $brandId),
    json_encode(['status' => 'APPROVED', 'id' => $reviewId]),
    private: true
));`
        }
      ]
    },

    insurance_monolith: {
      id: 'insurance_monolith',
      titleEn: 'Tier-1 European Insurance Monolith Modernization (EMAGINE)',
      titlePl: 'Modernizacja Monolitu Ubezpieczeniowego Tier-1 (EMAGINE)',
      badgeEn: 'Strangler-Fig Microservices & C4 Delivery',
      badgePl: 'Wzorzec Strangler-Fig i Architektura C4',
      overviewEn: 'Decomposition of a massive legacy insurance platform into domain-aligned Java, Node.js, and ReactJS microservices within a strictly governed, regulated enterprise environment.',
      overviewPl: 'Dekompozycja rozległego monolitu ubezpieczeniowego na zorientowane domenowo mikrousługi Java, Node.js i ReactJS w rygorystycznym środowisku korporacyjnym.',
      nodes: [
        {
          id: 'gateway_strangler',
          name: 'Strangler-Fig Edge Gateway',
          roleEn: 'Incremental Traffic Interceptor',
          rolePl: 'Wzorzec Strangler-Fig na Bramce',
          badge: 'Routing Gate',
          invariantEn: 'Zero "big bang" cutover. New bounded contexts intercepted via reverse-proxy path routing.',
          invariantPl: 'Zakaz migracji "Big Bang". Nowe konteksty domenowe przechwytywane trasowaniem proxy.',
          riskEn: 'Prevents multi-million-euro outage risks inherent in traditional platform replacement projects.',
          riskPl: 'Chroni przed paraliżem biznesu i wielomilionowymi stratami typowymi dla nagłych migracji platform.',
          code: `location /api/claims/v2/ {
    proxy_pass http://claims-microservice-cluster;
    proxy_set_header X-Legacy-Trace-Id $request_id;
}
location / {
    proxy_pass http://legacy-insurance-monolith;
}`
        },
        {
          id: 'domain_boundary',
          name: 'Domain Service Boundaries',
          roleEn: 'Decoupled Insurance Contexts',
          rolePl: 'Izolowane Konteksty Ubezpieczeniowe',
          badge: 'DDD Architecture',
          invariantEn: 'Strict bounded contexts (Claims, Underwriting, Policies). Zero cross-database direct queries.',
          invariantPl: 'Ścisłe granice kontekstów (Szkody, Polisy, Taryfy). Całkowity zakaz zapytań cross-database.',
          riskEn: 'Eliminates cascading database lock contention and allows independent team deployment velocity.',
          riskPl: 'Eliminuje zakleszczenia bazy danych i pozwala zespołom wdrażać moduły niezależnie od siebie.',
          code: `public record ClaimAssessmentCommand(
    ClaimId claimId,
    PolicyNumber policyNumber,
    ClaimIncidentDetails details,
    Money requestedAmount
) implements DomainCommand {}`
        },
        {
          id: 'c4_contracts',
          name: 'C4 Component Architecture',
          roleEn: 'Shared Integration Contracts',
          rolePl: 'Współdzielone Kontrakty Integracyjne',
          badge: 'C4 Model',
          invariantEn: 'Every cross-service interaction must be defined via OpenApi/Protobuf contract first.',
          invariantPl: 'Każda komunikacja między usługami musi najpierw posiadać kontrakt OpenApi/Protobuf.',
          riskEn: 'Prevents contract drift between parallel Java, Node.js, and ReactJS delivery streams.',
          riskPl: 'Zapobiega rozjazdowi kontraktów między równoległymi strumieniami Java, Node.js i React.',
          code: `paths:
  /claims/{claimId}/assess:
    post:
      operationId: assessInsuranceClaim
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ClaimAssessmentResult'`
        },
        {
          id: 'react_widescreen',
          name: 'React Fluid Triage Console',
          roleEn: 'Underwriter Operations Console',
          rolePl: 'Pulpit Likwidatora Szkód',
          badge: 'Frontend UI/UX',
          invariantEn: 'Fluid widescreen canvas with 0 layout shift (CLS = 0) and sub-second claims lookup.',
          invariantPl: 'Widescreen z zerowym przesunięciem (CLS = 0) i podsekundowym wyszukiwaniem szkód.',
          riskEn: 'Accelerates claims adjudication time by 60% without cognitive overload for enterprise adjusters.',
          riskPl: 'Skraca czas likwidacji szkód o 60% bez przeciążania likwidatorów chaotycznym interfejsem.',
          code: `export const ClaimsTriageConveyor = () => {
    const { claims, approveClaim } = useClaimsTriage();
    return (
        <Container maxWidth={false} sx={{ py: 3 }}>
            <ClaimBatchReviewList items={claims} onApprove={approveClaim} />
        </Container>
    );
};`
        }
      ]
    },

    industrial_telemetry: {
      id: 'industrial_telemetry',
      titleEn: 'Industrial Asset Telemetry Engine (Heavy Industry / Drilling Rigs)',
      titlePl: 'Silnik Telemetrii Aktywów Przemysłowych (Wieże Wiertnicze i Floty)',
      badgeEn: 'IoT Recursive Tree Models & Incident Automation',
      badgePl: 'Drzewiaste Modele IoT i Blokady Maszyn',
      overviewEn: 'Principal architecture for enterprise asset tracking and preventative maintenance across distributed operational units (Organizational Units / JO). Recursive telemetry trees and multi-tier ticketing locks.',
      overviewPl: 'Główna architektura utrzymania ruchu i telemetrii dla rozproszonych jednostek operacyjnych (JO). Rekurencyjne drzewa aktywów, motogodziny, metry i automatyczne blokady.',
      nodes: [
        {
          id: 'recursive_tree',
          name: 'Recursive Asset Tree Model',
          roleEn: 'Hierarchical Machine Registry',
          rolePl: 'Drzewiasty Rejestr Maszyn i Modułów',
          badge: 'Data Model',
          invariantEn: 'Sub-components inherit parent unit telemetry context (JO Drilling Rig -> Engine -> Drill Head).',
          invariantPl: 'Podzespoły dziedziczą kontekst jednostki nadrzędnej (Wieża wiertnicza JO -> Silnik -> Głowica).',
          riskEn: 'Prevents untracked maintenance blind spots where catastrophic drill failures occur in deep fields.',
          riskPl: 'Eliminuje martwe punkty przeglądów, chroniąc przed kosztownymi awariami głowic wiertniczych.',
          code: `final class IndustrialAssetNode {
    private ?IndustrialAssetNode $parent = null;
    /** @var Collection<int, IndustrialAssetNode> */
    private Collection $children;
    private TelemetryCounters $runtimeCounters; // hours, meters, fuel
}`
        },
        {
          id: 'telemetry_eval',
          name: 'Multi-Metric Threshold Evaluator',
          roleEn: 'Real-Time Anomaly & Metric Gate',
          rolePl: 'Wielometrykowy Ewaluator Progów',
          badge: 'Telemetry Engine',
          invariantEn: 'Continuous evaluation against drilled meters, operational days, and engine hours simultaneously.',
          invariantPl: 'Równoczesna analiza odwierconych metrów, dni pracy i motogodzin silnika.',
          riskEn: 'Prevents engine blowout by detecting stress threshold breaches before catastrophic field failures.',
          riskPl: 'Chroni przed zatarciem napędu wiertniczego, wyłapując krytyczne przeciążenia przed awarią.',
          code: `public function evaluateThresholds(AssetTelemetry $t): ThresholdState {
    if ($t->getDrilledMeters() >= $t->getInspectionLimitMeters()) {
        return ThresholdState::CRITICAL_LOCK_REQUIRED;
    }
    return ThresholdState::NORMAL;
}`
        },
        {
          id: 'incident_lock',
          name: 'Incident Lockout & Multi-Tier Hub',
          roleEn: 'Automated Machinery Lockdown',
          rolePl: 'Automatyczna Blokada Maszyny',
          badge: 'Safety Automation',
          invariantEn: 'Critical inspection overdue automatically triggers operational machine locks and supervisor alerts.',
          invariantPl: 'Przekroczenie terminu przeglądu automatycznie blokuje możliwość wydania maszyny.',
          riskEn: 'Protects enterprise from regulatory fines and worker safety liability under mining safety laws.',
          riskPl: 'Zabezpiecza firmę przed karami Urzędu Dozoru Technicznego i wypadkami przy pracy.',
          code: `if ($state === ThresholdState::CRITICAL_LOCK_REQUIRED) {
    $lockManager->applyMachineLock($assetId, 'OVERDUE_INSPECTION_MANDATORY');
    $notificationPipeline->dispatchFieldSupervisorAlert($assetId);
}`
        },
        {
          id: 'gis_spatial',
          name: 'GIS & Spatial Depot Mapping',
          roleEn: 'Smallworld & PostGIS Synchronization',
          rolePl: 'Integracja Przestrzenna GIS',
          badge: 'Geospatial',
          invariantEn: 'Every asset coordinate linked to terrain spatial maps with zero database commit conflicts.',
          invariantPl: 'Każda współrzędna powiązana z mapą terenu bez konfliktów commitów przestrzennych.',
          riskEn: 'Eliminates lost-asset tracking overhead across massive multi-square-kilometer extraction fields.',
          riskPl: 'Eliminuje problem zagubionego sprzętu na rozległych polach wydobywczych o powierzchni setek km².',
          code: `SELECT id, asset_code, ST_AsGeoJSON(field_location) as geo
FROM enterprise_industrial_assets
WHERE ST_DWithin(field_location, ST_MakePoint(:lon, :lat)::geography, 5000);`
        }
      ]
    }
  };

  function initArchitectureMatrix() {
    const tabButtons = document.querySelectorAll('.arch-archetype-btn');
    const titleEl = document.getElementById('arch-detail-title');
    const badgeEl = document.getElementById('arch-detail-badge');
    const overviewEl = document.getElementById('arch-detail-overview');
    const nodeGridEl = document.getElementById('arch-nodes-grid');
    const inspectorCardEl = document.getElementById('arch-inspector-card');

    if (!tabButtons.length || !nodeGridEl) return;

    let activeArchKey = 'bank_core';
    let selectedNodeIndex = 0;

    function renderActiveArchitecture() {
      const lang = (window.APSW_I18N && window.APSW_I18N.currentLang) || 'en';
      const arch = ARCHITECTURES[activeArchKey];
      if (!arch) return;

      if (titleEl) titleEl.textContent = lang === 'pl' ? arch.titlePl : arch.titleEn;
      if (badgeEl) badgeEl.textContent = lang === 'pl' ? arch.badgePl : arch.badgeEn;
      if (overviewEl) overviewEl.textContent = lang === 'pl' ? arch.overviewPl : arch.overviewEn;

      // Render nodes
      nodeGridEl.innerHTML = '';
      arch.nodes.forEach((node, idx) => {
        const nodeBtn = document.createElement('button');
        nodeBtn.type = 'button';
        nodeBtn.className = `arch-node-box ${idx === selectedNodeIndex ? 'is-active' : ''}`;
        nodeBtn.setAttribute('data-node-idx', idx);

        nodeBtn.innerHTML = `
          <div class="arch-node-step">${idx + 1}</div>
          <div class="arch-node-content">
            <span class="arch-node-badge">${node.badge}</span>
            <h4 class="arch-node-name">${node.name}</h4>
            <p class="arch-node-role">${lang === 'pl' ? node.rolePl : node.roleEn}</p>
          </div>
        `;

        nodeBtn.addEventListener('click', () => {
          selectedNodeIndex = idx;
          document.querySelectorAll('.arch-node-box').forEach(b => b.classList.remove('is-active'));
          nodeBtn.classList.add('is-active');
          renderInspector(node);
        });

        nodeGridEl.appendChild(nodeBtn);
      });

      // Render inspector for currently selected node
      const activeNode = arch.nodes[selectedNodeIndex] || arch.nodes[0];
      renderInspector(activeNode);
    }

    function renderInspector(node) {
      if (!inspectorCardEl || !node) return;
      const lang = (window.APSW_I18N && window.APSW_I18N.currentLang) || 'en';

      inspectorCardEl.innerHTML = `
        <div class="arch-inspector-header">
          <div>
            <span class="arch-inspector-badge">${node.badge}</span>
            <h3 class="arch-inspector-title">${node.name}</h3>
            <p class="arch-inspector-sub">${lang === 'pl' ? node.rolePl : node.roleEn}</p>
          </div>
          <div class="arch-inspector-status">
            <span class="pulse-dot"></span>
            <span>${lang === 'pl' ? 'AKTYWNY INWARIANT' : 'VERIFIED INVARIANT'}</span>
          </div>
        </div>

        <div class="arch-inspector-body">
          <div class="arch-inspector-facts">
            <div class="arch-fact-box">
              <span class="arch-fact-lbl">${lang === 'pl' ? 'Reguła Architektoniczna' : 'Architectural Invariant'}</span>
              <p class="arch-fact-val">${lang === 'pl' ? node.invariantPl : node.invariantEn}</p>
            </div>
            <div class="arch-fact-box">
              <span class="arch-fact-lbl">${lang === 'pl' ? 'Wyeliminowane Ryzyko Biznesowe' : 'Enterprise Risk Mitigated'}</span>
              <p class="arch-fact-val">${lang === 'pl' ? node.riskPl : node.riskEn}</p>
            </div>
          </div>

          <div class="arch-code-panel">
            <div class="arch-code-header">
              <span>${node.name} — ${lang === 'pl' ? 'Wycinek Kontraktu / Kodu' : 'Production Contract / Code'}</span>
              <button type="button" class="arch-copy-code-btn" title="Copy code">${lang === 'pl' ? 'Kopiuj' : 'Copy'}</button>
            </div>
            <pre class="arch-code-body"><code>${escapeHtml(node.code)}</code></pre>
          </div>
        </div>
      `;

      const copyBtn = inspectorCardEl.querySelector('.arch-copy-code-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          if (window.copyToClipboard) {
            window.copyToClipboard(node.code, copyBtn);
          }
        });
      }
    }

    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeArchKey = btn.getAttribute('data-arch');
        selectedNodeIndex = 0;
        renderActiveArchitecture();
      });
    });

    window.addEventListener('apsw:languageChanged', renderActiveArchitecture);
    renderActiveArchitecture();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArchitectureMatrix);
  } else {
    initArchitectureMatrix();
  }
})();
