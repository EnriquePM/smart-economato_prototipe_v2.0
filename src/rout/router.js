document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav a");
  const main = document.querySelector(".main");


  // Cargar contenido dinámicamente
  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();

      const page = e.target.dataset.page;

      // Cambiar estado activo del menú
      links.forEach(l => l.classList.remove("active"));
      e.target.classList.add("active");

      try {
        const response = await fetch(`${page}.html`);
        if (!response.ok) throw new Error("Página no encontrada");

        const html = await response.text();
        main.innerHTML = html;

        
      } catch (error) {
        main.innerHTML = `<p style='color:red'>${error.message}</p>`;
      }
    });
  });
  if (links.length > 0) {
    links[0].click();
  }
});
