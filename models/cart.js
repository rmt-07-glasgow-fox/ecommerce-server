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
      this.belongsTo(models.User, { foreignKey: 'UserId' }),
      this.belongsTo(models.Product, { foreignKey: 'ProductId' })
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'User not empty'
        }
      }
    },
    ProductId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'ProductId not empty'
        }
      }
    },
    status: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Status cannot be emtpy'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'quantity cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};