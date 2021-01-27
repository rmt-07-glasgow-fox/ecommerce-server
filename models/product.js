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
      Product.belongsToMany(models.Cart, {
        through: 'Carts',
        as: 'carts',
        foreignKey: 'ProdId',
        otherKey: 'UserId'
      });

      Product.belongsTo(models.Category, { foreignKey: 'CatId'})
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name is required",
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Image url is required",
          },
          isUrl: {
            args: true,
            msg: "Image url must be an url",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price is required",
          },
          min: {
            args: [0],
            msg: "Price can not less than 0",
          },
          isNumeric: {
            args: true,
            msg: "Price must be number",
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
          min: {
            args: [0],
            msg: "Stock can not less than 0",
          },
          isNumeric: {
            args: true,
            msg: "Stock must be number",
          },
        },
      },
      CatId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "CatId is required",
          },
          min: {
            args: [0],
            msg: "CatId can not less than 0",
          },
          isNumeric: {
            args: true,
            msg: "CatId must be number",
          },
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
