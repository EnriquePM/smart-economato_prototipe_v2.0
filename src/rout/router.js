import { inicializar as inicializarAlmacen } from '../controllers/almacenController.js';
import { inicializarProducto } from '../controllers/productoController.js';

const routes = {
    
    'economato': {
        html: '../../templates/economato.html', 
        controller: inicializarAlmacen
    },
    'productos': {
        html: '../../templates/productos.html',
        controller: inicializarProducto
    },
    'recepcion':{
        html:'../../templates/recepcion.html',
        controller: null
    }

};



async function cargarContenido(pagina) {
    const route = routes[pagina];
    const mainContainer = document.querySelector('.main');

    if (!mainContainer) {
        console.error("El contenedor '.main' no se encontró. No se puede cargar el contenido.");
        return;
    }

    if (route) {
        try {
            //Obtener e insertar el HTML
            const response = await fetch(route.html);
            if (!response.ok) throw new Error(`Status ${response.status}`);
            const content = await response.text();
            
            mainContainer.innerHTML = content;

            //Ejecutar el Controlador (Esto ejecuta el 'await getProducto()' y llena la tabla)
            if (route.controller) {
                route.controller();
            }
            
        } catch (error) {
            console.error(`Error al cargar la página o iniciar el controlador para ${pagina}:`, error);
            mainContainer.innerHTML = `<h2>Error al cargar el contenido. Verifique el servidor y las rutas.</h2>`;
        }
    } else {
        console.warn(`Página no definida: ${pagina}`);
        mainContainer.innerHTML = `<h1>Página "${pagina}" no encontrada</h1>`;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    //Configurar los eventos de navegación
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            cargarContenido(page);
        });
    });

    //Cargar la página inicial (Economato) por defecto
    cargarContenido('economato'); 
});