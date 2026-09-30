// Modo edición del camino (solo en desarrollo): el trazado se edita arrastrando sus puntos (GSAP MotionPathHelper);
// textos, fotos y puntos verdes se arrastran a su sitio (GSAP Draggable); cada texto y foto tiene un tirador para
// girarlo y otro para cambiar su tamaño, y cada texto un botón para alinearlo a izquierda o derecha. "Guardar en el proyecto" escribe todo en caminoEscritorio.js.
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { MotionPathHelper } from 'gsap/MotionPathHelper'
import { Draggable } from 'gsap/Draggable'
import { guardarBorrador, descartarBorrador } from './borradorCamino'

gsap.registerPlugin(MotionPathPlugin, MotionPathHelper, Draggable)

const ESTILOS = `
  svg[data-editando] { pointer-events: none !important; z-index: 10 !important; }
  svg[data-editando] * { pointer-events: visiblePainted; }
  /* Con la vista de móvil de F12 el ratón se comporta como un dedo: arrastrar haría scroll en vez de mover.
     Dentro del lienzo se desactiva (se sigue pudiendo desplazar con la rueda). */
  [data-lienzo-editando], [data-lienzo-editando] * { touch-action: none; }
  [data-arrastrable] { cursor: move; outline: 2px dashed rgba(255, 255, 255, 0.6); outline-offset: 10px; transition: none !important; animation: none !important; opacity: 1 !important; }
  .asa-editor {
    position: absolute; z-index: 12; width: 24px; height: 24px; margin: -12px 0 0 -12px;
    border-radius: 50%; background: #fff; border: 3px solid #f09b18; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    touch-action: none;
  }
  .asa-editor[data-tipo="giro"] { cursor: grab; }
  .asa-editor[data-tipo="ancho"] { cursor: ew-resize; border-radius: 4px; width: 14px; height: 36px; margin: -18px 0 0 -7px; }
  .asa-editor[data-tipo="alinear"] {
    width: auto; height: auto; margin: 0; padding: 4px 10px; border-radius: 6px; border-width: 2px;
    font: 700 12px sans-serif; color: #0a2e0a; cursor: pointer; white-space: nowrap;
  }
  [data-lienzo-editando][data-alejado] { transform: scale(0.75); transform-origin: 50% 0; }
  [data-lienzo-editando][data-alejado]::before {
    content: ''; position: absolute; inset: 0; z-index: 13; pointer-events: none;
    border-inline: 3px dashed #e53935;
  }
  [data-editando-camino] [data-arrastrable]:not(g), [data-editando-camino] .asa-editor { pointer-events: none !important; opacity: 0.25 !important; }
  .boton-editor { padding: 10px 20px; border-radius: 8px; background: #0a2e0a; color: #fff; font: 700 16px sans-serif; cursor: pointer; }
  @media (max-width: 768px) { .boton-editor { padding: 6px 10px; font-size: 12px; } }
`
const CLAVE_ALEJADO = 'la-urbana:editor-alejado'
// Ancho mínimo al redimensionar, en unidades del lienzo.
const ANCHO_MINIMO = { texto: 200, foto: 80 }

// Arrastre con puntero: mover(evento, inicio) mientras se arrastra y soltar() al acabar.
function arrastrarCon(asa, empezar) {
  asa.addEventListener('pointerdown', e => {
    e.preventDefault()
    e.stopPropagation()
    const { mover, soltar } = empezar(e)
    const alMover = ev => mover(ev)
    const alSoltar = () => {
      window.removeEventListener('pointermove', alMover)
      soltar()
    }
    window.addEventListener('pointermove', alMover)
    window.addEventListener('pointerup', alSoltar, { once: true })
  })
}

// piezas: textos y fotos ({ el, i, tipo }). alCambiarPieza(i, tipo, anterior => cambios) guarda posición, giro o
// ancho en unidades del lienzo. estadoActual() devuelve { filas, nodos } para guardar.
// nodosSvg: svg de los puntos verdes; alMoverNodo(i, { x, y }) recibe dónde se soltó el punto (se ajusta al camino).
// claseVisible: se aplica a todas las piezas para que no arrastren el desplazamiento de su animación de entrada.
// version: 'escritorio' o 'movil'; cada una tiene su borrador y su archivo.
export function iniciarEditor({
  version, path, lienzo, piezas, claseVisible, nodosSvg, anchoLienzo,
  estadoActual, alCambiarCamino, alCambiarPieza, alMoverNodo,
}) {
  const svg = path.ownerSVGElement
  const escala = () => anchoLienzo / lienzo.clientWidth
  // Con la vista alejada el lienzo se ve más pequeño de lo que mide: lo que se lee en pantalla se divide por esto.
  const zoom = () => lienzo.getBoundingClientRect().width / lienzo.offsetWidth
  const estilo = document.createElement('style')
  estilo.textContent = ESTILOS
  document.head.appendChild(estilo)
  svg.setAttribute('data-editando', '')
  lienzo.setAttribute('data-lienzo-editando', '')
  nodosSvg.setAttribute('data-editando', '')
  nodosSvg.style.setProperty('z-index', '11', 'important')
  path.style.strokeDasharray = 'none'

  let editor
  const cambioCamino = () => {
    guardarBorrador(version, { camino: editor.getString() })
    alCambiarCamino()
  }
  editor = MotionPathHelper.editPath(path, { onRelease: cambioCamino, onDeleteAnchor: cambioCamino, onUndo: cambioCamino })

  const asas = document.createElement('div')
  lienzo.appendChild(asas)
  const colocaciones = []

  const arrastres = piezas.map(({ el, i, tipo }) => {
    el.classList.add(claseVisible)
    el.setAttribute('data-arrastrable', '')
    el.setAttribute('draggable', 'false')

    // Girar: se arrastra el tirador redondo alrededor del centro de la pieza (con Mayúsculas, de 15 en 15 grados).
    const giro = document.createElement('div')
    giro.className = 'asa-editor'
    giro.dataset.tipo = 'giro'
    giro.title = 'Girar (Mayús: de 15 en 15°)'
    asas.appendChild(giro)
    arrastrarCon(giro, e => {
      const r = el.getBoundingClientRect()
      const centro = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
      const angulo = ev => Math.atan2(ev.clientY - centro.y, ev.clientX - centro.x) * (180 / Math.PI)
      const inicio = angulo(e)
      const giroInicial = Number(gsap.getProperty(el, 'rotation'))
      let grados = giroInicial
      return {
        mover: ev => {
          grados = giroInicial + angulo(ev) - inicio
          if (ev.shiftKey) grados = Math.round(grados / 15) * 15
          gsap.set(el, { rotation: grados })
        },
        soltar: () => alCambiarPieza(i, tipo, () => ({ giro: Math.round(grados * 10) / 10 })),
      }
    })

    // Alineación del texto: el botón bajo el bloque alterna todo su contenido entre izquierda y derecha.
    let alinear = null
    if (tipo === 'texto') {
      alinear = document.createElement('button')
      alinear.className = 'asa-editor'
      alinear.dataset.tipo = 'alinear'
      const rotulo = () => { alinear.textContent = el.dataset.alinear === 'derecha' ? 'Alinear a la izquierda' : 'Alinear a la derecha' }
      rotulo()
      alinear.onclick = e => {
        e.stopPropagation()
        const nueva = el.dataset.alinear === 'derecha' ? 'izquierda' : 'derecha'
        el.dataset.alinear = nueva
        rotulo()
        alCambiarPieza(i, tipo, () => ({ alinear: nueva }))
      }
      asas.appendChild(alinear)
    }

    // Ancho: se arrastra el tirador del lado derecho. El texto se recoloca solo; la foto mantiene su proporción.
    const ancho = document.createElement('div')
    ancho.className = 'asa-editor'
    ancho.dataset.tipo = 'ancho'
    ancho.title = tipo === 'texto' ? 'Ancho del texto' : 'Tamaño de la foto'
    asas.appendChild(ancho)
    arrastrarCon(ancho, e => {
      const inicio = e.clientX
      const anchoInicial = el.offsetWidth
      let px = anchoInicial
      return {
        mover: ev => {
          px = Math.max(ANCHO_MINIMO[tipo] / escala(), anchoInicial + (ev.clientX - inicio) / zoom())
          el.style.width = `${px}px`
        },
        soltar: () => {
          alCambiarPieza(i, tipo, () => ({ ancho: Math.round(px * escala()) }))
          requestAnimationFrame(() => { el.style.width = '' })
        },
      }
    })
    colocaciones.push({ el, giro, ancho, alinear })

    const inicio = {}
    return Draggable.create(el, {
      type: 'x,y',
      onPress() { Object.assign(inicio, { x: this.x, y: this.y }) },
      onDragEnd() {
        const dx = (this.x - inicio.x) * escala()
        const dy = (this.y - inicio.y) * escala()
        alCambiarPieza(i, tipo, p => ({ x: Math.round(p.x + dx), y: Math.round(p.y + dy) }))
        gsap.set(el, { x: inicio.x, y: inicio.y })
      },
    })[0]
  })

  // Los tiradores siguen a su pieza en cada fotograma (arrastres, giros y cambios de ancho).
  let fotograma
  const colocarAsas = () => {
    const base = lienzo.getBoundingClientRect()
    const k = zoom()
    colocaciones.forEach(({ el, giro, ancho, alinear }) => {
      const r = el.getBoundingClientRect()
      giro.style.left = `${(r.left - base.left + r.width / 2) / k}px`
      giro.style.top = `${(r.top - base.top) / k - 28}px`
      ancho.style.left = `${(r.right - base.left) / k + 16}px`
      ancho.style.top = `${(r.top - base.top + r.height / 2) / k}px`
      if (alinear) {
        alinear.style.left = `${(r.left - base.left) / k}px`
        alinear.style.top = `${(r.bottom - base.top) / k + 16}px`
      }
    })
    fotograma = requestAnimationFrame(colocarAsas)
  }
  colocarAsas()

  const puntosVerdes = [...nodosSvg.querySelectorAll('[data-largo]')].map((g, i) => {
    g.setAttribute('data-arrastrable', '')
    return Draggable.create(g, {
      onDragEnd() {
        const m = nodosSvg.getScreenCTM().inverse()
        const e = this.pointerEvent
        const punto = new DOMPoint(e.clientX, e.clientY).matrixTransform(m)
        gsap.set(g, { x: 0, y: 0 })
        alMoverNodo(i, { x: Math.round(punto.x), y: Math.round(punto.y) })
      },
    })[0]
  })

  // El editor de GSAP solo inserta puntos entre dos existentes: este añade un tramo nuevo tras el último,
  // en la misma dirección en la que acaba el camino, para poder seguir dibujando.
  const alargar = () => {
    const d = editor.getString()
    const n = d.match(/-?\d*\.?\d+(?:e-?\d+)?/gi).map(Number)
    const [cx, cy, x, y] = n.slice(-4)
    const largo = Math.hypot(x - cx, y - cy)
    const [ux, uy] = largo > 1 ? [(x - cx) / largo, (y - cy) / largo] : [0, 1]
    const p = k => `${Math.round(x + ux * 200 * k)},${Math.round(y + uy * 200 * k)}`
    path.setAttribute('d', `${d} C ${p(1 / 3)} ${p(2 / 3)} ${p(1)}`)
    editor.init()
    cambioCamino()
  }

  const guardar = async b => {
    b.textContent = 'Guardando…'
    let respuesta
    try {
      respuesta = await fetch('/__guardar-camino', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ destino: version, camino: editor.getString(), ...estadoActual() }),
      })
    } catch {
      b.textContent = 'No guardado: el servidor no responde'
      return
    }
    if (!respuesta.ok) {
      b.textContent = `Error: ${await respuesta.text()}`
      return
    }
    descartarBorrador(version)
    b.textContent = '¡Guardado!'
  }

  const barra = document.createElement('div')
  barra.style.cssText = 'position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9999;display:flex;flex-wrap:wrap;justify-content:center;gap:8px;width:max-content;max-width:95vw'
  const boton = (texto, accion) => {
    const b = document.createElement('button')
    b.textContent = texto
    b.className = 'boton-editor'
    b.onclick = () => accion(b)
    barra.appendChild(b)
  }
  // La vista alejada se recuerda en la pestaña: el editor se reinicia al guardar y no debe perderse.
  const rotuloAlejar = () => (lienzo.hasAttribute('data-alejado') ? 'Tamaño real' : 'Alejar')
  lienzo.toggleAttribute('data-alejado', sessionStorage.getItem(CLAVE_ALEJADO) === 'si')
  boton(rotuloAlejar(), b => {
    sessionStorage.setItem(CLAVE_ALEJADO, lienzo.toggleAttribute('data-alejado') ? 'si' : 'no')
    b.textContent = rotuloAlejar()
  })
  boton('+ Punto al final', alargar)
  boton('Guardar en el proyecto', guardar)
  boton('Descartar cambios', () => {
    if (!window.confirm('¿Descartar tus cambios y volver a lo último guardado en el proyecto?')) return
    descartarBorrador(version)
    window.location.reload()
  })
  document.body.appendChild(barra)

  // Al pulsar el camino, textos y fotos se atenúan y dejan de poder tocarse, para editar el trazado sin tener que
  // apartarlos. Se vuelve a ellos pulsando fuera del camino o con Esc.
  const alPulsar = e => {
    if (barra.contains(e.target)) return
    lienzo.toggleAttribute('data-editando-camino', e.target === path || Boolean(e.target.closest?.('.path-editor')))
  }
  const alTeclear = e => { if (e.key === 'Escape') lienzo.removeAttribute('data-editando-camino') }
  window.addEventListener('pointerdown', alPulsar, true)
  window.addEventListener('keydown', alTeclear)

  return () => {
    window.removeEventListener('pointerdown', alPulsar, true)
    window.removeEventListener('keydown', alTeclear)
    lienzo.removeAttribute('data-editando-camino')
    lienzo.removeAttribute('data-alejado')
    cancelAnimationFrame(fotograma)
    editor.kill()
    ;[...arrastres, ...puntosVerdes].forEach(a => a.kill())
    document.querySelectorAll('[data-arrastrable]').forEach(el => el.removeAttribute('data-arrastrable'))
    asas.remove()
    barra.remove()
    estilo.remove()
    svg.removeAttribute('data-editando')
    lienzo.removeAttribute('data-lienzo-editando')
    nodosSvg.removeAttribute('data-editando')
    nodosSvg.style.removeProperty('z-index')
  }
}
