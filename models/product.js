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
      Product.belongsToMany(models.User, {
        through: models.Cart
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        len:{
          args: [3,30],
          msg: 'Product name should have 3 - 30 Characters'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len:{
          args: [4],
          msg: 'Product description should have minimum 4 Characters'
        }
      }
    },
    image_url: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty:{
          msg: 'Url Image must be filled'
        }
      }
    },
    condition: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'Condition must be filled'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min:{
          args: 1,
          msg: 'Product should have price'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min:{
          args: 1,
          msg: 'Product should have stock'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};