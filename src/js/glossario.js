const GlossarioApp = (function () {
  const dicionario = [
    {
      termo: "API",
      def: "Uma ponte que permite que dois sistemas, aplicativos ou sites conversem e troquem dados entre si.",
    },
    {
      termo: "Algoritmo",
      def: "Uma sequência de instruções para resolver um problema, como uma receita que o computador consegue seguir.",
    },
    {
      termo: "Back-end",
      def: "A parte de bastidores de um site ou aplicativo, onde ficam servidores, bancos de dados e regras do sistema.",
    },
    {
      termo: "Bug",
      def: "Um erro no código que faz um programa se comportar de forma inesperada ou parar de funcionar.",
    },
    {
      termo: "Cloud",
      def: "A nuvem: serviços e arquivos rodando em computadores conectados à internet, sem depender só do seu aparelho.",
    },
    {
      termo: "Codar",
      def: "Gíria para programar. É o ato de escrever código para criar um software, site ou aplicativo.",
    },
    {
      termo: "Deploy",
      def: "O processo de colocar um site, atualização ou aplicativo no ar para que outras pessoas possam usar.",
    },
    {
      termo: "Framework",
      def: "Um conjunto de ferramentas prontas que acelera o trabalho de criação de softwares.",
    },
    {
      termo: "Front-end",
      def: "A parte visual e interativa de um site ou app, como telas, botões, textos, animações e cores.",
    },
    {
      termo: "Git",
      def: "Uma ferramenta que registra o histórico de alterações no código e ajuda equipes a trabalharem juntas.",
    },
    {
      termo: "Hardware",
      def: "A parte física da tecnologia, como teclado, monitor, placa-mãe, processador e memória.",
    },
    {
      termo: "IP",
      def: "Um número de identificação usado por dispositivos quando eles se conectam a uma rede ou à internet.",
    },
    {
      termo: "Open Source",
      def: "Software de código aberto, com código público para qualquer pessoa estudar, modificar ou melhorar.",
    },
    {
      termo: "Software",
      def: "A parte lógica da tecnologia: programas, aplicativos, sistemas e instruções que rodam nos dispositivos.",
    },
    {
      termo: "UI",
      def: "Interface do usuário. É o que a pessoa enxerga e usa na tela: layout, botões, tipografia e componentes.",
    },
    {
      termo: "UX",
      def: "Experiência do usuário. É como a pessoa se sente ao usar um produto: se foi simples, fluido e útil.",
    },
    {
      termo: "ZIP",
      def: "Formato de arquivo que compacta vários itens em um único pacote para facilitar armazenamento ou envio.",
    },
  ].sort((a, b) => a.termo.localeCompare(b.termo));

  let gridResultados;
  let inputBusca;
  let btnLimparBusca;
  let containerAlfabeto;
  let msgSemResultado;
  let filtroAtual = "";
  let letraAtual = "";

  function renderizarGrid(dados) {
    gridResultados.innerHTML = "";

    if (dados.length === 0) {
      msgSemResultado.style.display = "block";
      gridResultados.style.display = "none";
      return;
    }

    msgSemResultado.style.display = "none";
    gridResultados.style.display = "grid";

    dados.forEach((item) => {
      const card = document.createElement("article");
      card.className = "brutal-card glossario-card";
      card.innerHTML = `
        <h3>${item.termo}</h3>
        <p>${item.def}</p>
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
