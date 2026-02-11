// ============================================================================
// Case AI — TR/EN Language Toggle
// ============================================================================

(function () {
  const STORAGE_KEY = 'caseai-lang';

  function getDefaultLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'tr' || stored === 'en') return stored;
    const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return nav.startsWith('tr') ? 'tr' : 'en';
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-en]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang);
    });
    localStorage.setItem(STORAGE_KEY, lang);

    // Update toggle button text
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'en' ? 'TR' : 'EN';
  }

  function toggleLang() {
    var current = document.documentElement.getAttribute('data-lang') || 'en';
    applyLang(current === 'en' ? 'tr' : 'en');
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getDefaultLang());
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.addEventListener('click', toggleLang);
  });
})();
