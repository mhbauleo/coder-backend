const mongoose = require("mongoose");
const config = require("../../config");
const logger = require('../../helpers/logger')

mongoose.connect(config.mongo.baseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

class ContenedorMongoDb {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  // Principales

  async save(objeto) {
    try {
      const { _id } = await this.collection.create(objeto);
      return _id.toString();
    } catch (e) {
      logger.log("error", e);
    }
  }

  // Devuelve null en caso de no encontrar el objeto
  async getById(idBuscado) {
    try {
      return await this.collection.findById(idBuscado);
    } catch (e) {
      logger.log("error", e);
    }
  }

  async getAll() {
    try {
      return await this.collection.find({});
    } catch (e) {
      logger.log("error", e);
    }
  }

  async updateById(newObject, id) {
    try {
      const { modifiedCount } = await this.collection.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        newObject
      );
      return modifiedCount;
    } catch (e) {
      logger.log("error", e);
    }
  }

  async deleteById(id) {
    try {
      const { deletedCount } = await this.collection.deleteOne({
        _id: mongoose.Types.ObjectId(id),
      });
      return deletedCount;
    } catch (e) {
      logger.log("error", e);
    }
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({});
    } catch (e) {
      logger.log("error", e);
    }
  }
}

module.exports = ContenedorMongoDb;
