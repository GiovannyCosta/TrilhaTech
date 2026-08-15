const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");

test("todas as páginas principais existem e usam o sistema compartilhado", () => {
  ["index.html", "comece-aqui.html", "carreiras.html", "glossario.html", "roadmaps.html", "sobre.html"].forEach((file) => {
    const content = fs.readFileSync(path.join(root, file), "utf8");
    assert.match(content, /src\/css\/site\.css/);
    assert.match(content, /src\/js\/site\.js/);
    assert.match(content, /data-site-header/);
    assert.match(content, /data-site-footer/);
  });
});

test("o catálogo contempla carreiras além da programação", () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, "src/js/data.js"), "utf8"), context);
  const careers = context.window.TRILHA_DATA.careers;
  assert.ok(careers.length >= 12);
  ["Qualidade", "Segurança", "Dados", "Design", "Infraestrutura", "Negócios"].forEach((area) => {
    assert.ok(careers.some((career) => career.area === area), `Área ausente: ${area}`);
  });
});

test("glossário possui conteúdo introdutório suficiente e sem termos duplicados", () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, "src/js/data.js"), "utf8"), context);
  const terms = context.window.TRILHA_DATA.terms;
  const names = terms.map(([name]) => name.toLowerCase());
  assert.ok(terms.length >= 30);
  assert.equal(new Set(names).size, names.length);
});

test("a identidade original permanece integrada ao layout modular", () => {
  const shell = fs.readFileSync(path.join(root, "src/js/site.js"), "utf8");
  const home = fs.readFileSync(path.join(root, "index.html"), "utf8");

  ["src/icons/icon-box.png", "src/img/logo-trilha-black.png", "src/img/arghata.png"].forEach((asset) => {
    assert.ok(fs.existsSync(path.join(root, asset)), `Recurso ausente: ${asset}`);
  });
  assert.match(shell, /class="color-strip"/);
  assert.match(shell, /class="top-button"/);
  assert.match(shell, /Made by Arghata/);
  assert.match(home, /src\/img\/TrilhaTech\.png/);
});

test("os cards da equipe preservam stacks e apontam para os Instagrams", () => {
  const about = fs.readFileSync(path.join(root, "sobre.html"), "utf8");
  [
    "https://www.instagram.com/gio.env/",
    "https://www.instagram.com/nelsonn.dev/",
    "https://www.instagram.com/eduardo_maaia/",
  ].forEach((url) => assert.match(about, new RegExp(url.replaceAll(".", "\\."))));
  ["HTML", "CSS", "JS", "React", "Python"].forEach((stack) => {
    assert.match(about, new RegExp(`>${stack}<`));
  });
});
