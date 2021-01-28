'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProductCart.init({
    productId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'field product id is required'
        }
      }
    },
    cartId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'field cart id is required'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'field quantity id is required'
        },
        min: {
          args: [0],
          msg: 'quantity cannot be negative'
        }
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'field total price id is required'
        },
        min: {
          args: [0],
          msg: 'total price cannot be negative'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ProductCart',
  });
  return ProductCart;
};