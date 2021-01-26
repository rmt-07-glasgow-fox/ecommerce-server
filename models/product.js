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
    name:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'name cannot empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'description cannot empty'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'category cannot empty'
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      validate:{
        min:{
          args: [1],
          msg: 'price min 1'
        }
      }
    },
    stock: {
      type: DataTypes.STRING,
      validate:{
        min:{
          args: [0],
          msg: 'invalid stock value'
        }
      }
    },
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};