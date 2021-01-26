
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
      Product.belongsTo(models.Category)
      Product.hasMany(models.Cart)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name must be filled"
        }
      }
    },
    image_url: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "Image url must be filled"
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price must be filled"
        },
        min: {
          args: '0',
          msg: "Price must greater than equal 0"
        },
        isDecimal: {
          args: true,
          msg: 'Price must be filled by number'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock must be filled"
        },
        min: {
          args: '0',
          msg: "Stock must greater than equal 0"
        },
        isInt: {
          args: true,
          msg: 'Stock must be filled by absolute number'
        }
      }
    },
    description: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    CategoryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Category must be filled'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};