const mongoose = require("mongoose");
const usuariosEsquema = require("./models/usuarios");
const config = require('../config')

mongoose.connect(
  config.mongo.baseUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const User = mongoose.model("usuarios", usuariosEsquema)

module.exports = User