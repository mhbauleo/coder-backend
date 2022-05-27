const express = require('express');
const { route } = require('./autenticacion');

const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.json({
        directorio: process.cwd(),
        argv : process.argv,
        pid: process.pid,
        node_version: process.version,
        so: process.platform,
        memoria_reservada: process.memoryUsage().rss
    })
})

module.exports = router