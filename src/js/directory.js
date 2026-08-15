const { careers, terms } = window.TRILHA_DATA;
const pageType = document.body.dataset.directory;
const data = pageType === "careers"
  ? careers
  : terms.map(([name, area, summary]) => ({ name, area, summary }));

const grid = document.querySelector("[data-directory-grid]");
const search = document.querySelector("[data-search]");
const chips = document.querySelector("[data-chips]");
const counter = document.querySelector("[data-count]");
let activeArea = "Todos";

const accents = {
  Fundamentos: "#ffe51f",
  Programação: "#2385c4",
  Dados: "#8a66cc",
  Qualidade: "#ef6a9a",
  Infraestrutura: "#f48c06",
  Cultura: "#2ba99a",
  Ferramentas: "#00bcd4",
  Design: "#ff715b",
  Segurança: "#ff473a",
  Carreira: "#8a66cc",
  Negócios: "#f0b429",
  Lógica: "#ffe51f",
  Integração: "#20c9c3",
  Camada: "#ff473a",
  Erro: "#f48c06",
};

const areas = ["Todos", ...new Set(data.map((item) => item.area))];
chips.innerHTML = areas
  .map((area) => `<button class="chip ${area === "Todos" ? "active" : ""}" type="button" data-area="${area}">${area}</button>`)
  .join("");

function normalize(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function initials(name) {
  return normalize(name).replace(/[^a-z0-9]/g, "").slice(0, 2).toUpperCase();
}

function visual(item, code) {
  return `<div class="directory-visual" style="--card-accent:${accents[item.area] || "#2385c4"}">
    <span class="visual-code" aria-hidden="true">${code}</span>
    <span class="visual-tag"><i></i>${item.area}</span>
  </div>`;
}

function careerCard(item) {
  const code = item.icon === "</>" ? "FE" : item.icon;
  return `<article class="school-card directory-card retro-card">
    ${visual(item, code)}
    <div class="directory-content">
      <h2>${item.name}</h2>
      <p>${item.summary}</p>
      <ul>
        <li><strong>Combina com:</strong> ${item.profile}</li>
        <li><strong>Comece por:</strong> ${item.start}</li>
      </ul>
      <a class="card-link" href="https://roadmap.sh/${item.roadmap}" target="_blank" rel="noreferrer">Abrir roadmap ↗</a>
    </div>
  </article>`;
}

function glossaryCard(item) {
  return `<article class="school-card directory-card retro-card">
    ${visual(item, initials(item.name))}
    <div class="directory-content">
      <h2 class="glossary-term">${item.name}</h2>
      <p>${item.summary}</p>
    </div>
  </article>`;
}

function render() {
  const query = normalize(search.value.trim());
  const filtered = data.filter((item) => (
    (activeArea === "Todos" || item.area === activeArea)
    && normalize(`${item.name} ${item.area} ${item.summary}`).includes(query)
  ));

  counter.textContent = `${filtered.length} ${pageType === "careers"
    ? (filtered.length === 1 ? "carreira encontrada" : "carreiras encontradas")
    : (filtered.length === 1 ? "termo encontrado" : "termos encontrados")}`;

  grid.innerHTML = filtered.length
    ? filtered.map((item) => pageType === "careers" ? careerCard(item) : glossaryCard(item)).join("")
    : `<div class="empty-state"><h2>Nada encontrado</h2><p>Tente outra palavra ou remova o filtro.</p></div>`;
}

chips.addEventListener("click", (event) => {
  const button = event.target.closest("[data-area]");
  if (!button) return;
  activeArea = button.dataset.area;
  chips.querySelectorAll(".chip").forEach((item) => item.classList.toggle("active", item === button));
  render();
});

search.addEventListener("input", render);
render();
