const express = require('express');
const { route } = require('./autenticacion');
const numCPUs = require('os').cpus().length;

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
        memoria_reservada: process.memoryUsage().rss,
        numero_de_procesadores: numCPUs
    })
})

module.exports = router