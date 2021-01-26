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
      Product.belongsToMany(models.User, {through: models.Wishlist})
      Product.belongsToMany(models.Transaction, {through: models.Cart})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Product Name is Required`
        },
        notNull: {
          msg: `Product Name is Required`
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: `Price Must Be a Number`
        },
        min: {
          args: 1,
          msg: `Minimum Price is Rp. 1,-`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: `Stock Must Be a Number`
        },
        min: {
          args: [0],
          msg: `Minimum Stock is 0`
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Product Category is Required`
        },
        notNull: {
          msg: `Product Category is Required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.beforeCreate((product, opt) => {
    if (!product.image_url) {
      product.image_url = `https://source.unsplash.com/random`
    }
  })

  return Product;
};