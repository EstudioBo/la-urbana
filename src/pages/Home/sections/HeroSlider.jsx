import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './HeroSlider.module.css'
import imgSlide1 from '../../../assets/images/hero-lucia.png'
import imgSlide2 from '../../../assets/images/hero-pan-crujiente.webp'
import arrowLeft from '../../../assets/images/arrow-left.svg'
import arrowRight from '../../../assets/images/arrow-right.svg'
import arrowDown from '../../../assets/images/arrow-down.svg'

const SLIDES = [
  { img: imgSlide1, titleKey: 'home.hero.slide1_title', subtitleKey: 'home.hero.slide1_subtitle' },
  { img: imgSlide2, titleKey: 'home.hero.slide2_title', subtitleKey: 'home.hero.slide2_subtitle' },
]

export default function HeroSlider() {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), [])
  const prev = () => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length)


  const slide = SLIDES[current]

  return (
    <section className={styles.hero}>
      {SLIDES.map((s, i) => (
        <img
          key={i}
          src={s.img}
          alt=""
          className={`${styles.bg} ${i === current ? styles.active : ''} ${i === 1 ? styles.bgContain : ''}`}
        />
      ))}

      <div className={styles.content}>
        <h1 className={styles.title}>{t(slide.titleKey)}</h1>
        <div className={styles.subtitle}>
          {t(slide.subtitleKey).split('|').map((line, i) => (
            <span key={i} className={i === 1 ? styles.subtitlePopfine : ''}>{line}</span>
          ))}
        </div>
      </div>

      <button className={`${styles.arrow} ${styles.left}`} onClick={prev} aria-label="Anterior">
        <img src={arrowLeft} alt="" />
      </button>
      <button className={`${styles.arrow} ${styles.right}`} onClick={next} aria-label="Siguiente">
        <img src={arrowRight} alt="" />
      </button>

      <div className={styles.scrollHint}>
        <button onClick={() => setCurrent(c => (c + 1) % SLIDES.length)} aria-label="Siguiente slide">
          <img src={arrowDown} alt="" />
        </button>
      </div>
    </section>
  )
}
