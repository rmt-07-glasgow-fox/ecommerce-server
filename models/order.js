'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "userId"
      })
      Order.belongsTo(models.Product, {
        foreignKey: "productId"
      })
    }
  };
  Order.init({
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        moreThanOne(value) {
          if (value < 1) {
            throw new Error('Minimum count needed is 1');
          }
        }
      }
    },
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};