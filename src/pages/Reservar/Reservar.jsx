import { useState } from 'react'
import styles from './Reservar.module.css'
import Footer from '../Home/sections/Footer'

const RESTAURANTES = [
  {
    ciudad: 'Lugo',
    locales: [
      { nombre: 'Bispo Aguirre', src: 'https://www.covermanager.com/reservation/module_restaurant/la-urbana/spanish' },
      { nombre: 'C.C. As Termas', src: 'https://www.covermanager.com/reservation/module_restaurant/la-urbana-as-termas/spanish' },
      { nombre: 'Augas Férreas', src: 'https://www.covermanager.com/reservation/module_restaurant/restaurante-laurbanaaugasferreas/spanish' },
    ],
  },
  {
    ciudad: 'Vigo',
    locales: [
      { nombre: 'Rosalía de Castro', src: 'https://www.covermanager.com/reservation/module_restaurant/restaurante-laurbana/spanish' },
    ],
  },
  {
    ciudad: 'Santiago',
    locales: [
      { nombre: 'As Cancelas', src: 'https://www.covermanager.com/reservation/module_restaurant/restaurante-la-urbana-as-cancelas/spanish' },
    ],
  },
]

export default function Reservar() {
  const [ciudad, setCiudad] = useState(0)
  const [local, setLocal] = useState(0)

  const locales = RESTAURANTES[ciudad].locales

  function handleCiudad(i) {
    setCiudad(i)
    setLocal(0)
  }

  return (
    <div>
      <main className={styles.page}>
        <div className={styles.header}>
          <span className={styles.label}>La Urbana</span>
          <h1 className={styles.title}>Reservar</h1>
        </div>

        <div className={styles.tabs}>
          {RESTAURANTES.map((r, i) => (
            <button
              key={r.ciudad}
              className={`${styles.tab} ${ciudad === i ? styles.tabActive : ''}`}
              onClick={() => handleCiudad(i)}
            >
              {r.ciudad}
            </button>
          ))}
        </div>

        {locales.length > 1 && (
          <div className={styles.subtabs}>
            {locales.map((l, i) => (
              <button
                key={l.nombre}
                className={`${styles.subtab} ${local === i ? styles.subtabActive : ''}`}
                onClick={() => setLocal(i)}
              >
                {l.nombre}
              </button>
            ))}
          </div>
        )}

        <div className={styles.iframeWrapper}>
          <iframe
            key={locales[local].src}
            title="Reservas"
            src={locales[local].src}
            frameBorder="0"
            className={styles.iframe}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
