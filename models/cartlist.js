'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CartList.init({
    CartId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    currentPrice: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
  }, {
    sequelize,
    modelName: 'CartList',
  });
  return CartList;
};