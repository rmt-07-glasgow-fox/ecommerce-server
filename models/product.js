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
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: [0],
          msg: "Price must be more than 0"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          msg: "stock must be more than 0",
          args: [0]
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};