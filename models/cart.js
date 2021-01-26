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
      Cart.belongsToMany(models.User, {through: "Cart"})
      Cart.belongsToMany(models.Product, {through: "Cart"})
    }
  };
  Cart.init({
    quantity: {
      type: 
      DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: "Quantity can not less than 0"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};