import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Navbar.module.css'
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

export default function Navbar({ lang, setLang }) {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const panelRef = useRef(null)

  const close = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) close()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  return (
    <>
    <header className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="La Urbana" className={styles.logoImg} />
      </Link>

      <div className={styles.actions}>
        <a href="https://laurbana.waitry.net/" target="_blank" rel="noopener noreferrer" className={styles.iconBtn} aria-label={t('nav.delivery')}>
          <img src={iconDelivery} alt="" />
        </a>
        <Link to="/reservar" className={styles.iconBtn} aria-label={t('nav.reserva')}>
          <img src={iconReserva} alt="" />
        </Link>
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
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
      <nav className={`${styles.panel} ${menuOpen ? styles.panelOpen : ''}`} ref={panelRef}>

        <div className={styles.panelTop}>
          <div className={styles.langSegment}>
            <button
              className={`${styles.langOpt} ${lang === 'es' ? styles.langOptActive : ''}`}
              onClick={() => setLang('es')}
            >ES</button>
            <button
              className={`${styles.langOpt} ${lang === 'en' ? styles.langOptActive : ''}`}
              onClick={() => setLang('en')}
            >EN</button>
          </div>
          <button className={styles.closeBtn} onClick={close} aria-label="Cerrar menú">
            <span className={styles.closeTxt}>Menú</span>
            <IconClose />
          </button>
        </div>

        <ul className={styles.menuLinks}>
          <li><Link to="/" onClick={close}>Inicio</Link></li>
          <li><Link to="/nosotros" onClick={close}>Nuestro Origen</Link></li>
          <li><Link to="/carta" onClick={close}>Carta</Link></li>
          <li><Link to="/la-urbana-style" onClick={close}>#laurbanastyle</Link></li>
          <li><Link to="/restaurantes-secretos" onClick={close}>Urbana Kids</Link></li>
          <li><Link to="/contacto" onClick={close}>Contacto</Link></li>
        </ul>

        <div className={styles.menuActions}>
          <a
            href="https://laurbana.waitry.net/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.menuBtn} ${styles.menuBtnDelivery}`}
          >
            <img src={iconDeliveryBlanco} alt="" className={styles.menuBtnIcon} />
            Delivery
          </a>
          <Link to="/reservar" onClick={close} className={`${styles.menuBtn} ${styles.menuBtnReserva}`}>
            <img src={iconCalendarioBlanco} alt="" className={styles.menuBtnIcon} />
            Reservar
          </Link>
        </div>

        <div className={styles.menuSocial}>
          <a href="https://www.instagram.com/laurbanaburgerbar/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <IconInstagram />
          </a>
          <a href="https://www.facebook.com/laurbanaburgerbar" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <IconFacebook />
          </a>
          <a href="https://g.page/r/laurbanaburgerbar/review" target="_blank" rel="noopener noreferrer" aria-label="Reseñas Google">
            <IconGoogleReviews />
          </a>
        </div>
      </nav>
    </>
  )
}
