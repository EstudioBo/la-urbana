import { EnlaceExterno, EnlaceInterno, Figura, Galeria, PostInstagram, PostsInstagram } from '../../bloques'
import imgBurger from '../../../../assets/images/urbana-style/indomita-burger.webp?adaptable'
import imgMartin from '../../../../assets/images/urbana-style/indomita-martin-vazquez.webp?adaptable'
import imgMartinRisa from '../../../../assets/images/urbana-style/indomita-martin-vazquez-risa.webp?adaptable'

export default function Indomita() {
  return (
    <>
      <Figura
        img={imgBurger}
        alt="Urbana Indómita burger with confit cherry tomatoes and basil on a white plate"
        primera
      />

      <p>
        <strong>Martín Vázquez, chef at <EnlaceExterno href="https://indomitobistro.es/">Indómito Bistró</EnlaceExterno> in Santiago de Compostela</strong>, is
        the name behind our new signature burger: <strong>Urbana Indómita</strong>. A recipe that brings together
        vaca vieja, <EnlaceExterno href="https://pementodeherbon.com/">Padrón pepper</EnlaceExterno>, confit tomato and fresh basil to give summer a Galician flavour.
      </p>
      <p>
        On 17 July 2026 we launched it in our <EnlaceInterno to="/carta">Signature Burgers section</EnlaceInterno> and brought it to
        our burger bars in Lugo, Santiago and Vigo.
      </p>

      <h2>Padrón, vaca vieja and a touch of basil</h2>
      <p>
        Indómita packs <strong>200 grams of vaca vieja, melting cheese cream, confit cherry tomatoes and
        charred Padrón pepper with toasted garlic</strong>, finished with fresh basil and crunchy
        Galician bread.
      </p>
      <p>
        The Padrón pepper takes centre stage here. Together with the confit tomato and basil, it shapes
        the summery combo Martín created for La Urbana. A new way of bringing local ingredients to a
        burger with its own signature.
      </p>

      <PostsInstagram>
        <PostInstagram codigo="Da4-lJJtx6e" />
        <PostInstagram codigo="DbA9I_JM8Wp" />
      </PostsInstagram>

      <h2>A burger and its creator, in front of the camera</h2>
      <p>
        We introduced Indómita on social media alongside Martín, showing off the recipe and everything
        that goes into it. We also wanted to get to know the man behind it a little better: we had a
        few questions, and he had the answers.
      </p>
      <p>
        Because that&apos;s what our Signature Burgers are also about: introducing the chefs we work with and
        bringing their cooking to everyone who sits at our tables.
      </p>

      <Galeria
        fotos={[
          { img: imgMartin, alt: 'Martín Vázquez, chef at Indómito, smiling with the Urbana Indómita burger in his hands', encuadre: '50% 30%' },
          { img: imgMartinRisa, alt: 'Martín Vázquez laughing with the Urbana Indómita burger on a plate' },
        ]}
      />

      <h2>Best enjoyed in company</h2>
      <p>
        The launch included a giveaway of <strong>an Urbana Indómita meal for two</strong>. To enter, you had
        to tag the person you&apos;d share the premiere with. The hard part? Choosing who to bring.
      </p>
      <p>
        That&apos;s how Indómita arrived at La Urbana: a collaboration with a Santiago chef, a very summery
        recipe and three cities to take the first bite in.
      </p>

      <PostsInstagram>
        <PostInstagram codigo="DbsKePftKSv" pie="Interview with Martín Vázquez" />
        <PostInstagram codigo="DbIq2xvjCVJ" />
      </PostsInstagram>
    </>
  )
}
