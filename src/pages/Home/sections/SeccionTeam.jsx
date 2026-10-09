import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './SeccionTeam.module.css'
import { tx, useIdioma } from '../../../i18n/idioma'

import bgBurger    from '../../../assets/images/home/galician-style-burger.webp'
import arrowLeft  from '../../../assets/images/iconos/arrow-left.svg'
import arrowRight from '../../../assets/images/iconos/arrow-right.svg'
import selloU     from '../../../assets/images/decorativos/pegatina-u.webp'
import bgU        from '../../../assets/images/home/u-fina-con-sello.webp'
import chefEloy      from '../../../assets/images/chefs/eloy-kike-a-horata-dobgradoiro-antollo-galego.webp'
import chefLucia     from '../../../assets/images/chefs/lucia-freitas-a-tafona-urbana-mestiza.webp'
import chefHector    from '../../../assets/images/chefs/hector-lopez-restaurante-espana-urbana-fina.webp'
import chefMartin    from '../../../assets/images/chefs/martin-vazquez-indomito-urbana-indomita.webp'
import chefVictor    from '../../../assets/images/chefs/victor-fernandez-morrofino-urbana-corea.webp'
import chefAlejandro from '../../../assets/images/chefs/Alejandro-Méndez-Os-Cachivaches-Urbana-Italiana.webp'

const CHEFS = [
  { img: chefEloy,       nombre: 'Eloy & Kike',     local: 'A Horta D\'Obradoiro', ciudad: 'Santiago de Compostela', localUrl: 'http://ahortadoobradoiro.com/',        burguer: 'Antollo Galego',   ingredientes: '200gr de carne galega de vaca vella madurada con smash de Rixóns, salsa de queixo de Arzúa, un toque de cremoso grelo en o noso pan crocante espolvoreado con pimentón doce/picante' },
  { img: chefLucia,      nombre: 'Lucía Freitas',    local: 'A Tafona',             ciudad: 'Santiago de Compostela', localUrl: 'https://www.luciafreitas.es/a-tafona', burguer: 'Urbana Mestiza',   ingredientes: 'Por definir' },
  { img: chefHector,     nombre: 'Héctor López',     local: 'Restaurante España',   ciudad: 'Lugo',                   localUrl: 'https://restespana.es/',               burguer: 'Urbana Fina',      ingredientes: {
    es: 'Carne a tu elección, base de lechuga, tartar de tomate sazonado, queso D.O San Simón fundido, pepinos marinados frescos y agridulces, salsa de huevo campero frito y mahonesa casera coronada con patata fina y crujiente',
    en: 'Your choice of meat, a bed of lettuce, seasoned tomato tartare, melted PDO San Simón cheese, fresh sweet-and-sour marinated cucumber, fried free-range egg sauce and homemade mayo, topped with thin, crispy potato straws',
  } },
  { img: chefMartin,     nombre: 'Martín Vázquez',   local: 'Indómito',             ciudad: 'Santiago de Compostela', localUrl: 'https://indomitobistro.es/',           burguer: 'Urbana Indómita',  ingredientes: 'Por definir' },
  { img: chefVictor,     nombre: 'Víctor Fernández', local: 'Morrofino',            ciudad: { es: 'Santiago de Compostela y Vigo', en: 'Santiago de Compostela and Vigo' }, localUrl: 'https://restaurantemorrofino.com/',    burguer: 'Urbana Corea',     ingredientes: {
    es: 'Carne a tu elección, emulsión de kimchi, queso D.O San Simón ahumado, pepinillos encurtidos y barbacoa de ajo negro',
    en: 'Your choice of meat, kimchi emulsion, smoked PDO San Simón cheese, pickled gherkins and black garlic barbecue sauce',
  } },
  { img: chefAlejandro,  nombre: 'Alejandro Méndez', local: 'Os Cachivaches',       ciudad: 'Lugo',                   localUrl: 'https://oscachivaches.com/',           burguer: 'Urbana Italiana',  ingredientes: {
    es: 'Carne a tu elección, rúcula, mozzarella fresca, parmesano fundido, salami, pepperoni, tomate cherry, salsa napolitana y reducción de módena',
    en: 'Your choice of meat, rocket, fresh mozzarella, melted Parmesan, salami, pepperoni, cherry tomatoes, Neapolitan sauce and balsamic reduction',
  } },
]

const LOOP = Array.from({ length: CHEFS.length * 20 }, (_, i) => CHEFS[i % CHEFS.length])
const GAP = 12

export default function SeccionTeam() {
  const { t } = useTranslation()
  const idioma = useIdioma()
  const [offset, setOffset] = useState(CHEFS.length * 3)
  const [cardPx, setCardPx] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [modalIdx, setModalIdx] = useState(null)
  const modalChef = modalIdx !== null ? CHEFS[modalIdx] : null
  const sectionRef = useRef(null)
  const photosRef = useRef(null)
  const trackRef = useRef(null)
  const innerRef = useRef(null)
  const textColRef = useRef(null)
  const timer = useRef(null)
  const selloRef = useRef(null)
  const dialogRef = useRef(null)
  const cerrarRef = useRef(null)
  const abiertaConTeclado = useRef(false)

  const abrirFicha = (idx, conTeclado) => {
    abiertaConTeclado.current = conTeclado
    setModalIdx(idx)
  }

  // La ficha es un <dialog> nativo: atrapa el foco, se cierra con Esc y devuelve el foco al botón que la abrió
  const fichaAbierta = modalIdx !== null
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (fichaAbierta && !dialog.open) {
      dialog.showModal()
      // Con ratón el foco se queda en el diálogo para no pintar el contorno en la X
      if (abiertaConTeclado.current) cerrarRef.current?.focus()
      else dialog.focus()
    }
    if (!fichaAbierta && dialog.open) dialog.close()
  }, [fichaAbierta])

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

    }
    calc()
    window.addEventListener('resize', calc)
    const ro = new ResizeObserver(calc)
    if (sectionRef.current) ro.observe(sectionRef.current)
    return () => { window.removeEventListener('resize', calc); ro.disconnect() }
  }, [])

  // Móvil: el navegador centra las cartas de forma nativa (scroll-snap).
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

  const activeChef = CHEFS[(offset + (isMobile ? 0 : 1)) % CHEFS.length]
  const shift = offset * (cardPx + GAP)

  return (
    <section className={styles.section} style={{ backgroundImage: `url(${bgBurger})` }} ref={sectionRef}>

      <div className={styles.photosLayer} ref={photosRef}>
        <div className={styles.chefMeta} style={{ paddingLeft: isMobile ? undefined : `calc(2rem + ${cardPx + GAP}px)` }}>
          <span className={styles.chefNombre}>{activeChef.nombre}</span>
        </div>
        {/* Las fotos abren la ficha con el ratón o el dedo; con teclado y lector de pantalla se usa el botón de debajo */}
        <div className={styles.track} ref={trackRef} aria-hidden="true">
          <div
            ref={innerRef}
            className={styles.inner}
            style={isMobile ? undefined : { transform: `translateX(-${shift}px)` }}
          >
            {LOOP.map((chef, i) => {
              const isOverlay = i === offset || i === offset - 1
              const clickable = isMobile || !isOverlay
              return (
                <div
                  key={i}
                  className={`${styles.card} ${clickable ? styles.cardClickable : ''}`}
                  onClick={clickable ? () => abrirFicha(i % CHEFS.length, false) : undefined}
                >
                  <img loading="lazy" src={chef.img} alt={chef.nombre} />
                  {isOverlay && (
                    <div className={styles.cardOverlay} style={{
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
        <button
          type="button"
          className={styles.chefDesc}
          style={{ paddingLeft: isMobile ? undefined : `calc(2rem + ${cardPx + GAP}px)` }}
          onClick={(e) => abrirFicha(CHEFS.indexOf(activeChef), e.detail === 0)}
          aria-haspopup="dialog"
        >
          <span className={styles.chefLocal}>{activeChef.local}</span>
          <span className={styles.chefBurguer}>{activeChef.burguer}</span>
        </button>
      </div>

      <div className={styles.textCol} ref={textColRef}>
        <span className={styles.label}>
          {t('home.team.label').split(' ').map((w, i) => <span key={i}>{w}<br /></span>)}
        </span>
        <h2 className={styles.title}>{t('home.team.title')}</h2>
      </div>

      <button className={styles.arrowLeft} onClick={goNext} aria-label={t('a11y.siguiente')}>
        <img loading="lazy" src={arrowLeft} alt="" />
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialogo}
        aria-label={modalChef?.nombre}
        tabIndex={-1}
        onClose={() => setModalIdx(null)}
      >
      {modalChef && (
        <>
          <div className={styles.modalBackdrop} onClick={() => setModalIdx(null)} />
          <button className={styles.modalPrev} onClick={() => setModalIdx(i => (i - 1 + CHEFS.length) % CHEFS.length)} aria-label={t('a11y.anterior')}>
            <img src={arrowLeft} alt="" />
          </button>
          <button className={styles.modalNext} onClick={() => setModalIdx(i => (i + 1) % CHEFS.length)} aria-label={t('a11y.siguiente')}>
            <img src={arrowRight} alt="" />
          </button>
          <div className={styles.modal}>
            <div className={styles.modalBgU}><img src={bgU} alt="" /></div>
            <button ref={cerrarRef} className={styles.modalClose} onClick={() => setModalIdx(null)} aria-label={t('a11y.cerrar')}>✕</button>
            <div className={styles.modalImg}>
              <img src={modalChef.img} alt={modalChef.nombre} />
            </div>
            <div className={styles.modalTopInfo}>
              <p className={styles.modalRow}><span>{t('home.team.burger')}</span>{modalChef.burguer}</p>
              <p className={styles.modalRow}><span>{t('home.team.chef')}</span>{modalChef.nombre}</p>
              <p className={styles.modalRow}>
                <span>{t('home.team.restaurante')}</span>
                <a href={modalChef.localUrl} target="_blank" rel="noopener noreferrer">
                  {modalChef.local} — {tx(modalChef.ciudad, idioma)}
                </a>
              </p>
            </div>
            <div className={styles.modalIngredientes}>
              <p className={styles.modalRow}><span>{t('home.team.ingredientes')}</span>{tx(modalChef.ingredientes, idioma)}</p>
            </div>
            <div className={styles.modalSelloWrap} ref={selloRef}>
              <img src={selloU} alt="" className={styles.modalSello} />
            </div>
          </div>
        </>
      )}
      </dialog>
    </section>
  )
}
