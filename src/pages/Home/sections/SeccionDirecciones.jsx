import { useTranslation } from 'react-i18next'
import styles from './SeccionDirecciones.module.css'
import { tx, useIdioma } from '../../../i18n/idioma'

const RESTAURANTES = [
  {
    nombre: 'Bispo Aguirre',
    direccion: 'Rúa Bispo Aguirre, 34, Lugo',
    tel: '982 145 502',
    horarioLocal: [
      { es: 'Lun - Sáb: 9:30h - 00:00h', en: 'Mon – Sat: 9:30 – 00:00' },
      { es: 'Dom: 10:00h a 00:00h', en: 'Sun: 10:00 – 00:00' },
    ],
    horarioCocina: [
      { es: 'Mediodía: 13:00h - 16:15h', en: 'Lunch: 13:00 – 16:15' },
      { es: 'Cena: 20:00h - 23:30h', en: 'Dinner: 20:00 – 23:30' },
    ],
  },
  {
    nombre: 'Praza de Augas Férreas',
    direccion: 'Rúa Cánovas del Castillo, 2, Lugo',
    tel: '982 808 425',
    horarioLocal: [
      { es: 'Lun - Jue: 9:30h - 00:00h', en: 'Mon – Thu: 9:30 – 00:00' },
      { es: 'Vie - Sáb y Vísperas festivo: 9:30h - 00:00h', en: 'Fri – Sat and eves of public holidays: 9:30 – 00:00' },
      { es: 'Dom: 10:00h a 00:00h', en: 'Sun: 10:00 – 00:00' },
    ],
    horarioCocina: [
      { es: 'Mediodía: 13:00h - 16:15h', en: 'Lunch: 13:00 – 16:15' },
      { es: 'Cena: 20:00h - 23:30h', en: 'Dinner: 20:00 – 23:30' },
    ],
  },
  {
    nombre: { es: 'C.C. As Termas', en: 'As Termas Shopping Centre' },
    direccion: 'Av. Infanta Elena, 213, Lugo',
    tel: '982 812 895',
    horarioLocal: [
      { es: 'Lun - Jue: 9:30h - 00:00h', en: 'Mon – Thu: 9:30 – 00:00' },
      { es: 'Vie - Sáb: 9:30h - 00:00h', en: 'Fri – Sat: 9:30 – 00:00' },
      { es: 'Dom: 12:30h - 23:30h', en: 'Sun: 12:30 – 23:30' },
    ],
    horarioCocina: [
      { es: 'Mediodía: 12:30h - 17:00h', en: 'Lunch: 12:30 – 17:00' },
      { es: 'Dom - Jue Cena: 19:30h - 23:00h', en: 'Dinner Sun – Thu: 19:30 – 23:00' },
      { es: 'Vie - Sáb Cena: 19:30h - 23:30h', en: 'Dinner Fri – Sat: 19:30 – 23:30' },
    ],
  },
  {
    nombre: 'Vigo',
    direccion: 'Rúa Rosalía de Castro, 48, Vigo',
    tel: '986 59 56 89',
    horarioLocal: [
      { es: 'Mediodía: 13:30h - 16:30h', en: 'Lunch: 13:30 – 16:30' },
      { es: 'Dom - Jue Cena: 20:30h - 00:00h', en: 'Dinner Sun – Thu: 20:30 – 00:00' },
      { es: 'Vie - Sáb Cena: 20:00h - 00:30h', en: 'Dinner Fri – Sat: 20:00 – 00:30' },
    ],
    horarioCocina: [
      { es: 'Mediodía: 13:30h - 16:00h', en: 'Lunch: 13:30 – 16:00' },
      { es: 'Dom - Jue Cena: 20:30h - 23:30h', en: 'Dinner Sun – Thu: 20:30 – 23:30' },
      { es: 'Vie - Sáb Cena: 20:00h - 00:00h', en: 'Dinner Fri – Sat: 20:00 – 00:00' },
    ],
  },
  {
    nombre: 'Santiago de Compostela',
    direccion: 'Av. do Camiño Francés, 3, Santiago de Compostela',
    tel: '881 93 99 12',
    horarioLocal: [
      { es: 'Dom - Jue: 13:00h - 23:00h', en: 'Sun – Thu: 13:00 – 23:00' },
      { es: 'Vie - Sáb: 13:00h - 23:30h', en: 'Fri – Sat: 13:00 – 23:30' },
    ],
    horarioCocina: [
      { es: 'Dom - Jue: 13:00h - 23:00h', en: 'Sun – Thu: 13:00 – 23:00' },
      { es: 'Vie - Sáb: 13:00h - 23:30h', en: 'Fri – Sat: 13:00 – 23:30' },
    ],
  },
]

export default function SeccionDirecciones() {
  const { t } = useTranslation()
  const idioma = useIdioma()

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {RESTAURANTES.map((r) => (
          <div key={r.direccion} className={styles.restaurante}>
            <strong className={styles.nombre}>{tx(r.nombre, idioma)}</strong>
            <span className={styles.direccion}>{r.direccion}</span>
            {r.tel && <span className={styles.tel}>T. {r.tel}</span>}
            <span className={styles.bloque}>{t('home.direcciones.horarioLocal')}</span>
            {r.horarioLocal.map((h, i) => <span key={i} className={styles.linea}>{tx(h, idioma)}</span>)}
            <span className={styles.bloque}>{t('home.direcciones.horarioCocina')}</span>
            {r.horarioCocina.map((h, i) => <span key={i} className={styles.linea}>{tx(h, idioma)}</span>)}
          </div>
        ))}
      </div>
    </section>
  )
}
