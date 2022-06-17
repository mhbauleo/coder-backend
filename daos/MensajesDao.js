const ContenedorArchivo = require('../contenedores/ContenedorArchivo')

class MensajesDao extends ContenedorArchivo {
    constructor() {
        super('mensajes.txt')
    }
}

module.exports = MensajesDao