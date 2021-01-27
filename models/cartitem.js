'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Cart)
      CartItem.belongsTo(models.Product)
    }
  };
  CartItem.init({
    CartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input quantity'
        },
        notEmpty: {
          msg: 'Please input quantity'
        },
        isNumeric: {
          msg: 'Please input quantity'
        },
        min: {
          args: [1],
          msg: 'Minimum quantity is 1'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};
