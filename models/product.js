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
      Product.hasMany(models.Cart, { foreignKey: 'ProductId' })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "name is required"
        },
        notEmpty: {
          args: true,
          msg: 'name is required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'image_url is required'
        },
        notEmpty: {
          args: true,
          msg: 'image_url is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'price is required'
        },
        notEmpty: {
          args: true,
          msg: 'price is required'
        },
        isInt: {
          args: true,
          msg: 'price need input number'
        },
        isMinus(value) {
          if(value <= 0) {
            throw new Error('price must be greater than 0')
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'stock is required'
        },
        notEmpty: {
          args: true,
          msg: 'stock is required'
        },
        isInt: {
          args: true,
          msg: 'stock need input number'
        },
        isMinus(value) {
          if(value < 0) {
            throw new Error('stock must be greater than 0')
          }
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};