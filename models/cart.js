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
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
        if(!instance.status){
          instance.status = true
        }
        if(!instance.amount){
          instance.amount = 1
        }
      }
    },
    modelName: 'Cart',
  });
  return Cart;
};