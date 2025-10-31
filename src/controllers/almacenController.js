//import { productos } from "../services/apiServices.js";
import {
  filtrarPorCategoria,
  buscarProducto,
  ordenarPorPrecio,
  comprobarStockMinimo,
} from "../utils/funciones.js";

import {
  getCategoria,
  getProveedores,
  getProductos,
} from "../services/apiServices.js";

import { renderizarTabla } from "../views/economato-ui.js";

import { categorias } from "../models/categoria.js";
import { proveedor } from "../models/proveedor.js";

const inputBusqueda = document.querySelector("#busqueda");
const btnBuscar = document.querySelector("#btnBuscar");
const btnStock = document.querySelector("#btnStock");
const btnMostrarTodos = document.querySelector("#btnMostrarTodos");
const selectCategoria = document.querySelector("#categoriaSelect");
const selectOrden = document.querySelector("#ordenSelect");

const eventMap = [
  { selector: "#btnBuscar", event: "click", handler: onBuscar },
  { selector: "#ordenSelect", event: "change", handler: onOrdenar },
  { selector: "#btnMostrarTodos", event: "click", handler: onShowAll },
  { selector: "#categoriaSelect", event: "change", handler: onFiltrar },
];
let productos;
let productosMostrados;


async function inicializar() {
  let categorias = crearCategoria()
  console.log(categorias)
  let proveedores = await getProveedores();
  let productos = await getProductos();
  let productosMostrados = [...productos];

  productos = productos.map((p) => ({
    id: p.id,
    categorias: categorias.find((c) => c.id === p.categoriaId) || {
      nombre: "Sin categoría",
    },
    proveedor: proveedor.find((pe) => pe.id === p.proveedorId) || {
      nombre: "Sin proveedor",
    },
  }));

  renderizarTabla(productosMostrados);
  bindEvents(eventMap);
}

async function crearCategoria(){
  let categoriasCrudas = await getCategoria()

  let categoriasModeladas = categoriasCrudas.map(p => {
    return new categorias(p.id,p.nombre,p.descripcion)
  })

  console.log(categoriasModeladas)

  return categoriasModeladas
}

function onBuscar() {
  const termino = inputBusqueda.value.trim();
  productosMostrados = buscarProducto(productos, termino);
  renderizarTabla(productosMostrados);
}

function onOrdenar() {
  const orden = selectOrden.value;
  productosMostrados = ordenarPorPrecio(productos, orden);
  renderizarTabla(productosMostrados);
}

function onShowAll() {
  productosMostrados = [...productos];
  inputBusqueda.value = "";
  selectCategoria.value = "";
  renderizarTabla(productosMostrados);
}
function onFiltrar() {
  const cat = selectCategoria.value;
  productosMostrados = filtrarPorCategoria(productos, cat);
  renderizarTabla(productosMostrados);
}

function bindEvents(events) {
  for (const { selector, event, handler, options } of events) {
    const el = document.querySelector(selector);
    if (el) el.addEventListener(event, handler, options);
  }
}

inicializar();
