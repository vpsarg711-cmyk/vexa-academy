# VPS ARG Academy

Academia de tutoriales de **VPS ARG Premium Lite ☆**, con **VEXA IA** como asistente visual.
Sitio estático (HTML, CSS y JavaScript sin dependencias de build), pensado para publicarse en Netlify.

## Estructura

```
index.html            Página principal
css/style.css         Estilos
js/app.js             Datos de tutoriales, filtros y asistente VEXA
assets/img/           Logos optimizados (WebP + JPG de respaldo), favicon e imagen para compartir
original/             Copia idéntica de los archivos originales (no editar)
```

Los archivos de `original/` se publican junto con el sitio, pero nada los enlaza. La versión original `original/index (1).html` busca `css/style.css` y `js/main.js` en su propia carpeta, así que se ve sin estilos si se abre ahí. Es solo un respaldo.

## Cómo editar los tutoriales

Todo está en el arreglo `TUTORIALES` al principio de `js/app.js`. Cada tutorial tiene:

| Campo | Ejemplo | Uso |
|---|---|---|
| `titulo` | `"Xiaomi 1"` | Texto de la tarjeta |
| `categoria` | `"telefono"` | Una de: `telefono`, `herramientas`, `mantenimiento`, `conexion` |
| `grupo` | `"Xiaomi"` | Debe coincidir con un nombre de `grupos` en `CATEGORIAS` |
| `plataforma` | `"Android"` | Etiqueta pequeña de la tarjeta |
| `url` | `"https://youtu.be/P-hLzRqw1vM"` | Destino (sin `?si=`) |
| `icono` | `"fas fa-gear"` | Clase de Font Awesome 6, o `"npv"` para el logo de NPV Tunnel |

- El contador y los números de cada filtro se calculan solos.
- Las subcategorías sin tutoriales no se muestran.
- El soporte por WhatsApp no forma parte del arreglo y no se cuenta como tutorial. Su enlace está en `SOPORTE_URL` (`js/app.js`) y dos veces en `index.html`.

## Inventario (etapa 1)

Los enlaces son los originales, conservados como **provisionales**. Solo se les quitó el parámetro `?si=`. Ninguno se pudo abrir desde el entorno donde se preparó esta versión, así que **no están verificados**.

| # | Título original | Categoría propuesta | Subcategoría | Plataforma | URL original (sin `?si=`) | Estado |
|---|---|---|---|---|---|---|
| 1 | APP OFICIAL | Herramientas | Aplicación oficial VPS ARG | Android | https://play.google.com/store/apps/details?id=app.vpsarg | Provisional, sin verificar |
| 2 | CONEXIÓN | Conexión y primeros pasos | Cómo conectarse | Android | https://youtu.be/OdqmaE2aCHM | Provisional, sin verificar |
| 3 | ANDROID | Configuración del teléfono | Otros Android y teléfonos chinos | Android | https://youtu.be/BI4g81rd8_Q | Provisional, sin verificar |
| 4 | AJUSTE EXTRA | Configuración del teléfono | Otros Android y teléfonos chinos | Android | https://youtu.be/B_UexBPaO0w | Provisional, sin verificar |
| 5 | LIMPIEZA | Mantenimiento | Limpieza de la aplicación | Android | https://youtu.be/5b3rosyQAJE | Provisional, sin verificar |
| 6 | FUNCIONES | Herramientas | Aplicación oficial VPS ARG | Android | https://youtu.be/uX9KEiLRNaQ | Provisional, sin verificar |
| 7 | IPHONE | Configuración del teléfono | iPhone (iOS) | iPhone | https://youtu.be/2at2H-a8nbs | Provisional, sin verificar |
| 8 | NPV TUNNEL | Herramientas | NPV Tunnel | iPhone | https://youtu.be/gfrcX_rHVms | Provisional, sin verificar |
| 9 | CONEXIÓN IPHONE | Conexión y primeros pasos | Cómo conectarse | iPhone | https://youtu.be/7t_-WX2ZdhE | Provisional, sin verificar |
| 10 | XIAOMI 1 | Configuración del teléfono | Xiaomi | Android | https://youtu.be/P-hLzRqw1vM | Provisional, sin verificar |
| 11 | XIAOMI 2 | Configuración del teléfono | Xiaomi | Android | https://youtu.be/g5iXW6hv-H0 | Provisional, sin verificar |
| — | SOPORTE | Soporte (no es tutorial) | — | — | https://wa.me/5493435350260 | Conservado, sin verificar |

La plataforma sale del color de la tarjeta original (azul = Android, dorado = iPhone, rojo = Xiaomi). Las categorías de ANDROID, AJUSTE EXTRA, LIMPIEZA y FUNCIONES se dedujeron solo del título y hay que confirmarlas.

Subcategorías que existen pero todavía no tienen videos (no se muestran): Samsung, Motorola, HTTP Custom, Mantenimiento de la aplicación, Mantenimiento y optimización del teléfono, Problemas frecuentes, Inicio de sesión y Cómo comprobar el estado de la conexión.

## Autenticación futura (no implementada)

Esta versión **no tiene login** y todo el contenido es público. Cuando se implemente el acceso de clientes, deberá:

1. Validar usuario y contraseña **en el servidor**, nunca solo con JavaScript en el navegador.
2. Consultar el estado real del servicio y su vencimiento en el sistema de clientes.
3. Volver a validar el acceso cada vez que se pida contenido protegido.
4. Usar sesiones seguras (cookie `HttpOnly`, `Secure`, `SameSite`) y permitir cerrar sesión.
5. Limitar los intentos de acceso.
6. No exponer credenciales, tokens ni secretos en el frontend ni en el repositorio.
7. No entregar los enlaces de los tutoriales protegidos a usuarios no autorizados. Por eso, en esa etapa la lista dejará de estar en `js/app.js` y vendrá del servidor.

Todavía no está definido dónde están los clientes ni cómo se determina un servicio activo.

**YouTube:** un login en la academia no impide que alguien vea un video público o no listado si tiene su URL. Antes de proteger el contenido hay que decidir si se mantiene YouTube o se usa una plataforma de video con control de acceso.

## Netlify

No hace falta `netlify.toml`: es un sitio estático y Netlify publica la raíz del repositorio tal cual (*Build command* vacío, *Publish directory* `.` o `/`). No se agregaron reglas de redirección ni cabeceras.

## Dependencias externas

- Font Awesome 6.5.2 desde cdnjs, para los íconos (ya estaba en el original).
