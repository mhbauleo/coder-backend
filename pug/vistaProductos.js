const Productos = require("./productos");
const productos = require("./listaDeProductos");

const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/productos", (req, res) => {
  res.render("layouts/vista.pug", { productos: productos.getProductos() });
});

router.post("/productos", (req, res) => {
  const nuevoProducto = req.body;
  const nuevoId = productos.postProducto(nuevoProducto);
  res.render("layouts/form.pug");
});

router.get("/", (req, res) => {
  res.render("layouts/form.pug");
});

module.exports = router;
