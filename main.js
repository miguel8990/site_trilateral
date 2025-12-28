document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // 1. Abrir/Fechar Menu Principal
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // 2. Lógica para Dropdowns no Mobile (O Evento / Programação)
  const dropdownLinks = document.querySelectorAll(".has-submenu > a");

  dropdownLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Se a tela for de celular (menor que 768px)
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Impede que a página pule para o topo
        const parentLi = link.parentElement;

        // Fecha outros menus abertos para não bagunçar
        document.querySelectorAll(".has-submenu").forEach((item) => {
          if (item !== parentLi) {
            item.classList.remove("active-submenu");
          }
        });

        // Abre/Fecha o menu clicado
        parentLi.classList.toggle("active-submenu");
      }
    });
  });

  // 3. Fechar menu ao clicar em links finais
  document
    .querySelectorAll(".submenu li a, .nav-menu > li > a:not([href='#'])")
    .forEach((n) => {
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        // Fecha submenus também
        document
          .querySelectorAll(".has-submenu")
          .forEach((item) => item.classList.remove("active-submenu"));
      });
    });

  // 4. Header Sombra ao Rolar
  const header = document.querySelector("main-header");
  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });

  // 5. Animação de Entrada (Scroll)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  document
    .querySelectorAll(".fade-in-up")
    .forEach((el) => observer.observe(el));
});
