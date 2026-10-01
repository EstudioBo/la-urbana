// Tabla oficial de alérgenos de La Urbana (Carta Local de BAP, julio 2026, pág. 7).
// contiene = X de la tabla, trazas = T. Las burgers van sin pan ni patatas, como en la tabla. Corea y Mejicana van
// sin gluten a propósito, igual que en la carta (cartaData.js): se venden como Gluten Free.
export const SECCIONES = [
  {
    titulo: 'Entrantes',
    platos: [
      { nombre: 'Langostinos Kataifi', contiene: ['gluten', 'crustaceos', 'sulfitos'], trazas: ['huevos', 'pescado', 'cacahuetes', 'soja', 'leche', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'moluscos'] },
      { nombre: 'Alitas de pollo', contiene: ['gluten', 'soja', 'apio', 'mostaza'], trazas: ['crustaceos', 'huevos', 'pescado', 'cacahuetes', 'leche', 'frutosSecos', 'sesamo', 'sulfitos', 'moluscos'] },
      { nombre: 'Aros de cebolla a la cerveza', contiene: ['gluten', 'leche', 'sulfitos'], trazas: ['crustaceos', 'huevos', 'pescado', 'cacahuetes', 'soja', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'moluscos'] },
      { nombre: 'Camperitos de pollo', contiene: ['huevos', 'pescado', 'mostaza'], trazas: ['gluten', 'crustaceos', 'cacahuetes', 'soja', 'leche', 'frutosSecos', 'apio', 'sesamo', 'sulfitos', 'moluscos'] },
      { nombre: 'Croquetas de jamón', contiene: ['gluten', 'leche'], trazas: ['crustaceos', 'huevos', 'pescado', 'cacahuetes', 'soja', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'sulfitos', 'moluscos'] },
      { nombre: 'Croquetas de chipirones', contiene: ['gluten', 'crustaceos', 'pescado', 'leche', 'moluscos'], trazas: ['huevos', 'cacahuetes', 'soja', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'sulfitos'] },
      { nombre: 'Chipirones de la Ría', contiene: ['gluten', 'huevos', 'moluscos'], trazas: ['crustaceos', 'pescado', 'cacahuetes', 'soja', 'leche', 'frutosSecos', 'apio', 'mostaza', 'sesamo', 'sulfitos'] },
    ],
  },
  {
    titulo: 'De la huerta',
    platos: [
      { nombre: 'Cebreiro Mood', contiene: ['gluten', 'huevos', 'leche'], trazas: ['sesamo'] },
      { nombre: 'Kataifi y guacamole', contiene: ['gluten', 'crustaceos', 'cacahuetes', 'leche', 'mostaza'], trazas: ['huevos', 'frutosSecos'] },
      { nombre: 'Ensalada César', contiene: ['gluten', 'huevos', 'pescado', 'leche', 'mostaza', 'sulfitos'], trazas: [] },
    ],
  },
  {
    titulo: 'Entrepanes',
    platos: [
      { nombre: 'Dechipis', contiene: ['gluten', 'huevos', 'moluscos'], trazas: ['crustaceos', 'pescado', 'soja', 'leche', 'mostaza', 'sesamo'] },
      { nombre: 'Rustic Way', contiene: ['gluten', 'leche'], trazas: ['sesamo'] },
    ],
  },
  {
    titulo: 'Burgers',
    nota: 'Sin pan ni patatas',
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
      { nombre: 'Clásica al plato', contiene: ['huevos', 'sulfitos'], trazas: [] },
      { nombre: 'Real al plato', contiene: ['huevos', 'sulfitos'], trazas: [] },
      { nombre: 'British al plato', contiene: ['huevos', 'sulfitos'], trazas: [] },
      { nombre: 'Padrón al plato', contiene: ['leche'], trazas: [] },
    ],
  },
  {
    titulo: 'Panes',
    platos: [
      { nombre: 'Pan crujiente', contiene: ['gluten'], trazas: ['huevos', 'soja', 'leche', 'mostaza', 'sesamo', 'altramuces'] },
      { nombre: 'Pan sin gluten', contiene: [], trazas: [] },
      { nombre: 'Pan brioche (Menudín)', contiene: ['gluten', 'huevos', 'soja', 'leche', 'mostaza'], trazas: ['sesamo'] },
      { nombre: 'Pan Brooklyn', contiene: ['gluten', 'huevos', 'soja', 'leche'], trazas: ['mostaza', 'sesamo'] },
    ],
  },
  {
    titulo: 'Postres',
    platos: [
      { nombre: 'Muerte por chocolate', contiene: ['gluten', 'huevos', 'leche', 'frutosSecos'], trazas: ['cacahuetes'] },
      { nombre: 'Blueberry & Cheese', contiene: ['gluten', 'soja', 'leche'], trazas: [] },
      { nombre: 'Cremosa de queso', contiene: ['gluten', 'huevos', 'leche'], trazas: ['soja', 'frutosSecos'] },
      { nombre: 'Capricho de chocolate', contiene: ['gluten', 'huevos', 'soja', 'leche'], trazas: ['frutosSecos'] },
      { nombre: 'Carrot especial', contiene: ['gluten', 'huevos', 'soja', 'leche', 'frutosSecos', 'sulfitos'], trazas: ['cacahuetes'] },
      { nombre: 'Tres chocolates', contiene: ['gluten', 'leche', 'frutosSecos', 'sulfitos'], trazas: ['soja', 'sesamo'] },
      { nombre: 'Helado artesano', contiene: ['cacahuetes', 'frutosSecos'], trazas: [] },
    ],
  },
  {
    titulo: 'Para niños',
    platos: [
      { nombre: 'Croquetas de jamón', contiene: ['gluten', 'leche'], trazas: ['crustaceos', 'huevos', 'pescado', 'soja', 'frutosSecos', 'apio', 'sesamo', 'sulfitos', 'moluscos'] },
      { nombre: 'Burger', contiene: ['leche'], trazas: [] },
      { nombre: 'Camperitos de pollo', contiene: ['huevos', 'pescado', 'mostaza'], trazas: ['gluten', 'crustaceos', 'cacahuetes', 'soja', 'leche', 'frutosSecos', 'apio', 'sesamo', 'sulfitos', 'moluscos'] },
      { nombre: 'Pan brioche', contiene: ['gluten', 'huevos', 'soja', 'leche', 'mostaza'], trazas: ['sesamo'] },
    ],
  },
  {
    titulo: 'Casa Grande de Xanceda',
    platos: [
      { nombre: 'Ele con fresas', contiene: ['leche'], trazas: [] },
      { nombre: 'Yogur ecológico "Sin azúcar"', contiene: ['leche'], trazas: [] },
      { nombre: 'Natillas de chocolate', contiene: ['leche'], trazas: [] },
    ],
  },
  {
    titulo: 'Helado artesano',
    platos: [
      { nombre: 'Vainilla', contiene: ['huevos', 'leche'], trazas: [] },
      { nombre: 'Nata', contiene: ['leche'], trazas: [] },
      { nombre: 'Chocolate negro', contiene: ['leche'], trazas: ['frutosSecos'] },
    ],
  },
  {
    titulo: 'Patatas',
    platos: [
      { nombre: 'Crujientes artesanas', contiene: [], trazas: ['gluten'] },
      { nombre: 'Gajo finas hierbas', contiene: ['gluten'], trazas: [] },
    ],
  },
  {
    titulo: 'Salsas',
    platos: [
      { nombre: 'Salsa rosa', contiene: ['gluten', 'apio', 'mostaza'], trazas: ['huevos', 'leche'] },
      { nombre: 'Salsa César', contiene: ['gluten', 'huevos', 'pescado', 'leche', 'mostaza'], trazas: [] },
      { nombre: 'Salsa chilli', contiene: ['huevos'], trazas: [] },
      { nombre: 'Salsa mostaza y miel', contiene: ['huevos', 'mostaza'], trazas: ['sesamo'] },
      { nombre: 'Crema de queso y jalapeños', contiene: ['leche', 'sulfitos'], trazas: [] },
    ],
  },
  {
    titulo: 'Ingredientes extra',
    platos: [
      { nombre: 'Setas', contiene: [], trazas: [] },
      { nombre: 'Pepinillo', contiene: ['sulfitos'], trazas: [] },
      { nombre: 'Huevo frito', contiene: ['huevos'], trazas: [] },
      { nombre: 'Panceta braseada', contiene: [], trazas: [] },
      { nombre: 'Bacon', contiene: [], trazas: [] },
      { nombre: 'Queso de cabra', contiene: ['leche'], trazas: [] },
      { nombre: 'Queso San Simón', contiene: ['huevos', 'leche'], trazas: [] },
      { nombre: 'Jalapeños', contiene: ['sulfitos'], trazas: [] },
      { nombre: 'Guacamole', contiene: [], trazas: [] },
      { nombre: 'Jamón serrano', contiene: [], trazas: [] },
    ],
  },
]
