import { Hashtag, EnlaceExterno, EnlaceInterno, Figura, Galeria, PostInstagram, PostsInstagram } from '../../bloques'
import imgMuralla from '../../../../assets/images/urbana-style/cajas-verdes-lugo-muralla.webp?adaptable'
import imgEstatuas from '../../../../assets/images/urbana-style/cajas-verdes-lugo-estatuas.webp?adaptable'
import imgCabeza from '../../../../assets/images/urbana-style/cajas-verdes-escultura-cabeza.webp?adaptable'
import imgHombreVerde from '../../../../assets/images/urbana-style/cajas-verdes-hombre-verde.webp?adaptable'
import imgSireno from '../../../../assets/images/urbana-style/cajas-verdes-vigo-sireno.webp?adaptable'

export default function EncuentraLaCajaVerde() {
  return (
    <>
      <Figura
        img={imgMuralla}
        alt="La Urbana green box propped against Lugo's Roman walls, with a mural of a Roman emperor in the background"
        encuadre="50% 80%"
        primera
      />

      <p>
        Head out for a wander and come home with a free burger. That was the plan. All you had to do
        was find one of the green boxes we&apos;d hidden around town.
      </p>
      <p>
        In April 2024 we launched <Hashtag>EncuentraLaCajaVerde</Hashtag> (Find the Green Box) in Lugo:
        ten boxes, ten prizes and a character dressed in green from head to toe, in charge of hiding
        them in all sorts of corners. Keeping a low profile could wait for another day.
      </p>

      <h2>Find, share, eat</h2>
      <p>
        The rules were simple: find a box, share a photo in your stories tagging La Urbana and saying
        where it turned up. We&apos;d send a voucher via Instagram, and whoever found it could swap it for a
        free burger at <EnlaceInterno to="/reservar">our restaurants in Lugo</EnlaceInterno>. A stroll that could
        end a whole lot better than expected.
      </p>

      <Figura
        img={imgEstatuas}
        alt="La Urbana green box at the foot of a bronze statue in a square"
        encuadre="50% 15%"
      />

      <h2>Santiago, rain included</h2>
      <p>
        In May we took the hunt to Santiago to celebrate our opening at <EnlaceExterno href="https://www.ascancelas.es/">As Cancelas</EnlaceExterno>. The
        rain came out to greet us, but we still went out to hide the boxes around Compostela.
        We&apos;re Galician. A few drops weren&apos;t going to ruin our plans.
      </p>

      <h2>Last stop: Vigo</h2>
      <p>
        The tour wrapped up in Vigo in September, with a fresh batch of green boxes and the same
        mission: get out there, search and find the prize.
      </p>

      <Galeria
        fotos={[
          { img: imgSireno, alt: 'La Urbana green box at the base of the Sireno sculpture in Vigo', alta: true },
          { img: imgHombreVerde, alt: 'La Urbana\'s little green man holding a green box in a shopping centre' },
          { img: imgCabeza, alt: 'La Urbana green box hidden beside a huge sculpture of a head lying on its side', encuadre: '60% 70%' },
        ]}
      />

      <p>
        Three cities and an excuse to play in the streets, surprise passers-by and take our burgers a
        little beyond our four walls. In true <Hashtag>LaUrbanaStyle</Hashtag>.
      </p>
      <p>
        The Lugo hunt also made the papers:{' '}
        <EnlaceExterno href="https://www.elprogreso.es/articulo/lugo/urbana-esconde-ciudad-diez-cajas-verdes-sorpresa-regalos/202404201352141748862.html">
          El Progreso covered the search for our ten green boxes
        </EnlaceExterno>{' '}
        (in Spanish).
      </p>

      <h2>Watch the video</h2>
      <PostsInstagram>
        <PostInstagram codigo="C53ev4UNdDS" pie="Lugo" />
        <PostInstagram codigo="C55mYsXt5vH" pie="Lugo" />
        <PostInstagram codigo="C6_G-p8Nt9z" pie="Santiago" />
        <PostInstagram codigo="C_u9YCnNCr8" pie="Vigo" />
      </PostsInstagram>
    </>
  )
}
