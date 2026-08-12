import styles from './Alergenos.module.css'
import Seo from '../../components/Seo/Seo'
import Footer from '../Home/sections/Footer'
import imgTabla from '../../assets/images/alergenos.webp'

export default function Alergenos() {
  return (
    <div>
      <Seo
        title="Tabla de alérgenos"
        description="Consulta la tabla completa de alérgenos de todos los platos de La Urbana Burger Bar: burgers, entrantes, ensaladas, postres y menú infantil."
        path="/alergenos"
      />
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
