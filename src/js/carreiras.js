const CarreirasApp = (function () {
  const carreiras = [
    {
      nome: "Desenvolvedor Front-end",
      desc: "Cria interfaces visuais e interativas de sites e aplicações, usando HTML, CSS, JavaScript e frameworks modernos.",
      cat: "Desenvolvimento",
      tipo: "Interface",
    },
    {
      nome: "Desenvolvedor Back-end",
      desc: "Cuida da lógica, banco de dados e regras de negócio por trás das aplicações, garantindo que tudo funcione no servidor.",
      cat: "Desenvolvimento",
      tipo: "Servidor",
    },
    {
      nome: "Desenvolvedor Full Stack",
      desc: "Atua no front-end e no back-end, desenvolvendo aplicações completas e integrando as camadas do sistema.",
      cat: "Desenvolvimento",
      tipo: "Completo",
    },
    {
      nome: "Engenheiro de Dados",
      desc: "Projeta, constrói e mantém sistemas de coleta, armazenamento e processamento de grandes volumes de dados.",
      cat: "Dados",
      tipo: "Pipeline",
    },
    {
      nome: "Cientista de Dados",
      desc: "Analisa dados complexos para extrair insights e apoiar decisões com estatística, programação e inteligência artificial.",
      cat: "Dados",
      tipo: "Análise",
    },
    {
      nome: "Analista de Dados",
      desc: "Transforma dados em informações úteis para o negócio, criando relatórios, dashboards e análises estratégicas.",
      cat: "Dados",
      tipo: "Dashboard",
    },
    {
      nome: "DevOps Engineer",
      desc: "Integra desenvolvimento e operações, automatizando deploy, monitoramento e infraestrutura para ganhar agilidade.",
      cat: "Infra & Segurança",
      tipo: "Automação",
    },
    {
      nome: "Administrador de Banco de Dados",
      desc: "Gerencia bancos de dados, garantindo segurança, desempenho, integridade e disponibilidade das informações.",
      cat: "Infra & Segurança",
      tipo: "Banco",
    },
    {
      nome: "Segurança da Informação",
      desc: "Protege sistemas e dados contra ameaças por meio de políticas, ferramentas e práticas de segurança digital.",
      cat: "Infra & Segurança",
      tipo: "Proteção",
    },
    {
      nome: "Product Manager",
      desc: "Planeja e prioriza produtos digitais, alinhando necessidades do usuário, objetivos do negócio e viabilidade técnica.",
      cat: "Produto & Design",
      tipo: "Produto",
    },
    {
      nome: "UX/UI Designer",
      desc: "Cria experiências e interfaces intuitivas, acessíveis e agradáveis para produtos digitais.",
      cat: "Produto & Design",
      tipo: "Design",
    },
    {
      nome: "QA/Testador de Software",
      desc: "Garante a qualidade dos sistemas, planejando e executando testes para encontrar falhas antes da entrega.",
      cat: "Desenvolvimento",
      tipo: "Qualidade",
    },
    {
      nome: "Analista de Suporte Técnico",
      desc: "Atende usuários e resolve problemas técnicos, mantendo sistemas, redes e equipamentos funcionando bem.",
      cat: "Infra & Segurança",
      tipo: "Suporte",
    },
  ];

  const categorias = ["Todos", "Desenvolvimento", "Dados", "Infra & Segurança", "Produto & Design"];
  const cardThemes = [
    { base: "#fff238", orbA: "#20d1c9", orbB: "#ff473a", orbC: "#f48c06" },
    { base: "#20d1c9", orbA: "#fff238", orbB: "#8a2be2", orbC: "#ff473a" },
    { base: "#ff473a", orbA: "#f48c06", orbB: "#2385c4", orbC: "#fff238" },
    { base: "#f48c06", orbA: "#8a2be2", orbB: "#20d1c9", orbC: "#fff238" },
  ];

  let gridCarreiras;
  let containerCategorias;
  let inputBusca;
  let btnLimparBusca;
  let msgSemResultado;
  let filtroAtual = "";
  let categoriaAtual = "Todos";

  function obterIniciais(nome) {
    return nome
      .replace(/\([^)]*\)/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0])
      .join("")
      .toUpperCase();
  }

  function obterSvgCard(item, index) {
    const tema = cardThemes[index % cardThemes.length];
    const iniciais = obterIniciais(item.nome);

    return `
      <div class="carreira-card-visual" style="--card-base:${tema.base};">
        <svg viewBox="0 0 320 132" role="img" aria-label="Marcador visual de ${item.nome}">
          <defs>
            <pattern id="carreira-lines-${index}" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
              <rect width="12" height="12" fill="${tema.base}"></rect>
              <path d="M0 0H2V12H0z" fill="#000000" opacity="0.1"></path>
            </pattern>
          </defs>
          <rect width="320" height="132" fill="url(#carreira-lines-${index})"></rect>
          <circle cx="238" cy="64" r="58" fill="${tema.orbA}" opacity="0.55"></circle>
          <circle cx="284" cy="94" r="56" fill="${tema.orbB}" opacity="0.58"></circle>
          <circle cx="198" cy="102" r="50" fill="${tema.orbC}" opacity="0.52"></circle>
          <rect x="22" y="50" width="64" height="64" fill="#111111"></rect>
          <text x="54" y="91" text-anchor="middle" fill="${tema.base}" font-size="25" font-weight="900" font-family="Poppins, Arial">${iniciais}</text>
          <g transform="translate(186 18)">
            <rect width="114" height="24" fill="#00de72" stroke="#111111" stroke-width="4"></rect>
            <circle cx="15" cy="12" r="3.5" fill="#111111"></circle>
            <text x="64" y="16" text-anchor="middle" fill="#111111" font-size="9" font-weight="900" font-family="Poppins, Arial">${item.tipo}</text>
          </g>
        </svg>
      </div>
    `;
  }

  function renderizarGrid(dados) {
    gridCarreiras.innerHTML = "";

    if (dados.length === 0) {
      msgSemResultado.style.display = "block";
      gridCarreiras.style.display = "none";
      return;
    }

    msgSemResultado.style.display = "none";
    gridCarreiras.style.display = "grid";

    dados.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "brutal-card carreira-card";
      card.innerHTML = `
        ${obterSvgCard(item, index)}
        <div class="carreira-card-body">
          <span class="carreira-card-kicker">${item.cat}</span>
          <h3>${item.nome}</h3>
          <p>${item.desc}</p>
          <span class="categoria-tag">${item.tipo}</span>
        </div>
      `;
      gridCarreiras.appendChild(card);
    });
  }

  function processarFiltros() {
    const termoBusca = filtroAtual.toLowerCase();
    const dadosFiltrados = carreiras.filter((item) => {
      const combinaCategoria = categoriaAtual === "Todos" || item.cat === categoriaAtual;
      const combinaBusca =
        !termoBusca ||
        item.nome.toLowerCase().includes(termoBusca) ||
        item.desc.toLowerCase().includes(termoBusca) ||
        item.tipo.toLowerCase().includes(termoBusca);
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
