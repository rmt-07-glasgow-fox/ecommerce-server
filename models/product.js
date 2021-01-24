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
      this.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: 'UserId'
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please enter your product name"
        },
        notEmpty: {
          args : true,
          msg: 'Please fill in your product name'
        }
      
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please enter your image url"
        },
        notEmpty: {
          args: true,
          msg: "Please fill in your product image url"
        }
        
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please fill in your product price"
        },
        notNull: {
          args: true,
          msg: "Please enter your price"
        },
        min: {
          args: 1,
          msg: "Price cannot be lowwer then 1"
        },
        isInt: {
          args: true,
          msg: "You cannot fill in your product price with string"
        }
      }
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please fill in your product stock"
        },
        notNull: {
          args: true,
          msg: "Please enter your stock"
        },
        isMinus(stock){
          if(stock < 0){
            throw "Stock cannot be minus number"
            
          }
        },
        isInt: {
          args: true,
          msg: "You cannot fill in your product stock with string"
        }
      }
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please fill your product category'
        },
        notNull: {
          args: true,
          msg: 'Please enter your product category'
        }
      }
      
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};