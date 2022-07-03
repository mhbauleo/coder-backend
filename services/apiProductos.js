const { productos } = require("../daos/index");

const getProductos = async () => {
    return await productos.getAll()
}

const getProductoById = async (id) => {
    return await productos.getById(id)
}