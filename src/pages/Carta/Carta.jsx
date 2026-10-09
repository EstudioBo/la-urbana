import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Carta.module.css'
import Imagen from '../../components/Imagen/Imagen'
import Seo from '../../components/Seo/Seo'
import MigasJsonLd from '../../components/Seo/MigasJsonLd'
import Footer from '../Home/sections/Footer'
import { CATEGORIAS, PLATOS, ALERGENOS } from './cartaData'
import Enlace from '../../i18n/Enlace'
import { tx, useIdioma } from '../../i18n/idioma'

import imgParaEmpezar from '../../assets/images/carta/para-empezar.webp?adaptable'
import imgDeAutor     from '../../assets/images/carta/de-autor.webp?adaptable'
import imgGalicia     from '../../assets/images/carta/artesanas.webp?adaptable'
import imgEntrepanes  from '../../assets/images/carta/entrepanes.webp?adaptable'
import imgEnsalada    from '../../assets/images/carta/ensalada.webp?adaptable'
import imgPostres     from '../../assets/images/carta/postres.webp?adaptable'
import iconBurger          from '../../assets/images/iconos/icon-burgermenu.svg'

import imgGaliciaBritish      from '../../assets/images/carta/galicia/urbana-british.webp?adaptable'
import imgGaliciaCampera      from '../../assets/images/carta/galicia/urbana-campera.webp?adaptable'
import imgGaliciaClasica      from '../../assets/images/carta/galicia/urbana-clasica.webp?adaptable'
import imgGaliciaCorralita    from '../../assets/images/carta/galicia/urbana-corralita.webp?adaptable'
import imgGaliciaCuartoLibra  from '../../assets/images/carta/galicia/urbana-cuarto-de-libra.webp?adaptable'
import imgGaliciaJalapenha    from '../../assets/images/carta/galicia/urbana-jalapenha.webp?adaptable'
import imgGaliciaMexicana     from '../../assets/images/carta/galicia/urbana-mexicana.webp?adaptable'
import imgGaliciaPiamonte     from '../../assets/images/carta/galicia/urbana-piamonte.webp?adaptable'
import imgGaliciaReal         from '../../assets/images/carta/galicia/urbana-real.webp?adaptable'

import imgAutorFina         from '../../assets/images/carta/autor/urbana-fina.webp?adaptable'
import imgAutorAntolloGalego from '../../assets/images/carta/autor/urbana-antollo-galego.webp?adaptable'
import imgAutorCorea        from '../../assets/images/carta/autor/urbana-corea.webp?adaptable'

import imgVeggiesRose from '../../assets/images/carta/veggies/urbana-rose.webp?adaptable'

import imgEntrepanesDechipis  from '../../assets/images/carta/entrepanes/dechipis.webp?adaptable'
import imgEntrepanesRusticWay from '../../assets/images/carta/entrepanes/rustic-way.webp?adaptable'

import imgEnsaladaCesar       from '../../assets/images/carta/ensaladas/ensalada-cesar.webp?adaptable'
import imgEnsaladaCebreiro    from '../../assets/images/carta/ensaladas/ensalada-cebreiro-mood.webp?adaptable'
import imgEnsaladaKataifi     from '../../assets/images/carta/ensaladas/kataifi-y-guacamole.webp?adaptable'

import imgEmpezarChipirones   from '../../assets/images/carta/empezar/chipirones.webp?adaptable'
import imgEmpezarLangostinos  from '../../assets/images/carta/empezar/langostinos-kataifi.webp?adaptable'
import imgEmpezarCamperitos   from '../../assets/images/carta/empezar/camperitos-pollo.webp?adaptable'
import imgEmpezarAros         from '../../assets/images/carta/empezar/aros-de-cebolla.webp?adaptable'
import imgEmpezarCroquetasJamon    from '../../assets/images/carta/empezar/croquetas-jamon.webp?adaptable'
import imgEmpezarCroquetasChipis   from '../../assets/images/carta/empezar/croquetas-chipis.webp?adaptable'
import imgEmpezarComboCroquetas    from '../../assets/images/carta/empezar/combi-croquetas.webp?adaptable'
import imgEmpezarAlitas       from '../../assets/images/carta/empezar/alitas.webp?adaptable'

import imgPostresCremosaQueso     from '../../assets/images/carta/postres/cremosa-de-queso.webp?adaptable'
import imgPostresMuerteChocolate  from '../../assets/images/carta/postres/muerte-por-chocolate.webp?adaptable'
import imgPostresCarrot           from '../../assets/images/carta/postres/carrot-especial.webp?adaptable'
import imgPostresCaprichoChocolate from '../../assets/images/carta/postres/capricho-de-chocolate.webp?adaptable'
import imgPostresTresChocolates   from '../../assets/images/carta/postres/tres-chocolates.webp?adaptable'
import imgPostresHeladoArtesano   from '../../assets/images/carta/postres/helado-artesano.webp?adaptable'
import imgPostresBlueberryCheese  from '../../assets/images/carta/postres/blueberry-and-cheese.webp?adaptable'

import imgAlergenoGluten      from '../../assets/images/alergenos/gluten.webp'
import imgAlergenovPescado    from '../../assets/images/alergenos/pescado.webp'
import imgAlergenoAltramuces  from '../../assets/images/alergenos/altramuces.webp'
import imgAlergenoLeche       from '../../assets/images/alergenos/leche.webp'
import imgAlergenoApio        from '../../assets/images/alergenos/apio.webp'
import imgAlergenovCacahuetes from '../../assets/images/alergenos/cacahuetes.webp'
import imgAlergenoHuevos      from '../../assets/images/alergenos/huevos.webp'
import imgAlergenoFrutosSecos from '../../assets/images/alergenos/frutos-secos.webp'
import imgAlergenoSesamo      from '../../assets/images/alergenos/sesamo.webp'
import imgAlergenovCrustaceos from '../../assets/images/alergenos/crustaceos.webp'
import imgAlergenoSoja        from '../../assets/images/alergenos/soja.webp'
import imgAlergenoMostaza     from '../../assets/images/alergenos/mostaza.webp'
import imgAlergenoMoluscos    from '../../assets/images/alergenos/moluscos.webp'
import imgAlergenoSulfitos    from '../../assets/images/alergenos/sulfitos.webp'

const ALERGENO_IMGS = {
  gluten:      imgAlergenoGluten,
  pescado:     imgAlergenovPescado,
  altramuces:  imgAlergenoAltramuces,
  leche:       imgAlergenoLeche,
  apio:        imgAlergenoApio,
  cacahuetes:  imgAlergenovCacahuetes,
  huevos:      imgAlergenoHuevos,
  frutosSecos: imgAlergenoFrutosSecos,
  sesamo:      imgAlergenoSesamo,
  crustaceos:  imgAlergenovCrustaceos,
  soja:        imgAlergenoSoja,
  mostaza:     imgAlergenoMostaza,
  moluscos:    imgAlergenoMoluscos,
  sulfitos:    imgAlergenoSulfitos,
}

const GALICIA_IMGS = {
  'Urbana British':          imgGaliciaBritish,
  'Urbana Campera':          imgGaliciaCampera,
  'Urbana Clásica':          imgGaliciaClasica,
  'Urbana Corralita':        imgGaliciaCorralita,
  'Urbana Cuarto de Libra':  imgGaliciaCuartoLibra,
  'Urbana Jalapeña':         imgGaliciaJalapenha,
  'Urbana Mejicana':         imgGaliciaMexicana,
  'Urbana Piamonte':         imgGaliciaPiamonte,
  'Urbana Real':             imgGaliciaReal,
}

const AUTOR_IMGS = {
  'Urbana Fina':           imgAutorFina,
  'Urbana Antollo Galego': imgAutorAntolloGalego,
  'Urbana Corea':          imgAutorCorea,
}

const VEGGIES_IMGS = {
  'Urbana Rosé': imgVeggiesRose,
}

const ENTREPANES_IMGS = {
  'Dechipis':   imgEntrepanesDechipis,
  'Rustic Way': imgEntrepanesRusticWay,
}

const ENSALADAS_IMGS = {
  'Ensalada César':      imgEnsaladaCesar,
  'Cebreiro Mood':       imgEnsaladaCebreiro,
  'Kataifi y Guacamole': imgEnsaladaKataifi,
}

const EMPEZAR_IMGS = {
  'Chipirones de la Ría':                imgEmpezarChipirones,
  'Langostinos Kataifi':                 imgEmpezarLangostinos,
  'Camperitos de pollo de corral':       imgEmpezarCamperitos,
  'Aros de cebolla crujiente a la cerveza': imgEmpezarAros,
  'Croquetas cremosas de jamón ibérico': imgEmpezarCroquetasJamon,
  'Croquetas melosas de chipirones':     imgEmpezarCroquetasChipis,
  'Combi croquetas jamón + chipirones':  imgEmpezarComboCroquetas,
  'Alitas de pollo a la barbacoa':       imgEmpezarAlitas,
}

const POSTRES_IMGS = {
  'Cremosa de queso':        imgPostresCremosaQueso,
  'Muerte por chocolate':    imgPostresMuerteChocolate,
  'Carrot especial':         imgPostresCarrot,
  'Capricho de chocolate':   imgPostresCaprichoChocolate,
  'Tres chocolates':         imgPostresTresChocolates,
  'Helado artesano':         imgPostresHeladoArtesano,
  'Blueberry & Cheese':      imgPostresBlueberryCheese,
}
import iconDeliveryBlanco  from '../../assets/images/iconos/icon-delivery-blanco.webp'
import iconCalendarioBlanco from '../../assets/images/iconos/icon-calendario-blanco.webp'

const CAT_IMGS = {
  empezar:    imgParaEmpezar,
  autor:      imgDeAutor,
  galicia:    imgGalicia,
  // Veggies usa la portada de Artesanas hasta que haya una foto propia (dos archivos idénticos rompen el build)
  veggies:    imgGalicia,
  entrepanes: imgEntrepanes,
  ensaladas:  imgEnsalada,
  postres:    imgPostres,
}

const CAT_ROT_ALT = new Set(['autor', 'veggies', 'ensaladas'])

function spawnDust(el) {
  const rect = el.getBoundingClientRect()
  const particle = document.createElement('span')
  const size = 3 + Math.random() * 5
  const driftX = (Math.random() - 0.5) * 40
  const driftY = -10 - Math.random() * 22
  Object.assign(particle.style, {
    position: 'fixed',
    left: `${rect.left + Math.random() * rect.width}px`,
    top: `${rect.top + rect.height * 0.5 + Math.random() * rect.height * 0.5}px`,
    width: `${size}px`, height: `${size}px`,
    borderRadius: '50%',
    background: ['rgba(255,255,255,0.95)', 'rgba(0,183,79,0.85)', 'rgba(255,205,0,0.85)'][Math.floor(Math.random() * 3)],
    pointerEvents: 'none', zIndex: '9999', opacity: '0',
    transition: 'transform 0.7s ease-out, opacity 0.7s ease-out',
    transform: 'translate(0,0)', filter: 'blur(0.4px)',
  })
  document.body.appendChild(particle)
  requestAnimationFrame(() => requestAnimationFrame(() => {
    particle.style.opacity = '1'
    particle.style.transform = `translate(${driftX}px, ${driftY}px)`
  }))
  setTimeout(() => { particle.style.opacity = '0' }, 380)
  setTimeout(() => particle.remove(), 800)
}

export default function Carta() {
  const { t } = useTranslation()
  const idioma = useIdioma()
  // La categoría va en la URL (/carta?categoria=entrepanes) para poder enlazar a la carta ya filtrada.
  const [params, setParams] = useSearchParams()
  const pedida = params.get('categoria')
  const activa = CATEGORIAS.some(c => c.id === pedida) ? pedida : 'galicia'
  const [expandido, setExpandido] = useState(null)
  const pillRef = useRef(null)

  useEffect(() => {
    let dustTimer = 0, raf
    const loop = () => {
      dustTimer++
      if (dustTimer % 7 === 0 && pillRef.current) spawnDust(pillRef.current)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const platosFiltrados = PLATOS.filter(p => p.cat === activa)

  const toggleExpandido = (key) => setExpandido(prev => prev === key ? null : key)

  // Con teclado, al abrir los ingredientes el foco entra en la ficha y al cerrarla vuelve al botón "+"
  const masRef = useRef(null)
  const cerrarFichaRef = useRef(null)
  const abiertaConTeclado = useRef(false)
  const toggleConBoton = (e, key) => {
    e.stopPropagation()
    abiertaConTeclado.current = e.detail === 0
    toggleExpandido(key)
  }
  const cerrarFicha = (conTeclado) => {
    setExpandido(null)
    if (conTeclado) masRef.current?.focus()
  }

  useEffect(() => {
    if (expandido === null) return undefined
    if (abiertaConTeclado.current) cerrarFichaRef.current?.focus()
    const onKeyDown = (e) => { if (e.key === 'Escape') cerrarFicha(true) }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [expandido])

  return (
    <div className={styles.page} onClick={() => setExpandido(null)}>
      <Seo
        title={t('carta.seo.titulo')}
        description={t('carta.seo.descripcion')}
        path="/carta"
      />
      <MigasJsonLd migas={[{ nombre: t('nav.carta'), path: '/carta' }]} />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t('carta.titulo')}</h1>
        </header>

        <div className={styles.pills}>
          {CATEGORIAS.map(cat => (
            <button
              key={cat.id}
              ref={activa === cat.id ? pillRef : null}
              className={`${styles.pill} ${activa === cat.id ? (CAT_ROT_ALT.has(cat.id) ? styles.pillActiveAlt : styles.pillActive) : ''}`}
              onClick={() => { setParams({ categoria: cat.id }, { replace: true }); setExpandido(null) }}
            >
              {tx(cat.label, idioma)}
            </button>
          ))}
        </div>

        <h2 className="solo-lector">{tx(CATEGORIAS.find(c => c.id === activa).label, idioma)}</h2>

        <div className={styles.grid}>
          {platosFiltrados.map((plato, i) => {
            const key = `${plato.cat}-${i}`
            const nombre = tx(plato.nombre, idioma)
            // Las fotos están guardadas con el nombre del plato en castellano
            const nombreEs = tx(plato.nombre, 'es')
            const abierto = expandido === key
            return (
              <div key={key} className={styles.card}>
{plato.glutenFree && <span className={styles.tagGluten}>{t('carta.sinGluten')}</span>}

                {abierto && (
                  <div className={styles.cardPopup} id={`ingredientes-${key}`} onClick={e => e.stopPropagation()}>
                    <button
                      ref={cerrarFichaRef}
                      className={styles.cardPopupClose}
                      onClick={(e) => cerrarFicha(e.detail === 0)}
                      aria-label={t('a11y.cerrar')}
                    >×</button>
                    <p className={styles.cardDesc}>{tx(plato.desc, idioma)}</p>
                    {[[t('carta.contiene'), plato.alergenos, styles.alergenoIcon], [t('carta.trazas'), plato.trazas, `${styles.alergenoIcon} ${styles.alergenoTraza}`]].map(([titulo, ids, clase]) => ids?.length > 0 && (
                      <div key={titulo} className={styles.cardAlergenosGrupo}>
                        <span className={styles.cardAlergenosTitulo}>{titulo}</span>
                        <div className={styles.cardAlergenos}>
                          {ids.map(id => (
                            <img
                              loading="lazy"
                              key={id}
                              src={ALERGENO_IMGS[id]}
                              alt={tx(ALERGENOS[id]?.label, idioma)}
                              title={tx(ALERGENOS[id]?.label, idioma)}
                              className={clase}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.cardImg} onClick={e => { e.stopPropagation(); toggleExpandido(key) }} style={{ cursor: 'pointer' }}>
                  <Imagen imagen={GALICIA_IMGS[nombreEs] || ENTREPANES_IMGS[nombreEs] || ENSALADAS_IMGS[nombreEs] || AUTOR_IMGS[nombreEs] || VEGGIES_IMGS[nombreEs] || EMPEZAR_IMGS[nombreEs] || POSTRES_IMGS[nombreEs] || CAT_IMGS[plato.cat]} sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw" loading="lazy" alt={nombre} />
                </div>

                <div className={`${styles.cardInfo} ${plato.chef ? styles.cardInfoChef : ''}`}>
                  <div className={styles.cardRow}>
                    <span className={styles.cardNombre} onClick={e => { e.stopPropagation(); toggleExpandido(key) }} style={{ cursor: 'pointer' }}>{nombre}</span>
                    <button
                      ref={abierto ? masRef : null}
                      className={`${styles.cardMas} ${abierto ? styles.cardMasOpen : ''}`}
                      onClick={e => toggleConBoton(e, key)}
                      aria-label={t(abierto ? 'carta.cerrarIngredientes' : 'carta.verIngredientes', { plato: nombre })}
                      aria-expanded={abierto}
                      aria-controls={abierto ? `ingredientes-${key}` : undefined}
                    >
                      <img loading="lazy" src={iconBurger} alt="" className={styles.cardMasIcon} />
                    </button>
                  </div>
                  {plato.chef && (
                    <div className={styles.cardChefWrap}>
                      <span className={styles.cardChef}>{tx(plato.chef, idioma)}</span>
                      {plato.restaurante && <span className={styles.cardRestaurante}>{tx(plato.restaurante, idioma)}</span>}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>
      <div className={styles.ctaBar}>
        <a href="https://laurbana.waitry.net/" target="_blank" rel="noopener noreferrer" className={`${styles.ctaBtn} ${styles.ctaBtnDelivery}`}>
          <img loading="lazy" src={iconDeliveryBlanco} alt="" className={styles.ctaBtnIcon} />
          {t('nav.delivery')}
        </a>
        <Enlace to="/reservar" className={`${styles.ctaBtn} ${styles.ctaBtnReserva}`}>
          <img loading="lazy" src={iconCalendarioBlanco} alt="" className={styles.ctaBtnIcon} />
          {t('nav.reservar')}
        </Enlace>
      </div>
      <Footer />
    </div>
  )
}
