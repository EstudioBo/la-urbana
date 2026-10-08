import styles from './Alergenos.module.css'
import Seo from '../../components/Seo/Seo'
import MigasJsonLd from '../../components/Seo/MigasJsonLd'
import Footer from '../Home/sections/Footer'
import { ALERGENOS } from '../Carta/cartaData'
import { SECCIONES } from './tablaAlergenos'
import imgGluten from '../../assets/images/alergenos/gluten.webp'
import imgCrustaceos from '../../assets/images/alergenos/crustaceos.webp'
import imgHuevos from '../../assets/images/alergenos/huevos.webp'
import imgPescado from '../../assets/images/alergenos/pescado.webp'
import imgCacahuetes from '../../assets/images/alergenos/cacahuetes.webp'
import imgSoja from '../../assets/images/alergenos/soja.webp'
import imgLeche from '../../assets/images/alergenos/leche.webp'
import imgFrutosSecos from '../../assets/images/alergenos/frutos-secos.webp'
import imgApio from '../../assets/images/alergenos/apio.webp'
import imgMostaza from '../../assets/images/alergenos/mostaza.webp'
import imgSesamo from '../../assets/images/alergenos/sesamo.webp'
import imgSulfitos from '../../assets/images/alergenos/sulfitos.webp'
import imgAltramuces from '../../assets/images/alergenos/altramuces.webp'
import imgMoluscos from '../../assets/images/alergenos/moluscos.webp'

const ICONOS = {
  gluten: imgGluten, crustaceos: imgCrustaceos, huevos: imgHuevos, pescado: imgPescado, cacahuetes: imgCacahuetes,
  soja: imgSoja, leche: imgLeche, frutosSecos: imgFrutosSecos, apio: imgApio, mostaza: imgMostaza, sesamo: imgSesamo,
  sulfitos: imgSulfitos, altramuces: imgAltramuces, moluscos: imgMoluscos,
}
const IDS = Object.keys(ALERGENOS)

function Celda({ id, plato }) {
  const tipo = plato.contiene.includes(id) ? 'contiene' : plato.trazas.includes(id) ? 'traza' : null
  if (!tipo) return <td className={styles.vacia} />
  const label = ALERGENOS[id].label
  return (
    <td className={styles[tipo]}>
      <img loading="lazy" src={ICONOS[id]} alt="" className={styles.iconoCelda} />
      <span className={styles.marca} aria-hidden="true" />
      <span className={styles.oculto}>{tipo === 'contiene' ? `Contiene ${label}` : `Puede contener trazas de ${label}`}</span>
    </td>
  )
}

export default function Alergenos() {
  return (
    <div>
      <Seo
        title="Tabla de alérgenos"
        description="Tabla de alérgenos de La Urbana Burger Bar: burgers, entrantes, ensaladas, postres y menú infantil. Consulta los alérgenos de cada plato antes de pedir."
        path="/alergenos"
      />
      <MigasJsonLd migas={[{ nombre: 'Alérgenos', path: '/alergenos' }]} />
      <main className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Alérgenos</h1>
          <span className={styles.label}>La Urbana</span>
        </div>

        <div className={styles.panel}>
          <p className={styles.aviso}>Informa a nuestro equipo de cualquier tipo de intolerancia para mayor seguridad.</p>

          <div className={styles.claves}>
            <span className={styles.clave}><span className={`${styles.marca} ${styles.contiene}`} aria-hidden="true" /> Contiene</span>
            <span className={styles.clave}><span className={`${styles.marca} ${styles.traza}`} aria-hidden="true" /> Puede contener trazas</span>
          </div>

          <ul className={styles.leyenda}>
            {IDS.map(id => (
              <li key={id}>
                <img loading="lazy" src={ICONOS[id]} alt="" className={styles.iconoLeyenda} />
                {ALERGENOS[id].label}
              </li>
            ))}
          </ul>

          {SECCIONES.map(seccion => (
            <section key={seccion.titulo} className={styles.seccion}>
              <h2 className={styles.seccionTitulo}>
                {seccion.titulo}
                {seccion.nota && <span className={styles.seccionNota}>{seccion.nota}</span>}
              </h2>
              <table className={styles.tabla}>
                <thead>
                  <tr>
                    <th scope="col"><span className={styles.oculto}>Plato</span></th>
                    {IDS.map(id => (
                      <th key={id} scope="col">
                        <img loading="lazy" src={ICONOS[id]} alt={ALERGENOS[id].label} title={ALERGENOS[id].label} className={styles.iconoCabecera} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seccion.platos.map(plato => (
                    <tr key={plato.nombre}>
                      <th scope="row" className={styles.plato}>{plato.nombre}</th>
                      {IDS.map(id => <Celda key={id} id={id} plato={plato} />)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}        </div>
      </main>
      <Footer />
    </div>
  )
}
