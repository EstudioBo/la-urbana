import styles from './SeccionDirecciones.module.css'

const RESTAURANTES = [
  {
    nombre: 'Bispo Aguirre',
    direccion: 'Rúa Bispo Aguirre, 34, Lugo',
    tel: '982 145 502',
    horarioLocal: [
      'Lun - Sáb: 9:30h - 00:00h',
      'Dom: 10:00h a 00:00h',
    ],
    horarioCocina: [
      'Mediodía: 13:00h - 16:15h',
      'Cena: 20:00h - 23:30h',
    ],
  },
  {
    nombre: 'Praza de Augas Férreas',
    direccion: 'Rúa Cánovas del Castillo, 2, Lugo',
    tel: '982 808 425',
    horarioLocal: [
      'Lun - Jue: 9:30h - 00:00h',
      'Vie - Sáb y Vísperas festivo: 9:30h - 00:00h',
      'Dom: 10:00h a 00:00h',
    ],
    horarioCocina: [
      'Mediodía: 13:00h - 16:15h',
      'Cena: 20:00h - 23:30h',
    ],
  },
  {
    nombre: 'C.C. As Termas',
    direccion: 'Av. Infanta Elena, 213, Lugo',
    tel: '982 812 895',
    horarioLocal: [
      'Lun - Jue: 9:30h - 00:00h',
      'Vie - Sáb: 9:30h - 00:00h',
      'Dom: 12:30h - 23:30h',
    ],
    horarioCocina: [
      'Mediodía: 12:30h - 17:00h',
      'Dom - Jue Cena: 19:30h - 23:00h',
      'Vie - Sáb Cena: 19:30h - 23:30h',
    ],
  },
  {
    nombre: 'Vigo',
    direccion: 'Rúa Rosalía de Castro, 48, Vigo',
    tel: '986 59 56 89',
    horarioLocal: [
      'Mediodía: 13:30h - 16:30h',
      'Dom - Jue Cena: 20:30h - 00:00h',
      'Vie - Sáb Cena: 20:00h - 00:30h',
    ],
    horarioCocina: [
      'Mediodía: 13:30h - 16:00h',
      'Dom - Jue Cena: 20:30h - 23:30h',
      'Vie - Sáb Cena: 20:00h - 00:00h',
    ],
  },
  {
    nombre: 'Santiago de Compostela',
    direccion: 'Av. do Camiño Francés, 3, Santiago de Compostela',
    tel: '881 93 99 12',
    horarioLocal: [
      'Dom - Jue: 13:00h - 23:00h',
      'Vie - Sáb: 13:00h - 23:30h',
    ],
    horarioCocina: [
      'Dom - Jue: 13:00h - 23:00h',
      'Vie - Sáb: 13:00h - 23:30h',
    ],
  },
]

export default function SeccionDirecciones() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {RESTAURANTES.map((r) => (
          <div key={r.nombre} className={styles.restaurante}>
            <strong className={styles.nombre}>{r.nombre}</strong>
            <span className={styles.direccion}>{r.direccion}</span>
            {r.tel && <span className={styles.tel}>T. {r.tel}</span>}
            <span className={styles.bloque}>Horario local</span>
            {r.horarioLocal.map((h, i) => <span key={i} className={styles.linea}>{h}</span>)}
            <span className={styles.bloque}>Horario cocina</span>
            {r.horarioCocina.map((h, i) => <span key={i} className={styles.linea}>{h}</span>)}
          </div>
        ))}
      </div>
    </section>
  )
}
