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
      Product.belongsTo(models.User)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Product name field is required.'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Image url is required.'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: 'Price field is required.'
        },
        min: 0,
        isInt:{
          msg: 'Price data type must be a number.'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: 'Stock field is required.'
        },
        min: 0,
        isInt:{
          msg: 'Stock data type must be a number.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};