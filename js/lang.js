// ============================================================================
// Case AI — Language Dropdown (EN / TR / DE / FR)
// ============================================================================

(function () {
  var STORAGE_KEY = 'caseai-lang';
  var LANGS = ['en', 'tr', 'de', 'fr', 'es'];
  var LABELS = { en: 'EN', tr: 'TR', de: 'DE', fr: 'FR', es: 'ES' };

  // App Store URLs — dil eklendiğinde buraya da eklenmeli
  var APP_STORE_URLS = {
    tr: 'https://apps.apple.com/tr/app/case-ai/id6759069717',
    en: 'https://apps.apple.com/us/app/case-ai/id6759069717',
    de: 'https://apps.apple.com/de/app/case-ai/id6759069717',
    fr: 'https://apps.apple.com/fr/app/case-ai/id6759069717',
    es: 'https://apps.apple.com/es/app/case-ai/id6759069717',
  };

  function getDefaultLang() {
    var param = new URLSearchParams(window.location.search).get('lang');
    if (param && LANGS.indexOf(param.toLowerCase()) !== -1) return param.toLowerCase();
    var stored = localStorage.getItem(STORAGE_KEY);
    if (LANGS.indexOf(stored) !== -1) return stored;
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.startsWith('tr')) return 'tr';
    if (nav.startsWith('de')) return 'de';
    if (nav.startsWith('fr')) return 'fr';
    if (nav.startsWith('es')) return 'es';
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
    // App Store butonlarını dile göre güncelle
    var storeUrl = APP_STORE_URLS[lang] || APP_STORE_URLS['en'];
    document.querySelectorAll('.js-store-btn').forEach(function (el) {
      el.setAttribute('href', storeUrl);
    });
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
