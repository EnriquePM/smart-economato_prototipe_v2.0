const API_URL='http://localhost:3000/productos'

export async function addProducto(nuevoProducto) {
    try{
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            header: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)

        })
        return respuesta.ok
    }catch(error){
        console.error('Se ha producido un error de conexion mientras se añadía el producto: ', error)
        return false
    }
}