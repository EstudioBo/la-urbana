import JsonLd from './JsonLd'
import { RESTAURANTS_SCHEMA } from './restaurantsSchema'
import { FACEBOOK_URL, INSTAGRAM_URL, SITE_URL } from './site'

export default function LocalBusinessJsonLd() {
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
            url: `${SITE_URL}/reservar`,
            image: `${SITE_URL}/og-image.webp`,
            servesCuisine: ['Hamburguesas', 'Cocina gallega'],
            menu: `${SITE_URL}/carta`,
            acceptsReservations: true,
            branchOf: { '@id': `${SITE_URL}/#organization` },
          })),
        ],
      }}
    />
  )
}
