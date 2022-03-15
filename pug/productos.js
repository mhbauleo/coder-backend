class Productos {
  constructor() {
    this.productos = [];
  }

  getProductos() {
    return this.productos.filter((producto) => producto != null);
  }

  // Devuelve null en caso de no encontrar el producto
  getProductoById(id) {
    if (this.esIdValido(id)) {
      return this.productos[id - 1];
    } else {
      return null;
    }
  }

  // Devuelve 0 si el producto es inválido
  postProducto(producto) {
    if (this.esProductoValido(producto)) {
      const nuevoId = this.productos.length + 1;
      this.productos = [...this.productos, { ...producto, id: nuevoId }];
      return nuevoId;
    } else {
      return 0;
    }
  }

  // Devuelve true si la actualización se realizó correctamente
  putProducto(producto, id) {
    if (this.esIdValido(id) && this.esProductoValido(producto)) {
      this.productos[id - 1] = { ...producto, id: id };
      return true;
    } else {
      return false;
    }
  }

  // Devuelve true si se borró correctamente
  deleteProducto(id) {
    if (this.esIdValido(id)) {
      this.productos.splice(id - 1, 1, null);
      return true;
    } else {
      return false;
    }
  }

  // Auxiliares

  esIdValido(id) {
    return !isNaN(id) && 1 <= id && id <= this.productos.length;
  }

  esProductoValido(producto) {
    return (
      producto.hasOwnProperty("title") &&
      producto.hasOwnProperty("price") &&
      producto.hasOwnProperty("thumbnail")
    );
  }
}

module.exports = Productos;
