const {optionsMariaDB} = require('./options/mariaDB.js')
const knex = require('knex')(optionsMariaDB)

knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('title')
    table.integer('price')
    table.string('thumbnail')
})
.then(() => console.log('table created'))
.catch((err) => { 
    console.log(err)
    throw err
})
.finally(() => {
    knex.destroy()
})