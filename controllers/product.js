const { Product } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      // category: req.body.category
    }
    const product = await Product.create(data)
    console.log(product);
    res.status(201).json(product)
  } catch (error) {
    next(error);
  }
};
