import { useRef, useEffect, useState } from 'react'
import styles from './Home.module.css'
import HeroSlider from './sections/HeroSlider'
import pegatinaU from '../../assets/images/pegatina-u.png'
import celoUrbana from '../../assets/images/celo-urbana.webp'
import logoNegro from '../../assets/images/logo-laurbana-negro.webp'
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

function MarqueeDivider({ reverse = false }) {
  return (
    <div className={styles.marqueeDivider}>
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
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setStamped(true), 400); observer.disconnect() } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
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
      <HeroSlider />
      <img
        ref={stickerRef}
        src={pegatinaU}
        alt=""
        className={`${styles.stickerU} ${stamped ? styles.stickerStamped : ''}`}
      />
      <SeccionOrigen />
      <div className={styles.celoDivider}>
        <img src={celoUrbana} alt="" className={styles.celo} />
      </div>
      <SeccionEsencia />
      <SeccionTeam />
      <MarqueeDivider />
      <SeccionViral />
      <MarqueeDivider reverse />
      <SeccionCarta />
      <SeccionRestaurantesSecretos />
      <SeccionDonde />
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
