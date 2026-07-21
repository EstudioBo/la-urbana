import { useTranslation } from 'react-i18next'
import styles from './Carta.module.css'
import Footer from '../Home/sections/Footer'

export default function Carta() {
  const { t } = useTranslation()
  return (
    <div>
      <main className={styles.carta}>
        <h1 className={styles.title}>{t('carta.title')}</h1>
      </main>
      <Footer />
    </div>
  )
}
