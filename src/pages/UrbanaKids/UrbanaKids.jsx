import styles from './UrbanaKids.module.css'
import Footer from '../Home/sections/Footer'
import imgUu from '../../assets/images/uu-deco.svg'
import img1 from '../../assets/images/restaurante-secreto-1.webp'
import img2 from '../../assets/images/restaurante-secreto-2.webp'
import img3 from '../../assets/images/restaurante-secreto-3.webp'
import img4 from '../../assets/images/restaurante-secreto-4.webp'
import img5 from '../../assets/images/restaurante-secreto-5.webp'
import img6 from '../../assets/images/restaurante-secreto-6.webp'
import img7 from '../../assets/images/restaurante-secreto-7.webp'
import imgNino from '../../assets/images/nino-restaurante-secreto.webp'

export default function UrbanaKids() {
  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <img src={imgUu} alt="" className={styles.uuDeco} />
        <div className={styles.heroFoto}>
          <img src={imgNino} alt="" />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.label}>
            <span>Urbana<br /></span>
            <span>Kids</span>
          </span>
          <h1 className={styles.title}>Restaurante<br />Secreto</h1>
          <p className={styles.intro}>
            Amamos a madres y padres. Por eso les hemos hecho un Restaurante Secreto a vuestras criaturas dentro de nuestros restaurantes. Peques felices, adultos más.&nbsp;;)
          </p>
        </div>
      </section>

      {/* COPY */}
      <section className={styles.copySection}>
        <div className={styles.copyText}>
          <p>La zona infantil se llama <strong>Restaurante Secreto</strong>, pero esto solo lo hay en <strong>Lugo (Augas Férreas)</strong> y en <strong>Vigo</strong>.</p>
          <p>Kiosko para pedidos, zona de juego atendida, pantalla y mesa para comer sin mayores… que son muy aburridos.</p>
        </div>
        <div className={styles.copyBadge}>
          <span className={styles.badgeLabel}>Urbana Kids</span>
          <span className={styles.badgeTitle}>Uu</span>
          <span className={styles.badgeSub}>Restaurante Secreto</span>
        </div>
      </section>

      {/* GALERÍA */}
      <section className={styles.galeria}>
        <div className={styles.galeriaGrid}>
          <div className={`${styles.galeriaItem} ${styles.galeriaLarge}`}>
            <img src={img1} alt="" />
          </div>
          <div className={styles.galeriaItem}>
            <img src={img2} alt="" />
          </div>
          <div className={styles.galeriaItem}>
            <img src={img3} alt="" />
          </div>
          <div className={styles.galeriaItem}>
            <img src={img4} alt="" />
          </div>
          <div className={`${styles.galeriaItem} ${styles.galeriaLarge}`}>
            <img src={img5} alt="" />
          </div>
          <div className={styles.galeriaItem}>
            <img src={img6} alt="" />
          </div>
          <div className={styles.galeriaItem}>
            <img src={img7} alt="" />
          </div>
        </div>
      </section>

      {/* MENÚ INFANTIL */}
      <section className={styles.menuSection}>
        <img src={imgUu} alt="" className={styles.uuDecoMenu} />
        <div className={styles.menuContent}>
          <span className={styles.menuLabel}>Aquí hay un</span>
          <h2 className={styles.menuTitle}>Menú</h2>
          <p className={styles.menuBody}>
            La zona infantil se llama <strong>Restaurante Secreto</strong>, pero esto solo lo hay en <strong>Lugo (Augas Férreas)</strong> y en <strong>Vigo</strong>.
          </p>
          <div className={styles.menuBadge}>
            <span>Urbana Kids</span>
            <span className={styles.menuBadgeUu}>Uu</span>
            <span>Restaurante Secreto</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
