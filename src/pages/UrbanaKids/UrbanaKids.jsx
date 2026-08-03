import { useRef, useEffect, useState } from 'react'
import styles from './UrbanaKids.module.css'
import Footer from '../Home/sections/Footer'
import imgUu from '../../assets/images/uu-deco.svg'
import arrowLeft from '../../assets/images/arrow-left.svg'
import arrowRight from '../../assets/images/arrow-right.svg'
import img1 from '../../assets/images/restaurante-secreto-1.webp'
import img2 from '../../assets/images/restaurante-secreto-2.webp'
import img7 from '../../assets/images/restaurante-secreto-7.webp'
import imgNino from '../../assets/images/nino-restaurante-secreto.webp'
import imgKidsHero from '../../assets/images/urbanaKids-hero.webp'

const STACK_CARDS = [
  { img: img1, rotate: '-3deg', offset: 0 },
  { img: img2, rotate: '2deg',  offset: 20 },
  { img: img7, rotate: '-1.5deg', offset: 40 },
]

export default function UrbanaKids() {
  const [lightboxIdx, setLightboxIdx] = useState(null)

  useEffect(() => {
    document.body.style.background = '#1a4a00'
    return () => { document.body.style.background = '' }
  }, [])

  const stampRef = useRef(null)
  const triggerRef = useRef(null)
  const ninoRef = useRef(null)
  const secondCardRef = useRef(null)

  useEffect(() => {
    const el = stampRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add(styles.uuStampVisible); observer.disconnect() } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nino = ninoRef.current
    const trigger = secondCardRef.current
    if (!nino || !trigger) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { nino.classList.add(styles.ninoSpring); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(trigger)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.page}>

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

          {/* Izquierda: niño */}
          <div className={styles.stackLeft}>
            <img src={imgNino} alt="" className={styles.stackNino} ref={ninoRef} />
          </div>

          {/* Derecha: tarjetas apiladas */}
          <div className={styles.stackRight}>
            {STACK_CARDS.map((card, i) => (
              <div key={i} className={styles.stackSlot} style={{ zIndex: i + 1 }}>
                <div
                  className={styles.stackCard}
                  style={{ transform: `translateY(${card.offset}px) rotate(${card.rotate})`, cursor: 'pointer' }}
                  onClick={() => setLightboxIdx(i)}
                >
                  <img src={card.img} alt="" />
                </div>
              </div>
            ))}
          </div>

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
