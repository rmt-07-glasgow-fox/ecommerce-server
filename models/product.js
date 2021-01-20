'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  product.init({
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
          msg: 'Image_url is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: 'Price must be number'
        },
        notEmpty: {
          msg: 'Price is required'
        },
        min: {
          args: [0],
          msg: 'Price cannot be minus'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: 'Stock must be number'
        },
        notEmpty: {
          msg: 'Stock is required'
        },
        min: {
          args: [0],
          msg: 'Stock cannot be minus'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};