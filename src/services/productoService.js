const API_URL='http://localhost:3000/productos'


async function getNextProductoId(){
    try{
        const response = await fetch(API_URL)
        if(!response.ok){
            throw new Error('No se puede obtener los productos para calcular la proxima Id')

        }
        const productos = await response.json();
        let maxId=0;
        productos.forEach(p =>{
            const currentId=parseInt(p.id)

            if (!isNaN(currentId)) {
                maxId = Math.max(maxId, currentId);
            }
        })
        return (maxId + 1).toString();

    }catch(error){
        console.error('Error al calcular el ID:', error);
        return Date.now().toString();
    }
}



export async function addProducto(nuevoProducto) {

    const newId = await getNextProductoId()

    const productoConId = {
        id: newId,
        ...nuevoProducto 
    }
    try{
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            header: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(productoConId)

        })
        return respuesta.ok
    }catch(error){
        console.error('Se ha producido un error de conexion mientras se añadía el producto: ', error)
        return false
    }
}