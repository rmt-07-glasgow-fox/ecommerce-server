const { checkToken } = require("../helpers/jsonwebtoken");
const { User, Cart } = require("../models");

function authenticateGeneral(req, res, next) {
  if (!req.headers.access_token) {
    next({ name: "NoToken" });
  }
  try {
    const decoded = checkToken(req.headers.access_token);
    if (!decoded.id || !decoded.email) {
      next({ name: "InvalidToken" });
    }

    User.findByPk(decoded.id).then((user) => {
      if (!user || user.email !== decoded.email) {
        next({ name: "InvalidToken" });
      } else {
        const current = {
          id: user.id,
          email: user.email,
          role: user.role,
        };
        req.user = current;
        next();
      }
    });
  } catch (error) {
    next({ name: "InvalidToken" });
  }
}

function authenticateAdmin(req, res, next) {
  if (!req.headers.access_token) {
    next({ name: "NoToken" });
  }
  try {
    const decoded = checkToken(req.headers.access_token);
    if (!decoded.id || !decoded.email) {
      next({ name: "InvalidToken" });
    } else if (decoded.role !== "admin") {
      next({ name: "Unauthorized" });
    }

    User.findByPk(decoded.id).then((user) => {
      if (!user || user.email !== decoded.email) {
        return next({ name: "InvalidToken" });
      } else {
        const current = {
          id: user.id,
          email: user.email,
          role: user.role,
        };
        req.user = current;
        next();
      }
    });
  } catch (error) {
    next({ name: "InvalidToken" });
  }
}

function authorizeCart(req, res, next) {
  const id = +req.params.id;

  Cart.findOne({
    where: { id }
  })
    .then((response) => {
      if(!response) {
        next({name: 'CartNotFound'})
      }
      else if (response.UserId !== req.user.id) {
        next({ name: "Unauthorized" });
      } else {
        next();
      }
    })
    .catch((err) => next(err));
}

module.exports = { authenticateGeneral, authenticateAdmin, authorizeCart };
