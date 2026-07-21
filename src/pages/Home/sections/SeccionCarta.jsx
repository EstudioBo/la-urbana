import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './SeccionCarta.module.css'
import iconDelivery from '../../../assets/images/icon-delivery.svg'
import arrowLeft from '../../../assets/images/arrow-left.svg'

import imgParaEmpezar from '../../../assets/images/carta/para-empezar.webp'
import imgArtesanas   from '../../../assets/images/carta/artesanas.webp'
import imgDeAutor     from '../../../assets/images/carta/de-autor.webp'
import imgEntrepanes  from '../../../assets/images/carta/entrepanes.webp'
import imgEnsalada    from '../../../assets/images/carta/ensalada.webp'
import imgPostres     from '../../../assets/images/carta/postres.webp'
import imgVeggies     from '../../../assets/images/carta/veggies.webp'

const ITEMS = [
  { img: imgParaEmpezar, nombre: 'Para empezar' },
  { img: imgArtesanas,   nombre: 'Made in Galicia' },
  { img: imgDeAutor,     nombre: 'De Autor' },
  { img: imgEntrepanes,  nombre: 'Entrepanes' },
  { img: imgEnsalada,    nombre: 'Ensalada' },
  { img: imgPostres,     nombre: 'Postres' },
  { img: imgVeggies,     nombre: 'Veggies' },
]
const LOOP = Array.from({ length: ITEMS.length * 20 }, (_, i) => ITEMS[i % ITEMS.length])
const GAP = 12
const TEXT_COL_PCT = 0.33

export default function SeccionCarta() {
  const { t } = useTranslation()
  const [offset, setOffset] = useState(0)
  const [cardPx, setCardPx] = useState(0)
  const [overlayPx, setOverlayPx] = useState(0)
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const trackRef = useRef(null)
  const textColRef = useRef(null)
  const timer = useRef(null)

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current || !textColRef.current) return
      const cardEl = trackRef.current.querySelector('[class*="card"]')
      const cardW = cardEl ? cardEl.offsetWidth : 0
      if (cardW > 0) setCardPx(cardW)

      const textRight = textColRef.current.getBoundingClientRect().right
      const trackLeft = trackRef.current.getBoundingClientRect().left
      const overlap   = Math.max(0, textRight - trackLeft)
      setOverlayPx(overlap)
    }
    const id = setTimeout(calc, 50)
    window.addEventListener('resize', calc)
    const ro = new ResizeObserver(calc)
    if (sectionRef.current) ro.observe(sectionRef.current)
    return () => { clearTimeout(id); window.removeEventListener('resize', calc); ro.disconnect() }
  }, [])

  useEffect(() => {
    timer.current = setInterval(() => setOffset(o => o + 1), 4000)
    return () => clearInterval(timer.current)
  }, [])

  const goNext = () => setOffset(o => o + 1)

  const activeItem = ITEMS[(offset + 1) % ITEMS.length]
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
        <div className={styles.itemMeta} style={{ paddingLeft: `calc(2rem + ${cardPx + GAP}px)` }}>
          <span className={styles.itemNombre}>{activeItem.nombre}</span>
        </div>
        <div className={styles.track} ref={trackRef}>
          <div
            className={styles.inner}
            style={{ transform: `translateX(-${shift}px)` }}
          >
            {LOOP.map((item, i) => (
              <div key={i} className={styles.card}>
                <img src={item.img} alt={item.nombre} />
                {(i === offset || i === offset - 1) && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(4, 87, 50, 0.85)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.itemDesc} style={{ paddingLeft: `calc(2rem + ${cardPx + GAP}px)` }}>
          <span className={styles.itemInfo}>+ info</span>
        </div>
      </div>
      <button className={styles.arrowLeft} onClick={goNext} aria-label="Siguiente">
        <img src={arrowLeft} alt="" />
      </button>
    </section>
  )
}
