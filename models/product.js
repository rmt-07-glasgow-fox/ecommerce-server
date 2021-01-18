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
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is required'
        },
        notNull: {
          args: true,
          msg: 'Name is required'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image Url is required'
        },
        notNull: {
          args: true,
          msg: 'Image Url is required'
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price is required'
        },
        notNull: {
          args: true,
          msg: 'Price is required'
        },
        min: {
          args: [0],
          msg: 'Minimum price is 0'
        },
        isNumeric: {
          args: true,
          msg: 'Price must be a number'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock is required'
        },
        notNull: {
          args: true,
          msg: 'Stock is required'
        },
        min: {
          args: [0],
          msg: 'Minimum stock is 0'
        },
        isNumeric: {
          args: true,
          msg: 'Stock must be a number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};