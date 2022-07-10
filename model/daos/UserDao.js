const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb')
const usuariosEsquema = require('../schemas/usuarios')
const logger = require('../../helpers/logger')

let instance = null

class UserMongoDao extends ContenedorMongoDb {
    constructor() {
        if(!instance) {
            super('usuarios', usuariosEsquema)
            instance = this
        }
        return instance
    }

    async getUserByEmail(email) {
        try {
            return await this.collection.findOne({email : email})
        } catch (err) {
            logger.error(err);           
        }
    }
}

module.exports = UserMongoDao