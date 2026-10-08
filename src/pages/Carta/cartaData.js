// Alérgenos copiados de la tabla oficial (Carta Local de BAP, julio 2026, pág. 7; la misma imagen está en /alergenos):
// `alergenos` = contiene (X), `trazas` = puede contener trazas (T).
// Las burgers van como en la tabla: sin pan ni patatas. Corea y Mejicana van sin gluten a propósito: la carta las
// vende como Gluten Free aunque la tabla les marca gluten.

// En inglés, términos oficiales del Anexo II del Reglamento (UE) 1169/2011
export const ALERGENOS = {
  gluten:      { emoji: '🌾', label: { es: 'Gluten', en: 'Gluten' } },
  crustaceos:  { emoji: '🦐', label: { es: 'Crustáceos', en: 'Crustaceans' } },
  huevos:      { emoji: '🥚', label: { es: 'Huevos', en: 'Eggs' } },
  pescado:     { emoji: '🐟', label: { es: 'Pescado', en: 'Fish' } },
  cacahuetes:  { emoji: '🥜', label: { es: 'Cacahuetes', en: 'Peanuts' } },
  soja:        { emoji: '🫘', label: { es: 'Soja', en: 'Soybeans' } },
  leche:       { emoji: '🥛', label: { es: 'Leche', en: 'Milk' } },
  frutosSecos: { emoji: '🌰', label: { es: 'Frutos de cáscara', en: 'Nuts' } },
  apio:        { emoji: '🥬', label: { es: 'Apio', en: 'Celery' } },
  mostaza:     { emoji: '🌿', label: { es: 'Mostaza', en: 'Mustard' } },
  sesamo:      { emoji: '🌱', label: { es: 'Sésamo', en: 'Sesame seeds' } },
  sulfitos:    { emoji: '⚗️', label: { es: 'Sulfitos', en: 'Sulphites' } },
  altramuces:  { emoji: '🌼', label: { es: 'Altramuces', en: 'Lupin' } },
  moluscos:    { emoji: '🐚', label: { es: 'Moluscos', en: 'Molluscs' } },
}

export const CATEGORIAS = [
  { id: 'empezar',    label: { es: 'Para empezar', en: 'Starters' } },
  { id: 'autor',      label: { es: 'De autor', en: 'Signature' } },
  { id: 'galicia',    label: 'Made in Galicia' },
  { id: 'veggies',    label: 'Veggies' },
  { id: 'entrepanes', label: { es: 'Entrepanes', en: 'Sandwiches' } },
  { id: 'ensaladas',  label: { es: 'Ensaladas', en: 'Salads' } },
  { id: 'postres',    label: { es: 'Postres', en: 'Desserts' } },
]

export const PLATOS = [
  // ─── PARA EMPEZAR ────────────────────────────────────────────────────────
  {
    cat: 'empezar',
    nombre: { es: 'Chipirones de la Ría', en: 'Chipirones de la ría' },
    desc: {
      es: 'Chipirones de la ría con alioli cítrico.',
      en: 'Baby squid from the Galician rías with citrus aioli.',
    },
    precio: '11,5',
    recomendado: true,
    alergenos: ['gluten', 'huevos', 'moluscos'],
    trazas: ['crustaceos', 'pescado', 'cacahuetes', 'soja', 'leche', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'sulfitos'],
  },
  {
    cat: 'empezar',
    nombre: { es: 'Langostinos Kataifi', en: 'Kataifi prawns' },
    desc: {
      es: 'Langostinos jugosos envueltos en crujiente pasta kataifi, acompañados de nuestra irresistible salsa teriyaki. (3 unid. / 6 unid.)',
      en: 'Juicy prawns wrapped in crispy kataifi pastry, served with our irresistible teriyaki sauce. (3 / 6 pieces)',
    },
    precio: '12,9',
    mediaRacion: '7,0',
    recomendado: true,
    alergenos: ['gluten', 'crustaceos', 'sulfitos'],
    trazas: ['huevos', 'pescado', 'cacahuetes', 'soja', 'leche', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'moluscos'],
  },
  {
    cat: 'empezar',
    nombre: { es: 'Camperitos de pollo de corral', en: 'Free-range chicken Camperitos' },
    desc: {
      es: 'Deliciosas tiras de pechuga de pollo empanadas en crujiente panko. Acompañadas de salsa de miel y mostaza (8 unid).',
      en: 'Tasty strips of chicken breast in a crispy panko coating, served with honey mustard sauce (8 pieces).',
    },
    precio: '11,9',
    recomendado: true,
    alergenos: ['huevos', 'pescado', 'mostaza'],
    trazas: ['gluten', 'crustaceos', 'cacahuetes', 'soja', 'leche', 'frutosSecos', 'apio', 'sesamo', 'sulfitos', 'moluscos'],
  },
  {
    cat: 'empezar',
    nombre: { es: 'Aros de cebolla crujiente a la cerveza', en: 'Crispy beer-battered onion rings' },
    desc: {
      es: 'Aros de cebolla crujientes acompañados de una crema de queso de jalapeños y pimientos de Padrón escogidos los que no pican (8 unid).',
      en: 'Crispy onion rings with a jalapeño cream cheese dip and Padrón peppers, hand-picked from the ones that aren\'t hot (8 pieces).',
    },
    precio: '8,9',
    alergenos: ['gluten', 'leche', 'sulfitos'],
    trazas: ['crustaceos', 'huevos', 'pescado', 'cacahuetes', 'soja', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'moluscos'],
  },
  {
    cat: 'empezar',
    nombre: { es: 'Croquetas cremosas de jamón ibérico', en: 'Creamy Iberian ham croquettes' },
    desc: {
      es: 'Croquetas cremosas con textura y sabor ibérico. (4 unid. / 9 unid.)',
      en: 'Creamy croquettes with all the texture and flavour of Iberian ham. (4 / 9 pieces)',
    },
    precio: '9,5',
    mediaRacion: '4,9',
    alergenos: ['gluten', 'leche'],
    trazas: ['crustaceos', 'huevos', 'pescado', 'cacahuetes', 'soja', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'sulfitos', 'moluscos'],
  },
  {
    cat: 'empezar',
    nombre: { es: 'Croquetas melosas de chipirones', en: 'Silky baby squid croquettes' },
    desc: {
      es: 'Cremosas croquetas de chipirones en su tinta con bechamel de textura suave y cremosa, con salsa alioli casera. (4 unid. / 8 unid.)',
      en: 'Creamy croquettes of baby squid in its own ink with a smooth, velvety béchamel, served with homemade aioli. (4 / 8 pieces)',
    },
    precio: '9,9',
    mediaRacion: '5,5',
    alergenos: ['gluten', 'crustaceos', 'pescado', 'leche', 'moluscos'],
    trazas: ['huevos', 'cacahuetes', 'soja', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'sulfitos'],
  },
  {
    cat: 'empezar',
    nombre: { es: 'Combi croquetas jamón + chipirones', en: 'Croquette combo: ham + baby squid' },
    desc: {
      es: 'La mejor combinación: croquetas de jamón ibérico y melosas de chipirones (4+4 unid).',
      en: 'The best of both: Iberian ham croquettes and silky baby squid croquettes (4+4 pieces).',
    },
    precio: '9,5',
    alergenos: ['gluten', 'crustaceos', 'pescado', 'leche', 'moluscos'],
    trazas: ['huevos', 'cacahuetes', 'soja', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'sulfitos'],
  },
  {
    cat: 'empezar',
    nombre: { es: 'Alitas de pollo a la barbacoa', en: 'BBQ chicken wings' },
    desc: {
      es: 'Deliciosas y crujientes alitas de pollo marinadas con salsa barbacoa (8 unid).',
      en: 'Tasty, crispy chicken wings marinated in barbecue sauce (8 pieces).',
    },
    precio: '11,9',
    alergenos: ['gluten', 'soja', 'apio', 'mostaza'],
    trazas: ['crustaceos', 'huevos', 'pescado', 'cacahuetes', 'leche', 'frutosSecos', 'sesamo', 'sulfitos', 'moluscos'],
  },

  // ─── DE AUTOR — Chefs Gallegos ───────────────────────────────────────────
  {
    cat: 'autor',
    nombre: 'Urbana Fina',
    desc: {
      es: 'Pan crujiente con carne de vaca vieja madurada, base de lechuga, tartar de tomate sazonado, queso DOP San Simón da Costa fundido, pepinos marinados frescos y agridulces, salsa de huevo campero frito Pazo de Vilane y mayonesa casera coronada con patata fina y crujiente.',
      en: 'Crunchy bread with matured vaca vieja beef, a bed of lettuce, seasoned tomato tartare, melted San Simón da Costa PDO cheese, fresh sweet-and-sour marinated cucumber, Pazo de Vilane fried free-range egg sauce and homemade mayonnaise, topped with thin, crispy potato straws.',
    },
    precio: '15,9',
    chef: 'Chef Héctor López',
    restaurante: 'Restaurante España · Lugo',
    recomendado: true,
    alergenos: ['gluten', 'huevos', 'pescado', 'leche', 'mostaza', 'sulfitos'],
  },
  {
    cat: 'autor',
    nombre: 'Urbana Antollo Galego',
    desc: {
      es: 'Carne galega de vaca madurada con smash de Rixóns, queso de Arzúa-Ulloa, un toque de cremoso de grelo e pan tradicional espolvoreado con pimentón doce/picante como na casa dos teus avós.',
      en: 'Matured Galician beef with a smash of rixóns (Galician pork crackling), Arzúa-Ulloa cheese, a touch of creamy grelos (turnip tops) and traditional bread dusted with sweet or hot paprika, just like at your grandparents\'.',
    },
    precio: '16,9',
    chef: { es: 'Chefs Kike Piñeiro y Eloy Cancela', en: 'Chefs Kike Piñeiro and Eloy Cancela' },
    restaurante: 'A Horta D\'Obradoiro · Santiago',
    recomendado: true,
    alergenos: ['crustaceos', 'huevos', 'pescado', 'soja', 'leche'],
  },
  {
    cat: 'autor',
    nombre: 'Urbana Corea',
    desc: {
      es: 'Pan crujiente con carne de vaca vieja madurada, queso DOP San Simón da Costa a golpe de calor, pepinillo agridulce, mayonesa kimchi, tomate seco, rúcula y salsa barbacoa de ajo negro.',
      en: 'Crunchy bread with matured vaca vieja beef, flash-melted San Simón da Costa PDO cheese, sweet-and-sour gherkin, kimchi mayo, sun-dried tomato, rocket and black garlic barbecue sauce.',
    },
    precio: '15,9',
    chef: 'Chef Víctor Fernández',
    restaurante: { es: 'Morrofino · Santiago y Vigo', en: 'Morrofino · Santiago and Vigo' },
    recomendado: true,
    glutenFree: true,
    alergenos: ['crustaceos', 'huevos', 'pescado', 'soja', 'leche', 'sulfitos', 'moluscos'],
  },
  {
    cat: 'autor',
    nombre: 'Urbana Indómita',
    desc: {
      es: 'Pan crujiente gallego, Vaca Vieja 200 g, crema fundente de queso, tomate cherry confitado, pimiento de Padrón tatemado con ajo tostado y albahaca fresca.',
      en: 'Crunchy Galician bread, 200 g of vaca vieja, melting cheese cream, confit cherry tomatoes, charred Padrón pepper with toasted garlic and fresh basil.',
    },
    precio: '16,9',
    chef: 'Chef Martín Vázquez',
    restaurante: 'Indómito · Santiago',
    recomendado: true,
    alergenos: ['huevos', 'leche', 'sulfitos'],
  },

  // ─── MADE IN GALICIA ─────────────────────────────────────────────────────
  {
    cat: 'galicia',
    nombre: 'Urbana Clásica',
    desc: {
      es: 'Pan crujiente con Vaca Rubia Gallega, queso, tomate, lechuga, cebolla y salsa Urbana Rosé.',
      en: 'Crunchy bread with Rubia Gallega beef, cheese, tomato, lettuce, onion and Urbana Rosé sauce.',
    },
    precio: '13,0',
    alergenos: ['gluten', 'leche', 'apio', 'mostaza', 'sulfitos'],
    trazas: ['huevos'],
  },
  {
    cat: 'galicia',
    nombre: 'Urbana Cuarto de Libra',
    desc: {
      es: 'Pan crujiente con Vaca Rubia Gallega, lechuga, tomate natural, cebolla roja, queso cheddar, pepinillos, cebolla crujiente y salsa Urbana Rosé.',
      en: 'Crunchy bread with Rubia Gallega beef, lettuce, fresh tomato, red onion, cheddar, gherkins, crispy onion and Urbana Rosé sauce.',
    },
    precio: '13,0',
    alergenos: ['gluten', 'leche', 'apio', 'mostaza', 'sulfitos'],
    trazas: ['huevos'],
  },
  {
    cat: 'galicia',
    nombre: 'Urbana Real',
    desc: {
      es: 'Pan crujiente con Vaca Rubia Gallega, lechuga, queso de cabra al grill, cebolla caramelizada y salsa Urbana Rosé.',
      en: 'Crunchy bread with Rubia Gallega beef, lettuce, grilled goat\'s cheese, caramelised onion and Urbana Rosé sauce.',
    },
    precio: '12,9',
    alergenos: ['gluten', 'leche', 'sulfitos'],
  },
  {
    cat: 'galicia',
    nombre: 'Urbana Piamonte',
    desc: {
      es: 'Pan crujiente con Vaca Rubia Gallega, mermelada de tomate, crujiente de cebolla, salsa gorgonzola, lechuga, bacon ahumado y braseado.',
      en: 'Crunchy bread with Rubia Gallega beef, tomato jam, crispy onion, gorgonzola sauce, lettuce and smoked, braised bacon.',
    },
    precio: '13,9',
    recomendado: true,
    alergenos: ['gluten', 'soja', 'leche', 'sulfitos'],
  },
  {
    cat: 'galicia',
    nombre: 'Urbana Campera',
    desc: {
      es: 'Pan crujiente con Vaca Rubia Gallega, lechuga de roble, mozzarella, cebolla crujiente, queso philadelphia con panceta braseada, huevo campero Pazo de Vilane y miel ecológica de castaño.',
      en: 'Crunchy bread with Rubia Gallega beef, oak leaf lettuce, mozzarella, crispy onion, Philadelphia cream cheese with braised pork belly, Pazo de Vilane free-range egg and organic chestnut honey.',
    },
    precio: '14,5',
    recomendado: true,
    alergenos: ['gluten', 'huevos', 'leche', 'sulfitos'],
  },
  {
    cat: 'galicia',
    nombre: 'Urbana Mejicana',
    desc: {
      es: 'Pan crujiente con Vaca Rubia Gallega, lechuga, tomate natural, cebolla roja, jalapeños, cheddar, guacamole casero y salsa chilli. Acompañada de patatas fritas con tabasco.',
      en: 'Crunchy bread with Rubia Gallega beef, lettuce, fresh tomato, red onion, jalapeños, cheddar, homemade guacamole and chilli sauce. Served with Tabasco chips.',
    },
    precio: '14,0',
    glutenFree: true,
    alergenos: ['huevos', 'leche', 'sulfitos'],
    trazas: ['mostaza'],
  },
  {
    cat: 'galicia',
    nombre: 'Urbana Tártara',
    desc: {
      es: 'Pan crujiente gallego, Rubia Gallega 190 g, salsa cremosa de encurtidos, cebolla roja encurtida, rabanito fresco, mezclum y lascas de parmesano.',
      en: 'Crunchy Galician bread, 190 g of Rubia Gallega, creamy pickle sauce, pickled red onion, fresh radish, mesclun and Parmesan shavings.',
    },
    precio: '14,5',
    alergenos: ['huevos', 'soja', 'leche', 'mostaza', 'sulfitos'],
  },
  {
    cat: 'galicia',
    nombre: 'Urbana British',
    desc: {
      es: 'Pan crujiente con Vaca Rubia Gallega, lechuga, mermelada de tomate, queso cheddar, bacon y huevo frito.',
      en: 'Crunchy bread with Rubia Gallega beef, lettuce, tomato jam, cheddar, bacon and fried egg.',
    },
    precio: '13,9',
    recomendado: true,
    glutenFree: true,
    alergenos: ['huevos', 'leche', 'mostaza', 'sulfitos'],
  },
  {
    cat: 'galicia',
    nombre: 'Urbana Jalapeña',
    desc: {
      es: 'Pan crujiente con Vaca Rubia Gallega, crema jalapeña de queso, lechuga troceada, cebolla crujiente, rodaja de jalapeño, doble cheddar fundido, cebolla caramelizada, panceta crujiente y yema de huevo.',
      en: 'Crunchy bread with Rubia Gallega beef, jalapeño cheese cream, shredded lettuce, crispy onion, a slice of jalapeño, double melted cheddar, caramelised onion, crispy pork belly and egg yolk.',
    },
    precio: '14,5',
    alergenos: ['gluten', 'huevos', 'leche', 'sulfitos'],
    trazas: ['mostaza'],
  },

  // ─── VEGGIES ─────────────────────────────────────────────────────────────
  {
    cat: 'veggies',
    nombre: 'Urbana Rosé',
    desc: {
      es: 'Pan crujiente con carne vegana, queso cheddar veggie, hoja de roble, tomate, cebolla y exquisita salsa rosa vegana.',
      en: 'Crunchy bread with a vegan patty, veggie cheddar, oak leaf lettuce, tomato, onion and our delicious vegan pink sauce.',
    },
    precio: '13,9',
    alergenos: ['mostaza'],
    trazas: ['sulfitos'],
  },
  {
    cat: 'veggies',
    nombre: 'Urbana Berenjena',
    desc: {
      es: 'Pan crujiente gallego, burger vegetal, berenjena dorada y crujiente, tomate confitado, rúcula fresca y mayonesa agridulce.',
      en: 'Crunchy Galician bread, plant-based patty, golden crispy aubergine, confit tomato, fresh rocket and sweet-and-sour mayo.',
    },
    precio: '13,9',
    alergenos: ['gluten', 'mostaza', 'sulfitos'],
  },

  // ─── ENTREPANES ──────────────────────────────────────────────────────────
  {
    cat: 'entrepanes',
    nombre: 'Dechipis',
    desc: {
      es: 'Absolutely delicious chipis crujientes con lechuga de mar, alioli cítrico y un toque de lima.',
      en: 'Absolutely delicious crispy chipis (baby squid) with sea lettuce, citrus aioli and a squeeze of lime.',
    },
    precio: '10,9',
    alergenos: ['gluten', 'huevos', 'moluscos'],
    trazas: ['crustaceos', 'pescado', 'soja', 'leche', 'mostaza', 'sesamo'],
  },
  {
    cat: 'entrepanes',
    nombre: 'Rustic Way',
    desc: {
      es: 'Una delicia rústica de panceta crujiente, queso de Arzúa suave y cremoso, rematado con rúcula fresca.',
      en: 'A rustic treat of crispy pork belly and soft, creamy Arzúa cheese, finished with fresh rocket.',
    },
    precio: '10,9',
    alergenos: ['gluten', 'leche'],
    trazas: ['sesamo'],
  },
  {
    cat: 'galicia',
    nombre: 'Urbana Corralita',
    desc: {
      es: 'Pan crujiente y tiras de pollo empanado en panko (4 unid), queso cheddar, salsa Urbana Rosé, cebolla caramelizada, lechuga fresca y tomate.',
      en: 'Crunchy bread with panko-crusted chicken strips (4 pieces), cheddar, Urbana Rosé sauce, caramelised onion, fresh lettuce and tomato.',
    },
    precio: '12,5',
    alergenos: ['gluten', 'huevos', 'leche', 'apio', 'mostaza'],
    trazas: ['crustaceos'],
  },

  // ─── ENSALADAS ───────────────────────────────────────────────────────────
  {
    cat: 'ensaladas',
    nombre: 'Cebreiro Mood',
    desc: {
      es: 'Mezcla de lechugas frescas y brotes, huevo a baja temperatura, jamón y Queixo do Cebreiro. Todas nuestras ensaladas incluyen ración de pan semitostado.',
      en: 'Mixed fresh leaves and shoots, slow-cooked egg, ham and Queixo do Cebreiro. All our salads come with lightly toasted bread.',
    },
    precio: '10,5',
    alergenos: ['gluten', 'huevos', 'leche'],
    trazas: ['sesamo'],
  },
  {
    cat: 'ensaladas',
    nombre: { es: 'Kataifi y Guacamole', en: 'Kataifi & Guacamole' },
    desc: {
      es: 'Mezcla de lechugas frescas y brotes, tomates cherry, delicioso guacamole, cacahuetes garrapiñados, langostinos kataifi y queso parmesano. Incluye pan semitostado.',
      en: 'Mixed fresh leaves and shoots, cherry tomatoes, delicious guacamole, caramelised peanuts, kataifi prawns and Parmesan. Comes with lightly toasted bread.',
    },
    precio: '12,9',
    recomendado: true,
    alergenos: ['gluten', 'crustaceos', 'cacahuetes', 'leche', 'mostaza'],
    trazas: ['huevos', 'frutosSecos'],
  },
  {
    cat: 'ensaladas',
    nombre: { es: 'Ensalada César', en: 'Caesar salad' },
    desc: {
      es: 'Hoja de roble y brotes aderezados con vinagreta y salsa césar, tomate cherry, pollo crunchy, lascas de grana padano y picatostes. Incluye pan semitostado.',
      en: 'Oak leaf lettuce and shoots with vinaigrette and Caesar dressing, cherry tomatoes, crunchy chicken, Grana Padano shavings and croutons. Comes with lightly toasted bread.',
    },
    precio: '10,9',
    recomendado: true,
    alergenos: ['gluten', 'huevos', 'pescado', 'leche', 'mostaza', 'sulfitos'],
  },

  // ─── POSTRES ─────────────────────────────────────────────────────────────
  {
    cat: 'postres',
    nombre: { es: 'Cremosa de queso', en: 'Creamy cheesecake' },
    desc: {
      es: 'Cremosa tarta de queso fundida con mermelada de arándano.',
      en: 'Gooey, creamy cheesecake with blueberry jam.',
    },
    precio: '5,9',
    alergenos: ['gluten', 'huevos', 'leche'],
    trazas: ['soja', 'frutosSecos'],
  },
  {
    cat: 'postres',
    nombre: { es: 'Muerte por chocolate', en: 'Death by chocolate' },
    desc: {
      es: 'Bizcocho con dos capas de chocolate intenso decorado con topping de chocolate negro y crema inglesa.',
      en: 'Sponge cake with two layers of intense chocolate, topped with dark chocolate and custard.',
    },
    precio: '5,9',
    alergenos: ['gluten', 'huevos', 'leche', 'frutosSecos'],
    trazas: ['cacahuetes'],
  },
  {
    cat: 'postres',
    nombre: { es: 'Carrot especial', en: 'Special carrot cake' },
    desc: {
      es: 'Tarta de zanahoria con helado Ace cremoso, crujientes choco zetas y dulce baño de mango.',
      en: 'Carrot cake with creamy ACE (orange, carrot and lemon) ice cream, crunchy Choco Zetas and a sweet mango drizzle.',
    },
    precio: '5,9',
    alergenos: ['gluten', 'huevos', 'soja', 'leche', 'frutosSecos', 'sulfitos'],
    trazas: ['cacahuetes'],
  },
  {
    cat: 'postres',
    nombre: { es: 'Capricho de chocolate', en: 'Chocolate indulgence' },
    desc: {
      es: 'Delicioso coulant de chocolate derretido en el interior, acompañado de una bola de helado de vainilla bañada en chocolate y crujiente almendra.',
      en: 'A delicious chocolate lava cake with a molten centre, served with a scoop of vanilla ice cream dipped in chocolate and crunchy almond.',
    },
    precio: '5,9',
    alergenos: ['gluten', 'huevos', 'soja', 'leche'],
    trazas: ['frutosSecos'],
  },
  {
    cat: 'postres',
    nombre: { es: 'Tres chocolates', en: 'Triple chocolate' },
    desc: {
      es: 'Una tarta de locura con tres chocolates y el mejor tipo de galleta: la crujiente.',
      en: 'A crazy-good cake with three chocolates and the best kind of biscuit: the crunchy kind.',
    },
    precio: '4,5',
    alergenos: ['gluten', 'leche', 'frutosSecos', 'sulfitos'],
    trazas: ['soja', 'sesamo'],
  },
  {
    cat: 'postres',
    nombre: { es: 'Helado artesano', en: 'Artisan ice cream' },
    desc: {
      es: 'Escoge 2 bolas del sabor que más te guste: Nata, vainilla, chocolate y ACE (sin alérgenos).',
      en: 'Pick 2 scoops of your favourite flavours: cream, vanilla, chocolate and ACE (allergen-free).',
    },
    precio: '4,9',
    glutenFree: true,
    alergenos: ['cacahuetes', 'frutosSecos'],
  },
  {
    cat: 'postres',
    nombre: 'Blueberry & Cheese',
    desc: {
      es: 'Deliciosa crema de queso con galleta oreo y una base de arándano fresco. Sin galleta: libre de gluten.',
      en: 'Delicious cream cheese with Oreo biscuit and a fresh blueberry base. Without the biscuit: gluten-free.',
    },
    precio: '4,9',
    alergenos: ['gluten', 'soja', 'leche'],
  },
]
