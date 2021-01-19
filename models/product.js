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
      Product.hasMany(models.Brand)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'name already registered.' },
      validate: {
        notNull: { msg: 'name is null' },
        notEmpty: { msg: 'name is empty' }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'image_url is empty' },
        notNull: { msg: 'image_url is null' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'price is empty' },
        notNull: { msg: 'price is null' },
        isInt: { msg: 'price should be integer' },
        min: { args: [100000], msg: 'minimum price is 100000' }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'stock is empty' },
        notNull: { msg: 'stock is null' },
        isInt: { msg: 'stock should be integer' },
        min: { args: [0], msg: 'minimum stock is 0' }
      }
    },
    BrandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'BrandId is empty' },
        notNull: { msg: 'BrandId is null' },
        isInt: { msg: 'BrandId should be integer' }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};