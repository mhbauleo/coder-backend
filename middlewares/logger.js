const logger = require("../helpers/logger");

const logPath = (req, res, next) => {
  logger.log("info", `ruta ${req.path} método ${req.method}`);
  next();
};

const rutaIncorrecta = (req, res) => {
  logger.log("warn", `ruta ${req.path} método ${req.method}`);
  res.json({ msg: "ruta incorrecta" });
};

module.exports = { logPath, rutaIncorrecta };
