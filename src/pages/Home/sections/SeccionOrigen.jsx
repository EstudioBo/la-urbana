import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './SeccionOrigen.module.css'
import imgRubia from '../../../assets/images/rubia-gallega.png'
import sello2015 from '../../../assets/images/sello-2015.png'

export default function SeccionOrigen() {
  const { t } = useTranslation()
  return (
    <section className={styles.section}>
      <div className={styles.imageCol}>
        <img src={imgRubia} alt="Rubia Gallega" />
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
          <img src={sello2015} alt="Est. 2015" className={styles.sello} />
        </div>
        <p className={styles.body}>{t('home.origen.body')}</p>
        <div className={styles.moreWrapper}>
          <Link to="/nosotros" className={styles.more}>+</Link>
        </div>
      </div>
    </section>
  )
}
