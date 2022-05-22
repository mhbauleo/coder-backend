const mongoose = require("mongoose");
const usuariosEsquema = require("./models/usuarios");

mongoose.connect(
  "mongodb+srv://mhbauleo:12345@cluster0.s1kle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const User = mongoose.model("usuarios", usuariosEsquema)

module.exports = User