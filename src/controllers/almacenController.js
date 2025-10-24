import { productos } from "../models/producto.js";
import { filtrarPorCategoria, buscarProductos } from "../utils/funciones.js";
import { renderizarTabla } from "../views/ui.js";

const controles = document.querySelector("#controles");
const inputBusqueda = document.querySelector("#busqueda");
const selectCategoria = document.querySelector("#categoriaSelect");
const selectOrden = document.querySelector("#ordenSelect");

controles.addEventListener("click", (e) => {
  const id = e.target.id;
  switch (id) {
    case "btnBuscar":
      manejarBusqueda();
      break;
    case "btnFiltrarCategoria":
      manejarFiltro();
      break;
    case "btnOrdenar":
      manejarOrden();
      break;
    case "btnStock":
      manejarStock();
      break;
    case "btnMostrarTodos":
      manejarMostrarTodos();
      break;
  }
});
