import { useRef, useEffect, useState } from 'react'
import styles from './UrbanaKids.module.css'
import Seo from '../../components/Seo/Seo'
import Footer from '../Home/sections/Footer'
import imgUu from '../../assets/images/uu-deco.svg'
import arrowLeft from '../../assets/images/arrow-left.svg'
import arrowRight from '../../assets/images/arrow-right.svg'
import img1 from '../../assets/images/restaurante-secreto-1.webp'
import img2 from '../../assets/images/restaurante-secreto-2.webp'
import img7 from '../../assets/images/restaurante-secreto-7.webp'
import imgNino from '../../assets/images/nino-restaurante-secreto.webp'
import imgNinoDerecha from '../../assets/images/nino-restuarante-secreto.derecha2.webp'
import imgKidsHero from '../../assets/images/urbanaKids-hero.webp'

const STACK_CARDS = [
  { img: img1, rotate: '-3deg', offset: 0 },
  { img: img2, rotate: '2deg',  offset: 20 },
  { img: img7, rotate: '-1.5deg', offset: 40 },
]

export default function UrbanaKids() {
  const [lightboxIdx, setLightboxIdx] = useState(null)

  useEffect(() => {
    document.body.style.background = '#fff'
    return () => { document.body.style.background = '' }
  }, [])

  const stampRef = useRef(null)
  const triggerRef = useRef(null)
  const ninoRef = useRef(null)
  const sectionEndRef = useRef(null)
  const stackRightRef = useRef(null)
  const ninoSlotRef = useRef(null)

  useEffect(() => {
    const el = stampRef.current
    const trigger = sectionEndRef.current
    if (!el || !trigger) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add(styles.uuStampVisible); observer.disconnect() } },
      { threshold: 0, rootMargin: '0px 0px -600px 0px' }
    )
    observer.observe(trigger)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nino = ninoRef.current
    const trigger = triggerRef.current
    const stackRight = stackRightRef.current
    if (!nino || !trigger || !stackRight) return

    if (window.innerWidth <= 640) {
      const ninoSlot = ninoSlotRef.current
      if (!ninoSlot) return
      let shown = false
      const handleMobileScroll = () => {
        const vh = window.innerHeight
        const sectionBottom = trigger.getBoundingClientRect().bottom
        nino.classList.toggle(styles.stackNinoPinned, sectionBottom <= vh)

        const slotTop = ninoSlot.getBoundingClientRect().top
        const shouldShow = slotTop < vh
        if (shouldShow === shown) return
        shown = shouldShow
        if (shouldShow) {
          nino.classList.remove(styles.ninoExit)
          nino.classList.add(styles.ninoSpring)
        } else {
          nino.classList.remove(styles.ninoSpring)
          nino.classList.add(styles.ninoExit)
        }
      }
      window.addEventListener('scroll', handleMobileScroll, { passive: true })
      handleMobileScroll()
      return () => window.removeEventListener('scroll', handleMobileScroll)
    }

    let observerInitialized = false
    let glitchTimer = null
    let currentZone = 0 // 0=antes de la sección, 1=card1, 2=card2, 3=card3+

    const doGlitch = (showB) => {
      if (nino.classList.contains(styles.ninoGlitching)) return
      nino.classList.add(styles.ninoGlitching)
      glitchTimer = setTimeout(() => {
        if (showB) nino.classList.add(styles.ninoShowB)
        else nino.classList.remove(styles.ninoShowB)
        nino.classList.remove(styles.ninoGlitching)
      }, 550)
    }

    const showObs = new IntersectionObserver(
      ([entry]) => {
        if (!observerInitialized) { observerInitialized = true; return }
        if (entry.isIntersecting) {
          nino.classList.remove(styles.ninoExit)
          nino.classList.add(styles.ninoSpring)
        } else if (entry.boundingClientRect.top > 0) {
          clearTimeout(glitchTimer)
          nino.classList.remove(styles.ninoSpring, styles.ninoShowB, styles.ninoGlitching)
          nino.classList.add(styles.ninoExit)
          currentZone = 0
        }
      },
      { threshold: 0.05 }
    )
    showObs.observe(trigger)

    const handleScroll = () => {
      const sectionBottom = trigger.getBoundingClientRect().bottom
      nino.classList.toggle(styles.stackNinoPinned, sectionBottom <= window.innerHeight)

      if (!nino.classList.contains(styles.ninoSpring)) return

      const vh = window.innerHeight
      const scrolled = -stackRight.getBoundingClientRect().top
      const zone = scrolled < 50 ? 1 : scrolled < vh * 2 + 500 ? 2 : 3

      if (zone === currentZone) return
      const prev = currentZone
      currentZone = zone

      if ((prev === 1 && zone === 2) || (prev === 3 && zone === 2)) doGlitch(true)
      if ((prev === 2 && zone === 1) || (prev === 2 && zone === 3)) doGlitch(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      showObs.disconnect()
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(glitchTimer)
    }
  }, [])

  return (
    <div className={styles.page}>
      <Seo
        title="Restaurantes Secretos para niños"
        description="En La Urbana Vigo y Lugo - Augas Férreas, niños y niñas tienen su espacio secreto: kiosko para pedidos, zona de juego, pantalla y mesa propia."
        path="/restaurantes-secretos"
      />

      {/* HERO */}
      <section className={styles.hero}>
        <img src={imgKidsHero} alt="" className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.label}>
            <span className={styles.labelUrbana}>Urbana</span>
            <span className={styles.labelKids}>Kids</span>
          </span>
          <h1 className={styles.title}><span className={styles.titleRestaurante}>Restaurante</span><span className={styles.titleSecreto}>Secreto</span></h1>
          <p className={styles.intro}>
            Amamos a madres y padres. Por eso les hemos hecho un Restaurante Secreto a vuestras criaturas dentro de nuestros restaurantes. Peques felices, adultos más.&nbsp;;)
          </p>
        </div>
      </section>

      {/* SECCIÓN STACKING */}
      <section className={styles.stackSection} ref={triggerRef}>

        {/* Header sticky */}
        <div className={styles.stackHeader}>
          <h2 className={styles.stackHeading}>Un secreto que ya no lo es tanto.</h2>
          <p className={styles.stackPara}>
            Solo en <strong>Lugo (Augas Férreas)</strong> y <strong>Vigo</strong>, escondido dentro de La Urbana, existe un restaurante secreto. Uno donde mandan ellos. Kiosko propio para pedir, zona de juego, pantalla y mesa solo para peques. Los mayores, en la suya.
          </p>
        </div>

        {/* Dos columnas */}
        <div className={styles.stackColumns}>

          {/* Derecha: tarjetas apiladas */}
          <div className={styles.stackRight} ref={stackRightRef}>
            {STACK_CARDS.flatMap((card, i) => [
              <div key={i} className={styles.stackSlot} style={{ zIndex: i + 1 }}>
                <div
                  className={styles.stackCard}
                  style={{ transform: `translateY(${card.offset}px) rotate(${card.rotate})`, cursor: 'pointer' }}
                  onClick={() => setLightboxIdx(i)}
                >
                  <img src={card.img} alt="" />
                </div>
              </div>,
              ...(i === 0 ? [<div key="nino-slot" ref={ninoSlotRef} className={styles.stackNinoSlot} />] : []),
            ])}
            <div className={styles.stackSlotEmpty} ref={sectionEndRef} />
          </div>

        </div>
        <div className={styles.stackNino} ref={ninoRef}>
          <img src={imgNino} alt="" className={styles.ninoImgA} />
          <img src={imgNinoDerecha} alt="" className={styles.ninoImgB} />
        </div>
      </section>

      {lightboxIdx !== null && (
        <div className={styles.lightboxOverlay} onClick={() => setLightboxIdx(null)}>
          <button className={styles.lightboxPrev} onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx + STACK_CARDS.length - 1) % STACK_CARDS.length) }}>
            <img src={arrowLeft} alt="Anterior" />
          </button>
          <img src={STACK_CARDS[lightboxIdx].img} alt="" className={styles.lightboxImg} />
          <button className={styles.lightboxNext} onClick={e => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % STACK_CARDS.length) }}>
            <img src={arrowRight} alt="Siguiente" />
          </button>
        </div>
      )}

      <div className={styles.uuStampWrap}>
        <div className={styles.uuStamp} ref={stampRef}>
          <img src={imgUu} alt="" className={styles.uuDeco} />
        </div>
      </div>

      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div>
  )
}
