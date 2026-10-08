import { lazy, Suspense, useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Navbar from './components/Navbar/Navbar'
import BannerCookies from './components/Cookies/BannerCookies'
import Home from './pages/Home/Home'
import { PAGINAS, idiomaDeRuta } from './i18n/rutas'

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

// Cada página responde en su ruta en castellano y en la inglesa (tabla PAGINAS de i18n/rutas.js)
const PAGINAS_APP = [
  ['/', <Home />],
  ['/carta', <Carta />],
  ['/nosotros', <Nosotros />],
  ['/contacto', <Contacto />],
  ['/reservar', <Reservar />],
  ['/alergenos', <Alergenos />],
  ['/restaurantes-secretos', <UrbanaKids />],
  ['/la-urbana-style', <UrbanaStyle />],
  ['/politica-cookies', <PoliticaCookies />],
]

export default function App() {
  const { i18n } = useTranslation()
  const { pathname } = useLocation()
  const idioma = idiomaDeRuta(pathname)

  // Al pasar de una URL en castellano a una en inglés (o al revés) cambia el idioma antes de pintar
  useLayoutEffect(() => {
    if (i18n.language !== idioma) i18n.changeLanguage(idioma)
  }, [i18n, idioma])

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={null}>
        <Routes>
          {PAGINAS_APP.flatMap(([ruta, pagina]) => [
            <Route key={ruta} path={ruta} element={pagina} />,
            <Route key={PAGINAS[ruta]} path={PAGINAS[ruta]} element={pagina} />,
          ])}
          <Route path="/la-urbana-style/:slug" element={<UrbanaStylePost />} />
          <Route path="/en/la-urbana-style/:slug" element={<UrbanaStylePost />} />
          <Route path="/la-urbana-style/categoria/:categoria" element={<UrbanaStyleCategoria />} />
          <Route path="/en/la-urbana-style/category/:categoria" element={<UrbanaStyleCategoria />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </Suspense>
      <BannerCookies />
    </>
  )
}
