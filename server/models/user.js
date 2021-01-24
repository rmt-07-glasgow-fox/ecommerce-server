'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Content, {foreignKey: 'UserId', targetKey: 'id'})
      User.hasMany(models.Banner, {foreignKey: 'UserId', targetKey: 'id'})
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
  });
  return User;
};