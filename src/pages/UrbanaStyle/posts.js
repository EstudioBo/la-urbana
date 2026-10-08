import { lazy } from 'react'
import imgCajaMuralla from '../../assets/images/urbana-style/cajas-verdes-lugo-muralla.webp'
import imgFerido from '../../assets/images/urbana-style/xoan-forneas-ferido-meigas-dentro.webp'
import imgBarea from '../../assets/images/urbana-style/leandro-barea-mesa-detalle.webp'
import imgAntollo from '../../assets/images/urbana-style/antollo-galego-burger.webp'
import imgIndomita from '../../assets/images/urbana-style/indomita-burger.webp'
import imgSantiagoFachada from '../../assets/images/urbana-style/apertura-santiago-fachada.webp'

// El contenido de cada entrada se carga solo al abrirla: este archivo lo usan también el menú y el selector de idioma
const contenido = {
  EncuentraLaCajaVerde: lazy(() => import('./contenidos/EncuentraLaCajaVerde')),
  AperturaSantiago: lazy(() => import('./contenidos/AperturaSantiago')),
  XoanForneas: lazy(() => import('./contenidos/XoanForneas')),
  LeandroBarea: lazy(() => import('./contenidos/LeandroBarea')),
  AntolloGalego: lazy(() => import('./contenidos/AntolloGalego')),
  Indomita: lazy(() => import('./contenidos/Indomita')),
  EncuentraLaCajaVerdeEn: lazy(() => import('./contenidos/en/EncuentraLaCajaVerde')),
  AperturaSantiagoEn: lazy(() => import('./contenidos/en/AperturaSantiago')),
  XoanForneasEn: lazy(() => import('./contenidos/en/XoanForneas')),
  LeandroBareaEn: lazy(() => import('./contenidos/en/LeandroBarea')),
  AntolloGalegoEn: lazy(() => import('./contenidos/en/AntolloGalego')),
  IndomitaEn: lazy(() => import('./contenidos/en/Indomita')),
}

// La clave de cada categoría es su slug en castellano
export const CATEGORIAS = {
  'burger-de-autor': {
    slug: { es: 'burger-de-autor', en: 'signature-burgers' },
    nombre: { es: 'Burger de autor', en: 'Signature burgers' },
    descripcion: {
      es: 'Burgers de autor de La Urbana: recetas creadas mano a mano con chefs gallegos como Martín Vázquez, Kike Piñeiro y Eloy Cancela, con producto de km 0 de Galicia.',
      en: 'La Urbana\'s signature burgers: recipes created hand in hand with Galician chefs such as Martín Vázquez, Kike Piñeiro and Eloy Cancela, using km 0 Galician produce.',
    },
  },
  colaboracion: {
    slug: { es: 'colaboracion', en: 'collaborations' },
    nombre: { es: 'Colaboración', en: 'Collaborations' },
    descripcion: {
      es: 'Colaboraciones de La Urbana con artistas y creadores gallegos: los manteles ilustrados por Leandro Barea, nuestro papel en la serie Ferido y otros proyectos.',
      en: 'La Urbana\'s collaborations with Galician artists and creators: the placemats illustrated by Leandro Barea, our cameo in the series Ferido and other projects.',
    },
  },
  apertura: {
    slug: { es: 'apertura', en: 'openings' },
    nombre: { es: 'Apertura', en: 'Openings' },
    descripcion: {
      es: 'Así abrimos nuestros locales: las aperturas de La Urbana Burger Bar contadas desde dentro, con acciones en la calle, sorpresas y mucha gente en la puerta.',
      en: 'How we open our doors: La Urbana Burger Bar openings told from the inside, with street actions, surprises and plenty of people queuing outside.',
    },
  },
  'accion-en-la-calle': {
    slug: { es: 'accion-en-la-calle', en: 'street-actions' },
    nombre: { es: 'Acción en la calle', en: 'Street actions' },
    descripcion: {
      es: 'Acciones de La Urbana en la calle: cajas verdes escondidas por Lugo, Santiago y Vigo, búsquedas con premio y sorpresas para quien sale a pasear por la ciudad.',
      en: 'La Urbana out on the streets: green boxes hidden around Lugo, Santiago and Vigo, treasure hunts with prizes and surprises for anyone out for a stroll.',
    },
  },
}

export const rutaCategoria = (categoria) => `/la-urbana-style/categoria/${categoria}`
export const rutaPost = (post) => `/la-urbana-style/${post.slug.es}`

// Cada entrada lleva sus textos por idioma. Una entrada sin `en` no aparece en la versión en inglés
export const POSTS = [
  {
    slug: { es: 'indomita-martin-vazquez', en: 'indomita-martin-vazquez' },
    fecha: '2026-07-17',
    categoria: 'burger-de-autor',
    img: imgIndomita,
    es: {
      titulo: 'Indómita: la burger de autor de Martín Vázquez que sabe a verano',
      extracto: 'Vaca vieja, pimiento de Padrón, tomate confitado y albahaca fresca. Martín Vázquez, chef de Indómito Bistró, firma nuestra nueva burger de autor.',
      seo: {
        titulo: 'Indómita: burger de Martín Vázquez',
        descripcion: 'Vaca vieja, pimiento de Padrón, tomate confitado y albahaca: Indómita es la burger de autor que firma Martín Vázquez, chef de Indómito Bistró, para La Urbana.',
      },
      Contenido: contenido.Indomita,
    },
    en: {
      titulo: 'Indómita: Martín Vázquez\'s signature burger that tastes like summer',
      extracto: 'Vaca vieja, Padrón pepper, confit tomato and fresh basil. Martín Vázquez, chef at Indómito Bistró, puts his name to our new signature burger.',
      seo: {
        titulo: 'Indómita: Martín Vázquez\'s burger',
        descripcion: 'Vaca vieja, Padrón pepper, confit tomato and basil: Indómita is the signature burger created for La Urbana by Martín Vázquez, chef at Indómito Bistró.',
      },
      Contenido: contenido.IndomitaEn,
    },
  },
  {
    slug: { es: 'leandro-barea-mantel', en: 'leandro-barea-placemat' },
    fecha: '2026-03-11',
    categoria: 'colaboracion',
    img: imgBarea,
    es: {
      titulo: 'La Urbana × Leandro Barea: un mantel que te quieres llevar a casa',
      extracto: 'El artista lucense Leandro Barea ilustró nuestros manteles en una edición limitada. El reto: terminar la burger sin mancharlo.',
      seo: {
        titulo: 'El mantel de Leandro Barea',
        descripcion: 'El artista lucense Leandro Barea ilustró los manteles de La Urbana en una edición limitada. El reto para quien se sienta: terminar la burger sin mancharlo.',
      },
      Contenido: contenido.LeandroBarea,
    },
    en: {
      titulo: 'La Urbana × Leandro Barea: a placemat you\'ll want to take home',
      extracto: 'Lugo artist Leandro Barea illustrated our placemats in a limited edition. The challenge: finish your burger without getting a mark on it.',
      seo: {
        titulo: 'Leandro Barea\'s placemat',
        descripcion: 'Lugo artist Leandro Barea illustrated La Urbana\'s placemats in a limited edition. The challenge for everyone at the table: finish the burger without a single stain.',
      },
      Contenido: contenido.LeandroBareaEn,
    },
  },
  {
    slug: { es: 'xoan-forneas-meigas-dentro', en: 'xoan-forneas-meigas-dentro' },
    fecha: '2025-11-22',
    categoria: 'colaboracion',
    img: imgFerido,
    es: {
      titulo: 'Xoán Fórneas, meigas y una Antollo Galego en La Urbana',
      extracto: 'Una cita fallida, una parada para comer y unas meigas. Nos colamos en «Meigas dentro», el quinto capítulo de Ferido: O Microdrama.',
      seo: {
        titulo: 'Xoán Fórneas y Ferido en La Urbana',
        descripcion: 'Una cita fallida, una parada para comer y unas meigas: La Urbana sale en «Meigas dentro», el quinto capítulo de Ferido: O Microdrama, con Xoán Fórneas.',
      },
      Contenido: contenido.XoanForneas,
    },
    en: {
      titulo: 'Xoán Fórneas, meigas and an Antollo Galego at La Urbana',
      extracto: 'A date gone wrong, a stop for food and a few meigas. We sneaked into ‘Meigas dentro’, the fifth episode of Ferido: O Microdrama.',
      seo: {
        titulo: 'Xoán Fórneas and Ferido at La Urbana',
        descripcion: 'A date gone wrong, a stop for food and a few meigas: La Urbana features in ‘Meigas dentro’, the fifth episode of Ferido: O Microdrama, starring Xoán Fórneas.',
      },
      Contenido: contenido.XoanForneasEn,
    },
  },
  {
    slug: { es: 'antollo-galego', en: 'antollo-galego' },
    fecha: '2025-10-06',
    categoria: 'burger-de-autor',
    img: imgAntollo,
    es: {
      titulo: 'Antollo Galego: así presentamos la burger de autor de Kike Piñeiro y Eloy Cancela',
      extracto: 'Pistas, sorteos y una cata a ciegas en As Cancelas para presentar la burger de los chefs de A Horta d’Obradoiro.',
      seo: {
        titulo: 'Antollo Galego, burger de autor',
        descripcion: 'Pistas, sorteos y una cata a ciegas en As Cancelas: así presentamos Antollo Galego, la burger de Kike Piñeiro y Eloy Cancela, chefs de A Horta d’Obradoiro.',
      },
      Contenido: contenido.AntolloGalego,
    },
    en: {
      titulo: 'Antollo Galego: how we launched Kike Piñeiro and Eloy Cancela\'s signature burger',
      extracto: 'Clues, giveaways and a blind tasting at As Cancelas to unveil the burger from the chefs of A Horta d’Obradoiro.',
      seo: {
        titulo: 'Antollo Galego, a signature burger',
        descripcion: 'Clues, giveaways and a blind tasting at As Cancelas: this is how we launched Antollo Galego, the burger by Kike Piñeiro and Eloy Cancela, chefs at A Horta d’Obradoiro.',
      },
      Contenido: contenido.AntolloGalegoEn,
    },
  },
  {
    slug: { es: 'apertura-santiago-as-cancelas', en: 'santiago-opening-as-cancelas' },
    fecha: '2024-05-15',
    categoria: 'apertura',
    img: imgSantiagoFachada,
    es: {
      titulo: 'La Urbana llega a Santiago: así estrenamos As Cancelas',
      extracto: 'Buscamos a Ana, escondimos cajas verdes por Compostela y abrimos las puertas con burgers gratis para los primeros en llegar.',
      seo: {
        titulo: 'La Urbana abre en Santiago',
        descripcion: 'Buscamos a Ana, escondimos cajas verdes por Compostela y regalamos burgers a los primeros que llegaron: así fue la apertura de La Urbana en As Cancelas.',
      },
      Contenido: contenido.AperturaSantiago,
    },
    en: {
      titulo: 'La Urbana lands in Santiago: how we opened at As Cancelas',
      extracto: 'We went looking for Ana, hid green boxes around Compostela and opened our doors with free burgers for the first to arrive.',
      seo: {
        titulo: 'La Urbana opens in Santiago',
        descripcion: 'We went looking for Ana, hid green boxes around Compostela and gave free burgers to the first through the door: this is how La Urbana opened at As Cancelas.',
      },
      Contenido: contenido.AperturaSantiagoEn,
    },
  },
  {
    slug: { es: 'encuentra-la-caja-verde', en: 'find-the-green-box' },
    fecha: '2024-04-18',
    categoria: 'accion-en-la-calle',
    img: imgCajaMuralla,
    es: {
      titulo: 'Encuentra la caja verde: un paseo con premio por Lugo, Santiago y Vigo',
      extracto: 'Salir a dar una vuelta y volver con una burger gratis. Solo había que encontrar una de las cajas verdes que escondimos por la ciudad.',
      seo: {
        titulo: 'Encuentra la caja verde',
        descripcion: 'Salir a dar una vuelta y volver con una burger gratis: escondimos cajas verdes de La Urbana por Lugo, Santiago y Vigo y solo había que encontrar una de ellas.',
      },
      Contenido: contenido.EncuentraLaCajaVerde,
    },
    en: {
      titulo: 'Find the green box: a stroll with a prize in Lugo, Santiago and Vigo',
      extracto: 'Head out for a wander and come back with a free burger. All you had to do was find one of the green boxes we hid around town.',
      seo: {
        titulo: 'Find the green box',
        descripcion: 'Head out for a wander and come back with a free burger: we hid La Urbana green boxes around Lugo, Santiago and Vigo, and all you had to do was find one.',
      },
      Contenido: contenido.EncuentraLaCajaVerdeEn,
    },
  },
]

export const postsDelIdioma = (idioma) => POSTS.filter((post) => post[idioma])
