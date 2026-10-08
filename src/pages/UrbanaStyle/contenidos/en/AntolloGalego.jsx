import { Hashtag, EnlaceExterno, EnlaceInterno, Figura, PostInstagram, PostsInstagram } from '../../bloques'
import imgBurger from '../../../../assets/images/urbana-style/antollo-galego-burger.webp'
import imgChefs from '../../../../assets/images/urbana-style/antollo-galego-chefs.webp'

export default function AntolloGalego() {
  return (
    <>
      <Figura
        img={imgBurger}
        alt="Antollo Galego burger with melted cheese and paprika on a wooden plate"
        primera
      />

      <p>
        Before taking the first bite, there were a couple of mysteries to solve. Who was behind our new
        signature burger? And what would go in it?
      </p>
      <p>
        That&apos;s how the launch of <strong>Antollo Galego</strong> began: the creation of Kike Piñeiro and
        Eloy Cancela, chefs at{' '}
        <strong><EnlaceExterno href="https://ahortadoobradoiro.com/">A Horta d’Obradoiro</EnlaceExterno> in Santiago de Compostela</strong>. A
        recipe bursting with the flavour of Galicia, which we unveiled in autumn 2025 with clues,
        giveaways and a blind tasting.
      </p>

      <h2>First, guess who&apos;s cooking</h2>
      <p>
        We started by keeping the names under wraps and setting a challenge on social media: work out
        which chefs would sign the next addition to our <EnlaceInterno to="/carta">Signature Burgers menu</EnlaceInterno>.
      </p>
      <p>
        The prize made sense: we gave away five vouchers for two to try it before anyone else. Then we
        revealed Kike and Eloy, but there was still something left to uncover. Next up: guess the
        ingredients, with another chance to win vouchers for two.
      </p>
      <p>The launch arrived in instalments. First the chefs; then the recipe.</p>

      <Figura
        img={imgChefs}
        alt="Eloy Cancela and Kike Piñeiro, chefs at A Horta d’Obradoiro, with the Antollo Galego burger"
      />

      <PostsInstagram>
        <PostInstagram codigo="DPeUz2FDLcZ" pie="Giveaway: guess the chef" />
        <PostInstagram codigo="DQCbOeKDDlI" pie="Giveaway" />
      </PostsInstagram>

      <h2>Galicia between two buns</h2>
      <p>
        For La Urbana, Kike and Eloy came up with a combination of <strong>matured Galician beef, a smash
        of <span lang="gl">rixóns</span> (Galician pork crackling), <EnlaceExterno href="https://www.arzua-ulloa.org/">Arzúa-Ulloa</EnlaceExterno> cheese
        and creamy <EnlaceExterno href="https://grelosdegalicia.org/es"><span lang="gl">grelos</span></EnlaceExterno> (turnip tops)</strong>, on traditional
        bread dusted with paprika.
      </p>
      <p>
        Galician produce and familiar flavours, brought into the world of our signature burgers. The
        name fitted like a glove: Antollo Galego (a Galician craving).
      </p>
      <p>
        And we introduced it with a line that said it all: <em lang="gl">‘Non é unha burger. É unha
        declaración de amor’</em> (It&apos;s not a burger. It&apos;s a declaration of love).
      </p>

      <PostsInstagram>
        <PostInstagram codigo="DQttyQDkSL2" pie="Giveaway: guess the ingredients" />
        <PostInstagram codigo="DQr297XDd9z" />
      </PostsInstagram>

      <h2>A blind tasting at As Cancelas</h2>
      <p>
        The launch also went offline. Next to the{' '}
        <EnlaceInterno to="/la-urbana-style/apertura-santiago-as-cancelas">As Cancelas</EnlaceInterno> Shopping Centre, we held <strong>a free blind tasting
        in Santiago de Compostela on 30 October</strong>.
      </p>
      <p>
        We opened sign-ups so participants could bring a plus-one and be among the first to try the
        new recipe. This time, the clues were found bite by bite.
      </p>

      <PostsInstagram>
        <PostInstagram codigo="DP10hjaiP8a" pie="Event at As Cancelas" />
        <PostInstagram codigo="DPvz3pnjV2C" />
      </PostsInstagram>

      <p>
        After that, Antollo Galego joined the menu at our burger bars in <strong>Lugo, Santiago de
        Compostela and Vigo</strong>. A new signature, a new recipe and another way to share our love of
        all things local. In true <Hashtag>LaUrbanaStyle</Hashtag>.
      </p>
      <p>
        <EnlaceExterno href="https://www.diariodesantiago.es/tendencias/la-urbana-se-une-a-horta-dobradoiro-para-elevar-la-burger-a-la-alta-cocina/">
          Diario de Santiago also covered our collaboration with A Horta d’Obradoiro
        </EnlaceExterno>{' '}
        (in Spanish).
      </p>
    </>
  )
}
