const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const MongoStore = require("connect-mongo");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser())

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

router.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://mhbauleo:12345@cluster0.s1kle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
      ttl: 60
    }),
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);

router.get("/login", (req, res) => {
    if(req.session.nombre) {
        res.render("layouts/form", { nombre: req.session.nombre });
    } else {
        res.render("layouts/login")
    }
});

router.get("/logout", (req, res) => {
  let nombre = req.session?.nombre;

  req.session.destroy((err) => {
    if (!err) {
      res.render("layouts/logout", { nombre })
      //sleep(2000)
      //res.redirect('/login')
    } else {
      res.send({ status: "logout error" });
    };
  });
});

router.post("/login", (req, res) => {
  req.session.nombre = req.body.nombre;
  res.render("layouts/form", { nombre: req.session?.nombre });
});

module.exports = router;
