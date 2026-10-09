import { useRef, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import styles from './UrbanaKids.module.css'
import Imagen from '../../components/Imagen/Imagen'
import Seo from '../../components/Seo/Seo'
import MigasJsonLd from '../../components/Seo/MigasJsonLd'
import Footer from '../Home/sections/Footer'
import imgUu from '../../assets/images/decorativos/uu-deco.svg'
import arrowLeft from '../../assets/images/iconos/arrow-left.svg'
import arrowRight from '../../assets/images/iconos/arrow-right.svg'
import img1 from '../../assets/images/kids/restaurante-secreto-1.webp?adaptable'
import img2 from '../../assets/images/kids/restaurante-secreto-2.webp?adaptable'
import img7 from '../../assets/images/kids/restaurante-secreto-7.webp?adaptable'
import imgNino from '../../assets/images/kids/nino-restaurante-secreto.webp?adaptable'
import imgNinoDerecha from '../../assets/images/kids/nino-restaurante-secreto-derecha.webp?adaptable'
import imgKidsHero from '../../assets/images/kids/urbanaKids-hero.webp?adaptable'

const STACK_CARDS = [
  { img: img1, alt: 'kids.fotos.uno', rotate: '-3deg', offset: 0 },
  { img: img2, alt: 'kids.fotos.dos', rotate: '2deg',  offset: 20 },
  { img: img7, alt: 'kids.fotos.siete', rotate: '-1.5deg', offset: 40 },
]

export default function UrbanaKids() {
  const { t } = useTranslation()
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const dialogRef = useRef(null)
  const abiertoConTeclado = useRef(false)
  const total = STACK_CARDS.length
  const anterior = () => setLightboxIdx(i => (i + total - 1) % total)
  const siguiente = () => setLightboxIdx(i => (i + 1) % total)

  // El visor es un <dialog> nativo: atrapa el foco, se cierra con Esc y devuelve el foco a la foto que lo abrió
  const visorAbierto = lightboxIdx !== null
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (visorAbierto && !dialog.open) {
      dialog.showModal()
      // Con ratón el foco se queda en el diálogo para no pintar el contorno en la flecha
      if (!abiertoConTeclado.current) dialog.focus()
    }
    if (!visorAbierto && dialog.open) dialog.close()
  }, [visorAbierto])

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
        title={t('kids.seo.titulo')}
        description={t('kids.seo.descripcion')}
        path="/restaurantes-secretos"
      />
      <MigasJsonLd migas={[{ nombre: t('kids.migas'), path: '/restaurantes-secretos' }]} />

      <main>
      {/* HERO */}
      <section className={styles.hero}>
        <Imagen imagen={imgKidsHero} sizes="100vw" fetchPriority="high" className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.label}>
            <span className={styles.labelUrbana}>Urbana</span>
            <span className={styles.labelKids}>Kids</span>
          </span>
          <h1 className={styles.title}><span className={styles.titleRestaurante}>{t('kids.titulo1')}</span><span className={styles.titleSecreto}>{t('kids.titulo2')}</span></h1>
          <p className={styles.intro}>
            {t('kids.intro')}
          </p>
        </div>
      </section>

      {/* SECCIÓN STACKING */}
      <section className={styles.stackSection} ref={triggerRef}>

        {/* Header sticky */}
        <div className={styles.stackHeader}>
          <h2 className={styles.stackHeading}>{t('kids.subtitulo')}</h2>
          <p className={styles.stackPara}>
            <Trans i18nKey="kids.texto" />
          </p>
        </div>

        {/* Dos columnas */}
        <div className={styles.stackColumns}>

          {/* Derecha: tarjetas apiladas */}
          <div className={styles.stackRight} ref={stackRightRef}>
            {STACK_CARDS.flatMap((card, i) => [
              <div key={i} className={styles.stackSlot} style={{ zIndex: i + 1 }}>
                <button
                  type="button"
                  className={styles.stackCard}
                  style={{ transform: `translateY(${card.offset}px) rotate(${card.rotate})` }}
                  onClick={(e) => { abiertoConTeclado.current = e.detail === 0; setLightboxIdx(i) }}
                  aria-label={t('a11y.ampliarFotoDe', { numero: i + 1, total })}
                  aria-haspopup="dialog"
                >
                  <Imagen imagen={card.img} sizes="(max-width: 768px) 92vw, 48vw" loading="lazy" alt={t(card.alt)} />
                </button>
              </div>,
              ...(i === 0 ? [<div key="nino-slot" ref={ninoSlotRef} className={styles.stackNinoSlot} />] : []),
            ])}
            <div className={styles.stackSlotEmpty} ref={sectionEndRef} />
          </div>

        </div>
        <div className={styles.stackNino} ref={ninoRef}>
          <Imagen imagen={imgNino} sizes="(max-width: 768px) 82vw, 28vw" loading="lazy" className={styles.ninoImgA} />
          <Imagen imagen={imgNinoDerecha} sizes="(max-width: 768px) 82vw, 28vw" loading="lazy" className={styles.ninoImgB} />
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className={styles.lightboxDialog}
        aria-label={visorAbierto ? t('a11y.fotoDe', { numero: lightboxIdx + 1, total }) : undefined}
        tabIndex={-1}
        onClose={() => setLightboxIdx(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') anterior()
          if (e.key === 'ArrowRight') siguiente()
        }}
      >
        {visorAbierto && (
          <div className={styles.lightboxOverlay} onClick={() => setLightboxIdx(null)}>
            <button type="button" className={styles.lightboxPrev} onClick={e => { e.stopPropagation(); anterior() }}>
              <img src={arrowLeft} alt={t('a11y.anterior')} />
            </button>
            <Imagen imagen={STACK_CARDS[lightboxIdx].img} sizes="100vw" alt={t(STACK_CARDS[lightboxIdx].alt)} className={styles.lightboxImg} />
            <button type="button" className={styles.lightboxNext} onClick={e => { e.stopPropagation(); siguiente() }}>
              <img src={arrowRight} alt={t('a11y.siguiente')} />
            </button>
          </div>
        )}
      </dialog>

      <div className={styles.uuStampWrap}>
        <div className={styles.uuStamp} ref={stampRef}>
          <img loading="lazy" src={imgUu} alt="" className={styles.uuDeco} />
        </div>
      </div>

      </main>

      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div>
  )
}
