const ProductosMongoDao = require('./ProductosDao')

class ProductosFactoryDao {
    static get(tipo) {
        switch(tipo) {
            case 'MONGO': return new ProductosMongoDao()
            default: return new ProductosMongoDao()
        }
    }
}

module.exports = ProductosFactoryDao