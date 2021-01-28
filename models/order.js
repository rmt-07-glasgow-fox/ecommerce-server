'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderDetail);
      Order.belongsTo(models.User);
    }
  }
  Order.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'User id is required' },
          notEmpty: { args: true, msg: 'User id is required' },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Address is required' },
          notEmpty: { args: true, msg: 'Address is required' },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Phone is required' },
          notEmpty: { args: true, msg: 'Phone is required' },
        },
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Payment method is required' },
          notEmpty: { args: true, msg: 'Payment method is required' },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Amount is required' },
          notEmpty: { args: true, msg: 'Amount is required' },
        },
      },
      notes: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Order',
      hooks: {
        beforeCreate: (order, options) => {
          order.status = 'pending';
        },
      },
    },
  );
  return Order;
};
