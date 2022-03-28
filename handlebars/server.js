const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const routerApiProductos = require("./apiProductos");
const routerVistaProductos = require("./vistaProductos");
const productos = require("./listaDeProductos");
const Contenedor = require("./contenedor");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const handlebars = require("express-handlebars");

app.use(express.static("./public"));
app.use("/api/productos", routerApiProductos);
app.use("/", routerVistaProductos);

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

// Mensajes

const ARCHIVO = "./mensajes.txt";
const contenedorMensajes = new Contenedor(ARCHIVO);

// Sockets

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");

  socket.emit("productos", productos.getProductos());

  (async function () {
    const mensajes = await contenedorMensajes.getAll();
    socket.emit("mensajes", mensajes);
  })();

  socket.on("mensajes", (data) => {
    (async function () {
      await contenedorMensajes.save(data);
      const mensajes = await contenedorMensajes.getAll();
      io.sockets.emit("mensajes", mensajes);
    })();
  });

  socket.on("productos", (data) => {
    productos.postProducto(data);
    io.sockets.emit("productos", productos.getProductos());
  });
});

//-----------------------------------------------------------------------------
const PORT = 8080;

httpServer.listen(PORT, () => {
  console.log("Servidor levantado");
});
