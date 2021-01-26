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
      Cart.belongsTo(models.User, { sourceKey: 'id', foreignKey: 'UserId' })
      Cart.belongsTo(models.Product, {sourceKey: 'id', foreignKey: 'ProductId'})
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'UserId is empty' },
        notNull: { msg: 'UserId is null' },
        isInt: { msg: 'UserId should be integer' }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'ProductId is empty' },
        notNull: { msg: 'ProductId is null' },
        isInt: { msg: 'ProductId should be integer' }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'quantity is empty' },
        notNull: { msg: 'quantity is null' },
        isInt: { msg: 'quantity should be integer' },
        min: { args: [1], msg: 'minimum quantity is 1' }
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'totalPrice is empty' },
        notNull: { msg: 'totalPrice is null' },
        isInt: { msg: 'totalPrice should be integer' },
        min: { args: [0], msg: 'minimum totalPrice is 0' }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};