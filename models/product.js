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
      Product.belongsTo(models.Product, { 
        foreignKey: "categoryId" 
      })
    }
  };
  Product.init({
    name:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill the product name"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill the product image_url"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill the product price"
        },
        valid(value) {
          if(!value || value <= 0){
            throw new Error("price can't be a negative number")
          }
        },
        isInt: {
          args: true,
          msg: "wrong format price / stock"
        },
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill the product stock"
        },
        valid(value) {
          if(!value || value <= 0){
            throw new Error("stock can't be a negative number")
          }
        },
        isInt: {
          args: true,
          msg: "wrong format price / stock"
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill the product description"
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill the product categoryId"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};