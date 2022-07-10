const mongoose = require("mongoose");

const usuariosEsquema = new mongoose.Schema(
  {
    email: {type: String, require: true},
    nombre: {type: String, require: true},
    password: {type: String, require: true},
  }
);

module.exports = usuariosEsquema;
