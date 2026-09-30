// Lienzo del camino en escritorio: medidas en unidades de un ancho de 1440; todo escala con el ancho de pantalla.
// y = 0 es el horizonte del hero. Se edita en /nosotros?editar-camino (solo en desarrollo) y se guarda con
// "Guardar en el proyecto", que reescribe este archivo.
export const LIENZO = { ancho: 1440, alto: 3377 }

export const CAMINO = 'M893.945,9.574C703.945,9.574,393.59,32.765,418.168,285.452,432.941,437.337,608.091,492.578,728.608,452.88,1049.309,347.241,1076.546,290.912,1227.512,336.983,1408.802,392.308,1459.016,800.021,1194.689,850.891,1036.981,881.242,607.125,719.157,466.429,765.62,291.55,823.371,288.414,1094.042,438.016,1125.76,745.899,1191.036,1051.188,916.521,1187.224,909.437,1298.515,903.641,1354.737,1039.949,1234.362,1060.94,941.759,1111.964,415.291,1297.102,314.442,1430.493,152.521,1644.661,403.678,1882.348,695.80612,1722.16163,966.886,1573.516,1080.331,1572.038,1097.943,1678.516,1160.883,2059.041,302.646,1674.33,236.419,1997.753,120.605,2563.334,865.232,2268.583,946,2250,1063.401,2222.987,1167.845,2316.452,1160,2470,1147.986,2705.125,832.207,2755.9,685.094,2645.308,596.362,2578.604,487.826,2360.878,359.559,2403.666,135.106,2478.539,175.562,3117.196,555.752,3066.37,830.154,3029.686,935.932,2799.953,1167.521,2910.326,1284.307,2965.985,1346.078,3241.954,1223.323,3274.249,1027.114,3325.868,262.747,2939.2,337.185,3376.296'

// Posición de cada tarjeta: su texto (esquina superior izquierda, ancho, giro y alineación) y su foto (esquina superior
// izquierda y giro), por separado.
export const FILAS = [
  { texto: { giro: -2.2, alinear: 'izquierda', x: 504, y: 153, ancho: 309 }, foto: { giro: -2.3, x: 256, y: 156 } },
  { texto: { giro: -5.3, alinear: 'derecha', x: 678, y: 484, ancho: 329 }, foto: { giro: -5, x: 1025, y: 397 } },
  { texto: { giro: 0, alinear: 'izquierda', x: 419, y: 807, ancho: 341 }, foto: { giro: -0.5, x: 75, y: 722 } },
  { texto: { giro: 0, alinear: 'izquierda', x: 1105, y: 1133, ancho: 295 }, foto: { giro: -0.6, x: 850, y: 1093 } },
  { texto: { giro: -2.9, alinear: 'izquierda', x: 385, y: 1399, ancho: 343 }, foto: { giro: -3, x: 126, y: 1357 } },
  { texto: { giro: 4.1, alinear: 'izquierda', x: 1107, y: 1625, ancho: 286 }, foto: { giro: 3.7, x: 843, y: 1656 } },
  { texto: { giro: -0.3, alinear: 'izquierda', x: 384, y: 2013, ancho: 400 }, foto: { giro: -0.3, x: 129, y: 1966 } },
  { texto: { giro: -3.8, alinear: 'derecha', x: 728, y: 2310, ancho: 331 }, foto: { giro: -4, x: 1079, y: 2209 } },
  { texto: { giro: 10.5, alinear: 'izquierda', x: 482, y: 2705, ancho: 336 }, foto: { giro: 11, x: 238, y: 2573 } },
]

// Dónde va cada punto verde; se ajusta solo al punto más cercano del camino.
export const NODOS = [{ x: 487, y: 108 }, { x: 1211, y: 342 }, { x: 360, y: 870 }, { x: 1152, y: 1077 }, { x: 402, y: 1356 }, { x: 1032, y: 1567 }, { x: 299, y: 1906 }, { x: 946, y: 2249 }, { x: 236, y: 2560 }, { x: 335, y: 3379 }]
