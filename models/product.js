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
          msg: 'Product name is required'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        min: {
          args: [0],
          msg: 'Price must be greater than 0'
        }
      },
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: 'Stock must be greater than 0'
        }
      },
      allowNull: false
    },
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};