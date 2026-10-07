import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es/translation.json'
import en from './locales/en/translation.json'

i18n
  .use(initReactI18next)
  .init({
    resources: { es: { translation: es }, en: { translation: en } },
    lng: 'es',
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
  })

// <html lang> sigue al idioma elegido para que los lectores de pantalla pronuncien bien
if (typeof document !== 'undefined') {
  i18n.on('languageChanged', (lng) => { document.documentElement.lang = lng })
}

export default i18n
