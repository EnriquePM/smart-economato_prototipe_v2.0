import { getCategoria, getProducto } from "../services/apiServices.js";

import {
  filtrarPorCategoria,
  buscarProducto,
  ordenarPorPrecio,
} from "../utils/funciones.js"; 

import { renderizarTabla, renderizarCategoria } from "../views/economato-ui.js";

// Declaración global de variables (SIN ASIGNACIÓN DOM, ¡para evitar el TypeError!)
let inputBusqueda;
let selectCategoria;
let selectOrden;
let resumen; // Asumiendo que usas esta para el <tfoot>

const eventMap = [
  { selector: "#btnBuscar", event: "click", handler: onBuscar },
  { selector: "#ordenSelect", event: "change", handler: onOrdenar },
  { selector: "#btnMostrarTodos", event: "click", handler: onShowAll },
  { selector: "#categoriaSelect", event: "change", handler: onFiltrar },
];

let productos = []; 
let categoriasMostradas;


// 🚀 EXPORTADA: Llamada por router.js después de cargar el HTML.
export async function inicializar() {
    // 1. ASIGNACIÓN DOM: ¡Se hace aquí, ya que el HTML ya está cargado!
    inputBusqueda = document.querySelector("#busqueda");
    selectCategoria = document.querySelector("#categoriaSelect");
    selectOrden = document.querySelector("#ordenSelect");
    resumen = document.querySelector("#resumen"); // Asume que el ID está en economato.html

    try {
        // 2. Carga inicial de datos de la API (Asíncrono)
        productos = await getProducto();
        categoriasMostradas = await getCategoria();

        // 3. Renderizar y aplicar lógica
        renderizarCategoria(categoriasMostradas);
        aplicarFiltrosYOrden();
        
        // 4. Vincular Eventos
        bindEvents(eventMap);
    } catch (error) {
        console.error("Error al inicializar el controlador de almacén:", error);
        if (resumen) resumen.textContent = "Error al cargar datos de la API.";
    }
}


// --- Lógica de Filtrado/Ordenado ---

function aplicarFiltrosYOrden() {
    // Esta función asume que los selectores (inputBusqueda, etc.) ya fueron asignados en inicializar()
    let resultado = [...productos]; 

    // 1. APLICAR FILTRADO POR CATEGORÍA
    const categoriaSeleccionada = selectCategoria.value;
    if (categoriaSeleccionada) {
        resultado = filtrarPorCategoria(resultado, categoriaSeleccionada);
    }
    
    // 2. APLICAR BÚSQUEDA
    const terminoBusqueda = inputBusqueda.value.trim();
    if (terminoBusqueda) {
        resultado = buscarProducto(resultado, terminoBusqueda);
    }

    // 3. APLICAR ORDENAMIENTO
    const orden = selectOrden.value;
    resultado = ordenarPorPrecio(resultado, orden); 

    // 4. RENDERIZAR
    renderizarTabla(resultado);
}


// --- Handlers de Eventos ---

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
    // Resetear todos los controles
    if (inputBusqueda) inputBusqueda.value = "";
    if (selectCategoria) selectCategoria.value = "";
    if (selectOrden) selectOrden.value = "asc"; 

    aplicarFiltrosYOrden();
}


// --- Utilidades ---

function bindEvents(events) {
  for (const { selector, event, handler, options } of events) {
    const el = document.querySelector(selector);
    if (el) el.addEventListener(event, handler, options);
  }
}