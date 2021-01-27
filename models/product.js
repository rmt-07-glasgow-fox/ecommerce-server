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
      Product.hasMany(models.CartItem)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Product name required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price required'
        },
        // min: {
        //   args: 0,
        //   msg: 'Price must be greater than 0'
        // },,
        checkMin(val) {
          if (val < 0) {
            throw new Error('Price must be greater than 0')
          }
        },
        isNumeric: {
          args: true,
          msg: 'Price must be number'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock required'
        },
        // min: {
        //   args: 0,
        //   msg: 'Stock must be greater than 0'
        // },
        checkMin(val) {
          if (val < 0) {
            throw new Error('Stock must be greater than 0')
          }
        },
        isNumeric: {
          args: true,
          msg: 'Stock must be number'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};