import { useRef, useState, useEffect } from 'react'
import styles from './UrbanaStyle.module.css'
import estilo from './estilo.module.css'
import Seo from '../../components/Seo/Seo'
import FondoUs from '../../components/FondoUs/FondoUs'
import Footer from '../Home/sections/Footer'
import imgHero from '../../assets/images/origen/hero-nuestro-origen2.webp'
import { POSTS } from './posts'
import { useLetrasCaen } from './useLetrasCaen'
import TarjetaPost from './TarjetaPost'

const TITULO_ARCHIVO = 'Lo que pasa en La Urbana'

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

function useVisible(threshold) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}

export default function UrbanaStyle() {
  const archivoRef = useRef(null)
  const tituloRef = useRef(null)
  const [gridRef, gridVisible] = useVisible(0.1)
  useLetrasCaen(archivoRef, tituloRef, `.${styles.letra}`)

  return (
    <div>
      <Seo
        title="#LaUrbanaStyle"
        description="Campañas, colaboraciones con artistas y chefs gallegos y acciones en la calle de La Urbana en Lugo, Santiago y Vigo. Al más puro #LaUrbanaStyle."
        path="/la-urbana-style"
      />
      <section className={styles.hero}>
        <img src={imgHero} alt="" className={styles.heroBg} />
        <div className={styles.heroContent}>
          <h1 className={styles.textBlock}>
            <span className={styles.linePopfine}>Al más puro</span>
            <span className={styles.lineBlenny}>#LaUrbana</span>
            <span className={styles.lineBlenny}>Style</span>
          </h1>
        </div>
      </section>

      <section className={`${styles.archivo} ${estilo.fondoNaranja}`} ref={archivoRef} aria-labelledby="archivo-titulo">
        <FondoUs className={styles.fondoUs} columnas={16} filas={24} porColumna={6} />
        <h2
          id="archivo-titulo"
          ref={tituloRef}
          className={`${styles.archivoTitulo} ${estilo.tituloPegatina}`}
          aria-label={TITULO_ARCHIVO}
        >
          {TITULO_ARCHIVO.split(' ').map((palabra, w, palabras) => {
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
        </h2>
        <div className={`${styles.grid} ${gridVisible ? styles.gridVisible : ''}`} ref={gridRef}>
          {POSTS.map((p, i) => (
            <TarjetaPost key={p.slug} post={p} className={styles.card} style={{ '--i': i }} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
