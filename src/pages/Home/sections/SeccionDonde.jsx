import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './SeccionDonde.module.css'
import imgLocal from '../../../assets/images/local-interior.png'
import iconReserva from '../../../assets/images/icon-reserva.svg'

const CITY_NAMES = ['Lugo', 'Vigo', 'Santiago']

const CITIES = [
  {
    city: 'Lugo',
    locations: [
      { name: 'Bispo Aguirre', address: 'Rúa Bispo Aguirre, 34' },
      { name: 'Praza de Augas Férreas', address: 'Rúa Cánovas del Castillo, 2' },
      { name: 'C.C. As Termas', address: 'Av. Infanta Elena, 213' },
    ],
  },
  {
    city: 'Vigo',
    locations: [
      { name: 'Rosalía de Castro', address: 'Rúa Rosalía de Castro, 48' },
    ],
  },
  {
    city: 'Santiago de Compostela',
    locations: [
      { name: 'As Cancelas', address: 'Av. do Camiño Francés, 3' },
    ],
  },
]

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
      <img src={imgLocal} alt="Interior La Urbana" className={styles.bg} />
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
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
