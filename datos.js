/* ═════════════════════════════════════════════════════════════════════════
   DEMO DEL DÍA 7 - Objetos, arreglos y clases

   Hoy los datos del cliente empiezan a EXISTIR en el código. Hasta ayer las
   funciones recibían números sueltos; a partir de hoy trabajan sobre datos
   con forma.

   El ciclo 2 de este archivo (los métodos de arreglo) es el que más rinde de
   todo el módulo: aparece en el Lab 2, en el Lab 3, en los dos parciales y en
   el proyecto final.

   Todo se comprueba en la consola. La página se pinta mañana.
   ═════════════════════════════════════════════════════════════════════════ */

// ── 1. OBJETO LITERAL ───────────────────────────────────────────────────
// Un objeto agrupa datos que describen UNA cosa. Cada dato es una propiedad:
// un nombre y un valor, separados por dos puntos.
//
// Frente a tener variables sueltas (nombrePan, precioPan, stockPan...), el
// objeto mantiene junto lo que va junto, y se puede pasar completo a una
// función con un solo argumento.
const productoDelDia = {
  nombre: "Memoria RAM del día",
  precio: 0.5,
  categoria: "RAM",
  stock: 40,
  disponible: true,
};

// Dos formas de leer una propiedad:
//   con punto      cuando el nombre se conoce al escribir el código
//   con corchetes  cuando el nombre está en una variable, o tiene espacios
console.log(productoDelDia.nombre);

const propiedad = "precio";
console.log(productoDelDia[propiedad]);      // con punto esto NO funcionaría

// Los objetos se modifican, se amplían y se recortan aunque sean const.
// const impide REASIGNAR la variable, no cambiar lo que hay adentro.
productoDelDia.stock = 35;                   // modificar
productoDelDia.integral = false;             // agregar una propiedad nueva
delete productoDelDia.integral;              // quitarla

// ── 2. DESTRUCTURING ────────────────────────────────────────────────────
// Saca propiedades de un objeto y las deja como variables sueltas, en una
// línea. Los nombres entre llaves tienen que coincidir con las propiedades.
//
// Es lo mismo que escribir:
//     const nombre = productoDelDia.nombre;
//     const precio = productoDelDia.precio;
// pero se lee mucho mejor cuando son varias.
const { nombre, precio } = productoDelDia;
console.log(`${nombre} cuesta Bs ${precio}`);

// El spread ... copia todas las propiedades de un objeto en otro nuevo.
// Sirve para copiar cambiando algo, sin tocar el original.
const productoDeAyer = { ...productoDelDia, precio: 0.3, nombre: "Memoria RAM usada" };
console.log(productoDeAyer);

// ── 3. ARREGLO DE OBJETOS ───────────────────────────────────────────────
// La estructura más común de toda la programación web: una LISTA de cosas,
// donde cada cosa tiene la MISMA forma.
//
// Que todos los objetos tengan las mismas propiedades no es un detalle: es lo
// que permite recorrerlos con un solo bloque de código.
const productos = [
  { nombre: "Memoria RAM 8 GB DDR3 KingFast", precio: 170, categoria: "RAM", stock: 40, disponible: true },
  { nombre: "Memoria RAM 8 GB DDR4 Kingston", precio: 190, categoria: "RAM", stock: 80, disponible: true },
  { nombre: "Memoria RAM 8 GB DDR5 Corsair rgb", precio: 600, categoria: "RAM", stock: 20, disponible: true },
  { nombre: "Gabinete Corsair", precio: 400, categoria: "gabinete", stock: 25, disponible: true },
  { nombre: "Tarjeta madre ASUS TUF Z360 Plus Gaming", precio: 1600, categoria: "tarjeta madre", stock: 15, disponible: true },
  { nombre: "Tarjeta madre MSI GE66 Raider Gaming", precio: 2200, categoria: "tarjeta madre", stock: 8, disponible: true },
  { nombre: "Fuente de poder EVGA 700 W 80 Plus Platinum", precio: 500, categoria: "fuente de poder", stock: 15, disponible: true },
  { nombre: "Fuente de poder SENTEY 700 W 80 Plus gold modular", precio: 600, categoria: "fuente de poder", stock: 9, disponible: true },
  { nombre: "Procesador Intel i9 13900K", precio: 3000, categoria: "procesador", stock: 16, disponible: true },
  { nombre: "Procesador Intel i5 14400F", precio: 2600, categoria: "procesador", stock: 12, disponible: true },
  { nombre: "Procesador AMD Ryzen 9 7950x", precio: 4300, categoria: "procesador", stock: 16, disponible: true },
  { nombre: "Procesador AMD Ryzen 7 7800x3D", precio: 4600, categoria: "procesador", stock: 13, disponible: true },
  { nombre: "Procesador AMD Ryzen 5 7600", precio: 3400, categoria: "procesador", stock: 6, disponible: true },
  { nombre: "Tarjeta de video EVGA GTX 1060 6 GB", precio: 3000, categoria: "tarjeta gráfica", stock: 18, disponible: true },
  { nombre: "Tarjeta de video ASUS RTX 5060 8 GB", precio: 5000, categoria: "tarjeta gráfica", stock: 12, disponible: true },
  { nombre: "Tarjeta de video AMD RTX 5060 8 GB", precio: 4500, categoria: "tarjeta gráfica", stock: 8, disponible: true },
  { nombre: "SSD Kingston 500 GB", precio: 900, categoria: "almacenamiento", stock: 50, disponible: true },
  { nombre: "SSD NVM Kingston 500 GB", precio: 1200, categoria: "almacenamiento", stock: 50, disponible: true },
  { nombre: "HDD Western Digital 1 TB", precio: 450, categoria: "almacenamiento", stock: 60, disponible: true },
  { nombre: "Refrigeración líquida Corsair iCUE H150i", precio: 1000, categoria: "refrigeración", stock: 8, disponible: true },
  { nombre: "Refrigeración líquida DEEPCOOL LEE360", precio: 1076, categoria: "refrigeración", stock: 8, disponible: true },
  { nombre: "Monitor MSI MPG 314CQR 24 144Hz", precio: 1000, categoria: "monitor", stock: 8, disponible: true },
  { nombre: "Monitor Gamer Samsung 24 144Hz", precio: 1500, categoria: "monitor", stock: 12, disponible: true },
];

// ── 4. LOS MÉTODOS QUE IMPORTAN ─────────────────────────────────────────
// Todos reciben una FUNCIÓN como argumento, que es lo que se vio ayer.
// Cada uno la aplica a cada elemento y hace algo distinto con el resultado.
// 
// La diferencia clave, y la que más confunde al principio:
//
//     forEach   recorre y NO DEVUELVE NADA. Es para hacer algo con cada uno.
//     map       recorre y DEVUELVE un arreglo nuevo, del mismo largo.
//     filter    recorre y DEVUELVE un arreglo nuevo, solo con los que pasan.
//     find      recorre y DEVUELVE el PRIMERO que pasa (un objeto, no lista).
//     reduce    recorre y DEVUELVE UN SOLO valor acumulado.
//
// Ninguno modifica el arreglo original: todos devuelven algo nuevo.

// forEach: hacer algo con cada uno. No sirve para obtener una lista.
productos.forEach(p => console.log(p.nombre));

// map: transformar cada elemento. Devuelve tantos elementos como había.
const nombres = productos.map(p => p.nombre);
console.log(nombres);

// filter: quedarse con los que cumplen. Devuelve los que pasan, o ninguno.
const disponibles = productos.filter(p => p.disponible);
console.log(disponibles.length, "de", productos.length, "disponibles");

// find: buscar UNO. Devuelve el objeto, o undefined si no hay ninguno.
const caro = productos.find(p => p.precio > 40);
console.log(caro);

// includes y some/every: preguntas de sí o no.
console.log(nombres.includes("Gabinete Corsair"));            // ¿está en la lista?
console.log(productos.some(p => p.stock === 0));     // ¿alguno agotado?
console.log(productos.every(p => p.precio > 0));     // ¿todos tienen precio?

// sort: ORDENA EL ARREGLO ORIGINAL, a diferencia de los anteriores.
// Por eso se ordena sobre una copia, hecha con spread, salvo que se quiera
// modificar el original a propósito.
// La función recibe dos elementos y devuelve un número: negativo si a va
// antes, positivo si b va antes.
const porPrecio = [...productos].sort((a, b) => a.precio - b.precio);
console.log(porPrecio.map(p => p.nombre));

// reduce: el más difícil y el más potente. Recorre acumulando un valor.
//   acumulador   lo que se lleva de las vueltas anteriores
//   p            el elemento de esta vuelta
//   0            el valor con el que arranca el acumulador
const valorInventario = productos.reduce((acumulador, p) => acumulador + p.precio * p.stock, 0);
console.log("Valor del inventario: Bs", valorInventario.toFixed(2));

// ── 5. ENCADENAR ────────────────────────────────────────────────────────
// Como filter y map devuelven arreglos, se les puede pedir otro método
// directamente. Se lee de izquierda a derecha, como una frase:
// "de los productos, los disponibles, y de esos, sus nombres".
const nombresDisponibles = productos
  .filter(p => p.disponible)
  .map(p => p.nombre);
console.log(nombresDisponibles);

// Tres preguntas de negocio resueltas encadenando:
const totalProcesadoresEnStock = productos
  .filter(p => p.categoria === "procesador" && p.disponible)
  .reduce((total, p) => total + p.precio * p.stock, 0);
console.log("Procesadores en stock: Bs", totalProcesadoresEnStock.toFixed(2));

// Agrupar por categoría con reduce. El acumulador aquí es un OBJETO, no un
// número: se va llenando con una lista por cada categoría encontrada.
const porCategoria = productos.reduce((grupos, p) => {
  if (!grupos[p.categoria]) grupos[p.categoria] = [];
  grupos[p.categoria].push(p.nombre);
  return grupos;
}, {});
console.log(porCategoria);

// ── 6. CLASES ───────────────────────────────────────────────────────────
// Una clase es un molde para crear objetos que comparten forma Y
// comportamiento. El constructor recibe los datos y arma la instancia; this
// se refiere al objeto que se está creando.
//
// CUÁNDO CONVIENE: cuando cada objeto necesita METODOS propios, o cuando se
// van a crear muchos con la misma lógica.
// CUÁNDO NO: si solo se guardan datos, un objeto literal alcanza y es más
// simple. En un proyecto de este tamaño, muchas veces alcanza.
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  // Un método es una función que vive dentro de la clase y puede usar this.
  estaDisponible() {
    return this.stock > 0;
  }

  valorEnStock() {
    return this.precio * this.stock;
  }
}

const mouse = new Producto("Mouse gamer", 80.0, 50);
console.log(mouse.nombre, mouse.estaDisponible(), mouse.valorEnStock());

// Herencia: una clase puede extender otra y quedarse con todo lo suyo.
// super(...) llama al constructor de la clase padre. Es obligatorio, y va
// antes de usar this.
class ProductoConDescuento extends Producto {
  constructor(nombre, precio, stock, descuento) {
    super(nombre, precio, stock);
    this.descuento = descuento;
  }

  precioFinal() {
    return this.precio * (1 - this.descuento / 100);
  }
}

const rosquete = new ProductoConDescuento("Rosquete", 1.0, 20, 25);
console.log(rosquete.precioFinal(), rosquete.estaDisponible());

