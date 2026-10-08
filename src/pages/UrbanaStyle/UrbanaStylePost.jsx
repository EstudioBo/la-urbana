import { Link, Navigate, useParams } from 'react-router-dom'
import styles from './UrbanaStylePost.module.css'
import estilo from './estilo.module.css'
import Seo from '../../components/Seo/Seo'
import JsonLd from '../../components/Seo/JsonLd'
import MigasJsonLd from '../../components/Seo/MigasJsonLd'
import { SITE_NAME, SITE_URL } from '../../components/Seo/site'
import Footer from '../Home/sections/Footer'
import FondoUs from '../../components/FondoUs/FondoUs'
import TarjetaPost from './TarjetaPost'
import { Fecha } from './Fecha'
import { CATEGORIAS, POSTS, rutaCategoria } from './posts'

function ArticuloJsonLd({ post, path, imagen }) {
  return (
    <JsonLd
      schema={{
        '@type': 'BlogPosting',
        headline: post.titulo,
        description: post.extracto,
        image: `${SITE_URL}${imagen}`,
        ...(post.fecha && { datePublished: post.fecha }),
        inLanguage: 'es',
        mainEntityOfPage: `${SITE_URL}${path}`,
        author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
          logo: `${SITE_URL}/favicon.webp`,
        },
      }}
    />
  )
}

export default function UrbanaStylePost() {
  const { slug } = useParams()
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) return <Navigate to="/la-urbana-style" replace />

  const path = `/la-urbana-style/${post.slug}`
  const imagen = `/og/${post.slug}.webp`
  const otros = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)
  const { Contenido } = post

  return (
    <div>
      <Seo title={post.seo.titulo} description={post.seo.descripcion} path={path} image={imagen} type="article" />
      <ArticuloJsonLd post={post} path={path} imagen={imagen} />
      <MigasJsonLd migas={[{ nombre: '#LaUrbanaStyle', path: '/la-urbana-style' }, { nombre: post.titulo, path }]} />

      <main>
        <header className={styles.cabecera}>
          <FondoUs columnas={16} filas={4} porColumna={2} />
          <div className={styles.cabeceraContenido}>
            <h1 className={styles.titulo}>{post.titulo}</h1>
            <p className={styles.meta}>
              <Link to={rutaCategoria(post.categoria)} className={styles.categoria}>{CATEGORIAS[post.categoria]}</Link>
              <Fecha fecha={post.fecha} className={styles.fecha} />
            </p>
          </div>
        </header>
        <div className={styles.cuerpo}>
          <div className={styles.texto}>
            {Contenido ? <Contenido /> : <p>{post.extracto}</p>}
          </div>
        </div>
      </main>

      <section className={styles.cta} aria-labelledby="cta-titulo">
        <h2 id="cta-titulo" className={styles.ctaTitulo}>Las historias se cuentan mejor con una burger delante</h2>
        <div className={styles.ctaBotones}>
          <Link to="/reservar" className={`${styles.ctaBtn} ${styles.ctaReservar}`}>Reservar mesa</Link>
          <Link to="/carta" className={`${styles.ctaBtn} ${styles.ctaCarta}`}>Ver la carta</Link>
        </div>
      </section>

      <section className={styles.mas} aria-labelledby="mas-titulo">
        <h2 id="mas-titulo" className={`${styles.masTitulo} ${estilo.tituloPegatina}`}>Más #LaUrbanaStyle</h2>
        <div className={styles.masGrid}>
          {otros.map((p) => <TarjetaPost key={p.slug} post={p} />)}
        </div>
        <Link to="/la-urbana-style" className={styles.verTodo}>Ver todas las historias →</Link>
      </section>

      <Footer />
    </div>
  )
}
