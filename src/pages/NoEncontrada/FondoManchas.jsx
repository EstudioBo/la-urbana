import { useEffect, useId, useRef, useState } from 'react'
import PatronUs from '../../components/FondoUs/PatronUs'
import styles from './NoEncontrada.module.css'

const ANCHO = 1600
const ALTO = 1000

// Cada mancha da vueltas lentas alrededor de su sitio (x, y): `a` es cuánto se aleja, `p` cuántos segundos tarda
const MANCHAS = [
  { x: 300, y: 250, r: 133, ax: 160, ay: 90, px: 11, py: 9, fase: 0 },
  { x: 1250, y: 220, r: 161, ax: 140, ay: 120, px: 13, py: 10, fase: 1.7 },
  { x: 820, y: 520, r: 119, ax: 260, ay: 140, px: 16, py: 12, fase: 3.1 },
  { x: 250, y: 780, r: 147, ax: 150, ay: 110, px: 10, py: 14, fase: 4.2 },
  { x: 1350, y: 800, r: 140, ax: 170, ay: 100, px: 12, py: 9, fase: 2.4 },
  { x: 700, y: 140, r: 84, ax: 200, ay: 60, px: 9, py: 13, fase: 5.3 },
]
const RADIO_CURSOR = 85

const VERTICAL = '(orientation: portrait)'

// En pantallas verticales el lienzo se gira: se intercambian ancho y alto, y x con y
function posicion(m, t, vertical) {
  const x = m.x + m.ax * Math.sin((t / m.px) * 2 * Math.PI + m.fase)
  const y = m.y + m.ay * Math.cos((t / m.py) * 2 * Math.PI + m.fase)
  return vertical ? { cx: y, cy: x } : { cx: x, cy: y }
}

export default function FondoManchas() {
  const id = useId()
  const svgRef = useRef(null)
  const circulosRef = useRef([])
  const cursorRef = useRef(null)
  const [vertical, setVertical] = useState(() => typeof window !== 'undefined' && window.matchMedia(VERTICAL).matches)
  const ancho = vertical ? ALTO : ANCHO
  const alto = vertical ? ANCHO : ALTO

  useEffect(() => {
    const consulta = window.matchMedia(VERTICAL)
    const alCambiar = (e) => setVertical(e.matches)
    consulta.addEventListener('change', alCambiar)
    return () => consulta.removeEventListener('change', alCambiar)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const svg = svgRef.current
    const cursor = { x: ancho / 2, y: alto / 2 }
    const objetivo = { ...cursor }

    const alMover = (e) => {
      const ctm = svg.getScreenCTM()
      if (!ctm) return
      objetivo.x = (e.clientX - ctm.e) / ctm.a
      objetivo.y = (e.clientY - ctm.f) / ctm.d
    }

    let frame
    const inicio = performance.now()
    const paso = (ahora) => {
      const t = (ahora - inicio) / 1000
      MANCHAS.forEach((m, i) => {
        const { cx, cy } = posicion(m, t, vertical)
        circulosRef.current[i].setAttribute('cx', cx)
        circulosRef.current[i].setAttribute('cy', cy)
      })
      cursor.x += (objetivo.x - cursor.x) * 0.06
      cursor.y += (objetivo.y - cursor.y) * 0.06
      cursorRef.current.setAttribute('cx', cursor.x)
      cursorRef.current.setAttribute('cy', cursor.y)
      frame = requestAnimationFrame(paso)
    }

    window.addEventListener('pointermove', alMover)
    frame = requestAnimationFrame(paso)
    return () => {
      window.removeEventListener('pointermove', alMover)
      cancelAnimationFrame(frame)
    }
  }, [vertical, ancho, alto])

  return (
    <svg
      ref={svgRef}
      className={styles.fondo}
      viewBox={`0 0 ${ancho} ${alto}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <PatronUs shapeId={`u${id}`} patternId={`patron${id}`} escala={1.6}/>
        {/* Difumina las manchas y luego corta el borde: donde se tocan se funden en una sola */}
        <filter id={`goo${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="40"/>
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12"/>
        </filter>
        <mask id={`manchas${id}`}>
          <g filter={`url(#goo${id})`} fill="white">
            {MANCHAS.map((m, i) => (
              <circle key={i} ref={(el) => { circulosRef.current[i] = el }} r={m.r} {...posicion(m, 0, vertical)}/>
            ))}
            <circle ref={cursorRef} r={RADIO_CURSOR} cx={ancho / 2} cy={alto / 2}/>
          </g>
        </mask>
      </defs>
      <g mask={`url(#manchas${id})`}>
        <rect className={styles.manchaColor} width={ancho} height={alto}/>
        <rect className={styles.manchaUs} width={ancho} height={alto} fill={`url(#patron${id})`}/>
        <rect className={styles.manchaSombra} width={ancho} height={alto}/>
      </g>
    </svg>
  )
}
