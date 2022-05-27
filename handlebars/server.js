const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const routerApiProductos = require("./routes/apiProductos");
const routerVistaProductosTest = require("./routes/productosTest");
const routerAutenticacion = require("./routes/autenticacion");
const routerInfo = require("./routes/info")
const routerRandoms = require("./routes/randoms")

const productos = require("./listaDeProductos");
const ContenedorArchivo = require("./ContenedorArchivo");
const { optionsMariaDB } = require("./scripts/options/mariaDB.js");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//------------------------------------- Normalizr -------------------------------------------------
const { normalize, schema, denormalize } = require("normalizr");

const author = new schema.Entity("author", { idAttribute: "email" });
const msg = new schema.Entity("msg", {
  author: author,
});
const msgs = new schema.Entity("msgs", {
  mensajes: [msg],
});
//-------------------------------------------------------------------------------------------------

const handlebars = require("express-handlebars");

app.use(express.static("./public"));

app.use("/api/productos", routerApiProductos);
app.use("/api/productos-test", routerVistaProductosTest);
app.use("/info", routerInfo)
app.use("/api/randoms", routerRandoms)
app.use("/", routerAutenticacion)

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

const contenedorMensajes = new ContenedorArchivo("./mensajes.txt");

//------------------------------------- Sockets -------------------------------------------------

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");

  (async function () {
    socket.emit("productos", await productos.getProductos());
  })();

  (async function () {
    const mensajes = await contenedorMensajes.getAll();
    const mensajesNormalizado = normalize(
      { id: "mensajes", mensajes: mensajes },
      msgs
    );

    const longitudMensajes = JSON.stringify(mensajes).length;
    const longitudMensajesNormalizado =
      JSON.stringify(mensajesNormalizado).length;

    socket.emit("compresion", {
      compresion: (longitudMensajesNormalizado * 100) / longitudMensajes,
    });
    socket.emit("mensajes", mensajes);
  })();

  socket.on("mensajes", (data) => {
    (async function () {
      await contenedorMensajes.save(data);
      const mensajes = await contenedorMensajes.getAll();
      const mensajesNormalizado = normalize(
        { id: "mensajes", mensajes: mensajes },
        msgs
      );

      const longitudMensajes = JSON.stringify(mensajes).length;
      const longitudMensajesNormalizado =
        JSON.stringify(mensajesNormalizado).length;

      io.sockets.emit("compresion", {
        compresion: (longitudMensajesNormalizado * 100) / longitudMensajes,
      });
      io.sockets.emit("mensajes", mensajes);
    })();
  });

  socket.on("productos", (data) => {
    (async function () {
      await productos.postProducto(data);
      io.sockets.emit("productos", await productos.getProductos());
    })();
  });
});

// --------------------------------------------------------------------------------------------
const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.default({p : 8080}).argv

const PORT = yargs.argv.p;

httpServer.listen(PORT, () => {
  console.log("Servidor levantado en el puerto " + PORT);
});
