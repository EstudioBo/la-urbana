import { useTranslation } from 'react-i18next'
import JsonLd from './JsonLd'
import { SITE_URL } from './site'
import { localizar } from '../../i18n/rutas'

// `path` de cada miga: ruta en castellano; sale en el idioma de la página
export default function MigasJsonLd({ migas }) {
  const { t, i18n } = useTranslation()
  const elementos = [{ nombre: t('nav.inicio'), path: '/' }, ...migas]

  return (
    <JsonLd
      schema={{
        '@type': 'BreadcrumbList',
        itemListElement: elementos.map((m, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: m.nombre,
          item: `${SITE_URL}${localizar(m.path, i18n.language)}`,
        })),
      }}
    />
  )
}
