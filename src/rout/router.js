import { inicializar as inicializarAlmacen } from '../controllers/almacenController.js';
import { inicializarProducto } from '../controllers/productoController.js';
import { inicializar } from '../controllers/recepcionController.js';
import { inicializar as inicializarLogin } from '../controllers/loginController.js';
import { isAuthenticated, logout } from '../services/authService.js';


const routes = {
    'login': {
        html: './login.html',
        controller: inicializarLogin
    },
    'economato': {
        html: './economato.html', 
        controller: inicializarAlmacen
    },
    'productos': {
        html: './productos.html',
        controller: inicializarProducto
    },
    'recepcion':{
        html:'./recepcion.html',
        controller: inicializar
    }

};

async function cargarContenido(pagina) {
    // Seguridad del Login
    const estaLogueado = isAuthenticated();
    //No está logueado e intentar acceder al contenido
    if (!estaLogueado && pagina !== 'login') {
        console.warn("Usuario no autenticado. Redirigiendo a Login...");
        pagina = 'login'; 
        window.location.hash = '#login';
    }
    //Está logueado e intenta acceder al login
    else if (estaLogueado && pagina === 'login') {
        pagina = 'economato';
        window.location.hash = '#economato';
    }
        const nav = document.getElementById('nav');
    //Gestión de la Navbar en función del login
    if (nav) {
        nav.style.display = estaLogueado ? '' : 'none'; 
    }

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
            if (page === 'logout'){
                logout();
                window.location.hash="#login";
                window.location.reload();
                return;
            }
            cargarContenido(page);
        });
    });

    //Cargar la página inicial (Economato) por defecto
    cargarContenido('economato'); 
});

