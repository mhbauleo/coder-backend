const { productos } = require("../model/daos/index");

async function getProductos() {
  return await productos.getAll()
}

const getProductById = async ({id}) => {
  const producto = await productos.getById(id);
  if (producto != null) {
    return producto
  } else {
    return { error: "Producto no encontrado" }
  }
};

const saveProduct = async ({datos}) => {
  return await productos.save(datos)
}

const updateProductById = async ({datos, id}) => {
  const nuevoProducto = datos;

  if (
    (await productos.updateById(nuevoProducto, id)) !== 0
  ) {
    return "Actualizado con éxito";
  } else {
    return "No se pudo actualizar";
  }
};

const deleteProductById = async ({id}) => {
  if ((await productos.deleteById(id)) !== 0) {
    return "Borrado con éxito" ;
  } else {
    return "Producto no encontrado" ;
  }
};

module.exports = {
  getProductos,
  getProductById,
  saveProduct,
  updateProductById,
  deleteProductById,
};
