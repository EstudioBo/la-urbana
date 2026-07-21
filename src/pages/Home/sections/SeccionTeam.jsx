import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './SeccionTeam.module.css'

import bgBurger    from '../../../assets/images/galician-style-burger.webp'
import arrowLeft  from '../../../assets/images/arrow-left.svg'
import chefEloy      from '../../../assets/images/chefs/Eloy-Kike-A-horata-DObgradoiro-Antollo-Galego.webp'
import chefLucia     from '../../../assets/images/chefs/Lucía-Feitas-A-Tafona-Urbana-Mestiza.webp'
import chefHector    from '../../../assets/images/chefs/Héctor-López-Restaurante-España-Urbana-Fina.webp'
import chefMartin    from '../../../assets/images/chefs/Martín-Vázquez-Indómito-Urbana-Indómita.webp'
import chefVictor    from '../../../assets/images/chefs/Víctor-Fernández-Morrofino-Urbana-Corea.webp'
import chefAlejandro from '../../../assets/images/chefs/Alejandro-Méndez-Os-Cachivaches-Urbana-Italiana.webp'

const CHEFS = [
  { img: chefEloy,       nombre: 'Eloy & Kike',     local: 'A Horta D\'Obradoiro', burguer: 'Antollo Galego' },
  { img: chefLucia,      nombre: 'Lucía Freitas',    local: 'A Tafona',             burguer: 'Urbana Mestiza' },
  { img: chefHector,     nombre: 'Héctor López',     local: 'Restaurante España',   burguer: 'Urbana Fina' },
  { img: chefMartin,     nombre: 'Martín Vázquez',   local: 'Indómito',             burguer: 'Urbana Indómita' },
  { img: chefVictor,     nombre: 'Víctor Fernández', local: 'Morrofino',            burguer: 'Urbana Corea' },
  { img: chefAlejandro,  nombre: 'Alejandro Méndez', local: 'Os Cachivaches',       burguer: 'Urbana Italiana' },
]

const LOOP = Array.from({ length: CHEFS.length * 20 }, (_, i) => CHEFS[i % CHEFS.length])
const GAP = 12
const TEXT_COL_PCT = 0.33

export default function SeccionTeam() {
  const { t } = useTranslation()
  const [offset, setOffset] = useState(0)
  const [cardPx, setCardPx] = useState(0)
  const [overlayPx, setOverlayPx] = useState(0)
  const sectionRef = useRef(null)
  const photosRef = useRef(null)
  const trackRef = useRef(null)
  const innerRef = useRef(null)
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

  const goNext = () => {
    setOffset(o => o + 1)
    clearInterval(timer.current)
    timer.current = setInterval(() => setOffset(o => o + 1), 4000)
  }

  const activeChef = CHEFS[(offset + 1) % CHEFS.length]
  const shift = offset * (cardPx + GAP)

  return (
    <section className={styles.section} style={{ backgroundImage: `url(${bgBurger})` }} ref={sectionRef}>

      <div className={styles.photosLayer} ref={photosRef}>
        <div className={styles.chefMeta} style={{ paddingLeft: `calc(2rem + ${cardPx + GAP}px)` }}>
          <span className={styles.chefNombre}>{activeChef.nombre}</span>
        </div>
        <div className={styles.track} ref={trackRef}>
          <div
            ref={innerRef}
            className={styles.inner}
            style={{ transform: `translateX(-${shift}px)` }}
          >
            {LOOP.map((chef, i) => (
              <div key={i} className={styles.card}>
                <img src={chef.img} alt={chef.nombre} />
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
        <div className={styles.chefDesc} style={{ paddingLeft: `calc(2rem + ${cardPx + GAP}px)` }}>
          <span className={styles.chefLocal}>{activeChef.local}</span>
          <span className={styles.chefBurguer}>{activeChef.burguer}</span>
        </div>
      </div>

      <div className={styles.textCol} ref={textColRef}>
        <span className={styles.label}>
          {t('home.team.label').split(' ').map((w, i) => <span key={i}>{w}<br /></span>)}
        </span>
        <h2 className={styles.title}>{t('home.team.title')}</h2>
      </div>

      <button className={styles.arrowLeft} onClick={goNext} aria-label="Siguiente">
        <img src={arrowLeft} alt="" />
      </button>
    </section>
  )
}
