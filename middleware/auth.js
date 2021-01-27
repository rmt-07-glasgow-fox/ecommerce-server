const { verifyToken } = require("../helpers/jwt");
const { Product } = require("../models");

exports.authentificate = (req, res, next) => {
  try {
    if (req.headers.access_token) {
      const user = verifyToken(req.headers.access_token);
      if (user) {
        req.user = user;
        next();
      } else {
        next({ name: "Unauthorized" });
      }
    } else {
      next({ name: "Authentificate" });
    }
  } catch (error) {
    next(error);
  }
};

exports.requireAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    user.role === "admin" ? next() : next({ name: "Unauthorized" });
  } catch (error) {
    next(error);
  }
};

exports.authorize = async (req, res, nect) => {
  try {
    const user = req.user;
    const product = await Product.findByPk(+req.params.id);
    user.id === product.UserId ? next() : next({ name: "Unauthorized" });
  } catch (error) {
    next(error);
  }
};
