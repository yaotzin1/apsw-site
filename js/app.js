/**
 * APSW Labs website - page behaviour outside the hero workbench:
 * navigation, copy buttons, the rules-file drift demo, and the "Scope & Route" form.
 *
 * Text shown to the visitor is always written with textContent, and always through a translation
 * key, so a language switch (js/i18n.js) keeps it in step.
 */

document.addEventListener('DOMContentLoaded', () => {
  const i18n = window.APSW_I18N;
  const t = (key) => (i18n ? i18n.t(key) : key);
  /** Puts a translated string on an element and records its key, so the language switcher updates it. */
  const setKey = (element, key) => {
    if (!element) return;
    element.setAttribute('data-i18n', key);
    element.textContent = t(key);
  };

  // 1. Anti-bot time trap: contact.php drops a form submitted under two seconds after render.
  const renderTimeInput = document.getElementById('form-rendered-at');
  if (renderTimeInput) renderTimeInput.value = Math.floor(Date.now() / 1000).toString();

  const yearElement = document.getElementById('footer-year');
  if (yearElement) yearElement.textContent = String(new Date().getFullYear());

  // 2. Mobile menu
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    const setOpen = (open) => {
      navMenu.classList.toggle('mobile-open', open);
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    mobileToggle.addEventListener('click', () => setOpen(!navMenu.classList.contains('mobile-open')));
    navMenu.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  }

  // 3. Copy buttons for the CLI snippets
  document.querySelectorAll('.copy-btn[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.getAttribute('data-copy'));
      } catch {
        return; // clipboard refused: the command stays selectable in the page
      }
      setKey(button, 'common.copied');
      button.setAttribute('data-done', 'true');
      setTimeout(() => {
        setKey(button, 'common.copy');
        button.removeAttribute('data-done');
      }, 1800);
    });
  });

  // 4. The standard: simulate a hand edit that drifts from workflow.ai.yml, then regenerate.
  const diagram = document.getElementById('std-diagram');
  const driftButton = document.getElementById('std-btn');
  if (diagram && driftButton) {
    const output = document.getElementById('std-out');
    const status = document.getElementById('std-status');
    driftButton.addEventListener('click', () => {
      const drift = diagram.getAttribute('data-drift') !== 'true';
      diagram.setAttribute('data-drift', drift ? 'true' : 'false');
      output.textContent = drift
        ? '$ ci: instructions-drift --check   → exit 1\n  CLAUDE.md differs from workflow.ai.yml'
        : '$ ci: instructions-drift --check   → exit 0';
      setKey(status, drift ? 'std.status_drift' : 'std.status_ok');
      setKey(driftButton, drift ? 'std.btn_regen' : 'std.btn_drift');
    });
  }

  // 5. Scope & Route: the execution mode follows the chosen track and scale.
  const form = document.getElementById('apsw-contact-form');
  if (!form) return;
  const route = document.getElementById('route');
  const routeMode = document.getElementById('route-mode');
  const routeNote = document.getElementById('route-note');
  const rfpInput = document.getElementById('form-rfp');
  const feedback = document.getElementById('form-feedback');
  const submitButton = document.getElementById('form-submit');
  const checked = (name) => form.querySelector(`input[name="${name}"]:checked`);

  const isPartnerRoute = () => checked('service_type')?.dataset.track === '4' || checked('scale')?.dataset.scale === 'squad';
  const updateRoute = () => {
    const partner = isPartnerRoute();
    route.setAttribute('data-mode', partner ? 'partner' : 'direct');
    setKey(routeMode, partner ? 'scope.mode_partner' : 'scope.mode_direct');
    setKey(routeNote, partner ? 'scope.note_partner' : 'scope.note_direct');
  };
  form.querySelectorAll('input[name="service_type"], input[name="scale"]').forEach((input) => input.addEventListener('change', updateRoute));
  updateRoute();

  // "Scope this track" links preselect the track before the jump to the form.
  document.querySelectorAll('.track-cta[data-track]').forEach((link) => {
    link.addEventListener('click', () => {
      const input = form.querySelector(`input[name="service_type"][data-track="${link.dataset.track}"]`);
      if (!input) return;
      input.checked = true;
      updateRoute();
    });
  });

  const showFeedback = (key, state) => {
    feedback.hidden = false;
    feedback.setAttribute('data-state', state);
    setKey(feedback, key);
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      showFeedback('scope.fb_invalid', 'error');
      form.querySelector(':invalid')?.focus();
      return;
    }
    // Always English: this text goes into the email the Principal reads, not onto the page.
    rfpInput.value = [
      `Delivery scale: ${checked('scale')?.value ?? ''}`,
      `Execution mode: ${isPartnerRoute() ? 'Principal architecture + partner software house squad' : 'Direct APSW Labs Principal execution'}`,
    ].join('\n');

    submitButton.disabled = true;
    setKey(submitButton, 'scope.sending');
    try {
      const response = await fetch(form.getAttribute('action'), { method: 'POST', body: new FormData(form) });
      const result = await response.json();
      if (result.success) {
        showFeedback('scope.fb_success', 'ok');
        form.reset();
        updateRoute();
      } else {
        showFeedback(response.status === 429 ? 'scope.fb_rate' : 'scope.fb_invalid', 'error');
      }
    } catch {
      // No server, or a non-JSON answer. Nothing was sent, and the page says so.
      showFeedback('scope.fb_unreachable', 'error');
    } finally {
      submitButton.disabled = false;
      setKey(submitButton, 'scope.submit');
    }
  });
});
