export function renderizarTabla(datos) {
  const tabla = document.querySelector("#tablaProductos tbody");
  tabla.innerHTML = "";
  if (datos.length === 0) {
    tabla.innerHTML =
      '<tr><td colspan="8" style="text-align:center;">No se encontraron productos</td></tr>';
    resumen.textContent = "";
    return;
  }


  datos.forEach((p) => {
    const fila = document.createElement("tr");
    if (p.stock < p.stockMinimo) fila.classList.add("alerta");
    fila.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.categoria.nombre}</td>
      <td>${p.precio.toFixed(2)}</td>
      <td>${p.stock}</td>
      <td>${p.stockMinimo}</td>
      <td>${p.proveedor.nombre}</td>
      <td>${p.proveedor.isla}</td>
    `;
    tabla.appendChild(fila);
  });


  const totalProductos = datos.length;
  const valorTotal = datos
    .reduce((acc, p) => acc + p.precio * p.stock, 0)
    .toFixed(2);
  resumen.textContent = `Productos mostrados: ${totalProductos} | Valor total del stock: ${valorTotal} €`;
}

export function renderizarCategoria(datos){
  const selector= document.querySelector("#categoriaSelect")
  selector.innerHTML="";
  if(datos==0){
    selector.innerHTML=
    '<option value="">-- Categoría --</option>';
    return;
  }

  datos.forEach((c) =>{
    const sel=document.createElement("option");
    sel.innerHTML=`
       <option value="${c.nombre}">${c.nombre}</option>
    `
    selector.appendChild(sel);
  })
  }



