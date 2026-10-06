import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './BannerCookies.module.css'
import {
  abrirPreferencias,
  cerrarPreferencias,
  guardarConsentimiento,
  useConsentimiento,
  usePreferenciasAbiertas,
} from './consentimiento'

const CATEGORIAS = ['analiticas', 'terceros']

// El banner no va en el HTML prerenderizado: quien ya eligió lo vería un instante antes de que cargue React
const sinSuscripcion = () => () => {}
const useHidratado = () => useSyncExternalStore(sinSuscripcion, () => true, () => false)

function Preferencias({ inicial, onCerrar }) {
  const { t } = useTranslation()
  const [eleccion, setEleccion] = useState(inicial)
  const tituloRef = useRef(null)
  const id = useId()

  useEffect(() => {
    tituloRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <div className={styles.banner} role="dialog" aria-labelledby={`${id}-titulo`}>
      <h2 id={`${id}-titulo`} className={styles.titulo} tabIndex={-1} ref={tituloRef}>
        {t('cookies.preferencias.titulo')}
      </h2>

      <ul className={styles.categorias}>
        <li className={styles.categoria}>
          <div>
            <h3 className={styles.categoriaNombre}>{t('cookies.categorias.tecnicas.nombre')}</h3>
            <p className={styles.texto}>{t('cookies.categorias.tecnicas.texto')}</p>
          </div>
          <span className={styles.siempre}>{t('cookies.preferencias.siempre')}</span>
        </li>
        {CATEGORIAS.map((cat) => (
          <li key={cat} className={styles.categoria}>
            <div>
              <h3 className={styles.categoriaNombre}>
                <label htmlFor={`${id}-${cat}`}>{t(`cookies.categorias.${cat}.nombre`)}</label>
              </h3>
              <p className={styles.texto}>{t(`cookies.categorias.${cat}.texto`)}</p>
            </div>
            <input
              id={`${id}-${cat}`}
              type="checkbox"
              role="switch"
              className={styles.interruptor}
              checked={eleccion[cat]}
              onChange={(e) => setEleccion({ ...eleccion, [cat]: e.target.checked })}
            />
          </li>
        ))}
      </ul>

      <div className={styles.botones}>
        <button type="button" className={styles.boton} onClick={() => guardarConsentimiento({ analiticas: false, terceros: false })}>
          {t('cookies.rechazar')}
        </button>
        <button type="button" className={styles.boton} onClick={() => guardarConsentimiento({ analiticas: true, terceros: true })}>
          {t('cookies.aceptar')}
        </button>
        <button type="button" className={styles.botonSecundario} onClick={() => guardarConsentimiento(eleccion)}>
          {t('cookies.preferencias.guardar')}
        </button>
        <button type="button" className={styles.botonSecundario} onClick={onCerrar}>
          {t('cookies.preferencias.cerrar')}
        </button>
      </div>
    </div>
  )
}

export default function BannerCookies() {
  const { t } = useTranslation()
  const consentimiento = useConsentimiento()
  const preferenciasAbiertas = usePreferenciasAbiertas()
  const hidratado = useHidratado()
  const id = useId()

  if (!hidratado) return null

  if (preferenciasAbiertas) {
    return (
      <Preferencias
        inicial={{ analiticas: consentimiento?.analiticas ?? false, terceros: consentimiento?.terceros ?? false }}
        onCerrar={cerrarPreferencias}
      />
    )
  }

  if (consentimiento) return null

  return (
    <div className={styles.banner} role="dialog" aria-labelledby={`${id}-titulo`} aria-describedby={`${id}-texto`}>
      <h2 id={`${id}-titulo`} className={styles.titulo}>{t('cookies.titulo')}</h2>
      <p id={`${id}-texto`} className={styles.texto}>
        {t('cookies.texto')}{' '}
        <Link to="/politica-cookies" className={styles.enlace}>{t('cookies.politica')}</Link>
      </p>
      <div className={styles.botones}>
        <button type="button" className={styles.boton} onClick={() => guardarConsentimiento({ analiticas: false, terceros: false })}>
          {t('cookies.rechazar')}
        </button>
        <button type="button" className={styles.boton} onClick={() => guardarConsentimiento({ analiticas: true, terceros: true })}>
          {t('cookies.aceptar')}
        </button>
        <button type="button" className={styles.botonSecundario} onClick={abrirPreferencias}>
          {t('cookies.configurar')}
        </button>
      </div>
    </div>
  )
}
