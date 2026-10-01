import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Carta from './pages/Carta/Carta'
import Nosotros from './pages/Nosotros/Nosotros'
import Contacto from './pages/Contacto/Contacto'
import Reservar from './pages/Reservar/Reservar'
import Alergenos from './pages/Alergenos/Alergenos'
import UrbanaKids from './pages/UrbanaKids/UrbanaKids'
import UrbanaStyle from './pages/UrbanaStyle/UrbanaStyle'
import UrbanaStylePost from './pages/UrbanaStyle/UrbanaStylePost'

export default function App() {
  const { i18n } = useTranslation()

  return (
    <>
      <ScrollToTop />
      <Navbar lang={i18n.language} setLang={(l) => i18n.changeLanguage(l)} />
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
      </Routes>
    </>
  )
}
