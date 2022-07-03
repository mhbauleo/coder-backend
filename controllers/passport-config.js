const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../daos/index");
const {createHash, isValidPassword} = require('../helpers/password')


const initializePassportConfig = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        try {
          const user = await User.getUserByEmail(username);

          if (user) {
            console.log("User already exists");
            return done(null, false);
          }

          const newUser = {
            email: username,
            nombre: req.body.nombre,
            password: createHash(password),
          };

          console.log(typeof newUser.password);
          console.log(newUser);
          const id = await User.save(newUser);
          console.log(id);
          console.log("User Registration successful");
          const createdUser = await User.getById(id);
          return done(null, createdUser);
        } catch (e) {
          console.log(e);
          return done(e);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.getUserByEmail(username);
        console.log(user);
        if (!user) {
          console.log(`User no found with username ${username}`);
          return done(null, false);
        }
        if (!isValidPassword(user, password)) {
          console.log("Invalid password");
          return done(null, false);
        }
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    done(null, await User.getById(id));
  });
};

module.exports = {initializePassportConfig}