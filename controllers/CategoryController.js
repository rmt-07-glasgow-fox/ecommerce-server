const { Category } = require("../models");

class CategoryController {

  static listCategory(req, res, next) {
    Category.findAll({
      order: [
        ["id", "ASC"],
      ],
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = CategoryController;
