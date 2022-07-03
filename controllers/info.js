const numCPUs = require('os').cpus().length;

const getInfo = (req, res) => {
  res.render("layouts/info", {
    directorio: process.cwd(),
    argv: process.argv,
    pid: process.pid,
    node_version: process.version,
    so: process.platform,
    memoria_reservada: process.memoryUsage().rss,
    numero_de_procesadores: numCPUs,
  });
};

const getInfoWithConsoleLog = (req, res) => {
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
}

module.exports = {getInfo,getInfoWithConsoleLog}