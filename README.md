Smart Economato (Prototipo v2.0)

Bienvenido al repositorio de Smart Economato, una aplicación web tipo SPA (Single Page Application) diseñada para la gestión eficiente de inventario, recepción de pedidos y administración de productos en un economato.

Este proyecto ha sido desarrollado por el Grupo Hopper.

📋 Descripción

Smart Economato es una solución web ligera que permite digitalizar el control de stock sin la complejidad de grandes frameworks. Utiliza una arquitectura basada en Componentes Web Nativos (HTML/JS estándar) y un sistema de enrutamiento propio para ofrecer una experiencia de usuario fluida y rápida.

Funcionalidades Principales

Autenticación: Sistema de Login/Logout seguro con persistencia en localStorage.

Gestión de Inventario: Visualización de productos en una tabla avanzada (ordenación, búsqueda y paginación) implementada con Grid.js.

Recepción de Pedidos: Formulario dinámico para actualizar el stock de productos existentes.

Alta de Productos: Creación de nuevas referencias con selectores dinámicos (categorías y proveedores cargados desde API).

SPA (Single Page Application): Navegación fluida sin recargas de página mediante un Router personalizado basado en Hashes.

🛠️ Tecnologías Empleadas

El proyecto está construido utilizando estándares web modernos:

HTML5: Estructura semántica.

CSS3: Estilos personalizados y diseño responsivo.

JavaScript (ES6+): Lógica del cliente, uso de Módulos (ES Modules) y async/await.

Grid.js: Librería para el renderizado de tablas avanzadas.

JSON-Server: Simulación de API REST para el Backend (Base de datos local en JSON).

🚀 Instalación y Uso

Para ejecutar este proyecto en tu máquina local, necesitas tener instalado Node.js.

1. Clonar el repositorio

git clone [https://github.com/EnriquePM/smart-economato_prototipe_v2.0.git](https://github.com/EnriquePM/smart-economato_prototipe_v2.0.git)
cd smart-economato_prototipe_v2.0


2. Configurar la Base de Datos (API Simulada)

El proyecto utiliza json-server para simular el backend. Si no tienes un archivo db.json, crea uno o localiza la carpeta de datos.

Instala json-server globalmente (si no lo tienes):

npm install -g json-server


Ejecuta el servidor (asegúrate de apuntar a la ruta correcta de tu base de datos, por ejemplo src/data/db.json):

json-server --watch src/data/db.json --port 3000


Nota: La API estará disponible en http://localhost:3000.

3. Ejecutar el Frontend

Dado que el proyecto utiliza Módulos de ES6 (type="module"), no puedes abrir los archivos HTML directamente (doble clic) debido a las políticas de seguridad CORS de los navegadores.

Debes usar un servidor local. Recomendamos la extensión Live Server de Visual Studio Code:

Abre el proyecto en VS Code.

Haz clic derecho en login.html (o main.html).

Selecciona "Open with Live Server".

📂 Estructura del Proyecto

smart-economato/
├── login.html # Página de autenticación
├── main.html # Estructura principal de la aplicación
├── README.md # Este archivo
│
├── assets/
│ ├── css/
│ │ ├── index.css # Estilos generales y login
│ │ ├── recepcion.css # Estilos del módulo de recepción
│ │ └── tabla.css # Personalización de Grid.js
│ ├── data/
│ │ └── economato-db.json # Base de datos JSON
│ └── doc/
│ └── API.txt # Documentación de API
│
├── src/
│ ├── controllers/ # Lógica de la aplicación
│ │ ├── almacenController.js
│ │ ├── loginController.js
│ │ ├── productoController.js
│ │ └── recepcionController.js
│ ├── models/ # Definición de clases de datos
│ │ ├── categoria.js
│ │ ├── producto.js
│ │ └── proveedor.js
│ ├── services/ # Servicios API y autenticación
│ │ ├── apiServices.js
│ │ ├── authService.js
│ │ └── productoService.js
│ ├── views/ # Componentes de interfaz
│ │ ├── economato-ui.js
│ │ └── login-ui.js
│ ├── utils/ # Funciones auxiliares
│ │ ├── funciones.js
│ │ └── include.js
│ └── rout/
│ └── router.js # Sistema de enrutamiento SPA
│
└── templates/ # Plantillas HTML dinámicas
├── economato.html
├── productos.html
└── recepcion.html


👥 Autores

Grupo Hopper - Desarrollo y Documentación
