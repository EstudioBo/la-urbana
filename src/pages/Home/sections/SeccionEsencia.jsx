import { useTranslation } from 'react-i18next'
import styles from './SeccionEsencia.module.css'
import imgEsencia from '../../../assets/images/esencia-urbana-ula.webp'

export default function SeccionEsencia() {
  const { t } = useTranslation()
  return (
    <section className={styles.section}>
      <img src={imgEsencia} alt="" className={styles.bg} />
      <div className={styles.content}>
        <span className={styles.label}>
          {t('home.esencia.label').split(' ').map((word, i) => (
            <span key={i}>{word}<br /></span>
          ))}
        </span>
        <h2 className={styles.title}>{t('home.esencia.title')}</h2>
        <p className={styles.body}>{t('home.esencia.body')}</p>
        <div className={styles.moreWrapper}>
          <button className={styles.more}>+</button>
        </div>
      </div>
    </section>
  )
}
