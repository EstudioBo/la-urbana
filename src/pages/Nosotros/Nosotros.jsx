import { useRef, useEffect } from 'react'
import styles from './Nosotros.module.css'
import Seo from '../../components/Seo/Seo'
import Footer from '../Home/sections/Footer'
import imgHero from '../../assets/images/origen/hero-nuestro-origen2.webp'
import imgQuesoSanSimon   from '../../assets/images/origen/queso-san-simon.webp'
import imgEstrellaGalicia from '../../assets/images/origen/estrella-galicia.webp'
import imgHuevosPazo      from '../../assets/images/origen/huevos-pazo-vilane.webp'
import imgLecheQuintian   from '../../assets/images/origen/leche-quintian.webp'
import imgPostresXanceda  from '../../assets/images/origen/postres-xanceda.webp'
import imgQuesoArzua      from '../../assets/images/origen/queso-arzua-ulloa.webp'

const PRODUCTOS = [
  { img: imgHuevosPazo,      nombre: 'Huevos de Pazo de Vilane',          texto: 'Huevos camperos de los de verdad. De Antas de Ulla.' },
  { img: imgQuesoSanSimon,   nombre: 'Queso D.O. San Simón da Costa',     texto: 'Ese sabor ahumado que no se olvida. Uno de nuestros secretos mejor compartidos.' },
  { img: imgLecheQuintian,   nombre: 'Leche Ganadería Quintián',           texto: 'Kilómetro cero de verdad. Sin ella, no tendríamos ni cafés ni postres artesanos deliciosos.' },
  { img: imgEstrellaGalicia, nombre: 'Cerveza Estrella Galicia',           texto: 'Porque si la burger es gallega, la caña también. Ya tú sabes.' },
  { img: imgQuesoArzua,      nombre: 'Queso D.O. Arzúa-Ulloa',            texto: 'El cremoso gallego que enamora.' },
  { img: imgPostresXanceda,  nombre: 'Postres Casa Grande de Xanceda',     texto: 'Indiscutible que esté en la carta. Los ecológicos. Lo mejor para tus niños, sin pensarlo dos veces.' },
]

const U_PATH = "M184.52,0c.22,18.08-11.8,18.68-25.3,18.42-1.75-.05-8.68-.05-12.4-.05-1.58-.12-2.9-.17-3.96-.17-2.13,0-5.32.22-9.57.67-1.89.22-3.67,2.13-5.32,5.68-.48.89-.72,2.47-.72,4.68v76.01l-.36,84.36c0,6.02-1.82,11.27-5.49,15.73s-9.28,7.27-16.83,8.37c-1.41.22-3.55.34-6.38.34-8.51,0-15.49-2.35-20.91-7.03-5.44-4.68-8.03-11.27-7.79-19.76V31.27c0-.46.05-1.01.17-1.68s.05-1.44-.17-2.35c-.24-3.12-1.06-5.35-2.49-6.69-1.41-1.34-3.79-2.01-7.1-2.01-1.17-.22-3.07-.34-5.66-.34-1.73,0-3.09.07-4.29.17-3.45,0-11.27,0-13.14.05-13.48.26-25.51-.34-25.3-18.42C-.91,8.25-1.75,18.1,1.87,28.06c4.46,12.28,14.51,19.42,28.37,20.17,1.8.1,4.96.17,8.34.22l-.29,73.21c0,15.85.24,39.4.72,70.64,0,16.74,7.22,30.02,21.63,39.85,9.93,7.15,22.68,10.72,38.29,10.72,4.48,0,7.91-.12,10.29-.34,8.51-.67,16.5-3.45,23.93-8.37,7.43-4.92,13.4-11.15,17.91-18.75,4.48-7.58,6.74-15.61,6.74-24.1V48.44c3.29-.05,6.33-.12,8.06-.22,13.86-.74,23.88-7.89,28.37-20.17C197.85,18.1,197.01,8.25,184.59,0h-.07Z"

export default function Nosotros() {
  const gridRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { grid.classList.add(styles.gridVisible); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <Seo
        title="Nuestro Origen"
        description="Conoce el origen de La Urbana: producto gallego de km 0, de la Ganadería Quintián al queso D.O. San Simón da Costa. Las cosas buenas empiezan aquí."
        path="/nosotros"
      />
      <section className={styles.hero}>
        <img src={imgHero} alt="" className={styles.heroBg} />
        <div className={styles.heroContent}>
          <h1 className={styles.textBlock}>
            <span className={styles.linePopfine}>Las cosas</span>
            <span className={styles.lineBlenny}>Buenas</span>
            <span className={styles.linePopfine}>empiezan en el</span>
            <span className={styles.lineBlenny}>Origen</span>
          </h1>
        </div>
      </section>

      <section className={styles.fondoUs}>
        {/* Patrón estático de fondo */}
        <svg className={styles.fondoUsPattern} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="u-shape" d={U_PATH}/>
            <pattern id="u-pattern" x="-40" y="-50" width="122" height="154" patternUnits="userSpaceOnUse">
              <use href="#u-shape" transform="translate(1,2) scale(0.3)" fill="#171715"/>
              <use href="#u-shape" transform="translate(121,75) rotate(180) scale(0.3)" fill="#171715"/>
              <use href="#u-shape" transform="translate(62,79) scale(0.3)" fill="#171715"/>
              <use href="#u-shape" transform="translate(60,152) rotate(180) scale(0.3)" fill="#171715"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#u-pattern)"/>
        </svg>

        {/* Us que pulsan de intensidad */}
        <svg className={styles.fondoUsPulse} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs><path id="u-pulse" d={U_PATH}/></defs>
          <g className={styles.f1}><use href="#u-pulse" transform="translate(83,106) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f2}><use href="#u-pulse" transform="translate(388,337) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f3}><use href="#u-pulse" transform="translate(691,179) rotate(180) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f4}><use href="#u-pulse" transform="translate(876,337) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f5}><use href="#u-pulse" transform="translate(1179,179) rotate(180) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f6}><use href="#u-pulse" transform="translate(508,718) rotate(180) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f7}><use href="#u-pulse" transform="translate(1181,414) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f8}><use href="#u-pulse" transform="translate(815,260) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f9}><use href="#u-pulse" transform="translate(998,183) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f10}><use href="#u-pulse" transform="translate(813,333) rotate(180) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f11}><use href="#u-pulse" transform="translate(1059,414) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f12}><use href="#u-pulse" transform="translate(874,256) rotate(180) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f13}><use href="#u-pulse" transform="translate(1242,183) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f14}><use href="#u-pulse" transform="translate(327,414) scale(0.3)" fill="#171715"/></g>
          <g className={styles.f15}><use href="#u-pulse" transform="translate(754,337) scale(0.3)" fill="#171715"/></g>
        </svg>

        {/* Grid de productos */}
        <div className={styles.productosGrid} ref={gridRef}>
          {PRODUCTOS.map((p, i) => (
            <article key={i} className={styles.productoCard} style={{ '--i': i }}>
              <div className={styles.productoInfo}>
                <h3 className={styles.productoNombre}>{p.nombre}</h3>
                <p className={styles.productoTexto}>{p.texto}</p>
              </div>
              <img src={p.img} alt={p.nombre} className={styles.productoImg} />
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
