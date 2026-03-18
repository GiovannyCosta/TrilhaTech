const btn = document.getElementById("topBtn");
let isScrolling = false;

window.addEventListener("scroll", () => {
  // Se já houver uma execução em andamento, aborta
  if (isScrolling) return;
  isScrolling = true;

  // Aguarda 150ms antes de rodar a função para evitar um loop
  setTimeout(() => {
    if (window.scrollY > 300) {
      // Mostra o botão
      btn.style.display = "flex";
    } else {
      btn.style.display = "none";
    }
    isScrolling = false;
  }, 150);
});

function toUP() {
  // Faz o scroll suave
  window.scrollTo({ top: 0, behavior: "smooth" });
}
