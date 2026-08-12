import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './i18n/index.js'
import './styles/globals.css'
import App from './App.jsx'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// Los tags estáticos de index.html son el fallback para bots que no ejecutan JS
// (WhatsApp, Facebook...). Se retiran aquí para que react-helmet-async no los duplique
// una vez React monta y toma el control del <head> por ruta.
document.head
  .querySelectorAll('title, meta[name="description"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"]')
  .forEach((el) => el.remove())

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
