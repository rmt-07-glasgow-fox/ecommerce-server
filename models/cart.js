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
      Cart.belongsTo(models.User, { foreignKey: 'userId' })
      Cart.belongsToMany(models.Product, { as: 'product', foreignKey: 'cartId', through: models.ProductCart })
    }
  };
  Cart.init({
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'field user id is required'
        }
      }
    },
    totalPayment: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'field total payment is required'
        }
      },
      min: {
        args: [0],
        msg: 'total payment cannot be negative'
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};