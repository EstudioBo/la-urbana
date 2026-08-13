import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './SeccionViral.module.css'
import hamburguesaViral from '../../../assets/images/home/hamburguesa-viral.webp'

const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
  </svg>
)

const IconStar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function SeccionViral() {
  const { t } = useTranslation()

  const hoverIntervals = useRef({})

  const spawnStar = (rect) => {
    const el = document.createElement('span')
    const size = Math.random() * 8 + 5
    const x = rect.left + Math.random() * rect.width
    const y = rect.top + Math.random() * rect.height
    const driftX = (Math.random() - 0.5) * 40
    const colors = ['#FFCD00', '#fff', '#ffe066', '#c8f7c5']
    const color = colors[Math.floor(Math.random() * colors.length)]
    el.textContent = '✦'
    Object.assign(el.style, {
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      fontSize: `${size}px`,
      color,
      pointerEvents: 'none',
      zIndex: 9999,
      opacity: '1',
      transition: 'transform 1.2s ease-out, opacity 1.2s ease-out',
      transform: 'translate(-50%, -50%)',
      userSelect: 'none',
    })
    document.body.appendChild(el)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const driftY = (Math.random() - 0.5) * 80
      el.style.transform = `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) rotate(${Math.random() * 360}deg)`
      el.style.opacity = '0'
    }))
    setTimeout(() => el.remove(), 1300)
  }

  const startSparkles = (e) => {
    const key = e.currentTarget.href
    const rect = e.currentTarget.getBoundingClientRect()
    hoverIntervals.current[key] = setInterval(() => spawnStar(rect), 80)
  }

  const stopSparkles = (e) => {
    const key = e.currentTarget.href
    clearInterval(hoverIntervals.current[key])
  }

  const fbRef = useRef(null)
  const igRef = useRef(null)
  const rsRef = useRef(null)

  useEffect(() => {
    let raf
    const start = performance.now()
    const animate = (now) => {
      const s = (now - start) / 1000
      if (fbRef.current) fbRef.current.style.transform = `translate(${Math.sin(s * 0.7) * 5}px, ${Math.cos(s * 0.5) * 7}px)`
      if (igRef.current) igRef.current.style.transform = `translate(${Math.cos(s * 0.6 + 1) * 5}px, ${Math.sin(s * 0.8 + 2) * 7}px)`
      if (rsRef.current) rsRef.current.style.transform = `translate(${Math.sin(s * 0.9 + 3) * 5}px, ${Math.cos(s * 0.6 + 1) * 7}px)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.textCol}>
        <div className={styles.textBlock}>
          <a ref={fbRef} onMouseEnter={startSparkles} onMouseLeave={stopSparkles} href="https://www.facebook.com/laurbanaburger/?locale=es_ES" target="_blank" rel="noopener noreferrer" className={`${styles.floatBtn} ${styles.floatBtnFb}`}>
            facebook <IconFacebook />
          </a>
          <a ref={igRef} onMouseEnter={startSparkles} onMouseLeave={stopSparkles} href="https://www.instagram.com/laurbanaburger/?hl=es" target="_blank" rel="noopener noreferrer" className={`${styles.floatBtn} ${styles.floatBtnIg}`}>
            instagram <IconInstagram />
          </a>
          <a ref={rsRef} onMouseEnter={startSparkles} onMouseLeave={stopSparkles} href="https://www.google.com/search?sca_esv=dcf9c7310e527f23&sxsrf=APpeQnsIQhg4oBmCx6DcmsQri9NQrlzGoA:1784629110443&q=la+urbana+burger+&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_zCymp6Qq-qpd4PERF2GyQpEUP8eNkcbRIlrTcuLrBhJa5hDsYr-W_asbaPwMKjci-qqW_Y%3D&uds=AJ5uw1_rUfMqrtZe7QfpdFGwaPC3sLGD5__yOh-S6TylvCbRsq-5lwD3oNvZ92G2tuUrraRT-MYk_T17UiLZZQmtzmmCHwAb0bMvG7uSdSy32VHh6uzbF0M&sa=X&ved=2ahUKEwiq4bvBxeOVAxWn2wIHHSwiNh4Q3PALegQIMRAF&biw=1707&bih=879&dpr=1.13" target="_blank" rel="noopener noreferrer" className={`${styles.floatBtn} ${styles.floatBtnRs}`}>
            reseñas <IconStar />
          </a>
          <span className={styles.label}>{t('home.viral.label')}</span>
          <h2 className={styles.title}>
            {t('home.viral.title').split(' ').map((w, i) => <span key={i}>{w}<br /></span>)}
          </h2>
        </div>
      </div>
      <div className={styles.imageCol}>
        <img src={hamburguesaViral} alt="" className={styles.image} loading="lazy" />
      </div>
    </section>
  )
}
