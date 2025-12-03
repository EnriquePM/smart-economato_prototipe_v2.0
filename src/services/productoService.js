const API_URL='http://localhost:3000'

/* Método que devuelve todos los productos*/ 
export async function getProducto() {
  try {
    const response = await fetch(`${API_URL}/productos`);
    if (!response.ok) throw new Error("No se pudo obtener el producto");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

/* Método para añadir productos */
export async function addStock(productoId){
    try{
        const url = `${API_URL}/${productoId}`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                stock: nuevoStock
            })
        })

    }catch(error){
        console.error(`Error al actualizar el stock de la ID ${productoId}:`,error)

    }
}


/* Método para calcular la proxima ID del rpoducto*/ 
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