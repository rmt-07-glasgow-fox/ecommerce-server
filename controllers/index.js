const UserController = require("./UserController")
const ProductController = require("./ProductController")

class Controller {
  static getRootHandler(req, res) {
    res.send(`Hi, there! it's our cms ecommerce server`)
  }
}

module.exports = {
  Controller,
  UserController,
  ProductController,
}
