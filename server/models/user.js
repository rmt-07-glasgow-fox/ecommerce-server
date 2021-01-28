'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Banner, {foreignKey: 'UserId', targetKey: 'id'})
      this.hasMany(models.Wishlist, {foreignKey: 'UserId', targetKey: 'id'})
      this.belongsToMany(models.Content, {through: models.Wishlist, foreignKey: 'UserId'})
      this.hasMany(models.Cart, {foreignKey: 'UserId', targetKey: 'id'})
      this.belongsToMany(models.Content, {through: models.Cart, foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Role is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance, option) => {
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};