import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import hi from './locales/hi.json';

i18n
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  fallbackLng: 'en',
  returnObjects: true, // ✅ ADD THIS
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
