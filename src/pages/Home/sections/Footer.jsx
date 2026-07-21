import styles from './Footer.module.css'
import logoBlanco from '../../../assets/images/logo-blanco.webp'

export default function Footer() {
  return (
    <footer>
      <div className={styles.main}>
        <img src={logoBlanco} alt="La Urbana" className={styles.logo} />
        <span className={styles.copy}>© 2026 La Urbana</span>
      </div>
      <div className={styles.legal}>
        <a href="/aviso-legal">Aviso Legal</a>
        <span>|</span>
        <a href="/politica-privacidad">Política de privacidad</a>
        <span>|</span>
        <a href="/politica-cookies">Política de Cookies</a>
        <span>|</span>
        <a href="/alergenos">Alérgenos</a>
      </div>
    </footer>
  )
}
