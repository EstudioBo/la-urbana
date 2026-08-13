import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './SeccionOrigen.module.css'
import imgRubia from '../../../assets/images/home/rubia-gallega.webp'
import sello2015 from '../../../assets/images/home/sello-2015.webp'

export default function SeccionOrigen() {
  const { t } = useTranslation()
  const selloRef = useRef(null)
  const [selloStamped, setSelloStamped] = useState(false)

  useEffect(() => {
    const el = selloRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSelloStamped(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.imageCol}>
        <img src={imgRubia} alt="Rubia Gallega" loading="lazy" />
      </div>
      <div className={styles.textCol}>
        <span className={styles.label}>
          {t('home.origen.label').split(' ').map((word, i) => (
            <span key={i}>{word}<br /></span>
          ))}
        </span>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>
            {t('home.origen.title').split(' ').map((word, i) => (
              <span key={i}>{word}<br /></span>
            ))}
          </h2>
          <img
            ref={selloRef}
            src={sello2015}
            alt="Est. 2015"
            className={`${styles.sello} ${selloStamped ? styles.selloStamped : ''}`}
          />
        </div>
        <p className={styles.body}>
          {t('home.origen.body')}
          <Link to="/nosotros" className={styles.more}>+</Link>
        </p>
      </div>
    </section>
  )
}
