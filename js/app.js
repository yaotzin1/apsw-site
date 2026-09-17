/**
 * APSW Brand Website - Main Application Logic
 * Navigation, Theme Switcher, Human/Agent Terminal Preview, Copy Handlers & Anti-Bot Protection
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher (Default: Light / Executive Editorial, Toggle: Dark)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlElement = document.documentElement;

  // The inline script in <head> already applied the theme; just sync the icon.
  updateThemeIcon(htmlElement.getAttribute('data-theme') || 'light');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      try { localStorage.setItem('apsw_theme', newTheme); } catch (e) { /* private mode */ }
      updateThemeIcon(newTheme);
      themeToggleBtn.setAttribute('aria-pressed', String(newTheme === 'dark'));
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

  // 3. Navigation Scroll Effect (rAF-throttled, passive)
  const header = document.querySelector('.site-header');
  if (header) {
    let scrollQueued = false;
    const syncHeader = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
      scrollQueued = false;
    };
    window.addEventListener('scroll', () => {
      if (!scrollQueued) {
        scrollQueued = true;
        requestAnimationFrame(syncHeader);
      }
    }, { passive: true });
    syncHeader();
  }

  // 4. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-controls', 'primary-nav-menu');

    const setMenu = (open) => {
      navMenu.classList.toggle('mobile-open', open);
      mobileToggle.setAttribute('aria-expanded', String(open));
      mobileToggle.innerHTML = open 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    };

    mobileToggle.addEventListener('click', () => {
      setMenu(!navMenu.classList.contains('mobile-open'));
    });

    // Close on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('mobile-open')) {
        setMenu(false);
        mobileToggle.focus();
      }
    });
  }

  // 5. Footer copyright year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

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

  const showFeedback = (tone, html) => {
    if (!formFeedback) return;
    formFeedback.className = 'form-feedback form-feedback-' + tone;
    formFeedback.innerHTML = html;
    formFeedback.hidden = false;
  };

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.textContent = (window.APSW_I18N && window.APSW_I18N.t('contact.sending_inquiry')) || 'Sending inquiry…';

      try {
        const response = await fetch('contact.php', {
          method: 'POST',
          body: new FormData(contactForm)
        });

        const result = await response.json();

        if (result.success) {
          showFeedback('success', result.message ||
            (window.APSW_I18N && window.APSW_I18N.t('contact.feedback_success')) ||
            'Thank you. Your inquiry has been received.');
          contactForm.reset();
        } else {
          showFeedback('error', result.message ||
            (window.APSW_I18N && window.APSW_I18N.t('contact.feedback_error')) ||
            'That inquiry could not be sent.');
        }
      } catch (err) {
        // The request never completed, so nothing was recorded. Telling the
        // visitor it succeeded would lose their inquiry silently.
        showFeedback('error',
          (window.APSW_I18N && window.APSW_I18N.t('contact.feedback_offline_html')) ||
          'The form could not reach the server, so this inquiry was not sent. Please email <a href="mailto:piotr.solarz-wnek@apsw.pl">piotr.solarz-wnek@apsw.pl</a> directly.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }
});
