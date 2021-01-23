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
      Product.belongsTo(models.Category, {foreignKey: 'categoryId'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Product name is required'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        min: {
          args: [ 500 ],
          msg: 'Product price must be greater or equal than 500'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [ 0 ],
          msg: 'Product stock must be greater or equal than zero'
        }
      }
    },
    categoryId: DataTypes.INTEGER,
    description: DataTypes.STRING(500),
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
    hooks: {
      beforeCreate (product, option) {
        product.status = true
      }
    }
  });
  return Product;
};