const CarreirasApp = (function () {
  const iconBase = "./src/img/";
  const carreiras = [
    {
      nome: "Desenvolvedor Front-end",
      desc: "Cria interfaces visuais e interativas de sites e aplicações, usando HTML, CSS, JavaScript e frameworks modernos.",
      icone: `${iconBase}geometry-link-1.png`,
      cat: "Desenvolvimento",
    },
    {
      nome: "Desenvolvedor Back-end",
      desc: "Cuida da lógica, banco de dados e regras de negócio por trás das aplicações, garantindo que tudo funcione no servidor.",
      icone: `${iconBase}geometry-link-2.png`,
      cat: "Desenvolvimento",
    },
    {
      nome: "Desenvolvedor Full Stack",
      desc: "Atua no front-end e no back-end, desenvolvendo aplicações completas e integrando as camadas do sistema.",
      icone: `${iconBase}geomety-link-3.png`,
      cat: "Desenvolvimento",
    },
    {
      nome: "Engenheiro de Dados",
      desc: "Projeta, constrói e mantém sistemas de coleta, armazenamento e processamento de grandes volumes de dados.",
      icone: `${iconBase}icon-card-1.png`,
      cat: "Dados",
    },
    {
      nome: "Cientista de Dados",
      desc: "Analisa dados complexos para extrair insights e apoiar decisões com estatística, programação e inteligência artificial.",
      icone: `${iconBase}icon-card-2.png`,
      cat: "Dados",
    },
    {
      nome: "Analista de Dados",
      desc: "Transforma dados em informações úteis para o negócio, criando relatórios, dashboards e análises estratégicas.",
      icone: `${iconBase}banner-icons.png`,
      cat: "Dados",
    },
    {
      nome: "DevOps Engineer",
      desc: "Integra desenvolvimento e operações, automatizando deploy, monitoramento e infraestrutura para ganhar agilidade.",
      icone: `${iconBase}geometry-link-2.png`,
      cat: "Infra & Segurança",
    },
    {
      nome: "Administrador de Banco de Dados",
      desc: "Gerencia bancos de dados, garantindo segurança, desempenho, integridade e disponibilidade das informações.",
      icone: `${iconBase}icon-card-1.png`,
      cat: "Infra & Segurança",
    },
    {
      nome: "Segurança da Informação",
      desc: "Protege sistemas e dados contra ameaças por meio de políticas, ferramentas e práticas de segurança digital.",
      icone: `${iconBase}geomety-link-3.png`,
      cat: "Infra & Segurança",
    },
    {
      nome: "Product Manager",
      desc: "Planeja e prioriza produtos digitais, alinhando necessidades do usuário, objetivos do negócio e viabilidade técnica.",
      icone: `${iconBase}icon-card-2.png`,
      cat: "Produto & Design",
    },
    {
      nome: "UX/UI Designer",
      desc: "Cria experiências e interfaces intuitivas, acessíveis e agradáveis para produtos digitais.",
      icone: `${iconBase}geometry-link-1.png`,
      cat: "Produto & Design",
    },
    {
      nome: "QA/Testador de Software",
      desc: "Garante a qualidade dos sistemas, planejando e executando testes para encontrar falhas antes da entrega.",
      icone: `${iconBase}banner-icons.png`,
      cat: "Desenvolvimento",
    },
    {
      nome: "Analista de Suporte Técnico",
      desc: "Atende usuários e resolve problemas técnicos, mantendo sistemas, redes e equipamentos funcionando bem.",
      icone: `${iconBase}geometry-link-2.png`,
      cat: "Infra & Segurança",
    },
  ];

  const categorias = ["Todos", "Desenvolvimento", "Dados", "Infra & Segurança", "Produto & Design"];

  let gridCarreiras;
  let containerCategorias;
  let inputBusca;
  let btnLimparBusca;
  let msgSemResultado;
  let filtroAtual = "";
  let categoriaAtual = "Todos";

  function renderizarGrid(dados) {
    gridCarreiras.innerHTML = "";

    if (dados.length === 0) {
      msgSemResultado.style.display = "block";
      gridCarreiras.style.display = "none";
      return;
    }

    msgSemResultado.style.display = "none";
    gridCarreiras.style.display = "grid";

    dados.forEach((item) => {
      const card = document.createElement("article");
      card.className = "brutal-card carreira-card";
      card.innerHTML = `
        <img src="${item.icone}" alt="" class="carreira-icon">
        <h3>${item.nome}</h3>
        <p>${item.desc}</p>
        <span class="categoria-tag">${item.cat}</span>
      `;
      gridCarreiras.appendChild(card);
    });
  }

  function processarFiltros() {
    const termoBusca = filtroAtual.toLowerCase();
    const dadosFiltrados = carreiras.filter((item) => {
      const combinaCategoria = categoriaAtual === "Todos" || item.cat === categoriaAtual;
      const combinaBusca =
        !termoBusca || item.nome.toLowerCase().includes(termoBusca) || item.desc.toLowerCase().includes(termoBusca);
      return combinaCategoria && combinaBusca;
    });

    renderizarGrid(dadosFiltrados);
  }

  function aplicarFiltroCategoria(cat, btnElement) {
    categoriaAtual = cat;
    containerCategorias.querySelectorAll(".btn-letra").forEach((btn) => btn.classList.remove("active"));
    btnElement.classList.add("active");
    processarFiltros();
  }

  function renderizarCategorias() {
    categorias.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = `btn-letra ${cat === "Todos" ? "active" : ""}`;
      btn.textContent = cat;
      btn.style.width = "auto";
      btn.style.padding = "0 15px";
      btn.addEventListener("click", () => aplicarFiltroCategoria(cat, btn));
      containerCategorias.appendChild(btn);
    });
  }

  function aplicarFiltroBusca(evento) {
    filtroAtual = evento.target.value.trim();
    btnLimparBusca.style.display = filtroAtual ? "block" : "none";
    processarFiltros();
  }

  function limparBusca() {
    inputBusca.value = "";
    filtroAtual = "";
    btnLimparBusca.style.display = "none";
    processarFiltros();
  }

  function init() {
    gridCarreiras = document.getElementById("carreirasGrid");
    containerCategorias = document.getElementById("categoriasContainer");
    inputBusca = document.getElementById("searchInput");
    btnLimparBusca = document.getElementById("clearSearchBtn");
    msgSemResultado = document.getElementById("noResultsMessage");

    if (!gridCarreiras) return;

    renderizarCategorias();
    inputBusca.addEventListener("input", aplicarFiltroBusca);
    btnLimparBusca.addEventListener("click", limparBusca);
    renderizarGrid(carreiras);
  }

  return { iniciar: init };
})();

document.addEventListener("DOMContentLoaded", CarreirasApp.iniciar);
