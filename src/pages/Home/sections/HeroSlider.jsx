import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './HeroSlider.module.css'
import imgSlide1 from '../../../assets/images/hero-lucia.webp'
import imgSlide2 from '../../../assets/images/hero-no-smush.webp'
import imgSlide3 from '../../../assets/images/hero-pan-crujiente.webp'
import imgSlide4 from '../../../assets/images/hero-martin.webp'
import arrowLeft from '../../../assets/images/arrow-left.svg'
import arrowRight from '../../../assets/images/arrow-right.svg'
import arrowDown from '../../../assets/images/arrow-down.svg'

const SLIDES = [
  {
    img: imgSlide1,
    titleKey: 'home.hero.slide1_title',
    subtitleKey: 'home.hero.slide1_subtitle',
    subtitleStyles: ['', 'popfine', ''],
  },
  {
    img: imgSlide4,
    titleKey: 'home.hero.slide4_title',
    subtitleKey: 'home.hero.slide4_subtitle',
    subtitleStyles: ['', 'popfine', ''],
    rightColumn: true,
  },
  {
    img: imgSlide2,
    titleKey: 'home.hero.slide2_title',
    subtitleKey: 'home.hero.slide2_subtitle',
    subtitleStyles: ['popfine', ''],
    centered: true,
    overlay: true,
  },
  {
    img: imgSlide3,
    titleKey: 'home.hero.slide3_title',
    subtitleKey: 'home.hero.slide3_subtitle',
    subtitleStyles: ['popfineLg', 'large'],
    bottomOverlay: true,
  },
]

export default function HeroSlider() {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(() => new Set([0]))
  const [arrowTop, setArrowTop] = useState(null)
  const timer = useRef(null)
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  const restartTimer = useCallback(() => {
    clearInterval(timer.current)
    timer.current = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 6000)
  }, [])

  useEffect(() => {
    restartTimer()
    return () => clearInterval(timer.current)
  }, [restartTimer])

  const next = useCallback(() => { setCurrent(c => (c + 1) % SLIDES.length); restartTimer() }, [restartTimer])
  const prev = () => { setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length); restartTimer() }

  const slide = SLIDES[current]

  useEffect(() => {
    setLoaded(prev => (prev.has(current) ? prev : new Set(prev).add(current)))
  }, [current])

  useLayoutEffect(() => {
    const measure = () => {
      if (window.innerWidth > 640 || !contentRef.current || !heroRef.current) {
        setArrowTop(null)
        return
      }
      const contentRect = contentRef.current.getBoundingClientRect()
      const heroRect = heroRef.current.getBoundingClientRect()
      setArrowTop(contentRect.top - heroRect.top + contentRect.height / 2)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [current])

  return (
    <section className={styles.hero} ref={heroRef}>
      {SLIDES.map((s, i) => loaded.has(i) && (
        <img
          key={i}
          src={s.img}
          alt=""
          fetchPriority={i === 0 ? 'high' : undefined}
          className={`${styles.bg} ${i === current ? styles.active : ''} ${i === 1 ? styles.bgContain : ''} ${i === 0 ? styles.bgLucia : ''} ${i === 2 ? styles.bgPan : ''} ${i === 3 ? styles.bgSmash : ''}`}
        />
      ))}
      {slide.overlay && <div className={styles.bgOverlay} />}
      {slide.bottomOverlay && <div className={styles.bottomOverlay} />}

      <div ref={contentRef} className={`${styles.content} ${slide.centered ? styles.contentCentered : ''} ${slide.rightColumn ? styles.contentRight : ''}`}>
        {t(slide.titleKey) && (
          <h1 className={styles.title}>
            {t(slide.titleKey).split('|').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h1>
        )}
        <div className={styles.subtitle}>
          {t(slide.subtitleKey).split('|').map((line, i) => {
            const s = slide.subtitleStyles?.[i] || ''
            const cls = s === 'popfine' ? styles.subtitlePopfine : s === 'popfineLg' ? styles.subtitlePopfineLg : s === 'large' ? styles.subtitleLarge : ''
            return <span key={i} className={cls}>{line}</span>
          })}
        </div>
      </div>

      <button
        className={`${styles.arrow} ${styles.left}`}
        style={arrowTop != null ? { top: arrowTop, bottom: 'auto', transform: 'translateY(-50%)' } : undefined}
        onClick={prev}
        aria-label="Anterior"
      >
        <img src={arrowLeft} alt="" />
      </button>
      <button
        className={`${styles.arrow} ${styles.right}`}
        style={arrowTop != null ? { top: arrowTop, bottom: 'auto', transform: 'translateY(-50%)' } : undefined}
        onClick={next}
        aria-label="Siguiente"
      >
        <img src={arrowRight} alt="" />
      </button>

      <div className={styles.scrollHint}>
        <button onClick={next} aria-label="Siguiente slide">
          <img src={arrowDown} alt="" />
        </button>
      </div>
    </section>
  )
}
