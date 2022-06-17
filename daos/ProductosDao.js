const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb')
const productosEsquema = require('../schemas/productos')

class ProductosDao extends ContenedorMongoDb {
    constructor() {
        super('productos', productosEsquema)
    }
}

module.exports = ProductosDao