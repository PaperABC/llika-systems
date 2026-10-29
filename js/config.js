/* ============================================================
   LLIKA SYSTEMS — Archivo de configuración
   ------------------------------------------------------------
   Este es el ÚNICO archivo que debes editar para conectar
   la web con tus servicios. Sigue la guía paso a paso.

   PASO 1 (Supabase):
   1. Crea tu proyecto en https://supabase.com
   2. Ejecuta el archivo supabase/schema.sql en el SQL Editor
   3. Ve a: Project Settings (engranaje) → API
   4. Copia "Project URL" y pégala abajo en SUPABASE_URL
   5. Copia la clave "anon public" y pégala en SUPABASE_ANON_KEY

   PASO 2 (WhatsApp):
   - Reemplaza WHATSAPP_NUMERO por tu número real.
     Formato: código de país + número, SIN "+" ni espacios.
     Ejemplo Perú: 51 + 987654321  →  "51987654321"
   ============================================================ */

const LLIKA_CONFIG = {
  // URL de tu proyecto Supabase (ejemplo: "https://abcd1234.supabase.co")
  SUPABASE_URL: "https://tuzsiysssvoiuzwmldjo.supabase.co/rest/v1/",

  // Clave pública "anon" de Supabase (empieza con "eyJ...")
  SUPABASE_ANON_KEY: "sb_publishable_YGMHYMBLmzpJcuLfy6QYUA_Sl9yf2Vm",

  // Número de WhatsApp en formato internacional sin "+"
  WHATSAPP_NUMERO: "51987653838",

  // Mensaje que aparecerá pre-escrito al abrir WhatsApp
  WHATSAPP_MENSAJE: "Hola LLIKA SYSTEMS, quisiera más información sobre sus servicios.",
};

// Se expone globalmente para que los demás scripts lo usen
window.LLIKA_CONFIG = LLIKA_CONFIG;
