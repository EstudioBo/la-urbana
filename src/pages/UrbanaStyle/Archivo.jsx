import { useRef } from 'react'
import styles from './Archivo.module.css'
import estilo from './estilo.module.css'
import FondoUs from '../../components/FondoUs/FondoUs'
import TituloQueCae from './TituloQueCae'
import RejillaPosts from './RejillaPosts'

// Listado de entradas sobre el fondo naranja con Us
export default function Archivo({ titulo, posts }) {
  const archivoRef = useRef(null)

  return (
    <section className={`${styles.archivo} ${estilo.fondoNaranja}`} ref={archivoRef} aria-labelledby="archivo-titulo">
      <FondoUs className={styles.fondoUs} columnas={16} filas={24} porColumna={6} />
      <TituloQueCae texto={titulo} seccionRef={archivoRef} id="archivo-titulo" className={styles.archivoTitulo} />
      <RejillaPosts posts={posts} />
    </section>
  )
}
