/* == Módulo Glossário == */
const GlossarioApp = (function () {
  // Dicionário de termos tecnicos
  const dicionario = [
    {
      termo: "API",
      def: "Uma ponte invisível que permite que dois sistemas, aplicativos ou sites conversem e troquem dados entre si.",
    },
    {
      termo: "Algoritmo",
      def: "Uma receita de bolo para o computador. É um passo a passo de instruções para resolver um problema.",
    },
    {
      termo: "Back-end",
      def: "Os 'bastidores' de um site ou aplicativo. É onde ficam os servidores, banco de dados e as engrenagens que fazem tudo funcionar.",
    },
    {
      termo: "Bug",
      def: "Um erro ou falha no código que faz com que um programa se comporte de maneira estranha ou pare de funcionar.",
    },
    {
      termo: "Cloud",
      def: "A famosa 'Nuvem'. Significa armazenar arquivos ou rodar sistemas em computadores super potentes na internet, ao invés do seu HD local.",
    },
    {
      termo: "Deploy",
      def: "O ato de colocar um site, atualização ou aplicativo 'no ar', deixando-o disponível para os usuários finais.",
    },
    {
      termo: "Framework",
      def: "Uma caixa de ferramentas já prontas que facilita e acelera o trabalho do programador para criar softwares.",
    },
    {
      termo: "Front-end",
      def: "A parte visual do site ou app, onde o usuário clica e interage. Envolve o design, botões, textos e cores.",
    },
    {
      termo: "Git",
      def: "Uma ferramenta de 'máquina do tempo'. Ele salva o histórico de todas as alterações feitas no código do projeto.",
    },
    {
      termo: "Hardware",
      def: "A parte física da tecnologia. Aquilo que você pode chutar ou tocar: teclado, monitor, placa-mãe, memória.",
    },
    {
      termo: "IP",
      def: "Um número de identificação, como se fosse o endereço postal ou o CPF do seu computador quando ele se conecta à internet.",
    },
    {
      termo: "Open Source",
      def: "Software de código aberto. Significa que o código do programa é público e qualquer pessoa pode ver, modificar e melhorar.",
    },
    {
      termo: "Software",
      def: "A parte lógica da tecnologia. Os programas, aplicativos e sistemas operacionais. Aquilo que você só pode 'xingar', mas não tocar.",
    },
    {
      termo: "UI",
      def: "(User Interface / Interface do Usuário) É a tela, o layout, os botões e a tipografia. O que o usuário enxerga.",
    },
    {
      termo: "UX",
      def: "(User Experience / Experiência do Usuário) É como o usuário se sente ao usar o sistema. Se a navegação foi fácil, fluida ou frustrante.",
    },
    {
      termo: "Codar",
      def: "Gíria para programar. É o ato de escrever código para criar um software, site ou aplicativo.",
    },
    {
      termo: "ZIP",
      def: "Um formato de arquivo que compacta vários arquivos em um único pacote para facilitar o armazenamento ou envio.",
    },
  ];

  // Ordena o dicionário de A a Z por padrão
  dicionario.sort((a, b) => a.termo.localeCompare(b.termo));

  // Elementos do DOM
  let gridResultados;
  let inputBusca;
  let btnLimparBusca;
  let containerAlfabeto;
  let msgSemResultado;

  // Estado atual
  let filtroAtual = "";
  let letraAtual = "";

  // FUNÇÕES DE RENDERIZAÇÃO
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
      const card = document.createElement("div");
      card.className = "brutal-card glossario-card";

      card.innerHTML = `
                <h3>${item.termo}</h3>
                <p>${item.def}</p>
            `;
      gridResultados.appendChild(card);
    });
  }

  function renderizarAlfabeto() {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // Botão para mostrar todos
    const btnTodos = document.createElement("button");
    btnTodos.className = "btn-letra active";
    btnTodos.textContent = "Tudo";
    btnTodos.style.width = "auto";
    btnTodos.style.padding = "0 15px";
    btnTodos.addEventListener("click", () => aplicarFiltroLetra(""));
    containerAlfabeto.appendChild(btnTodos);

    // Botões de A a Z
    alfabeto.forEach((letra) => {
      const btn = document.createElement("button");
      btn.className = "btn-letra";
      btn.textContent = letra;
      btn.addEventListener("click", () => aplicarFiltroLetra(letra));
      containerAlfabeto.appendChild(btn);
    });
  }

  // FUNÇÕES DE FILTRAGEM E LÓGICA
  function processarFiltros() {
    let dadosFiltrados = dicionario;

    // Filtra pela caixa de pesquisa (nome do termo ou definição)
    if (filtroAtual) {
      const termoBusca = filtroAtual.toLowerCase();
      dadosFiltrados = dadosFiltrados.filter(
        (item) => item.termo.toLowerCase().includes(termoBusca) || item.def.toLowerCase().includes(termoBusca),
      );
    }

    // Filtra pela letra selecionada (apenas inicial da palavra)
    if (letraAtual) {
      dadosFiltrados = dadosFiltrados.filter((item) => item.termo.toUpperCase().startsWith(letraAtual));
    }

    renderizarGrid(dadosFiltrados);
  }

  function aplicarFiltroLetra(letra) {
    letraAtual = letra;

    // Atualiza interface dos botões
    const botoes = containerAlfabeto.querySelectorAll(".btn-letra");
    botoes.forEach((b) => b.classList.remove("active"));

    if (letra === "") {
      botoes[0].classList.add("active"); // Botão "Tudo"
    } else {
      // Acha o botão da letra exata
      const btnAlvo = Array.from(botoes).find((b) => b.textContent === letra);
      if (btnAlvo) btnAlvo.classList.add("active");
    }

    processarFiltros();
  }

  function aplicarFiltroBusca(evento) {
    filtroAtual = evento.target.value.trim();

    // Controla o botão "X" de limpar
    if (filtroAtual.length > 0) {
      btnLimparBusca.style.display = "block";
    } else {
      btnLimparBusca.style.display = "none";
    }

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
    // Captura os elementos DOM
    gridResultados = document.getElementById("glossarioGrid");
    inputBusca = document.getElementById("searchInput");
    btnLimparBusca = document.getElementById("clearSearchBtn");
    containerAlfabeto = document.getElementById("alfabetoContainer");
    msgSemResultado = document.getElementById("noResultsMessage");

    if (!gridResultados) return; // Segurança caso o script seja rodado em outra página

    // Monta os botões iniciais
    renderizarAlfabeto();

    // Listeners de evento
    inputBusca.addEventListener("input", aplicarFiltroBusca);
    btnLimparBusca.addEventListener("click", limparBusca);

    // Renderiza tudo na primeira carga
    renderizarGrid(dicionario);
  }

  // Retorna apenas o que for público para o app
  return {
    iniciar: init,
  };
})();

// Dispara o script quando o HTML estiver 100% carregado
document.addEventListener("DOMContentLoaded", GlossarioApp.iniciar);
