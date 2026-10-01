import { Hashtag, EnlaceExterno, Figura, Galeria, Reel, Reels } from '../bloques'
import imgMuralla from '../../../assets/images/urbana-style/cajas-verdes-lugo-muralla.webp'
import imgEstatuas from '../../../assets/images/urbana-style/cajas-verdes-lugo-estatuas.webp'
import imgCabeza from '../../../assets/images/urbana-style/cajas-verdes-escultura-cabeza.webp'
import imgHombreVerde from '../../../assets/images/urbana-style/cajas-verdes-hombre-verde.webp'
import imgSireno from '../../../assets/images/urbana-style/cajas-verdes-vigo-sireno.webp'

export default function EncuentraLaCajaVerde() {
  return (
    <>
      <Figura
        img={imgMuralla}
        alt="Caja verde de La Urbana apoyada en la muralla de Lugo, con un mural de un emperador romano al fondo"
        encuadre="50% 80%"
        primera
      />

      <p>
        Salir a dar una vuelta y volver con una burger gratis. Ese era el plan. Solo había que
        encontrar una de las cajas verdes que escondimos por la ciudad.
      </p>
      <p>
        En abril de 2024 estrenamos <Hashtag>EncuentraLaCajaVerde</Hashtag> en Lugo: diez cajas,
        diez premios y un personaje vestido de verde de pies a cabeza encargado de repartirlas por
        distintos rincones. Lo de pasar desapercibidos lo dejamos para otro día.
      </p>

      <h2>Encontrar, compartir, comer</h2>
      <p>
        La mecánica era sencilla: encontrar una caja, compartir una foto en stories mencionando a
        La Urbana e indicando dónde había aparecido. Nosotros enviábamos el vale por Instagram y
        quien la encontraba podía canjearlo por una burger gratis en nuestros locales de Lugo. Un
        paseo que podía acabar bastante mejor de lo previsto.
      </p>

      <Figura
        img={imgEstatuas}
        alt="Caja verde de La Urbana a los pies de una estatua de bronce en una plaza"
        encuadre="50% 15%"
      />

      <h2>Santiago, con lluvia incluida</h2>
      <p>
        En mayo llevamos la búsqueda a Santiago para celebrar nuestra apertura en As Cancelas. Nos
        recibió la lluvia, pero salimos igualmente a esconder las cajas por Compostela. Somos
        gallegos. Unas gotas no iban a estropearnos el plan.
      </p>

      <h2>Última parada: Vigo</h2>
      <p>
        La ruta terminó en Vigo en septiembre, con una nueva tanda de cajas verdes y la misma
        misión: salir, buscar y encontrar el premio.
      </p>

      <Galeria
        fotos={[
          { img: imgSireno, alt: 'Caja verde de La Urbana en la base de la escultura del Sireno, en Vigo', alta: true },
          { img: imgHombreVerde, alt: 'El hombrecillo verde de La Urbana sujetando una caja verde en un centro comercial' },
          { img: imgCabeza, alt: 'Caja verde de La Urbana escondida junto a una gran escultura de una cabeza tumbada', encuadre: '60% 70%' },
        ]}
      />

      <p>
        Tres ciudades y una excusa para jugar en la calle, sorprender a quien pasaba por allí y
        llevar nuestras burgers un poco más allá de los locales. Al más puro <Hashtag>LaUrbanaStyle</Hashtag>.
      </p>
      <p>
        La acción de Lugo también apareció en prensa:{' '}
        <EnlaceExterno href="https://www.elprogreso.es/articulo/lugo/urbana-esconde-ciudad-diez-cajas-verdes-sorpresa-regalos/202404201352141748862.html">
          El Progreso contó la búsqueda de nuestras diez cajas verdes
        </EnlaceExterno>.
      </p>

      <h2>Míralo en vídeo</h2>
      <Reels>
        <Reel codigo="C53ev4UNdDS" titulo="Lugo: arranca la búsqueda" />
        <Reel codigo="C55mYsXt5vH" titulo="Lugo: cajas por la ciudad" />
        <Reel codigo="C6_G-p8Nt9z" titulo="Santiago" />
        <Reel codigo="C_u9YCnNCr8" titulo="Vigo" />
      </Reels>
    </>
  )
}
