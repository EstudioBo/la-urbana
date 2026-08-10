import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './SeccionRestaurantesSecretos.module.css'
import imgNino from '../../../assets/images/nino-restaurante-secreto-trimmed.webp'
import imgUu from '../../../assets/images/uu-deco.svg'

export default function SeccionRestaurantesSecretos() {
  const fotoRef = useRef(null)
  const [ninoSprung, setNinoSprung] = useState(false)

  useEffect(() => {
    const el = fotoRef.current
    if (!el || window.innerWidth > 640) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setNinoSprung(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section}>
      <img src={imgUu} alt="" className={styles.uuDeco} />
      <div className={styles.foto} ref={fotoRef}>
        <img src={imgNino} alt="" className={ninoSprung ? styles.ninoSpring : ''} />
      </div>
      <div className={styles.content}>
        <span className={styles.label}>
          <span>Nuestros<br /></span>
          <span>Restaurantes</span>
        </span>
        <h2 className={styles.title}>Secretos</h2>
        <p className={styles.body}>En La Urbana Vigo y Lugo - Augas Férreas niños y niñas tienen su espacio secreto, con kiosko para pedidos, zona de juego atendida, pantalla y mesa para comer sin mayores, que son muy aburridos</p>
        <div className={styles.moreWrapper}>
          <Link to="/restaurantes-secretos" className={styles.more}>+</Link>
        </div>
      </div>
    </section>
  )
}
