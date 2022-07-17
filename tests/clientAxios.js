const axios = require('axios')

const url = 'http://localhost:8080/api/productos';

async function deleteTest(id) {
    try {
        let res = await axios.delete(url + '/' + id)
        return res.data
    } catch(e) {
        console.log(e)
    }
}

async function getAllTest() {
    try {
        let res = await axios.get(url)
        return res.data
    } catch(e) {
        console.log(e)
    }
}

async function getByIdTest(id) {
    try {
        let res = await axios.get(url + '/' + id)
        return res.data
    } catch(e) {
        console.log(e)
    }
}

async function putTest(newObject, id) {
    try {
        let res = await axios.put(url + '/' + id, newObject)
        return res.data
    } catch(e) {
        console.log(e)
    }
}

async function postTest(newObject) {
    try {
        let res = await axios.post(url, newObject)
        return res.data
    } catch(e) {
        console.log(e)
    }
}

(async function () {
    const escuadra = {
        title: 'Escuadra',
        price: 300,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-and-learning-set-2-1/256/47-512.png'
    }

    const calculadora = {
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    }

    try {
        console.log('Inicio')
        console.log(await getAllTest())
        const idCalculadora = (await postTest(calculadora)).nuevoId
        const idEscuadra = (await postTest(escuadra)).nuevoId
        console.log('Dos elementos')
        console.log(await getAllTest())
        console.log(await getByIdTest(idCalculadora))
        console.log(await getByIdTest(idEscuadra))
        await putTest(escuadra, idCalculadora)
        console.log('Dos escuadras')
        console.log(await getAllTest())
        await deleteTest(idCalculadora)
        console.log('Una escuadra')
        console.log(await getAllTest())
        await deleteTest(idEscuadra)
        console.log('Fin')
        console.log(await getAllTest())
    } catch(e) {
        console.log(e)
    }

})();

