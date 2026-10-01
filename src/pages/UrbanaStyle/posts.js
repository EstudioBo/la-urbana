import imgCajaMuralla from '../../assets/images/urbana-style/cajas-verdes-lugo-muralla.webp'
import imgFerido from '../../assets/images/urbana-style/xoan-forneas-ferido-meigas-dentro.webp'
import imgBarea from '../../assets/images/urbana-style/leandro-barea-mesa-detalle.webp'
import imgAntollo from '../../assets/images/urbana-style/antollo-galego-burger.webp'
import imgIndomita from '../../assets/images/urbana-style/indomita-burger.webp'
import imgSantiagoFachada from '../../assets/images/urbana-style/apertura-santiago-fachada.webp'
import EncuentraLaCajaVerde from './contenidos/EncuentraLaCajaVerde'
import AperturaSantiago from './contenidos/AperturaSantiago'
import XoanForneas from './contenidos/XoanForneas'
import LeandroBarea from './contenidos/LeandroBarea'
import AntolloGalego from './contenidos/AntolloGalego'
import Indomita from './contenidos/Indomita'

export const CATEGORIAS = {
  'burger-de-autor': 'Burger de autor',
  colaboracion: 'Colaboración',
  apertura: 'Apertura',
  'accion-en-la-calle': 'Acción en la calle',
}

export const rutaCategoria = (categoria) => `/la-urbana-style/categoria/${categoria}`

export const POSTS = [
  {
    slug: 'indomita-martin-vazquez',
    fecha: '2026-07-17',
    categoria: 'burger-de-autor',
    titulo: 'Indómita: la burger de autor de Martín Vázquez que sabe a verano',
    extracto: 'Vaca vieja, pimiento de Padrón, tomate confitado y albahaca fresca. Martín Vázquez, chef de Indómito Bistró, firma nuestra nueva burger de autor.',
    img: imgIndomita,
    Contenido: Indomita,
  },
  {
    slug: 'leandro-barea-mantel',
    fecha: '2026-03-11',
    categoria: 'colaboracion',
    titulo: 'La Urbana × Leandro Barea: un mantel que te quieres llevar a casa',
    extracto: 'El artista lucense Leandro Barea ilustró nuestros manteles en una edición limitada. El reto: terminar la burger sin mancharlo.',
    img: imgBarea,
    Contenido: LeandroBarea,
  },
  {
    slug: 'xoan-forneas-meigas-dentro',
    fecha: '2025-11-22',
    categoria: 'colaboracion',
    titulo: 'Xoán Fórneas, meigas y una Antollo Galego en La Urbana',
    extracto: 'Una cita fallida, una parada para comer y unas meigas. Nos colamos en «Meigas dentro», el quinto capítulo de Ferido: O Microdrama.',
    img: imgFerido,
    Contenido: XoanForneas,
  },
  {
    slug: 'antollo-galego',
    fecha: '2025-10-06',
    categoria: 'burger-de-autor',
    titulo: 'Antollo Galego: así presentamos la burger de autor de Kike Piñeiro y Eloy Cancela',
    extracto: 'Pistas, sorteos y una cata a ciegas en As Cancelas para presentar la burger de los chefs de A Horta d’Obradoiro.',
    img: imgAntollo,
    Contenido: AntolloGalego,
  },
  {
    slug: 'apertura-santiago-as-cancelas',
    fecha: '2024-05-15',
    categoria: 'apertura',
    titulo: 'La Urbana llega a Santiago: así estrenamos As Cancelas',
    extracto: 'Buscamos a Ana, escondimos cajas verdes por Compostela y abrimos las puertas con burgers gratis para los primeros en llegar.',
    img: imgSantiagoFachada,
    Contenido: AperturaSantiago,
  },
  {
    slug: 'encuentra-la-caja-verde',
    fecha: '2024-04-18',
    categoria: 'accion-en-la-calle',
    titulo: 'Encuentra la caja verde: un paseo con premio por Lugo, Santiago y Vigo',
    extracto: 'Salir a dar una vuelta y volver con una burger gratis. Solo había que encontrar una de las cajas verdes que escondimos por la ciudad.',
    img: imgCajaMuralla,
    Contenido: EncuentraLaCajaVerde,
  },
]
