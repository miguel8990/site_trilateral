document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  createFallingLeaves();
  createWindEffect();

  // ==========================================
  // RASTREADOR DE MOUSE (PARA O FUNDO DINÂMICO)
  // ==========================================
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    // Envia as coordenadas para o CSS
    document.body.style.setProperty("--mouse-x", `${x}px`);
    document.body.style.setProperty("--mouse-y", `${y}px`);
  });

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

  // 6. Efeito de Onda (H1 e H2)
  // Seleciona tanto o título quanto o subtítulo
  const waveElements = document.querySelectorAll(
    ".hero-text-overlay h1, .hero-text-overlay h2"
  );

  waveElements.forEach((element) => {
    const text = element.textContent;
    element.textContent = ""; // Limpa o texto original

    // Recria letra por letra
    text.split("").forEach((letter, index) => {
      const span = document.createElement("span");
      span.textContent = letter === " " ? "\u00A0" : letter;

      // Dica Sênior: Se for H2, fazemos a onda ser um pouco mais rápida (0.05s) para diferenciar
      const delay = element.tagName === "H2" ? index * 0.05 : index * 0.1;

      span.style.animationDelay = `${delay}s`;
      span.classList.add("letter-wave");
      element.appendChild(span);
    });
  });
  // ==========================================
  // GERADOR DE FOLHAS (INFINITE LOOP FIX)
  // ==========================================
  function createFallingLeaves() {
    // 1. Cria o container se ele não existir
    let container = document.querySelector(".leaves-container");
    if (!container) {
      container = document.createElement("div");
      container.classList.add("leaves-container");
      // Insere logo no começo do body (para respeitar o z-index 0)
      document.body.prepend(container);
    }

    // 2. Configurações
    const leafCount = 15; // Quantidade de folhas na tela

    // 3. Loop de Criação
    for (let i = 0; i < leafCount; i++) {
      const leaf = document.createElement("div");
      leaf.classList.add("leaf");

      // --- A MÁGICA DA ALEATORIEDADE ---

      // Posição horizontal aleatória (0 a 100%)
      const leftPos = Math.random() * 100;

      // Tamanho aleatório (variedade visual)
      const size = Math.random() * 10 + 15; // Entre 15px e 25px

      // Duração da queda aleatória (para não caírem todas juntas)
      const duration = Math.random() * 10 + 15; // Entre 15s e 25s

      // Atraso NEGATIVO: Isso faz a animação começar "no meio do caminho"
      // Assim, ao carregar a página, já tem folhas em toda a tela!
      const delay = Math.random() * -20;

      // Aplica os estilos
      leaf.style.left = `${leftPos}%`;
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;
      leaf.style.animation = `falling ${duration}s linear infinite`;
      leaf.style.animationDelay = `${delay}s`;

      // Adiciona variações de cor (opcional - verde claro e branco)
      if (Math.random() > 0.7) {
        leaf.style.background = "rgba(187, 247, 208, 0.4)"; // Verde pálido
      }

      container.appendChild(leaf);
    }
  }

  // ==========================================
  // GERADOR DE VENTO (ESPIRAIS / CARACOL)
  // ==========================================
  function createWindEffect() {
    let container = document.querySelector(".leaves-container");
    // Segurança para criar container se não existir
    if (!container) {
      container = document.createElement("div");
      container.classList.add("leaves-container");
      // Força estilos essenciais caso o CSS falhe
      container.style.position = "fixed";
      container.style.zIndex = "1";
      container.style.pointerEvents = "none";
      document.body.prepend(container);
    }

    const windCount = 5; // Poucas linhas para ser elegante

    for (let i = 0; i < windCount; i++) {
      const wind = document.createElement("div");
      wind.classList.add("wind-line");

      // A MÁGICA: Escolhe aleatoriamente o desenho 1 ou 2
      if (Math.random() > 0.5) {
        wind.classList.add("wind-style-1");
      } else {
        wind.classList.add("wind-style-2");
      }

      // Posição Vertical (Aleatória)
      const topPos = Math.random() * 85; // Evita o rodapé extremo

      // Tamanho (Largura) - Estica o vento para parecer rajada
      // Entre 300px e 600px de comprimento
      const width = Math.random() * 300 + 300;

      // Velocidade (Lento e majestoso: 7s a 12s)
      const duration = Math.random() * 5 + 7;

      // Atraso inicial
      const delay = Math.random() * 10;

      // Aplica os estilos
      wind.style.top = `${topPos}%`;
      wind.style.width = `${width}px`;

      // Animação suave
      wind.style.animation = `windTravel ${duration}s linear infinite`;
      wind.style.animationDelay = `${delay}s`;

      // Opacidade variável (alguns ventos são mais fortes, outros fracos)
      wind.style.opacity = Math.random() * 0.4 + 0.3;

      container.appendChild(wind);
    }
  }

  const footerText = document.querySelector("#main-footer .footer-content p");

  if (footerText) {
    // Usamos innerHTML para permitir negrito (strong) e quebra de linha se necessário
    footerText.innerHTML = `
      © 2026 Iniciativa Amazônia + 10.<br>
      <strong>Realização:</strong> Universidade do Estado do Amazonas (UEA).<br>
      <strong>Apoio:</strong> Université Jean Moulin Lyon 3, Université de Guyane, Embaixada da França no Brasil.
    `;
  }
});
