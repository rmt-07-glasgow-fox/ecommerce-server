const { Product } = require("../models");
const { verifyJwt } = require("../helpers/jwt.js");

class ProductController {
  static create(req, res, next) {
    const decoded = verifyJwt(req.headers.access_token);
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      UserId: decoded.id,
    };
    Product.create(payload)
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getProducts(req, res, next) {
    Product.findAll()
      .then((products) => {
        return res.status(200).json(products);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getProduct(req, res, next) {
    const id = req.params.id;

    Product.findOne({ where: { id } })
      .then((dataTask) => {
        return res.status(200).json(dataTask);
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateProduct(req, res, next) {
    const id = req.params.id;
    const payload = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
    };

    Product.update(payload, { where: { id } })
      .then(() => {
        res.status(200).json({ message: "Product have been updated" });
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteProduct(req, res, next) {
    const id = req.params.id;

    Product.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ message: "Product have been deleted" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = ProductController;
