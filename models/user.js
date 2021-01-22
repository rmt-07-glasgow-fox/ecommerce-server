'use strict';
const {
  Model
} = require('sequelize');
const {hasher} = require("../helpers/hash")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          args: true,
          msg: `Name is required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          args: true,
          msg: `Email is required`
        }
      },
      unique: {
        args: true,
        msg: `Email has been registered`
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          args: true,
          msg: `Password is required`
        },
        len: {
          args: [6],
          msg: `Password at least 6 characters`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          args: true,
          msg: `Role is required`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hasher(user.password)
      }
    }
  });
  return User;
};