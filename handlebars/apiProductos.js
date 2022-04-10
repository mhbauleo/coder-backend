const Productos = require("./productos");
const productos = require('./listaDeProductos')

const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  res.json(await productos.getProductos());
});

router.get("/:id", async (req, res) => {
  const producto = await productos.getProductoById(Number(req.params.id));
  if (producto != null) {
    res.json(producto);
  } else {
    res.json({ error: "Producto no encontrado" });
  }
});

router.post("/", async (req, res) => {
  const nuevoProducto = req.body;
  const nuevoId = await productos.postProducto(nuevoProducto);

  if (nuevoId != 0) {
    res.json({ nuevoProducto, nuevoId });
  } else {
    res.json({ error: "Producto inválido" });
  }
});

router.put("/:id", async (req, res) => {
  const nuevoProducto = req.body;

  if (await productos.putProducto(nuevoProducto, Number(req.params.id))) {
    res.json({ mensaje: "Actualizado con éxito" });
  } else {
    res.json({ error: "No se pudo actualizar" });
  }
});

router.delete("/:id", async (req, res) => {
  if (await productos.deleteProducto(Number(req.params.id))) {
    res.json({ mensaje: "Borrado con éxito" });
  } else {
    res.json({ error: "Producto no encontrado" });
  }
});

module.exports = router;