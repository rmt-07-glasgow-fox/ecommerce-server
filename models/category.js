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
      // define association here
      Category.hasMany(models.Product, { 
        foreignKey: "categoryId", 
        targetKey: "id" 
      })
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill the categories name"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};