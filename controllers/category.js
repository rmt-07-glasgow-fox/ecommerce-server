const { Category } = require('../models');

exports.create = async (req, res, next) => {
  const { name } = req.body;

  try {
    const body = {
      name: name,
    };

    const category = await Category.create(body);

    return res.status(201).json(category);
  } catch (err) {
    return next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  } catch (err) {
    return next(err);
  }
};

exports.update = async (req, res, next) => {
  const id = req.params.id;

  const { name } = req.body;

  try {
    const isFound = await Category.findOne({ where: { id: id } });

    if (!isFound) return next({ name: 'NotFound', attr: 'Category' });

    const cat = await Category.update({ name: name }, { where: { id: id } });
    return res.status(200).json(cat);
  } catch (err) {
    return next(err);
  }
};

exports.destroy = async (req, res, next) => {
  const id = req.params.id;

  try {
    const isFound = await Category.findOne({ where: { id: id } });

    if (!isFound) return next({ name: 'NotFound', attr: 'Category' });

    await Category.destroy({ where: { id: id } });
    return res.status(200).json({ message: 'Category has been deleted' });
  } catch (err) {
    next(err);
  }
};
