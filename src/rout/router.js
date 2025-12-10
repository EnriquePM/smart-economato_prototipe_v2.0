import { inicializar as inicializarAlmacen } from '../controllers/almacenController.js';
import { inicializarProducto } from '../controllers/productoController.js';
import { inicializar } from '../controllers/recepcionController.js';
import { isAuthenticated, logout } from '../services/authService.js';

//Añadimos aqui las diferentes rutas de las pantallas así como sus controladores
const routes = {
    'economato': {
        html: 'templates/economato.html', 
        controller: inicializarAlmacen
    },
    'productos': {
        html: 'templates/productos.html',
        controller: inicializarProducto
    },
    'recepcion': {
        html: 'templates/recepcion.html',
        controller: inicializar
    }
};

export async function router() {
    //Verificamos si el usuario está autenticado
    const estaLogueado = isAuthenticated();

    if (!estaLogueado) {
        console.warn("Acceso denegado. Redirigiendo a la página de Login...");
        window.location.href = 'login.html';
        return; 
    }

    
    let hash = window.location.hash.slice(1) || 'economato';
    console.log("Navegando a sección:", hash);
    if (hash === 'logout') {
        logout();
        window.location.href = 'login.html';
        return;
    }

    
    const nav = document.getElementById('nav');
    if (nav) {
        nav.style.display = 'flex'; 
    }
// Obtener el contenedor principal donde se cargan las vistas
    const route = routes[hash];
    const mainContainer = document.querySelector('.main');

    if (!mainContainer) return;
// Cargar la vista correspondiente
    if (route) {
        try {
            const response = await fetch(route.html);
            if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
            const content = await response.text();
            
            mainContainer.innerHTML = content;

            if (route.controller && typeof route.controller === 'function') {
                await route.controller();
            }
// Manejo de errores de carga
        } catch (error) {
            console.error(`Error cargando vista ${hash}:`, error);
            mainContainer.innerHTML = `<h2 class="error-msg">Error al cargar la sección.</h2>`;
        }
    } else {
        window.location.hash = 'economato';
    }
}

// Eventos para cargar la ruta adecuada al iniciar y al cambiar el hash
window.addEventListener('load', router);
window.addEventListener('hashchange', router);