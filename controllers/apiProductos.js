const { productos } = require("../model/daos/index");

const getAllProductos = async (req, res) => {
  res.json(await productos.getAll());
};

const getProductById = async (req, res) => {
  const producto = await productos.getById(req.params.id);
  if (producto != null) {
    res.json(producto);
  } else {
    res.json({ error: "Producto no encontrado" });
  }
};

const saveProduct = async (req, res) => {
  const nuevoProducto = req.body;
  const nuevoId = await productos.save(nuevoProducto);

  if (nuevoId != 0) {
    res.json({ nuevoProducto, nuevoId });
  } else {
    res.json({ error: "Producto inválido" });
  }
};

const updateProductById = async (req, res) => {
  const nuevoProducto = req.body;

  if (
    (await productos.updateById(nuevoProducto, req.params.id)) !== 0
  ) {
    res.json({ mensaje: "Actualizado con éxito" });
  } else {
    res.json({ error: "No se pudo actualizar" });
  }
};

const deleteProductById = async (req, res) => {
  if ((await productos.deleteById(req.params.id)) !== 0) {
    res.json({ mensaje: "Borrado con éxito" });
  } else {
    res.json({ error: "Producto no encontrado" });
  }
};

module.exports = {
  getAllProductos,
  getProductById,
  saveProduct,
  updateProductById,
  deleteProductById,
};
