'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })
      Wishlist.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
    }
  };
  Wishlist.init({
    productId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'field product id is required'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'field user id is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};