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
      Cart.belongsTo(models.Product, { sourceKey: 'id', foreignKey: "ProductId" }) 
      Cart.belongsTo(models.Customer, { sourceKey: 'id', foreignKey: "CustomerId" }) 
    }
  };
  Cart.init({
    ProductId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Id Product is required",
        },
        notEmpty: {
          msg: "Id Product is required",
        },
        isInt: {
          msg: "Id Product must be a number",
        },
      },
    },
    CustomerId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Id Customer is required",
        },
        notEmpty: {
          msg: "Id Customer is required",
        },
        isInt: {
          msg: "Id Customer must be a number",
        },
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Quantity of product is required",
        },
        notEmpty: {
          msg: "Quantity of product is required",
        },
        isInt: {
          msg: "Quantity of product must be a number",
        },
        min: {
          args: [1],
          msg: "Quantity of product cannot negative value or zero",
        },
      },
    },
    total_price: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Total price is required",
        },
        notEmpty: {
          msg: "Total price is required",
        },
        isInt: {
          msg: "Total price must be a number",
        },
        min: {
          args: [0],
          msg: "Total price cannot negative value",
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};