import { useTranslation } from 'react-i18next'
import styles from './TarjetaPost.module.css'
import { Fecha } from './Fecha'
import { CATEGORIAS, rutaCategoria, rutaPost } from './posts'
import Enlace from '../../i18n/Enlace'
import { useIdioma } from '../../i18n/idioma'

export default function TarjetaPost({ post, className = '', style, Encabezado = 'h3' }) {
  const { t } = useTranslation()
  const idioma = useIdioma()
  const textos = post[idioma]

  return (
    <article className={`${styles.tarjeta} ${className}`} style={style}>
      <img src={post.img} alt="" className={styles.img} loading="lazy" />
      <div className={styles.info}>
        <Enlace to={rutaCategoria(post.categoria)} className={styles.categoria}>{CATEGORIAS[post.categoria].nombre[idioma]}</Enlace>
        <Encabezado className={styles.titulo}>
          <Enlace to={rutaPost(post)} className={styles.enlace}>{textos.titulo}</Enlace>
        </Encabezado>
        <Fecha fecha={post.fecha} className={styles.fecha} />
        <p className={styles.extracto}>{textos.extracto}</p>
        <span className={styles.mas} aria-hidden="true">{t('style.leerMas')}</span>
      </div>
    </article>
  )
}
