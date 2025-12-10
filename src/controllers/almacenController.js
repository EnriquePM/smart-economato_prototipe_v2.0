import { getProducto } from "../services/productoService.js";
import { renderizarTabla } from "../views/economato-ui.js";

// Exportamos la función inicializar para que se cargue desde el router.js
export async function inicializar() {
    try {
        //Obtener datos de la API
        const productosDesordenados = await getProducto();

        const productos = productosDesordenados.map(p=>({
            ...p,
            id:Number(p.id),
            precio: Number(p.precio),
            stock: Number(p.stock)
        }));


        //Renderizar la tabla con Grid.js
        renderizarTabla(productos);


    } catch (error) {
        console.error("Error al inicializar el almacén:", error);
        const contenedor = document.getElementById("tabla-productos");
        if (contenedor) {
            contenedor.innerHTML = `<div class="p-4 text-red-600">Error al cargar datos: ${error.message}</div>`;
        }
    }
}


/*



*/