import React from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import './i18n/index.js'
import App from './App.jsx'
import { POSTS, CATEGORIAS, rutaCategoria } from './pages/UrbanaStyle/posts.js'

export const RUTAS = [
  '/',
  '/carta',
  '/nosotros',
  '/contacto',
  '/reservar',
  '/alergenos',
  '/restaurantes-secretos',
  '/la-urbana-style',
  '/politica-cookies',
  ...POSTS.map((post) => `/la-urbana-style/${post.slug}`),
  ...Object.keys(CATEGORIAS).map(rutaCategoria),
]

// Espera a que carguen las páginas con lazy() antes de devolver el HTML completo
export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <React.StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  )
  let html = ''
  for await (const trozo of prelude) html += trozo
  return html
}
