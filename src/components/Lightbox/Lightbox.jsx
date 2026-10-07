import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Lightbox.module.css'
import arrowLeft from '../../assets/images/iconos/arrow-left.svg'
import arrowRight from '../../assets/images/iconos/arrow-right.svg'

// Visor de fotos a pantalla completa. Usa <dialog> nativo: atrapa el foco y se cierra con Esc
export default function Lightbox({ fotos, indice, onCambiar, onCerrar }) {
  const { t } = useTranslation()
  const dialogRef = useRef(null)
  const abierto = indice !== null
  const total = fotos.length

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined
    if (abierto && !dialog.open) dialog.showModal()
    if (!abierto && dialog.open) dialog.close()
    if (!abierto) return undefined

    const html = document.documentElement
    const overflowPrevio = html.style.overflow
    html.style.overflow = 'hidden'
    return () => { html.style.overflow = overflowPrevio }
  }, [abierto])

  const anterior = () => onCambiar((indice + total - 1) % total)
  const siguiente = () => onCambiar((indice + 1) % total)

  const teclas = (e) => {
    if (e.key === 'ArrowLeft') anterior()
    if (e.key === 'ArrowRight') siguiente()
  }

  const foto = abierto ? fotos[indice] : null

  return (
    <dialog
      ref={dialogRef}
      className={styles.lightbox}
      aria-label={t('a11y.galeria')}
      onClose={onCerrar}
      onKeyDown={teclas}
      onClick={(e) => { if (e.target === e.currentTarget) onCerrar() }}
    >
      {foto && (
        <>
          <img src={foto.img} alt={foto.alt} className={styles.img} />
          <p className={styles.contador} aria-live="polite">{indice + 1} / {total}</p>
          <button type="button" className={styles.cerrar} onClick={onCerrar} aria-label={t('a11y.cerrar')}>×</button>
          {total > 1 && (
            <>
              <button type="button" className={`${styles.flecha} ${styles.anterior}`} onClick={anterior} aria-label={t('a11y.anterior')}>
                <img src={arrowLeft} alt="" />
              </button>
              <button type="button" className={`${styles.flecha} ${styles.siguiente}`} onClick={siguiente} aria-label={t('a11y.siguiente')}>
                <img src={arrowRight} alt="" />
              </button>
            </>
          )}
        </>
      )}
    </dialog>
  )
}
