import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './SeccionCarta.module.css'
import arrowLeft from '../../../assets/images/iconos/arrow-left.svg'

import imgParaEmpezar from '../../../assets/images/carta/para-empezar.webp'
import imgArtesanas   from '../../../assets/images/carta/artesanas.webp'
import imgDeAutor     from '../../../assets/images/carta/de-autor.webp'
import imgEntrepanes  from '../../../assets/images/carta/entrepanes.webp'
import imgEnsalada    from '../../../assets/images/carta/ensalada.webp'
import imgPostres     from '../../../assets/images/carta/postres.webp'
import imgVeggies     from '../../../assets/images/carta/veggies.webp'

const ITEMS = [
  { img: imgParaEmpezar, nombre: 'Para empezar',    cat: 'empezar' },
  { img: imgArtesanas,   nombre: 'Made in Galicia', cat: 'galicia' },
  { img: imgDeAutor,     nombre: 'De Autor',        cat: 'autor' },
  { img: imgEntrepanes,  nombre: 'Entrepanes',      cat: 'entrepanes' },
  { img: imgEnsalada,    nombre: 'Ensalada',        cat: 'ensaladas' },
  { img: imgPostres,     nombre: 'Postres',         cat: 'postres' },
  { img: imgVeggies,     nombre: 'Veggies',         cat: 'veggies' },
]
const enlaceCarta = item => `/carta?categoria=${item.cat}`
const LOOP = Array.from({ length: ITEMS.length * 20 }, (_, i) => ITEMS[i % ITEMS.length])
const GAP = 12

export default function SeccionCarta() {
  const { t } = useTranslation()
  const [offset, setOffset] = useState(ITEMS.length * 3)
  const [cardPx, setCardPx] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [ctaTop, setCtaTop] = useState(null)
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const trackRef = useRef(null)
  const textColRef = useRef(null)
  const itemDescRef = useRef(null)
  const timer = useRef(null)

  useLayoutEffect(() => {
    const calc = () => {
      if (!trackRef.current || !textColRef.current) return
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)

      if (!mobile) {
        const cardEl = trackRef.current.querySelector('[class*="card"]')
        const cardW = cardEl ? cardEl.offsetWidth : 0
        if (cardW > 0) setCardPx(cardW)
      }

      if (mobile && itemDescRef.current && sectionRef.current) {
        const descBottom = itemDescRef.current.getBoundingClientRect().bottom
        const sectionTop = sectionRef.current.getBoundingClientRect().top
        setCtaTop(descBottom - sectionTop + 15)
      }
    }
    calc()
    window.addEventListener('resize', calc)
    const ro = new ResizeObserver(calc)
    if (sectionRef.current) ro.observe(sectionRef.current)
    return () => { window.removeEventListener('resize', calc); ro.disconnect() }
  }, [])

  // Móvil: el navegador centra las cartas de forma nativa (scroll-snap).
  // Sincronizamos "offset" con la carta que queda centrada tras cada scroll.
  useEffect(() => {
    if (!isMobile) return
    const track = trackRef.current
    if (!track) return
    let scrollTimer
    const onScroll = () => {
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        const cards = track.querySelectorAll('[class*="_card_"]:not([class*="cardOverlay"])')
        const trackCenter = track.scrollLeft + track.clientWidth / 2
        let closest = 0, closestDist = Infinity
        cards.forEach((c, i) => {
          const dist = Math.abs((c.offsetLeft + c.offsetWidth / 2) - trackCenter)
          if (dist < closestDist) { closestDist = dist; closest = i }
        })
        setOffset(closest)
      }, 120)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => { track.removeEventListener('scroll', onScroll); clearTimeout(scrollTimer) }
  }, [isMobile])

  // Móvil: cuando "offset" cambia (auto-avance, flecha), centramos esa carta con scroll nativo.
  const hasPositioned = useRef(false)
  useLayoutEffect(() => {
    if (!isMobile || !trackRef.current) return
    const track = trackRef.current
    const cards = track.querySelectorAll('[class*="_card_"]:not([class*="cardOverlay"])')
    const target = cards[offset]
    if (!target) return
    const left = target.offsetLeft + target.offsetWidth / 2 - track.clientWidth / 2
    track.scrollTo({ left, behavior: hasPositioned.current ? 'smooth' : 'instant' })
    hasPositioned.current = true
  }, [offset, isMobile])

  useEffect(() => {
    timer.current = setInterval(() => setOffset(o => o + 1), 4000)
    return () => clearInterval(timer.current)
  }, [])

  const goNext = () => {
    setOffset(o => o + 1)
    clearInterval(timer.current)
    timer.current = setInterval(() => setOffset(o => o + 1), 4000)
  }

  const activeItem = ITEMS[(offset + (isMobile ? 0 : 1)) % ITEMS.length]
  const shift = offset * (cardPx + GAP)

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.textCol} ref={textColRef}>
        <h2 className={styles.title}>
          <span className={styles.titleLa}>{t('home.carta.label')}</span>
          <span className={styles.titleCarta}>{t('home.carta.title')}</span>
        </h2>
        <Link to="/carta" className={styles.cta}>
          Ver todo
        </Link>
      </div>
      <div className={styles.carouselCol} ref={carouselRef}>
        <div className={styles.itemMeta} style={{ paddingLeft: isMobile ? undefined : `calc(2rem + ${cardPx + GAP}px)` }}>
          <span className={styles.itemNombre}>{activeItem.nombre}</span>
        </div>
        {/* Las fotos llevan a la carta filtrada con el ratón o el dedo; con teclado y lector de pantalla se usa "+ info" */}
        <div className={styles.track} ref={trackRef} aria-hidden="true">
          <div
            className={styles.inner}
            style={isMobile ? undefined : { transform: `translateX(-${shift}px)` }}
          >
            {LOOP.map((item, i) => (
              <Link key={i} to={enlaceCarta(item)} className={styles.card} tabIndex={-1}>
                <img loading="lazy" src={item.img} alt={item.nombre} />
                {(i === offset || i === offset - 1) && (
                  <div className={styles.cardOverlay} style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(4, 87, 50, 0.85)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }} />
                )}
              </Link>
            ))}
          </div>
        </div>
        <div ref={itemDescRef} className={styles.itemDesc} style={{ paddingLeft: isMobile ? undefined : `calc(2rem + ${cardPx + GAP}px)` }}>
          <Link to={enlaceCarta(activeItem)} className={styles.itemInfo} aria-label={t('a11y.verEnCarta', { nombre: activeItem.nombre })}>+ info</Link>
        </div>
      </div>
      <Link to="/carta" className={styles.ctaMobile} style={isMobile && ctaTop != null ? { top: ctaTop, bottom: 'auto' } : undefined}>
        Ver todo
      </Link>
      <button className={styles.arrowLeft} onClick={goNext} aria-label={t('a11y.siguiente')}>
        <img loading="lazy" src={arrowLeft} alt="" />
      </button>
    </section>
  )
}
