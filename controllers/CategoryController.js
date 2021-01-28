const { Category } = require("../models/");

class CategoryController {
  static getCategories(req, res, next) {
    Category.findAll({
      order: [["name", "ASC"]],
    })
      .then((dataCategories) => {
        // [{ "id": 7, "name": "Clotches"}, ...]
        const filteredDataCategories = dataCategories.map((dataCategory) => {
          const category = {
            id: dataCategory.id,
            name: dataCategory.name
          }
          return category
        });
        res.status(200).json(filteredDataCategories);
      })
      .catch((err) => {
        next(err);
      });
  }

  static createCategory(req, res, next) {
    Category.create({
      name: req.body.name.toLowerCase(),
      UserId: req.user.id,
    })
      .then((dataCategory) => {
        res.status(201).json({
          id: dataCategory.id,
          name: dataCategory.name,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteCategory(req, res, next) {
    Category.destroy({
      where: { id: req.params.id },
    })
      .then((dataCategory) => {
        if (dataCategory === 1) {
          res.status(200).json({ message: "Category have been deleted" });
        } else {
          next(err);
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static getCategory(req, res, next) {
    Category.findOne({
      where: { id: req.params.id },
    })
      .then((dataCategory) => {
        res.status(200).json({
          id: dataCategory.id,
          name: dataCategory.name,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateCategory(req, res, next) {
    Category.update(
      {
        name: req.body.name.toLowerCase(),
        UserId: req.user.id, // updated person who update category
      },
      { where: { id: req.params.id } }
    )
      .then((dataCategory) => {
        if (dataCategory[0] === 1) { // Handle [ 1 ] / [ 0 ]
          res.status(200).json({ message: "Product have been updated" });
        }else{
          next(err);
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = CategoryController;
