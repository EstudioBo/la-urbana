// Después del build: genera un HTML con el contenido y los metadatos de cada ruta, para que buscadores
// y redes sociales los lean sin ejecutar JS. /carta → dist/carta.html, /la-urbana-style/x → dist/la-urbana-style/x.html
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(raiz, 'dist')
const distSsr = join(raiz, 'dist-ssr')

const { render, RUTAS } = await import('../dist-ssr/entry-server.js')

const plantilla = readFileSync(join(dist, 'index.html'), 'utf-8')

// Las URLs que no son ninguna ruta reciben la plantilla sin prerenderizar, con los metadatos genéricos de index.html
writeFileSync(join(dist, 'spa.html'), plantilla)

// Los metadatos genéricos de index.html se sustituyen por los de cada página
const SEO_GENERICO = /\s*<(?:title>[^<]*<\/title|meta (?:name="description"|property="og:[^"]+"|name="twitter:[^"]+")[^>]*|link rel="canonical"[^>]*)>/g
const base = plantilla.replace(SEO_GENERICO, '')

// React deja al principio del HTML las etiquetas que van en el <head> (title, meta, link)
const CABECERA = /^(?:<title>[^<]*<\/title>|<(?:meta|link)\b[^>]*\/>)+/

const archivoDeRuta = (ruta) => (ruta === '/' ? 'index.html' : `${ruta.slice(1)}.html`)

for (const ruta of RUTAS) {
  const html = await render(ruta)
  const cabecera = html.match(CABECERA)?.[0] ?? ''
  if (!cabecera.includes('<title>')) throw new Error(`${ruta} se ha prerenderizado sin <title>`)
  const pagina = base
    .replace('</head>', () => `${cabecera}\n  </head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${html.slice(cabecera.length)}</div>`)

  const destino = join(dist, archivoDeRuta(ruta))
  mkdirSync(dirname(destino), { recursive: true })
  writeFileSync(destino, pagina)
}

// Cada ruta se reescribe a su .html antes de la regla general, para no depender de cómo resuelva Netlify las URLs sin extensión
const redirects = join(dist, '_redirects')
const reglas = RUTAS.filter((ruta) => ruta !== '/')
  .map((ruta) => `${ruta}    /${archivoDeRuta(ruta)}   200`)
  .join('\n')
writeFileSync(redirects, readFileSync(redirects, 'utf-8').replace(/^\/\*\s/m, (general) => `${reglas}\n${general}`))

rmSync(distSsr, { recursive: true, force: true })
console.log(`Prerenderizadas ${RUTAS.length} rutas`)
