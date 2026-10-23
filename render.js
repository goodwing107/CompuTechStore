/* ═════════════════════════════════════════════════════════════════════════
   DEMO DEL DÍA 8 - El DOM

   Hoy la página deja de ser HTML escrito a mano. El arreglo de datos.js se
   convierte en las tarjetas que se ven en pantalla.

   QUÉ ES EL DOM: al cargar la página, el navegador lee el HTML y construye
   con él un ÁRBOL DE OBJETOS en memoria. Ese árbol es el DOM.

       el archivo index.html   es el plano
       el DOM                  es el edificio ya construido

   JavaScript no modifica el archivo: modifica el edificio. Por eso al
   recargar vuelve todo a como estaba en el plano.

   Se puede ver el árbol en la pestaña Elements del inspector, y editarlo ahí
   a mano: es el mismo DOM que toca este archivo.
   ═════════════════════════════════════════════════════════════════════════ */

// ── 1. SELECCIONAR ──────────────────────────────────────────────────────
// Dos funciones, y la diferencia importa:
//
//   querySelector      devuelve el PRIMER elemento que coincide, o null
//   querySelectorAll   devuelve TODOS, en una NodeList (parecida a un arreglo)
//
// Los dos usan selectores de CSS, los mismos del Día 3: "#productos",
// ".tarjeta", "header p". No hay que aprender nada nuevo para buscar.
const contenedor = document.querySelector("#lista-productos");
const titulos = document.querySelectorAll("h2");

console.log("El contenedor existe:", contenedor !== null);
console.log("Hay", titulos.length, "encabezados h2 en la página");

// Una NodeList NO es un arreglo: no tiene map ni filter. Para usarlos, se
// convierte con Array.from(...) o con el spread [...].
const textosDeTitulos = [...titulos].map(t => t.textContent);
console.log(textosDeTitulos);

// ── 2. LEER Y MODIFICAR CONTENIDO ───────────────────────────────────────
// textContent  el texto, y SOLO texto. Si le pasas "<b>hola</b>" escribe eso
//              literal, con los símbolos incluidos.
// innerHTML    interpreta lo que recibe COMO HTML y lo construye.
//
// PELIGRO REAL, y no es teórico: si se mete en innerHTML algo que escribió un
// usuario, se le está dejando inyectar etiquetas en la página. Eso es un
// ataque XSS. La regla práctica:
//
//     texto que viene de una persona  ->  textContent, SIEMPRE
//     HTML que construye tu código    ->  innerHTML, con cuidado
//
// En este archivo se usa innerHTML solo con texto que arma el propio código.

// ── 3. ATRIBUTOS Y CLASES ───────────────────────────────────────────────
// classList es la forma correcta de cambiar la apariencia desde JavaScript:
//
//     classList.add("activo")       agrega la clase
//     classList.remove("activo")    la quita
//     classList.toggle("activo")    la pone si no está, la quita si está
//     classList.contains("activo")  pregunta si está
//
// Por qué se prefiere a tocar element.style directamente: la apariencia sigue
// viviendo en el CSS, que es su lugar. El JavaScript solo decide QUÉ clase
// tiene el elemento, no de qué color es. Si mañana cambia el color, se toca
// el CSS y no hay que buscar en los scripts.
//
// dataset guarda datos propios en el HTML con atributos data-*:
//     <article data-nombre="Alfajor">   se lee como   el.dataset.nombre
// Sirve para que un elemento recuerde a qué dato corresponde.

// ── 4. CREAR ELEMENTOS ──────────────────────────────────────────────────
// createElement crea un elemento suelto, que todavía NO está en la página.
// append lo mete dentro de otro, y ahí recién aparece.
//
// Esta función arma UNA tarjeta a partir de UN producto. Recibe un objeto y
// devuelve un elemento listo para insertar.
function crearTarjeta(producto) {
  const articulo = document.createElement("article");

  // La clase decide la apariencia; el CSS decide qué significa esa clase.
  articulo.classList.add("tarjeta");
  if (!producto.disponible) {
    articulo.classList.add("agotado");
  }

  // El elemento recuerda a qué producto corresponde. Mañana, cuando haya
  // clics, esto es lo que permitirá saber en cuál se hizo clic.
  articulo.dataset.nombre = producto.nombre;

  // innerHTML aquí es seguro: todo lo que se inserta lo arma este código.
  // Si `producto.nombre` viniera de un formulario, habría que usar
  // textContent en su lugar.
  articulo.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p class="precio">Bs ${producto.precio.toFixed(2)}</p>
    <p class="stock">${producto.disponible ? `${producto.stock} en stock` : "Agotado"}</p>
  `;

  return articulo;
}

// ── 5. RENDER: EL PATRÓN DEL MÓDULO ─────────────────────────────────────
// Esta función es el corazón del Lab 2, del Lab 3 y del proyecto final.
//
// Hace siempre lo mismo, en tres pasos:
//
//     1. VACIAR el contenedor
//     2. RECORRER los datos
//     3. INSERTAR un elemento por cada dato
//
// Vaciar primero es lo que la hace repetible: se puede llamar cien veces con
// datos distintos y nunca duplica nada. Sin ese paso, cada llamada agrega
// tarjetas encima de las anteriores.
//
// Recibe la lista como PARÁMETRO, en vez de leer la variable global. Así la
// misma función sirve para pintar todos los productos, o solo los filtrados,
// o solo los de una categoría. Mañana eso vale oro.
function render(lista) {
  contenedor.innerHTML = "";                 // 1. vaciar

  lista.forEach(producto => {                // 2. recorrer
    contenedor.append(crearTarjeta(producto)); // 3. insertar
  });

  // Un mensaje para el caso vacío. Una lista vacía no es un error, pero una
  // pantalla en blanco sin explicación parece uno.
  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No hay productos que mostrar.</p>";
  }
}

// ── 6. PINTAR ───────────────────────────────────────────────────────────
// productos viene de datos.js, que se carga antes que este archivo.
render(productos);

// Y como render recibe la lista, pintar otra cosa es cambiar el argumento.
// Estas dos líneas se pueden probar en la consola:
//     render(productos.filter(p => p.disponible));
//     render(productos.filter(p => p.categoria === "dulces"));

// ── 7. RECORRER EL ÁRBOL ────────────────────────────────────────────────
// Desde un elemento se puede llegar a sus vecinos:
//     parentElement   el padre
//     children        los hijos
//     closest(sel)    el ancestro más cercano que coincida con el selector
//
// closest es el que más se usa: mañana, al hacer clic en un botón dentro de
// una tarjeta, closest(".tarjeta") devuelve la tarjeta entera.
const primeraTarjeta = document.querySelector(".tarjeta");
console.log("Padre de la primera tarjeta:", primeraTarjeta.parentElement.id);
console.log("Su producto es:", primeraTarjeta.dataset.nombre);

// ── 8. POBLAR SELECT DE PEDIDOS DINÁMICAMENTE ───────────────────────────
// Llena el <select id="producto"> a partir del arreglo de datos.js.
// Así, al añadir, quitar o modificar productos en datos.js, la lista
// desplegable de pedidos siempre estará actualizada automáticamente.
const selectProducto = document.querySelector("#producto");

function poblarSelectProductos(lista) {
  if (!selectProducto) return;

  // Se conserva la opción por defecto
  selectProducto.innerHTML = '<option value="">Elige uno</option>';

  lista.forEach(producto => {
    const opcion = document.createElement("option");
    opcion.value = producto.nombre;
    opcion.textContent = `${producto.nombre} - Bs ${producto.precio}`;

    if (!producto.disponible) {
      opcion.disabled = true;
      opcion.textContent += " (Agotado)";
    }

    selectProducto.append(opcion);
  });
}

poblarSelectProductos(productos);


