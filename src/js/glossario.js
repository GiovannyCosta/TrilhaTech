const GlossarioApp = (function () {
  const dicionario = [
    {
      termo: "API",
      tipo: "Integração",
      def: "Uma ponte que permite que dois sistemas, aplicativos ou sites conversem e troquem dados entre si.",
    },
    {
      termo: "Algoritmo",
      tipo: "Lógica",
      def: "Uma sequência de instruções para resolver um problema, como uma receita que o computador consegue seguir.",
    },
    {
      termo: "Back-end",
      tipo: "Camada",
      def: "A parte de bastidores de um site ou aplicativo, onde ficam servidores, bancos de dados e regras do sistema.",
    },
    {
      termo: "Bug",
      tipo: "Erro",
      def: "Um erro no código que faz um programa se comportar de forma inesperada ou parar de funcionar.",
    },
    {
      termo: "Cloud",
      tipo: "Infra",
      def: "A nuvem: serviços e arquivos rodando em computadores conectados à internet, sem depender só do seu aparelho.",
    },
    {
      termo: "Codar",
      tipo: "Gíria",
      def: "Gíria para programar. É o ato de escrever código para criar um software, site ou aplicativo.",
    },
    {
      termo: "Deploy",
      tipo: "Publicação",
      def: "O processo de colocar um site, atualização ou aplicativo no ar para que outras pessoas possam usar.",
    },
    {
      termo: "Framework",
      tipo: "Ferramenta",
      def: "Um conjunto de ferramentas prontas que acelera o trabalho de criação de softwares.",
    },
    {
      termo: "Front-end",
      tipo: "Interface",
      def: "A parte visual e interativa de um site ou app, como telas, botões, textos, animações e cores.",
    },
    {
      termo: "Git",
      tipo: "Versão",
      def: "Uma ferramenta que registra o histórico de alterações no código e ajuda equipes a trabalharem juntas.",
    },
    {
      termo: "Hardware",
      tipo: "Eletrônico",
      def: "A parte física da tecnologia, como teclado, monitor, placa-mãe, processador e memória.",
    },
    {
      termo: "IP",
      tipo: "Rede",
      def: "Um número de identificação usado por dispositivos quando eles se conectam a uma rede ou à internet.",
    },
    {
      termo: "Open Source",
      tipo: "Licença",
      def: "Software de código aberto, com código público para qualquer pessoa estudar, modificar ou melhorar.",
    },
    {
      termo: "Software",
      tipo: "Eletrônico",
      def: "A parte lógica da tecnologia: programas, aplicativos, sistemas e instruções que rodam nos dispositivos.",
    },
    {
      termo: "UI",
      tipo: "Interface",
      def: "Interface do usuário. É o que a pessoa enxerga e usa na tela: layout, botões, tipografia e componentes.",
    },
    {
      termo: "UX",
      tipo: "Experiência",
      def: "Experiência do usuário. É como a pessoa se sente ao usar um produto: se foi simples, fluido e útil.",
    },
    {
      termo: "ZIP",
      tipo: "Arquivo",
      def: "Formato de arquivo que compacta vários itens em um único pacote para facilitar armazenamento ou envio.",
    },
  ].sort((a, b) => a.termo.localeCompare(b.termo));

  const cardThemes = [
    { base: "#fff238", accent: "#111111", orbA: "#20d1c9", orbB: "#ff473a", orbC: "#f48c06" },
    { base: "#20d1c9", accent: "#111111", orbA: "#fff238", orbB: "#8a2be2", orbC: "#ff473a" },
    { base: "#ff473a", accent: "#111111", orbA: "#f48c06", orbB: "#2385c4", orbC: "#fff238" },
    { base: "#f48c06", accent: "#111111", orbA: "#8a2be2", orbB: "#20d1c9", orbC: "#fff238" },
  ];

  let gridResultados;
  let inputBusca;
  let btnLimparBusca;
  let containerAlfabeto;
  let msgSemResultado;
  let filtroAtual = "";
  let letraAtual = "";

  function obterSvgCard(item, index) {
    const tema = cardThemes[index % cardThemes.length];
    const inicial = item.termo.slice(0, 2).toUpperCase();

    return `
      <div class="glossario-card-visual" style="--card-base:${tema.base}; --card-accent:${tema.accent};">
        <svg viewBox="0 0 320 132" role="img" aria-label="Marcador visual de ${item.termo}">
          <defs>
            <pattern id="glossario-lines-${index}" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
              <rect width="12" height="12" fill="${tema.base}"></rect>
              <path d="M0 0H2V12H0z" fill="#000000" opacity="0.1"></path>
            </pattern>
          </defs>
          <rect width="320" height="132" fill="url(#glossario-lines-${index})"></rect>
          <circle cx="238" cy="64" r="58" fill="${tema.orbA}" opacity="0.55"></circle>
          <circle cx="284" cy="94" r="56" fill="${tema.orbB}" opacity="0.58"></circle>
          <circle cx="198" cy="102" r="50" fill="${tema.orbC}" opacity="0.52"></circle>
          <rect x="22" y="50" width="64" height="64" fill="#111111"></rect>
          <text x="54" y="91" text-anchor="middle" fill="${tema.base}" font-size="25" font-weight="900" font-family="Poppins, Arial">${inicial}</text>
          <g transform="translate(196 18)">
            <rect width="104" height="24" fill="#00de72" stroke="#111111" stroke-width="4"></rect>
            <circle cx="15" cy="12" r="3.5" fill="#111111"></circle>
            <text x="59" y="16" text-anchor="middle" fill="#111111" font-size="9" font-weight="900" font-family="Poppins, Arial">${item.tipo}</text>
          </g>
        </svg>
      </div>
    `;
  }

  function renderizarGrid(dados) {
    gridResultados.innerHTML = "";

    if (dados.length === 0) {
      msgSemResultado.style.display = "block";
      gridResultados.style.display = "none";
      return;
    }

    msgSemResultado.style.display = "none";
    gridResultados.style.display = "grid";

    dados.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "brutal-card glossario-card";
      card.innerHTML = `
        ${obterSvgCard(item, index)}
        <div class="glossario-card-body">
          <span class="glossario-card-kicker">${item.tipo}</span>
          <h3>${item.termo}</h3>
          <p>${item.def}</p>
        </div>
      `;
      gridResultados.appendChild(card);
    });
  }

  function atualizarBotoes() {
    const botoes = containerAlfabeto.querySelectorAll(".btn-letra");
    botoes.forEach((botao) => {
      const ativo = botao.dataset.letra === letraAtual;
      botao.classList.toggle("active", ativo);
    });
  }

  function processarFiltros() {
    const termoBusca = filtroAtual.toLowerCase();
    const dadosFiltrados = dicionario.filter((item) => {
      const combinaBusca =
        !termoBusca || item.termo.toLowerCase().includes(termoBusca) || item.def.toLowerCase().includes(termoBusca);
      const combinaLetra = !letraAtual || item.termo.toUpperCase().startsWith(letraAtual);
      return combinaBusca && combinaLetra;
    });

    renderizarGrid(dadosFiltrados);
  }

  function aplicarFiltroLetra(letra) {
    letraAtual = letra;
    atualizarBotoes();
    processarFiltros();
  }

  function renderizarAlfabeto() {
    const letras = ["", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

    letras.forEach((letra) => {
      const btn = document.createElement("button");
      btn.className = `btn-letra ${letra === "" ? "active" : ""}`;
      btn.dataset.letra = letra;
      btn.textContent = letra || "Tudo";
      btn.style.width = letra ? "" : "auto";
      btn.style.padding = letra ? "" : "0 15px";
      btn.addEventListener("click", () => aplicarFiltroLetra(letra));
      containerAlfabeto.appendChild(btn);
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
    gridResultados = document.getElementById("glossarioGrid");
    inputBusca = document.getElementById("searchInput");
    btnLimparBusca = document.getElementById("clearSearchBtn");
    containerAlfabeto = document.getElementById("alfabetoContainer");
    msgSemResultado = document.getElementById("noResultsMessage");

    if (!gridResultados) return;

    renderizarAlfabeto();
    inputBusca.addEventListener("input", aplicarFiltroBusca);
    btnLimparBusca.addEventListener("click", limparBusca);
    renderizarGrid(dicionario);
  }

  return { iniciar: init };
})();

document.addEventListener("DOMContentLoaded", GlossarioApp.iniciar);
