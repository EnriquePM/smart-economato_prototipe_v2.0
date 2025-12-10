import {Grid, html} from "https://unpkg.com/gridjs?module";

let gridInstance = null;



export function renderizarTabla(productos) {
    const contenedor = document.getElementById("tablaProductos"); // Asegúrate de que este ID exista en tu HTML

    if (!contenedor) return;

    // En caso de que gridInstance no se borre pero el Contenedor HTML se quede vacío, se borra
    if (gridInstance && contenedor.innerHTML === "") {
        gridInstance = null;
    }

    // Si ya existe una tabla, la actualizamos con los nuevos datos
    if (gridInstance) {
        gridInstance.updateConfig({
            data: productos
        }).forceRender();
        return;
    }

    // Si no existe, la creamos desde cero
    gridInstance = new Grid({
        data: productos,
        columns: [
            { id: 'id', name: 'ID' },
            { id: 'nombre', name: 'Nombre' },
            { 
                id: 'categoria', 
                name: 'Categoría',
                formatter: (cell) => cell?.nombre || 'Sin Cat.' // Accedemos al objeto anidado
            },
            { 
                id: 'precio', 
                name: 'Precio',
                formatter: (cell) => `${cell} €` // Formato moneda
            },
            { id: 'stock', name: 'Stock' },
            { 
                id: 'proveedor', 
                name: 'Proveedor',
                formatter: (cell) => cell?.nombre || 'Sin Prov.'
            }
        ],
        search: true, // Barra de búsqueda automática
        sort: true,   // Ordenación automática al hacer clic en cabeceras
        pagination: {
            limit: 10, // Filas por página
            summary: true // Muestra "1 a 10 de 50 resultados"
        },
        language: {
            'search': {
                'placeholder': 'Buscar producto...'
            },
            'pagination': {
                'previous': 'Anterior',
                'next': 'Siguiente',
                'showing': 'Mostrando',
                'results': () => 'resultados'
            }
        },
        style: { 
            table: { 
                'white-space': 'nowrap' 
            }
        }
    }).render(contenedor);
}

/*export function renderizarTabla(datos) {
  const tabla = document.querySelector("#tablaProductos tbody");
  tabla.innerHTML = "";
  if (datos.length === 0) {
    tabla.innerHTML =
      '<tr><td colspan="8" style="text-align:center;">No se encontraron productos</td></tr>';
    resumen.textContent = "";
    return;
  }


  datos.forEach((p) => {
    const fila = document.createElement("tr");
    if (p.stock < p.stockMinimo) fila.classList.add("alerta");
    fila.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.categoria.nombre}</td>
      <td>${p.precio.toFixed(2)}</td>
      <td>${p.stock}</td>
      <td>${p.stockMinimo}</td>
      <td>${p.proveedor.nombre}</td>
      <td>${p.proveedor.isla}</td>
    `;
    tabla.appendChild(fila);
  });


  const totalProductos = datos.length;
  const valorTotal = datos
    .reduce((acc, p) => acc + p.precio * p.stock, 0)
    .toFixed(2);
  resumen.textContent = `Productos mostrados: ${totalProductos} | Valor total del stock: ${valorTotal} €`;
}*/

export function renderizarCategoria(datos){
  const selector= document.querySelector("#categoriaSelect")
  selector.innerHTML="";
  
  const opcionDefault= document.createElement("option")
  opcionDefault.value=""
  opcionDefault.textContent="-- Categoria --"
  selector.appendChild(opcionDefault)

  datos.forEach((c) =>{
    const sel=document.createElement("option");
    sel.value=c.nombre
    sel.textContent=c.nombre
    selector.appendChild(sel);
  })
  }



