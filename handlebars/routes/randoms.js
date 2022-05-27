const express = require('express')
const {fork} = require('child_process')

const router = express.Router()

router.get('/', (req, res) => {
    const cant = req.query.cant || 100000000

    const forked = fork('./routes/randoms_child.js')
    forked.send(cant)
    forked.on('message', (randoms) => {
        res.json(randoms)
    })
})

module.exports = router