import styles from './UrbanaStyle.module.css'
import Seo from '../../components/Seo/Seo'
import Footer from '../Home/sections/Footer'
import imgHero from '../../assets/images/origen/hero-nuestro-origen2.webp'
import { POSTS } from './posts'
import Archivo from './Archivo'

export default function UrbanaStyle() {
  return (
    <div>
      <Seo
        title="#LaUrbanaStyle"
        description="Campañas, colaboraciones con artistas y chefs gallegos y acciones en la calle de La Urbana en Lugo, Santiago y Vigo. Al más puro #LaUrbanaStyle."
        path="/la-urbana-style"
      />
      <section className={styles.hero}>
        <img src={imgHero} alt="" className={styles.heroBg} />
        <div className={styles.heroContent}>
          <h1 className={styles.textBlock}>
            <span className={styles.linePopfine}>Al más puro</span>
            <span className={styles.lineBlenny}><span className={styles.almohadilla}>#</span>LaUrbana</span>
            <span className={styles.lineBlenny}>Style</span>
          </h1>
        </div>
      </section>

      <Archivo titulo="Lo que pasa en La Urbana" posts={POSTS} />

      <Footer />
    </div>
  )
}
