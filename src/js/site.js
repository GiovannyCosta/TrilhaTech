const PAGE_LINKS = [
  ["home", "index.html", "Início"],
  ["comece", "comece-aqui.html", "Comece aqui"],
  ["carreiras", "carreiras.html", "Carreiras"],
  ["glossario", "glossario.html", "Glossário"],
  ["roadmaps", "roadmaps.html", "Roadmaps"],
  ["sobre", "sobre.html", "Sobre"],
];

function trilhaLogo(extraClass = "", variant = "black") {
  return `<img class="brand-symbol ${extraClass}" src="./src/img/logo-trilha-${variant}.png" alt=""><span class="brand-name">TRILHA<span>TECH</span></span>`;
}

function renderShell() {
  const page = document.body.dataset.page;
  const header = document.querySelector("[data-site-header]");
  const footer = document.querySelector("[data-site-footer]");

  if (header) {
    header.innerHTML = `
      <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header class="site-header">
        <div class="container header-inner">
          <a class="logo" href="./index.html" aria-label="TrilhaTech — página inicial">${trilhaLogo()}</a>
          <nav class="site-nav" aria-label="Navegação principal">
            ${PAGE_LINKS.filter(([id]) => id !== "comece").map(([id, url, label]) => `<a class="${page === id ? "active" : ""}" href="./${url}">${label}</a>`).join("")}
            <a class="nav-cta mobile-cta ${page === "comece" ? "active" : ""}" href="./comece-aqui.html">Comece aqui</a>
          </nav>
          <div class="header-actions">
            <a class="nav-cta header-cta ${page === "comece" ? "active" : ""}" href="./comece-aqui.html">Comece aqui</a>
            <button class="menu-button" type="button" aria-label="Abrir menu" aria-expanded="false">MENU</button>
          </div>
        </div>
      </header>`;
  }

  if (footer) {
    footer.innerHTML = `
      <section class="footer-showcase" aria-label="Universo TrilhaTech">
        <div class="container footer-showcase-inner">
          <div><span>CONTINUE DESCOBRINDO</span><strong>Sua busca não termina aqui. Explore novos caminhos.</strong></div>
          <img class="footer-box" src="./src/icons/icon-box.png" alt="Caixa com formas coloridas">
        </div>
      </section>
      <div class="color-strip" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
      <footer class="site-footer" id="rodape">
        <div class="container footer-main">
          <div class="footer-brand">
            <a class="logo footer-logo" href="./index.html">${trilhaLogo("footer-brand-symbol", "white")}</a>
            <p>Um guia para entender a área de TI, conhecer profissões e aprender o vocabulário antes de escolher uma trilha.</p>
          </div>
          <div><strong>Explorar</strong><div class="footer-links"><a href="./comece-aqui.html">Comece aqui</a><a href="./carreiras.html">Carreiras</a><a href="./glossario.html">Glossário</a></div></div>
          <div><strong>Aprender</strong><div class="footer-links"><a href="./roadmaps.html">Roadmaps</a><a href="./sobre.html">Sobre o projeto</a><a href="https://roadmap.sh/" target="_blank" rel="noreferrer">roadmap.sh ↗</a></div></div>
        </div>
        <div class="container footer-bottom">
          <span>© 2026 TrilhaTech. Todos os direitos reservados.</span>
          <a class="arghata-credit" href="https://www.instagram.com/gio.env/" target="_blank" rel="noreferrer"><span>Made by Arghata</span><img src="./src/img/arghata.png" alt="Arghata"></a>
        </div>
      </footer>
      <button class="top-button" type="button" aria-label="Voltar ao topo" title="Voltar ao topo">↑</button>`;
  }

  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");
  const closeMenu = () => {
    nav?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Abrir menu");
    if (menuButton) menuButton.textContent = "MENU";
  };

  menuButton?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menuButton.textContent = open ? "X" : "MENU";
  });
  nav?.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (event) => event.key === "Escape" && closeMenu());
  window.addEventListener("resize", () => window.innerWidth > 960 && closeMenu());

  const topButton = document.querySelector(".top-button");
  const updateTopButton = () => {
    const threshold = window.matchMedia("(max-width: 640px)").matches ? 160 : 420;
    topButton?.classList.toggle("visible", window.scrollY > threshold);
  };
  window.addEventListener("scroll", updateTopButton, { passive: true });
  window.addEventListener("resize", updateTopButton);
  topButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  updateTopButton();
}

function renderFloatingDecor() {
  const hero = document.querySelector(".page-hero");
  if (!hero) return;

  hero.insertAdjacentHTML(
    "afterbegin",
    `<div class="floating-decor" aria-hidden="true">
      <img class="decor decor-ring" src="./src/icons/icon-ring.png" alt="">
      <img class="decor decor-cone" src="./src/icons/icon-cone.png" alt="">
      <img class="decor decor-half" src="./src/icons/icon-half-circle.png" alt="">
      <img class="decor decor-triangle" src="./src/icons/icon-triangle.png" alt="">
    </div>`,
  );
}

document.body.insertAdjacentHTML("afterbegin", '<div class="loader" aria-label="Carregando"><div class="loader-book"><span></span><span></span><span></span></div><strong>ORGANIZANDO O MATERIAL...</strong></div>');
renderShell();
renderFloatingDecor();
if (window.location.hash === "#rodape") {
  requestAnimationFrame(() => document.querySelector("#rodape")?.scrollIntoView());
}
window.addEventListener("load", () => setTimeout(() => document.querySelector(".loader")?.classList.add("done"), 450));
