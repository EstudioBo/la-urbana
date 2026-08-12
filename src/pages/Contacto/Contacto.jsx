import styles from './Contacto.module.css'
import Seo from '../../components/Seo/Seo'
import Footer from '../Home/sections/Footer'

export default function Contacto() {
  return (
    <div>
      <Seo
        title="Contacto"
        description="¿Hablamos? Escríbenos y te respondemos. Contacta con La Urbana Burger Bar para cualquier consulta."
        path="/contacto"
      />
      <main className={styles.page}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <h1 className={styles.title}>¿Hablamos?</h1>
            <p className={styles.sub}>Cuéntanos lo que quieras.</p>
          </div>
          <div className={styles.right}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="nombre">Nombre</label>
                <input className={styles.input} type="text" id="nombre" name="nombre" autoComplete="name" required />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input className={styles.input} type="email" id="email" name="email" autoComplete="email" required />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="mensaje">Mensaje</label>
                <textarea className={styles.textarea} id="mensaje" name="mensaje" rows={6} required />
              </div>
              <button className={styles.btn} type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
