import { useId, useMemo } from 'react'
import styles from './FondoUs.module.css'

const U_PATH = "M184.52,0c.22,18.08-11.8,18.68-25.3,18.42-1.75-.05-8.68-.05-12.4-.05-1.58-.12-2.9-.17-3.96-.17-2.13,0-5.32.22-9.57.67-1.89.22-3.67,2.13-5.32,5.68-.48.89-.72,2.47-.72,4.68v76.01l-.36,84.36c0,6.02-1.82,11.27-5.49,15.73s-9.28,7.27-16.83,8.37c-1.41.22-3.55.34-6.38.34-8.51,0-15.49-2.35-20.91-7.03-5.44-4.68-8.03-11.27-7.79-19.76V31.27c0-.46.05-1.01.17-1.68s.05-1.44-.17-2.35c-.24-3.12-1.06-5.35-2.49-6.69-1.41-1.34-3.79-2.01-7.1-2.01-1.17-.22-3.07-.34-5.66-.34-1.73,0-3.09.07-4.29.17-3.45,0-11.27,0-13.14.05-13.48.26-25.51-.34-25.3-18.42C-.91,8.25-1.75,18.1,1.87,28.06c4.46,12.28,14.51,19.42,28.37,20.17,1.8.1,4.96.17,8.34.22l-.29,73.21c0,15.85.24,39.4.72,70.64,0,16.74,7.22,30.02,21.63,39.85,9.93,7.15,22.68,10.72,38.29,10.72,4.48,0,7.91-.12,10.29-.34,8.51-.67,16.5-3.45,23.93-8.37,7.43-4.92,13.4-11.15,17.91-18.75,4.48-7.58,6.74-15.61,6.74-24.1V48.44c3.29-.05,6.33-.12,8.06-.22,13.86-.74,23.88-7.89,28.37-20.17C197.85,18.1,197.01,8.25,184.59,0h-.07Z"

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
          <path id={shapeId} d={U_PATH}/>
          <pattern id={patternId} x="-40" y="-50" width="122" height="154" patternUnits="userSpaceOnUse">
            <use href={`#${shapeId}`} transform="translate(1,2) scale(0.3)"/>
            <use href={`#${shapeId}`} transform="translate(121,75) rotate(180) scale(0.3)"/>
            <use href={`#${shapeId}`} transform="translate(62,79) scale(0.3)"/>
            <use href={`#${shapeId}`} transform="translate(60,152) rotate(180) scale(0.3)"/>
          </pattern>
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
