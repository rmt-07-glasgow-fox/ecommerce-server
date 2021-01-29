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
      Cart.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Cart.belongsTo(models.Product, {
        foreignKey: 'productId'
      })
    }
  };
  Cart.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        aboveZero (value) {
          if (value < 0) {
            throw new Error ('Value must be above 0')
          }
        }
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};