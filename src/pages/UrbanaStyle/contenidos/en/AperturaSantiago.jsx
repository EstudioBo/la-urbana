import { Hashtag, EnlaceExterno, EnlaceInterno, Figura, Galeria, PostInstagram, PostsInstagram } from '../../bloques'
import imgInterior from '../../../../assets/images/urbana-style/apertura-santiago-interior-mural.webp'
import imgInterior2 from '../../../../assets/images/urbana-style/apertura-santiago-interior-mural-2.webp'
import imgFachada from '../../../../assets/images/urbana-style/apertura-santiago-fachada.webp'
import imgGalicianStyle from '../../../../assets/images/urbana-style/apertura-santiago-galician-style-burger.webp'
import imgNeonBurger from '../../../../assets/images/urbana-style/apertura-santiago-neon-burger.webp'
import imgPostureo from '../../../../assets/images/urbana-style/apertura-santiago-neon-postureo-friendly.webp'
import imgMesas from '../../../../assets/images/urbana-style/apertura-santiago-mesas.webp'
import imgPuroChef from '../../../../assets/images/urbana-style/apertura-santiago-neon-puro-chef.webp'

export default function AperturaSantiago() {
  return (
    <>
      <Figura
        img={imgInterior}
        alt="Inside La Urbana As Cancelas, with wicker lamps, a mural of green shapes and the Puro Chef neon sign"
        primera
      />

      <p>
        On 15 May 2024 we opened <EnlaceInterno to="/reservar">our burger bar in Santiago de Compostela</EnlaceInterno>, at the{' '}
        <EnlaceExterno href="https://www.ascancelas.es/">As Cancelas Shopping Centre</EnlaceExterno>. We arrived with our artisan burgers,{' '}
        <EnlaceInterno to="/carta">signature recipes by Galician chefs</EnlaceInterno> and a few surprises up our sleeve to celebrate. But this
        story started earlier, with a search for someone.
      </p>

      <h2>Ana, this all started with you</h2>
      <p>
        A customer called Ana had left us a Tripadvisor review saying she travelled from Santiago to
        Lugo just to eat our burgers. We had to thank her for that. And now we had some good news for
        her: she wouldn&apos;t need to clock up all those kilometres any more.
      </p>
      <p>
        We set out to find her and asked for help on social media. But Ana never turned up. So we
        changed plans: the first ten Anas to come to the opening and prove their name would get a free
        burger. We never found our Ana, but the tribute still stood.
      </p>

      <PostsInstagram>
        <PostInstagram codigo="C5y1i74LWYf" />
        <PostInstagram codigo="C6GgGIYKptB" />
        <PostInstagram codigo="C6thFLGN8pd" />
      </PostsInstagram>

      <h2>Ten green boxes around Compostela</h2>
      <p>
        On the morning of the opening, our little green man went out to hide ten green boxes around
        Santiago. It was raining, of course. But there were burgers at stake, and a few drops
        weren&apos;t going to stop the mission.
      </p>
      <p>
        Inside each box were instructions for bagging a free burger at our new place.{' '}
        <Hashtag>EncuentraLaCajaVerde</Hashtag> had reached Compostela, and the party kicked off in the
        street.
      </p>

      <Galeria
        fotos={[
          { img: imgNeonBurger, alt: 'Green burger-shaped neon sign in the window of La Urbana As Cancelas', alta: true },
          { img: imgFachada, alt: 'La Urbana\'s shopfront at As Cancelas with colourful tables and chairs outside' },
          { img: imgGalicianStyle, alt: 'Galician Style Burguer neon sign above three La Urbana campaign posters' },
        ]}
      />

      <h2>First come, first rewarded. And there was more</h2>
      <p>
        At 1.30 pm we opened the doors of La Urbana As Cancelas. The first 50 people through the door
        got a voucher for a free artisan burger that very lunchtime.
      </p>
      <p>
        We had a surprise for later arrivals too: 160 scratch cards with prizes of burgers, starters
        and desserts to redeem on a future visit. A great excuse to come back.
      </p>

      <PostsInstagram>
        <PostInstagram codigo="C7CUH0Qtrxi" />
        <PostInstagram codigo="C66lm2fL9ua" />
      </PostsInstagram>

      <Galeria
        fotos={[
          { img: imgPuroChef, alt: 'Puro Chef lettering lit up in green under wicker lamps', alta: true },
          { img: imgPostureo, alt: 'Postureo Friendly neon sign on a wall papered with newspapers' },
          { img: imgMesas, alt: 'Tables and cane chairs at La Urbana As Cancelas' },
        ]}
      />

      <Figura
        img={imgInterior2}
        alt="Dining room at La Urbana As Cancelas with bench seating, illuminated shelves and the Puro Chef neon sign"
      />

      <p>
        That&apos;s how we kicked off La Urbana in Santiago: looking for Ana, hiding boxes around the city
        and sharing our burgers from day one. All in true <Hashtag>LaUrbanaStyle</Hashtag>.
      </p>
      <p>
        <EnlaceExterno href="https://www.extradigital.es/la-campana-de-apertura-de-la-urbana-burguer-sorprende-a-los-compostelanos-galicia/">
          ExtraDigital also covered the stunts we pulled to celebrate arriving in Compostela
        </EnlaceExterno>{' '}
        (in Spanish).
      </p>
    </>
  )
}
