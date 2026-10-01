import { Link } from 'react-router-dom'
import styles from './TarjetaPost.module.css'
import { Fecha } from './Fecha'

export default function TarjetaPost({ post, className = '', style }) {
  return (
    <article className={`${styles.tarjeta} ${className}`} style={style}>
      <img src={post.img} alt="" className={styles.img} loading="lazy" />
      <div className={styles.info}>
        <span className={styles.categoria}>{post.categoria}</span>
        <h3 className={styles.titulo}>
          <Link to={`/la-urbana-style/${post.slug}`} className={styles.enlace}>{post.titulo}</Link>
        </h3>
        <Fecha fecha={post.fecha} className={styles.fecha} />
        <p className={styles.extracto}>{post.extracto}</p>
        <span className={styles.mas} aria-hidden="true">Leer más</span>
      </div>
    </article>
  )
}
