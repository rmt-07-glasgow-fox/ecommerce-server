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
      Product.hasMany(models.Cart, {foreignKey: 'ProductId'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Product name must be filled"
        },
        notNull: {
          msg: "Null Product name is not allowed"
        },
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Product URL name must be filled"
        },
        notNull: {
          msg: "Null Product URL name is not allowed"
        },
        isUrl: {
          msg: "Invalid format for URL"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price name must be filled"
        },
        notNull: {
          msg: "Null Price name is not allowed"
        },
        isNumeric: {
          msg: "Price just allow number"
        },
        min: { 
          args: [1], 
          msg: 'The price should not be less than 1.' 
        },
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Stock name must be filled"
        },
        notNull: {
          msg: "Null Stock name is not allowed"
        },
        isNumeric: {
          msg: "Stock just allow number"
        },
        min: { 
          args: [1], 
          msg: 'The Stoct should not be less than 1.' 
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};