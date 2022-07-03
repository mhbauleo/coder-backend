const getRegisterView = (req, res) => {
  res.render("layouts/register");
};

const getLoginErrorView = (req, res) => {
  res.render("layouts/login-error");
};

const getRegisterErrorView = (req, res) => {
  res.render("layouts/register-error");
};

const getLoginView = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("layouts/form", { nombre: req.user?.nombre });
  } else {
    res.render("layouts/login");
  }
};

const register = (req, res) => {
  req.logOut();
  res.redirect("/login");
};

const logIn = (req, res) => {
  res.render("layouts/form", { nombre: req.user?.nombre });
};

const logOut = (req, res) => {
  let nombre = req.user?.nombre;
  console.log(`antes: ${JSON.stringify(req.user)}`);
  req.logOut();
  console.log(`despues: ${req.user}`);
  res.render("layouts/logout", { nombre });
};

module.exports = {getRegisterView, getLoginErrorView, getRegisterErrorView, getLoginView, register, logIn, logOut}