# [CompuTechStore]

**Estudiante:** [Ludwing Calani Mamamni]
**Cliente:** [Ludwing Calani Mamani]
**URL publicada:** [DESPUES, PROXIMA SEMANA]

## Qué resuelve
[2-3 frases: qué problema tiene tu cliente y cómo lo ayuda este sitio]
[
1. Tener que buscar los productos para poder mostrar el producto que el cliente desea
2. Antes tenia que cotizar el precio de forma manual
3. No se podía hacer pedidos de productos
4. Tamíen ahora puede llegar a muchas personas mediante la página]

## Cómo está construido
- **Semántica:** [qué elementos usaste y dónde]
html lang="es" antes de la cabecera para que reconozca la escritura en español head despues del html lang para inicio como cabecera de la página meta charset="UTF-8" despues de head permite mostrar tíldes meta name="viewport" despues del meta charset-"UTF-8" que configura el anchoo y la escla de la pantalla meta name="description" descripcion de la web bodydonde irá el cuerpo de la web main onde irá el menú section donde ira las seccionesh1h2 h3, article, title, link, nav,figure, img, figcaption, table, fieldset, label, input,select, option, textarea, button,  aside, adrress footer,

- **Layout:** [dónde Flexbox, dónde Grid, y por qué]
flexbox en estilos css para configurar manejo de una sola fila
grid para el manejo de dos dimenciones al mmismo tiempo
- **Diseño:** [paleta y tipografía, y por qué las elegiste]

Usé colores en combinacion colores con verde pra hacer llamativo a la pagina como verde como color principal de las letras principales como el nombre de la de la paginay el fondo un verde mas claro para que resalte las ltreas de lapágina



## Capturas
![Escritorio](captura-escritorio.png)
![Móvil 375px](ruta/a/captura-movil.png) DESPUES, PROXIMA SEMANA

## Lo más difícil
[Qué problema técnico te costó más y cómo lo resolviste. Sé específico:
"el menú se salía de la pantalla en móvil y lo resolví con flex-wrap"
vale; "fue difícil pero lo logré" no vale.]

lo mas dificil fue centrear se resolvió con justify-content space -between

Las imagenes que agregué despues no se podia ajustar el tamaño que yo queria,aun no lo resolví

agregar un enlave de facebook lo resolví ><a hrefs>

## LABORATORIO 2

- **JavaScript y Modularización:**
  - `datos.js`: Almacena los productos del catálogo con sus datos (nombre, precio, categoría, imagen, stock y disponibilidad). La ruta de imagen se configura individualmente en cada producto.
  - `funciones.js`: Prácticas de funciones declaradas, funciones flecha (arrow functions), cálculos de totales, descuentos, impuestos y closures.
  - `render.js`: Manipulación dinámica del DOM; se encarga de crear cada tarjeta con `crearTarjeta()` e insertarlas en `<div id="lista-productos">` mediante `render(lista)` sin sobreescribir el resto de la sección.
  - `app.js`: Manejo de constantes, variables, tipos de datos y actualización dinámica del mensaje de stock en `#aviso-stock`.
  - `eventos.js`: Gestión de eventos e interactividad:
    - Búsqueda en tiempo real mediante el evento `input` en `#buscador`.
    - Filtrado por categorías mediante delegación de eventos `click` en `#filtros`, actualizando visualmente la clase `.activo`.
    - Validación y control del formulario con el evento `submit`, cancelando el reinicio no deseado con `event.preventDefault()` y validando fechas.
    - Actualización del contador dinámico `#resultado`.

- **Controles y scripts integrados en `index.html`:**
  - Inclusión de scripts modulares al final del `<body>`:
    ```html
    <script src="datos.js"></script>
    <script src="funciones.js"></script>
    <script src="render.js"></script>
    <script src="app.js"></script>
    <script src="eventos.js"></script>
    ```
  - Contenedor de controles interactivos (`.controles`):
    - Campo de búsqueda: `<input type="search" id="buscador">` con etiqueta `<label for="buscador" class="visualmente-oculto">` para accesibilidad.
    - Botones de categorías: `<div id="filtros">` con botones interactivos y atributos `data-categoria` (`todos`, `RAM`, `procesador`, `tarjeta gráfica`, etc.).
  - Contador y mensajes de resultados: `<p id="resultado" aria-live="polite"></p>` para anunciar en vivo la cantidad de productos coincidentes.
## LABORATORIO 3



- **Tablero para armar una PC:**
  - En `index.html` se muestran las columnas **Componentes de hardware** y **Arma tu PC**.
  - `tablero.js` carga los productos y sus existencias desde `datos.js`.
  - El botón **Agregar 1** descuenta una unidad de Componentes de hardware y la suma a Arma tu PC. Si el producto ya está en la lista, aumenta su cantidad.
  - El botón **Quitar 1** devuelve una unidad de Arma tu PC a Componentes de hardware. Al llegar a cero, el producto se quita de esa columna.
  - El arrastre entre columnas también transfiere una unidad por vez. Los totales y el gráfico se actualizan con cada movimiento.
  - Debajo de las columnas se muestra el detalle del armado, el precio unitario, el subtotal por componente y el costo total de la PC, actualizado al agregar o quitar unidades.

- **Orden del catálogo:**
  - El selector **Ordenar por** quedó al lado de **Nuestros productos**.
  - `eventos.js` ordena los productos por nombre, precio o stock, de forma ascendente, y mantiene activos los filtros de búsqueda y categoría.
  - `preferencias.js` conserva el criterio elegido y lo aplica al catálogo al cargar la página.

## Imágenes del catálogo

Cada producto define su ruta de imagen en la propiedad `imagen` de `datos.js`. Para cambiar una foto, edita esa ruta en el producto correspondiente; puedes asignar imágenes distintas incluso a productos de la misma categoría. Las fotos actuales son ilustrativas y pueden no corresponder al modelo exacto del producto publicado.

| Categoría | Autor | Licencia y fuente |
|---|---|---|
| RAM | PantheraLeo1359531 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) · [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:16_GiB-DDR4-RAM-Riegel_RAM019FIX_Small_Crop_90_PCNT.png) |
| Gabinetes | Foto local ya incluida en el proyecto | [torreCPU.jpg](./torreCPU.jpg) |
| Tarjetas madre | Smial | [Free Art License](http://artlibre.org/licence/lal/en) · [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Gigabyte_GA-H87M-D3H_motherboard_%C2%B5ATX_with_Intel_Socket_1150.jpg) |
| Fuentes de poder | Smial | [CC BY-SA 2.0 DE](https://creativecommons.org/licenses/by-sa/2.0/de/deed.en) · [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:ATX-Netzteil.jpg) |
| Procesadores | Justin Mathews | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) · [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Intel_Underside_%2844256686%29.jpeg) |
| Tarjetas gráficas | Evan-Amos | Dominio público · [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Gigabyte_GV-NX66T128VP.jpg) |
| Almacenamiento | Qurren | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) · [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Super_Talent_2.5in_SATA_SSD_SAM64GM25S.jpg) |
| Refrigeración | Dave Monk | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) · [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Water_Cooled_PC.jpg) |
| Monitores | florisla | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) · [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:LG_L194WT-SF_LCD_monitor.jpg) |