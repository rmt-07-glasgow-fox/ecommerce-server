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
      Product.belongsTo(models.User)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          args: true,
          msg: `Name is required`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          args: true,
          msg: `Image Url is required`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate : {
        notEmpty: {
          args: true,
          msg: `Price is required`
        },
        minVal(value) {
          if (value < 0) {
            throw new Error(`Minimum value is 0 in Number`)
          }
        },
        munFormat(value) {
          if (typeof value !== 'number') {
            throw new Error(`Minimum value is 0 in Number`)
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate : {
        notEmpty: {
          args: true,
          msg: `Stock is required`
        },
        minVal(value) {
          if (value < 0) {
            throw new Error(`Minimum value is 0 in Number`)
          }
        },
        munFormat(value) {
          if (typeof value !== 'number') {
            throw new Error(`Minimum value is 0 in Number`)
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};