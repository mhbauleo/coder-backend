const ProductosDao = require("./ProductosDao");
const MensajesDao = require("./MensajesDao");
const UserDao = require("./UserDao");
const productos = new ProductosDao();
const mensajes = new MensajesDao();
const User = new UserDao();

module.exports = { productos, mensajes, User };
