import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: require('@pashurax/i18n/locales/en.json') },
    hi: { translation: require('@pashurax/i18n/locales/hi.json') }
  }
});

export default i18n;
