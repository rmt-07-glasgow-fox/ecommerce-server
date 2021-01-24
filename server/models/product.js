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
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name Should Not Be Null"
        },
        notEmpty: {
          args: true,
          msg: "Name Should Not Be Empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Image Should Not Be Null"
        },
        notEmpty: {
          args: true,
          msg: "Image Should Not Be Empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name Should Not Be Null"
        },
        notEmpty: {
          args: true,
          msg: "Name Should Not Be Empty"
        },
        min: {
          args: 1000,
          msg: "Minimum Price is 1000"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Name Should Not Be Null"
        },
        notEmpty: {
          args: true,
          msg: "Name Should Not Be Empty"
        },
        min: {
          args: 1,
          msg: "Minimum Stock is 1"
        }
      }
    },
    status: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};