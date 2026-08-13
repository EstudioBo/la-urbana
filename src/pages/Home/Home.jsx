import { useRef, useEffect, useState } from 'react'
import styles from './Home.module.css'
import Seo from '../../components/Seo/Seo'
import LocalBusinessJsonLd from '../../components/Seo/LocalBusinessJsonLd'
import HeroSlider from './sections/HeroSlider'
import pegatinaU from '../../assets/images/decorativos/pegatina-u.webp'
import celoUrbana from '../../assets/images/celo-la-urbana.webp'
import logoNegro from '../../assets/images/logos/logo-laurbana-negro.webp'
import SeccionOrigen from './sections/SeccionOrigen'
import SeccionEsencia from './sections/SeccionEsencia'
import SeccionTeam from './sections/SeccionTeam'
import SeccionViral from './sections/SeccionViral'
import SeccionCarta from './sections/SeccionCarta'
import SeccionRestaurantesSecretos from './sections/SeccionRestaurantesSecretos'
import SeccionDonde from './sections/SeccionDonde'
import SeccionDirecciones from './sections/SeccionDirecciones'
import Footer from './sections/Footer'

const LOGOS = Array.from({ length: 12 })

function MarqueeDivider({ reverse = false, sticky = false }) {
  return (
    <div className={`${styles.marqueeDivider} ${sticky ? styles.marqueeSticky : ''}`}>
      <div className={styles.marqueeTrack}>
        <div className={`${styles.marqueeInner} ${reverse ? styles.marqueeReverse : ''}`}>
          {[...LOGOS, ...LOGOS].map((_, i) => (
            <img key={i} src={logoNegro} alt="" className={styles.marqueeLogo} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const stickerRef = useRef(null)
  const [stamped, setStamped] = useState(false)
  const sticker2Ref = useRef(null)
  const [stamped2, setStamped2] = useState(false)

  useEffect(() => {
    const el = stickerRef.current
    if (!el) return
    let triggered = false
    const checkScroll = () => {
      if (triggered || window.scrollY < 80) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.85) {
        triggered = true
        window.removeEventListener('scroll', checkScroll)
        setTimeout(() => setStamped(true), 400)
      }
    }
    window.addEventListener('scroll', checkScroll, { passive: true })
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  useEffect(() => {
    const el = sticker2Ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStamped2(true); observer.disconnect() } },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <main className={styles.home}>
      <Seo
        title="La Urbana Burger Bar | Hamburguesería en Lugo, Vigo y Santiago"
        titleIsFull
        description="Hamburguesas artesanas con producto gallego de km 0 en Lugo, Vigo y Santiago de Compostela. Descubre la carta, reserva mesa o pide a domicilio."
        path="/"
      />
      <LocalBusinessJsonLd />
      <HeroSlider />
      <img
        ref={stickerRef}
        src={pegatinaU}
        alt=""
        className={`${styles.stickerU} ${stamped ? styles.stickerStamped : ''}`}
      />
      <SeccionOrigen />
      <div className={styles.celoDivider} ref={el => {
        if (!el) return
        const obs = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            el.querySelector('img').classList.add(styles.celoStuck)
            obs.disconnect()
          }
        }, { threshold: 0.3 })
        obs.observe(el)
      }}>
        <img src={celoUrbana} alt="" className={styles.celo} />
      </div>
      <SeccionEsencia />
      <SeccionTeam />
      <div className={styles.viralStickyWrap}>
        <MarqueeDivider sticky />
        <SeccionViral />
      </div>
      <MarqueeDivider reverse />
      <SeccionCarta />
      <div className={styles.secretosStickyWrap}>
        <SeccionRestaurantesSecretos />
        <SeccionDonde />
      </div>
      <div ref={sticker2Ref} className={styles.stickerDivider}>
        <img
          src={pegatinaU}
          alt=""
          className={`${styles.stickerU} ${stamped2 ? styles.stickerStamped : ''}`}
        />
      </div>
      <SeccionDirecciones />
      <Footer />
    </main>
  )
}
