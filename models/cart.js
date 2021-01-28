'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {

    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: 'Please input positive integer (cart)'
        },
        notEmpty: {
          msg: 'please input cart amount'
        }
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Please input positive integer (total price)'
        },
        notEmpty: {
          msg: 'Please input total price'
        }
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.status = false;
      }
    },
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};