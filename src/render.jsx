import React from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import i18n from './i18n/index.js'
import App from './App.jsx'
import { idiomaDeRuta } from './i18n/rutas.js'

// Espera a que carguen las páginas con lazy() antes de devolver el HTML completo
export async function render(url) {
  await i18n.changeLanguage(idiomaDeRuta(url))
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
