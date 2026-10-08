import JsonLd from './JsonLd'
import { SITE_URL } from './site'

export default function MigasJsonLd({ migas }) {
  const elementos = [{ nombre: 'Inicio', path: '/' }, ...migas]

  return (
    <JsonLd
      schema={{
        '@type': 'BreadcrumbList',
        itemListElement: elementos.map((m, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: m.nombre,
          item: `${SITE_URL}${m.path}`,
        })),
      }}
    />
  )
}
