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
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : `This field cannot be empty`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : `This field cannot be empty`
        },
        isUrl : true
      }
    },
    price: {
      type : DataTypes.INTEGER,
      validate : {
        isNumeric : true,
        min : {
          args : 1,
          msg : `Price cannot below zero`
        },
        notEmpty : true
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        isNumeric : true,
        min : {
          args : 1,
          msg : `Stock cannot below zero`
        },
        notEmpty : true
      }
    },
    category: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : `This field cannot be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};