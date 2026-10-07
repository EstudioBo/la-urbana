import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Navbar from './components/Navbar/Navbar'
import BannerCookies from './components/Cookies/BannerCookies'
import Home from './pages/Home/Home'

const Carta = lazy(() => import('./pages/Carta/Carta'))
const Nosotros = lazy(() => import('./pages/Nosotros/Nosotros'))
const Contacto = lazy(() => import('./pages/Contacto/Contacto'))
const Reservar = lazy(() => import('./pages/Reservar/Reservar'))
const Alergenos = lazy(() => import('./pages/Alergenos/Alergenos'))
const UrbanaKids = lazy(() => import('./pages/UrbanaKids/UrbanaKids'))
const UrbanaStyle = lazy(() => import('./pages/UrbanaStyle/UrbanaStyle'))
const UrbanaStylePost = lazy(() => import('./pages/UrbanaStyle/UrbanaStylePost'))
const UrbanaStyleCategoria = lazy(() => import('./pages/UrbanaStyle/UrbanaStyleCategoria'))
const PoliticaCookies = lazy(() => import('./pages/Legal/PoliticaCookies'))
const NoEncontrada = lazy(() => import('./pages/NoEncontrada/NoEncontrada'))

export default function App() {
  const { i18n } = useTranslation()

  return (
    <>
      <ScrollToTop />
      <Navbar lang={i18n.language} setLang={(l) => i18n.changeLanguage(l)} />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carta" element={<Carta />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/reservar" element={<Reservar />} />
          <Route path="/alergenos" element={<Alergenos />} />
          <Route path="/restaurantes-secretos" element={<UrbanaKids />} />
          <Route path="/la-urbana-style" element={<UrbanaStyle />} />
          <Route path="/la-urbana-style/:slug" element={<UrbanaStylePost />} />
          <Route path="/la-urbana-style/categoria/:categoria" element={<UrbanaStyleCategoria />} />
          <Route path="/politica-cookies" element={<PoliticaCookies />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </Suspense>
      <BannerCookies />
    </>
  )
}
