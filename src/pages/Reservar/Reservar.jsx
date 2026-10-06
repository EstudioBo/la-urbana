import { useState } from 'react'
import styles from './Reservar.module.css'
import Seo from '../../components/Seo/Seo'
import Footer from '../Home/sections/Footer'
import FondoUs from '../../components/FondoUs/FondoUs'

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
        title="Reservar mesa: Lugo, Vigo, Santiago"
        description="Reserva mesa en La Urbana Burger Bar: Lugo (Bispo Aguirre, Praza de Augas Férreas y C.C. As Termas), Vigo y Santiago de Compostela. Elige local y reserva."
        path="/reservar"
      />
      <main className={styles.page}>
        <FondoUs />

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
