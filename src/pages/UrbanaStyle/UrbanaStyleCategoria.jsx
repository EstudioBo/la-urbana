import { useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import styles from './UrbanaStyleCategoria.module.css'
import estilo from './estilo.module.css'
import Seo from '../../components/Seo/Seo'
import FondoUs from '../../components/FondoUs/FondoUs'
import Footer from '../Home/sections/Footer'
import { CATEGORIAS, POSTS, rutaCategoria } from './posts'
import TituloQueCae from './TituloQueCae'
import RejillaPosts from './RejillaPosts'

export default function UrbanaStyleCategoria() {
  const { categoria } = useParams()
  const cabeceraRef = useRef(null)
  const nombre = CATEGORIAS[categoria]
  if (!nombre) return <Navigate to="/la-urbana-style" replace />

  const posts = POSTS.filter((p) => p.categoria === categoria)

  return (
    <div>
      <Seo
        title={`${nombre} · #LaUrbanaStyle`}
        description={`Historias de La Urbana en la categoría ${nombre}: campañas, colaboraciones y novedades en Lugo, Santiago y Vigo.`}
        path={rutaCategoria(categoria)}
      />
      <main>
        <header className={`${styles.cabecera} ${estilo.fondoNaranja}`} ref={cabeceraRef}>
          <FondoUs columnas={16} filas={4} porColumna={2} />
          <div className={styles.cabeceraContenido}>
            <TituloQueCae texto={nombre} seccionRef={cabeceraRef} Encabezado="h1" className={styles.titulo} />
            <Link to="/la-urbana-style" className={styles.volver} aria-label="Volver a #LaUrbanaStyle">← #LaUrbanaStyle</Link>
          </div>
        </header>
        <section className={styles.listado} aria-label={`Entradas de ${nombre}`}>
          <RejillaPosts posts={posts} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
