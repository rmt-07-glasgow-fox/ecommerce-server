'use strict';
const {
  Model
} = require('sequelize');
const Sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CartList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartList.belongsTo(models.User)
      CartList.belongsTo(models.Product)
    }
  };
  CartList.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CartList',
    hooks: {
      beforeCreate: (cart, options) => {
        cart.quantity = 1
        cart.status = "unpaid"
      }
    }
  });
  return CartList;
};