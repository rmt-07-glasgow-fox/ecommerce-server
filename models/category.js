'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product)
    }
  };
  Category.init({
    tag: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['Others', 'Electronic', 'Sport & Healthy', 'Food & Drink', 'Books', 'Clothes & Fashion', 'Tools & Furnitures']],
          msg: 'Invalid value Category'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};