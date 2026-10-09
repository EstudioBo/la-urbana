import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './bloques.module.css'
import Lightbox from '../../components/Lightbox/Lightbox'
import Enlace from '../../i18n/Enlace'
import { guardarConsentimiento, useConsentimiento } from '../../components/Cookies/consentimiento'

// Piezas para escribir el contenido de cada entrada de #LaUrbanaStyle

export function Hashtag({ children }) {
  return <strong className={styles.hashtag}>#{children}</strong>
}

export function EnlaceExterno({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={styles.enlace}>{children}</a>
}

// `to` es la ruta en castellano: lleva a la misma página en el idioma del post
export function EnlaceInterno({ to, children }) {
  return <Enlace to={to} className={styles.enlace}>{children}</Enlace>
}

// Foto al ancho de la columna, recortada en horizontal; `encuadre` elige qué parte se ve (object-position).
// `entera` la muestra sin recortar (carteles, piezas con texto). La primera foto del post va con `primera`
export function Figura({ img, alt, encuadre, entera = false, primera = false }) {
  return (
    <figure className={`${styles.figura} ${entera ? styles.entera : ''}`}>
      <img
        src={img}
        alt={alt}
        loading={primera ? 'eager' : 'lazy'}
        fetchPriority={primera ? 'high' : undefined}
        style={encuadre ? { objectPosition: encuadre } : undefined}
      />
    </figure>
  )
}

// Mosaico a dos columnas; las fotos con `alta` ocupan dos filas. Al pulsar una se abre en grande
export function Galeria({ fotos }) {
  const { t } = useTranslation()
  const [abierta, setAbierta] = useState(null)

  return (
    <>
      <div className={styles.galeria}>
        {fotos.map((f, i) => (
          <button
            key={f.img}
            type="button"
            className={`${styles.galeriaFoto} ${f.alta ? styles.galeriaAlta : ''}`}
            onClick={() => setAbierta(i)}
            aria-label={t('a11y.ampliarFoto', { descripcion: f.alt })}
          >
            <img
              src={f.img}
              alt={f.alt}
              loading="lazy"
              style={f.encuadre ? { objectPosition: f.encuadre } : undefined}
            />
          </button>
        ))}
      </div>
      <Lightbox fotos={fotos} indice={abierta} onCambiar={setAbierta} onCerrar={() => setAbierta(null)} />
    </>
  )
}

// Instagram avisa de la altura real de su reproductor; así el marco se ajusta sin barra de scroll
function useAlturaInstagram(iframeRef) {
  const [altura, setAltura] = useState(null)

  useEffect(() => {
    const recibir = (e) => {
      if (e.origin !== 'https://www.instagram.com' || e.source !== iframeRef.current?.contentWindow) return
      try {
        const datos = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        if (datos?.type === 'MEASURE' && datos.details?.height) setAltura(datos.details.height)
      } catch {
        // mensajes de Instagram que no son de medida
      }
    }
    window.addEventListener('message', recibir)
    return () => window.removeEventListener('message', recibir)
  }, [iframeRef])

  return altura
}

// Instagram incrustado en un componente aparte: así el hook de altura solo se monta con consentimiento
function IframeInstagram({ codigo, pie }) {
  const { t } = useTranslation()
  const iframeRef = useRef(null)
  const altura = useAlturaInstagram(iframeRef)

  return (
    <iframe
      ref={iframeRef}
      src={`https://www.instagram.com/p/${codigo}/embed/`}
      title={pie ? `Instagram: ${pie}` : t('a11y.instagram')}
      className={styles.reelIframe}
      style={altura ? { height: altura } : undefined}
      loading="lazy"
      allow="encrypted-media; picture-in-picture"
      allowFullScreen
    />
  )
}

// Portadas de los reels, descargadas de Instagram y guardadas con el código del post como nombre
const PORTADAS = Object.fromEntries(
  Object.entries(import.meta.glob('../../assets/images/urbana-style/reels/*.webp', { eager: true, import: 'default' }))
    .map(([ruta, url]) => [ruta.split('/').pop().replace('.webp', ''), url])
)

// Publicación o reel de Instagram. Se muestra la portada y el reproductor de Instagram solo se carga al
// pulsarla; sin consentimiento de redes sociales se pide antes de cargar nada de Meta
export function PostInstagram({ codigo, pie }) {
  const { t } = useTranslation()
  const consentimiento = useConsentimiento()
  const [pulsado, setPulsado] = useState(false)

  if (pulsado && consentimiento?.terceros) {
    return (
      <figure className={styles.reel}>
        <IframeInstagram codigo={codigo} pie={pie} />
        {pie && <figcaption className={styles.reelPie}>{pie}</figcaption>}
      </figure>
    )
  }

  return (
    <figure className={styles.reel}>
      <div className={styles.reelPortada}>
        <img src={PORTADAS[codigo]} alt="" loading="lazy" />
        {pulsado ? (
          <div className={styles.reelAviso} role="alert">
            <p>{t('cookies.instagram.texto')}</p>
            <button
              type="button"
              className={styles.reelAceptar}
              onClick={() => guardarConsentimiento({ analiticas: consentimiento?.analiticas ?? false, terceros: true })}
            >
              {t('cookies.instagram.aceptar')}
            </button>
            <EnlaceExterno href={`https://www.instagram.com/p/${codigo}/`}>{t('cookies.instagram.ver')}</EnlaceExterno>
          </div>
        ) : (
          <button
            type="button"
            className={styles.reelPlay}
            onClick={() => setPulsado(true)}
            aria-label={`${t('cookies.instagram.reproducir')}${pie ? `: ${pie}` : ''}`}
          >
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="32" />
              <path d="M26 20v24l19-12z" />
            </svg>
          </button>
        )}
      </div>
      {pie && <figcaption className={styles.reelPie}>{pie}</figcaption>}
    </figure>
  )
}

export function PostsInstagram({ children }) {
  return <div className={styles.reels}>{children}</div>
}
