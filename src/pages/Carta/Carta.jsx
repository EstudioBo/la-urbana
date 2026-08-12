import { useState, useRef, useEffect } from 'react'
import styles from './Carta.module.css'
import Seo from '../../components/Seo/Seo'
import Footer from '../Home/sections/Footer'
import { CATEGORIAS, PLATOS, ALERGENOS } from './cartaData'

import imgParaEmpezar from '../../assets/images/carta/para-empezar.webp'
import imgDeAutor     from '../../assets/images/carta/de-autor.webp'
import imgGalicia     from '../../assets/images/carta/artesanas.webp'
import imgVeggies     from '../../assets/images/carta/veggies.webp'
import imgEntrepanes  from '../../assets/images/carta/entrepanes.webp'
import imgEnsalada    from '../../assets/images/carta/ensalada.webp'
import imgPostres     from '../../assets/images/carta/postres.webp'
import iconBurger          from '../../assets/images/icon-burgermenu.svg'

import imgGaliciaBritish      from '../../assets/images/carta/galicia/urbana-british.webp'
import imgGaliciaCampera      from '../../assets/images/carta/galicia/urbana-campera.webp'
import imgGaliciaClasica      from '../../assets/images/carta/galicia/urbana-clasica.webp'
import imgGaliciaCorralita    from '../../assets/images/carta/galicia/urbana-corralita.webp'
import imgGaliciaCuartoLibra  from '../../assets/images/carta/galicia/urbana-cuarto-de-libra.webp'
import imgGaliciaJalapenha    from '../../assets/images/carta/galicia/urbana-jalapenha.webp'
import imgGaliciaMexicana     from '../../assets/images/carta/galicia/urbana-mexicana.webp'
import imgGaliciaPiamonte     from '../../assets/images/carta/galicia/urbana-piamonte.webp'

import imgEntrepanesDechipis  from '../../assets/images/carta/entrepanes/dechipis.webp'
import imgEntrepanesRusticWay from '../../assets/images/carta/entrepanes/rustic-way.webp'

import imgEnsaladaCesar       from '../../assets/images/carta/ensaladas/ensalada-cesar.webp'
import imgEnsaladaCebreiro    from '../../assets/images/carta/ensaladas/ensalada-cebreiro-mood.webp'

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
}

const ENTREPANES_IMGS = {
  'Dechipis':   imgEntrepanesDechipis,
  'Rustic Way': imgEntrepanesRusticWay,
}

const ENSALADAS_IMGS = {
  'Ensalada César':   imgEnsaladaCesar,
  'Cebreiro Mood':    imgEnsaladaCebreiro,
}
import iconDeliveryBlanco  from '../../assets/images/icon-delivery-blanco.webp'
import iconCalendarioBlanco from '../../assets/images/icon-calendario-blanco.webp'

const CAT_IMGS = {
  empezar:    imgParaEmpezar,
  autor:      imgDeAutor,
  galicia:    imgGalicia,
  veggies:    imgVeggies,
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
  const [activa, setActiva] = useState('galicia')
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

  return (
    <div className={styles.page} onClick={() => setExpandido(null)}>
      <Seo
        title="Carta"
        description="Descubre nuestra carta: hamburguesas Made in Galicia, entrepanes, ensaladas, para empezar, de autor y postres. Producto gallego de km 0 en cada plato."
        path="/carta"
      />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Nuestra carta</h1>
        </header>

        <div className={styles.pills}>
          {CATEGORIAS.map(cat => (
            <button
              key={cat.id}
              ref={activa === cat.id ? pillRef : null}
              className={`${styles.pill} ${activa === cat.id ? (CAT_ROT_ALT.has(cat.id) ? styles.pillActiveAlt : styles.pillActive) : ''}`}
              onClick={() => { setActiva(cat.id); setExpandido(null) }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {platosFiltrados.map((plato, i) => {
            const key = `${plato.cat}-${i}`
            const abierto = expandido === key
            return (
              <div key={key} className={styles.card}>
{plato.glutenFree && <span className={styles.tagGluten}>SG</span>}

                {abierto && (
                  <div className={styles.cardPopup} onClick={e => e.stopPropagation()}>
                    <button
                      className={styles.cardPopupClose}
                      onClick={() => setExpandido(null)}
                      aria-label="Cerrar"
                    >×</button>
                    <p className={styles.cardDesc}>{plato.desc}</p>
                    {plato.alergenos?.length > 0 && (
                      <div className={styles.cardAlergenos}>
                        {plato.alergenos.map(id => (
                          <img
                            key={id}
                            src={ALERGENO_IMGS[id]}
                            alt={ALERGENOS[id]?.label}
                            title={ALERGENOS[id]?.label}
                            className={styles.alergenoIcon}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className={styles.cardImg} onClick={e => { e.stopPropagation(); toggleExpandido(key) }} style={{ cursor: 'pointer' }}>
                  <img src={GALICIA_IMGS[plato.nombre] || ENTREPANES_IMGS[plato.nombre] || ENSALADAS_IMGS[plato.nombre] || CAT_IMGS[plato.cat]} alt={plato.nombre} />
                </div>

                <div className={styles.cardInfo}>
                  <div className={styles.cardRow}>
                    <span className={styles.cardNombre} onClick={e => { e.stopPropagation(); toggleExpandido(key) }} style={{ cursor: 'pointer' }}>{plato.nombre}</span>
                    <button
                      className={`${styles.cardMas} ${abierto ? styles.cardMasOpen : ''}`}
                      onClick={e => { e.stopPropagation(); toggleExpandido(key) }}
                      aria-label={abierto ? 'Cerrar ingredientes' : 'Ver ingredientes'}
                    >
                      <img src={iconBurger} alt="" className={styles.cardMasIcon} />
                    </button>
                  </div>
                  {plato.chef && (
                    <div className={styles.cardChefWrap}>
                      <span className={styles.cardChef}>{plato.chef}</span>
                      {plato.restaurante && <span className={styles.cardRestaurante}>{plato.restaurante}</span>}
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
          <img src={iconDeliveryBlanco} alt="" className={styles.ctaBtnIcon} />
          Delivery
        </a>
        <a href="/reservar" className={`${styles.ctaBtn} ${styles.ctaBtnReserva}`}>
          <img src={iconCalendarioBlanco} alt="" className={styles.ctaBtnIcon} />
          Reservar
        </a>
      </div>
      <Footer />
    </div>
  )
}
