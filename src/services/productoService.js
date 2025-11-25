const formulario = document.getElementById('login-form-productos');

const API_URL = 'http://localhost:3000/productos'

export async function addProducto() {
    

formulario.addEventListener('submit',async(e)=>{
    e.preventDefault();

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
    };

    try{
        const respuesta= await fetch(API_URL,{method: 'POST',
        headers: {
            'Content-Type': 'aplication/json'
        },
        body: JSON.stringify(nuevoProducto)
    
        });
        if(repuesta.ok){
            alert('Producto añadido')
            formulario.reset();
        }else{
            console.error('No se ha podido añadir');
        }
    }
    catch(error) {
        console.error('Error de red:', error);
    }
})
}