const Productos = require("./productos");
const productos = require('./listaDeProductos')

const express = require("express");
const routerApiProductos = require("./apiProductos");
const routerVistaProductos = require("./vistaProductos");
const app = express();

app.use("/api/productos", routerApiProductos);
app.use("/", routerVistaProductos);

app.set("view engine", "pug");
app.set("views", "./views");
//app.use(express.static(__dirname + "/public"));

//-----------------------------------------------------------------------------
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`servidor levantado en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`hubo un error ${error}`));