const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const {productos, mensajes} = require("./daos/index");

const routerMain = require('./routes/main')
const routerRandoms = require("./routes/randoms");

const {logPath, rutaIncorrecta} = require('./middlewares/logger')

const app = express();
const appRandom = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//-------------------------------------------------------------------------------------------------

const handlebars = require("express-handlebars");

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("./public"));

//--------------------------------------------------------------------------------------------- 

app.use(logPath);

app.use("/", routerMain);
appRandom.use("/api/randoms", routerRandoms);

app.all(`*`, rutaIncorrecta);

//------------------------------------- Normalizer -------------------------------------

const { normalize, schema } = require("normalizr");

const author = new schema.Entity("author", { idAttribute: "email" });
const msg = new schema.Entity("msg", {
  author: author,
});
const msgs = new schema.Entity("msgs", {
  mensajes: [msg],
});

//------------------------------------- Sockets -------------------------------------

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");

  (async function () {
    socket.emit("productos", await productos.getAll());
  })();

  (async function () {
    const mensajesTodos = await mensajes.getAll();
    const mensajesNormalizado = normalize(
      { id: "mensajes", mensajes: mensajesTodos },
      msgs
    );

    const longitudMensajes = JSON.stringify(mensajesTodos).length;
    const longitudMensajesNormalizado =
      JSON.stringify(mensajesNormalizado).length;

    socket.emit("compresion", {
      compresion: (longitudMensajesNormalizado * 100) / longitudMensajes,
    });
    socket.emit("mensajes", mensajesTodos);
  })();

  socket.on("mensajes", (data) => {
    (async function () {
      await mensajes.save(data);
      const mensajesTodos = await mensajes.getAll();
      const mensajesNormalizado = normalize(
        { id: "mensajes", mensajes: mensajesTodos },
        msgs
      );

      const longitudMensajes = JSON.stringify(mensajesTodos).length;
      const longitudMensajesNormalizado =
        JSON.stringify(mensajesNormalizado).length;

      io.sockets.emit("compresion", {
        compresion: (longitudMensajesNormalizado * 100) / longitudMensajes,
      });
      io.sockets.emit("mensajes", mensajesTodos);
    })();
  });

  socket.on("productos", (data) => {
    (async function () {
      await productos.save(data);
      io.sockets.emit("productos", await productos.getAll());
    })();
  });
});

// --------------------------------------------------------------------------------------------

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const yargs = require("yargs/yargs")(process.argv.slice(2));
const args = yargs
  .default({ p: 8080, m: "fork", portRandom: 8086, n: true })
  .alias({ p: "port", m: "modo", r: "random" }).argv;

const PORT = process.env.PORT || yargs.argv.p;
const PORTRANDOM = yargs.argv.portRandom;
const modo = yargs.argv.m;
const random = yargs.argv.r;
const normal = yargs.argv.n;

/*
p (puerto)
m (modo)
portRandom (puerto para /api/randoms)
r (determina la disponibilidad de /api/randoms)
n (determina la disponibilidad del resto de las rutas)
*/

console.log(`normal = ${normal}`);
console.log(`random = ${random}`);

if (normal) {
  if (modo == "cluster" && cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    httpServer.listen(PORT, () => {
      console.log("Servidor levantado en el puerto " + PORT);
    });
  }
}

if (random) {
  appRandom.listen(PORTRANDOM, () => {
    console.log(`Servidor random levantado en ${PORTRANDOM}`);
  });
}
