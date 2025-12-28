document.addEventListener("DOMContentLoaded", () => {
  // --- LÓGICA DO MENU MOBILE ---
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll(".nav-menu li a").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      })
    );
  }

  // --- LÓGICA DE SCROLL HEADER (Muda estilo ao rolar) ---
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- ANIMAÇÃO AO ROLAR (SCROLL REVEAL) ---
  // Seleciona todos os elementos que devem ser animados
  // Adicionamos a classe 'fade-in-up' via JS nos elementos principais para não poluir o HTML manualmente

  // Vamos adicionar a classe de animação aos cards e títulos automaticamente
  const elementsToAnimate = document.querySelectorAll(
    ".info-card, .link-card, .gallery-item, .step-card, .section-title, .text-content p, .hero-text-overlay"
  );

  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in-up");
  });

  // Configura o Observer (o "olheiro" do navegador)
  const observerOptions = {
    threshold: 0.1, // Dispara quando 10% do elemento estiver visível
    rootMargin: "0px 0px -50px 0px", // Pequena margem para disparar antes do fim da tela
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Para de observar depois que animou
      }
    });
  }, observerOptions);

  // Manda o observer vigiar os elementos
  document.querySelectorAll(".fade-in-up").forEach((el) => {
    observer.observe(el);
  });
});
