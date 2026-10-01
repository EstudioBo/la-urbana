import { useRef } from 'react'
import styles from './TituloQueCae.module.css'
import estilo from './estilo.module.css'
import { useLetrasCaen } from './useLetrasCaen'

// Movimiento distinto por letra; pseudoaleatorio para que no cambie entre renders
function aleatorio(semilla) {
  const x = Math.sin(semilla * 9301 + 49297) * 10000
  return x - Math.floor(x)
}

function estiloLetra(i) {
  const entre = (min, max, k) => (min + aleatorio(i * 7 + k) * (max - min)).toFixed(2)
  return {
    '--dur': `${entre(3.5, 6, 1)}s`,
    '--delay': `-${entre(0, 6, 2)}s`,
    '--y1': `${-entre(0.04, 0.09, 3)}em`,
    '--y2': `${-entre(0.01, 0.05, 4)}em`,
    '--x': `${entre(-0.015, 0.015, 5)}em`,
    '--r1': `${entre(-2, 2, 6)}deg`,
    '--r2': `${entre(-2, 2, 7)}deg`,
  }
}

// Título pegatina cuyas letras caen desde el borde de `seccionRef` y luego flotan
export default function TituloQueCae({ texto, seccionRef, Encabezado = 'h2', id, className = '' }) {
  const tituloRef = useRef(null)
  useLetrasCaen(seccionRef, tituloRef, `.${styles.letra}`)

  return (
    <Encabezado id={id} ref={tituloRef} className={`${estilo.tituloPegatina} ${className}`} aria-label={texto}>
      {texto.split(' ').map((palabra, w, palabras) => {
        const inicio = palabras.slice(0, w).join('').length
        return (
          <span key={w} className={styles.palabra} aria-hidden="true">
            {[...palabra].map((letra, l) => (
              <span key={l} className={styles.letra}>
                <span className={styles.flota} style={estiloLetra(inicio + l)}>{letra}</span>
              </span>
            ))}
          </span>
        )
      })}
    </Encabezado>
  )
}
