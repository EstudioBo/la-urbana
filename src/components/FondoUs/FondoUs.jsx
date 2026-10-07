import { useId, useMemo } from 'react'
import PatronUs from './PatronUs'
import styles from './FondoUs.module.css'

// Delays pseudoaleatorios pero estables entre renders
function seededRand(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const T = [
  (n, m) => `translate(${-39+n*122},${-48+m*154}) scale(0.3)`,
  (n, m) => `translate(${-40+n*122+121},${-50+m*154+75}) rotate(180) scale(0.3)`,
  (n, m) => `translate(${-40+n*122+62},${-50+m*154+79}) scale(0.3)`,
  (n, m) => `translate(${-40+n*122+60},${-50+m*154+152}) rotate(180) scale(0.3)`,
]

// Reparte `porColumna` Us que se encienden en cada columna del patrón, escalonadas en diagonal
function posicionesPulso(columnas, filas, porColumna) {
  const salto = Math.floor(filas / porColumna)
  const picks = []
  for (let n = 1; n <= columnas; n++) {
    for (let k = 0; k < porColumna; k++) {
      const m = ((n - 1 + k * salto) % filas) + 1
      picks.push(T[(n + 2 * k) % 4](n, m))
    }
  }
  return picks.map((transform, i) => {
    const dur = 7 + seededRand(i * 37 + 100) * 7
    return { transform, dur, delay: -(seededRand(i * 53 + 200) * dur) }
  })
}

export default function FondoUs({ className = '', columnas = 10, filas = 6, porColumna = 2 }) {
  const id = useId()
  const shapeId = `u-shape${id}`
  const patternId = `u-pattern${id}`
  const pulsos = useMemo(() => posicionesPulso(columnas, filas, porColumna), [columnas, filas, porColumna])

  return (
    <div className={`${styles.fondo} ${className}`} aria-hidden="true">
      <svg className={styles.pattern} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <PatronUs shapeId={shapeId} patternId={patternId}/>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`}/>
      </svg>
      <svg className={styles.pulse} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {pulsos.map((p, i) => (
          <use
            key={i}
            href={`#${shapeId}`}
            transform={p.transform}
            className={styles.pU}
            style={{ '--pu-delay': `${p.delay.toFixed(2)}s`, '--pu-dur': `${p.dur.toFixed(1)}s` }}
          />
        ))}
      </svg>
    </div>
  )
}
