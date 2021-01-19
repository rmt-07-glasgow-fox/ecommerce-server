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
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "name is required"
        }
      }
      },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "image_url is required"
        }
      }
      },
    price: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "price is required"
        },
        min: {
          args: 0,
          msg: "price cannot be lower than 0"
        }
      }
      },
    stock: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "stock is required"
        },
        min: {
          args: 0,
          msg: "price cannot be lower than 0"
        }
      }
      },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};