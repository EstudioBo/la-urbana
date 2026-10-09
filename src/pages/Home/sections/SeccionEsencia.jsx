import Enlace from '../../../i18n/Enlace'
import { useTranslation } from 'react-i18next'
import styles from './SeccionEsencia.module.css'
import Imagen from '../../../components/Imagen/Imagen'
import imgEsencia from '../../../assets/images/home/esencia-urbana-ula.webp?adaptable'

export default function SeccionEsencia() {
  const { t } = useTranslation()
  return (
    <section className={styles.section}>
      <Imagen imagen={imgEsencia} sizes="100vw" className={styles.bg} loading="lazy" />
      <div className={styles.content}>
        {t('home.esencia.label') && (
          <span className={styles.label}>
            {t('home.esencia.label').split(' ').map((word, i) => (
              <span key={i}>{word}<br /></span>
            ))}
          </span>
        )}
        <h2 className={styles.title}>{t('home.esencia.title')}</h2>
        <p className={styles.body}>{t('home.esencia.body')}</p>
        <div className={styles.moreWrapper}>
          <Enlace to="/la-urbana-style" className={styles.more} aria-label={t('a11y.masStyle')}>+</Enlace>
        </div>
      </div>
    </section>
  )
}
