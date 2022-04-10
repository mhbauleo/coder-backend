class ContenedorBD {
  constructor(options, tabla) {
    this.knex = require('knex')(options);
    this.tabla = tabla;
  }

  // Principales

  async save(objeto) {
    const newTimestamp = Date.now()
    const [nuevoId] = await this.knex(this.tabla).insert({...objeto})
    return nuevoId;
  }

  // Devuelve null en caso de no encontrar el objeto
  async getById(idBuscado) {
    let [usuario] = await this.knex.from(this.tabla).select("*").where('id', idBuscado)
    if(usuario == undefined) {
        return null
    }
    return usuario
  }

  async getAll() {
    return await this.knex.from(this.tabla).select('*')
  }

  async updateById(newObject, id) {
    return await this.knex.from(this.tabla).where('id', id).update(newObject)
  }

  async deleteById(id) {
    return await this.knex(this.tabla).where('id', id).delete()
  }

  async deleteAll() {
    return await this.knew(this.tabla).delete()
  }

  async destroy() {
    this.knex.destroy()
  }
}

module.exports = ContenedorBD;
