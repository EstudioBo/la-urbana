import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

// Altura de la pantalla (fracción) por la que va la punta de la línea mientras se hace scroll.
const PUNTA = 0.8
// Distancia entre muestras del camino, en unidades del svg.
const MUESTRA = 6

function muestrear(path) {
  const total = path.getTotalLength()
  const n = Math.max(2, Math.ceil(total / MUESTRA))
  const puntos = []
  let yMax = -Infinity
  for (let i = 0; i <= n; i++) {
    const largo = (total * i) / n
    const p = path.getPointAtLength(largo)
    yMax = Math.max(yMax, p.y)
    puntos.push({ largo, x: p.x, y: p.y, yMax })
  }
  return { total, puntos }
}

// Largo de línea dibujado para que la punta no pase de la altura y (el camino sube y baja: se usa el máximo acumulado).
function largoHasta(puntos, y) {
  let a = 0
  let b = puntos.length - 1
  if (puntos[0].yMax > y) return 0
  while (a < b) {
    const m = Math.ceil((a + b) / 2)
    if (puntos[m].yMax <= y) a = m
    else b = m - 1
  }
  return puntos[a].largo
}

function ajustarAlCamino(puntos, objetivos) {
  return objetivos.map(o => {
    const cerca = puntos.reduce((mejor, p) => (Math.hypot(p.x - o.x, p.y - o.y) < Math.hypot(mejor.x - o.x, mejor.y - o.y) ? p : mejor))
    return { x: cerca.x, y: cerca.y, largo: cerca.largo }
  })
}

// Dibuja el camino (pathRef) a medida que se hace scroll y muestra cada punto verde cuando la línea llega a él;
// si el punto lleva data-fila, llama a revelar(fila) para que aparezca su tarjeta.
// objetivos: dónde van los puntos; se ajustan al punto más cercano del camino. Con dibujoCompleto (modo edición)
// la línea se muestra entera. Devuelve los puntos ajustados y remedir(), para cuando el trazado cambia en el editor.
export function useCaminoDibujado({ pathRef, nodosRef, objetivos, clave, claseNodoVisible, dibujoCompleto, revelar }) {
  const [nodos, setNodos] = useState([])
  const muestras = useRef(null)
  const objetivosActuales = useRef(objetivos)
  const repintar = useRef(() => {})
  const revelarActual = useRef(revelar)
  const claveObjetivos = JSON.stringify(objetivos)

  useLayoutEffect(() => {
    objetivosActuales.current = objetivos
    revelarActual.current = revelar
  })

  const remedir = useCallback(() => {
    const path = pathRef.current
    if (!path) return
    muestras.current = muestrear(path)
    setNodos(ajustarAlCamino(muestras.current.puntos, objetivosActuales.current))
  }, [pathRef])

  useLayoutEffect(remedir, [clave, claveObjetivos, remedir])

  useEffect(() => {
    const path = pathRef.current
    if (!path || !muestras.current) return
    const svg = path.ownerSVGElement
    const { total, puntos } = muestras.current
    let cancelado = false
    let limpiar = () => {}

    path.style.strokeDasharray = `${total} ${total}`
    const estado = { largo: 0 }
    const pintar = largo => {
      path.style.strokeDashoffset = total - largo
      nodosRef.current?.querySelectorAll('[data-largo]').forEach(n => {
        const alcanzado = Number(n.dataset.largo) <= largo + 1
        n.classList.toggle(claseNodoVisible, alcanzado)
        if (alcanzado && n.dataset.fila) revelarActual.current(Number(n.dataset.fila))
      })
    }
    repintar.current = () => pintar(estado.largo)
    const objetivo = () => {
      const caja = svg.getBoundingClientRect()
      const escala = svg.viewBox.baseVal.height / caja.height
      return largoHasta(puntos, (window.innerHeight * PUNTA - caja.top) * escala)
    }

    if (dibujoCompleto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      estado.largo = Infinity
      pintar(total)
      return undefined
    }

    estado.largo = objetivo()
    pintar(estado.largo)
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelado) return
      gsap.registerPlugin(ScrollTrigger)
      const seguir = gsap.quickTo(estado, 'largo', { duration: 0.6, ease: 'power3.out', onUpdate: () => pintar(estado.largo) })
      const trigger = ScrollTrigger.create({
        trigger: svg,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: () => seguir(objetivo()),
        onRefresh: () => seguir(objetivo()),
      })
      limpiar = () => { trigger.kill(); seguir.tween?.kill() }
    })
    return () => { cancelado = true; limpiar() }
  }, [clave]) // eslint-disable-line react-hooks/exhaustive-deps -- se rehace solo cuando cambia el camino

  // Los puntos se pintan después de medir el camino: se les aplica el estado actual del dibujo.
  useEffect(() => { repintar.current() }, [nodos])

  return { nodos, remedir }
}
