// Después del build: genera un HTML con el contenido y los metadatos de cada ruta, para que buscadores
// y redes sociales los lean sin ejecutar JS. /carta → dist/carta.html, /en/menu → dist/en/menu.html.
// También genera dist/sitemap.xml con las dos versiones de cada página
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(raiz, 'dist')
const distSsr = join(raiz, 'dist-ssr')

const { render, RUTAS, FECHAS, SITE_URL, idiomaDeRuta, versiones } = await import('../dist-ssr/entry-server.js')

const plantilla = readFileSync(join(dist, 'index.html'), 'utf-8')

// Los metadatos genéricos de index.html se sustituyen por los de cada página
const SEO_GENERICO = /\s*<(?:title>[^<]*<\/title|meta (?:name="description"|property="og:[^"]+"|name="twitter:[^"]+")[^>]*|link rel="canonical"[^>]*)>/g
const base = plantilla.replace(SEO_GENERICO, '')
if (!base.includes('<html lang="es">')) throw new Error('index.html debe empezar con <html lang="es">')

// React deja al principio del HTML las etiquetas que van en el <head> (title, meta, link)
const CABECERA = /^(?:<title>[^<]*<\/title>|<(?:meta|link)\b[^>]*\/>)+/

const archivoDeRuta = (ruta) => (ruta === '/' ? 'index.html' : `${ruta.slice(1)}.html`)

// Cualquier URL que no sea una ruta pinta la página de error en su idioma; _redirects las sirve con código 404
const PAGINAS_404 = ['/404', '/en/404']

const indexables = new Set()

for (const ruta of [...RUTAS, ...PAGINAS_404]) {
  const html = await render(ruta)
  const cabecera = html.match(CABECERA)?.[0] ?? ''
  if (!cabecera.includes('<title>')) throw new Error(`${ruta} se ha prerenderizado sin <title>`)
  if (!PAGINAS_404.includes(ruta) && !cabecera.includes('content="noindex')) indexables.add(ruta)

  const pagina = base
    .replace('<html lang="es">', `<html lang="${idiomaDeRuta(ruta)}">`)
    .replace('</head>', () => `${cabecera}\n  </head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${html.slice(cabecera.length)}</div>`)

  const destino = join(dist, archivoDeRuta(ruta))
  mkdirSync(dirname(destino), { recursive: true })
  writeFileSync(destino, pagina)
}

// Cada ruta se reescribe a su .html antes de la regla general, para no depender de cómo resuelva Netlify las URLs sin extensión
const redirects = join(dist, '_redirects')
const reglas = [
  ...RUTAS.filter((ruta) => ruta !== '/').map((ruta) => `${ruta}    /${archivoDeRuta(ruta)}   200`),
  '/en/*    /en/404.html   404',
].join('\n')
writeFileSync(redirects, readFileSync(redirects, 'utf-8').replace(/^\/\*\s/m, (general) => `${reglas}\n${general}`))

// Sitemap: solo páginas indexables, cada una con sus versiones (hreflang) y x-default en castellano
const url = (ruta) => `${SITE_URL}${ruta}`
const entradas = [...indexables].map((ruta) => {
  const { es, en } = versiones(ruta)
  const alternativas = [['es', es], ['en', en]].filter(([, r]) => r && indexables.has(r))
  const enlaces = alternativas.length > 1
    ? [...alternativas, ['x-default', es]].map(([idioma, r]) => `\n    <xhtml:link rel="alternate" hreflang="${idioma}" href="${url(r)}"/>`).join('')
    : ''
  const lastmod = FECHAS[ruta] ? `\n    <lastmod>${FECHAS[ruta]}</lastmod>` : ''
  return `  <url>\n    <loc>${url(ruta)}</loc>${lastmod}${enlaces}\n  </url>`
})
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entradas.join('\n')}\n</urlset>\n`
)

rmSync(distSsr, { recursive: true, force: true })
console.log(`Prerenderizadas ${RUTAS.length} rutas; ${indexables.size} en el sitemap`)
