const UserController = require("./UserController")
const ProductController = require("./ProductController")
const CartController = require("./CartController")

class Controller {
  static getRootHandler(req, res) {
    res.send(`Hi, there! it's our cms ecommerce server`)
  }
}

module.exports = {
  Controller,
  UserController,
  ProductController,
  CartController
}
