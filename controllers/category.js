const { Category } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
    };
    const category = await Category.create(data);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

exports.categories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.category = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    category ? res.status(200).json(category) : next({ name: "NotFound", item:  "Category"});
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = {
      name: req.body.name,
    };
    const category = await Category.update(data, {
      where: { id },
      returning: true,
    });
    category
      ? res.status(200).json(category[1][0].dataValues)
      : next({ name: "NotFound", item:  "Category"});
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (category) {
      const deletedProduct = await Category.destroy({ where: { id } });
      res.status(200).json({
        success: [`Category with id: '${category.id}' success to delete`],
      });
    } else {
      next({ name: "NotFound", item:  "Category"});
    }
  } catch (error) {
    next(error);
  }
};
