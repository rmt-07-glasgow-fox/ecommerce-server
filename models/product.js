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
      validate: {
        notEmpty: {
          msg: 'name is required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'image url is require'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'price is required'
        },
        isInt: {
          msg: 'field must be number'
        },
        min: {
          args: [0],
          msg: 'please input correctly'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'stock is required'
        },
        isInt: {
          msg: 'field must be number'
        },
        min: {
          args: [0],
          msg: 'please input correctly'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};