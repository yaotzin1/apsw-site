/**
 * APSW Platform - "Anti-AI-Slop" Human-in-the-Loop Triage Simulator
 * Live simulation demonstrating why raw ChatGPT/LLM prompts produce brand-damaging "AI Slop"
 * versus APSW's Spec-Kit Calibrated Brand Voice (Idumela Architecture).
 * Features sub-50ms optimistic UI conveyor-belt animation and Mercure SSE toast simulation.
 */

(function () {
  'use strict';

  const TRIAGE_SCENARIOS = {
    critical_review: {
      id: 'critical_review',
      rating: '★☆☆☆☆',
      ratingStars: 1,
      author: 'Marek Jankowski (Google Local Guide)',
      timeAgo: '22 minutes ago',
      sentiment: 'CRITICAL_ALERT',
      reviewTextEn: 'Worst experience ever. Waited 45 minutes for my order, staff was arrogant, and the manager refused to speak with me. Never coming back!',
      reviewTextPl: 'Najgorsza obsługa w życiu. Czekałem 45 minut na zamówienie, personel był arogancki, a kierownik odmówił rozmowy. Nigdy więcej tu nie wrócę!',
      slopTitleEn: 'Generic AI Slop (Unconstrained ChatGPT / LLM Prompt)',
      slopTitlePl: 'Typowy "AI Slop" (Niekontrolowany prompt ChatGPT)',
      slopResponseEn: 'Dear valued customer! We are so, so incredibly sorry for this terrible experience! We always strive for 100% perfection! Please accept our deepest heartfelt apologies. Please email our CEO directly at ceo@company.com and use code SORRY50 for a free 50% discount on your next 5 orders! ✨🙏',
      slopResponsePl: 'Drogi Kliencie! Jest nam niesamowicie, niezmiernie przykro z powodu tego okropnego doświadczenia! Zawsze dążymy do 100% doskonałości! Przyjmij nasze najszczersze przeprosiny. Napisz do naszego prezesa na prezes@firma.pl i wpisz kod SORRY50, aby otrzymać darmowy rabat 50% na kolejne 5 zamówień! ✨🙏',
      slopDefectsEn: [
        'Hallucinates unapproved 50% discounts & codes',
        'Exposes fake CEO email address',
        'Sycophantic, robotic corporate apology',
        'Violates brand liability & compensation policy'
      ],
      slopDefectsPl: [
        'Halucynuje nieistniejące rabaty i kody 50%',
        'Wymyśla fałszywy adres e-mail do prezesa',
        'Sztuczne, służalcze formułki robotyczne',
        'Łamie politykę finansową i odpowiedzialność marki'
      ],
      apswTitleEn: 'APSW Calibrated Brand Voice (Idumela Spec-Kit Engine)',
      apswTitlePl: 'Skalibrowany Głos Marki APSW (Architektura Idumela)',
      apswResponseEn: 'Panie Marku, dziękujemy za bezpośrednią informację. Czas oczekiwania powyżej 20 minut jest niezgodny z naszym standardem operacyjnym. Sprawdziliśmy zapis bonu z godziny 19:15 i wyciągamy wnioski na zmianie kuchennej. Zapraszamy do kontaktu przez oficjalny formularz reklamacyjny, abyśmy mogli osobiście wyjaśnić tę sytuację.',
      apswResponsePl: 'Panie Marku, dziękujemy za bezpośrednią informację. Czas oczekiwania powyżej 20 minut jest niezgodny z naszym standardem operacyjnym. Sprawdziliśmy zapis bonu z godziny 19:15 i wyciągamy wnioski na zmianie kuchennej. Zapraszamy do kontaktu przez oficjalny formularz reklamacyjny, abyśmy mogli osobiście wyjaśnić tę sytuację.',
      apswGuaranteesEn: [
        'Strict 3-sentence concise structure',
        'Top-k semantic tone match against brand history',
        'Zero hallucination policy (0 unapproved promises)',
        'Human-in-the-Loop approval under 45 seconds'
      ],
      apswGuaranteesPl: [
        'Zwięzła struktura 3 zdań bez lania wody',
        'Dopasowanie do wektorów historycznego tonu lokalu',
        '100% zero halucynacji (brak nieautoryzowanych obietnic)',
        'Zatwierdzenie jednym klikiem w <45 sekund'
      ]
    },

    delivery_delay: {
      id: 'delivery_delay',
      rating: '★★★☆☆',
      ratingStars: 3,
      author: 'Karolina S. (Verified Customer)',
      timeAgo: '1 hour ago',
      sentiment: 'ATTENTION_REQUIRED',
      reviewTextEn: 'Product quality is fine, but the package arrived 3 days after the promised delivery date. Customer service was slow to reply.',
      reviewTextPl: 'Jakość produktu jest w porządku, ale paczka dotarła 3 dni po obiecanym terminie. Biuro obsługi odpowiadało bardzo opieszale.',
      slopTitleEn: 'Generic AI Slop (Unconstrained ChatGPT / LLM Prompt)',
      slopTitlePl: 'Typowy "AI Slop" (Niekontrolowany prompt ChatGPT)',
      slopResponseEn: 'Hello Karolina! Oh no! We are heartbroken to hear your package was delayed! AI magic has analyzed your tracking number and we promise our couriers will personally apologize to you tomorrow morning with a gift basket! ✨🚀📦',
      slopResponsePl: 'Witaj Karolino! O nie! Pęka nam serce, że paczka się spóźniła! Magia AI przeanalizowała Twój numer przesyłki i obiecujemy, że nasz kurier osobiście przeprosi Cię jutro rano z koszem prezentowym! ✨🚀📦',
      slopDefectsEn: [
        'Promises impossible courier gift baskets',
        'Cringe emojis and fake "AI Magic" tropes',
        'Zero integration with real logistics data'
      ],
      slopDefectsPl: [
        'Obiecuje nierealne kosze upominkowe od kuriera',
        'Żenujące emotikony i tandetna "magia AI"',
        'Brak faktycznego połączenia z logistyką'
      ],
      apswTitleEn: 'APSW Calibrated Brand Voice (Idumela Spec-Kit Engine)',
      apswTitlePl: 'Skalibrowany Głos Marki APSW (Architektura Idumela)',
      apswResponseEn: 'Pani Karolino, dziękujemy za opinię. Cieszymy się, że produkt spełnia oczekiwania, jednak opóźnienie w doręczeniu przez przewoźnika jest niedopuszczalne. Zgłosiliśmy reklamację do firmy kurierskiej i wdrożyliśmy automatyczny monitoring statusów przesyłek.',
      apswResponsePl: 'Pani Karolino, dziękujemy za opinię. Cieszymy się, że produkt spełnia oczekiwania, jednak opóźnienie w doręczeniu przez przewoźnika jest niedopuszczalne. Zgłosiliśmy reklamację do firmy kurierskiej i wdrożyliśmy automatyczny monitoring statusów przesyłek.',
      apswGuaranteesEn: [
        'Addresses logistics root cause directly',
        'Maintains professional brand authority',
        'Zero hallucinated commitments'
      ],
      apswGuaranteesPl: [
        'Adresuje bezpośrednio problem logistyczny',
        'Utrzymuje profesjonalny autorytet marki',
        'Brak zmyślonych zobowiązań'
      ]
    },

    vip_praise: {
      id: 'vip_praise',
      rating: '★★★★★',
      ratingStars: 5,
      author: 'Tomasz Wróblewski (Corporate Client)',
      timeAgo: '3 hours ago',
      sentiment: 'POSITIVE_SENTIMENT',
      reviewTextEn: 'Exceptional enterprise service! The team resolved our system migration in record time with zero disruption. Truly top-tier engineering.',
      reviewTextPl: 'Wyjątkowa obsługa na poziomie enterprise! Zespół rozwiązał migrację naszych systemów w rekordowym tempie bez żadnych przestojów. Prawdziwa inżynieria najwyższej klasy.',
      slopTitleEn: 'Generic AI Slop (Unconstrained ChatGPT / LLM Prompt)',
      slopTitlePl: 'Typowy "AI Slop" (Niekontrolowany prompt ChatGPT)',
      slopResponseEn: 'WOW! Thank you SO MUCH Tomasz! You are literally the best customer ever! We are jumping for joy in our office right now! We look forward to doing business until the end of time! 🎉🥳✨',
      slopResponsePl: 'WOW! DZIĘKUJEMY BARDZO Tomasz! Dosłownie jesteś najlepszym klientem na świecie! Skaczemy z radości w biurze! Nie możemy się doczekać współpracy do końca świata! 🎉🥳✨',
      slopDefectsEn: [
        'Unprofessional over-enthusiasm',
        'Infantile tone unsuited for B2B contracts',
        'Zero executive credibility'
      ],
      slopDefectsPl: [
        'Nieprofesjonalny, przesadzony entuzjazm',
        'Infantylny ton nieprzystający do relacji B2B',
        'Zero powagi biznesowej'
      ],
      apswTitleEn: 'APSW Calibrated Brand Voice (Idumela Spec-Kit Engine)',
      apswTitlePl: 'Skalibrowany Głos Marki APSW (Architektura Idumela)',
      apswResponseEn: 'Panie Tomaszu, dziękujemy za zaufanie. Płynna migracja bez przestojów produkcyjnych to fundament naszych standardów architektonicznych. Cieszymy się ze stabilności nowego środowiska i pozostajemy do dyspozycji przy kolejnych etapach rozwoju platformy.',
      apswResponsePl: 'Panie Tomaszu, dziękujemy za zaufanie. Płynna migracja bez przestojów produkcyjnych to fundament naszych standardów architektonicznych. Cieszymy się ze stabilności nowego środowiska i pozostajemy do dyspozycji przy kolejnych etapach rozwoju platformy.',
      apswGuaranteesEn: [
        'Dignified, executive-to-executive rapport',
        'Reinforces delivery track record',
        'Calculated for long-term contract retention'
      ],
      apswGuaranteesPl: [
        'Partnerski ton na poziomie executive',
        'Wzmacnia wizerunek rzetelnego dostawcy',
        'Buduje długofalową retencję kontraktu'
      ]
    }
  };

  function initAntiSlopTriage() {
    const scenarioButtons = document.querySelectorAll('.triage-scenario-btn');
    const conveyorCard = document.getElementById('triage-conveyor-card');
    const approveBtn = document.getElementById('triage-approve-btn');
    const rejectBtn = document.getElementById('triage-reject-btn');
    const resetBtn = document.getElementById('triage-reset-btn');
    const toastEl = document.getElementById('triage-toast');
    const routineCounterEl = document.getElementById('triage-routine-counter');

    if (!conveyorCard || !approveBtn) return;

    let activeScenarioKey = 'critical_review';
    let completedCount = 0;
    let secondsSpent = 0.8;

    function renderActiveScenario() {
      const lang = (window.APSW_I18N && window.APSW_I18N.currentLang) || 'en';
      const s = TRIAGE_SCENARIOS[activeScenarioKey];
      if (!s) return;

      conveyorCard.classList.remove('is-approved', 'is-rejected');
      conveyorCard.style.display = 'block';

      // Author & review text
      const authorEl = document.getElementById('triage-review-author');
      const timeEl = document.getElementById('triage-review-time');
      const starsEl = document.getElementById('triage-review-stars');
      const textEl = document.getElementById('triage-review-text');

      if (authorEl) authorEl.textContent = s.author;
      if (timeEl) timeEl.textContent = s.timeAgo;
      if (starsEl) starsEl.textContent = s.rating;
      if (textEl) textEl.textContent = lang === 'pl' ? s.reviewTextPl : s.reviewTextEn;

      // Slop side
      const slopTitleEl = document.getElementById('triage-slop-title');
      const slopTextEl = document.getElementById('triage-slop-text');
      const slopListEl = document.getElementById('triage-slop-defects');

      if (slopTitleEl) slopTitleEl.textContent = lang === 'pl' ? s.slopTitlePl : s.slopTitleEn;
      if (slopTextEl) slopTextEl.textContent = lang === 'pl' ? s.slopResponsePl : s.slopResponseEn;
      if (slopListEl) {
        const defects = lang === 'pl' ? s.slopDefectsPl : s.slopDefectsEn;
        slopListEl.innerHTML = defects.map(d => `<li><span class="cross-icon">✕</span> ${d}</li>`).join('');
      }

      // APSW side
      const apswTitleEl = document.getElementById('triage-apsw-title');
      const apswTextEl = document.getElementById('triage-apsw-text');
      const apswListEl = document.getElementById('triage-apsw-guarantees');

      if (apswTitleEl) apswTitleEl.textContent = lang === 'pl' ? s.apswTitlePl : s.apswTitleEn;
      if (apswTextEl) apswTextEl.textContent = lang === 'pl' ? s.apswResponsePl : s.apswResponseEn;
      if (apswListEl) {
        const guarantees = lang === 'pl' ? s.apswGuaranteesPl : s.apswGuaranteesEn;
        apswListEl.innerHTML = guarantees.map(g => `<li><span class="check-icon">✓</span> ${g}</li>`).join('');
      }

      if (resetBtn) resetBtn.style.display = 'none';
      if (approveBtn) approveBtn.disabled = false;
      if (rejectBtn) rejectBtn.disabled = false;
    }

    function showToast(message) {
      if (!toastEl) return;
      toastEl.textContent = message;
      toastEl.classList.add('is-visible');
      setTimeout(() => {
        toastEl.classList.remove('is-visible');
      }, 3500);
    }

    function updateCounter() {
      if (!routineCounterEl) return;
      const lang = (window.APSW_I18N && window.APSW_I18N.currentLang) || 'en';
      const remainingSec = Math.max(0, (45 - secondsSpent).toFixed(1));
      if (lang === 'pl') {
        routineCounterEl.innerHTML = `Triaż wykonany w <strong>${secondsSpent.toFixed(1)}s</strong> • Pozostało <strong>${remainingSec}s</strong> w 45-sekundowej rutynie dziennej`;
      } else {
        routineCounterEl.innerHTML = `Triaged in <strong>${secondsSpent.toFixed(1)}s</strong> • <strong>${remainingSec}s</strong> remaining in 45-second daily routine`;
      }
    }

    // Optimistic UI Approve action (<50ms animate-out)
    approveBtn.addEventListener('click', () => {
      approveBtn.disabled = true;
      rejectBtn.disabled = true;

      // Optimistic UI exit animation
      conveyorCard.classList.add('is-approved');
      completedCount++;
      secondsSpent += 1.1;
      updateCounter();

      const lang = (window.APSW_I18N && window.APSW_I18N.currentLang) || 'en';
      const toastMsg = lang === 'pl'
        ? `✓ Opublikowano przez FrankenPHP Mercure SSE (Latencja: 32ms) • 0 halucynacji`
        : `✓ Published via FrankenPHP Mercure SSE (Latency: 32ms) • Zero AI Hallucinations`;
      
      showToast(toastMsg);

      setTimeout(() => {
        conveyorCard.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'inline-flex';
      }, 280);
    });

    // Reject / Edit action
    rejectBtn.addEventListener('click', () => {
      approveBtn.disabled = true;
      rejectBtn.disabled = true;

      conveyorCard.classList.add('is-rejected');
      secondsSpent += 0.5;
      updateCounter();

      const lang = (window.APSW_I18N && window.APSW_I18N.currentLang) || 'en';
      const toastMsg = lang === 'pl'
        ? `↺ Wysłano do ponownej kalibracji LLM z nowym wektorem kontekstu`
        : `↺ Dispatched to LLM re-calibration with updated context embedding`;

      showToast(toastMsg);

      setTimeout(() => {
        conveyorCard.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'inline-flex';
      }, 280);
    });

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        renderActiveScenario();
      });
    }

    // Scenario switchers
    scenarioButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        scenarioButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeScenarioKey = btn.getAttribute('data-scenario');
        renderActiveScenario();
      });
    });

    window.addEventListener('apsw:languageChanged', () => {
      renderActiveScenario();
      updateCounter();
    });

    renderActiveScenario();
    updateCounter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAntiSlopTriage);
  } else {
    initAntiSlopTriage();
  }
})();
