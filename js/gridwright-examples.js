/**
 * APSW - apsw-gridwright Standalone Examples & Interactive Playground Controller
 * Fully self-contained logic:
 * - Theme Switcher (Light / Dark)
 * - Bilingual Language Switcher (EN / PL)
 * - Live REST query harness connected to /api/people.php
 * - Inline PATCH editing with error rejection demonstration
 * - Master-detail row expansion (/api/people/{id}/orders)
 * - One-click canonical snippet copy
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DICTIONARIES (EN & PL) FOR STANDALONE PLAYBOOK PAGE
  // --------------------------------------------------------------------------
  const I18N = {
    en: {
      pageTitle: "apsw-gridwright: Canonical Code Examples & Agent Playbook",
      brandSub: "AGENT PLAYBOOK & CANONICAL RECIPES",
      backToSite: "← Back to apsw.pl",
      gw_nav: {
        rules: "Playbook Rules",
        matrix: "Decision Matrix",
        playground: "Live REST Harness",
        snippets: "Canonical Snippets",
        checklist: "Audit Checklist",
        github: "GitHub"
      },
      gw_hero: {
        badge: "APSW-GRIDWRIGHT REFERENCE & AGENT PLAYBOOK",
        title_html: "Deterministic React Data Grid Architecture",
        desc_html: "Rules, canonical code snippets, and live interactive REST harness for AI coding agents and enterprise engineers integrating <code>apsw-gridwright</code> into production React applications. Zero narrative, maximum deterministic precision.",
        btn_playground: "Test Live REST Harness",
        btn_snippets: "Browse Snippets",
        btn_repo: "GitHub Repository"
      },
      gw_rules: {
        tag: "ARCHITECTURAL GUARDRAILS",
        title: "Strict Agent Rules: Always vs Never",
        subtitle: "AI coding agents writing apsw-gridwright code MUST follow these foundational rules without deviation.",
        always_title: "Always",
        always_badge: "MANDATORY",
        never_title: "Never",
        never_badge: "FORBIDDEN"
      },
      gw_matrix: {
        tag: "ARCHITECTURE SELECTION",
        title: "Decision Rules Matrix",
        subtitle: "Match your application requirement to the canonical apsw-gridwright pattern."
      },
      gw_play: {
        tag: "LIVE REST WIRE HARNESS",
        title: "Interactive PHP REST Playground",
        subtitle: "This live interactive workbench is connected directly to our hardened backend at /api/people.php. Test sorting, filtering, pagination, master-detail order expansion, and inline cell editing with real-time HTTP wire telemetry."
      },
      gw_snip: {
        tag: "PLAYBOOK RECIPES",
        title: "Canonical Code Snippets Library",
        subtitle: "Zero-narrative, battle-tested code snippets directly from the agent playbook. Click any copy button to drop directly into your application."
      },
      gw_check: {
        tag: "CI VERIFICATION GATES",
        title: "AI Agent Pre-Flight Audit Checklist",
        subtitle: "AI coding agents and reviewers must execute this verification checklist before reporting any task complete."
      },
      nav: {
        skip_link: "Skip to content"
      },
      footer: {
        tagline: "AI-Native Solution Architecture & Deterministic Enterprise Engineering."
      }
    },
    pl: {
      pageTitle: "apsw-gridwright: Kanoniczne Przykłady Kodu & Playbook Agenta",
      brandSub: "PLAYBOOK AGENTA & KANONICZNE RECEPTURY",
      backToSite: "← Powrót do apsw.pl",
      gw_nav: {
        rules: "Zasady Playbooka",
        matrix: "Matryca Decyzji",
        playground: "Test REST na żywo",
        snippets: "Kanoniczne Snippety",
        checklist: "Lista Audytowa",
        github: "GitHub"
      },
      gw_hero: {
        badge: "APSW-GRIDWRIGHT REFERENCJA & AGENT PLAYBOOK",
        title_html: "Deterministyczna Architektura Tabel React",
        desc_html: "Reguły, kanoniczne fragmenty kodu i interaktywny poligon REST dla agentów kodujących AI oraz inżynierów integrujących <code>apsw-gridwright</code> w produkcyjnych aplikacjach React. Zero lania wody, pełna precyzja.",
        btn_playground: "Testuj REST na żywo",
        btn_snippets: "Przeglądaj Snippety",
        btn_repo: "Repozytorium GitHub"
      },
      gw_rules: {
        tag: "ARCHITEKTONICZNE BARIERY",
        title: "Ścisłe Reguły Agenta: Zawsze vs Nigdy",
        subtitle: "Agenci kodujący AI piszący kod apsw-gridwright MUSZĄ bezwzględnie stosować te reguły.",
        always_title: "Zawsze",
        always_badge: "WYMAGANE",
        never_title: "Nigdy",
        never_badge: "ZABRONIONE"
      },
      gw_matrix: {
        tag: "DOBÓR ARCHITEKTURY",
        title: "Matryca Zasad Decyzyjnych",
        subtitle: "Dopasuj wymagania aplikacji do kanonicznego wzorca apsw-gridwright."
      },
      gw_play: {
        tag: "HARNESS REST NA ŻYWO",
        title: "Interaktywny Poligon PHP REST",
        subtitle: "Ten interaktywny stół testowy łączy się bezpośrednio z backendem pod /api/people.php. Testuj sortowanie, filtrowanie, stronicowanie, rozwijanie wierszy master-detail i edycję komórek inline z podglądem telemetrii HTTP na żywo."
      },
      gw_snip: {
        tag: "RECEPTURY PLAYBOOKA",
        title: "Biblioteka Kanonicznych Fragmentów Kodu",
        subtitle: "Precyzyjne, sprawdzone w boju fragmenty kodu z playbooka agenta. Kliknij Kopiuj, aby wkleić bezpośrednio do aplikacji."
      },
      gw_check: {
        tag: "BRAMKI WERYFIKACJI CI",
        title: "Przedwdrożeniowa Lista Kontrolna Agenta AI",
        subtitle: "Agenci kodujący AI oraz weryfikatorzy kodu muszą sprawdzić tę checklistę przed zatwierdzeniem zadania."
      },
      nav: {
        skip_link: "Przejdź do treści"
      },
      footer: {
        tagline: "Architektura Rozwiązań AI-Native & Deterministyczna Inżynieria Enterprise."
      }
    }
  };

  let currentLang = 'en';

  function getTranslation(dict, path) {
    if (!dict) return null;
    if (dict[path] !== undefined) return dict[path];
    const parts = path.split('.');
    let val = dict;
    for (const p of parts) {
      if (val && typeof val === 'object' && p in val) {
        val = val[p];
      } else {
        return null;
      }
    }
    return val;
  }

  const state = {
    page: 1,
    pageSize: 10,
    search: '',
    department: '',
    sortCol: 'salary',
    sortDir: 'desc',
    selectedIds: new Set(),
    expandedIds: new Set(),
    childOrdersCache: new Map(),
    isLoading: false
  };

  const API_BASE = 'api/people.php';

  // DOM Elements
  let searchInput, deptSelect, pageSizeSelect, sortSelect, resetBtn;
  let gridTableBody, selectAllCheckbox, pageInfoEl, prevPageBtn, nextPageBtn;
  let liveCountBadge, inspectorUrlEl, inspectorLatencyEl, inspectorStatusEl, inspectorHeadersEl, inspectorPayloadEl;
  let toastEl, themeToggleBtn;

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initElements();
    initEventListeners();
    fetchGridData();
    initSnippetTabs();
    initCopyButtons();
  });

  // --------------------------------------------------------------------------
  // 2. THEME CONTROLLER
  // --------------------------------------------------------------------------
  function initTheme() {
    themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;

    const syncThemeIcon = (theme) => {
      if (!themeToggleBtn) return;
      if (theme === 'dark') {
        themeToggleBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" title="Switch to light mode">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="12" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
      } else {
        themeToggleBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" title="Switch to dark mode">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
      }
    };

    const activeTheme = htmlElement.getAttribute('data-theme') || 'light';
    syncThemeIcon(activeTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const cur = htmlElement.getAttribute('data-theme') || 'light';
        const next = cur === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', next);
        try { localStorage.setItem('apsw_theme', next); } catch (e) {}
        syncThemeIcon(next);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 3. STANDALONE LANGUAGE CONTROLLER
  // --------------------------------------------------------------------------
  function initLanguage() {
    try {
      const stored = localStorage.getItem('apsw_lang');
      if (stored === 'pl' || stored === 'en') {
        currentLang = stored;
      }
    } catch (e) {}

    applyLanguage(currentLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        if (lang && (lang === 'en' || lang === 'pl') && lang !== currentLang) {
          currentLang = lang;
          try { localStorage.setItem('apsw_lang', lang); } catch (e) {}
          applyLanguage(lang);
        }
      });
    });
  }

  function applyLanguage(lang) {
    const dict = I18N[lang] || I18N.en;
    document.documentElement.lang = lang;
    if (dict.pageTitle) {
      document.title = dict.pageTitle;
    }

    // Apply data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getTranslation(dict, key);
      if (val) {
        el.textContent = val;
      }
    });

    // Apply data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = getTranslation(dict, key);
      if (val) {
        el.innerHTML = val;
      }
    });

    // Apply placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = getTranslation(dict, key);
      if (val) {
        el.setAttribute('placeholder', val);
      }
    });

    // Update active button state
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
  }

  // --------------------------------------------------------------------------
  // 4. PLAYGROUND TABLE & API LOGIC
  // --------------------------------------------------------------------------
  function initElements() {
    searchInput = document.getElementById('gw-search-input');
    deptSelect = document.getElementById('gw-dept-select');
    pageSizeSelect = document.getElementById('gw-page-size-select');
    sortSelect = document.getElementById('gw-sort-select');
    resetBtn = document.getElementById('gw-reset-btn');

    gridTableBody = document.getElementById('gw-grid-tbody');
    selectAllCheckbox = document.getElementById('gw-select-all');
    pageInfoEl = document.getElementById('gw-page-info');
    prevPageBtn = document.getElementById('gw-prev-page');
    nextPageBtn = document.getElementById('gw-next-page');

    liveCountBadge = document.getElementById('gw-live-count');
    inspectorUrlEl = document.getElementById('gw-inspector-url');
    inspectorLatencyEl = document.getElementById('gw-inspector-latency');
    inspectorStatusEl = document.getElementById('gw-inspector-status');
    inspectorHeadersEl = document.getElementById('gw-inspector-headers');
    inspectorPayloadEl = document.getElementById('gw-inspector-payload');

    toastEl = document.getElementById('gw-toast');
  }

  function initEventListeners() {
    // Search with debounce
    let debounceTimer;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          state.search = e.target.value.trim();
          state.page = 1;
          fetchGridData();
        }, 300);
      });
    }

    // Department filter
    if (deptSelect) {
      deptSelect.addEventListener('change', (e) => {
        state.department = e.target.value;
        state.page = 1;
        fetchGridData();
      });
    }

    // Page size
    if (pageSizeSelect) {
      pageSizeSelect.addEventListener('change', (e) => {
        state.pageSize = parseInt(e.target.value, 10) || 10;
        state.page = 1;
        fetchGridData();
      });
    }

    // Sort selector
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val) {
          const parts = val.split(':');
          state.sortCol = parts[0];
          state.sortDir = parts[1] || 'asc';
        }
        state.page = 1;
        fetchGridData();
      });
    }

    // Header click sort
    document.querySelectorAll('.gw-live-grid th[data-col]').forEach(th => {
      th.addEventListener('click', () => {
        const col = th.getAttribute('data-col');
        if (state.sortCol === col) {
          state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          state.sortCol = col;
          state.sortDir = 'asc';
        }
        updateSortHeaderClasses();
        fetchGridData();
      });
    });

    // Pagination
    if (prevPageBtn) {
      prevPageBtn.addEventListener('click', () => {
        if (state.page > 1) {
          state.page--;
          fetchGridData();
        }
      });
    }
    if (nextPageBtn) {
      nextPageBtn.addEventListener('click', () => {
        state.page++;
        fetchGridData();
      });
    }

    // Select all
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', (e) => {
        const checkboxes = gridTableBody.querySelectorAll('input.gw-row-select');
        checkboxes.forEach(cb => {
          cb.checked = e.target.checked;
          const id = parseInt(cb.getAttribute('data-id'), 10);
          if (e.target.checked) {
            state.selectedIds.add(id);
          } else {
            state.selectedIds.delete(id);
          }
        });
        updateRowSelectionClasses();
      });
    }

    // Reset Seed Data
    if (resetBtn) {
      resetBtn.addEventListener('click', async () => {
        try {
          const res = await fetch(`${API_BASE}?action=reset`, { method: 'POST' });
          const json = await res.json();
          showToast(json.message || 'Dataset reset to original 100 rows.', 'success');
          state.childOrdersCache.clear();
          state.expandedIds.clear();
          fetchGridData();
        } catch (err) {
          showToast('Failed to reset dataset: ' + err.message, 'error');
        }
      });
    }

    // Mobile nav toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('mobile-open');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
      });
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('mobile-open');
        });
      });
    }
  }

  function updateSortHeaderClasses() {
    document.querySelectorAll('.gw-live-grid th[data-col]').forEach(th => {
      const col = th.getAttribute('data-col');
      th.classList.remove('sorted-asc', 'sorted-desc');
      if (col === state.sortCol) {
        th.classList.add(state.sortDir === 'asc' ? 'sorted-asc' : 'sorted-desc');
      }
    });
  }

  async function fetchGridData() {
    if (state.isLoading) return;
    state.isLoading = true;

    const params = new URLSearchParams();
    params.set('page', state.page.toString());
    params.set('pageSize', state.pageSize.toString());
    if (state.search) params.set('search', state.search);
    if (state.department) params.set('department', state.department);
    if (state.sortCol) params.set('sort', `${state.sortCol}:${state.sortDir}`);

    const requestUrl = `${API_BASE}?${params.toString()}`;
    const startTime = performance.now();

    try {
      const response = await fetch(requestUrl);
      const latency = Math.round(performance.now() - startTime);
      const totalCountHeader = response.headers.get('X-Total-Count') || '';
      const statusText = `${response.status} ${response.statusText}`;

      const data = await response.json();
      state.isLoading = false;

      updateInspector({
        method: 'GET',
        url: `/${requestUrl}`,
        status: statusText,
        statusCode: response.status,
        latency: `${latency}ms`,
        headers: {
          'Content-Type': response.headers.get('Content-Type'),
          'X-Total-Count': totalCountHeader,
          'Content-Range': response.headers.get('Content-Range') || 'items'
        },
        payload: data
      });

      renderTable(data);
    } catch (err) {
      state.isLoading = false;
      showToast('Error loading grid data: ' + err.message, 'error');
    }
  }

  function renderTable(response) {
    if (!gridTableBody) return;
    gridTableBody.innerHTML = '';

    const rows = response.data || response.rows || [];
    const total = response.total !== undefined ? response.total : (response.totalRows || 0);
    const totalPages = response.totalPages || Math.ceil(total / state.pageSize) || 1;

    if (liveCountBadge) {
      liveCountBadge.textContent = `${total} records live`;
    }

    if (pageInfoEl) {
      pageInfoEl.textContent = `Page ${state.page} of ${totalPages} (${total} total rows)`;
    }
    if (prevPageBtn) prevPageBtn.disabled = state.page <= 1;
    if (nextPageBtn) nextPageBtn.disabled = state.page >= totalPages;

    if (rows.length === 0) {
      gridTableBody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align:center; padding: 36px; color: var(--text-muted);">
            No records match the current filter or search criteria.
          </td>
        </tr>
      `;
      return;
    }

    rows.forEach(row => {
      const isSelected = state.selectedIds.has(row.id);
      const isExpanded = state.expandedIds.has(row.id);
      const tr = document.createElement('tr');
      tr.id = `row-${row.id}`;
      if (isSelected) tr.classList.add('selected');

      const moneyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
      const formattedSalary = moneyFormatter.format(row.salary);

      tr.innerHTML = `
        <td style="width: 40px;">
          <input type="checkbox" class="gw-row-select" data-id="${row.id}" ${isSelected ? 'checked' : ''} aria-label="Select row ${row.name}">
        </td>
        <td style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${row.id}</td>
        <td>
          <div style="font-weight: 600; color: var(--text-primary);">${row.name}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);">${row.email}</div>
        </td>
        <td>
          <span class="gw-badge-chip" style="background: var(--bg-surface-3); color: var(--text-secondary);">
            ${row.department}
          </span>
        </td>
        <td style="font-size: 0.85rem;">${row.role}</td>
        <td>
          <div class="gw-editable-cell" data-id="${row.id}" data-can-edit="${row.canEditPay}" data-val="${row.salary}" title="${row.canEditPay ? 'Click or double click to edit salary' : 'Salary locked (canEditPay = false)'}">
            <span class="gw-salary-text" style="font-family: var(--font-mono); font-weight: 600; color: ${row.canEditPay ? 'var(--accent-emerald)' : 'var(--text-muted)'};">
              ${formattedSalary}
            </span>
            ${row.canEditPay ? `
              <svg class="gw-edit-pen-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            ` : ''}
          </div>
        </td>
        <td style="font-family: var(--font-mono); font-size: 0.85rem;">
          <span style="color: #eab308;">★</span> ${row.rating}
        </td>
        <td>
          <span class="gw-badge-chip ${row.status === 'Active' ? 'status-200' : ''}" style="font-size: 0.75rem;">
            ${row.status}
          </span>
        </td>
        <td>
          <button class="btn btn-secondary btn-sm gw-expand-btn" data-id="${row.id}" style="padding: 4px 8px; font-size: 0.78rem;" aria-expanded="${isExpanded}">
            ${isExpanded ? 'Hide' : `Orders (${row.lineCount})`}
          </button>
        </td>
      `;

      gridTableBody.appendChild(tr);

      if (isExpanded) {
        renderDetailRow(row.id, tr);
      }
    });

    attachRowEvents();
  }

  function attachRowEvents() {
    gridTableBody.querySelectorAll('input.gw-row-select').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'), 10);
        if (e.target.checked) {
          state.selectedIds.add(id);
        } else {
          state.selectedIds.delete(id);
        }
        updateRowSelectionClasses();
      });
    });

    gridTableBody.querySelectorAll('.gw-expand-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const parentTr = document.getElementById(`row-${id}`);
        if (!parentTr) return;

        if (state.expandedIds.has(id)) {
          state.expandedIds.delete(id);
          btn.textContent = `Orders`;
          btn.setAttribute('aria-expanded', 'false');
          const detailTr = document.getElementById(`detail-row-${id}`);
          if (detailTr) detailTr.remove();
        } else {
          state.expandedIds.add(id);
          btn.textContent = 'Hide';
          btn.setAttribute('aria-expanded', 'true');
          await renderDetailRow(id, parentTr);
        }
      });
    });

    gridTableBody.querySelectorAll('.gw-editable-cell').forEach(cell => {
      cell.addEventListener('dblclick', () => triggerCellEdit(cell));
      cell.addEventListener('click', (e) => {
        if (e.target.closest('.gw-edit-pen-icon')) {
          triggerCellEdit(cell);
        }
      });
    });
  }

  function triggerCellEdit(cell) {
    if (cell.querySelector('input')) return;
    const canEdit = cell.getAttribute('data-can-edit') === 'true';
    const id = parseInt(cell.getAttribute('data-id'), 10);
    const rawVal = parseFloat(cell.getAttribute('data-val')) || 0;

    if (!canEdit) {
      showToast(`Row #${id} is locked. Permission canEditPay is false.`, 'error');
      return;
    }

    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'gw-cell-input';
    input.value = rawVal;
    input.min = '0';
    input.step = '1000';

    cell.innerHTML = '';
    cell.appendChild(input);
    input.focus();
    input.select();

    let committed = false;

    const commitEdit = async () => {
      if (committed) return;
      committed = true;
      const newVal = parseFloat(input.value);

      const startTime = performance.now();
      try {
        const response = await fetch(`${API_BASE}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ salary: newVal })
        });
        const latency = Math.round(performance.now() - startTime);
        const result = await response.json();

        updateInspector({
          method: 'PATCH',
          url: `/${API_BASE}/${id}`,
          status: `${response.status} ${response.statusText}`,
          statusCode: response.status,
          latency: `${latency}ms`,
          headers: { 'Content-Type': 'application/json' },
          payload: result
        });

        if (!response.ok) {
          // THROWING REVERTS THE CELL (Canon rule from playbook!)
          throw new Error(result.error || 'Edit rejected by server');
        }

        showToast(`Salary for row #${id} updated to $${newVal.toLocaleString()}`, 'success');
        cell.setAttribute('data-val', newVal.toString());
        renderFormattedSalaryCell(cell, newVal, true);
      } catch (err) {
        showToast(`Edit rejected: ${err.message}. Reverting cell.`, 'error');
        renderFormattedSalaryCell(cell, rawVal, true);
      }
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        input.blur();
      } else if (e.key === 'Escape') {
        committed = true;
        renderFormattedSalaryCell(cell, rawVal, true);
      }
    });

    input.addEventListener('blur', () => {
      commitEdit();
    });
  }

  function renderFormattedSalaryCell(cell, val, canEdit) {
    const moneyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    cell.innerHTML = `
      <span class="gw-salary-text" style="font-family: var(--font-mono); font-weight: 600; color: var(--accent-emerald);">
        ${moneyFormatter.format(val)}
      </span>
      ${canEdit ? `
        <svg class="gw-edit-pen-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      ` : ''}
    `;
  }

  async function renderDetailRow(id, parentTr) {
    let detailTr = document.getElementById(`detail-row-${id}`);
    if (detailTr) detailTr.remove();

    detailTr = document.createElement('tr');
    detailTr.id = `detail-row-${id}`;
    detailTr.className = 'gw-detail-tr';
    detailTr.setAttribute('role', 'presentation');

    const td = document.createElement('td');
    td.setAttribute('role', 'presentation');
    td.colSpan = 9;
    detailTr.appendChild(td);

    td.innerHTML = `
      <div class="gw-detail-panel" role="region" aria-label="Order Details for person ${id}">
        <div class="gw-detail-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
          Master–Detail Lazy Load: Active Engagements & Delivery History
        </div>
        <div class="gw-detail-content" id="detail-content-${id}">
          <span style="font-size: 0.82rem; color: var(--text-muted);">Fetching child orders from /api/people/${id}/orders...</span>
        </div>
      </div>
    `;

    parentTr.parentNode.insertBefore(detailTr, parentTr.nextSibling);

    try {
      let ordersData = state.childOrdersCache.get(id);
      if (!ordersData) {
        const startTime = performance.now();
        const res = await fetch(`${API_BASE}/${id}/orders`);
        const latency = Math.round(performance.now() - startTime);
        ordersData = await res.json();
        state.childOrdersCache.set(id, ordersData);

        updateInspector({
          method: 'GET',
          url: `/${API_BASE}/${id}/orders`,
          status: `${res.status} ${res.statusText}`,
          statusCode: res.status,
          latency: `${latency}ms`,
          headers: { 'Content-Type': 'application/json' },
          payload: ordersData
        });
      }

      const contentEl = document.getElementById(`detail-content-${id}`);
      if (!contentEl) return;

      const orders = ordersData.orders || [];
      if (orders.length === 0) {
        contentEl.innerHTML = `<span style="font-size: 0.85rem; color: var(--text-muted);">No child orders found for this individual.</span>`;
        return;
      }

      let tableHtml = `
        <table class="gw-child-orders-table">
          <thead>
            <tr>
              <th>Engagement ID</th>
              <th>Project Contract</th>
              <th>Role</th>
              <th>Hours</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Approved By</th>
            </tr>
          </thead>
          <tbody>
      `;

      orders.forEach(o => {
        tableHtml += `
          <tr>
            <td style="font-family: var(--font-mono); font-weight: 600;">${o.id}</td>
            <td>${o.project}</td>
            <td>${o.role}</td>
            <td style="font-family: var(--font-mono);">${o.allocatedHours} hrs</td>
            <td style="font-family: var(--font-mono); color: var(--accent-emerald);">$${Number(o.budget).toLocaleString()}</td>
            <td><span class="gw-badge-chip ${o.status === 'Active' ? 'status-200' : ''}">${o.status}</span></td>
            <td style="font-size: 0.78rem; color: var(--text-muted);">${o.approvedBy}</td>
          </tr>
        `;
      });

      tableHtml += `</tbody></table>`;
      contentEl.innerHTML = tableHtml;

    } catch (err) {
      const contentEl = document.getElementById(`detail-content-${id}`);
      if (contentEl) {
        contentEl.innerHTML = `<span style="color: var(--accent-coral); font-size: 0.85rem;">Failed to fetch detail orders: ${err.message}</span>`;
      }
    }
  }

  function updateRowSelectionClasses() {
    gridTableBody.querySelectorAll('tr[id^="row-"]').forEach(tr => {
      const cb = tr.querySelector('input.gw-row-select');
      if (cb && cb.checked) {
        tr.classList.add('selected');
      } else {
        tr.classList.remove('selected');
      }
    });
  }

  function updateInspector({ method, url, status, statusCode, latency, headers, payload }) {
    if (inspectorUrlEl) inspectorUrlEl.textContent = `${method} ${url}`;
    if (inspectorLatencyEl) inspectorLatencyEl.textContent = latency;
    if (inspectorStatusEl) {
      inspectorStatusEl.textContent = status;
      inspectorStatusEl.className = `gw-badge-chip ${statusCode < 300 ? 'status-200' : 'status-422'}`;
    }
    if (inspectorHeadersEl) {
      inspectorHeadersEl.textContent = JSON.stringify(headers, null, 2);
    }
    if (inspectorPayloadEl) {
      inspectorPayloadEl.textContent = JSON.stringify(payload, null, 2);
    }
  }

  function initSnippetTabs() {
    const tabBtns = document.querySelectorAll('.gw-tab-btn');
    const snippetCards = document.querySelectorAll('.gw-snippet-card');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-tab');

        snippetCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  function initCopyButtons() {
    document.querySelectorAll('.gw-copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const targetId = btn.getAttribute('data-target');
        const preEl = document.getElementById(targetId);
        if (!preEl) return;

        try {
          const text = preEl.innerText || preEl.textContent;
          await navigator.clipboard.writeText(text);
          const origHtml = btn.innerHTML;
          btn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Copied!</span>
          `;
          btn.style.color = 'var(--accent-emerald)';
          setTimeout(() => {
            btn.innerHTML = origHtml;
            btn.style.color = '';
          }, 2000);
        } catch (err) {
          showToast('Failed to copy to clipboard', 'error');
        }
      });
    });
  }

  function showToast(message, type = 'success') {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.className = `gw-toast visible ${type}`;
    setTimeout(() => {
      toastEl.classList.remove('visible');
    }, 3500);
  }

})();
