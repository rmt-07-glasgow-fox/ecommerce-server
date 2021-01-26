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
      Cart.belongsTo(models.User)
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    Paid: DataTypes.STRING,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Quantity should more than 0'
        }
      }
    },
    totalprice: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Price should more than 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });

  Cart.addHook('beforeCreate', (instance,options) => {
    instance.Paid = 'Unpaid'
    })

  return Cart;
};