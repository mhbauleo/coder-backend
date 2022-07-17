const request = require('supertest')('http://localhost:8080/api/productos')
const expect = require('chai').expect

let idCalculadora 
let idEscuadra

describe("Agregar productos", () => {
    describe('GET ALL', () => {
        it('Sin productos', async () => {
            let response = await request.get('/')
            const products = response.body
            expect(products.length).to.eql(0)
        })
    })
    describe('POST', () => {
        it('Debería agregar un producto escuadra', async () => {
            const escuadra = {
                title: 'Escuadra',
                price: 300,
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-and-learning-set-2-1/256/47-512.png'
            }
            let response = await request.post('/').send(escuadra)

            expect(response.body).to.include.keys('nuevoId', 'nuevoProducto')
            const {nuevoId, nuevoProducto} = response.body
            expect(nuevoProducto).to.include.keys('title', 'price', 'thumbnail')

            expect(nuevoProducto.title).to.eql('Escuadra')
            expect(nuevoProducto.price).to.eql(300)
            expect(nuevoProducto.thumbnail).to.eql('https://cdn3.iconfinder.com/data/icons/education-and-learning-set-2-1/256/47-512.png')
            idEscuadra = nuevoId
        })
    })
    describe('POST', () => {
        it('Debería agregar un producto calculadora', async () => {
            const calculadora = {
                title: 'Calculadora',
                price: 234.56,
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
            }
            let response = await request.post('/').send(calculadora)

            expect(response.body).to.include.keys('nuevoId', 'nuevoProducto')
            const {nuevoId, nuevoProducto} = response.body
            expect(nuevoProducto).to.include.keys('title', 'price', 'thumbnail')

            expect(nuevoProducto.title).to.eql('Calculadora')
            expect(nuevoProducto.price).to.eql(234.56)
            expect(nuevoProducto.thumbnail).to.eql('https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png')
            idCalculadora = nuevoId
        })
    })


})


describe("Chequear productos", () => {
    describe('GET ALL', () => {
        it('Dos productos', async () => {
            let response = await request.get('/')
            const products = response.body
            expect(products.length).to.eql(2)
        })
    })

    describe('GET BY ID', () => {
        it('Chequear calculadora', async () => {
            let response = await request.get('/' + idCalculadora)
            const calculadora = response.body
            
            expect(calculadora).to.include.keys('title', 'price', 'thumbnail')

            expect(calculadora.title).to.eql('Calculadora')
            expect(calculadora.price).to.eql(234.56)
            expect(calculadora.thumbnail).to.eql('https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png')
        })
    })

    describe('GET BY ID', () => {
        it('Chequear escuadra', async () => {
            let response = await request.get('/' + idEscuadra)
            const escuadra = response.body
            
            expect(escuadra).to.include.keys('title', 'price', 'thumbnail')

            expect(escuadra.title).to.eql('Escuadra')
            expect(escuadra.price).to.eql(300)
            expect(escuadra.thumbnail).to.eql('https://cdn3.iconfinder.com/data/icons/education-and-learning-set-2-1/256/47-512.png')
        })
    })
})

describe("Actualizar", () => {
    describe('UPDATE', () => {
        it('Dos escuadras', async () => {
            const escuadra = {
                title: 'Escuadra',
                price: 300,
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-and-learning-set-2-1/256/47-512.png'
            }

            let response = await request.put('/' + idCalculadora).send(escuadra)
            const { mensaje } = response.body
            expect(mensaje).to.eql('Actualizado con éxito')
        })
    })

    describe('GET BY ID', () => {
        it('Chequear calculadora', async () => {
            let response = await request.get('/' + idCalculadora)
            const escuadra = response.body
            
            expect(escuadra).to.include.keys('title', 'price', 'thumbnail')

            expect(escuadra.title).to.eql('Escuadra')
            expect(escuadra.price).to.eql(300)
            expect(escuadra.thumbnail).to.eql('https://cdn3.iconfinder.com/data/icons/education-and-learning-set-2-1/256/47-512.png')
        })
    })

    describe('GET BY ID', () => {
        it('Chequear escuadra', async () => {
            let response = await request.get('/' + idEscuadra)
            const escuadra = response.body
            
            expect(escuadra).to.include.keys('title', 'price', 'thumbnail')

            expect(escuadra.title).to.eql('Escuadra')
            expect(escuadra.price).to.eql(300)
            expect(escuadra.thumbnail).to.eql('https://cdn3.iconfinder.com/data/icons/education-and-learning-set-2-1/256/47-512.png')
        })
    })
})

describe("Borrar", () => {
    describe('DELETE', () => {
        it('deberia borrar escuadra', async () => {
            let response = await request.delete('/' + idEscuadra)
            
            const {mensaje} = response.body
            expect(mensaje).to.eql('Borrado con éxito')
        })
    })
    describe('DELETE', () => {
        it('deberia borrar calculadora', async () => {
            let response = await request.delete('/' + idCalculadora)

            const {mensaje} = response.body
            expect(mensaje).to.eql('Borrado con éxito')
        })
    })
    describe('GET ALL', () => {
        it('Sin productos', async () => {
            let response = await request.get('/')
            const products = response.body
            expect(products.length).to.eql(0)
        })
    })
})