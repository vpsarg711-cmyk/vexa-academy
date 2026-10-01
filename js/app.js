/* =========================================================
   VPS ARG Academy · datos y navegación
   Los tutoriales se definen acá, separados del HTML.
   Para agregar o cambiar uno, editá el arreglo TUTORIALES.
   ========================================================= */

const SOPORTE_URL = "https://wa.me/5493435350260";

/* Categorías y subcategorías. Solo se muestran las subcategorías
   que tienen al menos un tutorial. */
const CATEGORIAS = [
  {
    id: "telefono",
    nombre: "Configuración del teléfono",
    icono: "fas fa-mobile-screen",
    grupos: ["iPhone (iOS)", "Samsung", "Motorola", "Xiaomi", "Otros Android y teléfonos chinos"]
  },
  {
    id: "herramientas",
    nombre: "Herramientas",
    icono: "fas fa-toolbox",
    grupos: ["Aplicación oficial VPS ARG", "HTTP Custom", "NPV Tunnel"]
  },
  {
    id: "mantenimiento",
    nombre: "Mantenimiento",
    icono: "fas fa-broom",
    grupos: [
      "Mantenimiento de la aplicación",
      "Limpieza de la aplicación",
      "Mantenimiento y optimización del teléfono",
      "Problemas frecuentes"
    ]
  },
  {
    id: "conexion",
    nombre: "Conexión y primeros pasos",
    icono: "fas fa-bolt",
    grupos: ["Inicio de sesión", "Cómo conectarse", "Cómo comprobar el estado de la conexión"]
  }
];

/* Enlaces provisionales: son los originales del sitio, sin el
   parámetro de seguimiento ?si=. Se actualizarán más adelante. */
const TUTORIALES = [
  { titulo: "App oficial", categoria: "herramientas", grupo: "Aplicación oficial VPS ARG", plataforma: "Android", url: "https://play.google.com/store/apps/details?id=app.vpsarg", icono: "fab fa-google-play" },
  { titulo: "Funciones", categoria: "herramientas", grupo: "Aplicación oficial VPS ARG", plataforma: "Android", url: "https://youtu.be/uX9KEiLRNaQ", icono: "fas fa-book-open" },
  { titulo: "NPV Tunnel", categoria: "herramientas", grupo: "NPV Tunnel", plataforma: "iPhone", url: "https://youtu.be/gfrcX_rHVms", icono: "npv" },
  { titulo: "iPhone", categoria: "telefono", grupo: "iPhone (iOS)", plataforma: "iPhone", url: "https://youtu.be/2at2H-a8nbs", icono: "fab fa-apple" },
  { titulo: "Xiaomi 1", categoria: "telefono", grupo: "Xiaomi", plataforma: "Android", url: "https://youtu.be/P-hLzRqw1vM", icono: "fas fa-mobile-screen" },
  { titulo: "Xiaomi 2", categoria: "telefono", grupo: "Xiaomi", plataforma: "Android", url: "https://youtu.be/g5iXW6hv-H0", icono: "fas fa-gear" },
  { titulo: "Android", categoria: "telefono", grupo: "Otros Android y teléfonos chinos", plataforma: "Android", url: "https://youtu.be/BI4g81rd8_Q", icono: "fas fa-mobile-alt" },
  { titulo: "Ajuste extra", categoria: "telefono", grupo: "Otros Android y teléfonos chinos", plataforma: "Android", url: "https://youtu.be/B_UexBPaO0w", icono: "fas fa-sliders-h" },
  { titulo: "Limpieza", categoria: "mantenimiento", grupo: "Limpieza de la aplicación", plataforma: "Android", url: "https://youtu.be/5b3rosyQAJE", icono: "fas fa-broom" },
  { titulo: "Conexión", categoria: "conexion", grupo: "Cómo conectarse", plataforma: "Android", url: "https://youtu.be/OdqmaE2aCHM", icono: "fas fa-bolt" },
  { titulo: "Conexión iPhone", categoria: "conexion", grupo: "Cómo conectarse", plataforma: "iPhone", url: "https://youtu.be/7t_-WX2ZdhE", icono: "fas fa-link" }
];

/* Opciones guiadas de VEXA (sin IA: respuestas fijas). */
const OPCIONES_VEXA = [
  { texto: "Configurar mi iPhone", categoria: "telefono", grupo: "iPhone (iOS)" },
  { texto: "Configurar mi Xiaomi", categoria: "telefono", grupo: "Xiaomi" },
  { texto: "Otro Android", categoria: "telefono", grupo: "Otros Android y teléfonos chinos" },
  { texto: "Herramientas y app oficial", categoria: "herramientas" },
  { texto: "Mantenimiento", categoria: "mantenimiento" },
  { texto: "Conectarme", categoria: "conexion" }
];

const filtro = { categoria: null, grupo: null };

const $ = (id) => document.getElementById(id);

function crearElemento(tag, clase, texto) {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto) el.textContent = texto;
  return el;
}

function contar(categoria, grupo) {
  return TUTORIALES.filter((t) =>
    (!categoria || t.categoria === categoria) && (!grupo || t.grupo === grupo)
  ).length;
}

function textoTutoriales(n) {
  return n === 1 ? "1 tutorial" : n + " tutoriales";
}

function crearIcono(icono) {
  if (icono === "npv") {
    const logo = crearElemento("span", "npv-logo", "n");
    logo.setAttribute("aria-hidden", "true");
    logo.appendChild(crearElemento("span", "", "V"));
    return logo;
  }
  const i = crearElemento("i", icono);
  i.setAttribute("aria-hidden", "true");
  return i;
}

function crearTarjeta(t, indice) {
  const a = crearElemento("a", "card card-" + t.categoria);
  a.href = t.url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.style.setProperty("--i", indice);
  a.appendChild(crearIcono(t.icono));
  a.appendChild(crearElemento("span", "card-title", t.titulo));
  a.appendChild(crearElemento("span", "card-tag", t.plataforma));
  return a;
}

function renderFiltros() {
  const cont = $("filtros");
  cont.textContent = "";

  const opciones = [{ id: null, nombre: "Todos", icono: "fas fa-border-all" }].concat(CATEGORIAS);
  opciones.forEach((c) => {
    const n = contar(c.id, null);
    if (c.id && n === 0) return;
    const b = crearElemento("button", "chip");
    b.type = "button";
    b.dataset.categoria = c.id || "";
    b.appendChild(crearIcono(c.icono));
    b.appendChild(crearElemento("span", "", c.nombre));
    b.appendChild(crearElemento("span", "chip-count", String(n)));
    b.addEventListener("click", () => aplicarFiltro(c.id, null));
    cont.appendChild(b);
  });
}

function actualizarFiltros() {
  document.querySelectorAll(".chip").forEach((b) => {
    const activo = (b.dataset.categoria || null) === filtro.categoria && !filtro.grupo;
    b.setAttribute("aria-pressed", String(activo));
  });
}

function renderSecciones() {
  const cont = $("secciones");
  cont.textContent = "";
  let indice = 0;

  CATEGORIAS.forEach((c) => {
    if (filtro.categoria && filtro.categoria !== c.id) return;
    if (contar(c.id, null) === 0) return;

    const seccion = crearElemento("section", "category category-" + c.id);
    seccion.setAttribute("aria-labelledby", "cat-" + c.id);
    const h2 = crearElemento("h2", "category-title");
    h2.id = "cat-" + c.id;
    h2.appendChild(crearIcono(c.icono));
    h2.appendChild(document.createTextNode(" " + c.nombre));
    seccion.appendChild(h2);

    c.grupos.forEach((g) => {
      if (filtro.grupo && filtro.grupo !== g) return;
      const items = TUTORIALES.filter((t) => t.categoria === c.id && t.grupo === g);
      if (items.length === 0) return;

      seccion.appendChild(crearElemento("h3", "group-title", g));
      const grid = crearElemento("div", "grid");
      items.forEach((t) => grid.appendChild(crearTarjeta(t, indice++)));
      seccion.appendChild(grid);
    });

    cont.appendChild(seccion);
  });
}

function renderEstadoFiltro() {
  const estado = $("estado-filtro");
  if (!filtro.categoria) {
    estado.hidden = true;
    return;
  }
  const cat = CATEGORIAS.find((c) => c.id === filtro.categoria);
  const nombre = filtro.grupo || cat.nombre;
  $("estado-filtro-texto").textContent =
    "Mostrando " + nombre + ": " + textoTutoriales(contar(filtro.categoria, filtro.grupo)) + ".";
  estado.hidden = false;
}

function aplicarFiltro(categoria, grupo) {
  filtro.categoria = categoria;
  filtro.grupo = grupo;
  actualizarFiltros();
  renderSecciones();
  renderEstadoFiltro();
}

/* ---------- Asistente visual VEXA ---------- */

function mensajeVexa(texto) {
  const lista = $("vexa-mensajes");
  lista.appendChild(crearElemento("p", "vexa-msg", texto));
  lista.scrollTop = lista.scrollHeight;
}

function renderOpcionesVexa() {
  const cont = $("vexa-opciones");
  cont.textContent = "";

  OPCIONES_VEXA.forEach((o) => {
    if (contar(o.categoria, o.grupo || null) === 0) return;
    const b = crearElemento("button", "vexa-option", o.texto);
    b.type = "button";
    b.addEventListener("click", () => {
      aplicarFiltro(o.categoria, o.grupo || null);
      const n = contar(o.categoria, o.grupo || null);
      mensajeVexa("¡Listo! Te muestro " + textoTutoriales(n) + " para «" + o.texto + "».");
      // En pantallas chicas el panel taparía los resultados: se cierra.
      if (window.matchMedia("(max-width: 700px)").matches) cerrarVexa();
      const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      $("tutoriales").scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "start" });
    });
    cont.appendChild(b);
  });

  const soporte = crearElemento("a", "vexa-option vexa-option-support", "Hablar con soporte");
  soporte.href = SOPORTE_URL;
  soporte.target = "_blank";
  soporte.rel = "noopener noreferrer";
  cont.appendChild(soporte);
}

function abrirVexa() {
  $("vexa-panel").hidden = false;
  $("vexa-toggle").setAttribute("aria-expanded", "true");
  if (!$("vexa-mensajes").hasChildNodes()) {
    mensajeVexa("¡Hola! Soy VEXA, tu asistente de VPS ARG Academy. ¿Qué necesitás configurar?");
  }
  $("vexa-titulo").focus();
}

function cerrarVexa() {
  $("vexa-panel").hidden = true;
  $("vexa-toggle").setAttribute("aria-expanded", "false");
  $("vexa-toggle").focus();
}

document.addEventListener("DOMContentLoaded", () => {
  $("contador").textContent = "📚 " + textoTutoriales(TUTORIALES.length) + " disponibles";

  renderFiltros();
  aplicarFiltro(null, null);
  renderOpcionesVexa();

  $("ver-todo").addEventListener("click", () => aplicarFiltro(null, null));

  $("vexa-toggle").addEventListener("click", () => {
    if ($("vexa-panel").hidden) abrirVexa();
    else cerrarVexa();
  });
  $("vexa-cerrar").addEventListener("click", cerrarVexa);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("vexa-panel").hidden) cerrarVexa();
  });
});
