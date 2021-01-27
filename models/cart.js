'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: 'user id must be filled'
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: 'product id must be filled'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'name must be filled'
        },
        isNegative(value) {
          if (value < 0) {
            throw new Error('stock must be more then equal 0');
          }
        },
        isInt: {
          msg: 'stock must be a number'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        isBoolean(value) {
          if (typeof value !== 'boolean') {
            throw new Error('status must be true / false');
          }
        },
      }
    }
  }, {
    hooks: {
      beforeCreate: cart => {
        cart.status = false
        cart.quantity = 1
      }
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};