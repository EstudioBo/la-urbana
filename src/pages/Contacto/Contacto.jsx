import { useEffect, useRef, useState } from 'react'
import styles from './Contacto.module.css'
import Seo from '../../components/Seo/Seo'
import Footer from '../Home/sections/Footer'

const ARROW_PATH = 'M6.79,55.66c-1.17,0-2.33-.31-3.39-.92-2.13-1.23-3.39-3.42-3.39-5.88V6.8C0,4.35,1.27,2.15,3.39.92,5.52-.31,8.06-.31,10.18.92l36.42,21.03h0c2.13,1.23,3.39,3.42,3.39,5.88,0,2.45-1.27,4.65-3.39,5.88L10.18,54.74c-1.06.61-2.23.92-3.39.92ZM6.8,4.4c-.55,0-.99.2-1.21.33-.36.21-1.2.83-1.2,2.07v42.06c0,1.25.84,1.87,1.2,2.07.36.21,1.31.62,2.39,0l36.42-21.03c1.08-.62,1.2-1.66,1.2-2.07,0-.42-.12-1.45-1.2-2.07L7.99,4.73c-.42-.24-.83-.33-1.19-.33Z'
const ARROW_COUNT = 5

export default function Contacto() {
  const blockRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = blockRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <Seo
        title="Contacto"
        description="¿Hablamos? Escríbenos y te respondemos. Contacta con La Urbana Burger Bar para cualquier consulta."
        path="/contacto"
      />
      <main className={styles.page}>
        <div className={styles.grid}>
          <div className={`${styles.block} ${visible ? styles.visible : ''}`} ref={blockRef}>
            <h1 className={styles.blockTitle}>
              <span>Quieres</span>
              <span>contarnos</span>
              <span>algo???</span>
            </h1>
            <div className={styles.blockArrowTrail}>
              {Array.from({ length: ARROW_COUNT }).map((_, i) => (
                <svg key={i} className={styles.blockArrow} viewBox="0 0 50 55.66" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fill="currentColor" d={ARROW_PATH} />
                </svg>
              ))}
            </div>
          </div>
          <div className={styles.right}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.field}>
                <input className={styles.input} type="text" id="nombre" name="nombre" autoComplete="name" placeholder=" " required />
                <label className={styles.label} htmlFor="nombre">Nombre</label>
              </div>
              <div className={styles.field}>
                <input className={styles.input} type="email" id="email" name="email" autoComplete="email" placeholder=" " required />
                <label className={styles.label} htmlFor="email">Email</label>
              </div>
              <div className={styles.field}>
                <textarea className={styles.textarea} id="mensaje" name="mensaje" rows={6} placeholder=" " required />
                <label className={styles.label} htmlFor="mensaje">Mensaje</label>
              </div>

              <div className={styles.checkboxField}>
                <input type="checkbox" id="privacidad" name="privacidad" required />
                <label htmlFor="privacidad">
                  He leído y acepto la <a href="/politica-privacidad">política de privacidad</a> *
                </label>
              </div>
              <div className={styles.checkboxField}>
                <input type="checkbox" id="marketing" name="marketing" />
                <label htmlFor="marketing">Quiero recibir novedades y promociones de La Urbana</label>
              </div>

              <button className={styles.btn} type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
