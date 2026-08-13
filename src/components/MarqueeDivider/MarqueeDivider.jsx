import styles from './MarqueeDivider.module.css'
import logoNegro from '../../assets/images/logos/logo-laurbana-negro.webp'

const LOGOS = Array.from({ length: 12 })

export default function MarqueeDivider({ reverse = false }) {
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
