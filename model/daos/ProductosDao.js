const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb')
const productosEsquema = require('../schemas/productos')

let instance = null

class ProductosMongoDao extends ContenedorMongoDb {
    constructor() {
        if(!instance) {
            super('productos', productosEsquema)
            instance = this
        }
        return instance
    }
}

module.exports = ProductosMongoDao