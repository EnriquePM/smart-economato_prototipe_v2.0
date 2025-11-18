import { getCategoria, getProducto } from "../services/apiServices.js";

import {
  filtrarPorCategoria,
  buscarProducto,
  ordenarPorPrecio,
  comprobarStockMinimo,
} from "../utils/funciones.js";

import { renderizarTabla, renderizarCategoria } from "../views/economato-ui.js";

const inputBusqueda = document.querySelector("#busqueda");
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
let categoriasMostradas;

async function inicializar() {
  productos = await getProducto();
  productosMostrados = productos;
  renderizarTabla(productosMostrados);
  categoriasMostradas = await getCategoria();
  renderizarCategoria(categoriasMostradas);
  bindEvents(eventMap);
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

async function onShowAll() {
  productosMostrados = await getProducto();
  inputBusqueda.value = "";
  selectCategoria.value = "";
  renderizarTabla(productosMostrados);
}
function onFiltrar() {
  const cat = selectCategoria.value;
  productosMostrados = cat ? filtrarPorCategoria(productos, cat) : [...productos]
  renderizarTabla(productosMostrados);
}


function bindEvents(events) {
  for (const { selector, event, handler, options } of events) {
    const el = document.querySelector(selector);
    if (el) el.addEventListener(event, handler, options);
  }
}

inicializar();
