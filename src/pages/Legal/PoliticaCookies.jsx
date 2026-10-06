import { useTranslation } from 'react-i18next'
import styles from './Legal.module.css'
import Seo from '../../components/Seo/Seo'
import Footer from '../Home/sections/Footer'

export default function PoliticaCookies() {
  const { t } = useTranslation()

  return (
    <div>
      <Seo
        title={t('legal.cookies.titulo')}
        description={t('legal.cookies.descripcion')}
        path="/politica-cookies"
        noindex
      />
      <main className={styles.page}>
        <h1 className={styles.title}>{t('legal.cookies.titulo')}</h1>
      </main>
      <Footer />
    </div>
  )
}
