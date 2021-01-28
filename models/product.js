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
      Product.belongsToMany(models.User,{
        through: models.Cart
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg : 'Product\'s name can\'t be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg : 'Product\'s image url can\'t be empty'
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        notEmpty:{
          msg: 'price can\'t be empty'
        },
        min:{
          args: [0],
          msg: 'price can\'t be lower than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty:{
          msg: 'stock can\'t be empty'
        },
        min:{
          args: [0],
          msg: 'stock can\'t be lower than 0'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};