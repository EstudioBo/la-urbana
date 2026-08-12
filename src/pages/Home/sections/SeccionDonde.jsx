import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './SeccionDonde.module.css'
import imgLocal from '../../../assets/images/local-interior.webp'
import iconReserva from '../../../assets/images/icon-reserva.svg'

const CITY_NAMES = ['Lugo', 'Vigo', 'Santiago']

export default function SeccionDonde() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % CITY_NAMES.length)
        setVisible(true)
      }, 300)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.section}>
      <img src={imgLocal} alt="Interior La Urbana" className={styles.bg} loading="lazy" />
      <div className={styles.bgOverlay} />
      <div className={styles.textCol}>
        <div className={styles.header}>
          <span className={styles.label}>{t('home.donde.label')}</span>
          <h2 className={styles.title}>{t('home.donde.title')}</h2>
        </div>
        <span className={`${styles.cityName} ${visible ? styles.cityVisible : styles.cityHidden}`}>
          {CITY_NAMES[index]}
        </span>
        <div className={styles.ctaGroup}>
          <Link to="/reservar" className={styles.cta}>
            {t('home.donde.cta')}
            <img src={iconReserva} alt="" className={styles.ctaIcon} />
          </Link>
          <a
            href="https://maps.google.com/?q=La+Urbana+Burger"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            Encuéntranos
            <svg className={styles.ctaIconMap} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="1.5" fill="#2faa52"/>
              <path d="M12 6.8C10 6.8 8.4 8.4 8.4 10.4c0 2.7 3.6 6.8 3.6 6.8s3.6-4.1 3.6-6.8c0-2-1.6-3.6-3.6-3.6z" stroke="#26221e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="10.4" r="1.3" stroke="#26221e" strokeWidth="1.3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
