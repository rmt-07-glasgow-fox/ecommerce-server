"use strict";
const { Model } = require("sequelize");

// const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: 'ProductId'
      })
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Product name is required",
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price is required",
          },
          isInt: {
            args: true,
            msg: "Price must be an integer",
          },
          min: {
            args: [0],
            msg: "Price must be a positive value",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "Stock is required",
          },
          isInt: {
            args: true,
            msg: "Stock must be an integer",
          },
          min: {
            args: [0],
            msg: "Stock must be a positive value",
          },
          
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Category is required" },
          notNull: { msg: "Category is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
