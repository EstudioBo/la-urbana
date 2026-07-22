import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './SeccionTeam.module.css'

import bgBurger    from '../../../assets/images/galician-style-burger.webp'
import arrowLeft  from '../../../assets/images/arrow-left.svg'
import arrowRight from '../../../assets/images/arrow-right.svg'
import selloU     from '../../../assets/images/pegatina-u.png'
import bgU        from '../../../assets/images/u-fina-con-sello.webp'
import chefEloy      from '../../../assets/images/chefs/Eloy-Kike-A-horata-DObgradoiro-Antollo-Galego.webp'
import chefLucia     from '../../../assets/images/chefs/Lucía-Feitas-A-Tafona-Urbana-Mestiza.webp'
import chefHector    from '../../../assets/images/chefs/Héctor-López-Restaurante-España-Urbana-Fina.webp'
import chefMartin    from '../../../assets/images/chefs/Martín-Vázquez-Indómito-Urbana-Indómita.webp'
import chefVictor    from '../../../assets/images/chefs/Víctor-Fernández-Morrofino-Urbana-Corea.webp'
import chefAlejandro from '../../../assets/images/chefs/Alejandro-Méndez-Os-Cachivaches-Urbana-Italiana.webp'

const CHEFS = [
  { img: chefEloy,       nombre: 'Eloy & Kike',     local: 'A Horta D\'Obradoiro', ciudad: 'Santiago de Compostela', localUrl: 'http://ahortadoobradoiro.com/',        burguer: 'Antollo Galego',   ingredientes: '200gr de carne galega de vaca vella madurada con smash de Rixóns, salsa de queixo de Arzúa, un toque de cremoso grelo en o noso pan crocante espolvoreado con pimentón doce/picante' },
  { img: chefLucia,      nombre: 'Lucía Freitas',    local: 'A Tafona',             ciudad: 'Santiago de Compostela', localUrl: 'https://www.luciafreitas.es/a-tafona', burguer: 'Urbana Mestiza',   ingredientes: 'Por definir' },
  { img: chefHector,     nombre: 'Héctor López',     local: 'Restaurante España',   ciudad: 'Lugo',                   localUrl: 'https://restespana.es/',               burguer: 'Urbana Fina',      ingredientes: 'Carne a tu elección, base de lechuga, tartar de tomate sazonado, queso D.O San Simón fundido, pepinos marinados frescos y agridulces, salsa de huevo campero frito y mahonesa casera coronada con patata fina y crujiente' },
  { img: chefMartin,     nombre: 'Martín Vázquez',   local: 'Indómito',             ciudad: 'Santiago de Compostela', localUrl: 'https://indomitobistro.es/',           burguer: 'Urbana Indómita',  ingredientes: 'Por definir' },
  { img: chefVictor,     nombre: 'Víctor Fernández', local: 'Morrofino',            ciudad: 'Santiago de Compostela', localUrl: 'https://restaurantemorrofino.com/',    burguer: 'Urbana Corea',     ingredientes: 'Carne a tu elección, emulsión de kimchi, queso D.O San Simón ahumado, pepinillos encurtidos y barbacoa de ajo negro' },
  { img: chefAlejandro,  nombre: 'Alejandro Méndez', local: 'Os Cachivaches',       ciudad: 'Lugo',                   localUrl: 'https://oscachivaches.com/',           burguer: 'Urbana Italiana',  ingredientes: 'Carne a tu elección, rúcula, mozzarella fresca, parmesano fundido, salami, pepperoni, tomate cherry, salsa napolitana y reducción de módena' },
]

const LOOP = Array.from({ length: CHEFS.length * 20 }, (_, i) => CHEFS[i % CHEFS.length])
const GAP = 12
const TEXT_COL_PCT = 0.33

export default function SeccionTeam() {
  const { t } = useTranslation()
  const [offset, setOffset] = useState(0)
  const [cardPx, setCardPx] = useState(0)
  const [overlayPx, setOverlayPx] = useState(0)
  const [modalIdx, setModalIdx] = useState(null)
  const modalChef = modalIdx !== null ? CHEFS[modalIdx] : null
  const sectionRef = useRef(null)
  const photosRef = useRef(null)
  const trackRef = useRef(null)
  const innerRef = useRef(null)
  const textColRef = useRef(null)
  const timer = useRef(null)
  const selloRef = useRef(null)

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

  useEffect(() => {
    let raf
    let s = 0
    let dustTimer = 0

    const spawnDust = (el) => {
      const rect = el.getBoundingClientRect()
      const particle = document.createElement('span')
      const size = 2 + Math.random() * 3
      const driftX = (Math.random() - 0.5) * 30
      const driftY = -Math.random() * 18
      Object.assign(particle.style, {
        position: 'fixed',
        left: `${rect.left + Math.random() * rect.width}px`,
        top:  `${rect.top  + rect.height * 0.7 + Math.random() * rect.height * 0.3}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: ['rgba(255,255,255,0.7)','rgba(255,220,150,0.6)','rgba(200,247,197,0.5)'][Math.floor(Math.random()*3)],
        pointerEvents: 'none',
        zIndex: '9999',
        opacity: '0',
        transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
        transform: 'translate(0,0)',
        filter: 'blur(0.5px)',
      })
      document.body.appendChild(particle)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        particle.style.opacity = '0.8'
        particle.style.transform = `translate(${driftX}px, ${driftY}px)`
      }))
      setTimeout(() => { particle.style.opacity = '0' }, 300)
      setTimeout(() => particle.remove(), 700)
    }

    const animate = () => {
      s += 0.015
      if (selloRef.current) {
        selloRef.current.style.transform = `translate(${Math.sin(s * 0.7) * 6}px, ${Math.cos(s * 0.5) * 8}px)`
        dustTimer++
        if (dustTimer % 10 === 0) spawnDust(selloRef.current)
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
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
            {LOOP.map((chef, i) => {
              const isOverlay = i === offset || i === offset - 1
              return (
                <div
                  key={i}
                  className={`${styles.card} ${!isOverlay ? styles.cardClickable : ''}`}
                  onClick={!isOverlay ? () => setModalIdx(i % CHEFS.length) : undefined}
                >
                  <img src={chef.img} alt={chef.nombre} />
                  {isOverlay && (
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
              )
            })}
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

      {modalChef && (
        <>
          <div className={styles.modalBackdrop} onClick={() => setModalIdx(null)} />
          <button className={styles.modalPrev} onClick={() => setModalIdx(i => (i - 1 + CHEFS.length) % CHEFS.length)} aria-label="Anterior">
            <img src={arrowLeft} alt="" />
          </button>
          <button className={styles.modalNext} onClick={() => setModalIdx(i => (i + 1) % CHEFS.length)} aria-label="Siguiente">
            <img src={arrowRight} alt="" />
          </button>
          <div className={styles.modal}>
            <div className={styles.modalBgU}><img src={bgU} alt="" /></div>
            <button className={styles.modalClose} onClick={() => setModalIdx(null)} aria-label="Cerrar">✕</button>
            <div className={styles.modalImg}>
              <img src={modalChef.img} alt={modalChef.nombre} />
            </div>
            <div className={styles.modalInfo}>
              <p className={styles.modalRow}><span>Burger</span>{modalChef.burguer}</p>
              <p className={styles.modalRow}><span>Chef</span>{modalChef.nombre}</p>
              <p className={styles.modalRow}>
                <span>Restaurante</span>
                <a href={modalChef.localUrl} target="_blank" rel="noopener noreferrer">
                  {modalChef.local} — {modalChef.ciudad}
                </a>
              </p>
              <p className={styles.modalRow}><span>Ingredientes</span>{modalChef.ingredientes}</p>
            </div>
            <div className={styles.modalSelloWrap} ref={selloRef}>
              <img src={selloU} alt="" className={styles.modalSello} />
            </div>
          </div>
        </>
      )}
    </section>
  )
}
