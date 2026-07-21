import { useTranslation } from 'react-i18next'
import styles from './Nosotros.module.css'
import Footer from '../Home/sections/Footer'

export default function Nosotros() {
  const { t } = useTranslation()
  return (
    <div>
      <main className={styles.nosotros}>
        <h1 className={styles.title}>{t('nosotros.title')}</h1>
      </main>
      <Footer />
    </div>
  )
}
