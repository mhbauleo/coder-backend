const {optionsMariaDB} = require('./options/mariaDB.js')
const {optionsSQLite3} = require('./options/SQLite3.js')
const knexMariaDB = require('knex')(optionsMariaDB)
const knexSQ = require('knex')(optionsSQLite3)

knexMariaDB.schema.createTable('productos', table => {
    table.increments('id')
    table.string('title')
    table.integer('price')
    table.string('thumbnail')
})
.then(() => console.log('MariaDB table created'))
.catch((err) => { 
    console.log(err)
    throw err
})
.finally(() => {
    knexMariaDB.destroy()
})

knexSQ.schema.createTable('mensajes', table => {
    table.increments('id')
    table.string('email')
    table.string('text')
    table.string('fecha')
})
.then(() => console.log('Sqlite table created'))
.catch((err) => { 
    console.log(err)
    throw err
})
.finally(() => {
    knexSQ.destroy()
})