import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import pepinillo from '../../assets/images/404/pepinillo.svg'
import tomate from '../../assets/images/404/tomate.svg'
import queso from '../../assets/images/404/queso.svg'
import lechuga from '../../assets/images/404/lechuga.svg'
import cebolla from '../../assets/images/404/cebolla.svg'
import bacon from '../../assets/images/404/bacon.svg'
import imgEscoba from '../../assets/images/404/escoba.svg'
import styles from './NoEncontrada.module.css'

const INGREDIENTES = [pepinillo, tomate, queso, lechuga, cebolla, bacon]
const POR_CLIC = 8
const TAM_MINIMO = 40
const TAM_MAXIMO = 72
const MAXIMO = 90
const GRAVEDAD = 2200
const REBOTE = 0.35
// El suelo se divide en franjas: lo que cae se apila sobre lo que ya hay en su franja
const FRANJA = 24
// Giro de la hamburguesa, en grados por segundo
const GIRO_BASE = 26
const GIRO_MAXIMO = 720
// Cuánto tarda en frenar tras soltar el ratón y cuánto le cuesta seguir al cursor (más alto = más rápido)
const FRENADA = 1.2
const SEGUIMIENTO = 5
// La escoba recorre el borde de abajo a esta velocidad (px/s) y a esta distancia de los bordes
const VELOCIDAD_ESCOBA = 650
// En móvil el recorrido es corto: escoba y piezas van más despacio para que se vea el barrido
const LENTITUD_MOVIL = 0.4
const MARGEN_ESCOBA = 20

const azar = (min, max) => min + Math.random() * (max - min)

// Avanza una pieza `dt` segundos. Devuelve true cuando se ha quedado quieta en el montón
function avanzar(p, dt, ancho, alto, montones, techo) {
  const r = p.tam / 2
  const desde = Math.max(0, Math.floor((p.x - r) / FRANJA))
  const hasta = Math.floor((p.x + r) / FRANJA)
  let altura = 0
  for (let i = desde; i <= hasta; i++) altura = Math.max(altura, montones[i] ?? 0)
  const suelo = alto - altura

  p.vy += GRAVEDAD * dt
  p.x += p.vx * dt
  p.y += p.vy * dt
  p.giro += p.vGiro * dt

  if (p.x - r < 0 || p.x + r > ancho) {
    p.x = Math.min(Math.max(p.x, r), ancho - r)
    p.vx *= -0.5
  }
  if (p.y + r < suelo) return false

  p.y = suelo - r
  p.vy *= -REBOTE
  p.vx *= 0.6
  p.vGiro *= 0.5
  if (Math.abs(p.vy) > 80) return false

  // El montón no sube más que `techo`: a partir de ahí las piezas se superponen
  const nueva = Math.min(altura + p.tam * 0.35, techo)
  for (let i = desde; i <= hasta; i++) montones[i] = Math.max(montones[i] ?? 0, nueva)
  return true
}

const transformar = (p) => `translate(${p.x - p.tam / 2}px, ${p.y - p.tam / 2}px) rotate(${p.giro}deg)`

export default function HamburguesaCero({ etiqueta, textoClic, textoBarrer, limiteRef }) {
  const [piezas, setPiezas] = useState([])
  const [barriendo, setBarriendo] = useState(false)
  const botonRef = useRef(null)
  const armarioRef = useRef(null)
  const iconoRef = useRef(null)
  // objetivo: ángulo hacia el cursor mientras está encima; null cuando gira solo
  const giro = useRef({ angulo: 0, velocidad: GIRO_BASE, objetivo: null })
  const escobaViajeRef = useRef(null)
  const todas = useRef(new Map())
  const enVuelo = useRef(new Map())
  const nodos = useRef(new Map())
  const montones = useRef([])
  const techo = useRef(0)
  const frame = useRef(null)
  const contador = useRef(0)

  const paso = useCallback(function paso(ahora, antes = ahora) {
    const dt = Math.min((ahora - antes) / 1000, 0.032)
    enVuelo.current.forEach((p, id) => {
      const quieta = avanzar(p, dt, window.innerWidth, window.innerHeight, montones.current, techo.current)
      const nodo = nodos.current.get(id)
      if (nodo) nodo.style.transform = transformar(p)
      if (quieta) enVuelo.current.delete(id)
    })
    frame.current = enVuelo.current.size
      ? requestAnimationFrame((siguiente) => paso(siguiente, ahora))
      : null
  }, [])

  const vaciar = useCallback(() => {
    cancelAnimationFrame(frame.current)
    frame.current = null
    enVuelo.current.clear()
    todas.current.clear()
    montones.current = []
    setPiezas([])
    setBarriendo(false)
  }, [])

  useEffect(() => {
    let anchoAnterior = window.innerWidth
    // En móvil la barra del navegador cambia el alto al hacer scroll; solo se vacía si cambia el ancho
    const alRedimensionar = () => {
      if (window.innerWidth === anchoAnterior) return
      anchoAnterior = window.innerWidth
      vaciar()
    }
    window.addEventListener('resize', alRedimensionar)
    return () => {
      window.removeEventListener('resize', alRedimensionar)
      cancelAnimationFrame(frame.current)
    }
  }, [vaciar])

  useEffect(() => {
    const base = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : GIRO_BASE
    let frameGiro
    const girar = (ahora, antes = ahora) => {
      const dt = Math.min((ahora - antes) / 1000, 0.05)
      const g = giro.current
      if (g.objetivo !== null) {
        const nuevo = g.angulo + (g.objetivo - g.angulo) * (1 - Math.exp(-SEGUIMIENTO * dt))
        if (dt) g.velocidad = Math.max(-GIRO_MAXIMO, Math.min(GIRO_MAXIMO, (nuevo - g.angulo) / dt))
        g.angulo = nuevo
      } else {
        // Inercia: la velocidad que llevaba vuelve poco a poco a la de base
        g.velocidad = base + (g.velocidad - base) * Math.exp(-FRENADA * dt)
        g.angulo += g.velocidad * dt
      }
      iconoRef.current.style.transform = `rotate(${g.angulo}deg)`
      frameGiro = requestAnimationFrame((siguiente) => girar(siguiente, ahora))
    }
    frameGiro = requestAnimationFrame((ahora) => girar(ahora))
    return () => cancelAnimationFrame(frameGiro)
  }, [])

  // El objetivo se calcula respecto al ángulo actual para no dar una vuelta entera al cruzar de 180° a -180°
  const girarConRaton = (e) => {
    if (e.pointerType !== 'mouse') return
    const caja = botonRef.current.getBoundingClientRect()
    const haciaCursor = Math.atan2(e.clientY - (caja.top + caja.height / 2), e.clientX - (caja.left + caja.width / 2)) * 180 / Math.PI + 90
    const g = giro.current
    g.objetivo = g.angulo + ((((haciaCursor - g.angulo) % 360) + 540) % 360) - 180
  }

  const soltarGiro = () => {
    giro.current.objetivo = null
  }

  // La escoba sale del armario y recorre el borde de abajo hasta la esquina derecha;
  // cada pieza sale volando cuando la escoba llega a su altura.
  // useLayoutEffect: la escoba se coloca en el armario antes de pintarse, sin asomar en la esquina de arriba
  useLayoutEffect(() => {
    if (!barriendo) return
    const escoba = escobaViajeRef.current
    const ancho = window.innerWidth
    const alto = window.innerHeight
    const tam = escoba.offsetWidth
    const armario = armarioRef.current.getBoundingClientRect()
    const desdeX = armario.left + (armario.width - tam) / 2
    const hastaX = ancho - tam - MARGEN_ESCOBA
    const y = alto - escoba.offsetHeight - MARGEN_ESCOBA
    const ritmo = ancho < 640 ? LENTITUD_MOVIL : 1
    const duracion = Math.max(hastaX - desdeX, 0) / (VELOCIDAD_ESCOBA * ritmo)
    const barridas = new Set()
    let frameEscoba
    let espera
    let inicio
    escoba.style.transform = `translate(${desdeX}px, ${y}px)`

    const pasoEscoba = (ahora, antes = ahora) => {
      inicio ??= ahora
      const dt = Math.min((ahora - antes) / 1000, 0.032)
      const t = (ahora - inicio) / 1000
      const x = desdeX + (hastaX - desdeX) * (duracion ? Math.min(t / duracion, 1) : 1)
      escoba.style.transform = `translate(${x}px, ${y}px)`

      todas.current.forEach((p, id) => {
        if (!barridas.has(id) && p.x - p.tam / 2 < x + tam * 0.8) {
          barridas.add(id)
          p.vx = azar(900, 1500) * ritmo
          p.vy = azar(-700, -300) * Math.sqrt(ritmo)
          p.vGiro = azar(360, 900)
        }
        if (!barridas.has(id)) return
        p.vy += GRAVEDAD * dt
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.giro += p.vGiro * dt
        const nodo = nodos.current.get(id)
        if (nodo) nodo.style.transform = transformar(p)
      })

      if (t < duracion) {
        frameEscoba = requestAnimationFrame((siguiente) => pasoEscoba(siguiente, ahora))
        return
      }
      // En la esquina se desvanece (transición de .escobaViaje) y todo vuelve al principio
      escoba.style.opacity = 0
      espera = setTimeout(vaciar, 400)
    }

    frameEscoba = requestAnimationFrame((ahora) => pasoEscoba(ahora))
    return () => {
      cancelAnimationFrame(frameEscoba)
      clearTimeout(espera)
    }
  }, [barriendo, vaciar])

  const barrer = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return vaciar()
    // Las que aún caen se quedan donde están: a partir de aquí las mueve la escoba
    cancelAnimationFrame(frame.current)
    frame.current = null
    enVuelo.current.clear()
    setBarriendo(true)
  }

  const soltar = () => {
    if (barriendo) return
    if (!montones.current.length) {
      // El armario de la escoba hace de suelo: lo que cae encima se queda en su tejado
      const armario = armarioRef.current
      const tejado = window.innerHeight - armario.offsetTop
      for (let i = Math.floor(armario.offsetLeft / FRANJA); i <= (armario.offsetLeft + armario.offsetWidth) / FRANJA; i++) {
        montones.current[i] = tejado
      }
    }
    const escala = window.innerWidth < 640 ? 0.7 : 1
    // El montón (contando lo que asoma la pieza más grande) se queda por debajo de los botones; como mínimo, 48px
    const alto = window.innerHeight
    const bajoBotones = alto - limiteRef.current.getBoundingClientRect().bottom - 16 - TAM_MAXIMO * escala
    techo.current = Math.max(48, Math.min(alto * 0.3, bajoBotones))
    const caja = botonRef.current.getBoundingClientRect()
    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nuevas = Array.from({ length: POR_CLIC }, () => {
      const p = {
        id: contador.current++,
        src: INGREDIENTES[Math.floor(Math.random() * INGREDIENTES.length)],
        tam: Math.round(azar(TAM_MINIMO, TAM_MAXIMO) * escala),
        x: caja.left + caja.width / 2 + azar(-caja.width / 4, caja.width / 4),
        y: caja.top + caja.height / 2,
        vx: azar(-650, 650),
        vy: azar(-1400, -800),
        giro: azar(0, 360),
        vGiro: azar(-720, 720),
      }
      if (sinMovimiento) {
        // Sin animación: se calcula dónde acabaría y aparece ya en el montón
        for (let i = 0; i < 600 && !avanzar(p, 1 / 60, window.innerWidth, window.innerHeight, montones.current, techo.current); i++);
      } else {
        enVuelo.current.set(p.id, p)
      }
      todas.current.set(p.id, p)
      return p
    })

    // Los ids son correlativos: las piezas más antiguas que MAXIMO desaparecen
    todas.current.forEach((_, id) => {
      if (id >= contador.current - MAXIMO) return
      enVuelo.current.delete(id)
      todas.current.delete(id)
    })
    setPiezas((anteriores) => [...anteriores, ...nuevas].slice(-MAXIMO))
    if (!sinMovimiento && !frame.current) frame.current = requestAnimationFrame((ahora) => paso(ahora))
  }

  return (
    <>
      <button
        ref={botonRef}
        type="button"
        className={styles.cero}
        onClick={soltar}
        onPointerEnter={girarConRaton}
        onPointerMove={girarConRaton}
        onPointerLeave={soltarGiro}
        aria-label={etiqueta}
      >
        <span ref={iconoRef} className={styles.ceroIcono}/>
        <span className={styles.ceroClic} aria-hidden="true">{textoClic}</span>
      </button>
      <div className={styles.lluvia} aria-hidden="true">
        {piezas.map((p) => (
          <img
            key={p.id}
            ref={(nodo) => {
              if (nodo) nodos.current.set(p.id, nodo)
              else nodos.current.delete(p.id)
            }}
            src={p.src}
            alt=""
            width={p.tam}
            height={p.tam}
            className={styles.pieza}
            style={{ transform: transformar(p) }}
          />
        ))}
      </div>
      {/* Siempre en el DOM para poder medirlo; solo se ve con el primer clic */}
      <div ref={armarioRef} className={`${styles.armario} ${piezas.length ? styles.armarioVisible : ''}`}>
        <button
          type="button"
          className={`${styles.escoba} ${barriendo ? styles.escobaActiva : ''}`}
          onClick={barrer}
          disabled={barriendo}
          aria-label={textoBarrer}
        >
          <img src={imgEscoba} alt="" width="96" height="96" className={styles.escobaImg}/>
        </button>
      </div>
      {barriendo && (
        <div ref={escobaViajeRef} className={styles.escobaViaje} aria-hidden="true">
          <img src={imgEscoba} alt="" width="96" height="96"/>
        </div>
      )}
    </>
  )
}
