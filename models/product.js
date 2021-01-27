"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart)
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
            msg: "Product name required",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.DOUBLE,
        notEmpty: {
          args: true,
          msg: "Price required",
        },
        validate: {
          min: {
            args: [0],
            msg: "Price must be 0 or more",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        notEmpty: {
          args: true,
          msg: "Stock required",
        },
        validate: {
          min: {
            args: [0],
            msg: "stock must be 0 or more",
          },
          isInt: {
            args: true,
            msg: "Stock must be an integer",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  )
  return Product
}
