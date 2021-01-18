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
      allowNull: {
        args: false,
        msg: "Name is required"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        },
        mustString(value) {
          if (typeof value !== "string") {
            throw new Error('Name must be string');
          }
        },
      }

    }, 

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Image URL is required"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Image URL is required"
        },
        mustString(value) {
          if (typeof value !== "string") {
            throw new Error('Image URL must be string');
          }
        },
      }
    }, 

    price: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Price is required"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Price is required"
        },
        moreThanZero(value) {
          if (value < 1) {
            throw new Error('Price must be greater than zero');
          }
        },
        mustInteger(value) {
          if (typeof value !== "number") {
            throw new Error('Price must be integer');
          }
        },
      }
    }, 

    stock: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Stock is required"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock is required"
        },
        moreThanZero(value) {
          if (value < 0) {
            throw new Error('Stock must not be less than zero');
          }
        },
        mustInteger(value) {
          if (typeof value !== "number") {
            throw new Error('Stock must be integer');
          }
        },
      }
    }, 

    genre: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Genre is required"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Genre is required"
        },
        mustString(value) {
          if (typeof value !== "string") {
            throw new Error('Genre must be string');
          }
        },
      }
    }, 

    genreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};