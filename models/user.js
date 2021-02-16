'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Cart, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email field must be filled"
        },
        notNull: {
          msg: "Null Email not allowed"
        },
        isEmail: {
          args: true,
          msg: "Invalid email format"
        }
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password field must be filled"
        },
        notNull: {
          msg: "Null Password not allowed"
        },
        len: {
          args: [4],
          msg: "Password must contain minimum 4 characters"
        }
      },
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.role = 'customer'
        user.password = hashPassword(user.password)
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};