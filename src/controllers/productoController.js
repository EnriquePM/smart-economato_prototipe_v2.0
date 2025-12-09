import { addProducto } from "../services/productoService.js";
import { getCategoria, getProducto, getProveedor} from "../services/apiServices.js";

let listaCategorias = [];
let listaProveedores = [];

async function cargarSelects(){
    const selectCategoria = document.getElementById("categoriaId");
    const selectProveedor = document.getElementById("proveedorId");

    listaCategorias = await getCategoria();
    listaProveedores = await getProveedor();

    selectCategoria.innerHTML="";
    selectProveedor.innerHTML="";

    selectCategoria.innerHTML += '<option value="">-- Selecciona Categoría --</option>';
    selectProveedor.innerHTML += '<option value="">-- Selecciona Proveedor --</option>';

    listaCategorias.forEach(c=>{
        const option =document.createElement('option');
        option.value = c.id;
        option.textContent=c.nombre;
        selectCategoria.appendChild(option);
    })

    listaProveedores.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id; 
        option.textContent = p.nombre;
        selectProveedor.appendChild(option);
        });

}


export async function inicializarProducto(){

    await cargarSelects();

    const formulario = document.getElementById('login-form-productos')

    if(formulario){
        formulario.removeEventListener('submit', onProductoSubmit)
        formulario.addEventListener('submit', onProductoSubmit)
    }else{
        console.error("El formulario con ID 'login-form-productos' no se encontró.")
    }

    async function onProductoSubmit(e){
        e.preventDefault()

        const catIdSeleccionada = document.getElementById('categoriaId').value;
        const provIdSeleccionado = document.getElementById('proveedorId').value;

        const objetoCategoria = listaCategorias.find(c => c.id == catIdSeleccionada);
        const objetoProveedor = listaProveedores.find(p => p.id == provIdSeleccionado);

        const nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        precio: parseInt(document.getElementById('precio').value),
        precioUnitario: document.getElementById('precioU').value,
        stock: parseInt(document.getElementById('stock').value),
        stockMinimo: parseInt(document.getElementById('stockMinimo').value),
        categoriaId: parseInt(catIdSeleccionada),
        proveedorId: parseInt(provIdSeleccionado),
        unidunidadMedida: document.getElementById('unidadM').value,
        marca: document.getElementById('marca').value,
        codigoBarras: document.getElementById('codigoBarras').value,
        fechaCaducidad: document.getElementById('fechaCaducidad').value,
        alergenos: document.getElementById('alergenos').value.split(',').map(s => s.trim()).filter(s => s !== ''),
        descripcion: document.getElementById('descripcion').value,
        activo: document.getElementById('activo').value === 'true',
        categoria: {
            id: objetoCategoria ? parseInt(objetoCategoria.id) : catIdSeleccionada,
            nombre: objetoCategoria ? objetoCategoria.nombre : "Sin Categoría"
        },
        proveedor: {
            id: objetoProveedor ? parseInt(objetoProveedor.id) : provIdSeleccionado,
            nombre: objetoProveedor ? objetoProveedor.nombre : "Sin Proveedor"
        }
    }

    const exito = await addProducto(nuevoProducto);
    if (exito) {
        alert('Producto añadido correctamente.');
        formulario.reset();
    } else {
        alert('Error al añadir el producto. Revisa la consola.');
    }
    }
}
