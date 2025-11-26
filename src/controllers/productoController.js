import { addProducto } from "../services/productoService.js";

export async function inicializarProducto(){

    const formulario = document.getElementById('login-form-productos')

    if(formulario){
        formulario.addEventListener('submit',onProductoSubmit)
    }else{
        console.error("El formulario con ID 'login-form-productos' no se encontró.")
    }

    async function onProductoSubmit(e){
        e.preventDefault()
        const nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        precioUnitario: document.getElementById('precioU').value,
        stock: document.getElementById('stock').value,
        stockMinimo: document.getElementById('stockMinimo').value,
        categoriaId: document.getElementById('categoriaId').value,
        proveedorId : document.getElementById('proveedorId').value,
        unidunidadMedida: document.getElementById('unidadM').value,
        marca: document.getElementById('marca').value,
        codigoBarras: document.getElementById('codigoBarras').value,
        fechaCaducidad: document.getElementById('fechaCaducidad').value,
        alergenos: document.getElementById('alergenos').value.split(',').map(s => s.trim()).filter(s => s !== ''),
        descripcion: document.getElementById('descripcion').value,
        activo: document.getElementById('activo').value
    }

    const exito = await addProducto(nuevoProducto);
    if (exito) {
        alert('Producto añadido correctamente.');
        this.reset();
    } else {
        alert('Error al añadir el producto. Revisa la consola.');
    }
    }
}
