require('dotenv').config()

const config = {
    mongo: {
        baseUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.s1kle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    }
}

module.exports = config