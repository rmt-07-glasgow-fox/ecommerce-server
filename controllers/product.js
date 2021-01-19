const { Product, Category } = require('../models');

exports.create = async (req, res, next) => {
  const { name, image_url, price, stock, CategoryId } = req.body;

  try {
    const category = await Category.findOne({ where: { id: CategoryId } });
    if (!category) return next({ name: 'NotFound', attr: 'Category' });

    const body = {
      name: name,
      image_url: image_url,
      price: price,
      stock: stock,
      CategoryId: CategoryId,
    };

    const product = await Product.create(body);

    return res.status(201).json(product);
  } catch (err) {
    return next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    return res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
};

exports.update = async (req, res, next) => {
  const id = req.params.id;

  const { name, image_url, price, stock, CategoryId } = req.body;

  try {
    const category = await Category.findOne({ where: { id: CategoryId } });

    if (!category) return next({ name: 'NotFound', attr: 'Category' });

    const isFound = await Product.findOne({ where: { id: id } });

    if (!isFound) return next({ name: 'NotFound', attr: 'Product' });

    const body = {
      name: name,
      image_url: image_url,
      price: price,
      stock: stock,
      CategoryId: CategoryId,
    };

    const cat = await Product.update(body, { where: { id: id } });
    return res.status(200).json(cat);
  } catch (err) {
    return next(err);
  }
};

exports.destroy = async (req, res, next) => {
  const id = req.params.id;

  try {
    const isFound = await Product.findOne({ where: { id: id } });

    if (!isFound) return next({ name: 'NotFound', attr: 'Product' });

    await Product.destroy({ where: { id: id } });
    return res.status(200).json({ message: 'Product has been deleted' });
  } catch (err) {
    next(err);
  }
};
