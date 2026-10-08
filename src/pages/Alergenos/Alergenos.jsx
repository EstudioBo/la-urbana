import { useTranslation } from 'react-i18next'
import styles from './Alergenos.module.css'
import { tx, useIdioma } from '../../i18n/idioma'
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
  const { t } = useTranslation()
  const idioma = useIdioma()
  const tipo = plato.contiene.includes(id) ? 'contiene' : plato.trazas.includes(id) ? 'traza' : null
  if (!tipo) return <td className={styles.vacia} />
  const alergeno = tx(ALERGENOS[id].label, idioma)
  return (
    <td className={styles[tipo]}>
      <img loading="lazy" src={ICONOS[id]} alt="" className={styles.iconoCelda} />
      <span className={styles.marca} aria-hidden="true" />
      <span className={styles.oculto}>{t(tipo === 'contiene' ? 'alergenos.contieneX' : 'alergenos.trazasX', { alergeno })}</span>
    </td>
  )
}

export default function Alergenos() {
  const { t } = useTranslation()
  const idioma = useIdioma()

  return (
    <div>
      <Seo
        title={t('alergenos.seo.titulo')}
        description={t('alergenos.seo.descripcion')}
        path="/alergenos"
      />
      <MigasJsonLd migas={[{ nombre: t('footer.alergenos'), path: '/alergenos' }]} />
      <main className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('alergenos.titulo')}</h1>
          <span className={styles.label}>La Urbana</span>
        </div>

        <div className={styles.panel}>
          <p className={styles.aviso}>{t('alergenos.aviso')}</p>

          <div className={styles.claves}>
            <span className={styles.clave}><span className={`${styles.marca} ${styles.contiene}`} aria-hidden="true" /> {t('carta.contiene')}</span>
            <span className={styles.clave}><span className={`${styles.marca} ${styles.traza}`} aria-hidden="true" /> {t('carta.trazas')}</span>
          </div>

          <ul className={styles.leyenda}>
            {IDS.map(id => (
              <li key={id}>
                <img loading="lazy" src={ICONOS[id]} alt="" className={styles.iconoLeyenda} />
                {tx(ALERGENOS[id].label, idioma)}
              </li>
            ))}
          </ul>

          {SECCIONES.map(seccion => (
            <section key={tx(seccion.titulo, 'es')} className={styles.seccion}>
              <h2 className={styles.seccionTitulo}>
                {tx(seccion.titulo, idioma)}
                {seccion.nota && <span className={styles.seccionNota}>{tx(seccion.nota, idioma)}</span>}
              </h2>
              <table className={styles.tabla}>
                <thead>
                  <tr>
                    <th scope="col"><span className={styles.oculto}>{t('alergenos.plato')}</span></th>
                    {IDS.map(id => (
                      <th key={id} scope="col">
                        <img loading="lazy" src={ICONOS[id]} alt={tx(ALERGENOS[id].label, idioma)} title={tx(ALERGENOS[id].label, idioma)} className={styles.iconoCabecera} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seccion.platos.map(plato => (
                    <tr key={tx(plato.nombre, 'es')}>
                      <th scope="row" className={styles.plato}>{tx(plato.nombre, idioma)}</th>
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
