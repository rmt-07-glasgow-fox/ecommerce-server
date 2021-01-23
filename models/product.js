'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category);
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Name is required' },
          notEmpty: { args: true, msg: 'Name is required' },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Image url is required' },
          notEmpty: { args: true, msg: 'Image url is required' },
        },
      },
      image_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Image name is required' },
          notEmpty: { args: true, msg: 'Image name is required' },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: [0], msg: 'Price must greater than 0' },
          notNull: { args: true, msg: 'Price is required' },
          notEmpty: { args: true, msg: 'Price is required' },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: [0], msg: 'Stock must greater than 0' },
          notNull: { args: true, msg: 'Stock is required' },
          notEmpty: { args: true, msg: 'Stock is required' },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Category id is required' },
          notEmpty: { args: true, msg: 'Category id is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
