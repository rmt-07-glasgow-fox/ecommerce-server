const { Product } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      // category: req.body.category
    };
    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      // category: req.body.category
    };
    const product = await Product.update(data, {
      where: { id },
      returning: true,
    });
    console.log(product);
    if (product) {
      res.status(200).json(product[1][0].dataValues);
    } else {
      next({ name: "ProductNotFound" });
    }
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (product) {
      const deletedProduct = await Product.destroy({ where: { id } });
      res.status(200).json({success: [`Product with id: '${product.id}' success to delete`]});
    } else {
      next({ name: "ProductNotFound" });
    }
  } catch (error) {
    next(error);
  }
};
