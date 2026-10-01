import { Hashtag, EnlaceExterno, EnlaceInterno, Figura, PostInstagram, PostsInstagram } from '../bloques'
import imgCartel from '../../../assets/images/urbana-style/xoan-forneas-ferido-meigas-dentro.webp'

export default function XoanForneas() {
  return (
    <>
      <p>
        Te dejan plantado en una cita. El día va regular. Pero todavía puede mejorar: una{' '}
        <EnlaceInterno to="/la-urbana-style/antollo-galego">Antollo Galego</EnlaceInterno> y a ver qué pasa.
      </p>
      <p>
        Así llega el personaje de Xoán Fórneas a La Urbana en «Meigas dentro», el quinto capítulo
        de <strong>Ferido: O Microdrama</strong>, la serie de vídeos que acompañó el lanzamiento de{' '}
        <EnlaceExterno href="https://music.apple.com/es/album/ferido-single/1851582689">su primer single como O Xoán</EnlaceExterno>. Y nosotros nos colamos en la historia con una de nuestras burgers.
      </p>
      <p>
        El actor y músico lucense creó esta webserie en gallego como antesala de <em>Ferido</em>,{' '}
        <EnlaceExterno href="https://www.elprogreso.es/articulo/a-chaira/xoan-forneas-lanza-primer-single-videoclip-rodado-castro-rei/202511261238061926977.html">su debut de pop electrónico</EnlaceExterno>. Pequeños capítulos que mezclan desamor, humor y situaciones
        inesperadas. En el nuestro hay una cita fallida, una parada para comer y unas meigas que
        conviene no perder de vista.
      </p>
      <p>
        Nos gusta que La Urbana sea también un lugar donde pasen estas cosas. Colaborar con artistas
        de aquí, dar espacio a sus historias y compartir esa forma de entender Galicia: creativa,
        contemporánea y con personalidad propia. Esta vez, de la mano de Xoán y formando parte de su
        ficción.
      </p>
      <p>La burger se llama Antollo Galego. Lo que viene después tendrás que verlo.</p>

      <PostsInstagram>
        <Figura
          img={imgCartel}
          alt="Cartel de Ferido: O Microdrama, capítulo 5, Meigas dentro, con tres mujeres mayores sentadas"
          entera
        />
        <PostInstagram codigo="DRXrOqTjNkF" />
      </PostsInstagram>

      <p><Hashtag>LaUrbanaStyle</Hashtag></p>
    </>
  )
}
