/* ═════════════════════════════════════════════════════════════════════════
   DEMO DEL DÍA 14 - Canvas y Drag & Drop

   Dos cosas que no se parecen en nada, unidas en un solo ejercicio: un
   tablero donde se arrastran productos entre columnas, y un gráfico que se
   redibuja al soltar.

   Es el último día de contenido nuevo antes del segundo parcial, y el que
   más se disfruta.
   ═════════════════════════════════════════════════════════════════════════ */

// El estado del tablero: qué producto está en qué columna.
// El DOM muestra el estado; NO es el estado. Si se lee del DOM para saber qué
// hay dónde, cualquier cambio visual rompe la lógica.
const COLUMNAS = ["componentes de hardware",  "arma tu pc"];
const capacidadCarrito = productos.reduce((total, producto) => total + producto.stock, 0);
let tablero = {
  "componentes de hardware": productos.map(producto => ({
    nombre: producto.nombre,
    cantidad: producto.stock,
    precio: producto.precio,
  })),
  
  "arma tu pc": [],
};

// ── 1. PINTAR EL TABLERO ────────────────────────────────────────────────
function renderTablero() {
  COLUMNAS.forEach((nombreColumna) => {
    const columna = document.querySelector(`[data-columna="${nombreColumna}"]`);
    const lista = columna.querySelector(".lista-columna");
    lista.innerHTML = "";

    tablero[nombreColumna].forEach((item, indice) => {
      const li = document.createElement("li");
      li.className = "ficha";
      li.draggable = true;
      li.dataset.columna = nombreColumna;
      li.dataset.indice = indice;

      const nombre = document.createElement("span");
      nombre.textContent = `${item.nombre} (${item.cantidad})`;
      li.append(nombre);

      if (nombreColumna === "componentes de hardware") {
        const botonAgregar = document.createElement("button");
        botonAgregar.type = "button";
        botonAgregar.className = "agregar-uno";
        botonAgregar.textContent = "Agregar 1";
        botonAgregar.setAttribute("aria-label", `Agregar una unidad de ${item.nombre} a Arma tu PC`);
        botonAgregar.disabled = item.cantidad < 1;
        li.append(botonAgregar);
      } else if (nombreColumna === "arma tu pc") {
        const botonQuitar = document.createElement("button");
        botonQuitar.type = "button";
        botonQuitar.className = "quitar-uno";
        botonQuitar.textContent = "Quitar 1";
        botonQuitar.setAttribute("aria-label", `Quitar una unidad de ${item.nombre} de Arma tu PC`);
        li.append(botonQuitar);
      }

      lista.append(li);
    });

    const total = tablero[nombreColumna].reduce((suma, i) => suma + i.cantidad, 0);
    const n = tablero[nombreColumna].length;
    columna.querySelector(".total").textContent =
      `${n} ${n === 1 ? "item" : "items"} · ${total} unidades`;
  });

  const productosEnCarrito = tablero["arma tu pc"].reduce((total, item) => total + item.cantidad, 0);
  const precioTotalPedido = tablero["arma tu pc"].reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );
  document.querySelector(".carrito-precio-total").textContent =
    `Total del pedido: Bs ${precioTotalPedido.toFixed(2)}`;
  const porcentajeCarrito = capacidadCarrito > 0
    ? Math.min((productosEnCarrito / capacidadCarrito) * 100, 100)
    : 0;
  const progresoCarrito = document.querySelector(".carrito-progreso");
  progresoCarrito.setAttribute("aria-valuemax", capacidadCarrito);
  progresoCarrito.setAttribute("aria-valuenow", productosEnCarrito);
  progresoCarrito.setAttribute(
    "aria-valuetext",
    `${productosEnCarrito} de ${capacidadCarrito} unidades en el carrito (${Math.round(porcentajeCarrito)}%)`
  );
  progresoCarrito.querySelector(".carrito-progreso-llenado").style.width = `${porcentajeCarrito}%`;
  document.querySelector(".carrito-progreso-texto").textContent =
    `${productosEnCarrito} de ${capacidadCarrito} unidades · ${Math.round(porcentajeCarrito)}%`;
  document.querySelector(".carrito-vacio").hidden = tablero["arma tu pc"].length > 0;
  document.querySelector(".boton-realizar-pedido").disabled = tablero["arma tu pc"].length === 0;
  document.querySelector(".vaciar-pedido").disabled = tablero["arma tu pc"].length === 0;
  dibujarGrafico();
}

// Se usa delegación porque las fichas se vuelven a crear en cada render.
const elTablero = document.querySelector("#tablero");

function transferirUnidad(origenColumna, indice, destinoColumna) {
  if (origenColumna === destinoColumna) return;

  const origen = tablero[origenColumna];
  const item = origen && origen[indice];
  if (!item || item.cantidad < 1) return;

  item.cantidad -= 1;
  const destino = tablero[destinoColumna];
  const itemExistente = destino.find(producto => producto.nombre === item.nombre);

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    destino.push({ nombre: item.nombre, cantidad: 1, precio: item.precio });
  }

  if (item.cantidad === 0) origen.splice(indice, 1);
  renderTablero();
}

elTablero.addEventListener("click", (event) => {
  const boton = event.target.closest(".agregar-uno, .quitar-uno, .vaciar-pedido, .boton-realizar-pedido");
  if (!boton) return;

  if (boton.classList.contains("boton-realizar-pedido")) {
    const carrito = tablero["arma tu pc"];
    if (carrito.length === 0) return;

    const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    const detalle = carrito.map(item =>
      `${item.nombre} x ${item.cantidad} — Bs ${(item.precio * item.cantidad).toFixed(2)}`
    );
    detalle.push(`Total: Bs ${total.toFixed(2)}`);

    const campoComponentes = document.querySelector("#componentes-carrito");
    campoComponentes.value = detalle.join("\n");
    document.querySelector("#pedido").scrollIntoView({ behavior: "smooth", block: "start" });
    campoComponentes.focus({ preventScroll: true });
    return;
  }

  if (boton.classList.contains("vaciar-pedido")) {
    const disponibles = tablero["componentes de hardware"];
    tablero["arma tu pc"].forEach((item) => {
      const existente = disponibles.find(producto => producto.nombre === item.nombre);
      if (existente) {
        existente.cantidad += item.cantidad;
      } else {
        disponibles.push({ ...item });
      }
    });
    tablero["arma tu pc"] = [];
    renderTablero();
    return;
  }

  const ficha = boton.closest(".ficha");
  const destino = boton.classList.contains("agregar-uno")
    ? "arma tu pc"
    : "componentes de hardware";
  transferirUnidad(ficha.dataset.columna, Number(ficha.dataset.indice), destino);
});

elTablero.addEventListener("dragstart", (event) => {
  const ficha = event.target.closest(".ficha");
  if (!ficha) return;

  event.dataTransfer.setData("text/plain", JSON.stringify({
    columna: ficha.dataset.columna,
    indice: Number(ficha.dataset.indice),
  }));
  event.dataTransfer.effectAllowed = "move";
  ficha.classList.add("arrastrando");
});

elTablero.addEventListener("dragend", (event) => {
  const ficha = event.target.closest(".ficha");
  if (ficha) ficha.classList.remove("arrastrando");
  document.querySelectorAll(".columna").forEach(c => c.classList.remove("encima"));
});

elTablero.addEventListener("dragover", (event) => {
  const columna = event.target.closest(".columna");
  if (!columna) return;

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  columna.classList.add("encima");
});

elTablero.addEventListener("dragleave", (event) => {
  const columna = event.target.closest(".columna");
  if (columna) columna.classList.remove("encima");
});

elTablero.addEventListener("drop", (event) => {
  const columna = event.target.closest(".columna");
  if (!columna) return;

  event.preventDefault();
  const destino = columna.dataset.columna;
  const origen = JSON.parse(event.dataTransfer.getData("text/plain"));
  transferirUnidad(origen.columna, origen.indice, destino);
});

const canvas = document.querySelector("#grafico");
const ctx = canvas.getContext("2d");

function dibujarGrafico() {
  const totales = COLUMNAS.map(c =>
    tablero[c].reduce((suma, i) => suma + i.cantidad, 0)
  );
  const maximo = Math.max(...totales, 1);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const margen = 40;
  const anchoBarra = 110;
  const separacion = 60;
  const alturaUtil = canvas.height - margen * 2;
  const estilo = getComputedStyle(document.body);
  const colorBarra = estilo.getPropertyValue("--color-principal").trim() || "#1a4a7a";
  const colorTexto = estilo.getPropertyValue("--color-texto").trim() || "#1f2933";

  COLUMNAS.forEach((nombre, i) => {
    const x = margen + i * (anchoBarra + separacion);
    const alto = (totales[i] / maximo) * alturaUtil;
    const y = canvas.height - margen - alto;

    ctx.fillStyle = colorBarra;
    ctx.fillRect(x, y, anchoBarra, alto);

    ctx.fillStyle = colorTexto;
    ctx.font = "14px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(nombre, x + anchoBarra / 2, canvas.height - margen + 20);
    ctx.fillText(String(totales[i]), x + anchoBarra / 2, y - 8);
  });

  ctx.beginPath();
  ctx.moveTo(margen - 10, canvas.height - margen);
  ctx.lineTo(canvas.width - margen + 10, canvas.height - margen);
  ctx.strokeStyle = colorTexto;
  ctx.lineWidth = 1;
  ctx.stroke();
}

renderTablero();
