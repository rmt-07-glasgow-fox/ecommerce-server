'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WishlistItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  WishlistItem.init({
    WishlistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product is required'
        },
        notEmpty: {
          msg: 'Product is required'
        },
        isNumeric: {
          msg: 'ProductId must be integer'
        }
      },
    }
  }, {
    sequelize,
    modelName: 'WishlistItem',
  });
  return WishlistItem;
};
