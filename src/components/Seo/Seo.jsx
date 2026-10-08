import { Helmet } from 'react-helmet-async'
import { SITE_NAME, SITE_URL } from './site'
import { useIdioma } from '../../i18n/idioma'
import { localizar, rutaEnIngles } from '../../i18n/rutas'

const DEFAULT_IMAGE = `${SITE_URL}/og-image.webp`
const OG_LOCALE = { es: 'es_ES', en: 'en_GB' }

// `path` es la ruta en castellano; la canónica y los hreflang de cada idioma salen de la tabla de i18n/rutas.js
export default function Seo({ title, description, path = '/', image = DEFAULT_IMAGE, type = 'website', titleIsFull = false, noindex = false }) {
  const idioma = useIdioma()
  const fullTitle = titleIsFull ? title : `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${localizar(path, idioma)}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
  const rutaEn = noindex ? null : rutaEnIngles(path)
  const otroIdioma = idioma === 'es' ? 'en' : 'es'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      {rutaEn && <link rel="alternate" hrefLang="es" href={`${SITE_URL}${path}`} />}
      {rutaEn && <link rel="alternate" hrefLang="en" href={`${SITE_URL}${rutaEn}`} />}
      {rutaEn && <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={OG_LOCALE[idioma]} />
      {rutaEn && <meta property="og:locale:alternate" content={OG_LOCALE[otroIdioma]} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}
