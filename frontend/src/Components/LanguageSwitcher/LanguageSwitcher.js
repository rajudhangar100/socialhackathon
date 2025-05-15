import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css'; // Optional styling

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    if (i18n?.changeLanguage) {
      i18n.changeLanguage(lng);
    } else {
      console.error('i18n instance not initialized properly.');
    }
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage('en')} className="btn btn-outline-primary btn-sm me-2">
        English
      </button>
      <button onClick={() => changeLanguage('hi')} className="btn btn-outline-success btn-sm">
        हिंदी
      </button>
    </div>
  );
};

export default LanguageSwitcher;
