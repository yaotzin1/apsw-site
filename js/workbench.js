/**
 * APSW Labs website - the hero workbench.
 *
 * Left pane: a simulated Indaba run (spec -> council -> gate with one failed attempt -> artifact).
 * Right pane: the artifact for the chosen scenario, all of it working in the page:
 *   grid    a miniature data grid with search, sort, paging and a local-array / remote-API switch
 *   engine  the council transcript (markup in index.html; this file only opens and closes steps)
 *   saas    a multi-tenant triage belt with a token-credit ledger
 *
 * Everything here is sample data and a simulated run; the page labels it so. YAML, commands and log
 * lines are code and stay in English. Every other visible string goes through a translation key.
 */

document.addEventListener('DOMContentLoaded', () => {
  const workbench = document.getElementById('wb');
  if (!workbench) return;

  const i18n = window.APSW_I18N;
  const t = (key) => (i18n ? i18n.t(key) : key);
  const locale = () => (i18n && i18n.currentLang === 'pl' ? 'pl-PL' : 'en-US');
  const setKey = (element, key) => {
    if (!element) return;
    element.setAttribute('data-i18n', key);
    element.textContent = t(key);
  };
  const byId = (id) => document.getElementById(id);
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ================================================================== Scenarios

  const SCENARIOS = {
    grid: {
      trace: '8f92a1',
      pair: 'claude-code ⇄ gemini',
      gate: 'vitest + packaging audit',
      fail: 'FAIL  footer/total.spec.ts > says "of many" when the server sends no count\n      expected "1–50 of many", received "1–50 of 50"',
      pass: 'attempt 2 · all tests passed · npm pack --dry-run ok',
      yaml: [
        '# apsw-gridwright · remote totals',
        'version: "1.0"',
        'name: "remote-totals"',
        'steps:',
        '  - id: "spec"',
        '    runner: "claude-code"',
        '    guards: ["test -s specs/remote-totals.md"]',
        '  - id: "council"',
        '    depends_on: ["spec"]',
        '    council: ["claude-code", "gemini"]',
        '    quorum: 2',
        '  - id: "gate"',
        '    runner: "shell"',
        '    depends_on: ["council"]',
        '    commands:',
        '      - "npx vitest run"',
        '      - "npm pack --dry-run"',
        '    retry: { max: 2, context: "last-failure" }',
      ],
    },
    engine: {
      trace: '8f92a1',
      pair: 'claude ⇄ antigravity',
      gate: 'vitest + smoke on the built package',
      fail: 'FAIL  council/quorum.spec.ts > a tie goes to the human arbiter\n      expected arbiter "human", received "none"',
      pass: 'attempt 2 · suite passed · smoke test on dist/ ok',
      yaml: [
        '# @indaba/engine · arbiter fallback',
        'version: "1.0"',
        'name: "arbiter-fallback"',
        'steps:',
        '  - id: "rfc"',
        '    council: ["claude", "antigravity"]',
        '    guards: ["test -s specs/rfc-claude.md"]',
        '  - id: "debate"',
        '    depends_on: ["rfc"]',
        '    council: ["claude", "antigravity"]',
        '    quorum: 2',
        '    arbiter: "human"',
        '  - id: "verify"',
        '    runner: "shell"',
        '    depends_on: ["debate"]',
        '    commands:',
        '      - "npx vitest run"',
        '      - "node scripts/smoke-dist.mjs"',
        '    retry: { max: 2, context: "last-failure" }',
      ],
    },
    saas: {
      trace: '8f92a1',
      pair: 'claude-code ⇄ codex',
      gate: 'phpunit contracts + tenant isolation',
      fail: 'FAIL  TenantIsolationTest::testQueueIsScopedToTenant\n      tenant_b read 1 row owned by tenant_a',
      pass: 'attempt 2 · contracts passed · 0 cross-tenant rows',
      yaml: [
        '# reputation platform · triage queue',
        'version: "1.0"',
        'name: "triage-queue"',
        'steps:',
        '  - id: "spec"',
        '    runner: "claude-code"',
        '    guards: ["test -s specs/triage-queue.md"]',
        '  - id: "council"',
        '    depends_on: ["spec"]',
        '    council: ["claude-code", "codex"]',
        '    quorum: 2',
        '  - id: "gate"',
        '    runner: "shell"',
        '    depends_on: ["council"]',
        '    commands:',
        '      - "php bin/phpunit --testsuite contract"',
        '      - "php bin/phpunit --group tenant-isolation"',
        '    retry: { max: 2, context: "last-failure" }',
      ],
    },
  };

  /** Builds the highlighted YAML with DOM nodes, so no markup string is ever parsed. */
  function renderYaml(lines) {
    const code = byId('wb-yaml').querySelector('code');
    code.textContent = '';
    lines.forEach((line, index) => {
      if (line.trimStart().startsWith('#')) {
        code.append(make('span', 'y-com', line));
      } else {
        const match = line.match(/^(\s*(?:- )?)([\w-]+)(:)(.*)$/);
        if (match) {
          code.append(match[1], make('span', 'y-key', match[2]), match[3], make('span', 'y-str', match[4]));
        } else {
          code.append(make('span', 'y-str', line));
        }
      }
      if (index < lines.length - 1) code.append('\n');
    });
  }

  // ================================================================== Pipeline

  const TOTAL_TOKENS = 14820;
  const TOTAL_COST = 0.042;
  const STEP_ORDER = ['spec', 'council', 'gate', 'artifact'];
  const FINAL_NOTE = { spec: 'wb.n_spec_ok', council: 'wb.n_council_ok', gate: 'wb.n_gate_ok', artifact: 'wb.n_art_ok' };
  const PHASES = [
    { step: 'spec', state: 'run', note: 'wb.n_spec_run', tokens: 0 },
    { step: 'spec', state: 'ok', note: 'wb.n_spec_ok', tokens: 1240 },
    { step: 'council', state: 'run', note: 'wb.n_council_run', tokens: 1240 },
    { step: 'council', state: 'ok', note: 'wb.n_council_ok', tokens: 9200 },
    { step: 'gate', state: 'run', note: 'wb.n_gate_run', tokens: 9200 },
    { step: 'gate', state: 'fail', note: 'wb.n_gate_fail', tokens: 11460 },
    { step: 'gate', state: 'retry', note: 'wb.n_gate_retry', tokens: 11460 },
    { step: 'gate', state: 'ok', note: 'wb.n_gate_ok', tokens: TOTAL_TOKENS },
    { step: 'artifact', state: 'ok', note: 'wb.n_art_ok', tokens: TOTAL_TOKENS },
  ];
  const LAST_PHASE = PHASES.length - 1;
  const PHASE_MS = 1100;

  const stepElements = Object.fromEntries(STEP_ORDER.map((name) => [name, workbench.querySelector(`.pstep[data-step="${name}"]`)]));
  const logElement = byId('wb-log');
  const statusChip = byId('wb-status');
  const tokensElement = byId('tel-tokens');
  const costElement = byId('tel-cost');
  const costNote = byId('tel-cost-note');
  const nextButton = byId('wb-next');
  const autoButton = byId('wb-mode-auto');
  const stepButton = byId('wb-mode-step');

  let scenario = 'grid';
  let phase = LAST_PHASE;
  let stepMode = false;
  let timer = null;
  let shownTokens = TOTAL_TOKENS;
  let tokenFrame = null;

  function showTokens(value) {
    shownTokens = value;
    tokensElement.textContent = Math.round(value).toLocaleString('en-US');
    costElement.textContent = `$${((value / TOTAL_TOKENS) * TOTAL_COST).toFixed(3)}`;
  }

  function animateTokens(target) {
    cancelAnimationFrame(tokenFrame);
    if (reducedMotion || target <= shownTokens) return showTokens(target);
    const from = shownTokens;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / (PHASE_MS * 0.8));
      showTokens(from + (target - from) * progress);
      if (progress < 1) tokenFrame = requestAnimationFrame(tick);
    };
    tokenFrame = requestAnimationFrame(tick);
  }

  function applyPhase(index) {
    phase = index;
    const current = PHASES[index];
    const currentPosition = STEP_ORDER.indexOf(current.step);
    STEP_ORDER.forEach((name, position) => {
      const element = stepElements[name];
      const note = element.querySelector('.pnote');
      if (position < currentPosition) {
        element.setAttribute('data-state', 'ok');
        setKey(note, FINAL_NOTE[name]);
      } else if (position === currentPosition) {
        element.setAttribute('data-state', current.state);
        setKey(note, current.note);
      } else {
        element.setAttribute('data-state', 'wait');
        setKey(note, 'wb.n_wait');
      }
    });

    // The gate keeps its evidence on screen: the failure while it is being fixed, the pass after.
    const gateState = stepElements.gate.getAttribute('data-state');
    const config = SCENARIOS[scenario];
    if (gateState === 'fail' || gateState === 'retry') {
      logElement.hidden = false;
      logElement.textContent = config.fail;
    } else if (gateState === 'ok') {
      logElement.hidden = false;
      logElement.textContent = config.pass;
    } else {
      logElement.hidden = true;
    }

    const done = index === LAST_PHASE;
    workbench.setAttribute('data-done', done ? 'true' : 'false');
    workbench.style.setProperty('--progress', String((index + 1) / PHASES.length));
    statusChip.setAttribute('data-state', done ? 'verified' : 'pending');
    setKey(statusChip, done ? 'wb.status_verified' : 'wb.status_pending');
    costNote.hidden = !done; // the cost is only called provider-verified once the run has finished
    animateTokens(current.tokens);
    nextButton.disabled = !stepMode || done;
  }

  function stopTimer() {
    clearTimeout(timer);
    timer = null;
  }

  function schedule() {
    stopTimer();
    if (stepMode || phase >= LAST_PHASE) return;
    timer = setTimeout(() => {
      applyPhase(phase + 1);
      schedule();
    }, PHASE_MS);
  }

  function replay() {
    stopTimer();
    shownTokens = 0;
    applyPhase(0);
    schedule();
  }

  function setStepMode(on) {
    stepMode = on;
    autoButton.setAttribute('aria-pressed', on ? 'false' : 'true');
    stepButton.setAttribute('aria-pressed', on ? 'true' : 'false');
    nextButton.disabled = !on || phase >= LAST_PHASE;
    if (on) stopTimer();
    else schedule();
  }

  byId('wb-replay').addEventListener('click', replay);
  autoButton.addEventListener('click', () => setStepMode(false));
  stepButton.addEventListener('click', () => setStepMode(true));
  nextButton.addEventListener('click', () => {
    if (phase < LAST_PHASE) applyPhase(phase + 1);
  });

  // ================================================================== Scenario tabs

  const tabs = Array.from(document.querySelectorAll('.scenario-tab'));

  function selectScenario(name, { focus = false, run = true } = {}) {
    scenario = name;
    const config = SCENARIOS[name];
    tabs.forEach((tab) => {
      const selected = tab.dataset.scenario === name;
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
      tab.tabIndex = selected ? 0 : -1;
      byId(tab.getAttribute('aria-controls')).hidden = !selected;
      if (selected && focus) tab.focus();
    });
    renderYaml(config.yaml);
    byId('wb-pair').textContent = config.pair;
    byId('wb-gate').textContent = config.gate;
    byId('tel-trace').textContent = config.trace;
    if (run) replay();
    else applyPhase(LAST_PHASE);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectScenario(tab.dataset.scenario));
    tab.addEventListener('keydown', (event) => {
      const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      event.preventDefault();
      selectScenario(tabs[(index + step + tabs.length) % tabs.length].dataset.scenario, { focus: true });
    });
  });

  // ================================================================== 01 · Mini grid

  const PAGE_SIZE = 50;
  const LOCAL_ROWS = 1284;
  const STATUS_RANK = { healthy: 0, degraded: 1, down: 2 };

  /** Deterministic sample data, so the grid shows the same rows on every visit. */
  function buildRows() {
    let seed = 20261111;
    const random = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
    const domains = ['billing', 'ledger', 'auth', 'search', 'ingest', 'notify', 'pricing', 'routing', 'catalog', 'audit', 'export', 'session', 'quota', 'risk', 'geo', 'media'];
    const kinds = ['api', 'worker', 'gateway', 'stream', 'cache', 'db'];
    const regions = ['eu1', 'eu2', 'us1', 'us2', 'ap1'];
    const rows = [];
    for (let index = 0; rows.length < LOCAL_ROWS; index += 1) {
      const domain = domains[index % domains.length];
      const kind = kinds[Math.floor(index / domains.length) % kinds.length];
      const region = regions[Math.floor(index / (domains.length * kinds.length)) % regions.length];
      const shard = Math.floor(index / (domains.length * kinds.length * regions.length)) + 1;
      const roll = random();
      const status = roll < 0.82 ? 'healthy' : roll < 0.95 ? 'degraded' : 'down';
      const base = 8 + Math.pow(random(), 3) * 420;
      rows.push({
        name: `${domain}-${kind}.${region}/s${shard}`,
        latency: Math.round(status === 'healthy' ? base : status === 'degraded' ? base * 2.4 + 180 : 5000),
        throughput: status === 'down' ? 0 : Math.round(20 + Math.pow(random(), 2) * 48000),
        status,
      });
    }
    return rows;
  }

  const allRows = buildRows();
  const grid = { query: '', sortKey: null, sortDir: 'ascending', remote: false, page: 0, request: 0 };
  const gridBody = byId('gw-body');
  const gridScroll = byId('grid-scroll');
  const gridCount = byId('gw-count');
  const gridRequest = byId('grid-req');
  const gridDiff = byId('grid-diff');
  const swapButton = byId('grid-swap');
  const sortButtons = Array.from(document.querySelectorAll('.gw-sort'));

  /** The query both sources answer: filter, sort, then one page. A real server would do the same. */
  function queryRows() {
    const needle = grid.query.trim().toLowerCase();
    let rows = allRows;
    if (needle) rows = rows.filter((row) => row.name.includes(needle) || t(`grid.st_${row.status}`).toLowerCase().includes(needle));
    if (grid.sortKey) {
      const direction = grid.sortDir === 'ascending' ? 1 : -1;
      const key = grid.sortKey;
      rows = [...rows].sort((a, b) => {
        if (key === 'name') return a.name.localeCompare(b.name) * direction;
        if (key === 'status') return (STATUS_RANK[a.status] - STATUS_RANK[b.status]) * direction || a.name.localeCompare(b.name);
        return (a[key] - b[key]) * direction || a.name.localeCompare(b.name);
      });
    }
    const offset = grid.page * PAGE_SIZE;
    return { total: rows.length, offset, page: rows.slice(offset, offset + PAGE_SIZE) };
  }

  function paintGrid({ total, offset, page }) {
    const number = new Intl.NumberFormat(locale());
    gridBody.textContent = '';
    if (page.length === 0) {
      const row = make('tr', 'empty');
      const cell = make('td', '', t('grid.no_rows'));
      cell.colSpan = 4;
      row.append(cell);
      gridBody.append(row);
    }
    for (const item of page) {
      const row = make('tr');
      const status = make('td');
      status.append(make('span', `st st-${item.status}`, t(`grid.st_${item.status}`)));
      row.append(
        make('td', '', item.name),
        make('td', 'num', item.status === 'down' ? '—' : `${number.format(item.latency)} ms`),
        make('td', 'num', `${number.format(item.throughput)} req/s`),
        status,
      );
      gridBody.append(row);
    }

    const end = offset + page.length;
    const range = page.length ? `${number.format(offset + 1)}–${number.format(end)}` : '0';
    gridCount.textContent = '';
    // A remote source that sends no count only proves the end with a short page.
    const endKnown = !grid.remote || page.length < PAGE_SIZE;
    if (endKnown) {
      gridCount.append(`${range} ${t('grid.of')} ${number.format(grid.remote ? end : total)}`);
    } else {
      gridCount.append(`${range} `, make('span', 'many', t('grid.of_many')));
    }
    byId('gw-prev').disabled = grid.page === 0;
    byId('gw-next').disabled = page.length < PAGE_SIZE || (!grid.remote && end >= total);
  }

  function refreshGrid() {
    const result = queryRows();
    if (!grid.remote) {
      gridRequest.hidden = true;
      gridScroll.removeAttribute('aria-busy');
      paintGrid(result);
      return;
    }
    const parameters = [`offset=${result.offset}`, `limit=${PAGE_SIZE}`];
    if (grid.sortKey) parameters.push(`sort=${grid.sortKey}:${grid.sortDir === 'ascending' ? 'asc' : 'desc'}`);
    if (grid.query.trim()) parameters.push(`q=${encodeURIComponent(grid.query.trim())}`);
    gridRequest.hidden = false;
    gridRequest.textContent = `GET /api/services?${parameters.join('&')}`;
    gridScroll.setAttribute('aria-busy', 'true');
    const request = (grid.request += 1);
    setTimeout(() => {
      if (request !== grid.request || !grid.remote) return; // a newer request superseded this one
      gridRequest.textContent += `   → 200 · ${result.page.length} rows · no total`;
      gridScroll.removeAttribute('aria-busy');
      paintGrid(result);
    }, reducedMotion ? 0 : 260);
  }

  byId('grid-search').addEventListener('input', (event) => {
    grid.query = event.target.value;
    grid.page = 0;
    refreshGrid();
  });

  sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.key;
      if (grid.sortKey !== key) {
        grid.sortKey = key;
        grid.sortDir = 'ascending';
      } else if (grid.sortDir === 'ascending') {
        grid.sortDir = 'descending';
      } else {
        grid.sortKey = null;
      }
      grid.page = 0;
      sortButtons.forEach((other) => other.closest('th').setAttribute('aria-sort', other.dataset.key === grid.sortKey ? grid.sortDir : 'none'));
      refreshGrid();
    });
  });

  swapButton.addEventListener('click', () => {
    grid.remote = !grid.remote;
    grid.page = 0;
    swapButton.setAttribute('aria-pressed', grid.remote ? 'true' : 'false');
    setKey(swapButton, grid.remote ? 'grid.swap_to_local' : 'grid.swap_to_remote');
    setKey(byId('gw-note'), grid.remote ? 'grid.remote_note' : 'grid.local_note');
    gridDiff.setAttribute('data-remote', grid.remote ? 'true' : 'false');
    refreshGrid();
  });

  byId('gw-prev').addEventListener('click', () => {
    grid.page = Math.max(0, grid.page - 1);
    gridScroll.scrollTop = 0;
    refreshGrid();
  });
  byId('gw-next').addEventListener('click', () => {
    grid.page += 1;
    gridScroll.scrollTop = 0;
    refreshGrid();
  });

  // ================================================================== 02 · Council transcript

  document.querySelectorAll('.acc-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
      byId(button.getAttribute('aria-controls')).hidden = !open;
    });
  });

  // ================================================================== 03 · Triage belt

  const STAGE_COST = { 1: { key: 'belt.l_classify', credits: 2 }, 2: { key: 'belt.l_draft', credits: 6 } };
  const APPROVAL_STAGE = 3;
  const SOURCES = ['Google', 'Trustpilot', 'App Store', 'Facebook'];
  let nextItemId = 4821;
  const newItem = (stage = 0) => {
    nextItemId += 7;
    return { id: `#${nextItemId}`, source: SOURCES[nextItemId % SOURCES.length], stars: 1 + (nextItemId % 4), stage };
  };
  const tenants = {
    tenant_a: { credits: 1200, published: 0, ledger: [], items: [newItem(0), newItem(1), newItem(2), newItem(3)] },
    tenant_b: { credits: 640, published: 0, ledger: [], items: [newItem(0), newItem(0), newItem(2), newItem(3), newItem(3)] },
    tenant_c: { credits: 2050, published: 0, ledger: [], items: [newItem(1), newItem(2), newItem(3)] },
  };
  let activeTenant = 'tenant_a';
  const beltColumns = Array.from(document.querySelectorAll('.belt-col'));
  const tenantButtons = Array.from(document.querySelectorAll('.tenant-btn'));

  function paintBelt() {
    const tenant = tenants[activeTenant];
    const number = new Intl.NumberFormat(locale());
    const hiddenRows = Object.entries(tenants).filter(([name]) => name !== activeTenant).reduce((sum, [, other]) => sum + other.items.length, 0);
    byId('belt-shield-text').textContent = t('belt.shield').replace('{tenant}', activeTenant).replace('{n}', String(hiddenRows));

    beltColumns.forEach((column) => {
      const stage = Number(column.dataset.stage);
      const list = column.querySelector('.belt-list');
      list.textContent = '';
      const items = tenant.items.filter((item) => item.stage === stage);
      if (items.length === 0) list.append(make('li', 'belt-empty', t('belt.empty')));
      for (const item of items) {
        const entry = make('li', 'belt-item');
        entry.append(make('span', 'bi-id', item.id), make('span', 'bi-stars', '★'.repeat(item.stars) + '☆'.repeat(5 - item.stars)), make('span', 'bi-meta', item.source));
        if (stage === APPROVAL_STAGE) {
          const approve = make('button', 'bi-approve', t('belt.approve'));
          approve.type = 'button';
          approve.addEventListener('click', () => {
            // Optimistic: the item leaves the belt at once.
            tenant.items = tenant.items.filter((other) => other !== item);
            tenant.published += 1;
            paintBelt();
          });
          entry.append(approve);
        }
        list.append(entry);
      }
    });

    byId('ledger-balance').textContent = number.format(tenant.credits);
    byId('ledger-published').textContent = number.format(tenant.published);
    const ledger = byId('ledger-list');
    ledger.textContent = '';
    if (tenant.ledger.length === 0) ledger.append(make('li', 'none', t('belt.l_none')));
    for (const charge of tenant.ledger.slice(0, 4)) {
      const line = make('li');
      line.append(make('span', '', `${charge.id} · ${t(charge.key)}`), make('span', 'amt', `−${charge.credits}`));
      ledger.append(line);
    }
  }

  byId('belt-advance').addEventListener('click', () => {
    const tenant = tenants[activeTenant];
    for (const item of tenant.items) {
      if (item.stage >= APPROVAL_STAGE) continue; // approval waits for a human
      item.stage += 1;
      const cost = STAGE_COST[item.stage];
      if (cost) {
        tenant.credits -= cost.credits;
        tenant.ledger.unshift({ id: item.id, key: cost.key, credits: cost.credits });
      }
    }
    tenant.items.push(newItem(0));
    paintBelt();
  });

  tenantButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeTenant = button.dataset.tenant;
      tenantButtons.forEach((other) => other.setAttribute('aria-pressed', other === button ? 'true' : 'false'));
      paintBelt();
    });
  });

  // ================================================================== Start

  window.addEventListener('apsw:languageChanged', () => {
    refreshGrid();
    paintBelt();
  });

  refreshGrid();
  paintBelt();
  // With reduced motion the run is shown finished; otherwise it plays once on load.
  selectScenario('grid', { run: !reducedMotion });
});
