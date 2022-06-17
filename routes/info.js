const express = require('express');
const numCPUs = require('os').cpus().length;
const compression = require('compression')

const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(compression())

router.get('/', (req, res) => {
    res.render('layouts/info' ,{
        directorio: process.cwd(),
        argv : process.argv,
        pid: process.pid,
        node_version: process.version,
        so: process.platform,
        memoria_reservada: process.memoryUsage().rss,
        numero_de_procesadores: numCPUs
    })
})

router.get('/consolelog', (req, res) => {
    console.log(process)
    res.render('layouts/info' ,{
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