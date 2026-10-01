import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './bloques.module.css'
import Lightbox from '../../components/Lightbox/Lightbox'

// Piezas para escribir el contenido de cada entrada de #LaUrbanaStyle

export function Hashtag({ children }) {
  return <strong className={styles.hashtag}>#{children}</strong>
}

export function EnlaceExterno({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={styles.enlace}>{children}</a>
}

export function EnlaceInterno({ to, children }) {
  return <Link to={to} className={styles.enlace}>{children}</Link>
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
            aria-label={`Ampliar foto: ${f.alt}`}
          >
            <img
              src={f.img}
              alt=""
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

// Publicación o reel de Instagram incrustado. Carga contenido de Meta: debe quedar condicionado al
// consentimiento del banner de cookies cuando exista
export function PostInstagram({ codigo, pie }) {
  const iframeRef = useRef(null)
  const altura = useAlturaInstagram(iframeRef)

  return (
    <figure className={styles.reel}>
      <iframe
        ref={iframeRef}
        src={`https://www.instagram.com/p/${codigo}/embed/`}
        title={pie ? `Instagram: ${pie}` : 'Publicación de Instagram de La Urbana'}
        className={styles.reelIframe}
        style={altura ? { height: altura } : undefined}
        loading="lazy"
        allow="encrypted-media; picture-in-picture"
        allowFullScreen
      />
      {pie && <figcaption className={styles.reelPie}>{pie}</figcaption>}
    </figure>
  )
}

export function PostsInstagram({ children }) {
  return <div className={styles.reels}>{children}</div>
}
