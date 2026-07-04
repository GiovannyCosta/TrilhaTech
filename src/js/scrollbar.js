document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("topBtn");
  if (!btn) return;

  let isScrolling = false;

  window.addEventListener("scroll", () => {
    if (isScrolling) return;
    isScrolling = true;

    window.setTimeout(() => {
      btn.style.display = window.scrollY > 300 ? "flex" : "none";
      isScrolling = false;
    }, 120);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
