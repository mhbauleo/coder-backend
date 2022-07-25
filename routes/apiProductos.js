const express = require("express");
const router = express.Router();

const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require('graphql');


const {
  getProductos,
  getProductById,
  saveProduct,
  updateProductById,
  deleteProductById,
} = require("../controllers/apiProductos");

const schema = buildSchema(`
    input ProductoInput {
        title: String,
        price: Int,
        thumbnail: String
    }
    type Producto {
        _id: String,
        title: String,
        price: Int,
        thumbnail: String
    }
    type Query {
        getProductos: [Producto],
        getProductById(id: String): Producto
        
    }
    type Mutation {
      saveProduct(datos: ProductoInput): String,
      updateProductById(datos: ProductoInput, id: String): String,
      deleteProductById(id: String): String 
    }
`);



router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: {
    getProductos,
    saveProduct,
    getProductById,
    updateProductById,
    deleteProductById
  },
  graphiql: true,
}))

module.exports = router;
