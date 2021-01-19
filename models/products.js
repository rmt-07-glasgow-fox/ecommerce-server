'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "name is required"
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Price must be number"
        },
        min: {
          args: 0,
          msg: "input invalid"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: "Price must be number"
        },
        min: {
          args: 0,
          msg: "input invalid"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};