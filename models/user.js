'use strict';
const { createHash } = require('../helpers/hashPassword')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Cart)
      User.hasOne(models.Wishlist)
    }
  };
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'customer']
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate (user, options) {
        user.password = createHash(user.password)
        user.role = 'customer'
      },
      afterCreate (user, options) {
        return Promise.all([user.createWishlist(), user.createCart()])
      }
    }
  });
  return User;
};
