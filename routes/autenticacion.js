const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const config = require("../config");
const {initializePassportConfig} = require('../controllers/passport-config')

const {
  getRegisterView,
  getLoginErrorView,
  getRegisterErrorView,
  getLoginView,
  register,
  logIn,
  logOut,
} = require("../controllers/autenticacion");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/*----------------------- Session -----------------------*/

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

router.use(cookieParser());
router.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongo.baseUrl,
      mongoOptions: advancedOptions,
      ttl: 600,
    }),
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);

/*----------------------- Passport -----------------------*/

router.use(passport.initialize());
router.use(passport.session());

initializePassportConfig()

/*----------------------- Rutas -----------------------*/

router.get("/register", getRegisterView);
router.get("/register-error", getRegisterErrorView);
router.get("/login", getLoginView);
router.get("/login-error", getLoginErrorView);

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/register-error",
  }),
  register
);
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login-error",
  }),
  logIn
);
router.get("/logout", logOut);

module.exports = router;
