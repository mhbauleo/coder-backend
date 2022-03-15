const Productos = require("./productos");
const productos = require("./listaDeProductos");

const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/productos", (req, res) => {
  res.render("vista.pug", {
    productos: productos.getProductos(),
    len: productos.getProductos().length,
  });
});

router.post("/productos", (req, res) => {
  const nuevoProducto = req.body;
  const nuevoId = productos.postProducto(nuevoProducto);
  res.render("form.pug");
});

router.get("/", (req, res) => {
  res.render("form.pug");
});

module.exports = router;
