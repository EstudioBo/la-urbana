import { useTranslation } from 'react-i18next'

// Idioma de la página (sale de la URL, ver App.jsx)
export function useIdioma() {
  return useTranslation().i18n.language
}

// Los textos de contenido (carta, alérgenos, posts…) se escriben { es, en }. Un texto que es igual en los dos
// idiomas (nombres de burgers, locales, chefs) puede ir como cadena simple
export const tx = (valor, idioma) => (valor == null || typeof valor === 'string' ? valor : valor[idioma] ?? valor.es)
