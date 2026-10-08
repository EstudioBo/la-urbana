import { CATEGORIAS, POSTS, rutaCategoria, rutaPost } from '../pages/UrbanaStyle/posts'

export const IDIOMAS = ['es', 'en']
export const IDIOMA_POR_DEFECTO = 'es'

// Tabla de equivalencias de las páginas. En el código los enlaces se escriben siempre con la ruta en castellano
// y se traducen al idioma de la página con `localizar`. Una página nueva se añade aquí y en App.jsx
export const PAGINAS = {
  '/': '/en',
  '/carta': '/en/menu',
  '/nosotros': '/en/our-origin',
  '/contacto': '/en/contact',
  '/reservar': '/en/book-a-table',
  '/alergenos': '/en/allergens',
  '/restaurantes-secretos': '/en/secret-restaurants',
  '/la-urbana-style': '/en/la-urbana-style',
  '/politica-cookies': '/en/cookie-policy',
  '/aviso-legal': '/en/legal-notice',
  '/politica-privacidad': '/en/privacy-policy',
}

// Están en la tabla para que sus enlaces ya salgan traducidos, pero todavía no tienen página: no se prerenderizan
const SIN_PAGINA = new Set(['/aviso-legal', '/politica-privacidad'])

export const rutaPostEn = (post) => `/en/la-urbana-style/${post.slug.en}`
export const rutaCategoriaEn = (categoria) => `/en/la-urbana-style/category/${CATEGORIAS[categoria].slug.en}`

const PARES = [
  ...Object.entries(PAGINAS),
  ...POSTS.filter((post) => post.en).map((post) => [rutaPost(post), rutaPostEn(post)]),
  ...Object.keys(CATEGORIAS).map((categoria) => [rutaCategoria(categoria), rutaCategoriaEn(categoria)]),
]
const DE_ES_A_EN = new Map(PARES)
const DE_EN_A_ES = new Map(PARES.map(([es, en]) => [en, es]))
// Entradas sin versión en inglés: existen en castellano aunque no estén en la tabla
const SOLO_ES = new Set(POSTS.filter((post) => !post.en).map(rutaPost))

export const idiomaDeRuta = (ruta) => (ruta === '/en' || ruta.startsWith('/en/') || ruta.startsWith('/en?') ? 'en' : 'es')

const separar = (ruta) => {
  const corte = ruta.search(/[?#]/)
  return corte === -1 ? [ruta, ''] : [ruta.slice(0, corte), ruta.slice(corte)]
}

// Ruta en inglés de una página, o null si esa página no tiene versión en inglés
export const rutaEnIngles = (rutaEs) => DE_ES_A_EN.get(separar(rutaEs)[0]) ?? null

// Ruta en castellano (la que se escribe en el código) → la misma página en `idioma`, con su ?query y #ancla.
// Si la página no existe en ese idioma, se queda en castellano
export function localizar(rutaEs, idioma) {
  if (idioma === IDIOMA_POR_DEFECTO) return rutaEs
  const [ruta, resto] = separar(rutaEs)
  const traducida = DE_ES_A_EN.get(ruta)
  return traducida ? traducida + resto : rutaEs
}

// Las versiones de la página en la que se está, en cualquier idioma: { es, en }. null si la ruta no es una página
export function versiones(ruta) {
  if (DE_ES_A_EN.has(ruta)) return { es: ruta, en: DE_ES_A_EN.get(ruta) }
  if (DE_EN_A_ES.has(ruta)) return { es: DE_EN_A_ES.get(ruta), en: ruta }
  if (SOLO_ES.has(ruta)) return { es: ruta, en: null }
  return null
}

// Todas las rutas que se prerenderizan, en los dos idiomas
export const TODAS_LAS_RUTAS = [...PARES.filter(([es]) => !SIN_PAGINA.has(es)).flat(), ...SOLO_ES]
