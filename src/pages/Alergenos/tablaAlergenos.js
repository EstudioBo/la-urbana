// Tabla oficial de alérgenos de La Urbana (Carta Local de BAP, julio 2026, pág. 7).
// contiene = X de la tabla, trazas = T. Las burgers van sin pan ni patatas, como en la tabla. Corea y Mejicana van
// sin gluten a propósito, igual que en la carta (cartaData.js): se venden como Gluten Free.
// Nombres de platos en inglés: los mismos que en la carta (cartaData.js)
export const SECCIONES = [
  {
    titulo: { es: 'Entrantes', en: 'Starters' },
    platos: [
      { nombre: { es: 'Langostinos Kataifi', en: 'Kataifi prawns' }, contiene: ['gluten', 'crustaceos', 'sulfitos'], trazas: ['huevos', 'pescado', 'cacahuetes', 'soja', 'leche', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'moluscos'] },
      { nombre: { es: 'Alitas de pollo', en: 'Chicken wings' }, contiene: ['gluten', 'soja', 'apio', 'mostaza'], trazas: ['crustaceos', 'huevos', 'pescado', 'cacahuetes', 'leche', 'frutosSecos', 'sesamo', 'sulfitos', 'moluscos'] },
      { nombre: { es: 'Aros de cebolla a la cerveza', en: 'Beer-battered onion rings' }, contiene: ['gluten', 'leche', 'sulfitos'], trazas: ['crustaceos', 'huevos', 'pescado', 'cacahuetes', 'soja', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'moluscos'] },
      { nombre: { es: 'Camperitos de pollo', en: 'Chicken Camperitos' }, contiene: ['huevos', 'pescado', 'mostaza'], trazas: ['gluten', 'crustaceos', 'cacahuetes', 'soja', 'leche', 'frutosSecos', 'apio', 'sesamo', 'sulfitos', 'moluscos'] },
      { nombre: { es: 'Croquetas de jamón', en: 'Ham croquettes' }, contiene: ['gluten', 'leche'], trazas: ['crustaceos', 'huevos', 'pescado', 'cacahuetes', 'soja', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'sulfitos', 'moluscos'] },
      { nombre: { es: 'Croquetas de chipirones', en: 'Baby squid croquettes' }, contiene: ['gluten', 'crustaceos', 'pescado', 'leche', 'moluscos'], trazas: ['huevos', 'cacahuetes', 'soja', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'sulfitos'] },
      { nombre: { es: 'Chipirones de la Ría', en: 'Chipirones de la ría' }, contiene: ['gluten', 'huevos', 'moluscos'], trazas: ['crustaceos', 'pescado', 'cacahuetes', 'soja', 'leche', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'sulfitos'] },
    ],
  },
  {
    titulo: { es: 'De la huerta', en: 'From the garden' },
    platos: [
      { nombre: 'Cebreiro Mood', contiene: ['gluten', 'huevos', 'leche'], trazas: ['sesamo'] },
      { nombre: { es: 'Kataifi y guacamole', en: 'Kataifi & Guacamole' }, contiene: ['gluten', 'crustaceos', 'cacahuetes', 'leche', 'mostaza'], trazas: ['huevos', 'frutosSecos'] },
      { nombre: { es: 'Ensalada César', en: 'Caesar salad' }, contiene: ['gluten', 'huevos', 'pescado', 'leche', 'mostaza', 'sulfitos'], trazas: [] },
    ],
  },
  {
    titulo: { es: 'Entrepanes', en: 'Sandwiches' },
    platos: [
      { nombre: 'Dechipis', contiene: ['gluten', 'huevos', 'moluscos'], trazas: ['crustaceos', 'pescado', 'soja', 'leche', 'mostaza', 'sesamo'] },
      { nombre: 'Rustic Way', contiene: ['gluten', 'leche'], trazas: ['sesamo'] },
    ],
  },
  {
    titulo: 'Burgers',
    nota: { es: 'Sin pan ni patatas', en: 'Without bread or chips' },
    platos: [
      { nombre: 'Urbana Corea', contiene: ['crustaceos', 'huevos', 'pescado', 'soja', 'leche', 'sulfitos', 'moluscos'], trazas: [] },
      { nombre: 'Urbana Antollo Galego', contiene: ['crustaceos', 'huevos', 'pescado', 'soja', 'leche'], trazas: [] },
      { nombre: 'Urbana Fina', contiene: ['gluten', 'huevos', 'pescado', 'leche', 'mostaza', 'sulfitos'], trazas: [] },
      { nombre: 'Urbana Corralita', contiene: ['gluten', 'huevos', 'leche', 'apio', 'mostaza'], trazas: ['crustaceos'] },
      { nombre: 'Urbana Real', contiene: ['gluten', 'leche', 'sulfitos'], trazas: [] },
      { nombre: 'Urbana British', contiene: ['huevos', 'leche', 'mostaza', 'sulfitos'], trazas: [] },
      { nombre: 'Urbana Piamonte', contiene: ['gluten', 'soja', 'leche', 'sulfitos'], trazas: [] },
      { nombre: 'Urbana Campera', contiene: ['gluten', 'huevos', 'leche', 'sulfitos'], trazas: [] },
      { nombre: 'Urbana Mejicana', contiene: ['huevos', 'leche', 'sulfitos'], trazas: ['mostaza'] },
      { nombre: 'Urbana Cuarto de Libra', contiene: ['gluten', 'leche', 'apio', 'mostaza', 'sulfitos'], trazas: ['huevos'] },
      { nombre: 'Urbana Clásica', contiene: ['gluten', 'leche', 'apio', 'mostaza', 'sulfitos'], trazas: ['huevos'] },
      { nombre: 'Urbana Jalapeña', contiene: ['gluten', 'huevos', 'leche', 'sulfitos'], trazas: ['mostaza'] },
      { nombre: 'Urbana Rosé', contiene: ['mostaza'], trazas: ['sulfitos'] },
      { nombre: 'Urbana Berenjena', contiene: ['gluten', 'mostaza', 'sulfitos'], trazas: [] },
      { nombre: 'Urbana Tártara', contiene: ['huevos', 'soja', 'leche', 'mostaza', 'sulfitos'], trazas: [] },
      { nombre: 'Urbana Indómita', contiene: ['huevos', 'leche', 'sulfitos'], trazas: [] },
      { nombre: { es: 'Clásica al plato', en: 'Clásica on a plate' }, contiene: ['huevos', 'sulfitos'], trazas: [] },
      { nombre: { es: 'Real al plato', en: 'Real on a plate' }, contiene: ['huevos', 'sulfitos'], trazas: [] },
      { nombre: { es: 'British al plato', en: 'British on a plate' }, contiene: ['huevos', 'sulfitos'], trazas: [] },
      { nombre: { es: 'Padrón al plato', en: 'Padrón on a plate' }, contiene: ['leche'], trazas: [] },
    ],
  },
  {
    titulo: { es: 'Panes', en: 'Breads' },
    platos: [
      { nombre: { es: 'Pan crujiente', en: 'Crunchy bread' }, contiene: ['gluten'], trazas: ['huevos', 'soja', 'leche', 'mostaza', 'sesamo', 'altramuces'] },
      { nombre: { es: 'Pan sin gluten', en: 'Gluten-free bread' }, contiene: [], trazas: [] },
      { nombre: { es: 'Pan brioche (Menudín)', en: 'Brioche bun (Menudín)' }, contiene: ['gluten', 'huevos', 'soja', 'leche', 'mostaza'], trazas: ['sesamo'] },
      { nombre: { es: 'Pan Brooklyn', en: 'Brooklyn bun' }, contiene: ['gluten', 'huevos', 'soja', 'leche'], trazas: ['mostaza', 'sesamo'] },
    ],
  },
  {
    titulo: { es: 'Postres', en: 'Desserts' },
    platos: [
      { nombre: { es: 'Muerte por chocolate', en: 'Death by chocolate' }, contiene: ['gluten', 'huevos', 'leche', 'frutosSecos'], trazas: ['cacahuetes'] },
      { nombre: 'Blueberry & Cheese', contiene: ['gluten', 'soja', 'leche'], trazas: [] },
      { nombre: { es: 'Cremosa de queso', en: 'Creamy cheesecake' }, contiene: ['gluten', 'huevos', 'leche'], trazas: ['soja', 'frutosSecos'] },
      { nombre: { es: 'Capricho de chocolate', en: 'Chocolate indulgence' }, contiene: ['gluten', 'huevos', 'soja', 'leche'], trazas: ['frutosSecos'] },
      { nombre: { es: 'Carrot especial', en: 'Special carrot cake' }, contiene: ['gluten', 'huevos', 'soja', 'leche', 'frutosSecos', 'sulfitos'], trazas: ['cacahuetes'] },
      { nombre: { es: 'Tres chocolates', en: 'Triple chocolate' }, contiene: ['gluten', 'leche', 'frutosSecos', 'sulfitos'], trazas: ['soja', 'sesamo'] },
      { nombre: { es: 'Helado artesano', en: 'Artisan ice cream' }, contiene: ['cacahuetes', 'frutosSecos'], trazas: [] },
    ],
  },
  {
    titulo: { es: 'Para niños', en: 'Kids' },
    platos: [
      { nombre: { es: 'Croquetas de jamón', en: 'Ham croquettes' }, contiene: ['gluten', 'leche'], trazas: ['crustaceos', 'huevos', 'pescado', 'soja', 'frutosSecos', 'apio', 'sesamo', 'sulfitos', 'moluscos'] },
      { nombre: 'Burger', contiene: ['leche'], trazas: [] },
      { nombre: { es: 'Camperitos de pollo', en: 'Chicken Camperitos' }, contiene: ['huevos', 'pescado', 'mostaza'], trazas: ['gluten', 'crustaceos', 'cacahuetes', 'soja', 'leche', 'frutosSecos', 'apio', 'sesamo', 'sulfitos', 'moluscos'] },
      { nombre: { es: 'Pan brioche', en: 'Brioche bun' }, contiene: ['gluten', 'huevos', 'soja', 'leche', 'mostaza'], trazas: ['sesamo'] },
    ],
  },
  {
    titulo: 'Casa Grande de Xanceda',
    platos: [
      { nombre: 'Ele con fresas', contiene: ['leche'], trazas: [] },
      { nombre: { es: 'Yogur ecológico "Sin azúcar"', en: 'Organic yoghurt "Sugar-free"' }, contiene: ['leche'], trazas: [] },
      { nombre: { es: 'Natillas de chocolate', en: 'Chocolate custard' }, contiene: ['leche'], trazas: [] },
    ],
  },
  {
    titulo: { es: 'Helado artesano', en: 'Artisan ice cream' },
    platos: [
      { nombre: { es: 'Vainilla', en: 'Vanilla' }, contiene: ['huevos', 'leche'], trazas: [] },
      { nombre: { es: 'Nata', en: 'Cream' }, contiene: ['leche'], trazas: [] },
      { nombre: { es: 'Chocolate negro', en: 'Dark chocolate' }, contiene: ['leche'], trazas: ['frutosSecos'] },
    ],
  },
  {
    titulo: { es: 'Patatas', en: 'Chips' },
    platos: [
      { nombre: { es: 'Crujientes artesanas', en: 'Artisan crispy chips' }, contiene: [], trazas: ['gluten'] },
      { nombre: { es: 'Gajo finas hierbas', en: 'Herb potato wedges' }, contiene: ['gluten'], trazas: [] },
    ],
  },
  {
    titulo: { es: 'Salsas', en: 'Sauces' },
    platos: [
      { nombre: { es: 'Salsa rosa', en: 'Pink sauce' }, contiene: ['gluten', 'apio', 'mostaza'], trazas: ['huevos', 'leche'] },
      { nombre: { es: 'Salsa César', en: 'Caesar dressing' }, contiene: ['gluten', 'huevos', 'pescado', 'leche', 'mostaza'], trazas: [] },
      { nombre: { es: 'Salsa chilli', en: 'Chilli sauce' }, contiene: ['huevos'], trazas: [] },
      { nombre: { es: 'Salsa mostaza y miel', en: 'Honey mustard sauce' }, contiene: ['huevos', 'mostaza'], trazas: ['sesamo'] },
      { nombre: { es: 'Crema de queso y jalapeños', en: 'Jalapeño cream cheese' }, contiene: ['leche', 'sulfitos'], trazas: [] },
    ],
  },
  {
    titulo: { es: 'Ingredientes extra', en: 'Extras' },
    platos: [
      { nombre: { es: 'Setas', en: 'Mushrooms' }, contiene: [], trazas: [] },
      { nombre: { es: 'Pepinillo', en: 'Gherkin' }, contiene: ['sulfitos'], trazas: [] },
      { nombre: { es: 'Huevo frito', en: 'Fried egg' }, contiene: ['huevos'], trazas: [] },
      { nombre: { es: 'Panceta braseada', en: 'Braised pork belly' }, contiene: [], trazas: [] },
      { nombre: 'Bacon', contiene: [], trazas: [] },
      { nombre: { es: 'Queso de cabra', en: 'Goat\'s cheese' }, contiene: ['leche'], trazas: [] },
      { nombre: { es: 'Queso San Simón', en: 'San Simón cheese' }, contiene: ['huevos', 'leche'], trazas: [] },
      { nombre: 'Jalapeños', contiene: ['sulfitos'], trazas: [] },
      { nombre: 'Guacamole', contiene: [], trazas: [] },
      { nombre: { es: 'Jamón serrano', en: 'Serrano ham' }, contiene: [], trazas: [] },
    ],
  },
]
