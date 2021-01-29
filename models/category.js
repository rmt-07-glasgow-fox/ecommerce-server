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
      Category.hasMany(models.Product, { foreignKey: 'CategoryId' });
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert category name!'
        },
        len: {
          args: [1, 50],
          msg: 'The length of category name must be less than 50 characters.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};