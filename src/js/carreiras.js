/* == Módulo Carreiras == */
const CarreirasApp = (function () {
  // Dicionário de Carreiras
  const carreiras = [
    {
      nome: "Desenvolvedor Front-end",
      desc: "Responsável por criar interfaces visuais e interativas de sites e aplicações, utilizando HTML, CSS, JavaScript e frameworks modernos.",
      icone: "https://cdn-icons-png.flaticon.com/512/2721/2721301.png",
      cat: "Desenvolvimento",
    },
    {
      nome: "Desenvolvedor Back-end",
      desc: "Cuida da lógica, banco de dados e regras de negócio por trás das aplicações, garantindo que tudo funcione corretamente no servidor.",
      icone: "https://cdn-icons-png.flaticon.com/512/2721/2721304.png",
      cat: "Desenvolvimento",
    },
    {
      nome: "Desenvolvedor Full Stack",
      desc: "Atua tanto no front-end quanto no back-end, desenvolvendo aplicações completas e integrando todas as camadas do sistema.",
      icone: "https://cdn-icons-png.flaticon.com/512/2721/2721311.png",
      cat: "Desenvolvimento",
    },
    {
      nome: "Engenheiro de Dados",
      desc: "Especialista em projetar, construir e manter sistemas de coleta, armazenamento e processamento de grandes volumes de dados.",
      icone: "https://cdn-icons-png.flaticon.com/512/2721/2721297.png",
      cat: "Dados",
    },
    {
      nome: "Cientista de Dados",
      desc: "Analisa dados complexos para extrair insights e apoiar decisões, utilizando estatística, programação e inteligência artificial.",
      icone: "https://cdn-icons-png.flaticon.com/512/2721/2721300.png",
      cat: "Dados",
    },
    {
      nome: "Analista de Dados",
      desc: "Transforma dados em informações úteis para o negócio, criando relatórios, dashboards e análises para apoiar estratégias.",
      icone: "https://cdn-icons-png.flaticon.com/512/2721/2721300.png",
      cat: "Dados",
    },
    {
      nome: "DevOps Engineer",
      desc: "Integra desenvolvimento e operações, automatizando processos de deploy, monitoramento e infraestrutura para maior agilidade.",
      icone: "https://cdn-icons-png.flaticon.com/512/2721/2721298.png",
      cat: "Infra & Segurança",
    },
    {
      nome: "Administrador de Banco de Dados",
      desc: "Gerencia bancos de dados (DBA), garantindo segurança, desempenho, integridade e disponibilidade das informações.",
      icone: "https://cdn-icons-png.flaticon.com/512/2721/2721309.png",
      cat: "Infra & Segurança",
    },
    {
      nome: "Segurança da Informação",
      desc: "Protege sistemas e dados contra ameaças, implementando políticas, ferramentas e práticas de segurança digital (Cybersecurity).",
      icone: "https://cdn-icons-png.flaticon.com/512/2721/2721310.png",
      cat: "Infra & Segurança",
    },
    {
      nome: "Product Manager (PM)",
      desc: "Responsável por planejar, priorizar e guiar o desenvolvimento de produtos digitais, alinhando as necessidades do usuário e negócio.",
      icone: "https://cdn-icons-png.flaticon.com/512/2721/2721306.png",
      cat: "Produto & Design",
    },
    {
      nome: "UX/UI Designer",
      desc: "Foca na experiência e na interface do usuário, criando soluções visuais intuitivas, acessíveis e agradáveis para produtos digitais.",
      icone: "https://cdn-icons-png.flaticon.com/512/2721/2721307.png",
      cat: "Produto & Design",
    },
    {
      nome: "QA/Testador de Software",
      desc: "Garante a qualidade dos sistemas, planejando e executando testes para identificar e corrigir falhas antes da entrega.",
      icone: "https://cdn-icons-png.flaticon.com/512/2721/2721308.png",
      cat: "Desenvolvimento",
    },
    {
      nome: "Analista de Suporte Técnico",
      desc: "Atende usuários e resolve problemas técnicos, garantindo o funcionamento adequado de sistemas, redes e equipamentos.",
      icone: "https://cdn-icons-png.flaticon.com/512/2721/2721302.png",
      cat: "Infra & Segurança",
    },
  ];

  // As categorias baseadas nos objetos acima
  const categorias = ["Todos", "Desenvolvimento", "Dados", "Infra & Segurança", "Produto & Design"];

  // Elementos DOM
  let gridCarreiras;
  let containerCategorias;
  let inputBusca;
  let btnLimparBusca;
  let msgSemResultado;

  let filtroAtual = "";
  let categoriaAtual = "Todos";

  // 2. RENDERIZAÇÃO
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
      const card = document.createElement("div");
      card.className = "brutal-card carreira-card";
      card.innerHTML = `
                <img src="${item.icone}" alt="${item.nome}" class="carreira-icon">
                <h3>${item.nome}</h3>
                <p>${item.desc}</p>
                <span class="categoria-tag">${item.cat}</span>
            `;
      gridCarreiras.appendChild(card);
    });
  }

  function renderizarCategorias() {
    categorias.forEach((cat) => {
      const btn = document.createElement("button");

      btn.className = "btn-letra " + (cat === "Todos" ? "active" : "");
      btn.textContent = cat;
      btn.style.width = "auto";
      btn.style.padding = "0 15px";

      btn.addEventListener("click", () => aplicarFiltroCategoria(cat, btn));
      containerCategorias.appendChild(btn);
    });
  }

  // FUNÇÕES DE FILTRAGEM E LÓGICA
  function processarFiltros() {
    let dadosFiltrados = carreiras;

    // 1. Filtro por Categoria
    if (categoriaAtual !== "Todos") {
      dadosFiltrados = dadosFiltrados.filter((item) => item.cat === categoriaAtual);
    }

    // 2. Filtro por Texto (Barra de Pesquisa)
    if (filtroAtual) {
      const termoBusca = filtroAtual.toLowerCase();
      dadosFiltrados = dadosFiltrados.filter(
        (item) => item.nome.toLowerCase().includes(termoBusca) || item.desc.toLowerCase().includes(termoBusca),
      );
    }

    renderizarGrid(dadosFiltrados);
  }

  function aplicarFiltroCategoria(cat, btnElement) {
    categoriaAtual = cat;

    // Atualiza a interface dos botões
    const botoes = containerCategorias.querySelectorAll(".btn-letra");
    botoes.forEach((b) => b.classList.remove("active"));
    btnElement.classList.add("active");

    processarFiltros();
  }

  function aplicarFiltroBusca(evento) {
    filtroAtual = evento.target.value.trim();

    // Controla o botão "X" de limpar
    btnLimparBusca.style.display = filtroAtual.length > 0 ? "block" : "none";

    processarFiltros();
  }

  function limparBusca() {
    inputBusca.value = "";
    filtroAtual = "";
    btnLimparBusca.style.display = "none";
    processarFiltros();
  }

  // INICIALIZAÇÃO E EVENTOS
  function init() {
    gridCarreiras = document.getElementById("carreirasGrid");
    containerCategorias = document.getElementById("categoriasContainer");
    inputBusca = document.getElementById("searchInput");
    btnLimparBusca = document.getElementById("clearSearchBtn");
    msgSemResultado = document.getElementById("noResultsMessage");

    if (!gridCarreiras) return; // Segurança

    renderizarCategorias();

    // Listeners da busca
    inputBusca.addEventListener("input", aplicarFiltroBusca);
    btnLimparBusca.addEventListener("click", limparBusca);

    // Renderização inicial
    renderizarGrid(carreiras);
  }

  return { iniciar: init };
})();

document.addEventListener("DOMContentLoaded", CarreirasApp.iniciar);
