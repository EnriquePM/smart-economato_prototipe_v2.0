import { addProducto } from "../services/productoService";

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
        precioUnidad: document.getElementById('precioU').value,
        stock: document.getElementById('stock').value,
        stockMinimo: document.getElementById('stockMinimo').value,
        categoriaId: document.getElementById('categoriaId').value,
        provedoriId : document.getElementById('proveedorId').value,
        unidad: document.getElementById('unidadM').value,
        marca: document.getElementById('marca').value,
        codigoBarras: document.getElementById('codugoBarras').value,
        fechaCaducidad: document.getElementById('fechaCaducidad').value,
        alergenos: document.getElementById('alergenos').values,
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