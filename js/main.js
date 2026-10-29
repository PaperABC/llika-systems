/* ============================================================
   LLIKA SYSTEMS — JavaScript principal
   Funciones generales del sitio:
   1. Menú de navegación móvil
   2. Sombra del header al hacer scroll
   3. Animaciones de aparición (reveal)
   4. Filtro del catálogo de productos
   5. Año automático en el pie de página
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ---------- 1. Menú de navegación móvil ---------- */
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const abierto = nav.classList.toggle("nav--abierto");
      navToggle.setAttribute("aria-expanded", abierto ? "true" : "false");
      navToggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });

    // Cerrar el menú al hacer clic en un enlace (útil en móvil)
    nav.querySelectorAll("a").forEach((enlace) => {
      enlace.addEventListener("click", () => {
        nav.classList.remove("nav--abierto");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menú");
      });
    });
  }

  /* ---------- 2. Sombra del header al hacer scroll ---------- */
  const header = document.getElementById("header");

  if (header) {
    const actualizarHeader = () => {
      header.classList.toggle("header--scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", actualizarHeader, { passive: true });
    actualizarHeader();
  }

  /* ---------- 3. Animaciones de aparición ---------- */
  const elementosReveal = document.querySelectorAll(".reveal");

  if (elementosReveal.length > 0 && "IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("reveal--visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elementosReveal.forEach((el) => observador.observe(el));
  } else {
    // Sin soporte del navegador: mostrar todo directamente
    elementosReveal.forEach((el) => el.classList.add("reveal--visible"));
  }

  /* ---------- 4. Filtro del catálogo de productos ---------- */
  const botonesFiltro = document.querySelectorAll(".filtro");
  const productos = document.querySelectorAll(".producto");

  if (botonesFiltro.length > 0 && productos.length > 0) {
    botonesFiltro.forEach((boton) => {
      boton.addEventListener("click", () => {
        const categoria = boton.dataset.filtro;

        // Actualizar estado visual de los botones
        botonesFiltro.forEach((b) => b.classList.remove("filtro--activo"));
        boton.classList.add("filtro--activo");

        // Mostrar u ocultar productos según la categoría
        productos.forEach((producto) => {
          const coincide =
            categoria === "todos" || producto.dataset.categoria === categoria;
          producto.hidden = !coincide;
        });
      });
    });
  }

  /* ---------- 5. Año automático en el pie de página ---------- */
  const anio = document.getElementById("anio");
  if (anio) {
    anio.textContent = new Date().getFullYear();
  }
});
