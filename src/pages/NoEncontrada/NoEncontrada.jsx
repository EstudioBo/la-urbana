import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import Enlace from '../../i18n/Enlace'
import Seo from '../../components/Seo/Seo'
import FondoManchas from './FondoManchas'
import HamburguesaCero from './HamburguesaCero'
import styles from './NoEncontrada.module.css'

export default function NoEncontrada() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const enlacesRef = useRef(null)

  return (
    <main className={styles.page}>
      <Seo
        title={t('noEncontrada.titulo')}
        description={t('noEncontrada.descripcion')}
        path={pathname}
        noindex
      />
      <FondoManchas />

      <div className={styles.contenido}>
        <div className={styles.codigo}>
          <span className={styles.cuatro} aria-hidden="true">4</span>
          <HamburguesaCero
            etiqueta={t('noEncontrada.soltar')}
            textoClic={t('noEncontrada.clic')}
            textoBarrer={t('noEncontrada.barrer')}
            limiteRef={enlacesRef}
          />
          <span className={styles.cuatro} aria-hidden="true">4</span>
        </div>

        <h1 className={styles.frase}>
          <span className={styles.oculto}>{t('noEncontrada.codigo')}. </span>
          {t('noEncontrada.frase')}
        </h1>

        <nav ref={enlacesRef} className={styles.enlaces} aria-label={t('noEncontrada.enlaces')}>
          <Enlace to="/carta" className={styles.enlace}>{t('noEncontrada.carta')}</Enlace>
          <a href="https://laurbana.waitry.net/" target="_blank" rel="noopener noreferrer" className={`${styles.enlace} ${styles.enlacePedido}`}>{t('noEncontrada.pedido')}</a>
          <Enlace to="/reservar" className={`${styles.enlace} ${styles.enlacePrincipal}`}>{t('noEncontrada.reservar')}</Enlace>
        </nav>
      </div>
    </main>
  )
}
