import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { abrirPreferencias } from '../../../components/Cookies/consentimiento'
import styles from './Footer.module.css'
import logoBlanco from '../../../assets/images/logos/logo-blanco.webp'

export default function Footer() {
  const { t } = useTranslation()

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
        <Link to="/politica-cookies">Política de Cookies</Link>
        <span>|</span>
        <Link to="/alergenos">Alérgenos</Link>
        <span>|</span>
        <button type="button" onClick={abrirPreferencias}>{t('cookies.reabrir')}</button>
      </div>
    </footer>
  )
}
