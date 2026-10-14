import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Reservar.module.css'
import Seo from '../../components/Seo/Seo'
import MigasJsonLd from '../../components/Seo/MigasJsonLd'
import Footer from '../Home/sections/Footer'
import FondoUs from '../../components/FondoUs/FondoUs'
import { tx, useIdioma } from '../../i18n/idioma'

// El módulo de reservas de CoverManager se carga en el idioma de la página
const MODULO_IDIOMA = { es: 'spanish', en: 'english' }

const RESTAURANTES = [
  { nombre: 'Bispo Aguirre',     ciudad: 'Lugo',     modulo: 'la-urbana' },
  { nombre: { es: 'C.C. As Termas', en: 'As Termas Shopping Centre' },   ciudad: 'Lugo',     modulo: 'la-urbana-as-termas' },
  { nombre: 'Augas Férreas',    ciudad: 'Lugo',     modulo: 'restaurante-laurbanaaugasferreas' },
  { nombre: 'Rosalía de Castro', ciudad: 'Vigo',     modulo: 'restaurante-laurbana' },
  { nombre: { es: 'C.C. As Cancelas', en: 'As Cancelas Shopping Centre' }, ciudad: 'Santiago', modulo: 'restaurante-la-urbana-as-cancelas' },
]

// El módulo de CoverManager pesa mucho (JavaScript sin minificar y tareas largas): se pide cuando la página
// ya ha cargado y el navegador está libre, no a la vez que el resto. El hueco está reservado, así que nada se mueve
function useCargaDiferida() {
  const [listo, setListo] = useState(false)

  useEffect(() => {
    let idle
    const activar = () => {
      idle = 'requestIdleCallback' in window
        ? window.requestIdleCallback(() => setListo(true), { timeout: 2000 })
        : window.setTimeout(() => setListo(true), 1000)
    }
    if (document.readyState === 'complete') activar()
    else window.addEventListener('load', activar, { once: true })
    return () => {
      window.removeEventListener('load', activar)
      if ('requestIdleCallback' in window) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
    }
  }, [])

  return listo
}

export default function Reservar() {
  const { t } = useTranslation()
  const idioma = useIdioma()
  const [active, setActive] = useState(0)
  const moduloListo = useCargaDiferida()

  return (
    <div>
      <Seo
        title={t('reservar.seo.titulo')}
        description={t('reservar.seo.descripcion')}
        path="/reservar"
      />
      <MigasJsonLd migas={[{ nombre: t('nav.reservar'), path: '/reservar' }]} />
      <main className={styles.page}>
        <FondoUs />

        <div className={styles.header}>
          <h1 className={styles.title}>{t('reservar.titulo')}</h1>
        </div>

        <div className={styles.tabs}>
          {RESTAURANTES.map((r, i) => (
            <button
              key={r.modulo}
              className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
              onClick={() => setActive(i)}
            >
              {tx(r.nombre, idioma)}
              <span className={styles.tabCiudad}>{r.ciudad}</span>
            </button>
          ))}
        </div>

        <div className={styles.iframeWrapper} aria-busy={!moduloListo}>
          {moduloListo ? (
            <iframe
              title={t('reservar.iframe')}
              src={`https://www.covermanager.com/reservation/module_restaurant/${RESTAURANTES[active].modulo}/${MODULO_IDIOMA[idioma]}`}
              className={styles.iframe}
            />
          ) : (
            <p className={styles.cargando} role="status">{t('reservar.cargando')}</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
