// controllers/recepcionController.js

import { getProducto, addStock } from '../services/productoService.js';

// Variables globales
let listaProductos = [];
let contenedor;
let botonAdd;
let formularioPrincipal;

export async function inicializar() {
    try {
        contenedor = document.getElementById('productos-container');
        botonAdd = document.getElementById('nuevoProductoBtn');
        formularioPrincipal = document.getElementById('form-recepcion');

        if (!contenedor || !formularioPrincipal) return;

        // Cargar datos
        listaProductos = await getProducto();

        // Eventos
        botonAdd.addEventListener('click', (e) => {
            e.preventDefault();
            crearYAgregarFila();
        });

        formularioPrincipal.addEventListener('submit', onRecepcionSubmit);

        // Limpiar e iniciar
        contenedor.innerHTML = ''; 
        crearYAgregarFila();

    } catch (error) {
        console.error("Error inicializando:", error);
        mostrarNotificacion("Error al conectar con el servidor.", "error");
    }
}
/* Función para las notis */
function mostrarNotificacion(mensaje, tipo) {
    if (!alertaDiv) return;

    // Limpiar timeout por si exista, así evitamos que la nueva alerta salga mal
    if (alertaTimeout) clearTimeout(alertaTimeout);

    alertaDiv.textContent = mensaje;
    alertaDiv.style.display = 'block';

    // Asignar clase para el estilo (colores)
    if (tipo === 'exito') {
        alertaDiv.className = 'alerta-exito';
    } else {
        alertaDiv.className = 'alerta-error';
    }

    // Ocultar automáticamente después de 4 segundos
    alertaTimeout = setTimeout(() => {
        alertaDiv.style.display = 'none';
        alertaDiv.className = '';
    }, 2000);
}

/*Crear cada parte del formulario*/
function crearYAgregarFila() {
    // 1. Crear el contenedor principal de la fila
    const filaDiv = document.createElement('div');
    filaDiv.className = 'producto-recepcion'; 

    // 2. Crear el contenedor interno (para aplicar Grid o Flex en tu CSS)
    const layoutDiv = document.createElement('div');
    layoutDiv.className = 'productoStock-recepcion'; 

    // --- BLOQUE 1: CÓDIGO DE BARRAS ---
    const divBarras = document.createElement('div');
    divBarras.className = 'grupo-form'; 

    const labelBarras = document.createElement('label');
    labelBarras.className = 'label-recepcion';
    labelBarras.textContent = 'Cód. Barras';
    
    const inputBarras = document.createElement('input');
    inputBarras.type = 'text';
    inputBarras.className = 'codigo-barras-input input-recepcion';
    inputBarras.placeholder = 'Escanear...';

    divBarras.appendChild(labelBarras);
    divBarras.appendChild(inputBarras);

    // --- BLOQUE 2: SELECT DE PRODUCTO ---
    const divSelect = document.createElement('div');
    divSelect.className = 'grupo-form';

    const labelSelect = document.createElement('label');
    labelSelect.className = 'label-recepcion';
    labelSelect.textContent = 'Producto';

    const select = document.createElement('select');
    select.className = 'producto-select-busqueda input-recepcion select-recepcion';
    select.required = true;
    
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "-- Seleccionar --";
    select.appendChild(defaultOption);

    const fragment = document.createDocumentFragment();
    listaProductos.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.nombre;
        fragment.appendChild(opt);
    });
    select.appendChild(fragment);

    const inputId = document.createElement('input');
    inputId.type = 'hidden';
    inputId.className = 'producto-id-input';

    divSelect.appendChild(labelSelect);
    divSelect.appendChild(select);
    divSelect.appendChild(inputId);

    // --- BLOQUE 3: PRECIO (Solo lectura) ---
    const divPrecio = document.createElement('div');
    divPrecio.className = 'grupo-form';

    const labelPrecio = document.createElement('label');
    labelPrecio.className = 'label-recepcion';
    labelPrecio.textContent = 'Precio';

    const inputPrecio = document.createElement('input');
    inputPrecio.type = 'text';
    inputPrecio.className = 'precio-unidad-input input-recepcion input-readonly';
    inputPrecio.readOnly = true;
    inputPrecio.tabIndex = -1;

    divPrecio.appendChild(labelPrecio);
    divPrecio.appendChild(inputPrecio);

    // --- BLOQUE 4: UNIDAD (Solo lectura) ---
    const divUnidad = document.createElement('div');
    divUnidad.className = 'grupo-form';

    const labelUnidad = document.createElement('label');
    labelUnidad.className = 'label-recepcion';
    labelUnidad.textContent = 'Unidad';

    const inputUnidad = document.createElement('input');
    inputUnidad.type = 'text';
    inputUnidad.className = 'unidad-medida-input input-recepcion input-readonly';
    inputUnidad.readOnly = true;
    inputUnidad.tabIndex = -1;

    divUnidad.appendChild(labelUnidad);
    divUnidad.appendChild(inputUnidad);

    // --- BLOQUE 5: CANTIDAD ---
    const divCantidad = document.createElement('div');
    divCantidad.className = 'grupo-form ancho-completo'; 

    const labelCantidad = document.createElement('label');
    labelCantidad.className = 'label-recepcion';
    labelCantidad.textContent = 'Cantidad';

    const inputCantidad = document.createElement('input');
    inputCantidad.type = 'number';
    inputCantidad.step = 'any';
    inputCantidad.className = 'cantidad-recibida-input input-recepcion';
    inputCantidad.required = true;
    inputCantidad.min = '0.01';

    divCantidad.appendChild(labelCantidad);
    divCantidad.appendChild(inputCantidad);

    // --- BLOQUE 6: BOTÓN ELIMINAR ---
    const divBtn = document.createElement('div');
    divBtn.className = 'contenedor-boton-eliminar'; 

    const btnEliminar = document.createElement('button');
    btnEliminar.type = 'button';
    btnEliminar.className = 'btn-eliminar-fila btn-quitar-fila'; 
    btnEliminar.textContent = 'Eliminar';

    divBtn.appendChild(btnEliminar);

    // 3. Añadir todo
    layoutDiv.appendChild(divBarras);
    layoutDiv.appendChild(divSelect);
    layoutDiv.appendChild(divPrecio);
    layoutDiv.appendChild(divUnidad);
    layoutDiv.appendChild(divCantidad);
    layoutDiv.appendChild(divBtn);

    // 4. Añadir layout a la fila
    filaDiv.appendChild(layoutDiv);

    // EVENTOS

    select.addEventListener('change', (e) => {
        onProductoSeleccionado(e.target.value, filaDiv, 'select');
    });

    inputBarras.addEventListener('change', (e) => {
        onCodigoBarrasIngresado(e.target.value, filaDiv);
    });

    inputBarras.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            inputBarras.blur();
        }
    });

    btnEliminar.addEventListener('click', () => {
        if (contenedor.children.length > 1) {
            contenedor.removeChild(filaDiv);
        } else {
            limpiarFila(filaDiv);
        }
    });

    contenedor.appendChild(filaDiv);
    inputBarras.focus();
}

// --- FUNCIONES AUXILIARES DE LÓGICA  ---

function onCodigoBarrasIngresado(codigo, filaElemento) {
    if (!codigo) return;
    const producto = listaProductos.find(p => p.codigoBarras == codigo.trim());

    if (producto) {
        onProductoSeleccionado(producto.id, filaElemento, 'input');
    } else {
        alert("Producto no encontrado.");
        limpiarFila(filaElemento);
    }
}

function onProductoSeleccionado(idProducto, filaElemento, origen) {
    const producto = listaProductos.find(p => p.id == idProducto);

    if (producto) {
        filaElemento.querySelector('.precio-unidad-input').value = producto.precio || '';
        filaElemento.querySelector('.unidad-medida-input').value = producto.unidadMedida || 'Unidad';
        filaElemento.querySelector('.producto-id-input').value = producto.id;

        if (origen === 'input') {
            filaElemento.querySelector('.producto-select-busqueda').value = producto.id;
        } else if (origen === 'select') {
            filaElemento.querySelector('.codigo-barras-input').value = producto.codigoBarras || '';
        }
        
        filaElemento.querySelector('.cantidad-recibida-input').focus();
    } else {
        limpiarFila(filaElemento);
    }
}

function limpiarFila(filaElemento) {
    filaElemento.querySelectorAll('input').forEach(i => i.value = '');
    filaElemento.querySelector('select').value = "";
}

async function onRecepcionSubmit(e) {
    e.preventDefault();

    const btnSubmit = formularioPrincipal.querySelector('button[type="submit"]');
    if (btnSubmit) btnSubmit.disabled = true;
    
    try {
        const filas = Array.from(contenedor.children);
        const actualizaciones = [];

        filas.forEach(fila => {
            const idInput = fila.querySelector('.producto-id-input');
            const cantInput = fila.querySelector('.cantidad-recibida-input');
            
            if (idInput && cantInput) {
                const id = idInput.value;
                const cantidad = parseFloat(cantInput.value);
                if (id && cantidad > 0) {
                    actualizaciones.push({ id, cantidad });
                }
            }
        });

        if (actualizaciones.length === 0) {
            mostrarNotificacion("No hay datos válidos. Seleccione productos y cantidades.", "error");
            if (btnSubmit) btnSubmit.disabled = false;
            return;
        }

        let errores = 0;
        for (const item of actualizaciones) {
            const productoOriginal = listaProductos.find(p => p.id == item.id);
            if (productoOriginal) {
                const stockActual = parseFloat(productoOriginal.stock) || 0;
                const nuevoStock = stockActual + item.cantidad;
                const exito = await addStock(item.id, nuevoStock);
                if (!exito) errores++;
            }
        }

        if (errores === 0) {
            mostrarNotificacion("Stock actualizado correctamente.", "exito");
            
            // Contador de 2 segundos antes de devolver a la ventana principal
            setTimeout(() => {
                formularioPrincipal.reset();
                contenedor.innerHTML = ''; 
                crearYAgregarFila();
                
                
                if (btnSubmit) btnSubmit.disabled = false;
            }, 2000);
            
        } else {
            mostrarNotificacion(`Errores en ${errores} productos. Revise consola.`, "error");
            if (btnSubmit) btnSubmit.disabled = false;
        }

    } catch (error) {
        console.error("Error en submit:", error);
        mostrarNotificacion("Ocurrió un error inesperado al procesar.", "error");
        if (btnSubmit) btnSubmit.disabled = false;
    }
}