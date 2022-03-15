const Productos = require("./productos");
const productos = require("./listaDeProductos");

const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/productos", (req, res) => {
  res.render("pages/vista", { productos: productos.getProductos() });
});

router.post("/productos", (req, res) => {
  const nuevoProducto = req.body;
  const nuevoId = productos.postProducto(nuevoProducto);
  res.render("pages/form");
});

router.get("/", (req, res) => {
  res.render("pages/form");
});

module.exports = router;
