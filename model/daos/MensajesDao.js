const ContenedorArchivo = require('../contenedores/ContenedorArchivo')

let instance = null

class MensajesArchivoDao extends ContenedorArchivo {
    constructor() {
        if(!instance) {
            super('mensajes.txt')
            instance = this
        }
        return instance
    }
}

module.exports = MensajesArchivoDao