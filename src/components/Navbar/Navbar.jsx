import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Navbar.module.css'
import { FACEBOOK_URL, INSTAGRAM_URL } from '../Seo/site'
import Enlace from '../../i18n/Enlace'
import { useIdioma } from '../../i18n/idioma'
import { versiones } from '../../i18n/rutas'
import logo from '../../assets/images/logos/logo-pegatina.webp'
import iconDelivery from '../../assets/images/iconos/icon-delivery.svg'
import iconReserva from '../../assets/images/iconos/icon-reserva.svg'
import iconDeliveryBlanco from '../../assets/images/iconos/icon-delivery-blanco.webp'
import iconCalendarioBlanco from '../../assets/images/iconos/icon-calendario-blanco.webp'
import iconBurgerMenu from '../../assets/images/iconos/icon-burgermenu.svg'

const IconClose = () => (
  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const IconInstagram = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
  </svg>
)

const IconFacebook = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconGoogleReviews = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Cada idioma lleva a la misma página en el otro idioma; si no existe, a su portada
const IDIOMAS_MENU = [
  { idioma: 'es', etiqueta: 'ES', nombre: 'Español', portada: '/' },
  { idioma: 'en', etiqueta: 'EN', nombre: 'English', portada: '/en' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const idioma = useIdioma()
  const { pathname, search } = useLocation()
  const paginaActual = versiones(pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  const panelRef = useRef(null)
  const burgerRef = useRef(null)
  const closeBtnRef = useRef(null)
  const abiertoConTeclado = useRef(false)

  const close = () => setMenuOpen(false)
  // Al cerrar con el teclado, el foco vuelve a la hamburguesa para no perder el sitio
  const closeAndReturnFocus = () => {
    setMenuOpen(false)
    burgerRef.current?.focus()
  }

  // e.detail === 0: el botón se ha pulsado con Enter o Espacio, no con el ratón
  const toggleMenu = (e) => {
    abiertoConTeclado.current = e.detail === 0
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    if (!menuOpen) return
    if (abiertoConTeclado.current) closeBtnRef.current?.focus()
    const onMouseDown = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) close()
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeAndReturnFocus()
    }
    // Si el foco sale del panel con el tabulador, el menú se cierra para no dejarlo abierto tapando la página
    const onFocusIn = (e) => {
      if (!panelRef.current.contains(e.target) && e.target !== burgerRef.current) close()
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [menuOpen])

  return (
    <>
    <header className={styles.navbar}>
      <Enlace to="/" className={styles.logo}>
        <img src={logo} alt="La Urbana" className={styles.logoImg} />
      </Enlace>

      <div className={styles.actions}>
        <a href="https://laurbana.waitry.net/" target="_blank" rel="noopener noreferrer" className={styles.iconBtn} aria-label={t('nav.delivery')}>
          <img src={iconDelivery} alt="" />
        </a>
        <Enlace to="/reservar" className={styles.iconBtn} aria-label={t('nav.reservar')}>
          <img src={iconReserva} alt="" />
        </Enlace>
        <button
          ref={burgerRef}
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={toggleMenu}
          aria-label={t('a11y.menu')}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
        >
          {menuOpen ? <IconClose /> : <img src={iconBurgerMenu} alt="" />}
        </button>
      </div>
    </header>

      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropVisible : ''}`}
        onClick={close}
      />

      {/* Panel */}
      <nav id="menu-principal" className={`${styles.panel} ${menuOpen ? styles.panelOpen : ''}`} ref={panelRef} inert={!menuOpen}>

        <div className={styles.panelTop}>
          <div className={styles.langSegment}>
            {IDIOMAS_MENU.map((opcion) => (
              <Link
                key={opcion.idioma}
                to={paginaActual?.[opcion.idioma] ? paginaActual[opcion.idioma] + search : opcion.portada}
                onClick={close}
                className={`${styles.langOpt} ${idioma === opcion.idioma ? styles.langOptActive : ''}`}
                lang={opcion.idioma}
                hrefLang={opcion.idioma}
                aria-label={opcion.nombre}
                aria-current={idioma === opcion.idioma ? 'true' : undefined}
              >{opcion.etiqueta}</Link>
            ))}
          </div>
          <button ref={closeBtnRef} className={styles.closeBtn} onClick={(e) => (e.detail === 0 ? closeAndReturnFocus() : close())} aria-label={t('a11y.cerrarMenu')}>
            <span className={styles.closeTxt}>{t('a11y.menu')}</span>
            <IconClose />
          </button>
        </div>

        <ul className={styles.menuLinks}>
          <li><Enlace to="/" onClick={close}>{t('nav.inicio')}</Enlace></li>
          <li><Enlace to="/nosotros" onClick={close}>{t('nav.origen')}</Enlace></li>
          <li><Enlace to="/carta" onClick={close}>{t('nav.carta')}</Enlace></li>
          <li><Enlace to="/la-urbana-style" onClick={close}>#laurbanastyle</Enlace></li>
          <li><Enlace to="/restaurantes-secretos" onClick={close}>Urbana Kids</Enlace></li>
          <li><Enlace to="/contacto" onClick={close}>{t('nav.contacto')}</Enlace></li>
        </ul>

        <div className={styles.menuActions}>
          <a
            href="https://laurbana.waitry.net/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.menuBtn} ${styles.menuBtnDelivery}`}
          >
            <img loading="lazy" src={iconDeliveryBlanco} alt="" className={styles.menuBtnIcon} />
            {t('nav.delivery')}
          </a>
          <Enlace to="/reservar" onClick={close} className={`${styles.menuBtn} ${styles.menuBtnReserva}`}>
            <img loading="lazy" src={iconCalendarioBlanco} alt="" className={styles.menuBtnIcon} />
            {t('nav.reservar')}
          </Enlace>
        </div>

        <div className={styles.menuSocial}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <IconInstagram />
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <IconFacebook />
          </a>
          <a href="https://g.page/r/laurbanaburgerbar/review" target="_blank" rel="noopener noreferrer" aria-label={t('a11y.resenasGoogle')}>
            <IconGoogleReviews />
          </a>
        </div>
      </nav>
    </>
  )
}
