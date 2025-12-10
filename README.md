# Smart Economato (Prototipo v2.0)

## 🔎 Descripción

Smart Economato es una aplicación web tipo SPA (Single Page Application) diseñada para la gestión eficiente de inventario, recepción de pedidos y administración de productos en un economato. Este prototipo permite digitalizar el control de stock sin la necesidad de depender de frameworks complejos: utiliza Web Components nativos y un sistema de enrutamiento propio para ofrecer una experiencia ligera y rápida.

## 🚀 Características Principales

- **Autenticación:** login/logout seguro con persistencia en `localStorage`.  
- **Gestión de Inventario:** visualización de productos en una tabla avanzada con ordenación, búsqueda y paginación (usando [Grid.js](https://gridjs.io/)).  
- **Recepción de Pedidos:** formulario dinámico para actualizar el stock de productos existentes.  
- **Alta de Productos:** creación de nuevas referencias con selectores dinámicos (categorías y proveedores cargados desde la API simulada).  
- **SPA:** navegación fluida sin recargas de página mediante un router personalizado basado en hashes.  

## 🛠️ Tecnologías Empleadas

- HTML5  
- CSS3 (diseño responsivo)  
- JavaScript (ES6+, módulos, `async/await`)  
- [Grid.js](https://gridjs.io/) para tablas interactivas  
- [json-server] para simular API REST — backend simulado con base de datos JSON  

## 📁 Estructura del Proyecto
├───assets
│   ├───css
│   ├───data
│   └───doc
├───src
│   ├───controllers
│   ├───rout
│   ├───services
│   ├───utils
│   └───views
└───templates

## 🚀 Puntos a destacar del código
- Router.js que centraliza las diferentes páginas juntos a su controlador
- Estructura replicable y escalable, cada función tiene su controlador, su servicio y su template.
- Control de inicio de sesión con LocalStorage, bloquea acceso sin verificación y salto de archivos.
## 🧪 Puntos a mejorar en el futuro
- Añadir roles de usuarios, creación de usuarios.
- Creación de Pedidos y comparación pedidos con recepción.
