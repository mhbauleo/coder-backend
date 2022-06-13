const logger = require("./helpers/logger");

class ContenedorBD {
  constructor(options, tabla) {
    this.knex = require("knex")(options);
    this.tabla = tabla;
  }

  // Principales

  async save(objeto) {
    try {
      const newTimestamp = Date.now();
      const [nuevoId] = await this.knex(this.tabla).insert({ ...objeto });
      return nuevoId;
    } catch (e) {
      logger.log("error", e);
    }
  }

  // Devuelve null en caso de no encontrar el objeto
  async getById(idBuscado) {
    try {
      let [usuario] = await this.knex
        .from(this.tabla)
        .select("*")
        .where("id", idBuscado);
      if (usuario == undefined) {
        return null;
      }
      return usuario;
    } catch (e) {
      logger.log("error", e);
    }
  }

  async getAll() {
    try {
      return await this.knex.from(this.tabla).select("*");
    } catch (e) {
      logger.log("error", e);
    }
  }

  async updateById(newObject, id) {
    try {
      return await this.knex.from(this.tabla).where("id", id).update(newObject);
    } catch (e) {
      logger.log("error", e);
    }
  }

  async deleteById(id) {
    try {
      return await this.knex(this.tabla).where("id", id).delete();
    } catch (e) {
      logger.log("error", e);
    }
  }

  async deleteAll() {
    try {
      return await this.knew(this.tabla).delete();
    } catch (e) {
      logger.log("error", e);
    }
  }

  async destroy() {
    try {
      this.knex.destroy();
    } catch (e) {
      logger.log("error", e);
    }
  }
}

module.exports = ContenedorBD;
