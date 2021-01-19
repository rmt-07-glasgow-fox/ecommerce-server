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
      Product.belongsTo(models.User)
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
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'cannot be less than zero or a negative number'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'cannot be less than zero or a negative number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};