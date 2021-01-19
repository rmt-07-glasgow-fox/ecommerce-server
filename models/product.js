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
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [3, 20],
          msg: `Please input product name between 3 to 20 characters`
        }
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: `Please input product url in url format`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Please input positive integer (price)'
        },
        notEmpty: {
          msg: 'Please input product price'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Please only input positive integer (stock)'
        },
        notEmpty: {
          msg: 'Please input product stock'
        }
      },
    },
    CategoryId: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        if (instance.stock > 0) {
          instance.status = 'in stock';
        } else {
          instance.status = 'out of stock';
        }
      },
      beforeUpdate: (instance, options) => {
        if (instance.stock > 0) {
          instance.status = 'in stock';
        } else {
          instance.status = 'out of stock';
        }
      }
    },
    sequelize,
    modelName: 'Product',
  });
  return Product;
};