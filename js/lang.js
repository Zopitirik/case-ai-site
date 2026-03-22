// ============================================================================
// Case AI — Language Toggle (EN / TR / DE / FR)
// ============================================================================

(function () {
  var STORAGE_KEY = 'caseai-lang';
  var LANGS = ['en', 'tr', 'de', 'fr'];

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
    var btn = document.getElementById('lang-toggle');
    if (btn) {
      var next = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
      btn.textContent = next.toUpperCase();
    }
  }

  function cycleLang() {
    var current = document.documentElement.getAttribute('data-lang') || 'en';
    var idx = LANGS.indexOf(current);
    var next = LANGS[(idx + 1) % LANGS.length];
    applyLang(next);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getDefaultLang());
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.addEventListener('click', cycleLang);
  });
})();
