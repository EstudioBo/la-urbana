import JsonLd from './JsonLd'
import { RESTAURANTS_SCHEMA } from './restaurantsSchema'
import { FACEBOOK_URL, INSTAGRAM_URL, SITE_URL } from './site'
import { useIdioma } from '../../i18n/idioma'
import { localizar } from '../../i18n/rutas'

const COCINA = { es: ['Hamburguesas', 'Cocina gallega'], en: ['Burgers', 'Galician cuisine'] }

export default function LocalBusinessJsonLd() {
  const idioma = useIdioma()

  return (
    <JsonLd
      schema={{
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'La Urbana Burger Bar',
            url: SITE_URL,
            logo: `${SITE_URL}/favicon.webp`,
            sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
          },
          ...RESTAURANTS_SCHEMA.map(({ id, ...r }) => ({
            '@type': 'Restaurant',
            '@id': `${SITE_URL}/#${id}`,
            ...r,
            url: `${SITE_URL}${localizar('/reservar', idioma)}`,
            image: `${SITE_URL}/og-image.webp`,
            servesCuisine: COCINA[idioma],
            menu: `${SITE_URL}${localizar('/carta', idioma)}`,
            acceptsReservations: true,
            branchOf: { '@id': `${SITE_URL}/#organization` },
          })),
        ],
      }}
    />
  )
}
