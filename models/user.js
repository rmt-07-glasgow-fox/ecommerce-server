'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/brcypt');
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
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: `email not valid`
        },
        notEmpty: {
          msg: `email must be filled`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: `password must be filled`
        },
        len: {
          args: [4],
          msg: `password atleast 4 character`
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: user => {
        if(!user.role) user.role = 'customer'
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};