const mongoose = require("mongoose");

const productosEsquema = new mongoose.Schema(
  {
    title: {type: String, require: true},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true}
  }
);

module.exports = productosEsquema;
