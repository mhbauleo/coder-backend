const Productos = require("./productos");
const productos = require("./listaDeProductos");

const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/productos", (req, res) => {
  res.render("layouts/vista", {
    productos: productos.getProductos(),
    hayProductos: productos.getProductos().length != 0,
  });
});

router.post("/productos", (req, res) => {
  const nuevoProducto = req.body;
  const nuevoId = productos.postProducto(nuevoProducto);
  res.render("layouts/form");
});

router.get("/", (req, res) => {
  res.render("layouts/form");
});

module.exports = router;
