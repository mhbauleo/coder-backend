const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const User = require("../persistencia/User");
const config = require('../config')

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
      ttl: 60,
    }),
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);

/*----------------------- Passport -----------------------*/

router.use(passport.initialize());
router.use(passport.session());

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      User.findOne({ email: username }, (err, user) => {
        if (err) {
          console.log(err);
          return done(err);
        }

        if (user) {
          console.log("User already exists");
          return done(null, false);
        }

        const newUser = {
          email: username,
          nombre: req.body.nombre,
          password: createHash(password),
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log(err);
            return done(err);
          }
          console.log(userWithId);
          console.log("User Registration successful");
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {

    User.findOne({"email" : username}, (err, user) => {
      if(err) {
        return done(err)
      }

      if(!user) {
        console.log(`User no found with username ${username}`)
        return done(null, false)
      }

      if(!isValidPassword(user, password)) {
        console.log("Invalid password")
        return done(null, false)
      }

      return done(null, user)
    })
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done)
});

/*----------------------- Rutas ----------*/

router.get("/register", (req, res) => {
  res.render("layouts/register");
});

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/register-error",
  }),
  (req, res) => {
    req.logOut()
    res.redirect("/login")
  }
);

router.get("/register-error", (req, res) => {
  res.render("layouts/register-error");
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("layouts/form", { nombre: req.user.nombre });
  } else {
    res.render("layouts/login");
  }
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login-error",
  }),
  (req, res) => {
    res.render("layouts/form", { nombre: req.user?.nombre });
  }
);

router.get("/login-error", (req, res) => {
  res.render("layouts/login-error");
});

router.get("/logout", (req, res) => {
  let nombre = req.user?.nombre;
  console.log(`antes: ${JSON.stringify(req.user)}`);
  req.logOut();
  console.log(`despues: ${req.user}`);
  res.render("layouts/logout", { nombre });
});

/*----------------------- Aux ----------*/

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

module.exports = router;
