import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Enlace from '../../../i18n/Enlace'
import { tx, useIdioma } from '../../../i18n/idioma'
import { useTranslation } from 'react-i18next'
import styles from './SeccionCarta.module.css'
import Imagen from '../../../components/Imagen/Imagen'
import arrowLeft from '../../../assets/images/iconos/arrow-left.svg'

import imgParaEmpezar from '../../../assets/images/carta/para-empezar.webp?adaptable'
import imgArtesanas   from '../../../assets/images/carta/artesanas.webp?adaptable'
import imgDeAutor     from '../../../assets/images/carta/de-autor.webp?adaptable'
import imgEntrepanes  from '../../../assets/images/carta/entrepanes.webp?adaptable'
import imgEnsalada    from '../../../assets/images/carta/ensalada.webp?adaptable'
import imgPostres     from '../../../assets/images/carta/postres.webp?adaptable'

const ITEMS = [
  { img: imgParaEmpezar, nombre: { es: 'Para empezar', en: 'Starters' },   cat: 'empezar' },
  { img: imgArtesanas,   nombre: 'Made in Galicia',                         cat: 'galicia' },
  { img: imgDeAutor,     nombre: { es: 'De Autor', en: 'Signature' },       cat: 'autor' },
  { img: imgEntrepanes,  nombre: { es: 'Entrepanes', en: 'Sandwiches' },    cat: 'entrepanes' },
  { img: imgEnsalada,    nombre: { es: 'Ensalada', en: 'Salads' },          cat: 'ensaladas' },
  { img: imgPostres,     nombre: { es: 'Postres', en: 'Desserts' },         cat: 'postres' },
  // Veggies usa la portada de Artesanas hasta que haya una foto propia (dos archivos idénticos rompen el build)
  { img: imgArtesanas,   nombre: 'Veggies',                                 cat: 'veggies' },
]
const enlaceCarta = item => `/carta?categoria=${item.cat}`
const LOOP = Array.from({ length: ITEMS.length * 20 }, (_, i) => ITEMS[i % ITEMS.length])
const GAP = 12

export default function SeccionCarta() {
  const { t } = useTranslation()
  const idioma = useIdioma()
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
        <Enlace to="/carta" className={styles.cta}>
          {t('home.carta.verTodo')}
        </Enlace>
      </div>
      <div className={styles.carouselCol} ref={carouselRef}>
        <div className={styles.itemMeta} style={{ paddingLeft: isMobile ? undefined : `calc(2rem + ${cardPx + GAP}px)` }}>
          <span className={styles.itemNombre}>{tx(activeItem.nombre, idioma)}</span>
        </div>
        {/* Las fotos llevan a la carta filtrada con el ratón o el dedo; con teclado y lector de pantalla se usa "+ info" */}
        <div className={styles.track} ref={trackRef} aria-hidden="true">
          <div
            className={styles.inner}
            style={isMobile ? undefined : { transform: `translateX(-${shift}px)` }}
          >
            {LOOP.map((item, i) => (
              <Enlace key={i} to={enlaceCarta(item)} className={styles.card} tabIndex={-1}>
                <Imagen imagen={item.img} sizes="(max-width: 768px) 70vw, 31vw" loading="lazy" alt={tx(item.nombre, idioma)} />
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
              </Enlace>
            ))}
          </div>
        </div>
        <div ref={itemDescRef} className={styles.itemDesc} style={{ paddingLeft: isMobile ? undefined : `calc(2rem + ${cardPx + GAP}px)` }}>
          <Enlace to={enlaceCarta(activeItem)} className={styles.itemInfo} aria-label={t('a11y.verEnCarta', { nombre: tx(activeItem.nombre, idioma) })}>+ info</Enlace>
        </div>
      </div>
      <Enlace to="/carta" className={styles.ctaMobile} style={isMobile && ctaTop != null ? { top: ctaTop, bottom: 'auto' } : undefined}>
        {t('home.carta.verTodo')}
      </Enlace>
      <button className={styles.arrowLeft} onClick={goNext} aria-label={t('a11y.siguiente')}>
        <img loading="lazy" src={arrowLeft} alt="" />
      </button>
    </section>
  )
}
