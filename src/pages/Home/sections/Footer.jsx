import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import logoBlanco from '../../../assets/images/logos/logo-blanco.webp'

export default function Footer() {
  return (
    <footer>
      <div className={styles.main}>
        <Link to="/"><img src={logoBlanco} alt="La Urbana" className={styles.logo} /></Link>
        <span className={styles.copy}>© 2026 La Urbana</span>
      </div>
      <div className={styles.legal}>
        <a href="/aviso-legal">Aviso Legal</a>
        <span>|</span>
        <a href="/politica-privacidad">Política de privacidad</a>
        <span>|</span>
        <a href="/politica-cookies">Política de Cookies</a>
        <span>|</span>
        <Link to="/alergenos">Alérgenos</Link>
      </div>
    </footer>
  )
}
