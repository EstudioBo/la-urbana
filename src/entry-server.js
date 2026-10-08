// Entrada del build de servidor que usa scripts/prerender.js: el render de cada ruta y los datos para el sitemap
import { TODAS_LAS_RUTAS, rutaPostEn } from './i18n/rutas.js'
import { POSTS, rutaPost } from './pages/UrbanaStyle/posts.js'

export { render } from './render.jsx'
export { idiomaDeRuta, versiones } from './i18n/rutas.js'
export { SITE_URL } from './components/Seo/site.js'

export const RUTAS = TODAS_LAS_RUTAS

// Fecha de cada entrada en sus dos idiomas, para el <lastmod> del sitemap
export const FECHAS = Object.fromEntries(
  POSTS.flatMap((post) => [[rutaPost(post), post.fecha], ...(post.en ? [[rutaPostEn(post), post.fecha]] : [])])
)
