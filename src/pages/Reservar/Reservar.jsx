import { useState } from 'react'
import styles from './Reservar.module.css'
import Seo from '../../components/Seo/Seo'
import Footer from '../Home/sections/Footer'

const U_PATH = "M184.52,0c.22,18.08-11.8,18.68-25.3,18.42-1.75-.05-8.68-.05-12.4-.05-1.58-.12-2.9-.17-3.96-.17-2.13,0-5.32.22-9.57.67-1.89.22-3.67,2.13-5.32,5.68-.48.89-.72,2.47-.72,4.68v76.01l-.36,84.36c0,6.02-1.82,11.27-5.49,15.73s-9.28,7.27-16.83,8.37c-1.41.22-3.55.34-6.38.34-8.51,0-15.49-2.35-20.91-7.03-5.44-4.68-8.03-11.27-7.79-19.76V31.27c0-.46.05-1.01.17-1.68s.05-1.44-.17-2.35c-.24-3.12-1.06-5.35-2.49-6.69-1.41-1.34-3.79-2.01-7.1-2.01-1.17-.22-3.07-.34-5.66-.34-1.73,0-3.09.07-4.29.17-3.45,0-11.27,0-13.14.05-13.48.26-25.51-.34-25.3-18.42C-.91,8.25-1.75,18.1,1.87,28.06c4.46,12.28,14.51,19.42,28.37,20.17,1.8.1,4.96.17,8.34.22l-.29,73.21c0,15.85.24,39.4.72,70.64,0,16.74,7.22,30.02,21.63,39.85,9.93,7.15,22.68,10.72,38.29,10.72,4.48,0,7.91-.12,10.29-.34,8.51-.67,16.5-3.45,23.93-8.37,7.43-4.92,13.4-11.15,17.91-18.75,4.48-7.58,6.74-15.61,6.74-24.1V48.44c3.29-.05,6.33-.12,8.06-.22,13.86-.74,23.88-7.89,28.37-20.17C197.85,18.1,197.01,8.25,184.59,0h-.07Z"

// Genera todas las Us del grid con delays pseudoaleatorios
function seededRand(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}
const U_PULSE_POSITIONS = (() => {
  const T = [
    (n, m) => `translate(${-39+n*122},${-48+m*154}) scale(0.3)`,
    (n, m) => `translate(${-40+n*122+121},${-50+m*154+75}) rotate(180) scale(0.3)`,
    (n, m) => `translate(${-40+n*122+62},${-50+m*154+79}) scale(0.3)`,
    (n, m) => `translate(${-40+n*122+60},${-50+m*154+152}) rotate(180) scale(0.3)`,
  ]
  // 2 per column (n=1..10) = 20 total, rows alternadas para cubrir toda la pantalla
  const picks = []
  for (let n = 1; n <= 10; n++) {
    const m1 = ((n - 1) % 6) + 1
    const m2 = ((n - 1 + 3) % 6) + 1
    picks.push(T[n % 4](n, m1))
    picks.push(T[(n + 2) % 4](n, m2))
  }
  return picks.map((transform, i) => {
    const dur = 7 + seededRand(i * 37 + 100) * 7
    return { transform, dur, delay: -(seededRand(i * 53 + 200) * dur) }
  })
})()

const RESTAURANTES = [
  { nombre: 'Bispo Aguirre',     ciudad: 'Lugo',     src: 'https://www.covermanager.com/reservation/module_restaurant/la-urbana/spanish' },
  { nombre: 'C.C. As Termas',   ciudad: 'Lugo',     src: 'https://www.covermanager.com/reservation/module_restaurant/la-urbana-as-termas/spanish' },
  { nombre: 'Augas Férreas',    ciudad: 'Lugo',     src: 'https://www.covermanager.com/reservation/module_restaurant/restaurante-laurbanaaugasferreas/spanish' },
  { nombre: 'Rosalía de Castro', ciudad: 'Vigo',     src: 'https://www.covermanager.com/reservation/module_restaurant/restaurante-laurbana/spanish' },
  { nombre: 'C.C. As Cancelas', ciudad: 'Santiago', src: 'https://www.covermanager.com/reservation/module_restaurant/restaurante-la-urbana-as-cancelas/spanish' },
]

export default function Reservar() {
  const [active, setActive] = useState(0)

  return (
    <div>
      <Seo
        title="Reservar mesa"
        description="Reserva mesa en La Urbana Burger Bar: Lugo (Bispo Aguirre, Praza de Augas Férreas, C.C. As Termas), Vigo y Santiago de Compostela."
        path="/reservar"
      />
      <main className={styles.page}>
        <svg className={styles.uPattern} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="u-shape-r" d={U_PATH}/>
            <pattern id="u-pattern-r" x="-40" y="-50" width="122" height="154" patternUnits="userSpaceOnUse">
              <use href="#u-shape-r" transform="translate(1,2) scale(0.3)" fill="#171715"/>
              <use href="#u-shape-r" transform="translate(121,75) rotate(180) scale(0.3)" fill="#171715"/>
              <use href="#u-shape-r" transform="translate(62,79) scale(0.3)" fill="#171715"/>
              <use href="#u-shape-r" transform="translate(60,152) rotate(180) scale(0.3)" fill="#171715"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#u-pattern-r)"/>
        </svg>
        <svg className={styles.uPulse} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs><path id="u-pulse-r" d={U_PATH}/></defs>
          {U_PULSE_POSITIONS.map((p, i) => (
            <use
              key={i}
              href="#u-pulse-r"
              transform={p.transform}
              fill="#171715"
              className={styles.pU}
              style={{ '--pu-delay': `${p.delay.toFixed(2)}s`, '--pu-dur': `${p.dur.toFixed(1)}s` }}
            />
          ))}
        </svg>

        <div className={styles.header}>
          <h1 className={styles.title}>Reservar</h1>
        </div>

        <div className={styles.tabs}>
          {RESTAURANTES.map((r, i) => (
            <button
              key={r.nombre}
              className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
              onClick={() => setActive(i)}
            >
              {r.nombre}
              <span className={styles.tabCiudad}>{r.ciudad}</span>
            </button>
          ))}
        </div>

        <div className={styles.iframeWrapper}>
          <iframe
            title="Reservas"
            src={RESTAURANTES[active].src}
            frameBorder="0"
            className={styles.iframe}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
