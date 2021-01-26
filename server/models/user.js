'use strict';
const { encrypt } = require('../helpers')
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
      User.hasMany(models.Product)
      User.hasMany(models.Banner)
      User.hasMany(models.Category)
      User.hasMany(models.Cart)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Username must be filled"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Email must be filled"
        },
        isEmail: {
          args: true,
          msg: "Email not valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password must be filled"
        },
        len: {
          args: [6],
          msg: "Password minimum6 charcaters"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.password = encrypt(instance.password)
        instance.role = 'customer'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};