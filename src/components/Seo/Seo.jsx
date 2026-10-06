import { Helmet } from 'react-helmet-async'
import { SITE_NAME, SITE_URL } from './site'

const DEFAULT_IMAGE = `${SITE_URL}/og-image.webp`

export default function Seo({ title, description, path = '/', image = DEFAULT_IMAGE, type = 'website', titleIsFull = false }) {
  const fullTitle = titleIsFull ? title : `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      {image === DEFAULT_IMAGE && <meta property="og:image:width" content="1200" />}
      {image === DEFAULT_IMAGE && <meta property="og:image:height" content="630" />}
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="es_ES" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}
