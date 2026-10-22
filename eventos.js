/* ═════════════════════════════════════════════════════════════════════════
   DEMO DEL DÍA 9 - Eventos, formularios y validación

   Hasta ayer la página se pintaba sola una vez y se quedaba quieta. Hoy
   responde: se puede buscar, filtrar y enviar un pedido.

   LA IDEA CENTRAL: un evento es algo que PASA (un clic, una tecla, un envío
   de formulario). El código no espera a que pase: deja escrita una función y
   el navegador la llama cuando ocurre.

       addEventListener("click", funcion)
                          │        │
                          │        └── qué hacer cuando pase
                          └─────────── qué hay que esperar

   Eso es lo que ayer se llamó "las funciones son valores": aquí se le entrega
   una función al navegador para que la guarde y la llame más tarde.
   ═════════════════════════════════════════════════════════════════════════ */

// ── 1. LOS ELEMENTOS QUE SE VAN A ESCUCHAR ──────────────────────────────
const buscador = document.querySelector("#buscador");
const filtros = document.querySelector("#filtros");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("form");

// El estado de la interfaz: qué está filtrando el usuario ahora mismo.
// Se guarda aparte porque los dos filtros (texto y categoría) se combinan:
// sin esto, elegir una categoría borraría lo que se escribió en el buscador.
let categoriaActiva = "todos";
let textoBuscado = "";

// ── 2. UNA SOLA FUNCIÓN QUE DECIDE QUÉ MOSTRAR ──────────────────────────
// Aplica los dos filtros sobre la lista completa y llama al render de ayer.
//
// Fíjate en que render() no cambió ni una línea. Recibir la lista como
// parámetro, que ayer parecía un detalle, es lo que hace posible todo esto.
function actualizar() {
  const visibles = productos
    .filter(p => categoriaActiva === "todos" || p.categoria === categoriaActiva)
    .filter(p => p.nombre.toLowerCase().includes(textoBuscado.toLowerCase()));

  render(visibles);
  resultado.textContent = `${visibles.length} de ${productos.length} productos`;
}

actualizar();   // primer pintado, con los filtros vacíos

// ── 3. EL EVENTO input ──────────────────────────────────────────────────
// input se dispara con CADA tecla, así que la lista se filtra mientras se
// escribe. change, en cambio, espera a que el campo pierda el foco.
//
// event.target es el elemento donde ocurrió el evento. Aquí, el buscador.
buscador.addEventListener("input", (event) => {
  textoBuscado = event.target.value;
  actualizar();
});

// ── 4. DELEGACIÓN DE EVENTOS ────────────────────────────────────────────
// Hay cuatro botones de categoría. Se podrían poner cuatro listeners, uno en
// cada uno. No se hace, por dos razones:
//
//   1. Con veinte botones serían veinte listeners.
//   2. Y sobre todo: los elementos creados DESPUÉS (como las tarjetas que
//      pinta render) no tendrían listener, porque no existían cuando se
//      pusieron. Es el error más frustrante de la semana.
//
// La solución es escuchar en el PADRE, que sí existe siempre. Los eventos
// suben por el árbol desde donde ocurrieron: un clic en un botón también es
// un clic en su contenedor. Se pregunta por event.target para saber en cuál
// de los hijos fue.
filtros.addEventListener("click", (event) => {
  // closest sube desde donde se hizo clic hasta encontrar un <button>.
  // Sirve porque el clic puede caer en un icono o un texto DENTRO del botón.
  const boton = event.target.closest("button");
  if (!boton) return;                     // el clic fue en el hueco, se ignora

  categoriaActiva = boton.dataset.categoria;

  // Marcar visualmente cuál está activo: se quita la clase a todos y se le
  // pone al elegido. Es más simple que llevar la cuenta de cuál era el anterior.
  filtros.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
  boton.classList.add("activo");

  actualizar();
});

// ── 5. EL EVENTO submit Y preventDefault ────────────────────────────────
// Por defecto, enviar un formulario recarga la página y manda los datos al
// servidor. Como aquí no hay servidor, eso solo borraría todo.
//
// preventDefault() cancela ese comportamiento por defecto del navegador.
// En un formulario manejado con JavaScript es SIEMPRE la primera línea.
formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  // checkValidity() ejecuta la validación NATIVA del HTML: los required, los
  // type="email", los pattern. Devuelve true si todo está bien.
  // reportValidity() hace lo mismo y además muestra los mensajes del navegador.
  if (!formulario.reportValidity()) {
    return;                               // el navegador ya avisó qué falta
  }

  // Validación propia, para lo que el HTML no cubre: la fecha no puede ser pasada.
  const fecha = formulario.querySelector("#fecha");
  const hoy = new Date().toISOString().slice(0, 10);
  if (fecha.value < hoy) {
    // setCustomValidity inyecta un mensaje propio en el sistema de validación
    // del navegador, así que se ve igual que los mensajes nativos.
    fecha.setCustomValidity("La fecha de entrega no puede ser anterior a hoy.");
    fecha.reportValidity();
    // Se borra al corregir la fecha; si no, el navegador bloquea el envío.
    fecha.addEventListener("input", () => fecha.setCustomValidity(""), { once: true });
    return;
  }

  // FormData lee todos los campos del formulario de una vez, por su atributo
  // name. Object.fromEntries lo convierte en un objeto normal.
  const datos = Object.fromEntries(new FormData(formulario));
  console.log("Pedido recibido:", datos);

  resultado.textContent = `Gracias ${datos.nombre}, el pedido quedó registrado.`;
  formulario.reset();
});

// ── 6. EXPRESIONES REGULARES, LO JUSTO ──────────────────────────────────
// Una expresión regular es un patrón para describir la forma de un texto.
// No hay que aprender a escribirlas hoy: hay que aprender a LEERLAS y a usar
// las que ya existen.
//
// Las piezas que aparecen en casi todas:
//     ^      el principio del texto
//     $      el final
//     [0-9]  cualquier dígito
//     {7,8}  entre 7 y 8 veces lo anterior
//     +      una o más veces
//     \.     un punto literal (sin la barra, el punto significa "cualquiera")
//
// Los anclas ^ y $ son importantes: sin ellos, el patrón se conforma con
// encontrar una coincidencia EN ALGUNA PARTE del texto, y "abc12345678xyz"
// pasaría como teléfono válido.
const PATRONES = {
  telefono: /^[0-9]{7,8}$/,               // 7 u 8 dígitos, y nada más
  correo: /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i, // algo, arroba, algo, punto, letras
  ci: /^[0-9]{5,10}(-[0-9A-Za-z]{1,3})?$/, // cédula, con complemento opcional
};

// test() devuelve true o false. Es lo único que hace falta hoy.
console.log("70123456 válido:", PATRONES.telefono.test("70123456"));
console.log("7012 válido:", PATRONES.telefono.test("7012"));
console.log("ana@correo.bo válido:", PATRONES.correo.test("ana@correo.bo"));

// ── 7. LA VALIDACIÓN DE VERDAD NO ESTÁ AQUÍ ─────────────────────────────
// Todo lo anterior mejora la EXPERIENCIA: avisa temprano y evita viajes al
// servidor. Pero no protege nada.
//
// Cualquiera puede abrir el inspector y borrar un required, o mandar los datos
// sin pasar por el formulario. La validación que protege es la del SERVIDOR,
// y eso es el módulo 2, en Proyecto de Software.
//
// La regla, y no es opcional: validar en el cliente Y en el servidor. El
// cliente por comodidad, el servidor por seguridad.

