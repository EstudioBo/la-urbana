import { useEffect } from 'react'

// Las letras del título caen desde el borde superior de la sección cuando esta llega a media pantalla
export function useLetrasCaen(seccionRef, tituloRef, selectorLetra) {
  useEffect(() => {
    const seccion = seccionRef.current
    const titulo = tituloRef.current
    if (!seccion || !titulo) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let cancelado = false
    let limpiar = () => {}

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelado) return
      gsap.registerPlugin(ScrollTrigger)
      const tween = gsap.from(titulo.querySelectorAll(selectorLetra), {
        yPercent: -140,
        rotation: () => gsap.utils.random(-35, 35),
        duration: 1.1,
        ease: 'back.out(1.6)',
        stagger: { each: 0.045, from: 'random' },
        scrollTrigger: { trigger: seccion, start: 'top 55%', once: true },
      })
      limpiar = () => { tween.scrollTrigger?.kill(); tween.kill() }
    })

    return () => { cancelado = true; limpiar() }
  }, [seccionRef, tituloRef, selectorLetra])
}
