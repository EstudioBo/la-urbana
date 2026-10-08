import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Enlace from '../../../i18n/Enlace'
import styles from './SeccionRestaurantesSecretos.module.css'
import imgNino from '../../../assets/images/kids/nino-restaurante-secreto-trimmed.webp'
import imgUu from '../../../assets/images/decorativos/uu-deco.svg'

export default function SeccionRestaurantesSecretos() {
  const { t } = useTranslation()
  const fotoRef = useRef(null)
  const [ninoSprung, setNinoSprung] = useState(false)

  useEffect(() => {
    const el = fotoRef.current
    if (!el || window.innerWidth > 640) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setNinoSprung(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section}>
      <img loading="lazy" src={imgUu} alt="" className={styles.uuDeco} />
      <div className={styles.foto} ref={fotoRef}>
        <img loading="lazy" src={imgNino} alt="" className={ninoSprung ? styles.ninoSpring : ''} />
      </div>
      <div className={styles.content}>
        <span className={styles.label}>
          {t('home.secretos.label').split('|').map((linea, i, lineas) => (
            <span key={i}>{linea}{i < lineas.length - 1 && <br />}</span>
          ))}
        </span>
        <h2 className={styles.title}>{t('home.secretos.title')}</h2>
        <p className={styles.body}>{t('home.secretos.body')}</p>
        <div className={styles.moreWrapper}>
          <Enlace to="/restaurantes-secretos" className={styles.more} aria-label={t('a11y.masSecretos')}>+</Enlace>
        </div>
      </div>
    </section>
  )
}
