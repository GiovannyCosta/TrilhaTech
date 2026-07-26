const TrilhaTechUI = (function () {
  const pages = {
    home: "HOME",
    glossario: "GLOSSARIO",
    carreiras: "CARREIRAS",
    sobre: "SOBRE",
  };

  const navItems = [
    { page: "home", label: "Home", href: "./index.html" },
    { page: "glossario", label: "Glossario", href: "./glossario.html" },
    { page: "carreiras", label: "Carreiras", href: "./carreiras.html" },
    { page: "sobre", label: "Sobre", href: "./sobre.html" },
  ];
  const loaderSessionKey = "trilhaTechLoaderShown";
  const minLoaderMs = 2200;
  const loaderFadeMs = 650;

  function getCurrentPage() {
    return document.body.dataset.page || "home";
  }

  function logoMarkup(modifier = "") {
    return `
      <img class="logo-img ${modifier}" src="./src/img/logo-trilha-black.png" alt="Logo Trilha Tech">
      <span class="logo-text">TRILHA<span class="text-cyan">TECH</span></span>
    `;
  }

  function shouldShowLoading() {
    try {
      const navigation = performance.getEntriesByType("navigation")[0];
      const isReload = navigation ? navigation.type === "reload" : performance.navigation?.type === 1;

      if (!isReload && sessionStorage.getItem(loaderSessionKey) === "true") return false;
      sessionStorage.setItem(loaderSessionKey, "true");
      return true;
    } catch (error) {
      return true;
    }
  }

  function unlockApp() {
    document.body.classList.add("app-ready");
  }

  function waitForPageLoad(callback) {
    if (document.readyState === "complete") {
      callback();
      return;
    }

    window.addEventListener("load", callback, { once: true });
  }

  function renderLoading() {
    if (!shouldShowLoading()) return false;

    const startedAt = performance.now();
    const loader = document.createElement("div");
    loader.className = "page-loader";
    loader.setAttribute("aria-label", "Carregando Trilha Tech");
    loader.innerHTML = `
      <div class="loader-card">
        <div class="loader-goo" aria-hidden="true">
          <div class="loader-goo-dots">
            <div class="loader-dot loader-dot-1"></div>
            <div class="loader-dot loader-dot-2"></div>
            <div class="loader-dot loader-dot-3"></div>
          </div>
          <div class="loader-logo-stack">
            <img class="loader-logo loader-logo-black" src="./src/img/logo-trilha-black.png" alt="">
            <img class="loader-logo loader-logo-white" src="./src/img/logo-trilha-white.png" alt="">
          </div>
        </div>
        <svg class="loader-filter" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <filter id="loader-goo-filter">
              <feGaussianBlur result="blur" stdDeviation="10" in="SourceGraphic"></feGaussianBlur>
              <feColorMatrix
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                mode="matrix"
                in="blur">
              </feColorMatrix>
            </filter>
          </defs>
        </svg>
      </div>
    `;
    document.body.prepend(loader);

    waitForPageLoad(() => {
      const elapsed = performance.now() - startedAt;
      const releaseDelay = Math.max(minLoaderMs - elapsed, 0);

      window.setTimeout(() => {
        unlockApp();
        loader.classList.add("is-hidden");
        window.setTimeout(() => loader.remove(), loaderFadeMs);
      }, releaseDelay);
    });

    return true;
  }

  function renderHeader() {
    const currentPage = getCurrentPage();
    const header = document.createElement("header");
    header.className = "app-header";
    header.innerHTML = `
      <div class="logo-area">
        <a href="./index.html" aria-label="Ir para a pagina inicial">
          ${logoMarkup()}
        </a>
      </div>
      <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="top-nav" aria-label="Navegacao principal">
        <ul class="nav-list">
          ${navItems
            .map(
              (item) => `
                <li>
                  <a href="${item.href}" class="nav-link ${item.page === currentPage ? "is-active" : ""}">
                    ${item.label}
                  </a>
                </li>
              `,
            )
            .join("")}
        </ul>
      </nav>
    `;

    document.querySelector(".app-container").prepend(header);

    const toggle = header.querySelector(".menu-toggle");
    const nav = header.querySelector(".top-nav");
    toggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      nav.classList.toggle("is-open", isOpen);
    });
  }

  function renderFooter() {
    const footerWrapper = document.createElement("section");
    footerWrapper.className = "footer-wrapper";
    footerWrapper.innerHTML = `
      <div class="banner-footer banner-container">
        <div class="container">
          <div class="banner-icons-wrapper">
            <img src="./src/img/banner-icons.png" alt="Icones geometricos">
          </div>
        </div>
      </div>

      <footer class="app-footer">
        <img src="./src/icons/icon-cone.png" alt="" class="forma-3d ft-forma-1">
        <img src="./src/icons/icon-triangle.png" alt="" class="forma-3d ft-forma-2">
        <img src="./src/icons/icon-ring.png" alt="" class="forma-3d ft-forma-3">

        <div class="footer-container">
          <div class="footer-col brand-col">
            <a href="./index.html" class="footer-logo-link">
              ${logoMarkup("footer-logo")}
            </a>
            <p>Sua bussola no mundo da tecnologia. Um guia simples para quem esta comecando do zero.</p>
            <div class="author-wrapper">
              <span class="copy-text-love">FEITO COM CARINHO POR</span>
              <div class="copy-center">
                <a href="https://www.instagram.com/gio.env/" class="author-tag" target="_blank" rel="noreferrer">@gio.env</a>
                <a href="#" class="author-tag">@nelson</a>
              </div>
            </div>
          </div>

          <div class="footer-col">
            <h4>Explore</h4>
            <ul class="footer-links">
              <li><a href="./carreiras.html">Carreiras</a></li>
              <li><a href="https://roadmap.sh/" target="_blank" rel="noreferrer">Roadmap</a></li>
              <li><a href="./glossario.html">Glossario</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Projeto</h4>
            <ul class="footer-links">
              <li><a href="./sobre.html">Sobre nos</a></li>
              <li><a href="./index.html#conexoes">Conexoes</a></li>
              <li><a href="./carreiras.html">Trilhas</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-copyright-wrapper">
          <div class="footer-copyright-box">
            <p>© 2026 TrilhaTech. Todos os direitos reservados.</p>
            <div class="arghata-credit">
              <span>Feito com ❤️ por</span>
              <a class="arghata-logo" href="#" aria-label="Arghata">
                <img src="./src/img/arghata-no-text.png" alt="Arghata">
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;

    document.querySelector(".app-container").appendChild(footerWrapper);
  }

  function renderTopButton() {
    const wrapper = document.createElement("div");
    wrapper.className = "topUp";
    wrapper.innerHTML = '<button type="button" id="topBtn" aria-label="Voltar ao topo"><i class="fa-solid fa-arrow-up"></i></button>';
    document.body.appendChild(wrapper);
  }

  function init() {
    if (!document.querySelector(".app-container")) return;
    const isLoading = renderLoading();
    renderHeader();
    renderTopButton();
    renderFooter();
    document.body.dataset.pageLabel = pages[getCurrentPage()] || pages.home;

    if (!isLoading) unlockApp();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", TrilhaTechUI.init);
