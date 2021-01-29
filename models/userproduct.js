'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProduct.belongsTo(models.Product, { foreignKey: 'ProductId' })
      UserProduct.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  };
  UserProduct.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.DOUBLE,
    wishlist: DataTypes.BOOLEAN,
    invoice: DataTypes.STRING,
    paymentStatus: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['empty', 'pending', 'paid']]
      }
    }
  }, {
    sequelize,
    modelName: 'UserProduct',
    hooks: {
      beforeCreate(userProduct, option) {
        userProduct.quantity = 0;
        userProduct.totalPrice = 0;
        userProduct.paymentStatus = 'empty';
      }
    }
  });
  return UserProduct;
};