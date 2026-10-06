import { useSyncExternalStore } from 'react'

// Elección de cookies del visitante. Se guarda en localStorage con fecha y versión para poder
// demostrar el consentimiento. Subir VERSION cuando cambien las categorías o los servicios: vuelve a preguntar
const CLAVE = 'lu_consentimiento'
const VERSION = 1
const CADUCIDAD_MS = 365 * 24 * 60 * 60 * 1000

const oyentes = new Set()
let consentimiento = leer()
let preferenciasAbiertas = false

function leer() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE))
    if (guardado?.version !== VERSION) return null
    if (Date.now() - new Date(guardado.fecha).getTime() > CADUCIDAD_MS) return null
    return guardado
  } catch {
    return null
  }
}

function avisar() {
  oyentes.forEach((oyente) => oyente())
}

// Google Consent Mode v2: todo denegado hasta que el visitante acepte las analíticas.
// En el prerenderizado (Node) no hay window: gtag no hace nada.
const enNavegador = typeof window !== 'undefined'
if (enNavegador) window.dataLayer = window.dataLayer || []
function gtag() {
  if (enNavegador) window.dataLayer.push(arguments)
}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
})

function actualizarConsentMode() {
  gtag('consent', 'update', {
    analytics_storage: consentimiento?.analiticas ? 'granted' : 'denied',
  })
}
if (consentimiento) actualizarConsentMode()

export function guardarConsentimiento({ analiticas, terceros }) {
  consentimiento = { version: VERSION, fecha: new Date().toISOString(), analiticas, terceros }
  try {
    localStorage.setItem(CLAVE, JSON.stringify(consentimiento))
  } catch {
    // sin almacenamiento (modo privado estricto): la elección vale solo para esta visita
  }
  preferenciasAbiertas = false
  actualizarConsentMode()
  avisar()
}

export function abrirPreferencias() {
  preferenciasAbiertas = true
  avisar()
}

export function cerrarPreferencias() {
  preferenciasAbiertas = false
  avisar()
}

function suscribir(oyente) {
  oyentes.add(oyente)
  return () => oyentes.delete(oyente)
}

// `consentimiento` es null mientras el visitante no haya elegido. El HTML prerenderizado
// se genera siempre sin consentimiento y React lo actualiza al hidratar.
export function useConsentimiento() {
  return useSyncExternalStore(suscribir, () => consentimiento, () => null)
}

export function usePreferenciasAbiertas() {
  return useSyncExternalStore(suscribir, () => preferenciasAbiertas, () => false)
}
