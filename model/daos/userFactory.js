const UserMongoDao = require('./UserDao')

class UserFactoryDao {
    static get(tipo) {
        switch(tipo) {
            case 'MONGO': return new UserMongoDao()
            default: return new UserMongoDao()
        }
    }
}

module.exports = UserFactoryDao