import { useTranslation } from 'react-i18next'
import styles from './UrbanaStyle.module.css'
import Seo from '../../components/Seo/Seo'
import MigasJsonLd from '../../components/Seo/MigasJsonLd'
import Footer from '../Home/sections/Footer'
import imgHero from '../../assets/images/origen/hero-nuestro-origen2.webp'
import { postsDelIdioma } from './posts'
import Archivo from './Archivo'
import { useIdioma } from '../../i18n/idioma'

export default function UrbanaStyle() {
  const { t } = useTranslation()
  const idioma = useIdioma()

  return (
    <div>
      <Seo
        title="#LaUrbanaStyle"
        description={t('style.descripcion')}
        path="/la-urbana-style"
      />
      <MigasJsonLd migas={[{ nombre: '#LaUrbanaStyle', path: '/la-urbana-style' }]} />
      <main>
      <section className={styles.hero}>
        <img src={imgHero} alt="" className={styles.heroBg} />
        <div className={styles.heroContent}>
          <h1 className={styles.textBlock}>
            <span className={styles.linePopfine}>{t('style.alMasPuro')}</span>
            <span className={styles.lineBlenny}><span className={styles.almohadilla}>#</span>LaUrbana</span>
            <span className={styles.lineBlenny}>Style</span>
          </h1>
        </div>
      </section>

      <Archivo titulo={t('style.archivo')} posts={postsDelIdioma(idioma)} />
      </main>

      <Footer />
    </div>
  )
}
