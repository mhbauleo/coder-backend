const {fork} = require('child_process')

const getRandoms = (req, res) => {
    const cant = req.query.cant || 100000000

    const forked = fork('./randoms_child')
    forked.send(cant)
    forked.on('message', (randoms) => {
        res.json(randoms)
    })
}

module.exports = {getRandoms}