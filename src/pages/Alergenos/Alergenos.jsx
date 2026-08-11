import styles from './Alergenos.module.css'
import Footer from '../Home/sections/Footer'
import imgTabla from '../../assets/images/alergenos.webp'

export default function Alergenos() {
  return (
    <div>
      <main className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Alérgenos</h1>
          <span className={styles.label}>La Urbana</span>
        </div>
        <div className={styles.tablaWrapper}>
          <img src={imgTabla} alt="Tabla de alérgenos La Urbana" className={styles.tabla} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
