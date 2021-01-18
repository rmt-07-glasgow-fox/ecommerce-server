'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required"},
        notEmpty: { msg: "Name is required"}
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Image Url is required"},
        notEmpty: { msg: "Image Url is required"}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Price is required"},
        notEmpty: { msg: "Price is required"},
        min: {
          args: [0],
          msg: "Price cannot less then 0"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Stock is required"},
        notEmpty: { msg: "Stock is required"},
        min: {
          args: [0],
          msg: "Stock cannot less then 0"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};