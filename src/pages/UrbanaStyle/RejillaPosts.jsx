import { useRef, useState, useEffect } from 'react'
import styles from './RejillaPosts.module.css'
import TarjetaPost from './TarjetaPost'

function useVisible(threshold) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}

// Tarjetas de entradas en rejilla, con entrada escalonada al llegar a ellas
export default function RejillaPosts({ posts }) {
  const [gridRef, gridVisible] = useVisible(0.1)

  return (
    <div className={`${styles.grid} ${gridVisible ? styles.gridVisible : ''}`} ref={gridRef}>
      {posts.map((p, i) => (
        <TarjetaPost key={p.slug} post={p} className={styles.card} style={{ '--i': i }} />
      ))}
    </div>
  )
}
