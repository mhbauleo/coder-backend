const express = require("express");
const router = express.Router();

const { getProductosTest } = require('../controllers/productosTest')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", getProductosTest);

module.exports = router;
