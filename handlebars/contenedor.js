const fs = require('fs')

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo
    }

    // Principales

    async save(objeto) {
        let nuevoId
        const datos = await this.getArray()

        if(datos.length > 0) {
            nuevoId = datos[datos.length - 1].id + 1
        } else {
            nuevoId = 1
        }

        await this.escribirArchivo([...datos, {...objeto, id : nuevoId}])
        return nuevoId
    }

    async getById(idBuscado) {
        let res = null
        const datos = await this.getArray()

        for(const dato of datos) {
            if(dato.id === idBuscado)
            res = dato
        }
        return res
    }

    async getAll() {
        return await this.getArray()        
    }

    async deleteById(id) {
        const datosViejos = await this.getArray()
        const datosNuevos = datosViejos.filter(elem => elem.id != id)
        await this.escribirArchivo(datosNuevos)
    }

    async deleteAll() {
        await this.escribirArchivo([])
    }

    // Auxiliares

    async getArray() {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8')
            const data = JSON.parse(contenido)
            return data
        } catch (e) {
            console.log('error de lectura')
        }            
    }

    async escribirArchivo(datos) {
        try {
            await fs.promises.writeFile(
                this.archivo,
                JSON.stringify(datos, null, 2)
            )
        } catch (e) {
            console.log('error de escritura')
        }
    }
}

module.exports = Contenedor