const Productos = require("./productos");
const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const productos = new Productos();

router.get("/", (req, res) => {
  res.json(productos.getProductos());
});

router.get("/:id", (req, res) => {
  const producto = productos.getProductoById(Number(req.params.id));
  if (producto != null) {
    res.json(producto);
  } else {
    res.json({ error: "Producto no encontrado" });
  }
});

router.post("/", (req, res) => {
  const nuevoProducto = req.body;
  const nuevoId = productos.postProducto(nuevoProducto);

  if (nuevoId != 0) {
    res.json({ nuevoProducto, nuevoId });
  } else {
    res.json({ error: "Producto inválido" });
  }
});

router.put("/:id", (req, res) => {
  const nuevoProducto = req.body;

  if (productos.putProducto(nuevoProducto, Number(req.params.id))) {
    res.json({ mensaje: "Actualizado con éxito" });
  } else {
    res.json({ error: "No se pudo actualizar" });
  }
});

router.delete("/:id", (req, res) => {
  if (productos.deleteProducto(Number(req.params.id))) {
    res.json({ mensaje: "Borrado con éxito" });
  } else {
    res.json({ error: "Producto no encontrado" });
  }
});

module.exports = router;
