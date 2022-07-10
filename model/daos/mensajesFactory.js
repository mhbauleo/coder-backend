const MensajesArchivoDao = require('./MensajesDao')

class MensajesFactoryDao {
    static get(tipo) {
        switch(tipo) {
            case 'FILE': return new MensajesArchivoDao()
            default: return new MensajesArchivoDao()
        }
    }
}

module.exports = MensajesFactoryDao