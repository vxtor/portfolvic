const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.primary-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    });
  });
}

const languageButtons = document.querySelectorAll('.lang-button');
const translatableText = document.querySelectorAll('i18n-text');
const metaDescription = document.querySelector('meta[name="description"]');

const languageMeta = {
  en: {
    htmlLang: 'en',
    title: 'Viktor Németh — Senior Electrical Engineer',
    menuAria: 'Open navigation menu'
  },
  hu: {
    htmlLang: 'hu',
    title: 'Viktor Németh — Senior villamosmérnök',
    menuAria: 'Navigációs menü megnyitása'
  }
};

function setLanguage(language) {
  const lang = language === 'hu' ? 'hu' : 'en';

  translatableText.forEach((el) => {
    el.textContent = el.dataset[lang] || el.dataset.en || el.textContent;
  });

  document.querySelectorAll('[data-aria-en]').forEach((el) => {
    const key = `aria${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
    el.setAttribute('aria-label', el.dataset[key] || el.dataset.ariaEn);
  });

  languageButtons.forEach((button) => {
    const active = button.dataset.language === lang;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  document.documentElement.lang = languageMeta[lang].htmlLang;
  document.title = languageMeta[lang].title;
  if (toggle) toggle.setAttribute('aria-label', languageMeta[lang].menuAria);
  if (metaDescription) {
    metaDescription.setAttribute('content', metaDescription.dataset[lang] || metaDescription.dataset.en);
  }

  localStorage.setItem('portfolio-language', lang);
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});

const savedLanguage = localStorage.getItem('portfolio-language');
setLanguage(savedLanguage === 'hu' ? 'hu' : 'en');
