# Todo
# ```
# ~~
- [  ] El get de ```api/products``` debe poder recibir: ~~page~~, ~~limit~~, query(filtro a aplicar) y sort(asc/desc, para realizar ordenamiento ascendente o descendente por precio)
- [ x ] El método GET deberá devolver un objeto con el siguiente formato:
```json
{
	"status": "success/error",
    "payload": "Resultado de los productos solicitados",
    "totalPages": "Total de páginas",
    "prevPage": "Página anterior",
    "nextPage": "Página siguiente",
    "page": "Página actual",
    "hasPrevPage": "Indicador para saber si la página previa existe",
    "hasNextPage": "Indicador para saber si la página siguiente existe",
    "prevLink": "Link directo a la página previa (null si hasPrevPage=false)",
    "nextLink": "Link directo a la página siguiente (null si hasNextPage=false)",
}
```
- [ x ] DELETE ```api/carts/:cid/products/:pid``` deberá eliminar del carrito el producto seleccionado.
- [ x ] PUT ```api/carts/:cid``` deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
- [ x ] PUT ```api/carts/:cid/products/:pid``` deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
- [ x ] DELETE ```api/carts/:cid``` deberá eliminar todos los productos del carrito 
- [  ] Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un ```populate```. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.
- [ x ] Crear una vista en el router de views ‘/products’ para visualizar todos los productos con su respectiva paginación
- [ x ] Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 