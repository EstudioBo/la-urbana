import { Helmet } from 'react-helmet-async'
import { RESTAURANTS_SCHEMA } from './restaurantsSchema'

const SITE_URL = 'https://www.laurbanaburgerbar.com'

export default function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'La Urbana Burger Bar',
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.webp`,
      },
      ...RESTAURANTS_SCHEMA.map((r) => ({
        ...r,
        image: `${SITE_URL}/og-image.webp`,
        branchOf: { '@id': `${SITE_URL}/#organization` },
      })),
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
