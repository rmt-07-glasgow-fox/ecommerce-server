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
      Product.belongsTo(models.User, {foreignKey : 'UserId'})
    }
  };
  Product.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : "Name is required"
        },
        notNull : {
          argss : true,
          msg : "Name is required"
        }
      },
      allowNull : false
    },
    image_url: DataTypes.STRING,
    price: {
      type : DataTypes.DOUBLE,
      validate : {
        min : {
          args : 1,
          msg : "Minimum price is 1"
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      validate : {
        min : {
          args : 1,
          msg : "Minimum stock is 1"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};