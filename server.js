const express = require('express')
const router = require('./apiProductos')
const app = express()

const PORT = 8080

app.use(express.static('public'))

const server = app.listen(PORT, () => {
    console.log(`servidor levantado en el puerto ${server.address().port}`)
})

server.on("error", (error) => console.log(`hubo un error ${error}`))

app.use('/api/productos', router)