import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './UrbanaStyleCategoria.module.css'
import estilo from './estilo.module.css'
import Seo from '../../components/Seo/Seo'
import FondoUs from '../../components/FondoUs/FondoUs'
import Footer from '../Home/sections/Footer'
import { CATEGORIAS, postsDelIdioma, rutaCategoria } from './posts'
import TituloQueCae from './TituloQueCae'
import RejillaPosts from './RejillaPosts'
import Enlace, { Redirigir } from '../../i18n/Enlace'
import { useIdioma } from '../../i18n/idioma'

export default function UrbanaStyleCategoria() {
  const { t } = useTranslation()
  const idioma = useIdioma()
  const { categoria: slug } = useParams()
  const cabeceraRef = useRef(null)
  const categoria = Object.keys(CATEGORIAS).find((clave) => CATEGORIAS[clave].slug[idioma] === slug)
  if (!categoria) return <Redirigir to="/la-urbana-style" />

  const nombre = CATEGORIAS[categoria].nombre[idioma]
  const posts = postsDelIdioma(idioma).filter((p) => p.categoria === categoria)

  return (
    <div>
      <Seo
        title={`${nombre} · #LaUrbanaStyle`}
        description={CATEGORIAS[categoria].descripcion[idioma]}
        path={rutaCategoria(categoria)}
        noindex
      />
      <main>
        <header className={`${styles.cabecera} ${estilo.fondoNaranja}`} ref={cabeceraRef}>
          <FondoUs columnas={16} filas={4} porColumna={2} />
          <div className={styles.cabeceraContenido}>
            <TituloQueCae texto={nombre} seccionRef={cabeceraRef} Encabezado="h1" className={styles.titulo} />
            <Enlace to="/la-urbana-style" className={styles.volver} aria-label={t('style.volver')}>← #LaUrbanaStyle</Enlace>
          </div>
        </header>
        <section className={styles.listado} aria-label={t('style.entradasDe', { categoria: nombre })}>
          <RejillaPosts posts={posts} Encabezado="h2" />
        </section>
      </main>
      <Footer />
    </div>
  )
}
