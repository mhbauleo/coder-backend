const Productos = require("./productos");
const {optionsMariaDB} = require('./scripts/options/mariaDB.js')

const productos = new Productos(optionsMariaDB);

module.exports = productos