import { useEffect, useRef, useState } from 'react'
import styles from './bloques.module.css'

// Piezas para escribir el contenido de cada entrada de #LaUrbanaStyle

export function Hashtag({ children }) {
  return <strong className={styles.hashtag}>#{children}</strong>
}

export function EnlaceExterno({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={styles.enlace}>{children}</a>
}

// Foto al ancho de la columna, recortada en horizontal; `encuadre` elige qué parte se ve (object-position).
// La primera foto del post va con `primera` para que no espere a cargarse
export function Figura({ img, alt, encuadre, primera = false }) {
  return (
    <figure className={styles.figura}>
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

// Mosaico a dos columnas; las fotos con `alta` ocupan dos filas
export function Galeria({ fotos }) {
  return (
    <div className={styles.galeria}>
      {fotos.map((f) => (
        <img
          key={f.img}
          src={f.img}
          alt={f.alt}
          loading="lazy"
          className={f.alta ? styles.galeriaAlta : undefined}
          style={f.encuadre ? { objectPosition: f.encuadre } : undefined}
        />
      ))}
    </div>
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

// Reproductor de Instagram incrustado. Carga contenido de Meta: debe quedar condicionado al
// consentimiento del banner de cookies cuando exista
export function Reel({ codigo, titulo }) {
  const iframeRef = useRef(null)
  const altura = useAlturaInstagram(iframeRef)

  return (
    <figure className={styles.reel}>
      <iframe
        ref={iframeRef}
        src={`https://www.instagram.com/reel/${codigo}/embed/`}
        title={`Reel de Instagram: ${titulo}`}
        className={styles.reelIframe}
        style={altura ? { height: altura } : undefined}
        loading="lazy"
        allow="encrypted-media; picture-in-picture"
        allowFullScreen
      />
      <figcaption className={styles.reelPie}>
        <strong>{titulo}</strong>
      </figcaption>
    </figure>
  )
}

export function Reels({ children }) {
  return <div className={styles.reels}>{children}</div>
}
