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
      Product.belongsTo(models.Category)
      Product.hasMany(models.Cart)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty!'
        }
      }
    },
    image_url:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image cannot be empty!'
        }
      }
    },
    price:  {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Price cannot less than 0'
        },
        isNumeric: {
          msg: 'Price only allow number!'
        },
        notEmpty: {
          msg: 'Price cannot be empty!'
        }
      }
    },
    stock:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Stock cannot less than 0'
        },
        isNumeric: {
          msg: 'Stock only allow number!'
        },
        notEmpty: {
          msg: 'Stock cannot be empty!'
        }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};