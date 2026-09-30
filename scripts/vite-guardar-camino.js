// Solo en desarrollo: el botón "Guardar en el proyecto" del modo edición del camino (/nosotros?editar-camino)
// escribe aquí el trazado y las posiciones en caminoEscritorio.js o caminoMovil.js, según desde dónde se edite.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export const DESTINOS = {
  escritorio: { archivo: 'caminoEscritorio.js', ancho: 1440, nombre: 'escritorio (1024px o más)' },
  movil: { archivo: 'caminoMovil.js', ancho: 390, nombre: 'móvil (768px o menos)' },
}
const LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/
const ALINEACIONES = ['izquierda', 'derecha']

const num = v => typeof v === 'number' && Number.isFinite(v)
const esPieza = p => p && num(p.x) && num(p.y) && num(p.giro)

function validar({ destino, camino, filas, nodos }) {
  return Object.hasOwn(DESTINOS, destino)
    && typeof camino === 'string' && camino.length < 50000 && /^M[\d\s.,eECcLlMmSsQqTtHhVvZz-]+$/.test(camino)
    && Array.isArray(filas) && filas.length < 50
    && filas.every(f => esPieza(f.texto) && num(f.texto.ancho) && ALINEACIONES.includes(f.texto.alinear)
      && esPieza(f.foto) && (f.foto.ancho === undefined || num(f.foto.ancho)))
    && Array.isArray(nodos) && nodos.length < 50 && nodos.every(n => num(n.x) && num(n.y))
}

const r = n => Math.round(n * 10) / 10
const ORDEN = ['x', 'y', 'ancho', 'giro', 'alinear']
const pieza = p => ORDEN.filter(k => k in p).map(k => `${k}: ${typeof p[k] === 'string' ? `'${p[k]}'` : r(p[k])}`).join(', ')

export function generar({ destino, camino, filas, nodos }) {
  const { ancho, nombre } = DESTINOS[destino]
  const numeros = camino.match(/-?\d*\.?\d+(?:e-?\d+)?/gi).map(Number)
  // El lienzo acaba donde acaba el camino: justo encima de la carta.
  const alto = Math.ceil(numeros[numeros.length - 1])
  return `// Lienzo del camino en ${nombre}: medidas en unidades de un ancho de ${ancho}; todo escala con el ancho de
// pantalla. y = 0 es el horizonte del hero. Se edita en /nosotros?editar-camino (solo en desarrollo) y se guarda con
// "Guardar en el proyecto", que reescribe este archivo.
export const LIENZO = { ancho: ${ancho}, alto: ${alto} }

export const CAMINO = '${camino}'

// Posición de cada tarjeta: su texto (esquina superior izquierda, ancho, giro y alineación) y su foto (esquina superior
// izquierda, giro y, si se ha cambiado, ancho), por separado.
export const FILAS = [
${filas.map(f => `  { texto: { ${pieza(f.texto)} }, foto: { ${pieza(f.foto)} } },`).join('\n')}
]

// Dónde va cada punto verde; se ajusta solo al punto más cercano del camino.
export const NODOS = [${nodos.map(n => `{ x: ${r(n.x)}, y: ${r(n.y)} }`).join(', ')}]
`
}

export default function guardarCamino() {
  return {
    name: 'guardar-camino',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__guardar-camino', (req, res) => {
        const origen = req.headers.origin ? new URL(req.headers.origin).host : ''
        // Solo desde este equipo: se rechaza lo que llegue por ngrok u otra web.
        if (req.method !== 'POST' || !LOCAL.test(req.headers.host ?? '') || !LOCAL.test(origen)) {
          res.statusCode = 403
          res.end('No permitido')
          return
        }
        let cuerpo = ''
        req.on('data', trozo => {
          cuerpo += trozo
          if (cuerpo.length > 200000) req.destroy()
        })
        req.on('end', () => {
          try {
            const datos = JSON.parse(cuerpo)
            if (!validar(datos)) throw new Error('Datos no válidos')
            const archivo = fileURLToPath(new URL(`../src/pages/Nosotros/${DESTINOS[datos.destino].archivo}`, import.meta.url))
            writeFileSync(archivo, generar(datos))
            res.end('ok')
          } catch (error) {
            res.statusCode = 400
            res.end(error.message)
          }
        })
      })
    },
  }
}
