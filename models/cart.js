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
      Cart.belongsTo(models.User, {foreignKey: 'UserId'})
      Cart.belongsTo(models.Product, {foreignKey: 'ProdId'})
    }
  };
  Cart.init({
    qty: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'Quantity can not less than 0'
        },
        notEmpty: {
          msg: 'Quantity is required'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    ProdId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};