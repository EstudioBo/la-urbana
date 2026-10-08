import { useTranslation } from 'react-i18next'
import { abrirPreferencias } from '../../../components/Cookies/consentimiento'
import Enlace from '../../../i18n/Enlace'
import styles from './Footer.module.css'
import logoBlanco from '../../../assets/images/logos/logo-blanco.webp'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer>
      <div className={styles.main}>
        <Enlace to="/"><img loading="lazy" src={logoBlanco} alt="La Urbana" className={styles.logo} /></Enlace>
        <span className={styles.copy}>© 2026 La Urbana</span>
      </div>
      <div className={styles.legal}>
        <Enlace to="/aviso-legal">{t('footer.avisoLegal')}</Enlace>
        <span>|</span>
        <Enlace to="/politica-privacidad">{t('footer.privacidad')}</Enlace>
        <span>|</span>
        <Enlace to="/politica-cookies">{t('footer.cookies')}</Enlace>
        <span>|</span>
        <Enlace to="/alergenos">{t('footer.alergenos')}</Enlace>
        <span>|</span>
        <button type="button" onClick={abrirPreferencias}>{t('cookies.reabrir')}</button>
      </div>
    </footer>
  )
}
