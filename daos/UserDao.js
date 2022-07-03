const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb')
const usuariosEsquema = require('../schemas/usuarios')
const logger = require('../helpers/logger')

class UserDao extends ContenedorMongoDb {
    constructor() {
        super('usuarios', usuariosEsquema)
    }

    async getUserByEmail(email) {
        try {
            return await this.collection.findOne({email : email})
        } catch (err) {
            logger.error(err);           
        }
    }
}

module.exports = UserDao