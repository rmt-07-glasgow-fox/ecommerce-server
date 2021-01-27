'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User);
      Cart.belongsTo(models.Product);
    }
  }
  Cart.init(
    {
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Product id is required' },
          notEmpty: { args: true, msg: 'Product id is required' },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'User id is required' },
          notEmpty: { args: true, msg: 'User id is required' },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Quantity is required' },
          notEmpty: { args: true, msg: 'Quantity is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Cart',
    },
  );
  return Cart;
};
