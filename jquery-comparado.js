/* ═════════════════════════════════════════════════════════════════════════
   DEMO DEL DÍA 10 - jQuery: la misma funcionalidad, escrita dos veces

   POR QUÉ EXISTIÓ jQUERY. En 2006 cada navegador tenía su propia API. Para
   escuchar un clic había que escribir addEventListener en unos e attachEvent
   en Internet Explorer. Para buscar un elemento por clase no había nada
   estándar: se recorría el árbol a mano.

   jQuery unificó todo eso detrás de una sola función, $(), y convirtió diez
   líneas en una. Fue, con diferencia, la librería más usada de la historia
   de la web.

   POR QUÉ HOY LA INDUSTRIA USA OTRA COSA. Los navegadores se estandarizaron.
   querySelector, classList, fetch y addEventListener llegaron a la plataforma
   y hacen lo mismo sin descargar nada. jQuery pasó de resolver un problema a
   agregar unos 30 KB.

   ENTONCES POR QUÉ SE ESTUDIA. Por dos razones honestas: está en el contenido
   mínimo del programa, y hay millones de líneas en producción escritas con él.
   Quien mantenga código existente se lo va a encontrar.

   No se estudia porque sea la mejor herramienta hoy. Se estudia porque hay que
   saber leerlo.
   ═════════════════════════════════════════════════════════════════════════ */

// ── 1. COMPROBAR QUE CARGÓ ──────────────────────────────────────────────
// $ es solo un nombre de variable que jQuery deja definido. jQuery es el
// nombre largo de lo mismo, y sirve cuando $ está ocupado por otra librería.
console.log("jQuery versión:", $.fn.jquery);

// ── 2. ESPERAR AL DOM ───────────────────────────────────────────────────
// En vanilla se resuelve poniendo el <script> al final del body, que es lo
// que se hace desde el Día 5. jQuery trae además su propia forma:
//
//     $(document).ready(function () { ... });     forma larga
//     $(function () { ... });                     forma corta, la misma
//
// Aquí no hace falta, porque el script ya va al final. Se muestra porque
// aparece en casi todo el código jQuery que van a encontrar.

// ── 3. SELECCIONAR ──────────────────────────────────────────────────────
// $() recibe un selector de CSS, igual que querySelector.
//
// LA DIFERENCIA QUE MÁS CONFUNDE: no devuelven lo mismo.
//
//   querySelector       devuelve UN ELEMENTO del DOM
//   $()                 devuelve un OBJETO jQUERY: una colección, aunque
//                       coincida un solo elemento
//
// Por eso $(...).textContent no funciona: el objeto jQuery no tiene esa
// propiedad. Hay que usar sus métodos, o sacar el elemento de adentro.
const vanillaP = document.querySelector("#salida-vanilla");   // un elemento
const jqueryP = $("#salida-jquery");                          // una colección

console.log("vanilla es un elemento:", vanillaP instanceof HTMLElement);
console.log("jQuery es una colección de", jqueryP.length);

// Para pasar de uno a otro:
//     $(elemento)      envuelve un elemento del DOM en un objeto jQuery
//     $coleccion[0]    saca el primer elemento del DOM de la colección
console.log("mismo elemento:", $(vanillaP)[0] === vanillaP);

// ── 4. LEER Y ESCRIBIR CONTENIDO ────────────────────────────────────────
// Cada par de líneas hace exactamente lo mismo.
//
//   vanilla                          jQuery
//   ────────────────────────────     ──────────────────────
//   el.textContent = "x"             $(el).text("x")
//   el.innerHTML = "<b>x</b>"        $(el).html("<b>x</b>")
//   input.value                      $(input).val()
//   el.getAttribute("href")          $(el).attr("href")
//
// Un detalle de jQuery que hay que conocer para leerlo: el MISMO método sirve
// para leer y para escribir. Con argumento, escribe. Sin argumento, lee.
//
//     $(el).text()          devuelve el texto
//     $(el).text("hola")    lo cambia
vanillaP.textContent = "Cambiado con vanilla: document.querySelector + textContent";
jqueryP.text("Cambiado con jQuery: $() + .text()");

// ── 5. CLASES ───────────────────────────────────────────────────────────
//   el.classList.add("x")            $(el).addClass("x")
//   el.classList.remove("x")         $(el).removeClass("x")
//   el.classList.toggle("x")         $(el).toggleClass("x")
//   el.classList.contains("x")       $(el).hasClass("x")
//
// Prácticamente los mismos nombres. Aquí jQuery ya no ahorra casi nada:
// classList llegó a los navegadores y le quitó la ventaja.

// ── 6. EVENTOS ──────────────────────────────────────────────────────────
// Los dos botones hacen lo mismo, escritos de las dos formas.

// vanilla
document.querySelector("#boton-vanilla").addEventListener("click", () => {
  vanillaP.classList.toggle("resaltado");
});

// jQuery
$("#boton-jquery").on("click", function () {
  $(this).closest("section").find("#salida-jquery").toggleClass("resaltado");
});

// Sobre ese `this`: dentro de un handler de jQuery escrito con `function`,
// this es el elemento donde ocurrió el evento. NO funciona igual con una
// arrow function, porque las arrow no tienen this propio. Es la razón por la
// que casi todo el código jQuery usa `function` y no flechas.

// ── 7. CHAINING ─────────────────────────────────────────────────────────
// La característica que hizo famoso a jQuery: casi todos sus métodos
// devuelven el mismo objeto jQuery, así que se pueden encadenar.
//
// LA REGLA DE ORO: si un método devuelve el objeto jQuery, se puede encadenar.
// Los que LEEN un valor (.text() sin argumento, .val(), .attr() de un solo
// argumento) devuelven ese valor y cortan la cadena.
$("#salida-jquery")
  .addClass("destacado")
  .attr("data-origen", "jquery")
  .css("cursor", "pointer");

// El mismo resultado sin librería son tres líneas y una variable:
vanillaP.classList.add("destacado");
vanillaP.setAttribute("data-origen", "vanilla");
vanillaP.style.cursor = "pointer";

// ── 8. LA COMPARACIÓN QUE IMPORTA ───────────────────────────────────────
// Filtrar la lista de productos, escrito de las dos formas.
// La lógica es idéntica: cambia la sintaxis, no el razonamiento.
//
//   vanilla:
//       document.querySelectorAll(".tarjeta").forEach(t => {
//         t.style.display = "none";
//       });
//
//   jQuery:
//       $(".tarjeta").hide();
//
// jQuery aplica el método a TODA la colección sin escribir el bucle. Eso
// sigue siendo más corto hoy, y es lo que más se extraña al dejarlo.
console.log("Tarjetas que ve jQuery:", $(".tarjeta").length);
console.log("Tarjetas que ve vanilla:", document.querySelectorAll(".tarjeta").length);

