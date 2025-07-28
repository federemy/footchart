import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import es from "./locales/es.json";

// Intentar recuperar idioma guardado en localStorage o usar 'es' por defecto
const savedLanguage = localStorage.getItem("language") || "es";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es }
    },
    lng: savedLanguage, // Idioma inicial
    fallbackLng: "es",
    interpolation: {
      escapeValue: false
    }
  });

// Escuchar cambios de idioma y guardarlos
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;
