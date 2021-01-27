'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartProduct.belongsTo(models.Cart)
      CartProduct.belongsTo(models.Product)
    }
  };
  CartProduct.init({
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Cart Id is required"
        }
      },
      references: {
        model: { tableName: 'Carts'},
        key: 'id'
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product Id is required"
        }
      },
      references: {
        model: { tableName: 'Products'},
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "Quantity must more than 0"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'CartProduct',
  });
  return CartProduct;
};