const ContenedorBD = require("./contenedorBD")

class Productos {
  constructor(options) {
    this.contenedor = new ContenedorBD(options, 'productos');
  }

  async getProductos() {
    return await this.contenedor.getAll()
  }

  // Devuelve null en caso de no encontrar el producto
  async getProductoById(id) {
    return await this.contenedor.getById(id)
  }

  // Devuelve 0 si el producto es inválido
  async postProducto(producto) {
    if (this.esProductoValido(producto)) {
      return await this.contenedor.save(producto)
    } else {
      return 0;
    }
  }

  // Devuelve true si la actualización se realizó correctamente
  async putProducto(producto, id) {
    return this.esProductoValido(producto) && await this.contenedor.updateById(producto, id) != 0
  }

  // Devuelve true si se borró correctamente
  async deleteProducto(id) {
    return await this.contenedor.deleteById(id) != 0
  }

  // Auxiliares

  esProductoValido(producto) {
    return (
      producto.hasOwnProperty("title") &&
      producto.hasOwnProperty("price") &&
      producto.hasOwnProperty("thumbnail")
    );
  }
}

module.exports = Productos;
