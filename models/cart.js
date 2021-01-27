'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: 'true',
          message: 'UserId must be numeric'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: 'true',
          message: 'UserId must be numeric'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: 'true',
          message: 'UserId must be numeric'
        },
        min: 1
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.quantity = 1
      }
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};