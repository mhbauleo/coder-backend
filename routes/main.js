const express = require('express')
const router = express.Router()

const routerApiProductos = require("./apiProductos");
const routerVistaProductosTest = require("./productosTest");
const routerAutenticacion = require("./autenticacion");
const routerInfo = require("./info");

router.use("/api/productos", routerApiProductos);
router.use("/api/productos-test", routerVistaProductosTest);
router.use("/info", routerInfo);
router.use("/", routerAutenticacion);

module.exports = router