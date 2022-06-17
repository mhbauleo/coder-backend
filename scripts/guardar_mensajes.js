const {optionsSQLite3} = require('./options/SQLite3.js')
const knexSQ = require('knex')(optionsSQLite3)
const fs = require('fs')

knexSQ.from('mensajes').select('*')
.then(async (rows) => {
    try {
        await fs.promises.writeFile(
            './mensajes.txt',
            JSON.stringify(rows, null, 2)
        )
    } catch (e) {
        console.log('error de escritura')
    }
}).catch((err) => {
    console.log(err)
    throw err
})
.finally(() => {
    knexSQ.destroy();
})