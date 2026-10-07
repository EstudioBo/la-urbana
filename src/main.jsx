import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './i18n/index.js'
import './styles/globals.css'
import App from './App.jsx'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

const root = document.getElementById('root')
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

// Las rutas prerenderizadas (scripts/prerender.js), también la 404, traen el HTML hecho y React lo hidrata.
// En desarrollo no hay prerenderizado: llegan los metadatos genéricos de index.html y se retiran
// para que no se dupliquen con los que pone cada página.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  document.head
    .querySelectorAll('title, meta[name="description"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"]')
    .forEach((el) => el.remove())
  createRoot(root).render(app)
}
