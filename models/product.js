"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User);
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.Customer, { through: models.Cart })
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      image_url: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is required",
          },
          notEmpty: {
            msg: "Price is required",
          },
          isInt: {
            msg: "Price must be a number",
          },
          min: {
            args: [0],
            msg: "Price cannot negative value",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Stock is required",
          },
          notEmpty: {
            msg: "Stock is required",
          },
          isInt: {
            msg: "Stock must be a number",
          },
          min: {
            args: [0],
            msg: "Stock cannot negative value",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
