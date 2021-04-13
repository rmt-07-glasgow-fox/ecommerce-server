const { Product, Category } = require("../models");

class ProductController {
  static addProduct(req, res, next) {
    const { name, image_url, price, stock, CategoryId } = req.body;

    Product.create({
      name,
      image_url,
      price,
      stock,
      CategoryId,
    })
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        next(err);
      });
  }

  static listProduct(req, res, next) {
    Product.findAll({
      order: [
        ["CategoryId", "ASC"],
        ["name", "ASC"],
      ],
      include: [
        {
          model: Category,
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
      ],
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getSpecific(req, res, next) {
    const id = +req.params.id;

    Product.findOne({
      where: { id },
      include: [
        {
          model: Category,
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
      ],
    }).then((product) => {
      if (!product) {
        next({ name: "ProductNotFound" });
      } else {
        res.status(200).json(product);
      }
    });
  }

  static updateProduct(req, res, next) {
    const id = +req.params.id;
    const { name, image_url, price, stock, CategoryId } = req.body;

    Product.update(
      {
        name,
        image_url,
        price,
        stock,
        CategoryId,
      },
      {
        where: { id },
        returning: true,
      }
    )
      .then((response) => {
        if (response[0] === 0) {
          next({ name: "NoChange" });
        } else {
          res.status(200).json(response[1][0]);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteProduct(req, res, next) {
    const id = +req.params.id;

    Product.destroy({ where: { id } })
      .then((response) => {
        if (response === 0) {
          next({ name: "NoChange" });
        } else {
          res.status(200).json({ message: "Product has been deleted" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = ProductController;
