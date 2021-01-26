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
      Product.belongsToMany(models.User, { through: models.Cart })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Image Url is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'Minimum price is 0'
        },
        notEmpty: {
          msg: 'Price is required'
        },
        isNumeric: {
          msg: 'Price must be a number'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'Minimum stock is 0'
        },
        notEmpty: {
          msg: 'Stock is required'
        },
        isNumeric: {
          msg: 'Stock must be a number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};