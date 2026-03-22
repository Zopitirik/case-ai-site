// ============================================================================
// Case AI — Language Dropdown (EN / TR / DE / FR)
// ============================================================================

(function () {
  var STORAGE_KEY = 'caseai-lang';
  var LANGS = ['en', 'tr', 'de', 'fr'];
  var LABELS = { en: 'EN', tr: 'TR', de: 'DE', fr: 'FR' };

  function getDefaultLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (LANGS.indexOf(stored) !== -1) return stored;
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.startsWith('tr')) return 'tr';
    if (nav.startsWith('de')) return 'de';
    if (nav.startsWith('fr')) return 'fr';
    return 'en';
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (!val) val = el.getAttribute('data-en');
      el.textContent = val;
    });
    localStorage.setItem(STORAGE_KEY, lang);
    var btn = document.getElementById('lang-current');
    if (btn) btn.textContent = LABELS[lang];
    // Mark active item
    document.querySelectorAll('.lang-option').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-value') === lang);
    });
  }

  function toggleDropdown() {
    var wrapper = document.getElementById('lang-dropdown');
    if (wrapper) wrapper.classList.toggle('open');
  }

  function closeDropdown() {
    var wrapper = document.getElementById('lang-dropdown');
    if (wrapper) wrapper.classList.remove('open');
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getDefaultLang());

    var btn = document.getElementById('lang-toggle');
    if (btn) btn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleDropdown();
    });

    document.querySelectorAll('.lang-option').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        applyLang(el.getAttribute('data-value'));
        closeDropdown();
      });
    });

    document.addEventListener('click', closeDropdown);
  });
})();
