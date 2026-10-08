import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
import { CATEGORIAS, postsDelIdioma, rutaCategoria, rutaPost } from './posts'
import Enlace, { Redirigir } from '../../i18n/Enlace'
import { useIdioma } from '../../i18n/idioma'
import { localizar } from '../../i18n/rutas'

function ArticuloJsonLd({ textos, idioma, path, imagen, fecha }) {
  return (
    <JsonLd
      schema={{
        '@type': 'BlogPosting',
        headline: textos.titulo,
        description: textos.extracto,
        image: `${SITE_URL}${imagen}`,
        ...(fecha && { datePublished: fecha }),
        inLanguage: idioma,
        mainEntityOfPage: `${SITE_URL}${localizar(path, idioma)}`,
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
  const { t } = useTranslation()
  const idioma = useIdioma()
  const { slug } = useParams()
  const posts = postsDelIdioma(idioma)
  const post = posts.find((p) => p.slug[idioma] === slug)
  if (!post) return <Redirigir to="/la-urbana-style" />

  const textos = post[idioma]
  const path = rutaPost(post)
  // Las imágenes para redes se guardan con el slug en castellano
  const imagen = `/og/${post.slug.es}.webp`
  const otros = posts.filter((p) => p !== post).slice(0, 3)
  const { Contenido } = textos

  return (
    <div>
      <Seo title={textos.seo.titulo} description={textos.seo.descripcion} path={path} image={imagen} type="article" />
      <ArticuloJsonLd textos={textos} idioma={idioma} path={path} imagen={imagen} fecha={post.fecha} />
      <MigasJsonLd migas={[{ nombre: '#LaUrbanaStyle', path: '/la-urbana-style' }, { nombre: textos.titulo, path }]} />

      <main>
        <header className={styles.cabecera}>
          <FondoUs columnas={16} filas={4} porColumna={2} />
          <div className={styles.cabeceraContenido}>
            <h1 className={styles.titulo}>{textos.titulo}</h1>
            <p className={styles.meta}>
              <Enlace to={rutaCategoria(post.categoria)} className={styles.categoria}>{CATEGORIAS[post.categoria].nombre[idioma]}</Enlace>
              <Fecha fecha={post.fecha} className={styles.fecha} />
            </p>
          </div>
        </header>
        <div className={styles.cuerpo}>
          <div className={styles.texto}>
            {Contenido ? <Contenido /> : <p>{textos.extracto}</p>}
          </div>
        </div>
      </main>

      <section className={styles.cta} aria-labelledby="cta-titulo">
        <h2 id="cta-titulo" className={styles.ctaTitulo}>{t('style.ctaTitulo')}</h2>
        <div className={styles.ctaBotones}>
          <Enlace to="/reservar" className={`${styles.ctaBtn} ${styles.ctaReservar}`}>{t('style.reservarMesa')}</Enlace>
          <Enlace to="/carta" className={`${styles.ctaBtn} ${styles.ctaCarta}`}>{t('style.verCarta')}</Enlace>
        </div>
      </section>

      <section className={styles.mas} aria-labelledby="mas-titulo">
        <h2 id="mas-titulo" className={`${styles.masTitulo} ${estilo.tituloPegatina}`}>{t('style.mas')}</h2>
        <div className={styles.masGrid}>
          {otros.map((p) => <TarjetaPost key={p.slug.es} post={p} />)}
        </div>
        <Enlace to="/la-urbana-style" className={styles.verTodo}>{t('style.verTodas')}</Enlace>
      </section>

      <Footer />
    </div>
  )
}
