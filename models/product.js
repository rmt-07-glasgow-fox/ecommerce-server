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
      Product.belongsTo(models.User, { foreignKey: 'UserId' });
      Product.belongsTo(models.Category, { foreignKey: 'CategoryId' });
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert product name!'
        },
        len: {
          args: [1, 50],
          msg: 'The length of product name must be less than 50 characters.'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert product image!'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert product price!'
        },
        min: {
          args: [0],
          msg: 'Minimal price is Rp.0.'
        },
        isNumeric: {
          args: true,
          msg: 'Only numeric input is allowed for price!'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert product stock!'
        },
        min: {
          args: [0],
          msg: 'Minimal stock is 0.'
        },
        isNumeric: {
          args: true,
          msg: 'Only numeric input is allowed for stock!'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert product category!'
        },
        isNumeric: {
          args: true,
          msg: 'Invalid category.'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};