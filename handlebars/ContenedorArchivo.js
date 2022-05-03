const fs = require("fs");

class ContenedorArchivo {
  constructor(archivo) {
    this.archivo = archivo;
  }

  // Principales

  async save(objeto) {
    let nuevoId;
    const datos = await this.getArray();

    if (datos.length > 0) {
      nuevoId = datos[datos.length - 1].id + 1;
    } else {
      nuevoId = 1;
    }

    const newTimestamp = Date.now()

    await this.escribirArchivo([...datos, { ...objeto, timestamp: newTimestamp, id: nuevoId }]);
    return nuevoId;
  }

  // Devuelve null en caso de no encontrar el objeto
  async getById(idBuscado) {
    let res = null;
    const datos = await this.getArray();

    for (const dato of datos) {
      if (dato.id == idBuscado) res = dato;
    }
    return res;
  }

  async getAll() {
    return await this.getArray();
  }

  async updateById(newObject, id) {
    let modifiedCount = 0
    const datosViejos = await this.getArray();
    const datosNuevos = datosViejos.map((elem) => {
      if (elem.id == id) {
        const newTimestamp = Date.now()
        modifiedCount++
        return { ...newObject, timestamp: newTimestamp, id: id };
      } else {
        return elem;
      }
    });
    await this.escribirArchivo(datosNuevos);
    return modifiedCount
  }

  async deleteById(id) {
    const datosViejos = await this.getArray();
    const datosNuevos = datosViejos.filter((elem) => elem.id != id);
    await this.escribirArchivo(datosNuevos);
    return datosViejos.length - datosNuevos.length
  }

  async deleteAll() {
    await this.escribirArchivo([]);
  }

  // Auxiliares

  async getArray() {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      const data = JSON.parse(contenido);
      return data;
    } catch (e) {
      console.log("error de lectura");
    }
  }

  async escribirArchivo(datos) {
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(datos, null, 2));
    } catch (e) {
      console.log("error de escritura");
    }
  }
}

module.exports = ContenedorArchivo;
