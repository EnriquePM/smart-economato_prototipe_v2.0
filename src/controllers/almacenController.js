import { getCategoria, getProducto } from "../services/apiServices.js";

import {
  filtrarPorCategoria,
  buscarProducto,
  ordenarPorPrecio,
} from "../utils/funciones.js"; 

import { renderizarTabla, renderizarCategoria } from "../views/economato-ui.js";

//Variables sin inicializar 
let inputBusqueda;
let selectCategoria;
let selectOrden;
let resumen;

//Mapa con todos los eventos
const eventMap = [
  { selector: "#btnBuscar", event: "click", handler: onBuscar },
  { selector: "#ordenSelect", event: "change", handler: onOrdenar },
  { selector: "#btnMostrarTodos", event: "click", handler: onShowAll },
  { selector: "#categoriaSelect", event: "change", handler: onFiltrar },
];

let productos = []; 
let categoriasMostradas;

//Exportamos la función inicializar para que se cargue desde el router.js
export async function inicializar() {
    inputBusqueda = document.querySelector("#busqueda");
    selectCategoria = document.querySelector("#categoriaSelect");
    selectOrden = document.querySelector("#ordenSelect");
    resumen = document.querySelector("#resumen"); 

    try {
        //Cargamos los datos del API en productos y en categorias 
        productos = await getProducto();
        categoriasMostradas = await getCategoria();
        //Cargamos las categorías y cargamos los eventos
        renderizarCategoria(categoriasMostradas);
        aplicarFiltrosYOrden();
        
        bindEvents(eventMap);
    } catch (error) {
        console.error("Error al inicializar el controlador de almacén:", error);
        if (resumen) resumen.textContent = "Error al cargar datos de la API.";
    }
}


//Función que cargará los eventos 
function aplicarFiltrosYOrden() {
    let resultado = [...productos]; 

    const categoriaSeleccionada = selectCategoria.value;
    if (categoriaSeleccionada) {
        resultado = filtrarPorCategoria(resultado, categoriaSeleccionada);
    }
    
    const terminoBusqueda = inputBusqueda.value.trim();
    if (terminoBusqueda) {
        resultado = buscarProducto(resultado, terminoBusqueda);
    }

    const orden = selectOrden.value;
    resultado = ordenarPorPrecio(resultado, orden); 

    renderizarTabla(resultado);
}



function onBuscar() {
    aplicarFiltrosYOrden();
}

function onOrdenar() {
    aplicarFiltrosYOrden();
}

function onFiltrar() {
    aplicarFiltrosYOrden();
}

async function onShowAll() {
    if (inputBusqueda) inputBusqueda.value = "";
    if (selectCategoria) selectCategoria.value = "";
    if (selectOrden) selectOrden.value = "asc"; 

    aplicarFiltrosYOrden();
}



function bindEvents(events) {
  for (const { selector, event, handler, options } of events) {
    const el = document.querySelector(selector);
    if (el) el.addEventListener(event, handler, options);
  }
}