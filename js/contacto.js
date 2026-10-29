/* ============================================================
   LLIKA SYSTEMS — Formulario de contacto
   ------------------------------------------------------------
   Este script hace dos cosas:
   1. Activa todos los botones de WhatsApp del sitio (los que
      tienen el atributo data-whatsapp), usando el número
      configurado en js/config.js
   2. Envía los mensajes del formulario de contacto a la tabla
      "mensajes" de Supabase (PostgreSQL gratuito)

   IMPORTANTE: para que el formulario funcione, primero debes
   pegar tu URL y clave anon en js/config.js y haber creado la
   tabla con supabase/schema.sql (ver README.md).
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const cfg = window.LLIKA_CONFIG || {};

  /* ---------- 1. Botones de WhatsApp ---------- */
  const numeroLimpio = String(cfg.WHATSAPP_NUMERO || "").replace(/\D/g, "");

  if (numeroLimpio.length >= 10) {
    const urlWsp =
      "https://wa.me/" +
      numeroLimpio +
      "?text=" +
      encodeURIComponent(cfg.WHATSAPP_MENSAJE || "Hola, quisiera más información.");

    document.querySelectorAll("[data-whatsapp]").forEach((enlace) => {
      enlace.setAttribute("href", urlWsp);
    });
  }

  /* ---------- 2. Formulario de contacto ---------- */
  const formulario = document.getElementById("form-contacto");
  if (!formulario) return; // Esta página no tiene formulario

  const cajaEstado = document.getElementById("estadoFormulario");
  const btnEnviar = document.getElementById("btnEnviar");

  // ¿Está configurado Supabase? (detecta si aún hay placeholders)
  const supabaseConfigurado =
    cfg.SUPABASE_URL &&
    cfg.SUPABASE_ANON_KEY &&
    !cfg.SUPABASE_URL.includes("TU-PROYECTO") &&
    !String(cfg.SUPABASE_ANON_KEY).includes("PEGA_AQUI") &&
    typeof window.supabase !== "undefined";

  // Cliente de Supabase (se crea solo si ya está configurado)
  const clienteSupabase = supabaseConfigurado
    ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY)
    : null;

  /* Muestra un mensaje de estado bajo el formulario.
     tipo: "exito" | "error" | "aviso" */
  function mostrarMensaje(texto, tipo) {
    if (!cajaEstado) return;
    cajaEstado.hidden = false;
    cajaEstado.className = "estado-form estado-form--" + tipo;
    cajaEstado.innerHTML = texto;
  }

  function limpiarMensaje() {
    if (!cajaEstado) return;
    cajaEstado.hidden = true;
    cajaEstado.innerHTML = "";
  }

  /* Valida los campos del formulario usando la API de
     validación del navegador. Devuelve true si todo es válido. */
  function validarFormulario() {
    let valido = true;

    formulario.querySelectorAll("input, select, textarea").forEach((campo) => {
      const esValido = campo.checkValidity();
      campo.classList.toggle("invalido", !esValido);
      campo.setAttribute("aria-invalid", esValido ? "false" : "true");
      if (!esValido) valido = false;
    });

    if (!valido) {
      // Enfocar el primer campo inválido
      const primeroInvalido = formulario.querySelector(".invalido");
      if (primeroInvalido) primeroInvalido.focus();

      mostrarMensaje(
        "<strong>Revisa los campos marcados en rojo.</strong><br>" +
          "Todos los campos con * son obligatorios y el mensaje debe tener " +
          "al menos 10 caracteres.",
        "aviso"
      );
    }

    return valido;
  }

  /* Quitar el resaltado de error cuando el usuario escribe */
  formulario.querySelectorAll("input, select, textarea").forEach((campo) => {
    campo.addEventListener("input", () => {
      campo.classList.remove("invalido");
      campo.setAttribute("aria-invalid", "false");
    });
  });

  /* Envío del formulario */
  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    limpiarMensaje();

    if (!validarFormulario()) return;

    // Datos que se guardan (coinciden con la tabla "mensajes" de schema.sql)
    const datos = {
      nombre: formulario.nombre.value.trim(),
      correo: formulario.correo.value.trim(),
      telefono: formulario.telefono.value.trim() || null,
      asunto: formulario.asunto.value,
      mensaje: formulario.mensaje.value.trim(),
    };

    /* --- Caso A: Supabase aún no está configurado --- */
    if (!clienteSupabase) {
      mostrarMensaje(
        "<strong>El formulario todavía no está conectado a la base de datos.</strong><br>" +
          "Pide ayuda a tu técnico o revisa el archivo <code>js/config.js</code> y el " +
          "README para completar la configuración de Supabase.<br><br>" +
          "Mientras tanto, puedes contactarnos directo por WhatsApp usando el botón " +
          "de la derecha.",
        "aviso"
      );
      return;
    }

    /* --- Caso B: Supabase configurado → guardar el mensaje --- */
    btnEnviar.disabled = true;
    const textoOriginal = btnEnviar.innerHTML;
    btnEnviar.innerHTML = "Enviando…";

    try {
      const { error } = await clienteSupabase
        .from("mensajes")
        .insert([datos]);

      if (error) throw error;

      mostrarMensaje(
        "<strong>¡Mensaje enviado correctamente!</strong><br>" +
          "Gracias por escribirnos, " + escapeHTML(datos.nombre.split(" ")[0]) +
          ". Te responderemos en menos de 24 horas hábiles.",
        "exito"
      );

      formulario.reset();
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);

      let detalle = "";
      if (error && error.message && error.message.includes("row-level security")) {
        detalle =
          "<br><br><em>Detalle técnico: falta la política de seguridad (RLS) que permite " +
          "insertar mensajes. Vuelve a ejecutar el archivo supabase/schema.sql.</em>";
      }

      mostrarMensaje(
        "<strong>No se pudo enviar el mensaje.</strong><br>" +
          "Inténtalo de nuevo en unos segundos o contáctanos directo por WhatsApp." +
          detalle,
        "error"
      );
    } finally {
      btnEnviar.disabled = false;
      btnEnviar.innerHTML = textoOriginal;
    }
  });

  /* Escapa caracteres HTML para mostrar el nombre del usuario
     de forma segura dentro del mensaje de éxito */
  function escapeHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
  }
});
