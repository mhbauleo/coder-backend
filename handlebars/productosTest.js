const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const faker = require("faker");
faker.locale = "es";
const { commerce, image } = faker;

router.get("/", (req, res) => {
  const productosFaker = [];

  for (let i = 0; i < 5; i++) {
    productosFaker.push({
      title: commerce.product(),
      price: commerce.price(1, 1000),
      thumbnail: image.nature(100, 100, true),
    });
  }

  res.render("layouts/table", {
    productos: productosFaker,
    hayProductos: productosFaker.length != 0,
  });
});

module.exports = router;
