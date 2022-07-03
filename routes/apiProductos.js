const express = require("express");
const router = express.Router();

const {
  getAllProductos,
  getProductById,
  saveProduct,
  updateProductById,
  deleteProductById,
} = require("../controllers/apiProductos");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", getAllProductos);
router.get("/:id", getProductById);
router.post("/", saveProduct);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;
