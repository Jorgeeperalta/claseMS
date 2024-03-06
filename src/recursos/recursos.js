function potencia(numero) {
  let cuadrado = "";
  let cubo = "";
  cuadrado = numero ** 2;
  cubo = numero ** 3;
  return { cuadrado, cubo };
}
var auxArticulos = [];
function guardaArticulos(nombre, precio, articulosGlobal, id) {
  let aux = new Object();

  (aux.id = id),
    (aux.nombre = nombre),
    (aux.precio = precio),
    articulosGlobal.push(aux);
  auxArticulos = articulosGlobal;
  return articulosGlobal;
}
function carritoAgrega(cantidad, id, carritoLleno) {
  let aux = new Object();
  let buscaProducto = null;
  buscaProducto = auxArticulos.find((prod) => prod.id == id);
  console.log(buscaProducto);
  (aux.id = buscaProducto.id),
    (aux.nombre = buscaProducto.nombre),
    (aux.precio = buscaProducto.precio),
    (aux.cantidad = cantidad),
    (aux.subtotal = cantidad * buscaProducto.precio),
    carritoLleno.push(aux);
  return carritoLleno;
}
function eliminarProductoDeCarrito(id, carritoLleno) {
  let resultadoEliminado = carritoLleno.filter((carritoL) => carritoL.id != id);

  carritoLleno = resultadoEliminado;
  return carritoLleno;
}
export default { potencia, guardaArticulos, carritoAgrega, eliminarProductoDeCarrito };
