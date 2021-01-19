'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Name Product cant be Empty" }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: { msg: "Error format url" }
      },
      defaultValue: "https://info.solokkota.go.id/uploads/No_Image_Available.jpg",
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: [0],
          msg: "Invalid price value"
        }
      },
      defaultValue: 0
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: "Invalid stock value"
        }
      },
      defaultValue: 0
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};