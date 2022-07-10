const ProductosFactoryDao = require("./productosFactory");
const MensajesFactoryDao = require("./mensajesFactory");
const UserFactoryDao = require("./userFactory");
const productos = ProductosFactoryDao.get('MONGO');
const mensajes = MensajesFactoryDao.get('FILE');
const User = UserFactoryDao.get('MONGO');

module.exports = { productos, mensajes, User };
