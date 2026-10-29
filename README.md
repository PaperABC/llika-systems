# 🌐 Sitio Web — LLIKA SYSTEMS

Sitio web corporativo de **LLIKA SYSTEMS** (mantenimiento, soporte técnico y venta de
hardware), construido con **HTML + CSS + JavaScript puro** — sin frameworks — listo para
publicarse gratis en **GitHub Pages** o **Netlify**, con formulario de contacto conectado a
una base de datos **PostgreSQL gratuita en Supabase**.

**Proyecto del curso de Comercio Electrónico**
Integrantes: Chayan Espinoza Inga · Barrueto Corpus Alexander

---

## 📁 Estructura del proyecto

```
llika-systems-web/
├── index.html            → Página de inicio (servicios, público, por qué elegirnos)
├── servicios.html        → Detalle de las 3 líneas de servicio + proceso de trabajo
├── productos.html        → Catálogo de hardware con filtros por categoría
├── nosotros.html         → Historia, valores y equipo
├── contacto.html         → Formulario (guarda en Supabase) + botón WhatsApp
├── css/
│   └── styles.css        → Diseño completo del sitio (colores, tarjetas, responsive)
├── js/
│   ├── config.js         → ⚙️ ÚNICO archivo que debes editar (URL, claves, WhatsApp)
│   ├── main.js           → Menú móvil, animaciones, filtros del catálogo
│   └── contacto.js       → Envío del formulario a Supabase + botones de WhatsApp
├── img/
│   └── favicon.svg       → Ícono de la pestaña del navegador
├── supabase/
│   └── schema.sql        → Script que crea la tabla "mensajes" en Supabase
└── README.md             → Esta guía
```

---

## ✅ Requisitos previos

Necesitas crear 2 cuentas gratuitas (5 minutos cada una):

| Cuenta | Para qué | Link |
|--------|----------|------|
| **GitHub** | Guardar el código y publicar la web gratis | https://github.com/signup |
| **Supabase** | Base de datos gratuita del formulario | https://supabase.com |

*(Opcional)* Cuenta en **Netlify**: https://app.netlify.com/signup — alternativa a GitHub Pages.

---

## 🗄️ PASO 1 — Crear la base de datos en Supabase

1. Ingresa a https://supabase.com y haz clic en **Start your project** (inicia sesión con GitHub).
2. Clic en **New project** → elige un nombre (ej. `llika-systems`) → crea una contraseña →
   región **East US** (la más cercana a Perú con plan gratuito) → **Create new project**.
   ⏳ Espera 1-2 minutos mientras se aprovisiona.
3. En el menú lateral izquierdo, clic en el ícono **SQL Editor** (terminal `>_`).
4. Clic en **New query**, abre el archivo `supabase/schema.sql` de este proyecto con el
   Bloc de notas, **copia TODO su contenido**, pégalo en el editor y presiona **Run**.
5. Debe decir `Success. No rows returned`. Verifica en **Table Editor** que existe la
   tabla **mensajes** con las columnas: id, nombre, correo, telefono, asunto, mensaje,
   leido, created_at.

### 1.1 Obtener las credenciales

1. Menú lateral: clic en el **engranaje** (⚙️ Project Settings) → pestaña **API**.
2. Copia estos dos valores:
   - **Project URL** → algo como `https://abcdefgh.supabase.co`
   - **Project API keys → `anon` `public`** → una clave larga que empieza con `eyJ...`

### 1.2 Pegarlas en el sitio

Abre `js/config.js` con el Bloc de notas y reemplaza:

```js
SUPABASE_URL: "https://TU-PROYECTO.supabase.co",     // ← pega tu Project URL
SUPABASE_ANON_KEY: "PEGA_AQUI_TU_CLAVE_ANON",        // ← pega tu clave anon
```

⚠️ **No uses la clave `service_role`** en la web: esa es secreta. Solo la `anon public`.

### 1.3 Configurar WhatsApp

En el mismo archivo `js/config.js`, cambia el número por el real (Perú = `51` + 9 dígitos):

```js
WHATSAPP_NUMERO: "51987654321",   // tu número real, sin "+" ni espacios
```

También puedes cambiar los datos de contacto del pie de página en cada archivo `.html`
(busca `contacto@llikasystems.com` y reemplázalo por tu correo).

---

## 💻 PASO 2 — Probar el sitio en tu computadora

**Opción rápida:** haz doble clic en `index.html` → se abre en tu navegador.

**Opción recomendada (con VS Code):**
1. Instala la extensión **Live Server**.
2. Clic derecho sobre `index.html` → **Open with Live Server**.

### Prueba del formulario

- **Antes de configurar Supabase:** al enviar el formulario verás un aviso amarillo amable
  ("el formulario todavía no está conectado") — eso es correcto y a propósito.
- **Después de configurarlo:** verás el mensaje verde "¡Mensaje enviado correctamente!"
  y el mensaje aparecerá en Supabase → **Table Editor → mensajes**.

---

## 🚀 PASO 3 — Publicar en GitHub Pages (gratis)

### Método A — Sin instalar nada (recomendado para empezar)

1. Entra a https://github.com e inicia sesión.
2. Clic en el botón **+** (arriba a la derecha) → **New repository**.
3. Nombre: `llika-systems-web` → deja el resto igual → clic en **Create repository**.
4. En la página del repo nuevo, clic en el enlace **uploading an existing file**
   (o **Add file → Upload files**).
5. **Arrastra TODOS los archivos y carpetas** del proyecto (index.html, css/, js/, img/,
   supabase/, README.md). ⚠️ Importante: arrastra el *contenido* de la carpeta, no la
   carpeta `llika-systems-web` en sí, para que `index.html` quede en la raíz del repo.
6. Clic en **Commit changes** (deja el mensaje por defecto).
7. En el repo, ve a **Settings** → menú izquierdo **Pages**.
8. En **Branch**, elige `main` y `/ (root)` → clic en **Save**.
9. ⏳ Espera 1-3 minutos, recarga la página: aparecerá un recuadro verde con la URL:

   ```
   https://TU-USUARIO.github.io/llika-systems-web/
   ```

10. ¡Listo! Esa es tu página web pública. Compártela con tu docente. 🎉

### Método B — Con Git instalado (línea de comandos)

```bash
cd llika-systems-web
git init
git add .
git commit -m "Sitio web LLIKA SYSTEMS"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/llika-systems-web.git
git push -u origin main
```

Luego activa **Settings → Pages → Branch: main → Save** (igual que el método A).

### Actualizar la web más adelante

En el repo de GitHub: **Add file → Upload files** → arrastra los archivos modificados →
**Commit changes**. GitHub Pages se actualiza solo en 1-2 minutos.

---

## 🟢 PASO 4 (alternativa) — Publicar en Netlify

Si prefieres Netlify (también gratis, sin necesidad de GitHub):

1. Entra a https://app.netlify.com y regístrate.
2. En el panel, busca la zona **Drag and drop your site output folder here**.
3. Arrastra la carpeta `llika-systems-web` completa.
4. Netlify publica al instante en una URL tipo `https://nombre-aleatorio.netlify.app`.
5. (Opcional) En **Site settings → Change site name** puedes renombrarla a
   `https://llika-systems.netlify.app`.

**¿Cuál elegir?**

| | GitHub Pages | Netlify |
|---|---|---|
| Ideal para | Entrega académica (el docente ve el código) | Publicación rápida sin Git |
| Actualizar | Subiendo archivos al repo | Arrastrando la carpeta otra vez |
| Dominio | `usuario.github.io/proyecto` | `nombre.netlify.app` |

Puedes publicar en **ambos** al mismo tiempo si quieres.

---

## 🎨 Personalización rápida

| ¿Qué cambiar? | ¿Dónde? |
|---|---|
| Colores del sitio | `css/styles.css` → variables de la sección `:root` (`--c-primario`, etc.) |
| Número de WhatsApp / claves | `js/config.js` |
| Correo, dirección y horario | Cada `.html` (footer y página de contacto) |
| Productos del catálogo | `productos.html` — copia un bloque `<article class="producto">` y edítalo |
| Textos de servicios | `servicios.html` |
| Título de la pestaña | Etiqueta `<title>` de cada `.html` |

---

## 🔧 Problemas frecuentes

| Problema | Causa probable | Solución |
|---|---|---|
| El formulario muestra aviso amarillo | `config.js` sin configurar | Pega la URL y la clave anon de Supabase |
| "Failed to fetch" / error al enviar | URL o clave mal copiadas | Revisa que no haya espacios ni comillas de más en `config.js` |
| Error de "row-level security" | No se ejecutó el SQL | Ejecuta `supabase/schema.sql` en el SQL Editor |
| El mensaje no aparece en la tabla | Estás mirando otra tabla/proyecto | Table Editor → tabla `mensajes`, proyecto correcto |
| La página sale 404 en GitHub Pages | `index.html` no está en la raíz del repo | Sube los archivos sin la carpeta contenedora |
| No se ven los estilos (solo texto) | Rutas de carpetas mal subidas | Verifica que existan las carpetas `css/` y `js/` en el repo |
| WhatsApp abre una página rara | Número mal formateado | Debe ser `51987654321` (país + número, sin `+`) |

---

## 📝 Checklist antes de entregar

- [ ] Ejecuté `supabase/schema.sql` y veo la tabla **mensajes** en Supabase
- [ ] Pegué mi URL y clave anon en `js/config.js`
- [ ] Probé el formulario en local y el mensaje llegó a la tabla
- [ ] Cambié el número de WhatsApp real en `js/config.js`
- [ ] Cambié el correo y datos de contacto en los HTML
- [ ] Publiqué la web y la abro desde el celular (verifica el menú móvil 📱)
- [ ] Revisé las 5 páginas y todos los botones funcionan
- [ ] Envié la URL pública al docente

---

## 🛠️ Tecnologías utilizadas

- **HTML5** — estructura semántica y accesible (etiquetas ARIA, navegación por teclado)
- **CSS3** — diseño propio sin frameworks: variables CSS, Grid, Flexbox y responsive
- **JavaScript (vanilla)** — menú móvil, filtros, animaciones y consumo de la API REST
- **Supabase (PostgreSQL)** — base de datos gratuita del formulario de contacto
- **GitHub Pages / Netlify** — hosting estático gratuito
