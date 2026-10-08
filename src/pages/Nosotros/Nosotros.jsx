import { useCallback, useRef, useState, useEffect, useLayoutEffect, useSyncExternalStore } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Nosotros.module.css'
import { tx, useIdioma } from '../../i18n/idioma'
import Seo from '../../components/Seo/Seo'
import MigasJsonLd from '../../components/Seo/MigasJsonLd'
import SeccionCarta from '../Home/sections/SeccionCarta'
import Footer from '../Home/sections/Footer'
import imgFondo from '../../assets/images/origen/fondo-nuestro-origen.webp'
import imgBordeCesped from '../../assets/images/origen/fondo-borde-cesped.webp'
import imgRubia from '../../assets/images/origen/rubia-gallega.webp'
import imgPan from '../../assets/images/origen/pan-artesano-lugo.webp'
import imgHuevos from '../../assets/images/origen/huevos-camperos-pazo-vilane.webp'
import imgMel from '../../assets/images/origen/mel-de-antas.webp'
import imgQuesos from '../../assets/images/origen/queixos.webp'
import imgArzua from '../../assets/images/origen/queso-arzua-ulloa.webp'
import imgSanSimon from '../../assets/images/origen/queso-san-simon.webp'
import imgRoxadouro from '../../assets/images/origen/roxadouro.webp'
import imgPimientos from '../../assets/images/origen/pimientos-padron.webp'
import * as caminoEscritorio from './caminoEscritorio'
import * as caminoMovil from './caminoMovil'
import { useCaminoDibujado } from './useCaminoDibujado'
import { editandoCamino, leerBorrador, guardarBorrador } from './borradorCamino'

const BURGERS_PENDIENTES = ['Burger xxx', 'Burger xxx', 'Burger xxx']
const VERTICAL = { width: 848, height: 1264 }
const VERTICAL_2_3 = { width: 848, height: 1272 }

const INGREDIENTES = [
  {
    titulo: { es: 'Carne de Rubia Galega', en: 'Rubia Galega beef' },
    texto: {
      es: 'Carne gallega con sabor, carácter y el punto justo de grasa. El centro de nuestras burgers y la mejor prueba de que, cuando el producto es top, no hace falta disfrazarlo.',
      en: 'Galician beef with flavour, character and just the right amount of fat. The heart of our burgers and living proof that when the produce is top-notch, there\'s no need to dress it up.',
    },
    productor: { nombre: 'Ternera Gallega', url: 'https://www.terneragallega.com/' },
    encuentras: { es: 'La encuentras en', en: 'You\'ll find it in' },
    burgers: [{ es: 'Todas las Made in Galicia', en: 'All the Made in Galicia burgers' }],
    nota: { es: '(menos la Urbana Corralita, que es de pollo)', en: '(except the Urbana Corralita, which is chicken)' },
    img: imgRubia, alt: { es: 'Burger de carne de Rubia Galega en el campo gallego', en: 'Rubia Galega beef burger in the Galician countryside' }, width: 1608, height: 1800,
  },
  {
    titulo: { es: 'Pan artesano de Lugo', en: 'Artisan bread from Lugo' },
    texto: {
      es: 'Trabajamos con pan artesano gallego, con cuerpo y corteza crujiente, ¡pan de verdad! preparado para sujetar una burger sin rendirse por el camino. Ey, y tenemos opción sin gluten eh? Ya sabes: Si es crujiente y artesana, es la burger de La Urbana!',
      en: 'We use Galician artisan bread with body and a crunchy crust (real bread!), built to hold a burger without giving up halfway. Oh, and there\'s a gluten-free option too, yeah? Remember: if it\'s crunchy and handmade, it\'s a La Urbana burger!',
    },
    encuentras: { es: 'Lo encuentras en', en: 'You\'ll find it in' },
    burgers: [{ es: 'Todas nuestras burgers', en: 'All our burgers' }],
    nota: { es: '(a no ser que pidas pan brioche)', en: '(unless you ask for a brioche bun)' },
    img: imgPan, alt: { es: 'Pan artesano de Lugo', en: 'Artisan bread from Lugo' }, ...VERTICAL,
  },
  {
    titulo: { es: 'Huevos camperos de Pazo de Vilane', en: 'Pazo de Vilane free-range eggs' },
    texto: {
      es: 'Huevos camperos producidos en Antas de Ulla por gallinas criadas en libertad y con acceso diario a pastos verdes. Producto gallego que se reconoce nada más romper la yema.',
      en: 'Free-range eggs from Antas de Ulla, laid by hens raised outdoors with daily access to green pastures. Galician produce you can spot the moment you break the yolk.',
    },
    productor: { nombre: 'Pazo de Vilane', url: 'https://pazodevilane.com/' },
    encuentras: { es: 'Los encuentras en', en: 'You\'ll find them in' },
    burgers: ['Urbana Fina', 'Urbana Campera', 'Urbana British', 'Urbana Jalapeña'],
    img: imgHuevos, alt: { es: 'Huevos camperos de Pazo de Vilane', en: 'Pazo de Vilane free-range eggs' }, ...VERTICAL,
  },
  {
    titulo: { es: 'Mel da Anta ecológica', en: 'Organic Mel da Anta' },
    texto: {
      es: 'Miel ecológica producida en Antas de Ulla, en pleno corazón de Galicia. Dulzor natural, aroma y territorio para crear contrastes que llevan nuestras burgers a otro nivel.',
      en: 'Organic honey from Antas de Ulla, right in the heart of Galicia. Natural sweetness, aroma and a real taste of place, creating contrasts that take our burgers to the next level.',
    },
    productor: { nombre: 'Mel da Anta' },
    encuentras: { es: 'La encuentras en', en: 'You\'ll find it in' },
    burgers: ['Urbana Campera', 'Camperitos'],
    img: imgMel, alt: { es: 'Burger con huevo y miel de castaño Mel da Anta junto a un tarro de miel y castañas', en: 'Burger with egg and Mel da Anta chestnut honey next to a jar of honey and chestnuts' }, ...VERTICAL_2_3,
  },
  {
    titulo: { es: 'Queso DOP Arzúa-Ulloa', en: 'Arzúa-Ulloa PDO cheese' },
    texto: {
      es: 'Un queso gallego elaborado con leche de vaca, suave, cremoso y muy fundente. Nace en el corazón de Galicia y sobre la carne hace exactamente lo que tiene que hacer. Locura de combinación.',
      en: 'A Galician cow\'s milk cheese: mild, creamy and gloriously melty. Born in the heart of Galicia, it does exactly what it should on top of the beef. A crazy-good combo.',
    },
    productor: { nombre: { es: 'DOP Arzúa-Ulloa', en: 'Arzúa-Ulloa PDO' }, url: 'https://www.arzua-ulloa.org/' },
    encuentras: { es: 'Lo encuentras en', en: 'You\'ll find it in' },
    burgers: ['Urbana Antollo Galego', 'Rustic Way'],
    img: imgArzua, alt: { es: 'Burger sobre una rueda de queso Arzúa-Ulloa', en: 'Burger on a wheel of Arzúa-Ulloa cheese' }, ...VERTICAL_2_3,
  },
  {
    titulo: { es: 'Queso DOP San Simón da Costa', en: 'San Simón da Costa PDO cheese' },
    texto: {
      es: 'Elaborado en Terra Chá y reconocible por su forma, su corteza y su característico toque ahumado. Un queso gallego con personalidad propia que sube de nivel todo lo que toca.',
      en: 'Made in Terra Chá and instantly recognisable by its shape, its rind and its signature smoky touch. A Galician cheese with a personality of its own that levels up everything it touches.',
    },
    productor: { nombre: { es: 'DOP San Simón da Costa', en: 'San Simón da Costa PDO' }, url: 'https://www.sansimondacosta.com/' },
    encuentras: { es: 'Lo encuentras en', en: 'You\'ll find it in' },
    burgers: ['Urbana Fina', 'Urbana Corea'],
    img: imgSanSimon, alt: { es: 'Burger con queso San Simón da Costa ahumado', en: 'Burger with smoked San Simón da Costa cheese' }, ...VERTICAL_2_3,
  },
  {
    titulo: { es: 'Queso Galmesán', en: 'Galmesán cheese' },
    texto: {
      es: 'Un queso curado gallego elaborado en Arzúa con leche de pastoreo procedente de pequeños ganaderos. Intenso, aromático y perfecto para rallar, fundir o dar el golpe final.',
      en: 'A cured Galician cheese made in Arzúa with pasture-fed milk from small local farmers. Intense, aromatic and perfect for grating, melting or adding the finishing touch.',
    },
    productor: { nombre: 'Galmesán', url: 'https://www.galmesan.es/' },
    encuentras: { es: 'Lo encuentras en', en: 'You\'ll find it in' },
    burgers: BURGERS_PENDIENTES,
    img: imgQuesos, alt: { es: 'Quesos gallegos', en: 'Galician cheeses' }, ...VERTICAL,
  },
  {
    titulo: 'Roxad’Ouro',
    texto: {
      es: 'Carne gallega seleccionada y madurada por Gutrei Galicia. El tiempo de maduración concentra su sabor, mejora su textura y consigue una burger más intensa y jugosa. Una carne para hacerte gozar, nivel supremo.',
      en: 'Galician beef selected and matured by Gutrei Galicia. Ageing concentrates its flavour, improves its texture and makes for a more intense, juicier burger. Beef that\'ll make you swoon, next-level stuff.',
    },
    encuentras: { es: 'La encuentras en', en: 'You\'ll find it in' },
    burgers: BURGERS_PENDIENTES,
    img: imgRoxadouro, alt: { es: 'Burger de carne madurada Roxad’Ouro', en: 'Matured Roxad’Ouro beef burger' }, ...VERTICAL,
  },
  {
    titulo: { es: 'Pimientos de Padrón', en: 'Padrón peppers' },
    texto: {
      es: 'Pequeños, verdes y con ese punto imprevisible que forma parte de su fama: unos pican y otros no. Un clásico gallego que con nuestras carnes y pan… no podemos explicártelo, tendrás que probarlo!',
      en: 'Small, green and with that unpredictable streak they\'re famous for: some are hot and some aren\'t. A Galician classic that, with our beef and bread… we can\'t explain it, you\'ll just have to try it!',
    },
    encuentras: { es: 'Los encuentras en', en: 'You\'ll find them in' },
    burgers: ['Urbana Indómita', { es: 'Aros de cebolla', en: 'Onion rings' }],
    img: imgPimientos, alt: { es: 'Burger con pimientos de Padrón', en: 'Burger with Padrón peppers' }, ...VERTICAL,
  },
]

// Colocación irregular de cada fila en móvil y tablet: desplazamiento lateral (vw), giro de la foto y hueco extra
// antes de la fila (rem). En escritorio la posición la da el lienzo (caminoEscritorio.js) y solo se usa el giro.
const RITMO = [
  { x: 1, giro: 4, hueco: 0 },
  { x: -2, giro: -5, hueco: 1 },
  { x: 2.5, giro: 3, hueco: -1 },
  { x: -1, giro: -3, hueco: 1.5 },
  { x: 1.5, giro: 6, hueco: 0 },
  { x: -2.5, giro: -2, hueco: 2 },
  { x: 0.5, giro: 5, hueco: -0.5 },
  { x: -1.5, giro: -4, hueco: 1 },
  { x: 2, giro: 3, hueco: 0 },
]

const MOVIL = '(max-width: 768px)'
const ESCRITORIO = '(min-width: 1024px)'
// Escritorio y móvil tienen su propio lienzo fijo y editable; en tablet (entre medias) el camino se calcula solo.
const LIENZOS = { escritorio: caminoEscritorio, movil: caminoMovil }

const conGiroYAlineacion = (f, i) => ({
  texto: { giro: 0, alinear: 'izquierda', ...f.texto },
  foto: { giro: RITMO[i].giro, ...f.foto },
})
const r1 = n => Math.round(n * 10) / 10
const pct = (valor, total) => `${(valor / total) * 100}%`

// En el prerenderizado no hay pantalla: se genera la versión tablet y React ajusta al hidratar
function useMedia(query) {
  const suscribir = useCallback(cambiar => {
    const media = window.matchMedia(query)
    media.addEventListener('change', cambiar)
    return () => media.removeEventListener('change', cambiar)
  }, [query])
  return useSyncExternalStore(suscribir, () => window.matchMedia(query).matches, () => false)
}

// Tablet: el camino baja pegado al margen del lado de la foto de cada fila y cruza en el hueco entre filas.
function trazarCaminoFlujo(wrap, filas, carta, horizonte) {
  const base = wrap.getBoundingClientRect()
  const caja = el => {
    const r = el.getBoundingClientRect()
    return { top: r.top - base.top, bottom: r.bottom - base.top, left: r.left - base.left, width: r.width }
  }
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
  const W = wrap.clientWidth
  const H = wrap.offsetHeight
  const margen = W * 0.05

  const anclas = filas.map((fila, i) => {
    const f = caja(fila)
    return { x: i % 2 === 0 ? W - margen : margen, y1: f.top, y2: f.bottom }
  })
  const cartaCaja = caja(carta)
  const titulo = caja(carta.querySelector('h2'))
  const fin = {
    x: Math.max(margen, titulo.left + titulo.width / 2),
    y: cartaCaja.top + Math.min(titulo.top - cartaCaja.top - rem, rem * 3.5),
  }
  const inicio = { x: margen, y: Math.min(horizonte + rem * 3, window.innerHeight - rem * 3) }

  const P = p => `${r1(p.x)} ${r1(p.y)}`
  const curva = (a, b) => {
    const k = (b.y - a.y) * 0.55
    return `C ${P({ x: a.x, y: a.y + k })} ${P({ x: b.x, y: b.y - k })} ${P(b)}`
  }
  let d = `M ${P(inicio)}`
  let previo = inicio
  anclas.forEach(({ x, y1, y2 }) => {
    d += ` ${curva(previo, { x, y: y1 })} L ${P({ x, y: y2 })}`
    previo = { x, y: y2 }
  })
  d += ` ${curva(previo, fin)}`

  return {
    ancho: W, alto: H, d, y0: inicio.y, y1: fin.y,
    nodos: [inicio, ...anclas.map(a => ({ x: a.x, y: a.y1 })), fin],
  }
}

function Camino({ ancho, alto, d, y0, y1, nodos, filaDeNodo, pathRef, sombraRef, sombra, nodosRef, movil }) {
  return (
    <>
      <svg className={`${styles.camino} ${movil ? styles.caminoMovil : ''}`} viewBox={`0 0 ${ancho} ${alto}`} aria-hidden="true">
        <defs>
          <linearGradient id="camino-gradiente" gradientUnits="userSpaceOnUse" x1="0" y1={y0} x2="0" y2={y1}>
            <stop offset="0" className={styles.stopVerde} />
            <stop offset="1" className={styles.stopNaranja} />
          </linearGradient>
        </defs>
        {sombra && <path ref={sombraRef} d={d} className={styles.trazoSombra} />}
        <path ref={pathRef} d={d} className={styles.trazo} stroke="url(#camino-gradiente)" />
      </svg>
      <svg
        ref={nodosRef}
        className={`${styles.camino} ${styles.caminoNodos} ${movil ? styles.caminoMovil : ''}`}
        viewBox={`0 0 ${ancho} ${alto}`}
        aria-hidden="true"
      >
        {nodos.map((n, i) => (
          <g key={i} data-largo={n.largo} data-fila={filaDeNodo(i) ?? undefined} className={styles.nodo}>
            <circle cx={n.x} cy={n.y} r={movil ? 10 : 15} className={styles.nodoAro} stroke="url(#camino-gradiente)" />
            <circle cx={n.x} cy={n.y} r={movil ? 3.5 : 5} fill="url(#camino-gradiente)" />
          </g>
        ))}
      </svg>
    </>
  )
}

// Posición de la vaca dentro de fondo-nuestro-origen.webp (1200×1800), en fracciones de la foto.
const FOTO_RATIO = 1800 / 1200
const VACA_ARRIBA = 0.632
const HORIZONTE = 0.711
const VACA_CENTRO_X = 0.73
// fondo-borde-cesped.webp: filas 1230–1305 de la foto de fondo, solo la hierba del horizonte (cielo transparente).
// Va encima del camino para que la línea asome por detrás de las briznas.
const BORDE_CESPED = { fila: 1230, filas: 75 }
const FOTO_ALTO = 1800

// Coloca la foto para que la vaca empiece justo debajo del título (en móvil, debajo del texto)
// y el texto nunca quede sobre la hierba.
function colocarVaca(hero, lineaBase, intro) {
  const movil = window.matchMedia(MOVIL).matches
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
  const W = hero.clientWidth
  const H = hero.clientHeight
  const top = hero.getBoundingClientRect().top
  const tituloAbajo = lineaBase.getBoundingClientRect().bottom - top + rem * 0.5
  const introAbajo = intro.getBoundingClientRect().bottom - top + rem * 1.5

  const ancla = alto => (movil
    ? introAbajo
    : Math.max(tituloAbajo, introAbajo - alto * (HORIZONTE - VACA_ARRIBA)))

  let alto = W * FOTO_RATIO
  // En móvil el degradado verde del final del hero es opaco desde el 80% del alto (ver CSS): la foto puede acabar ahí.
  const cubrir = movil ? 0.8 : 1
  const minimo = Math.max(ancla(alto) / VACA_ARRIBA, (H * cubrir - ancla(alto)) / (1 - VACA_ARRIBA))
  if (alto < minimo) alto = minimo
  const ancho = alto / FOTO_RATIO

  const centro = W * (movil ? 0.5 : VACA_CENTRO_X)
  const left = Math.min(0, Math.max(W - ancho, centro - ancho * VACA_CENTRO_X))

  return { width: ancho, height: alto, top: ancla(alto) - alto * VACA_ARRIBA, left }
}

export default function Nosotros() {
  const { t } = useTranslation()
  const idioma = useIdioma()
  const wrapRef = useRef(null)
  const heroRef = useRef(null)
  const tituloRef = useRef(null)
  const lineaBaseRef = useRef(null)
  const introRef = useRef(null)
  const filasRef = useRef([])
  const cartaRef = useRef(null)
  const pathRef = useRef(null)
  const sombraRef = useRef(null)
  const nodosRef = useRef(null)
  const lienzoRef = useRef(null)
  const escritorio = useMedia(ESCRITORIO)
  const movil = useMedia(MOVIL)
  const version = escritorio ? 'escritorio' : movil ? 'movil' : null
  const lienzo = version && LIENZOS[version]
  const [caminoFlujo, setCaminoFlujo] = useState(null)
  const [vaca, setVaca] = useState(null)
  // Cambios del modo edición por versión (solo en desarrollo); si no hay, se usa lo guardado en el proyecto.
  const [ediciones, setEdiciones] = useState(() => ({ escritorio: leerBorrador('escritorio'), movil: leerBorrador('movil') }))
  const edicion = version && ediciones[version]
  const filas = lienzo && (edicion?.filas ?? lienzo.FILAS).map(conGiroYAlineacion)
  const objetivosNodos = lienzo && (edicion?.nodos ?? lienzo.NODOS)
  const [solape, setSolape] = useState(0)
  const horizonte = vaca ? vaca.top + vaca.height * HORIZONTE : null

  useLayoutEffect(() => {
    const hero = heroRef.current
    let activo = true
    const calcular = () => {
      if (!activo) return
      const v = colocarVaca(hero, lineaBaseRef.current, introRef.current)
      setVaca(v)
      // El lienzo empieza en el horizonte del hero: sube por encima de la sección lo que hay de hierba.
      setSolape(hero.offsetHeight - (v.top + v.height * HORIZONTE))
    }
    calcular()
    document.fonts.ready.then(calcular)
    const ro = new ResizeObserver(calcular)
    ro.observe(hero)
    ro.observe(tituloRef.current)
    ro.observe(introRef.current)
    return () => { activo = false; ro.disconnect() }
  }, [])

  useLayoutEffect(() => {
    if (horizonte === null || version) return
    const wrap = wrapRef.current
    const calcular = () => setCaminoFlujo(trazarCaminoFlujo(wrap, filasRef.current, cartaRef.current, horizonte))
    calcular()
    const ro = new ResizeObserver(calcular)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [horizonte, version])

  const camino = lienzo
    ? { ancho: lienzo.LIENZO.ancho, alto: lienzo.LIENZO.alto, d: edicion?.camino ?? lienzo.CAMINO, y0: 0, y1: lienzo.LIENZO.alto, nodos: objetivosNodos }
    : caminoFlujo
  // El solape mueve el lienzo: al cambiar, el dibujo se vuelve a medir.
  const claveCamino = camino && `${version}|${camino.d}|${version ? solape : 0}`
  const editandoAqui = editandoCamino && Boolean(version)
  // Cada punto verde hace aparecer su tarjeta cuando la línea llega a él (texto y, justo después, foto).
  // Con lienzo, el punto i es el de la tarjeta i; en tablet el primero es el inicio del camino. El último es el final.
  const filaDeNodo = k => {
    const fila = version ? k : k - 1
    return fila >= 0 && fila < INGREDIENTES.length ? fila : null
  }
  const revelar = fila => [...(filasRef.current[fila]?.children ?? [])].forEach(pieza => pieza.classList.add(styles.visible))
  const { nodos, remedir } = useCaminoDibujado({
    pathRef,
    sombraRef,
    nodosRef,
    objetivos: camino?.nodos ?? [],
    clave: claveCamino,
    claseNodoVisible: styles.nodoVisible,
    dibujoCompleto: editandoAqui,
    revelar,
  })
  const caminoSvg = camino && (
    <Camino {...camino} nodos={nodos} filaDeNodo={filaDeNodo} pathRef={pathRef} sombraRef={sombraRef} sombra={!editandoAqui} nodosRef={nodosRef} movil={version !== 'escritorio'} />
  )

  // Modo edición (solo en desarrollo, /nosotros?editar-camino): camino, tarjetas y puntos verdes se arrastran.
  const filasActuales = useRef(filas)
  const objetivosActuales = useRef(objetivosNodos)
  useLayoutEffect(() => {
    filasActuales.current = filas
    objetivosActuales.current = objetivosNodos
  })
  useEffect(() => {
    if (!import.meta.env.DEV || !editandoAqui || nodos.length === 0) return
    let cancelado = false
    let limpiar = () => {}
    import('./editorCamino').then(({ iniciarEditor }) => {
      if (cancelado) return
      limpiar = iniciarEditor({
        version,
        path: pathRef.current,
        lienzo: lienzoRef.current,
        piezas: filasRef.current.flatMap((fila, i) => [
          { el: fila.querySelector(`.${styles.info}`), i, tipo: 'texto' },
          { el: fila.querySelector(`.${styles.foto}`), i, tipo: 'foto' },
        ]),
        claseVisible: styles.visible,
        nodosSvg: nodosRef.current,
        anchoLienzo: lienzo.LIENZO.ancho,
        alCambiarCamino: remedir,
        estadoActual: () => ({ filas: filasActuales.current, nodos: objetivosActuales.current }),
        alCambiarPieza: (i, tipo, cambios) => {
          const nuevas = filasActuales.current.map((f, k) => (k === i ? { ...f, [tipo]: { ...f[tipo], ...cambios(f[tipo]) } } : f))
          guardarBorrador(version, { filas: nuevas })
          setEdiciones(prev => ({ ...prev, [version]: { ...prev[version], filas: nuevas } }))
        },
        alMoverNodo: (i, punto) => {
          const nuevos = objetivosActuales.current.map((o, k) => (k === i ? punto : o))
          guardarBorrador(version, { nodos: nuevos })
          setEdiciones(prev => ({ ...prev, [version]: { ...prev[version], nodos: nuevos } }))
        },
      })
    })
    return () => { cancelado = true; limpiar() }
  }, [editandoAqui, version, nodos.length === 0, remedir]) // eslint-disable-line react-hooks/exhaustive-deps -- se monta una vez por versión cuando ya hay puntos

  // Una tarjeta sin punto (si se quitan puntos en el editor) aparece al entrar en pantalla.
  const filasSinPunto = INGREDIENTES.map((_, i) => i).filter(i => !nodos.some((_, k) => filaDeNodo(k) === i)).join()
  useEffect(() => {
    if (!filasSinPunto) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add(styles.visible)
        observer.unobserve(entry.target)
      }),
      { threshold: 0.2 }
    )
    filasSinPunto.split(',').forEach(i => [...filasRef.current[i].children].forEach(pieza => observer.observe(pieza)))
    return () => observer.disconnect()
  }, [filasSinPunto])

  return (
    <main>
      <Seo
        title={t('nosotros.seo.titulo')}
        description={t('nosotros.seo.descripcion')}
        path="/nosotros"
      />
      <MigasJsonLd migas={[{ nombre: t('nav.origen'), path: '/nosotros' }]} />

      <div className={`${styles.recorrido} ${version ? styles.fijo : ''} ${version === 'movil' ? styles.fijoMovil : ''}`} ref={wrapRef}>
        <section className={styles.hero} ref={heroRef}>
          <img
            src={imgFondo}
            alt=""
            className={styles.heroBg}
            width="1200"
            height="1800"
            fetchPriority="high"
            style={vaca ?? undefined}
          />
          {vaca && (
            <img
              src={imgBordeCesped}
              alt=""
              className={styles.heroBordeCesped}
              width="1200"
              height={BORDE_CESPED.filas}
              style={{
                left: vaca.left,
                width: vaca.width,
                top: vaca.top + (vaca.height * BORDE_CESPED.fila) / FOTO_ALTO,
                height: (vaca.height * BORDE_CESPED.filas) / FOTO_ALTO,
              }}
            />
          )}
          <div className={styles.heroContent}>
            <h1 className={styles.titulo} lang="gl" ref={tituloRef}>
              <span className={styles.tituloLinea}>
                Da nosa terra á túa
              </span>
              <span className={styles.tituloLinea}>
                <span className={styles.tituloBurger}>burger</span>
                <span className={styles.lineaBase} ref={lineaBaseRef} aria-hidden="true" />
              </span>
            </h1>
            <p className={styles.intro} ref={introRef}>
              {t('nosotros.intro')}
            </p>
          </div>
        </section>

        <section className={styles.ingredientes}>
          <div
            ref={lienzoRef}
            className={styles.lienzo}
            style={lienzo ? { '--solape': `${solape}px`, aspectRatio: `${lienzo.LIENZO.ancho} / ${lienzo.LIENZO.alto}` } : undefined}
          >
          {lienzo && caminoSvg}
          {INGREDIENTES.map((item, i) => (
            <article
              key={tx(item.titulo, 'es')}
              ref={el => { filasRef.current[i] = el }}
              className={`${styles.fila} ${i % 2 === 0 ? styles.filaDerecha : ''}`}
              style={{
                '--desplaz': `${RITMO[i].x}vw`,
                '--giro': `${RITMO[i].giro}deg`,
                '--hueco': `${RITMO[i].hueco}rem`,
                ...(lienzo && {
                  '--texto-x': pct(filas[i].texto.x, lienzo.LIENZO.ancho),
                  '--texto-y': pct(filas[i].texto.y, lienzo.LIENZO.alto),
                  '--texto-ancho': pct(filas[i].texto.ancho, lienzo.LIENZO.ancho),
                  '--foto-x': pct(filas[i].foto.x, lienzo.LIENZO.ancho),
                  '--foto-y': pct(filas[i].foto.y, lienzo.LIENZO.alto),
                  '--texto-giro': `${filas[i].texto.giro}deg`,
                  '--foto-giro': `${filas[i].foto.giro}deg`,
                  ...(filas[i].foto.ancho && { '--foto-ancho': pct(filas[i].foto.ancho, lienzo.LIENZO.ancho) }),
                }),
              }}
            >
              <img
                src={item.img}
                alt={tx(item.alt, idioma)}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                className={styles.foto}
              />
              <div className={styles.info} data-alinear={filas?.[i].texto.alinear}>
                <h2 className={styles.nombre}>{tx(item.titulo, idioma)}</h2>
                <p className={styles.texto}>{tx(item.texto, idioma)}</p>
                {item.productor && (
                  <p className={styles.productor}>
                    {item.productor.url
                      ? <a href={item.productor.url} target="_blank" rel="noopener noreferrer">{tx(item.productor.nombre, idioma)}</a>
                      : tx(item.productor.nombre, idioma)}
                  </p>
                )}
                <div className={styles.encuentras}>
                  <span className={styles.encuentrasLabel}>{tx(item.encuentras, idioma)}:</span>
                  <ul className={styles.burgers}>
                    {item.burgers.map((burger, j) => (
                      <li key={j} className={styles.burger}>{tx(burger, idioma)}</li>
                    ))}
                  </ul>
                  {item.nota && <span className={styles.nota}>{tx(item.nota, idioma)}</span>}
                </div>
              </div>
            </article>
          ))}
          </div>
        </section>

        <div ref={cartaRef} className={styles.carta}>
          <SeccionCarta />
        </div>

        {!lienzo && caminoSvg}
      </div>

      <Footer />
    </main>
  )
}
