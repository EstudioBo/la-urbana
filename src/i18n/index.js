import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es/translation.json'
import en from './locales/en/translation.json'
import { IDIOMA_POR_DEFECTO, idiomaDeRuta } from './rutas'

// El idioma sale de la URL (/en/... = inglés). En el navegador se fija antes de hidratar para que coincida con
// el HTML prerenderizado; en el prerenderizado lo fija render.jsx para cada ruta
const idiomaInicial = typeof window !== 'undefined' ? idiomaDeRuta(window.location.pathname) : IDIOMA_POR_DEFECTO

i18n
  .use(initReactI18next)
  .init({
    resources: { es: { translation: es }, en: { translation: en } },
    lng: idiomaInicial,
    fallbackLng: IDIOMA_POR_DEFECTO,
    interpolation: { escapeValue: false },
  })

// <html lang> sigue al idioma para que los lectores de pantalla pronuncien bien
if (typeof document !== 'undefined') {
  document.documentElement.lang = idiomaInicial
  i18n.on('languageChanged', (lng) => { document.documentElement.lang = lng })
}

export default i18n
