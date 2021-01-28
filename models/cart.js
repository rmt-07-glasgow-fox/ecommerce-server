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
      Cart.belongsTo(models.User, { foreignKey: 'UserId' })
      Cart.belongsTo(models.Product, { foreignKey: 'ProductId' })
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "UserId must not be empty"
        },
        notNull: {
          args: true,
          msg: "UserId must not be null"
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "ProductId must not be empty"
        },
        notNull: {
          args: true,
          msg: "ProductId must not be null"
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Quantity of product must not be empty"
        },
        isInt: {
          args: true,
          msg: "Quantity must contains integer value!"
        },
        isPositive(value) {
          if (value <= 0) {
            throw new Error('Quantity must contains positive value!');
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