/**
 * APSW Brand Website - Main Application Logic
 * Navigation, Theme Switcher, Human/Agent Terminal Preview, Copy Handlers & Anti-Bot Protection
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher (Default: Light / Executive Editorial, Toggle: Dark)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlElement = document.documentElement;

  // Retrieve stored theme or default to 'light'
  const savedTheme = localStorage.getItem('apsw_theme') || 'light';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('apsw_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'dark') {
      themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" title="Switch to light mode">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
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
  }

  // 2. Set Anti-Bot Form Timestamp
  const renderTimeInput = document.getElementById('form-rendered-at');
  if (renderTimeInput) {
    renderTimeInput.value = Math.floor(Date.now() / 1000).toString();
  }

  // 3. Navigation Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 4. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      const isOpen = navMenu.classList.contains('mobile-open');
      mobileToggle.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });

    // Close on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  // 5. Hero Dual-Mode Terminal Switcher (Human Summary vs Agent JSON vs Spec-Kit Contract)
  const heroTabs = document.querySelectorAll('.terminal-tabs .term-tab');
  const terminalContent = document.getElementById('terminal-live-code');

  const previews = {
    agent: `{
  <span class="code-property">"provider"</span>: <span class="code-string">"APSW (Piotr Solarz-Wnek)"</span>,
  <span class="code-property">"role"</span>: <span class="code-string">"AI Native Developer & Solution Architect"</span>,
  <span class="code-property">"experience_years"</span>: <span class="code-number">19</span>,
  <span class="code-property">"capabilities"</span>: [
    <span class="code-string">"Fully Agentic Application Development"</span>,
    <span class="code-string">"Spec-Kit Deterministic AI Engineering"</span>,
    <span class="code-string">"Enterprise Microservices (Java 21 / Spring, PHP 8 / Symfony)"</span>,
    <span class="code-string">"High-Load Spatial & Telemetry Engines (Databricks, Azure)"</span>
  ],
  <span class="code-property">"anti_slop_guarantee"</span>: <span class="code-keyword">true</span>,
  <span class="code-property">"endpoints"</span>: {
    <span class="code-property">"manifest"</span>: <span class="code-string">"https://apsw.pl/agent.json"</span>,
    <span class="code-property">"context"</span>: <span class="code-string">"https://apsw.pl/llms.txt"</span>
  }
}`,
    speckit: `<span class="code-comment"># Spec-Kit Deterministic Contract Example</span>
<span class="code-keyword">feature_specification</span>:
  <span class="code-property">id</span>: <span class="code-string">"SPEC-AI-CORE-01"</span>
  <span class="code-property">domain</span>: <span class="code-string">"Multi-Agent Settlement Engine"</span>
  <span class="code-property">deterministic_contract</span>:
    <span class="code-property">input_schema</span>: <span class="code-string">"OrderBatchPayload.json"</span>
    <span class="code-property">verification_rules</span>:
      - <span class="code-string">"Zero Hallucination Gate: STRICT"</span>
      - <span class="code-string">"Automated Contract Test Suite: 100% PASS"</span>
      - <span class="code-string">"P99 Latency SLA: < 120ms"</span>
  <span class="code-property">agentic_execution_mode</span>: <span class="code-string">"Planner-Worker-Verifier Swarm"</span>`,
    curl: `<span class="code-comment"># Query APSW Agent Manifest Directly via cURL</span>
curl -s https://apsw.pl/agent.json | jq .services

<span class="code-comment"># Response: Returns machine-verifiable service tiers, SLAs, and pricing models</span>`
  };

  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      heroTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-target');
      if (terminalContent && previews[target]) {
        terminalContent.innerHTML = previews[target];
      }
    });
  });

  // 6. Copy to Clipboard Functionality
  window.copyToClipboard = function(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btnElement.innerHTML;
      const copiedText = (window.APSW_I18N && window.APSW_I18N.t('contact.copied_tooltip')) || 'Copied!';
      btnElement.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> ${copiedText}`;
      btnElement.style.borderColor = 'var(--accent-emerald)';
      btnElement.style.color = 'var(--accent-emerald)';
      setTimeout(() => {
        btnElement.innerHTML = originalText;
        btnElement.style.borderColor = '';
        btnElement.style.color = '';
      }, 2000);
    });
  };

  // 7. Contact Form Submission with Anti-Bot Time-Trap & Rate Limiting
  const contactForm = document.getElementById('apsw-contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = (window.APSW_I18N && window.APSW_I18N.t('contact.sending_inquiry')) || 'Sending Inquiry...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('contact.php', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          const successMsg = result.message || (window.APSW_I18N && window.APSW_I18N.t('contact.feedback_success')) || 'Thank you! Your message has been sent successfully.';
          formFeedback.innerHTML = `
            <div style="padding: 14px; background: var(--accent-emerald-bg); border: 1px solid var(--accent-emerald-border); border-radius: var(--radius-md); color: var(--accent-emerald); margin-bottom: 16px; font-weight: 500;">
              ✓ ${successMsg}
            </div>
          `;
          contactForm.reset();
        } else {
          const errorMsg = result.message || (window.APSW_I18N && window.APSW_I18N.t('contact.feedback_error')) || 'An error occurred. Please reach out directly to piotr.solarz-wnek@apsw.pl';
          formFeedback.innerHTML = `
            <div style="padding: 14px; background: var(--accent-coral-bg); border: 1px solid var(--accent-coral); border-radius: var(--radius-md); color: var(--accent-coral); margin-bottom: 16px; font-weight: 500;">
              ⚠ ${errorMsg}
            </div>
          `;
        }
      } catch (err) {
        const fallbackMsg = (window.APSW_I18N && window.APSW_I18N.t('contact.feedback_fallback_html')) || '✓ Inquiry recorded. You can also contact directly at <a href="mailto:piotr.solarz-wnek@apsw.pl" style="color: var(--text-brand); text-decoration: underline; font-weight: 600;">piotr.solarz-wnek@apsw.pl</a>';
        formFeedback.innerHTML = `
          <div style="padding: 14px; background: var(--accent-emerald-bg); border: 1px solid var(--accent-emerald-border); border-radius: var(--radius-md); color: var(--accent-emerald); margin-bottom: 16px; font-weight: 500;">
            ${fallbackMsg}
          </div>
        `;
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }
});
