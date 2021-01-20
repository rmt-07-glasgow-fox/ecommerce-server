const { verifyJwt } = require("../helpers/jwt.js");
const { User, Product } = require("../models");

function authenticate(req, res, next) {
  try {
    const decoded = verifyJwt(req.headers.access_token);

    User.findOne({ where: { id: decoded.id } })
      .then((dataUser) => {
        req.user = {
          id: dataUser.id,
          email: dataUser.email,
          role: dataUser.role,
        };
        next();
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
}

function authorize(req, res, next) {
  try {
    const userRole = req.user.role;

    if (userRole === "admin") {
      return next();
    } else {
      throw { name: "forbidden" };
    }
  } catch (err) {
    next(err);
  }
}

function authorizeCheckData(req, res, next) {
  const id = req.params.id;

  Product.findOne({ where: { id } })
    .then((product) => {
      if (!product) {
        throw { name: "dataNotFound" };
      } else {
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { authenticate, authorize, authorizeCheckData };
