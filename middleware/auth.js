const { verifyToken } = require("../helpers/jwt");
const { Product, Cart } = require("../models");

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

exports.authorize = async (req, res, next) => {
  try {
    const id = +req.params.id
    const user = req.user;
    const product = await Product.findByPk(id);
    const cart = await Cart.findByPk(id)
    // TODO: or logic error
    if (user.id === cart.UserId ) {
      next()
    } else {
      next({ name: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};
